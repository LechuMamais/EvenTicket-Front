import { loadContent } from "../components/global/home/home";

export function resizeDomActualization(){
    // En el caso en que el usuario modifique manualmente el tamaño del viewport,
    // necesitamos actualizar algunos componentes, que tienen estilos desde js
    actualizarComponenteHero();
}

function actualizarComponenteHero() {
    const homeContainer = document.querySelector('#home-container');
    if (homeContainer) {
        // Eliminar el contenido actual del contenedor del héroe
        console.log('actualizando el contenedor del héro');
        if (homeContainer) {
            homeContainer.innerHTML = '';
            loadContent(homeContainer)
        }

    }
}