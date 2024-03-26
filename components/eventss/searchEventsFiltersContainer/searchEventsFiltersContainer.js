import "./searchEventsFiltersContainer.css";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/dark.css";
import { getEventsList } from "../../../utils/events/getEventsList.js";
import { flatpickrConfig } from "../../../utils/flatpickrConfig.js";

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
    // Lo que queremos es que al hacere scroll hacia abajo se oculte el contenedor de filtros
    // y que se muestre al hacer scroll hacia arriba.
    // Obtiene la posición inicial de la página al cargar
    let lastScrollPosition = window.pageYOffset;

    // Escucha el evento de scroll en el objeto window
    window.addEventListener('scroll', () => {
        // Obtiene la posición actual de la página al hacer scroll
        const currentScrollPosition = window.pageYOffset;
        const eventCardContainer = document.querySelector('.events-card-container');

        // Comprueba si el usuario está haciendo scroll hacia abajo
        if (currentScrollPosition > lastScrollPosition) {
            // Si está haciendo scroll hacia abajo, oculta el elemento #filter-by-date-container
            filterByDateContainer.classList.add('filter-hidden');
            if (eventCardContainer) {
                //console.log('Abajo: Hay event card container')
                eventCardContainer.style.marginTop = '0px';
                //console.log(eventCardContainer.style.marginTop)
            }
        } else {
            // Si está haciendo scroll hacia arriba, muestra el elemento #filter-by-date-container
            filterByDateContainer.classList.remove('filter-hidden');
            if (eventCardContainer) {
                //console.log('Arriba: Hay event card container')
                eventCardContainer.style.marginTop = '76px';
                //console.log(eventCardContainer)
            }
        }

        // Actualiza la última posición de desplazamiento con la posición actual
        lastScrollPosition = currentScrollPosition;
    });

    flatpickr(fromDateInput, flatpickrConfig );
    flatpickr(toDateInput, flatpickrConfig );

    // Manejar evento click del botón de búsqueda
    searchButton.addEventListener('click', async () => {
        const fromDate = fromDateInput.value;
        const toDate = toDateInput.value;
        const eventsCardContainer = document.querySelector('.events-card-container');
        getEventsList({fromDate, toDate}, eventsCardContainer)
    });

    // Retornar el contenedor de filtros
    return searchEventsFiltersContainer;
}
