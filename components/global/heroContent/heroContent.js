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
    title.textContent = 'EVENTICKET';
    title.classList.add('hero-title');
    hero.appendChild(title);


    //                       PARALLAX AL                      //
    // Definimos scrollPosition
    var scrollPosition = window.scrollY;

    // Obtetemos la posición inicial de la página al cargar - usaremos esta var para ajustar la altura del contenedor de eventos si se muestra
    // o no los filtros de busqueda.
    var lastScrollPosition = window.pageYOffset;

    // Función para ajustar el tamaño del título y el contenido debajo
    const manageScroll = () => {
        scrollPosition = window.scrollY;
        console.log('Scroll Position: '+scrollPosition)

        // ------------------------------------------------     TITLE     ------------------------------------------------ //

        // Tamaño del título:
        //const heroHeight = hero.offsetHeight;
        const maxTitleSize = 500; // Tamaño máximo del título en px
        const minTitleSize = 100; // Tamaño mínimo del título en px
        const titleSize = Math.max(maxTitleSize - (scrollPosition * 0.8), minTitleSize); // Calcular tamaño del título
        // Que además de achicarse, el título baje para que se siga viendose como si estuviese fijo

        // Aplicar tamaño al título
        title.style.fontSize = `${titleSize}px`;

        // Posición del título:
        const topCorrectionFactor = 1
        let titleTop = scrollPosition * topCorrectionFactor;
        title.style.top = `${titleTop}px`;

        const eventCardContainer = document.querySelector('.events-card-container');

        // Vamos a hacer que el hero, al llegar a cierto nivel de scroll, pase a estar fijo en la parte de arriba con el h1 a la vista
        const scrollBreakPoint = 600
        if (scrollPosition < scrollBreakPoint) {
            //heroContainer.style.position = 'static';
            heroContainer.style.marginTop = `${-scrollPosition-scrollBreakPoint}px !important`; // sin efecto, no se porque
            console.log('ScrollBreakPoint: '+scrollBreakPoint+'px');
            console.log(heroContainer.style.marginTop);
            console.log( `${-scrollPosition-scrollBreakPoint}px !important`);
            console.log(heroContainer);
            const oldHeroContainerOffsetHeight = heroContainer.offsetHeight;
            console.log(oldHeroContainerOffsetHeight);
            heroContainer.style.marginTop = oldHeroContainerOffsetHeight
            console.log(heroContainer.offsetHeight);

            const eventsContainer = document.querySelector('.events-container');
            
            if (eventCardContainer) {
                eventsContainer.style.marginTop = `0px`;

                eventCardContainer.style.marginTop = `0px`;
            }
        } else if (scrollPosition >= scrollBreakPoint) {
            //heroContainer.style.position = 'static';
            title.style.top = `${scrollBreakPoint}px`; // Para que quede fijo el title h1 a la vista
            heroContainer.style.marginTop = `${scrollPosition-scrollBreakPoint}px !important`;

            // Para que el events container se muestre correctamente, debemos fijarle una altura fija en relacion al scroll position
            const eventsContainer = document.querySelector('.events-container');
            //let marginTopValue = hero.offsetHeight - scrollBreakPoint + scrollPosition;
            let marginTopValue = - scrollPosition + scrollBreakPoint;
       
            eventsContainer.style.marginTop = `${marginTopValue}px`;

            // Y que el contenedor de las tarjetas de eventos sí se mueva.
            eventCardContainer.style.marginTop = `${-scrollPosition + scrollBreakPoint}px`;
            eventCardContainer.style.marginTop = `0px`;
        }

        // Corregir la posicion de las targetas de eventos, en funcion de si se muestran o no los filtros

        // Obtiene la posición actual de la página al hacer scroll
        const currentScrollPosition = window.pageYOffset;

        // Comprueba si el usuario está haciendo scroll hacia abajo
        if (currentScrollPosition > lastScrollPosition) {
            // Si está haciendo scroll hacia abajo, no agregar margen
            if (eventCardContainer) {
                eventCardContainer.style.marginTop = `0px`;
            }
        } else {
            // Si está haciendo scroll hacia arriba, agregar margen
            if (eventCardContainer) {
                eventCardContainer.style.marginTop = `76px`;
            }
        }

        // Actualiza la última posición de desplazamiento con la posición actual
        lastScrollPosition = currentScrollPosition;
    };
    // Agregar efecto de ajuste de tamaño al hacer scroll (sólo si se está visualizando el componente)
    window.addEventListener('scroll', manageScroll);
    if (hero) {
        // Llamar a la función para ajustar el tamaño del título al cargar el componente
        manageScroll();
    }

    return heroContainer;
}
