import './createAnimatedArrowDownToEvents.css'

export const giveArrowLeftMargin = (arrowDownToEvents)=>{
    const viewportWidth = window.innerWidth;
    // Para ubicarlo en el centro le ponemos de left la mitad del viewport - 1/2 de su tamaño y su padding left
    arrowDownToEvents.style.left = `${(viewportWidth * 0.5)-((32+32)/2)}px`;
}
const giveArrowTopMargin = (arrowDownToEvents)=>{
    const scrollTop = window.scrollY;
    const viewportHeight = window.innerHeight;
    arrowDownToEvents.style.top = `${(viewportHeight- scrollTop -100)}px`;
}

const scrollToEvents = () => {
    const headerHeight = document.querySelector('header').style.height;
    const eventsScrollPoint = window.innerHeight-headerHeight
    window.scrollTo({
        top: (eventsScrollPoint),
        behavior:'smooth'
    });
}
const hideOrShowOnScroll = (arrowDownToEvents,viewportHeight) => {
    const scrollTop = window.scrollY;
    const hideParameter = 0.35;
    // Ocultar
    if(scrollTop>=viewportHeight*hideParameter){
        arrowDownToEvents.style.color = 'transparent';
    }else{
        // Volver a mostrar si se scroll hacia arriba
        arrowDownToEvents.style.color = 'var(--color-dark)';
    }
}

// Componente de la flecha que aparece sobre el hero, que nos lleva directo a posicionarnos sobre los eventos.
export const createAnimatedArrowDownToEvents = (container) =>{
    // Creamos el botón de scroll hacia arriba hasta los eventos
    if (!container) { return }
    const arrowDownToEvents = document.createElement('div');
    arrowDownToEvents.id = 'arrow-down-to-events';
    arrowDownToEvents.innerHTML = `<i class="bi bi-chevron-compact-down"></i>`;
    arrowDownToEvents.style.position = 'absolute';
    giveArrowLeftMargin(arrowDownToEvents);
    giveArrowTopMargin(arrowDownToEvents)
    container.appendChild(arrowDownToEvents);
    arrowDownToEvents.style.color = 'transparent'; // Le damos un color transparent para que no sea visible

    // Que se haga visible después de un tiempo. Lo hacemos con style.color para que tenga transicion.
    setTimeout(() => {
        arrowDownToEvents.style.color= 'var(--color-dark)'
    },'1000');
    // Luego, le daremos el addEventListener: click
    arrowDownToEvents.addEventListener('click', () => {
        scrollToEvents()
    });
    // y le damos el addEventListener: scroll(para ocultarse)
    window.addEventListener('scroll', () => {
        const viewportHeight = window.innerHeight;
        giveArrowTopMargin(arrowDownToEvents)
        hideOrShowOnScroll(arrowDownToEvents,viewportHeight);
    });

}