import { EVENTS_URL } from '../../../utils/apiUrls';
import { showEventDetails } from '../../eventss/eventDetails/eventDetails';
import './updateEventForm.css'

export const updateEventForm = (eventId, eventData) => {
    // Obtener el userId y el accessToken guardados en localStorage
    const userId = localStorage.getItem("userId");
    const accessToken = localStorage.getItem("accessToken");

    const form = document.createElement("form");
    form.id = "update-event-form";

    form.innerHTML = `
        <h2>Actualizar Evento</h2>
        <label for="title">Título:</label><br>
        <input type="text" id="title" name="title"><br>
        
        <label for="date">Fecha:</label><br>
        <input type="text" id="date" name="date"><br>
        
        <label for="location">Ubicación:</label><br>
        <input type="text" id="location" name="location"><br>
        
        <label for="description">Descripción:</label><br>
        <textarea id="description" name="description"></textarea><br>
        
        <label for="img">Imagen:</label><br>
        <input type="text" id="img" name="img"><br>
        
        <button type="submit">Actualizar Evento</button>
    `;

    form.querySelector("#title").value = eventData.title;
    form.querySelector("#date").value = eventData.date;
    form.querySelector("#location").value = eventData.location;
    form.querySelector("#description").value = eventData.description;
    form.querySelector("#img").value = eventData.img;

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = {
            title: form.querySelector("#title").value,
            date: form.querySelector("#date").value,
            location: form.querySelector("#location").value,
            description: form.querySelector("#description").value,
            img: form.querySelector("#img").value
        };

        try {
            const response = await fetch(`${EVENTS_URL}/${eventId}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Error al actualizar el evento");
            }
        
            const updatedEvent = await response.json();
            
            // Volver a los detalles del evento
            const mainContainer = document.querySelector('#main-container');
            const reloadContainer = await showEventDetails(updatedEvent._id); // Obtener el nuevo elemento DOM
        
            // Acá tuve que solucionar un problema con los parentNodes y tal, esta fue la solución que encontré:
            // Verificar si reloadContainer es igual a mainContainer o si reloadContainer contiene a mainContainer
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
            alert("Error al actualizar el evento");
        }
    });

    return form;
};
