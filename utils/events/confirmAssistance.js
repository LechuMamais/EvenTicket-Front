import { showEventDetails } from "../../components/eventss/eventDetails/eventDetails";
import { showNotification } from "../../components/global/showNotification/showNotification";
import { makeRequest } from "../api";
import { ADD_ASSISTANCE_URL } from "../apiUrls";

// Funcion de confirmar asistencia, agregar usuario a asistentes de un evento
export const confirmAssistance = async (userId, eventId) => {
    try {
        const response = await makeRequest(`${ADD_ASSISTANCE_URL}/${userId}/${eventId}`, 'PUT');

        if (!response) {
            throw new Error("Error al asistir al evento");
        } else {
            showNotification("Te has inscripto al evento correctamente", "success")
            // Recargar los detalles del evento después de asistir
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
        console.error("Error al asistir al evento:", error.message);
        showNotification("Error al asistir al evento", "error")
    }
}