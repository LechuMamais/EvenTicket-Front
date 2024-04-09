import './createEventHero.css';

export const createEventHero = (eventData) => {
    // Especie de Hero del evento, con el elemento que contiene el titulo, y la imagen de fondo
    const imageElementContainer = document.createElement("div");
    imageElementContainer.classList.add('image-element-container');
    const backgroundImage = `url('${eventData.event.img}')`;
    imageElementContainer.style.backgroundImage = backgroundImage;

    // Este Hero va a tener un efecto Parallax:
    window.addEventListener('scroll', function () {
        const scrollTop = window.scrollY;
        const parallaxFactor = 0.5; // Factor de parallax 
        // Calculamos la nueva posición vertical de la imagen
        const translateY = scrollTop * parallaxFactor;
        // Y aplica la transformación CSS a la imagen
        imageElementContainer.style.transform = `translateY(${translateY}px)`;
    });

    const titleElement = document.createElement('h2');
    titleElement.textContent = eventData.event.title;
    imageElementContainer.appendChild(titleElement);
    return imageElementContainer;
}