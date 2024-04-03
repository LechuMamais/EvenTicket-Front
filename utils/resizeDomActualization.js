import { heroContainer } from "../components/global/heroContent/heroContent";

// En el caso en que el usuario modifique manualmente el tamaño del viewport,
// necesitamos actualizar algunos componentes, que tienen estilos desde js
function actualizarComponenteHero() {
    const heroContainerDom = document.querySelector('.hero-container');
    if (heroContainerDom) {
        heroContainerDom.innerHTML = '';
        heroContainerDom.appendChild(heroContainer())
    }
}

export function resizeDomActualization(){
    actualizarComponenteHero();
}