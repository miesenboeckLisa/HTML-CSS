
export default class List{

    #listName;
    #id;
    #listStatus;
    #creator;
    #dueDate;
    #totalPrice;
    #listOfArticle;


    constructor({listName, listId, listStatus, creator, dueDate, totalPrice}){
        this.#listName = listName;
        this.#id = listId;
        this.#listStatus = listStatus;
        this.#creator = creator;
        this.#dueDate = dueDate;
        this.#totalPrice = totalPrice;
        this.#listOfArticle = new Map();
    }



    get listId(){
        return this.#id;
    }

    get articles (){
        return this.#listOfArticle;
    }


    addArticle(article){
        let id = String(article.articleIdret);
        this.#listOfArticle.set(id, article);
        //this.#listOfArticle.push(article);
    }


    printList(){
        let name = this.#listName;
        let id = this.#id;
        let creat = this.#creator;
        let status = this.#listStatus;
        let dueDate = this.#dueDate;
        let totPrice = this.#totalPrice;
        let amount =  this.#listOfArticle.size;


        let listElem = $(`<div id="${id}" class="listElement">
        <h3 id="listname_${id}">${name}</h3>
        <hr>
        <p>Auftrageber: <span id="creator_${id}" class="auftraggeber">${creat}</span></p>
        <p>Artikel:<span class="article">${amount}</span></p>
        <p>Status:<span class="status">${status}</span></p>
        <p>Erfüllungsdatum:<span id="date_${id}" class="date">${dueDate}</span></p>
        <p>Gesamtpreis:<span id="price_${id}" class="price">${totPrice}</span></p>
        <div id="buttonBox_${id}" class="buttonsEditDelete">
            <button class="edit" id="buttonEdit_${id}">bearbeiten</button>
            <button class="delete" id="buttonDelete_${id}">löschen</button>
            <button class="take" id="buttonTake_${id}">übernehmen</button>
            <button class="showDetail" id="buttonDetail_${id}">Detailansicht</button>
            <button class="addArticleToList" id="addArticle_${id}">Artikel hinzufügen</button>
        </div>
        <div id="inform_${id}" class="information">
        </div>
        
        </div>`);


        //Status überprüfen und Klassen anhängen
        if(status == "übernommen"){
            $(listElem).addClass("takenElement");
            let ap = $(` <form id="form_${id}" class="sumBetrag">
                <label for="sum">Gesamtbetrag: </label><input id="sum_${id}" type="number">
                 <button class="enterSum" type="button" >Liste abschließen</button>
                 </form>`);
            $(listElem).append(ap);
        }

        $(".list").append(listElem);
        //this.listDiv = listElem;

    }

    changeStatus (){
        this.#listStatus = "übernommen"
    }

    deleteArticle(thisArticle){
        this.#listOfArticle.delete(thisArticle);
    }











}