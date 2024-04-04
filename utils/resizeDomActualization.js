import { heroContainer } from "../components/global/heroContent/heroContent";

// En el caso en que el usuario modifique manualmente el tamaño del viewport,
// necesitamos actualizar algunos componentes, que tienen estilos desde js
function actualizarComponenteHero() {
    const heroContainerDom = document.querySelector('.hero-container');
    if (heroContainerDom) {
        console.log("Rezise heroContainer")
        heroContainerDom.innerHTML = '';
        heroContainerDom.appendChild(heroContainer());

        const headerDom = document.querySelector('header');
        heroContainerDom.style.marginTop = `-${headerDom.offsetTop}px'`;
    }
}


export function resizeDomActualization(){
    actualizarComponenteHero();
}