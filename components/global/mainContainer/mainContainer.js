import { home } from '../home/home';
import './mainContainer.css';

export function mainContainer() {
    let mainContainer = document.querySelector('#main-container');
    if (mainContainer == null || mainContainer == '' || mainContainer == undefined || !mainContainer) {
        mainContainer = document.createElement('div');
        mainContainer.id = 'main-container';
    }

    // Cargar el contenido del contenedor principal
    try {
        mainContainer.appendChild(home());
    }
    catch (err) {
        console.error('Error al cargar el contenido:', err.message);
    }

    return mainContainer;
}
