import './createUsersList.css'

// Función para crear una lista de elementos
// Se utilizará en eventDetails para listar organizadores y asistentes
export const createUsersList = (container, title, items, clickHandler, ul_id) => {
    const listContainer = document.createElement('div');
    listContainer.classList.add('list-container');

    const listTitle = document.createElement('h3');
    listTitle.textContent = title;
    listContainer.appendChild(listTitle);

    const itemList = document.createElement('ul');
    itemList.classList.add('users-list');
    itemList.id = `${ul_id}`

    if (items.length === 0) {
        const emptyItem = document.createElement('li');
        emptyItem.innerHTML = `<h4>Aún no hay ${title.toLowerCase()}</h4>`;
        itemList.appendChild(emptyItem);
    } else {
        items.forEach((item) => {
            const itemElement = document.createElement('li');
            const itemContent = document.createElement('p');
            itemContent.textContent = `${item.userName}`;
            itemContent.classList.add('item');
            itemContent.addEventListener('click', () => {
                clickHandler(item._id);
            });
            itemElement.appendChild(itemContent);
            itemList.appendChild(itemElement);
        });
    }

    listContainer.appendChild(itemList);
    container.appendChild(listContainer);
};