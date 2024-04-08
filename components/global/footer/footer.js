import "./footer.css";

export const createFooter = () => {
    const footer = document.createElement("footer");
    footer.innerHTML = `
    <div id="footer-lists-container">
        <ul class="footer-list footer-list-top">
            <li>
                <a href="https://www.instagram.com" target="_blank"><i class="bi bi-instagram"></i></a>
            </li>
            <li>
                <a href="https://www.facebook.com" target="_blank"><i class="bi bi-twitter-x"></i></a>
            </li>
            <li>
                <a href="https://www.twitter.com" target="_blank"><i class="bi bi-facebook"></i></a>
            </li>
        </ul>
        <ul class="footer-list footer-list-bottom">
            <li id="footer-contacto">
                <p>Contacto: <a href="mailto:alexismamais@gmail.com">alexismamais@gmail.com</a> | Teléfono: +123456789</p>
            </li id="footer-legal">
                <p>&copy; 2024 Insomnia Events Manager.</p>
                <p>Todos los derechos reservados</p>
                <p>Desarrollado por <a href="https://www.desarrollador.com" target="_blank">Alexis Mamais</a></p>
            <li>
            </li>
        </ul>
    </div>
    `;
    return footer
}
