import { showEventDetails } from "../../components/eventss/eventDetails/eventDetails";
import { showNotification } from "../../components/global/showNotification/showNotification";
import { makeRequest } from "../api";
import { REMOVE_ASSISTANCE_URL } from "../apiUrls";

// Funcion de cancelar asistencia, quitar usuario de los asistentes de un evento
export const cancelAssistance = async (userId, eventId) => {
    try {
        const response = await makeRequest(`${REMOVE_ASSISTANCE_URL}/${userId}/${eventId}`, 'PUT')
        if (!response) {
            throw new Error("Error al cancelar asistencia al evento");
        } else {
            showNotification("Has cancelado asistencia correctamente", "success")
            // Recargar los detallos del evento después de cancelar asistencia
            const updatedEventsContainer = await showEventDetails(eventId);
            // Acá tuve que solucionar un problema con los parentNodes y tal, esta fue la solución que encontré:
            // Verificar si updatedEventsContainer es igual a mainContainer o si updatedEventsContainer contiene a mainContainer
            // Es la misma solucion que utilicé ne updateEventForm
            const mainContainer = document.getElementById("main-container");
            if (updatedEventsContainer === mainContainer || updatedEventsContainer.contains(mainContainer)) {
                // Si updatedEventsContainer ya contiene mainContainer, reemplazar mainContainer con updatedEventsContainer
                mainContainer.replaceWith(updatedEventsContainer);
            } else {
                // Si updatedEventsContainer no contiene mainContainer, simplemente limpiar mainContainer y agregar updatedEventsContainer como hijo
                mainContainer.innerHTML = ""; // Limpiar el contenedor principal
                mainContainer.appendChild(updatedEventsContainer); // Agregar el nuevo elemento DOM al contenedor principal
            }
        }
    } catch (error) {
        console.error("Error al cancelar asistencia al evento:", error.message);
        showNotification("Error al cancelar asistencia al evento", "error")
    }
}