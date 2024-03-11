import { showEventDetails } from "../eventDetails/eventDetails";
import "./showEventCard.css"; // Importamos los estilos específicos del componente

// Definimos el componente ShowEventCard como una función que recibe las props
export const showEventCard = (event) => {
    const eventCard = document.createElement('div');
    eventCard.classList.add('event-card');
    eventCard.dataset.id = event._id; // Almacenar el ID del evento como un atributo de datos

    const backgroundImage = `url('${event.img}')`;
    eventCard.style.backgroundImage = backgroundImage;

    const titleElement = document.createElement('h3');
    titleElement.textContent = event.title;
    eventCard.appendChild(titleElement);

    // Almacenar el ID del evento como un atributo de datos en la card
    eventCard.setAttribute('data-event-id', event._id);

    eventCard.addEventListener('click', (event) => {
        // Obtener el ID del evento al hacer clic en cualquier parte de la card
        const eventId = event.currentTarget.getAttribute('data-event-id');
        // Redireccionar a la página de detalles del evento con el ID obtenido
        showEventDetails(eventId);
    });

    return eventCard;
};