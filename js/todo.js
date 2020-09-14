import Dialog from "./dialog.js";
import LocalStorage from "./localStorage.js";

const localStorage = new LocalStorage();


export default class Todo {
    constructor() {
        this.enterButton = document.querySelector("#inputArea button");
        this.indput = document.querySelector("#inputArea input");
        this.ul = document.querySelector("ul#toDoList");

        if (localStorage.items.length > 0) {
            this.loadFromLocalStorage();
        }

        this.enterButton.addEventListener("click", (e) => this.addListItem(e));
        this.indput.addEventListener("keypress", (e) => this.addListItem(e));
    }

    addListItem(e) {
        if (this.indput.value.length > 0 && (e.key === "Enter" || e.key === undefined)) {
            this.createListItem();
        }
    }

    createListItem() {
        const li = document.createElement("li");
        li.innerHTML = `${this.indput.value} <i class="far fa-trash-alt"></i>`;
        this.ul.appendChild(li);
        this.indput.value = "";

        li.addEventListener("click", (e) => this.crossOut(e));
        li.querySelector("i").addEventListener("click", (e) => this.deleteListItem(e));

        localStorage.updateItems(this.ul);
    }

    crossOut(e) {
        e.currentTarget.classList.toggle("done");
        localStorage.updateItems(this.ul);
    }

   async deleteListItem(e) {
        e.stopPropagation();

        const listItem = e.currentTarget.parentNode;
        const dialog = new Dialog({

            questionText:"<h2>Er du sikker?</h2>",
            trueButtonText:"Ja",
            falseButtonText:"Nej"
        });

       const deleteItem = await dialog.confirm();
       if(deleteItem){
           listItem.remove();
           localStorage.updateItems(this.ul);
       }

    }


    loadFromLocalStorage() {
        let listItems = "";
        localStorage.items.forEach(item => { listItems += item;
        });
        this.ul.innerHTML = listItems;
        this.ul.querySelectorAll("li").forEach(li => {
            li.addEventListener("click", (e) => this.crossOut(e));
            li.querySelector("i").addEventListener("click", (e) => this.deleteListItem(e));
        });

    }
}


