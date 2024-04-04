import { headerTitleModifier } from "../components/global/heroContent/heroContent";

export const giveHeaderHomeTitleInitialStyles = (component = '') => {
    const heroContainer = document.querySelector('.hero-container');
    console.log('Dando al header home title los estilos iniciales')

    // Acomodamos el texto del header, en el caso en el que no haya hero
    const headerContainer = document.querySelector('header');
    if (!heroContainer) {
        console.log('No hay heroContainer')
        headerContainer.style.backgroundImage = `url('/background-hero.jpg')`; // Le damos fondo al header
        headerContainer.style.backgroundPositionY = 'bottom';
        const headerHomeTitle = document.querySelector("#header-home-link-container a");
        headerHomeTitle.style.fontSize = '20px';
        const headerHomeLinkContainer =document.querySelector("#header-home-link-container");
        headerHomeLinkContainer.style.marginTop = '0px';
    }
    //console.log(component.name)
    if(component.name=='home'){
        console.log('Hay heroContainer')
        console.log(headerContainer);
        headerContainer.style.backgroundImage = ''; // Vacía el fondo del header
        // Si hay hero, le ponemos al header las modificaciones necesarias, que están definidas en:s
        headerTitleModifier()
    }


}
