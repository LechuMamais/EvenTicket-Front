import { giveArrowLeftMargin } from "../components/global/createAnimatedArrowDownToEvents/createAnimatedArrowDownToEvents";
import { heroContainer } from "../components/global/heroContent/heroContent";

// En el caso en que el usuario modifique manualmente el tamaño del viewport,
// necesitamos actualizar algunos componentes, que tienen estilos desde js
export function resizeDomActualization() {
    // actualizar componente hero - incluye las modificaciones al header, que lo hacen hero
    const heroContainerDom = document.querySelector('.hero-container');
    if (heroContainerDom) {
        //console.log("Rezise heroContainer");
        // Para que se actualice correctamente, lo quitamos con remove y lo volvemos a cargar
        heroContainerDom.remove;
        heroContainer();
        // Ahora actualizamos la createAnimatedArrowDownToEvents()
        const arrowDownToEvents = document.querySelector('#arrow-down-to-events')
        giveArrowLeftMargin(arrowDownToEvents)
    }
}