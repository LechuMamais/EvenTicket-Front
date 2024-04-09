import './eventDetailsButtonsContainer.css'
import { updateEventForm } from "../updateEventForm/updateEventForm";
import { createButton } from "../../global/createButton/createButton";
import { deleteEvent } from "../../../utils/events/deleteEvent";
import { confirmAssistance } from "../../../utils/events/confirmAssistance";
import { cancelAssistance } from "../../../utils/events/cancelAssistance";


export const eventDetailsButtonsContainer = (eventData, eventId, userId) => {
    const eventDetailsButtonsContainer = document.createElement('div');
    eventDetailsButtonsContainer.id = 'event-details-buttons-container';

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
        eventDetailsButtonsContainer.appendChild(updateButton);

        // Llamamos al componente createButton y le pasamos la funcion que elimina evento, que importamos de utils
        const deleteEventButton = createButton("Eliminar evento", async () => { deleteEvent(eventId) }, { id: "delete-event-button", class: "button-delete" });
        eventDetailsButtonsContainer.appendChild(deleteEventButton);
    }

    // Si no es organizador, que pueda inscribirse al evento
    if (!isOrganizer) {
        // Verificar si el usuario está en la lista de asistentes al evento:
        // contrastamos la lista de asistentes con el id del usuario, que está en localStorage
        const isAttendee = eventData.attendees.some(user => user._id === userId);

        // Si no está inscripto en el evento, mostramos un boton para que pueda inscribirse
        if (!isAttendee) {
            // Llamamos al componente createButton y le pasamos la funcion que confirma asistencia a evento
            const confirmAssistanceButton = createButton("Asistir", async () => { confirmAssistance(userId, eventId) }, { id: "confirm-assistance-button", class: "button-primary" });
            eventDetailsButtonsContainer.appendChild(confirmAssistanceButton);

        } else if (isAttendee) {
            // Si ya está inscripto en el evento, lo indicamos en un span y mostramos un boton para que pueda inscribirse
            const alreadyAttendeeSpan = document.createElement("span");
            alreadyAttendeeSpan.textContent = "Ya eres asistente!";
            eventDetailsButtonsContainer.appendChild(alreadyAttendeeSpan);

            // Llamamos al componente createButton y le pasamos la funcion que cancela asistencia a evento que importamos de utils/events
            const cancelAttendButton = createButton("Cancelar Asistencia", async () => { cancelAssistance(userId, eventId) }, { id: "cancel-assistance-button", class: "button-primary" });
            eventDetailsButtonsContainer.appendChild(cancelAttendButton);
        }
    }
    return eventDetailsButtonsContainer
}
