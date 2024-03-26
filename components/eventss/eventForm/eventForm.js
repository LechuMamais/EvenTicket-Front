import flatpickr from "flatpickr";
import './eventForm.css'

export const createEventForm = (formId, submitText) =>{
    const form = document.createElement("form");
    form.id = formId;
    form.classList.add("event-form", formId);
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
        
        <button type="submit">${submitText}</button>
    `;

    // Vamos a utilizar Flatpickr para el campo de fecha y hora.
    // De esta manera estandarizamos el formato en el que se envía el datetime al servidor.
    // El formato que vamos a utilizar es el de mongoDB, que es el formato de fecha y hora de JavaScript (ISODate)
    flatpickr(form.querySelector("#date"), {
        enableTime: true, // Habilita la selección de hora
        dateFormat: "Y-m-d H:i", // Formato de fecha y hora
        time_24hr: true // Usa formato de 24 horas
    });
    return form;
}