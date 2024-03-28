Documentación del Frontend de la Aplicación
Descripción General

Este proyecto consiste en el desarrollo del frontend para una aplicación web de gestión de eventos. El frontend proporciona una interfaz de usuario intuitiva y receptiva que permite a los usuarios registrarse, iniciar sesión y administrar su perfil, crear eventos, modificar sus eventos, confirmar asistencia a eventos creados por otros usuarios y cancelarla.

Tecnologías Utilizadas
    HTML5
    CSS3
    JavaScript (ES6+)
    Node.js
    Vite.js
    flatpickr
    moment.js

Arquitectura y Estructura

El frontend sigue una arquitectura de aplicación de una sola página (SPA) utilizando javascript vainilla. La aplicación está estructurada de la siguiente manera:


    |-- components/                              # Componentes reutilizables
    |   |-- eventss/                             # Componentes relacionados a la gestion de eventos
    |   |-- |-- createNewEventForm               # Componente de formulario de crear nuevo evento
    |   |-- |-- eventDetails.js                  # Componente del detalles de un evento
    |   |-- |-- eventForm                        # Componente que muestra un formulario para crear o actualizar la informacion de un evento
    |   |-- |-- events                           # Componente que muestra la lista de eventos y filtros de busqueda
    |   |-- |-- searchEventsFiltersContainer     # Componente de filtros de busqueda
    |   |-- |-- showEventCard                    # Componente de tarjeta de evento
    |   |-- |-- showEventList                    # Componente de lista de tarjetas de eventos
    |   |-- |-- updateEventForm                  # Componente de actualizar datos de un evento
    |   |-- global/                              # Componentes globales
    |   |-- |-- createButton                     # Componente que muestra un nuevo boton. 
    |   |-- |-- footer                           # Componente que muestra el footer de la aplicación
    |   |-- |-- header                           # Componente del encabezado
    |   |-- |-- heroContent                      # Componente del hero de la aplicación
    |   |-- |-- home                             # Componente del home de la aplicación
    |   |-- |-- mainContainer                    # Componente de contanedor principal de la aplicación
    |   |-- users/                               # Componentes relacionados a la gestion de usuarios
    |   |-- |-- loginForm                        # Componente de formulario de login
    |   |-- |-- profile                          # Componente de perfil de usuario
    |   |-- |-- registrationForm                 # Componente de formulario de registro
    |   |-- |-- updateProfileForm                # Componente de actualizar datos de un usuario
    |-- utils/                                   # Utilidades y funciones auxiliares
    |   |-- eventss/                             # Utilidades y funciones relacionados a la gestion de eventos
    |   |-- |-- cancelAssistance                 # Funcion para cancelar asistencia a evento
    |   |-- |-- confirmAssistance                # Funcion para confirmar asistencia a evento
    |   |-- |-- createNewEvent                   # Funcion para crear nuevo evento
    |   |-- |-- deleteEvent                      # Funcion para borrar un evento
    |   |-- |-- getEventsList                    # Funcion para obtener un listado de eventos. Puede recibir fechas como un objeto para filtrar resultados
    |   |-- |-- updateEvent                      # Funcion para actualizar la información de un evento
    |   |-- users/                               # Utilidades y funciones relacionados a la gestion de usuarios
    |   |-- |-- getUserData                      # Funcion para obtener toda la información del usuario
    |   |-- |-- login                            # Funcion para loguear un usuario
    |   |-- |-- register                         # Funcion para registrar un nuevo usuario
    |   |-- |-- updateProfile                    # Funcion para actualizar los datos de un usuario
    |   |-- api.js                               # Funcion para hacer peticiones a la API
    |   |-- apiUrls.js                           # Aquí se almacenan las urls donde se harán las peticiones
    |   |-- flatpickrConfig.js                   # Aquí se almacenan un objeto con las configuraciones de flatpickr, libreria para manejar la visualizacion de fechas
    |   |-- onClickHandler.js                    # Función para manejar eventos de clic comunes, donde se quita un componente y se muestra otro
    |-- main.js                                  # Componente principal de la aplicación
    |-- index.html                               # Punto de entrada de la aplicación


Funcionalidades Principales

    Visualización de eventos: Los usuarios pueden ver una lista de eventos disponibles, y filtrarlos por fechas.
    Registro y inicio de sesión: Los usuarios pueden registrarse e iniciar sesión en la aplicación.
    Detalles del evento: Los usuarios pueden ver detalles específicos de un evento, como la descripción, la fecha y la ubicación.
    Administración del perfil: Los usuarios pueden ver y actualizar su información de perfil, así como una lista de eventos creados
        y de eventos a los que ha confirmado asistencia.
    Creación de eventos: Los usuarios pueden crear nuevos eventos y actualizarlos.
    Asistencia: Los usuarios pueden confirmar y/o cancelar asistencia a los eventos creados por los demás usuarios.

Componentes Principales:

Header
    Muestra el encabezado de la aplicación, que incluye el logo y los enlaces de navegación.

mainContainer
    Es el contenedor principal de la aplicación, se muestra entre el header y el footer. Al cargar la aplicación, si el usuario se encuentra
    logueado, mustrará la home, sino el formulario de login.

createFooter
    Muestra el footer de la aplicación.

Home
    Muestra la Home de la aplicación. Incluye el Hero y la lista de eventos.

heroContent
    Muestra el Hero de la aplicación. Incluye un efecto parallax

loginForm
    Muestra el formulario de login

registrationForm
    Muestra el formulario de registro de nuevos usuarios.

createProfile
    Muestra la información de perfil del usuario, incluído los eventos que está organizando, los eventos a los que asistirá, el boton de crear un evento nuevo, la posibilidad de modificar los datos de usuario.

updateEventForm
    Modificar los datos de un evento. Sólo puede acceder a modificar los datos de un evento el usuario que lo haya creado.

updateProfileForm
    Modificar los datos de un usuario. Sólo puede modificar los datos de ese usuario, no de otros.

ShowEvents
    Muestra una lista tarjetas EventCard de eventos disponibles (no eventos pasados) y un filtro para buscar eventos cuya fecha
esté comprendido entre las dos fechas indicadas. Si no se indica alguna de las fechas, tomará como fecha fromDate 01/01/1970 y como
toDate 12/12/2999 En este component se aplica un efecto Parallax a las tarjetas.

searchEventsFiltersContainer
    Contiene los filtros de busqueda

EventCard
    Muestra una tarjeta de evento con información básica sobre el evento, como el título y su imagen.

showEventDetails
    Muestra los detalles de un evento en particular. Incluye un botón para confirmar asistencia, o cancelar asistencia al evento.

createNewEventForm
    Muestra un formulario para crear un nuevo evento.

createEventForm
    Es el formulario que se muestra en createNewEventForm y updateEventForm. Recibe como parámetros el id del formulario y el texto del boton submit

showNotification
    Muestra una notificación. Recibe como parámetros el texto de la aplicación, y un parámetro que será la class a la que se le aplicarán estilos css

createButton
    Componente button. Recibe el textContent, la función que dispara el click y un objeto cuyas propiedades se incluiran como atributos html. En muchos casos se aplica junto con la función onClickHandler.js Esta recibe dos parametros, el querySelector del contenedor y el componente a mostrar. Selecciona del DOM al contenedor, lo vacía y muestra el componente a mostrar.

Configuración y Uso

Ejecutar la aplicación en un entorno de desarrollo local:

    Clonar el repositorio del proyecto desde GitHub.
    Navegar al directorio del proyecto.
    Instalar las dependencias utilizando npm install.
    Ejecutar la aplicación utilizando npm run dev para utilizar nodemon.
    La aplicación estará disponible en el navegador web en http://localhost:3000.