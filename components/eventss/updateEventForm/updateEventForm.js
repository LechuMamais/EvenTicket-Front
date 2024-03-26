import { updateEvent } from '../../../utils/events/updateEvent';
import { createEventForm } from '../eventForm/eventForm';
import './updateEventForm.css'

export const updateEventForm = (eventId, eventData) => {
    window.scrollTo({ top: 0}); // Asegurarnos de que el scroll esté arriba del todo en la pag

    const form = createEventForm("update-event-form", "Actualizar Evento");

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

        updateEvent(eventId, formData);
    });

    return form;
};
