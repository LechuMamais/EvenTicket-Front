import "./eventDetails.css";
import { EVENTS_URL } from "../../../utils/apiUrls";
import { createProfile } from "../../users/profile/profile";
import { makeRequest } from "../../../utils/api";
import { dateElement } from "../../../utils/dateElementConfig";
import { createEventHero } from "../createEventHero/createEventHero";
import { createUsersList } from "../createUsersList/createUsersList";
import { eventDetailsButtonsContainer } from "../eventDetailsButtonsContainer/eventDetailsButtonsContainer";
import { authRequiredToSeeEventDetails } from "../authRequiredToSeeEventDetails/authRequiredToSeeEventDetails";
import { showNotification } from "../../global/showNotification/showNotification";

//Componente que muestra todos los detalles de un evento. Dependiendo de si el user está autenticado, 
// es organizer o es asistente, mostrará unas cosas u otras

// Mostrar organizadores
const showOrganizers = (eventDetailsContainer, eventData) => {
    const organizers = eventData.organizers || [];
    createUsersList(
        eventDetailsContainer,
        'Organizadores',
        organizers,
        async (organizerId) => await createProfile(organizerId),
        'organizers-list'
    );
};

// Mostrar asistentes
const showAttendees = (eventDetailsContainer, eventData) => {
    const attendees = eventData.attendees || [];
    createUsersList(
        eventDetailsContainer,
        `Asistentes: ${attendees.length}`,
        attendees,
        async (attendeeId) => await createProfile(attendeeId),
        'attendees-list'
    );
};


export const showEventDetails = async (eventId) => {
    window.scrollTo({ top: 0 }); // Asegurarnos de que el scroll esté arriba del todo en la pag
    const mainContainer = document.querySelector('#main-container');
    
    try {
        // Obtener los detalles del evento desde la API
        const eventData = await makeRequest(`${EVENTS_URL}/${eventId}`, 'GET');
        if (!eventData) {
            throw new Error('Error al obtener los detalles del evento');
        }
        
        //Mostramos el titulo y la imagen del evento
        mainContainer.appendChild(createEventHero(eventData));

        // Obtener la información del usuario del localStorage
        const userId = localStorage.getItem("userId");
        const accessToken = localStorage.getItem("accessToken");
                
        // Si el usuario no está autenticado, no le dejaremos ver los detalles del evento
        if (!userId || !accessToken) {
            mainContainer.appendChild(authRequiredToSeeEventDetails());
        } else {
            // Crear elementos HTML para mostrar los detalles del evento
            const eventDetailsContainer = document.createElement('div');
            eventDetailsContainer.classList.add('event-details-container');
            
            // Funciones que muestran organizadores y asistentes:
            showOrganizers(eventDetailsContainer, eventData);
            showAttendees(eventDetailsContainer, eventData);
            
            // Estos dos componentes serán mejorados a futuro
            const locationElement = document.createElement('p');
            locationElement.textContent = `Ubicación: ${eventData.event.location}`;
            
            const descriptionElement = document.createElement('p');
            descriptionElement.textContent = `Descripción: ${eventData.event.description}`;
            
            // Agregar elementos al contenedor de detalles del evento
            eventDetailsContainer.appendChild(dateElement(eventData));
            eventDetailsContainer.appendChild(locationElement);
            eventDetailsContainer.appendChild(descriptionElement);
            
            //Agrega los botones con los que el usuario puede interactuar con el evento
            eventDetailsContainer.appendChild(eventDetailsButtonsContainer(eventData, eventId, userId));
            
            // Finalmente agregamos el contenedor de detalles del evento a mainContainer
            mainContainer.appendChild(eventDetailsContainer);
        }
        return mainContainer;

    } catch (error) {
        console.error('Error al mostrar los detalles del evento:', error.message);
        showNotification(`Error al mostrar los datos del evneto`, "error");
    }
};