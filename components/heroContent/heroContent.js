import './heroContent.css';

import './heroContent.css';

export function heroContainer() {
    // Crear contenedor principal del héroe
    const heroContainer = document.createElement('div');
    heroContainer.classList.add('hero-container');

    // Crear héroe con imagen de fondo
    const hero = document.createElement('div');
    hero.classList.add('hero');
    heroContainer.appendChild(hero);

    // Crear título INSOMNIA
    const title = document.createElement('h1');
    title.textContent = 'INSOMNIA';
    title.classList.add('hero-title');
    hero.appendChild(title);


    // Definimos scrollPosition
    var scrollPosition = window.scrollY;

    // Función para ajustar el tamaño del título y el contenido debajo
    const adjustTitleSize = () => {
        scrollPosition = window.scrollY;
        console.log(scrollPosition);
        const heroHeight = hero.offsetHeight;
        console.log(heroHeight);
        const maxTitleSize = 500; // Tamaño máximo del título en px
        const minTitleSize = 100; // Tamaño mínimo del título en px
        const titleSize = Math.max(maxTitleSize - (scrollPosition * 0.8), minTitleSize); // Calcular tamaño del título
        // Que además de achicarse, el título baje para que se siga viendoo como si estuviese fijo
        /*
        */

        // Aplicar tamaño al título
        title.style.fontSize = `${titleSize}px`;
        //let titleTop = scrollPosition*1.2
        let titleTop;
        title.style.position = 'fixed';
        const topCorrectionFactor = 1.3
        if(scrollPosition<=376){
            titleTop = scrollPosition*topCorrectionFactor;

            title.style.top = `${titleTop}px`;
        }
        // Fijar el contenido debajo del título
        /*if (scrollPosition <= heroHeight) {
            // Deshabilitar el desplazamiento del cuerpo
            document.body.style.overflow = 'hidden';
            window.scrollTo(0, 0);
            //window.scrollY=0
        } else {
            // Habilitar el desplazamiento del cuerpo
            document.body.style.overflow = 'auto';
        }*/
        /*if (titleSize <= minTitleSize) {
            // Si el tamaño de la fuente alcanza el mínimo, fija el contenido debajo del título
            const contentBelowTitle = document.querySelector('#main-container');
            contentBelowTitle.classList.add('fixed-content');
        }*/
    };
    // Agregar efecto de ajuste de tamaño al hacer scroll
    window.addEventListener('scroll', adjustTitleSize);
    // Llamar a la función para ajustar el tamaño del título al cargar la página
    adjustTitleSize();

    return heroContainer;
}
