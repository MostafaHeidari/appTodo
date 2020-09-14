export default class LocalStorage {
    constructor() {
    }

    updateItems(ul) {
        this.itmes = [];
        ul.querySelectorAll('li').forEach((li) => {
            this.itmes.push(li.outerHTML);
        });

        this.saveItems();
    }

    saveItems() {
        window.localStorage.setItem('todo', JSON.stringify(this.itmes));
    }
}