Documentación del Frontend de la Aplicación
Descripción General

Este proyecto consiste en el desarrollo del frontend para una aplicación web de gestión de eventos. El frontend proporciona una interfaz de usuario intuitiva y receptiva que permite a los usuarios registrarse, iniciar sesión y administrar su perfil, crear eventos, modificar sus eventos, confirmar asistencia a eventos creados por otros usuarios y cancelarla.

Tecnologías Utilizadas
    HTML5
    CSS3
    JavaScript (ES6+)

Arquitectura y Estructura

El frontend sigue una arquitectura de aplicación de una sola página (SPA) utilizando javascript vainilla. La aplicación está estructurada de la siguiente manera:

lua

src/
|-- components/                          # Componentes reutilizables
|   |-- createNewEventForm               # Componente de formulario de crear nuevo evento
|   |-- eventDetails.js                  # Componente del detalles de un evento
|   |-- events                           # Componente que muestra la lista de eventos y filtros de busqueda
|   |-- footer                           # Componente que muestra el footer de la aplicación
|   |-- header                           # Componente del encabezado
|   |-- heroContent                      # Componente del hero de la aplicación
|   |-- home                             # Componente del home de la aplicación
|   |-- loginForm                        # Componente de formulario de login
|   |-- mainContainer                    # Componente de contanedor principal de la aplicación
|   |-- profile                          # Componente de perfil de usuario
|   |-- registrationForm                 # Componente de formulario de registro
|   |-- searchEventsFiltersContainer     # Componente de filtros de busqueda
|   |-- showEventCard                    # Componente de tarjeta de evento
|   |-- showEventList                    # Componente de lista de tarjetas de eventos
|   |-- updateEventForm                  # Componente de actualizar datos de un evento
|   |-- updateProfileForm                # Componente de actualizar datos de un usuario
|-- utils/                   # Utilidades y funciones auxiliares
|   |-- apiUrls.js           # Aquí se almacenan las urls donde se harán las peticiones
|-- App.js                   # Componente principal de la aplicación
|-- index.js                 # Punto de entrada de la aplicación

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
toDate 12/12/2999

searchEventsFiltersContainer
    Contiene los filtros de busqueda

EventCard
    Muestra una tarjeta de evento con información básica sobre el evento, como el título y su imagen.

showEventDetails
    Muestra los detalles de un evento en particular. Incluye un botón para confirmar asistencia, o cancelar asistencia al evento.

createNewEventForm
    Muestra un formulario para crear un nuevo evento.

showNotification
    Muestra una notificación. Recibe como parámetros el texto de la aplicación, y un parámetro que será la class a la que se le aplicarán estilos css


Configuración y Uso

Para ejecutar la aplicación en un entorno de desarrollo local, siga estos pasos:

    Clonar el repositorio del proyecto desde GitHub.
    Navegar al directorio del proyecto.
    Instalar las dependencias utilizando npm install.
    Ejecutar la aplicación utilizando npm start o npm run dev para utilizar nodemon.
    La aplicación estará disponible en http://localhost:3000 en el navegador web.