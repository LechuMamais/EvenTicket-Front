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

        // Crear un elemento div para contener la lista de eventos
        const eventsContainer = document.createElement('div');
        eventsContainer.classList.add('events-container');
        
        // Iterar sobre los eventos y crear una tarjeta para cada uno
        eventsData.forEach(event => {
            const eventCard = showEventCard(event);
            eventsContainer.appendChild(eventCard);
        });

        // Agregar el contenedor de eventos al DOM
        return eventsContainer;

    } catch (error) {
        console.error('Error al mostrar los eventos:', error.message);
    }
};