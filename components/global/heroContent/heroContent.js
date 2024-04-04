import './heroContent.css';





////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const TitleSizeModifier = (headerTitle) => {
    console.log('TitleSizeModifier');
    const maxTitleSize = 200
    headerTitle.style.fontSize = `${maxTitleSize}px`
    return maxTitleSize;
};


const headerTitleModifier = () => {
    // Modificador, que ubica al titulo en el centro del viewport
    const headerTitleContainer = document.querySelector('#header-home-link-container a');
    const headerTitle = document.querySelector('#header-home-link-container');
    // Y además llama a la función que le da el tamaño inicial
    TitleSizeModifier(headerTitleContainer);
    console.log('headerTitleModifier');
    console.log('headerTitle', headerTitle);
    const viewportHeight = window.innerHeight;
    console.log('viewportHeight', viewportHeight);
    console.log('HeaderTitleInnerHeight', headerTitle.clientHeight)
    const headerTitleMarginTop = (viewportHeight * 0.5) - (headerTitle.clientHeight * 0.5)//+(200*0.5);
    console.log('headerTitleMarginTop', headerTitleMarginTop);
    headerTitle.style.marginTop = `${headerTitleMarginTop}px`;
};

const scrollHandler = () => {
    // Modificamos la posicion del title
    const scrollTop = window.scrollY * 0.2;
    //console.log('scrollTop', scrollTop);

    const parallaxFactor = 0.5; // Factor de parallax 

    const headerTitleContainer = document.querySelector('#header-home-link-container');
    const headerTitlePrevMarginTop = headerTitleContainer.clientHeight
    const translateY = scrollTop * parallaxFactor;
    const headerTitleContainerMarginTop = Math.max(headerTitlePrevMarginTop - translateY, 0)
    headerTitleContainer.style.marginTop = `${headerTitleContainerMarginTop}px`;


    // Modificamos el tamaño del title
    // Cuando scrollTop sea viewportHeigth-headerHeight, que fontSize sea 20px

    const headerTitle = document.querySelector('#header-home-link-container a');
    const maxTitleSize = 200;
    const minTitleSize = 20;
    const headerContainer = document.querySelector('header')
    const headerHeight = headerContainer.clientHeight
    
    const viewportHeight = window.innerHeight;
    const scrollTopBreakPoint = ((viewportHeight - headerHeight) * 0.2 - headerHeight * 2);
    //console.log('scrollTopBreakPoint', scrollTopBreakPoint);
    // En scrollTopBreakPoint queremos que fontSize = 20
    // En scrollTop = 0 queremos que fontSize = 200
    // Y en el medio, una transicion. O sea fontSize = (scrollTopBreakPoint-scrollTop)/scrollTopBreakPoint *(maxTitleSize-minTitleSize)*maxTitleSize
    //console.log('actualSize Calculation', (scrollTopBreakPoint - scrollTop) / scrollTopBreakPoint * maxTitleSize);

    const actualTitleSize = ((scrollTopBreakPoint - scrollTop) / scrollTopBreakPoint * maxTitleSize);
    headerTitle.style.fontSize = `${Math.max(actualTitleSize, minTitleSize)}px`;


    // Fijar el hero para que quede como fondo del header
    // Para eso necesitamos haremos que cuando al hacer scroll se llegue a la posicion donde el hero se vea la misma altura del header, le
    // ponemos background al header. Despues, si se vuelve a hacer scroll hacia arriba, hay que volverselo a quitar

    const heroContainer = document.querySelector('.hero-container');
    const heroHeight = heroContainer.clientHeight;

    console.log('heroHeight = viewportHeight = ',heroHeight);
    console.log('viewportHeight-scrollTopAjustado',viewportHeight-scrollTop*5)
    const scrollTopAjustado = scrollTop*5
    console.log('scrollTopAjustado', scrollTopAjustado);

    // backgroundImage: px = 549x366
    
    /*if(scrollTopAjustado < (heroHeight+headerHeight)) { 
        //En este caso, le movemos el backgroundImage al header, para generar el efecto de que es lo mismo que el hero
        console.log('scrollTopAjustado < (heroHeight+headerHeight)');
        headerContainer.style.backgroundPositionY = `${(scrollTopAjustado/heroHeight)*(-scrollTopAjustado)}px`;
    }else{
        //En este caso, le dejamos fijo el background al header
        headerContainer.style.backgroundPosition = 'bottom'
    }*/
    console.log('scrollTopAjustado', scrollTopAjustado);
    console.log('(heroHeight)', (heroHeight));

    // La logica de los if está correcta
    if(scrollTopAjustado > (heroHeight-headerHeight)) { 
        //En este caso, le agregamos el fondo al header
        console.log('agregamos background al header')
        headerContainer.style.backgroundImage = `url('/background-hero.jpg')`; // Le damos fondo al header
        headerContainer.style.backgroundPositionY = 'bottom';
    }
    if(scrollTopAjustado <= (heroHeight-headerHeight)){
        //En este caso, le quitamos el background al header
        console.log('El header tiene el hero debajo')
        headerContainer.style.backgroundImage = ''; // Vacía el fondo del header
    }

}






















////////////////////////////////////////////////////////////////////////////////////////////////////////////////






export function heroContainer() {
    // Crear contenedor principal del héroe
    const heroContainer = document.createElement('div');
    heroContainer.classList.add('hero-container');

    // Crear héroe con imagen de fondo
    const hero = document.createElement('div');
    hero.classList.add('hero');
    heroContainer.appendChild(hero);

    // Crear título INSOMNIA
    /* const title = document.createElement('h1');
     title.textContent = 'INSOMNIA';
     title.classList.add('hero-title');
     hero.appendChild(title);*/

    // Calcular la altura inicial del héroe
    const viewportHeight = window.innerHeight;
    //const headerHeight = document.querySelector('header').offsetHeight;
    const initialHeight = viewportHeight// - headerHeight;
    heroContainer.style.height = `${initialHeight}px`;
    // Definimos la altura mínima del héroe. dependerá del ancho de la página
    /*let heroMinHeight = 150;
    let windowWidth = window.innerWidth;
    if (windowWidth < 600) {
        heroMinHeight = 130
    }
    if (windowWidth < 500) {
        heroMinHeight = 100
    }
    if (windowWidth < 400) {
        heroMinHeight = 80
    }
    if (windowWidth < 300) {
        heroMinHeight = 60
    };

    // Función para ajustar la altura del héroe al hacer scroll
    /*const adjustHeroHeight = () => {
        const scrollPosition = window.scrollY;
        const newHeight = Math.max(initialHeight - scrollPosition, heroMinHeight);
        heroContainer.style.height = `${newHeight}px`; // Actualizar la altura del heroContainer al hacer scroll
    };

    // Agregar efecto de ajuste de tamaño al hacer scroll
    window.addEventListener('scroll', adjustHeroHeight);*/


    //  -----------------------------------     TITLE     -------------------------------- //
    // Le damos un tamaño inicial al texto
    /*const initialTitleSize = 500;
    title.style.fontSize = `${initialTitleSize}px`; // Aplicar tamaño al título

    // Función para ajustar el tamaño del título
    const adjustTitleSize = () => {
        const scrollPosition = window.scrollY;
        const maxTitleSize = 500; // Tamaño máximo del título en px
        // Tamaño mínimo del título en px, dependerá del ancho de la ventana
        let minTitleSize = 100;
        let windowWidth = window.innerWidth;
        if (windowWidth < 600) {
            minTitleSize = 80
        }
        if (windowWidth < 500) {
            minTitleSize = 66
        }
        if (windowWidth < 400) {
            minTitleSize = 46
        }
        if (windowWidth < 300) {
            minTitleSize = 30
        };
        const titleSize = Math.max(maxTitleSize - (scrollPosition * 0.8), minTitleSize); // Calcular tamaño del título
        title.style.fontSize = `${titleSize}px`; // Aplicar tamaño al título
    };

    // Agregar efecto de ajuste de tamaño al hacer scroll
    window.addEventListener('scroll', adjustTitleSize);*/


    headerTitleModifier()

    window.addEventListener('scroll', scrollHandler);

    return heroContainer;
}
