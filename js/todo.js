export default class Todo {
    constructor() {
        this.enterButton = document.querySelector('#inputArea button');
        this.indput = document.querySelector('#inputArea input');
        this.ul = document.querySelector('ul#toDoList');

        this.enterButton.addEventListener('click', (e) => this.addListItme(e))
        this.indput.addEventListener('keypress', (e) => this.addListItme(e));
    }

    addListItme(e) {

        if (this.indput.value.length > 0 && (e.key === 'Enter' || e.key === undefined)) {
            this.createListItem();
        }
    }

    createListItem() {
        const li = document.createElement('li');
        li.innerHTML = `${this.indput.value} <i class="far fa-trash-alt"></i>`;
        this.ul.appendChild(li)
        this.indput.value = ``;

        li.addEventListener('click', (e) => this.crossOut(e));
        li.querySelector('i').addEventListener('click', (e) => this.deletListItem(e));
    }

    crossOut(e) {
        e.currentTarget.classList.toggle('done');

    }

    deletListItem(e) {
        e.stopPropagation();
        const listItem = e.currentTarget.parentNode;
        listItem.remove();
    }
}