import "./eventDetails.css";
import { EVENTS_URL } from "../../../utils/apiUrls";
import { createLoginForm } from "../../users/loginForm/loginForm";
import { createProfile } from "../../users/profile/profile";
import { createRegistrationForm } from "../../users/registrationForm/registrationForm";
import { makeRequest } from "../../../utils/api";
import { onClickHandler } from "../../../utils/onClickHandler";
import { dateElement } from "../../../utils/dateElementConfig";
import { createEventHero } from "../createEventHero/createEventHero";
import { createUsersList } from "../createUsersList/createUsersList";
import { eventDetailsButtonsContainer } from "../eventDetailsButtonsContainer/eventDetailsButtonsContainer";

//Componente que muestra todos los detalles de un evento. Dependiendo de si el user está autenticado, 
// es organizer o es asistente, mostrará unas cosas u otras
const authRequiredToSeeEventDetails = () => {
    const authRequired = document.createElement('div');
    authRequired.id = 'auth-required';
    const authRequiredH4 = document.createElement('h4');
    authRequiredH4.textContent = 'Inicia sesión para ver los detalles del evento';
    const authRequiredP = document.createElement('p');
    authRequiredP.textContent = '¿No estás registrado? Hazlo aqui';
    authRequiredH4.addEventListener('click', () => {
        onClickHandler('#main-container', () => createLoginForm(''))
    })
    authRequiredP.addEventListener('click', () => {
        onClickHandler('#main-container', () => createRegistrationForm(''))
    })

    authRequired.appendChild(authRequiredH4);
    authRequired.appendChild(authRequiredP);
    return authRequired;
}

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

        // Obtener la información del usuario del localStorage
        const userId = localStorage.getItem("userId");
        const accessToken = localStorage.getItem("accessToken");
        const isAuthenticated = userId && accessToken;

        mainContainer.appendChild(createEventHero(eventData));

        // Si el usuario no está autenticado, no le dejaremos ver los detalles del evento
        if (!isAuthenticated) {
            mainContainer.appendChild(authRequiredToSeeEventDetails());
        } else {
            // Si el usuario está autenticado, entonces que sí pueda ver los detalles del evento

            // Crear elementos HTML para mostrar los detalles del evento
            const eventDetailsContainer = document.createElement('div');
            eventDetailsContainer.classList.add('event-details-container');

            // Funciones que muestran organizadores y asistentes:
            showOrganizers(eventDetailsContainer, eventData);
            showAttendees(eventDetailsContainer, eventData);

            const locationElement = document.createElement('p');
            locationElement.textContent = `Ubicación: ${eventData.event.location}`;

            const descriptionElement = document.createElement('p');
            descriptionElement.textContent = `Descripción: ${eventData.event.description}`;

            // Agregar elementos al contenedor de detalles del evento
            eventDetailsContainer.appendChild(dateElement(eventData));
            eventDetailsContainer.appendChild(locationElement);
            eventDetailsContainer.appendChild(descriptionElement);

            
            eventDetailsContainer.appendChild(eventDetailsButtonsContainer(eventData, eventId, userId));
            
            // Agregar el contenedor de titulo e imagen, y el de detalles al contenedor principal
        
            mainContainer.appendChild(eventDetailsContainer);
        }
        return mainContainer;
        
    } catch (error) {
        console.error('Error al mostrar los detalles del evento:', error.message);
    }
};