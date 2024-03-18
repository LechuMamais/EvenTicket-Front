import './showEventList.css'
import { showEventCard } from "../showEventCard/showEventCard";

export const ShowEventList = (events) => {
    const eventsContainer = document.createElement('div');

    events.forEach(event => {
        const eventCard = showEventCard(event);
        eventsContainer.appendChild(eventCard);
    });

    return eventsContainer.innerHTML; // Devolvemos el HTML interno del contenedor
};