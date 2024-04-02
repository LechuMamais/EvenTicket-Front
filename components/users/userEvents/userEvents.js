import { showEventCard } from '../../eventss/showEventCard/showEventCard.js';
import './userEvents.css'

export function UserEvents(events, eventType, eventsContainerTitle, alt = 'No hay eventos en esta lista') {

    if (events.length == 0) {
        //Si no hay eventis en la lista, mostrar su alt
        const noEvents = document.createElement('h4');
        noEvents.textContent = alt;
        return noEvents;
    } else {
        const userEventsList = document.createElement('div');
        userEventsList.classList.add('user-events-container');
        userEventsList.id = eventType + '-container';


        // Crear el título de la lista de eventos
        const titleElement = document.createElement('h2');
        titleElement.textContent = `${eventsContainerTitle}:`;

        // Crear el contenedor de la lista de eventos
        const eventsContainer = document.createElement('div');
        eventsContainer.id = `${eventType}-list`;
        eventsContainer.classList.add('user-events-list');

        // Obtener el HTML de la lista de eventos utilizando la función ShowEventCard
        events.forEach(event => {
            const eventCard = showEventCard(event);
            eventsContainer.appendChild(eventCard);
        })

        // Adjuntar el título y el contenedor de eventos al elemento userEventsList en el DOM
        userEventsList.appendChild(titleElement);
        userEventsList.appendChild(eventsContainer);

        return userEventsList;
    }
}