import { heroContainer } from "../components/global/heroContent/heroContent";
import { giveHeaderHomeTitleInitialStyles } from "./giveHeaderHomeTitleInitialStyles";

// En el caso en que el usuario modifique manualmente el tamaño del viewport,
// necesitamos actualizar algunos componentes, que tienen estilos desde js
function actualizarComponenteHero() {
    const heroContainerDom = document.querySelector('.hero-container');
    if (heroContainerDom) {
        console.log("Rezise heroContainer");
        // Para que se actualice correctamente, lo quitamos con remove y lo volvemos a cargar
        heroContainerDom.remove;
        heroContainer();
        // Y una vez cargado, le damos los estilos iniciales pasandole el paramentro component.home 
        // Simulando pasarle un componente que tiene esa propiedad, para que la función entienda que está el home, y
        // que por lo tanto está el hero, y aplique los estilos correctos.
        // Podría mejorarse esta lógica.
        const component = {name:'home'};
        giveHeaderHomeTitleInitialStyles(component);
    }
}


export function resizeDomActualization(){
    actualizarComponenteHero();

}