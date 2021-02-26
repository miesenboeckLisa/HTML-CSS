

export default class ShoppingList{

    #shoppingList;

    constructor() {
        this.#shoppingList = new Map();
    }

    addList(list){
        let listIDConver = String(list.listId);
        this.#shoppingList.set(listIDConver, list);
        counterListElements++;

    }

    getListById(listId){
        return this.#shoppingList.get(listId);
    }

    printShoppingList(){
        for (let l of this.#shoppingList.values()){
                 l.printList();
        }
    }

    deleteElem(l){
        let x = String(l.listId);
        this.#shoppingList.delete(x);
    }

}