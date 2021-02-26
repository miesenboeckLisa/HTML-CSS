import Article from "./article.js";
import List from "./list.js";
import ShoppingList from "./shoppingList.js";


let loadFromJSON = Symbol();

export default class CovidShopping{

    #shoppingList;
    #userId;

    constructor() {
        this.#shoppingList = new ShoppingList();
    }

    init(){
        this[loadFromJSON]();
    }

    //PRIVATE METHODE
    [loadFromJSON](){
        $.getJSON("json/inputLists.json").then((data)=>{
            this.#userId = data.userId;
            for(let l of data.lists){
                let li = new List(l);
                this.#shoppingList.addList(li);
                for(let a of l.articles){
                    let article = new Article(a);
                    li.addArticle(article);
                }
            }

            console.log(this.#shoppingList);
            this.#shoppingList.printShoppingList();

        });
    }

    add(list){
        $(".list").empty();
        this.#shoppingList.addList(list);
        this.#shoppingList.printShoppingList();
    }

    delElement(list){
        let id = $(list).attr("id");
        let l = this.#shoppingList.getListById(id);
        //console.log(l);
        this.#shoppingList.deleteElem(l);
        console.log(this.#shoppingList);
    }

    changeStatus(elem) {
        let listId = $(elem).attr("id");
        let l = this.#shoppingList.getListById(listId);
        l.changeStatus();

    }

    printCovidShopping(){
        $(".list").empty();
        this.#shoppingList.printShoppingList();
    }

    printArticlesFromShoppingList(elemId){
        let list = this.#shoppingList.getListById(elemId);
        let ar = list.articles;
        for (let a of ar.values()){
            a.printArticle();
        }
    }

    deleteArticleFromList(currentList, thisArticle){
        let x = String(thisArticle);
        let list = this.#shoppingList.getListById(currentList);
        list.deleteArticle(x);
        let ar = list.articles;
        for (let a of ar.values()){
            a.printArticle();
        }

    }

    editArticlesOfList(listid, art){
        let l = this.#shoppingList.getListById(listid);
        l.addArticle(art);

    }

    addArticleToList(listid, articleName, maxPrice, numOfArticles, articleUnit){
        let l = this.#shoppingList.getListById(listid);
        let articleId = l.articles.size + 1;
        let articles = new Article({articleName,articleUnit,articleId,maxPrice,numOfArticles});
        l.addArticle(articles);
    }


}