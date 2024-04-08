import './createAnimatedArrowDownToEvents.css'

export const giveArrowLeftMargin = (arrowDownToEvents)=>{
    const viewportWidth = window.innerWidth;
    arrowDownToEvents.style.left = `${(viewportWidth * 0.5)-(43/2)-16}px`;
}

const scrollToEvents = () => {
    const headerHeight = document.querySelector('header').style.height;
    const eventsScrollPoint = window.innerHeight-headerHeight
    window.scrollTo({
        top: (eventsScrollPoint),
        behavior:'smooth'
    });
}

// Componente de la flecha que aparece sobre el hero, que nos lleva directo a posicionarnos sobre los eventos.
export const createAnimatedArrowDownToEvents = (heroContainer) =>{
    // Creamos el botón de scroll hacia arriba hasta los eventos
    if (!heroContainer) { return }
    const viewportHeight = window.innerHeight;
    const arrowDownToEvents = document.createElement('div');
    arrowDownToEvents.id = 'arrow-down-to-events';
    arrowDownToEvents.innerHTML = `<i class="bi bi-chevron-compact-down"></i>`;
    arrowDownToEvents.style.position = 'absolute';
    arrowDownToEvents.style.top = `${(viewportHeight -100)}px`;
    giveArrowLeftMargin(arrowDownToEvents);
    heroContainer.appendChild(arrowDownToEvents);
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
        const scrollTop = window.scrollY;
        // Ocultar
        if(scrollTop>=viewportHeight*0.35){
            arrowDownToEvents.style.color = 'transparent';
        }else{
            // Volver a mostrar si se scroll hacia arriba
            arrowDownToEvents.style.color = 'var(--color-dark)';
        }
    });

}