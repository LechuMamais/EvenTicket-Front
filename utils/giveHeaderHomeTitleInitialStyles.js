import { createAnimatedArrowDownToEvents, removeArrowDownToEvents } from "../components/global/createAnimatedArrowDownToEvents/createAnimatedArrowDownToEvents";
import { headerTitleModifier } from "../components/global/heroContent/heroContent";

const headerInitialStyles = (headerContainer)=>{
    headerContainer.style.backgroundImage = `url('/background-hero.jpg')`; // Le damos fondo al header
    headerContainer.style.backgroundPositionY = 'bottom';
    const headerHomeTitle = document.querySelector("#header-home-link-container a");
    headerHomeTitle.style.fontSize = '20px';
    const headerHomeLinkContainer =document.querySelector("#header-home-link-container");
    headerHomeLinkContainer.style.marginTop = '0px';
}

export const giveHeaderHomeTitleInitialStyles = (component = '') => {
    //console.log('Dando al header home title los estilos iniciales')
    const heroContainer = document.querySelector('.hero-container');
    const headerContainer = document.querySelector('header');

    // Acomodamos el texto del header, en el caso en el que no haya hero
    if (!heroContainer) {
        //console.log('No hay heroContainer')
        headerInitialStyles(headerContainer);
        // Y, si no hay hero, la función que oculta la flechita del hero
        removeArrowDownToEvents();
    }

    if(component.name=='home'){
        //console.log('Hay heroContainer')
        headerContainer.style.backgroundImage = ''; // Vacía el fondo del header
        // Si hay hero, le ponemos al header las modificaciones necesarias, que están definidas en:
        headerTitleModifier();
        createAnimatedArrowDownToEvents(headerContainer);
    }
}
