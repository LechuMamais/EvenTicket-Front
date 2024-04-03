import { showEvents } from '../../eventss/events/events';
import { heroContainer } from '../heroContent/heroContent';
import './home.css';

async function loadContent(homeContainer) {
    try {
        const hero = heroContainer()
        const events = await showEvents();
        homeContainer.appendChild(hero);
        homeContainer.appendChild(events);
    }
    catch (err) {
        console.error('Error al cargar el contenido:', err.message);
    }
}

export function home() {
    // Crear contenedor principal del home
    const homeContainer = document.createElement('div');
    homeContainer.id = 'home-container';

    loadContent(homeContainer);
    return homeContainer;
}
