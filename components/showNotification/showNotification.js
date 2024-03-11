import './showNotification.css'

export const showNotification = (message, type = 'info', duration = 3000) => {
    const notificationContainer = document.createElement('div');
    notificationContainer.classList.add('notification-container', `notification-${type}`);
    notificationContainer.textContent = message;

    document.body.appendChild(notificationContainer);

    // Ocultar la notificación después de cierto tiempo
    setTimeout(() => {
        notificationContainer.remove();
    }, duration);
};