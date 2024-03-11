import { EVENTS_URL } from "../../utils/apiUrls";
import { showEvents } from "../events/events";
import { createProfile } from "../profile/profile";
import { updateEventForm } from "../updateEventForm/updateEventForm";
import "./eventDetails.css";

export const showEventDetails = async (eventId) => {
    try {
        // Obtener los detalles del evento desde la API
        const response = await fetch(`${EVENTS_URL}/${eventId}`);
        if (!response.ok) {
            throw new Error('Error al obtener los detalles del evento');
        }
        const eventData = await response.json();

        // Obtener la información del usuario
        const userId = localStorage.getItem("userId");
        const accessToken = localStorage.getItem("accessToken");
        const isAuthenticated = userId && accessToken;

        let userEventsAsAttendee = []; // Inicializar la lista de eventos a los que asistirá el usuario
        let userEventsAsOrganizer = []; // Inicializar la lista de eventos a los que asistirá el usuario

        // Si el usuario está autenticado, obtener sus eventos
        if (isAuthenticated) {
            const userResponse = await fetch(`http://localhost:3000/api/users/${userId}`, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            });

            if (userResponse.ok) {
                const userData = await userResponse.json();
                userEventsAsAttendee = userData.eventsAsAttendee || [];
                userEventsAsOrganizer = userData.eventsAsOrganizer || [];
            }
        }

        // Especie de Hero del evento, con el elemento que contiene el titulo, y la imagen de fondo
        const imageElementContainer = document.createElement("div");
        imageElementContainer.classList.add('image-element-container');
        const backgroundImage = `url('${eventData.event.img}')`;
        imageElementContainer.style.backgroundImage = backgroundImage;

        const titleElement = document.createElement('h2');
        titleElement.textContent = eventData.event.title;
        imageElementContainer.appendChild(titleElement);

        // Crear elementos HTML para mostrar los detalles del evento
        const eventDetailsContainer = document.createElement('div');
        eventDetailsContainer.classList.add('event-details-container');

        const dateElement = document.createElement('p');
        dateElement.textContent = `Fecha: ${eventData.event.date}`;

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
            organizerElement.addEventListener('click', async () => {
                createProfile(organizer._id)
            })
            organizerListElement.appendChild(organizerElement)
            organizersList.appendChild(organizerListElement)
        });

        const organizersText = document.createElement('h3');
        organizersText.textContent = 'Organizadores: ';
        eventDetailsContainer.appendChild(organizersText);
        eventDetailsContainer.appendChild(organizersList);

        // Mostrar los nombres de los asistentes al evento:
        const attendees = eventData.attendees;
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
                attendeeElement.addEventListener('click', async () => {
                    createProfile(attendee._id)
                })
                attendeeListElement.appendChild(attendeeElement)
                attendeesList.appendChild(attendeeListElement)
            });
        }

        const attendeesText = document.createElement('h3');
        attendeesText.textContent = `Asistentes: ${eventData.attendees.length}`;
        eventDetailsContainer.appendChild(attendeesText);
        eventDetailsContainer.appendChild(attendeesList);

        // Agregar elementos al contenedor de detalles del evento
        eventDetailsContainer.appendChild(dateElement);
        eventDetailsContainer.appendChild(locationElement);
        eventDetailsContainer.appendChild(descriptionElement);

        // Agregar el contenedor de titulo e imagen, y el de detalles al contenedor principal
        const mainContainer = document.querySelector('#main-container');
        mainContainer.innerHTML = "";
        mainContainer.appendChild(imageElementContainer);
        mainContainer.appendChild(eventDetailsContainer);

        // Verificar si el usuario es organizdor del evento

        const isOrganizer = userEventsAsOrganizer.some(organizer => organizer._id === eventData.event._id);
        if (isAuthenticated && isOrganizer) {
            // Si es organizador del evento, mostraremos un boton para actualizar el evento, y otro para eliminar el evento

            // Boton que nos lleva a formulario para actualizar el evento
            const updateButton = document.createElement("button");
            updateButton.textContent = "Actualizar evento";
            updateButton.dataset.eventId = eventId; // Almacenar el eventId como un atributo de datos
            updateButton.addEventListener("click", (event) => {
                const eventId = event.target.dataset.eventId; // Obtener el eventId del atributo de datos del botón
                mainContainer.innerHTML = '';
                mainContainer.appendChild(updateEventForm(eventId, eventData.event)); // Pasar el eventId al componente updateEventForm
            });
            eventDetailsContainer.appendChild(updateButton);

            // Eliminar el evento
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Eliminar evento";
            deleteButton.addEventListener("click", async () => {
                try {
                    const response = await fetch(`http://localhost:3000/api/events/${eventId}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${accessToken}`
                        }
                    });
                    if (!response.ok) {
                        throw new Error("Error al eliminar el evento");
                    }
                    const updatedEventsContainer = await showEvents();
                    mainContainer.replaceWith(updatedEventsContainer);
                    alert("Evento eliminado correctamente");
                    window.location.reload();

                } catch (error) {
                    console.error("Error al eliminar el evento:", error.message);
                    alert("Error al eliminar el evento");

                }
            });
            eventDetailsContainer.appendChild(deleteButton);
        }


        // Si no es organizador, que pueda inscribirse al evento
        if (!isOrganizer) {

            // Verificar si el evento ya está en la lista de eventos a asistir del usuario
            const isAttendee = userEventsAsAttendee.some(userEvent => userEvent._id === eventData.event._id);

            // Si no está inscripto en el evento, mostramos un boton para que pueda inscribirse
            if (isAuthenticated && !isAttendee) {
                const attendButton = document.createElement("button");
                attendButton.textContent = "Asistir";
                attendButton.addEventListener("click", async () => {
                    try {
                        const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${accessToken}`
                            },
                            body: JSON.stringify({ eventsAsAttendee: eventData.event._id })
                        });

                        if (!response.ok) {
                            throw new Error("Error al asistir al evento");
                        }

                        alert("Te has inscripto al evento correctamente");
                        // Recargar los detalles del evento después de asistir
                        const updatedEventDetailsContainer = await showEvents();
                        mainContainer.innerHTML = '';
                        mainContainer.appendChild(updatedEventDetailsContainer);
                    } catch (error) {
                        console.error("Error al asistir al evento:", error.message);
                        alert("Error al asistir al evento");
                    }
                });
                eventDetailsContainer.appendChild(attendButton);

            } else if (isAuthenticated && isAttendee) {

                // Si ya está inscripto en el evento, lo indicamos en un span.
                const alreadyAttendeeSpan = document.createElement("span");
                alreadyAttendeeSpan.textContent = "Ya eres asistente!";
                eventDetailsContainer.appendChild(alreadyAttendeeSpan);

                // Y además mostraremos un boton, que al darle click cancele la asistencia al evento
                const cancelAttendButton = document.createElement("button");
                cancelAttendButton.textContent = "Cancelar Asistencia";
                cancelAttendButton.addEventListener("click", async () => {
                    try {
                        const response = await fetch(`http://localhost:3000/api/users/removeAttendance/${eventData.event._id}`, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${accessToken}`
                            },
                            body: JSON.stringify({ _id: userId })
                        });

                        if (!response.ok) {
                            throw new Error("Error al cancelar asistencia al evento");
                        }

                        alert("Has cancelado correctamente");
                        // Recargar la lista de eventos después de asistir
                        const updatedEventsContainer = await showEvents();
                        mainContainer.innerHTML = '';
                        mainContainer.appendChild(updatedEventsContainer);
                    } catch (error) {
                        console.error("Error al cancelar asistencia al evento:", error.message);
                        alert("Error al cancelar asistencia al evento");
                    }
                });
                eventDetailsContainer.appendChild(cancelAttendButton);
            }
        }
        return mainContainer;

    } catch (error) {
        console.error('Error al mostrar los detalles del evento:', error.message);
    }
};