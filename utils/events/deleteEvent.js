import { showEvents } from "../../components/eventss/events/events";
import { showNotification } from "../../components/global/showNotification/showNotification";
import { makeRequest } from "../api";
import { EVENTS_URL } from "../apiUrls";

// Funcion para eliminar el evento
export const deleteEvent = async (eventId) => {
    try {
        const response = await makeRequest(`${EVENTS_URL}/${eventId}`, 'DELETE');
        if (!response) {
            throw new Error("Error al eliminar el evento");
        } else {
            const updatedEventsContainer = await showEvents();
            const mainContainer = document.getElementById('main-container');
            mainContainer.replaceWith(updatedEventsContainer);
            showNotification('Evento eliminado correctamente!', 'delete')
        };
    } catch (error) {
        showNotification('No se ha podido eliminar el evento', 'error');
        console.error("Error al eliminar el evento:", error.message);
    }
}