import { NEW_EVENTS_URL } from "../../utils/apiUrls";
import { createProfile } from "../profile/profile";
import "./createNewEventForm.css";

export const createNewEventForm = () => {

    const form = document.createElement("form");
    form.id = "new-event-form";
    form.innerHTML = `
        <h2>Crear Nuevo Evento</h2>
        <label for="title">Título:</label><br>
        <input type="text" id="title" name="title"><br>
        
        <label for="date">Fecha:</label><br>
        <input type="text" id="date" name="date"><br>
        
        <label for="location">Ubicación:</label><br>
        <input type="text" id="location" name="location"><br>
        
        <label for="description">Descripción:</label><br>
        <textarea id="description" name="description"></textarea><br>

        <label for="img">Imagen (URL):</label><br>
        <input type="text" id="img" name="img"><br>
        
        <button type="submit">Crear Evento</button>
    `;

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = {
            title: form.querySelector("#title").value,
            date: form.querySelector("#date").value,
            location: form.querySelector("#location").value,
            description: form.querySelector("#description").value,
            img: form.querySelector("#img").value // Nueva propiedad para la imagen
        };

        try {
            const userId = localStorage.getItem("userId");
            const accessToken = localStorage.getItem("accessToken");
            // Realizar la solicitud POST al endpoint /api/events para crear un nuevo evento
            const response = await fetch(`${NEW_EVENTS_URL}/${userId}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Error al crear el evento");
            }

            const data = await response.json();

            // Mostrar un mensaje de éxito y limpiar el formulario
            alert("Evento creado exitosamente");
            createProfile()
        } catch (error) {
            console.error("Error al crear el evento:", error.message);
            alert("Error al crear el evento");
        }
    });

    return form;
}
