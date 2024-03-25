import { createLoginForm } from '../../users/loginForm/loginForm';
import { CHECK_LOGGED_URL } from '../../../utils/apiUrls';
import { showEvents } from '../../eventss/events/events';
import { heroContainer } from '../heroContent/heroContent';
import { makeRequest } from '../../../utils/api';
import './mainContainer.css';

// Función para realizar el fetch y obtener los datos del usuario
async function fetchUserData(userId, accessToken) {
    try {
        const response = await makeRequest(`${CHECK_LOGGED_URL}/${userId}`, 'GET', null, {"Content-Type": "application/json", "Authorization": `Bearer ${accessToken}`});
        return response;
    } catch (error) {
        // Captura y maneja cualquier error en la solicitud fetchUserData
        throw new Error(`Error en la solicitud a ${CHECK_LOGGED_URL}/${userId}: ${error.message}`);
    }
}

// Función principal del componente
export function mainContainer(userName = '') {
    const mainContainer = document.createElement('main');
    mainContainer.id = 'main-container';

    // Obtener el userId y el accessToken guardados en localStorage
    const userId = localStorage.getItem("userId");
    const accessToken = localStorage.getItem("accessToken");

    // Definir una función async para cargar el contenido del contenedor principal
    async function loadContent() {
        if (!userId || !accessToken) {
            // Si no hay userId o accessToken, borramos el localStorage (para limpiar cualquier dato de sesion)
            // Y mostramos el formulario de login
            const loginForm = await createLoginForm(userName);
            mainContainer.appendChild(loginForm);
        } else {
            // Si hay userId y accessToken tenemos que chequear que sean correctos.
            // Para eso tenemos una ruta que recibe userId y accessToken, chequea que el user esté
            // Autenticado, y devuelve sus datos.
            // Utiliza el mismo controller que getUserById, pero con el middleware de autenticación.

            const response = await fetchUserData(userId, accessToken);

            // Si hay algun error en la response, mostramos menmsaje de error
            if (!response) {
                localStorage.clear();
                const loginForm = await createLoginForm();
                mainContainer.appendChild(loginForm);
            } else {
                // Si son correctos significa que el user está logueado, entonces mostramos los eventos
                const hero = await heroContainer(mainContainer)
                const events = await showEvents();
                mainContainer.appendChild(hero);
                mainContainer.appendChild(events);
            }
        }
    }

    // Llamar a la función async para cargar el contenido del contenedor principal
    loadContent();

    return mainContainer;
}
