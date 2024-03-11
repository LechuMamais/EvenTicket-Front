import "./events.css";
import { EVENTS_URL } from '../../utils/apiUrls.js';
import { showEventCard } from "../showEventCard/showEventCard.js";

export const showEvents = async () => {
    try {
        // Obtener los datos de la API
        const response = await fetch(EVENTS_URL);
        if (!response.ok) {
            throw new Error('Error al obtener los eventos');
        }
        const eventsData = await response.json();

        // Convertir las fechas de cadena a objetos Date
        eventsData.forEach(event => {
            event.date = new Date(event.date);
        });

        // Ordenar los eventos por fecha
        eventsData.sort((a, b) => a.date - b.date);

        // Crear un elemento div para contener todo el component
        const eventsContainer = document.createElement('div');
        eventsContainer.classList.add('events-container');

        // Title de la section
        const eventTitleContainer = document.createElement('div');
        eventTitleContainer.id = 'event-title-container';
        const eventTitle = document.createElement('h3');
        eventTitle.textContent = 'Próximos eventos';
        eventTitleContainer.appendChild(eventTitle);
        eventsContainer.appendChild(eventTitleContainer);

        // Crear un elemento div para contener la lista de eventos
        const eventsCardContainer = document.createElement('div');
        eventsCardContainer.classList.add('events-card-container');

        // Iterar sobre los eventos ordenados y crear una tarjeta para cada uno
        eventsData.forEach(event => {
            const eventCard = showEventCard(event);
            eventsCardContainer.appendChild(eventCard);
        });
        eventsContainer.appendChild(eventsCardContainer);

        // Agregar el contenedor de eventos al DOM
        return eventsContainer;

    } catch (error) {
        console.error('Error al mostrar los eventos:', error.message);
    }
};
