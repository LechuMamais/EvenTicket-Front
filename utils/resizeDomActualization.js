import { heroContainer } from "../components/global/heroContent/heroContent";

// En el caso en que el usuario modifique manualmente el tamaño del viewport,
// necesitamos actualizar algunos componentes, que tienen estilos desde js
function actualizarComponenteHero() {
    const heroContainerDom = document.querySelector('.hero-container');
    if (heroContainerDom) {
        console.log("Rezise heroContainer");
        // Para que se actualice correctamente, lo quitamos con remove y lo volvemos a cargar
        heroContainerDom.remove;
        heroContainer();

    }
}


export function resizeDomActualization(){
    actualizarComponenteHero();

}