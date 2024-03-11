import { showEvents } from '../events/events';
import { createLoginForm } from '../loginForm/loginForm';
import './mainContainer.css';

export function mainContainer() {
    const mainContainer = document.createElement('main');
    mainContainer.id = 'main-container';

    // Obtener el userId y el accessToken guardados en localStorage
    const userId = localStorage.getItem("userId");
    const accessToken = localStorage.getItem("accessToken");

    // Definir una función async para cargar el contenido del contenedor principal
    async function loadContent() {
        if (userId && accessToken) {
            const events = await showEvents();
            mainContainer.appendChild(events);
        } else {
            const loginForm = await createLoginForm();
            mainContainer.appendChild(loginForm);
        }
    }

    // Llamar a la función async para cargar el contenido del contenedor principal
    loadContent();

    return mainContainer;
}  