import { createFooter } from '../footer/footer';
import { createHeader } from '../header/header';
import { heroContainer } from '../heroContent/heroContent';
import { mainContainer } from '../mainContainer/mainContainer';
import './home.css';

export function home() {
    // Crear contenedor principal del home
    const homeContainer = document.createElement('div');
    homeContainer.id = 'home-container';

    // Agregar elementos al homeContainer en el orden deseado
    homeContainer.appendChild(createHeader());
    homeContainer.appendChild(mainContainer()); // incluye heroContainer
    homeContainer.appendChild(createFooter());

    return homeContainer;
}
