import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/dark.css";
import { createNewEvent } from "../../../utils/events/createNewEvent";
import { createEventForm } from "../eventForm/eventForm";
import "./createNewEventForm.css";

export const createNewEventForm = () => {
    window.scrollTo({ top: 0}); // Asegurarnos de que el scroll esté arriba del todo en la pag

    const form = createEventForm("new-event-form", "Crear Evento");

    form.addEventListener("submit", async (event) => {
        const userId = localStorage.getItem("userId")

        event.preventDefault();

        const formData = {
            title: form.querySelector("#title").value,
            date: new Date(form.querySelector("#date").value).toISOString(), // Formatear la fecha a ISODate
            location: form.querySelector("#location").value,
            description: form.querySelector("#description").value,
            img: form.querySelector("#img").value,
            createdBy: userId
        };

        createNewEvent(userId,formData)
    });

    return form;
}