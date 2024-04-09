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
import "./eventDetails.css";

export const showEventDetails = async (eventId) => {
    window.scrollTo({ top: 0 }); // Asegurarnos de que el scroll esté arriba del todo en la pag
    const mainContainer = document.querySelector('#main-container');

    try {
        // Obtener los detalles del evento desde la API
        const response = await makeRequest(`${EVENTS_URL}/${eventId}`, 'GET');

        if (!response) {
            throw new Error('Error al obtener los detalles del evento');
        }
        const eventData = response

        // Obtener la información del usuario
        const userId = localStorage.getItem("userId");
        const accessToken = localStorage.getItem("accessToken");
        const isAuthenticated = userId && accessToken;

        // Especie de Hero del evento, con el elemento que contiene el titulo, y la imagen de fondo
        const imageElementContainer = document.createElement("div");
        imageElementContainer.classList.add('image-element-container');
        const backgroundImage = `url('${eventData.event.img}')`;
        imageElementContainer.style.backgroundImage = backgroundImage;

        // Este Hero va a tener un efecto Parallax:
        window.addEventListener('scroll', function () {
            const scrollTop = window.scrollY;
            const parallaxFactor = 0.5; // Factor de parallax 

            // Calculamos la nueva posición vertical de la imagen
            const translateY = scrollTop * parallaxFactor;

            // Y aplica la transformación CSS a la imagen
            imageElementContainer.style.transform = `translateY(${translateY}px)`;
        });

        const titleElement = document.createElement('h2');
        titleElement.textContent = eventData.event.title;
        imageElementContainer.appendChild(titleElement);

        mainContainer.appendChild(imageElementContainer);

        // Si el usuario no está autenticado, no le dejaremos ver los detalles del evento
        if (!isAuthenticated) {
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

            //mainContainer.appendChild(imageElementContainer);
            mainContainer.appendChild(authRequired);

        } else if (isAuthenticated) {
            // Si el usuario está autenticado, entonces que sí pueda ver los detalles del evento

            // Crear elementos HTML para mostrar los detalles del evento
            const eventDetailsContainer = document.createElement('div');
            eventDetailsContainer.classList.add('event-details-container');

            // Para mostrar la fecha y hora, hay que formatearla un poco. Podría utilizar moment.js,
            // pero he decidido utilizar Intl.DateTimeFormat que es de javascript nativo.
            const eventDate = eventData.event.date;
            const formattedDate = new Date(eventDate);

            const options = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                timeZone: 'UTC'
            };

            const formattedDateString = new Intl.DateTimeFormat('es-ES', options).format(formattedDate);
            const dateElement = document.createElement('p');
            dateElement.textContent = `Fecha: ${formattedDateString}`;

            const locationElement = document.createElement('p');
            locationElement.textContent = `Ubicación: ${eventData.event.location}`;

            const descriptionElement = document.createElement('p');
            descriptionElement.textContent = `Descripción: ${eventData.event.description}`;


            // Mostrar los nombres de los organizadores del evento:
            const organizers = eventData.organizers;
            const organizersList = document.createElement('ul');
            organizers.forEach((organizer) => {
                const organizerListElement = document.createElement('li');
                const organizerElement = document.createElement('p');
                organizerElement.textContent = `${organizer.userName}`;
                organizerElement.classList.add('organizer');
                const handleProfileClick = async () => {
                    // Llama a createProfile solo cuando se hace clic en el elemento
                    await createProfile(organizer._id);
                };
                organizerElement.addEventListener('click', () => {
                    onClickHandler('#main-container', handleProfileClick);
                });
                organizerListElement.appendChild(organizerElement)
                organizersList.appendChild(organizerListElement)
            });

            const organizersText = document.createElement('h3');
            organizersText.textContent = 'Organizadores: ';
            eventDetailsContainer.appendChild(organizersText);
            eventDetailsContainer.appendChild(organizersList);

            // Mostrar los nombres de los asistentes al evento:
            const attendees = eventData.attendees || [];
            const attendeesList = document.createElement('ul');
            if (attendees.length === 0) {
                const attendeeListElement = document.createElement('li');
                attendeeListElement.innerHTML = `<h4>Aún no hay asistentes a este evento</h4>`;
                attendeesList.appendChild(attendeeListElement)
            } else {
                attendees.forEach((attendee) => {
                    const attendeeListElement = document.createElement('li');
                    const attendeeElement = document.createElement('p');
                    attendeeElement.textContent = `${attendee.userName}`;
                    attendeeElement.classList.add('attendee');
                    const handleProfileClick = async () => {
                        // Llama a createProfile solo cuando se hace clic en el elemento
                        await createProfile(attendee._id);
                    };
                    attendeeElement.addEventListener('click', () => {
                        onClickHandler('#main-container', handleProfileClick);
                    });
                    /*attendeeElement.addEventListener('click', async () => {
                        createProfile(attendee._id)
                    })*/
                    attendeeListElement.appendChild(attendeeElement)
                    attendeesList.appendChild(attendeeListElement)
                });
            }

            const attendeesText = document.createElement('h3');
            attendeesText.textContent = `Asistentes: ${attendees.length}`;
            eventDetailsContainer.appendChild(attendeesText);
            eventDetailsContainer.appendChild(attendeesList);

            // Agregar elementos al contenedor de detalles del evento
            eventDetailsContainer.appendChild(dateElement);
            eventDetailsContainer.appendChild(locationElement);
            eventDetailsContainer.appendChild(descriptionElement);

            // Agregar el contenedor de titulo e imagen, y el de detalles al contenedor principal

            mainContainer.appendChild(eventDetailsContainer);

            // Verificar si el usuario es organizdor del evento
            const isOrganizer = eventData.event.createdBy === userId;

            if (isAuthenticated && isOrganizer) {
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