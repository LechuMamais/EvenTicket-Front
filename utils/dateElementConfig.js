export const dateElement = (eventData) => {
    // Para mostrar la fecha y hora, hay que formatearla un poco. Podría utilizar moment.js,
    // pero he decidido utilizar Intl.DateTimeFormat que es de javascript nativo.
    const eventDate = eventData.event.date;
    const formattedDate = new Date(eventDate);

    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: 'UTC'
    };

    const formattedDateString = new Intl.DateTimeFormat('es-ES', options).format(formattedDate);
    const dateElement = document.createElement('p');
    dateElement.textContent = `Fecha: ${formattedDateString}`;
    return dateElement;
}