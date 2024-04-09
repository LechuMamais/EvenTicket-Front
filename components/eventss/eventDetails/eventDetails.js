import "./eventDetails.css";
import { EVENTS_URL } from "../../../utils/apiUrls";
import { createLoginForm } from "../../users/loginForm/loginForm";
import { createProfile } from "../../users/profile/profile";
import { createRegistrationForm } from "../../users/registrationForm/registrationForm";
import { updateEventForm } from "../updateEventForm/updateEventForm";
import { makeRequest } from "../../../utils/api";
import { createButton } from "../../global/createButton/createButton";
import { onClickHandler } from "../../../utils/onClickHandler";
import { deleteEvent } from "../../../utils/events/deleteEvent";
import { confirmAssistance } from "../../../utils/events/confirmAssistance";
import { cancelAssistance } from "../../../utils/events/cancelAssistance";
import { dateElement } from "../../../utils/dateElementConfig";
import { createEventHero } from "../createEventHero/createEventHero";
import { createUsersList } from "../createUsersList/createUsersList";



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

            // Agregar el contenedor de titulo e imagen, y el de detalles al contenedor principal

            mainContainer.appendChild(eventDetailsContainer);

            // Verificar si el usuario es organizdor del evento
            const isOrganizer = eventData.event.createdBy === userId;

            if (isOrganizer) {
                // Si es organizador del evento, mostraremos un boton para actualizar el evento, y otro para eliminar el evento

                // Componente createButton que nos lleva a formulario para eliminar el evento, ya rellenado con los datos actuales del evento
                const updateButton = createButton("Actualizar evento", () => {
                    onClickHandler('.event-details-container', () => updateEventForm(event.target.dataset.eventId, eventData.event))
                },
                    { id: "update-event-button", class: "button-primary" });
                updateButton.dataset.eventId = eventId; // Almacenar el eventId como un atributo de datos
                eventDetailsContainer.appendChild(updateButton);

                // Llamamos al componente createButton y le pasamos la funcion que elimina evento, que importamos de utils
                const deleteEventButton = createButton("Eliminar evento", async () => { deleteEvent(eventId) }, { id: "delete-event-button", class: "button-delete" });
                eventDetailsContainer.appendChild(deleteEventButton);
            }

            // Si no es organizador, que pueda inscribirse al evento
            if (!isOrganizer) {
                // Verificar si el usuario está en la lista de asistentes al evento:
                // contrastamos la lista de asistentes con el id del usuario, que está en localStorage
                const isAttendee = eventData.attendees.some(user => user._id === userId);

                // Si no está inscripto en el evento, mostramos un boton para que pueda inscribirse
                if (isAuthenticated && !isAttendee) {
                    // Llamamos al componente createButton y le pasamos la funcion que confirma asistencia a evento
                    const confirmAssistanceButton = createButton("Asistir", async () => { confirmAssistance(userId, eventId) }, { id: "confirm-assistance-button", class: "button-primary" });
                    eventDetailsContainer.appendChild(confirmAssistanceButton);

                } else if (isAuthenticated && isAttendee) {
                    // Si ya está inscripto en el evento, lo indicamos en un span y mostramos un boton para que pueda inscribirse
                    const alreadyAttendeeSpan = document.createElement("span");
                    alreadyAttendeeSpan.textContent = "Ya eres asistente!";
                    eventDetailsContainer.appendChild(alreadyAttendeeSpan);

                    // Llamamos al componente createButton y le pasamos la funcion que cancela asistencia a evento que importamos de utils/events
                    const cancelAttendButton = createButton("Cancelar Asistencia", async () => { cancelAssistance(userId, eventId) }, { id: "cancel-assistance-button", class: "button-primary" });
                    eventDetailsContainer.appendChild(cancelAttendButton);
                }
            }
        }
        return mainContainer;

    } catch (error) {
        console.error('Error al mostrar los detalles del evento:', error.message);
    }
};