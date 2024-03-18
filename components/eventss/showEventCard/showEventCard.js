import { showEventDetails } from "../eventDetails/eventDetails";
import "./showEventCard.css";

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

    // Al darle click
    eventCard.addEventListener('click', (event) => {
        // Obtener el ID del evento al hacer clic en cualquier parte de la card
        const eventId = event.currentTarget.getAttribute('data-event-id');
        // Redireccionar a la página de detalles del evento con el ID obtenido
        showEventDetails(eventId);
    });

    //                      PARALLAX                   //
    // Agregar transición CSS
    eventCard.style.transition = 'background-position-y 0s ease-in-out';

    // Variable para almacenar la posición de desplazamiento inicial
    let initialScrollPosition;

    // Función para manejar el evento de scroll
    const handleScroll = () => {
        // Necesitamos que cuando la card del evento esté en el centro de la pantalla, backgroundPositionY sea 50%
        // Para eso, parallaxOffset tiene que ser 0, y para eso relativeScrollPosition = 0

        // Calcular la posición vertical central de la ventana del navegador
        const viewportCenter = window.innerHeight / 2;

        // Calcular la posición vertical central de la tarjeta de evento en relación con el viewport
        const cardCenter = eventCard.getBoundingClientRect().top + eventCard.offsetHeight / 2;

        // Calcular el desplazamiento relativo de la tarjeta de evento respecto al centro de la ventana
        const relativeScrollPosition = cardCenter - viewportCenter;

        // Calcular el desplazamiento del parallax
        const parallaxOffset = relativeScrollPosition * 0.12; // Ajusta el factor de parallax según sea necesario

        // Aplicar el efecto parallax a la imagen de fondo de la tarjeta de evento
        eventCard.style.backgroundPositionY = `calc(50% + ${parallaxOffset}px)`;
    };

    // Agregar el evento de scroll
    window.addEventListener('scroll', handleScroll);

    // Llamar a la función handleScroll para establecer la posición inicial al renderizar la tarjeta
    handleScroll();

    return eventCard;
};