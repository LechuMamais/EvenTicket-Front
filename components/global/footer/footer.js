import "./footer.css";

export const createFooter = () => {
    const footer = document.createElement("footer");
    footer.innerHTML = `
        <ul id="footer-list">
            <h4>>Web app created by Alexis Mamais<</h4>
        </ul>
    `;
    return footer
}
