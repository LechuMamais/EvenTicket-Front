import "./createNewEventForm.css";
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/dark.css";
import { createNewEvent } from "../../../utils/events/createNewEvent";
import { createEventForm } from "../eventForm/eventForm";
import { showNotification } from "../../global/showNotification/showNotification";


export const createNewEventForm = () => {
    window.scrollTo({ top: 0 }); // Asegurarnos de que el scroll esté arriba del todo en la página

    const form = createEventForm("new-event-form", "Crear Evento");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const titleInput = form.querySelector("#title");
        const dateInput = form.querySelector("#date");
        const locationInput = form.querySelector("#location");
        const descriptionInput = form.querySelector("#description");
        const imgInput = form.querySelector("#img");

        // Creamos un array para almacenar los nombres de los campos faltantes
        const missingFields = [];

        // Validar que los campos obligatorios no estén vacíos y registrar los campos faltantes
        if (!titleInput.value) missingFields.push("Título");
        if (!dateInput.value) missingFields.push("Fecha");
        if (!locationInput.value) missingFields.push("Ubicación");
        if (!descriptionInput.value) missingFields.push("Descripción");
        if (!imgInput.value) missingFields.push("Imagen (URL)");

        // Verificar si hay campos faltantes y mostrar el mensaje de error correspondiente
        if (missingFields.length > 0) {
            const missingFieldsText = missingFields.join(", ");
            showNotification(`Los siguientes campos son obligatorios: ${missingFieldsText}`, "error");
            return;
        }

        const userId = localStorage.getItem("userId");
        const formData = {
            title: titleInput.value,
            date: new Date(dateInput.value).toISOString(), // Formatear la fecha a ISODate
            location: locationInput.value,
            description: descriptionInput.value,
            img: imgInput.value,
            createdBy: userId
        };

        createNewEvent(userId, formData);
    });

    return form;
};