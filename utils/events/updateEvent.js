import { showEventDetails } from "../../components/eventss/eventDetails/eventDetails";
import { showNotification } from "../../components/global/showNotification/showNotification";
import { makeRequest } from "../api";
import { EVENTS_URL } from "../apiUrls";

export const updateEvent = async (eventId, formData) => {
    try {
        const updatedEvent = await makeRequest(`${EVENTS_URL}/${eventId}`, 'PUT', formData);

        if (!updatedEvent) {
            throw new Error("Error al actualizar el evento");
        }

        showNotification('Evento actualizado correctamente', 'success')
        
        // Volver a mostrar los detalles del evento
        const mainContainer = document.querySelector('#main-container');
        const reloadContainer = await showEventDetails(updatedEvent._id);
    
        // Acá tuve que solucionar un problema con los parentNodes y tal, esta fue la solución que encontré:
        // Verificar si reloadContainer es igual a mainContainer o si reloadContainer contiene a mainContainer
        // Es la misma solucion que utilicé en eventDetails
        if (reloadContainer === mainContainer || reloadContainer.contains(mainContainer)) {
            // Si reloadContainer ya contiene mainContainer, reemplazar mainContainer con reloadContainer
            mainContainer.replaceWith(reloadContainer);
        } else {    
            // Si reloadContainer no contiene mainContainer, simplemente limpiar mainContainer y agregar reloadContainer como hijo
            mainContainer.innerHTML = ""; // Limpiar el contenedor principal
            mainContainer.appendChild(reloadContainer); // Agregar el nuevo elemento DOM al contenedor principal
        }
    } catch (error) {
        console.error("Error al actualizar el evento:", error.message);
        showNotification('No se ha podido actualizar el evento', 'error')
    }
}
