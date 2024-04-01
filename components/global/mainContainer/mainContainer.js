import { createLoginForm } from '../../users/loginForm/loginForm';
import { CHECK_LOGGED_URL } from '../../../utils/apiUrls';
import { showEvents } from '../../eventss/events/events';
import { heroContainer } from '../heroContent/heroContent';
import { makeRequest } from '../../../utils/api';
import './mainContainer.css';

// Función para redirigir al login, en caso de no haber userId o accessToken, o si hubo algún error en chequear si el usuario está logueado,

async function redirectToLogin (mainContainer, userName = ''){
        localStorage.clear();
        const loginForm = await createLoginForm(userName);
        if(mainContainer){mainContainer.appendChild(loginForm)};
}

// Función para realizar el fetch y obtener los datos del usuario
async function fetchUserData(userId, accessToken, mainContainer) {
    try {
        const response = await makeRequest(`${CHECK_LOGGED_URL}/${userId}`, 'GET', null, {"Content-Type": "application/json", "Authorization": `Bearer ${accessToken}`});
        return response;
    } catch (error) {
        redirectToLogin(mainContainer);
        throw new Error(`Error en la solicitud a ${CHECK_LOGGED_URL}/${userId}: ${error.message}`);
    }
}

// Función principal
export function mainContainer(userName = '') {
    const mainContainer = document.createElement('main');
    mainContainer.id = 'main-container';

    // Obtener el userId y el accessToken guardados en localStorage
    const userId = localStorage.getItem("userId");
    const accessToken = localStorage.getItem("accessToken");

    if (!userId || !accessToken) {
        redirectToLogin(mainContainer);
        return mainContainer;
    }

    // Definir una función async para cargar el contenido del contenedor principal
    async function loadContent() {
        try {
            // Si hay userId y accessToken tenemos que chequear que sean correctos.
            // Para eso tenemos una ruta que recibe userId y accessToken, chequea que el user esté
            // Autenticado, y devuelve sus datos.
            // Utiliza el mismo controller que getUserById, pero con el middleware de autenticación.
            const response = await fetchUserData(userId, accessToken, mainContainer);

            // Si hay algun error en la response, redirigimos al login
            if (!response) {
                redirectToLogin(mainContainer, userName)
            } else {
                // Si son correctos significa que el user está logueado, entonces mostramos los eventos
                const hero = await heroContainer(mainContainer)
                const events = await showEvents();
                mainContainer.appendChild(hero);
                mainContainer.appendChild(events);
            }
        }
        catch (err) {
            console.error('Error al cargar el contenido:', error.message);
        }
    }

    // Llamar a la función async para cargar el contenido del contenedor principal
    loadContent();

    return mainContainer;
}
