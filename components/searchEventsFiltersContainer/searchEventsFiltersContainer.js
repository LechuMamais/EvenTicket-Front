import "./searchEventsFiltersContainer.css";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/dark.css";
import { EVENTS_URL } from '../../utils/apiUrls.js';
import { showEventCard } from "../showEventCard/showEventCard.js";

export const searchEventsFiltersContainer = async () => {

    // Crear contenedor de filtros de búsqueda
    const searchEventsFiltersContainer = document.createElement('div');
    searchEventsFiltersContainer.id = 'search-events-filters-container';

    // Title de la section EVENTOS
    const eventTitleContainer = document.createElement('div');
    eventTitleContainer.id = 'event-title-container';
    const eventTitle = document.createElement('h3');
    eventTitle.textContent = 'Próximos eventos';
    eventTitleContainer.appendChild(eventTitle);
    searchEventsFiltersContainer.appendChild(eventTitleContainer);

    // Crear elementos de los filtros
    const filterByDateContainer = document.createElement('div');
    filterByDateContainer.id = 'filter-by-date-container';
    const fromDateInput = document.createElement('input');
    fromDateInput.type = 'text';
    fromDateInput.id = 'from-date';
    fromDateInput.name = 'from-date';
    fromDateInput.placeholder = 'Desde';

    const toDateInput = document.createElement('input');
    toDateInput.type = 'text';
    toDateInput.id = 'to-date';
    toDateInput.name = 'to-date';
    toDateInput.placeholder = 'Hasta';

    const searchButton = document.createElement('button');
    searchButton.textContent = 'Buscar';

    // Agregar elementos al contenedor
    filterByDateContainer.appendChild(fromDateInput);
    filterByDateContainer.appendChild(toDateInput);
    filterByDateContainer.appendChild(searchButton);
    searchEventsFiltersContainer.appendChild(filterByDateContainer);

    // Efectos de SCROLL de FILTER BY DATE CONTAINER - tiene tambien css
    // Obtiene la posición inicial de la página al cargar
    let lastScrollPosition = window.pageYOffset;

    // Escucha el evento de scroll en el objeto window
    window.addEventListener('scroll', () => {
        // Obtiene la posición actual de la página al hacer scroll
        const currentScrollPosition = window.pageYOffset;

        // Comprueba si el usuario está haciendo scroll hacia abajo
        if (currentScrollPosition > lastScrollPosition) {
            // Si está haciendo scroll hacia abajo, oculta el elemento #filter-by-date-container
            filterByDateContainer.classList.add('filter-hidden');
        } else {
            // Si está haciendo scroll hacia arriba, muestra el elemento #filter-by-date-container
            filterByDateContainer.classList.remove('filter-hidden');
        }

        // Actualiza la última posición de desplazamiento con la posición actual
        lastScrollPosition = currentScrollPosition;
    });

    // Configurar Flatpickr para los inputs de fecha
    flatpickr(fromDateInput, {
        enableTime: false, // Deshabilitar selección de hora
        dateFormat: "Y-m-d", // Formato de fecha
        time_24hr: true, // Usar formato de 24 horas
        placeholder: "Desde" // Placeholder del input
    });

    flatpickr(toDateInput, {
        enableTime: false,
        dateFormat: "Y-m-d",
        time_24hr: true,
        placeholder: "Hasta"
    });

    // Manejar evento click del botón de búsqueda
    searchButton.addEventListener('click', async () => {
        const fromDate = fromDateInput.value;
        const toDate = toDateInput.value;

        try {
            // Realizar la solicitud GET a la API con los filtros de fecha
            const response = await fetch(`${EVENTS_URL}?fromDate=${fromDate}&toDate=${toDate}`);
            if (!response.ok) {
                throw new Error('Error al obtener los eventos');
            }
            const eventsData = await response.json();

            // Mostrar los eventos en el DOM
            const eventsCardContainer = document.querySelector('.events-card-container');
            eventsCardContainer.innerHTML = ''; // Limpiar contenido anterior

            eventsData.forEach(event => {
                const eventCard = showEventCard(event);
                eventsCardContainer.appendChild(eventCard);
            });
        } catch (error) {
            console.error('Error al obtener los eventos:', error.message);
        }
    });

    // Retornar el contenedor de filtros
    return searchEventsFiltersContainer;
}
