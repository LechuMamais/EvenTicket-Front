import { NEW_EVENTS_URL } from "../../../utils/apiUrls";
import flatpickr from "flatpickr";
import { createProfile } from "../../users/profile/profile";
import { showNotification } from "../../global/showNotification/showNotification";
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/dark.css";
import "./createNewEventForm.css";
import { makeRequest } from "../../../utils/api";

export const createNewEventForm = () => {
    window.scrollTo({ top: 0}); // Asegurarnos de que el scroll esté arriba del todo en la pag

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

    // Vamos a utilizar Flatpickr para el campo de fecha y hora.
    // De esta manera estandarizamos el formato en el que se envía el datetime al servidor.
    // El formato que vamos a utilizar es el de mongoDB, que es el formato de fecha y hora de JavaScript (ISODate)
    flatpickr(form.querySelector("#date"), {
        enableTime: true, // Habilita la selección de hora
        dateFormat: "Y-m-d H:i", // Formato de fecha y hora
        time_24hr: true // Usa formato de 24 horas
    });

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        // obtenemos del localShotare los datos de usuario
        const userId = localStorage.getItem("userId");
        //const accessToken = localStorage.getItem("accessToken");

        const formData = {
            title: form.querySelector("#title").value,
            date: new Date(form.querySelector("#date").value).toISOString(), // Formatear la fecha a ISODate
            location: form.querySelector("#location").value,
            description: form.querySelector("#description").value,
            img: form.querySelector("#img").value,
            createdBy: userId
        };

        try {
            const response = await makeRequest(`${NEW_EVENTS_URL}/${userId}`, 'POST', formData);
            console.log(response);        
            if (!response) {
                throw new Error("No se recibió respuesta del servidor");
            }
            
            // Acceder a las propiedades de los datos JSON devueltos por makeRequest
            await showNotification("El evento "+ response.event.title +" ha sido creado con éxito", "new-event-created");
            createProfile()
        } catch (error) {
            console.error("Error al crear el evento:", error.message);
            alert("Error al crear el evento");
        }
        
    });

    return form;
}