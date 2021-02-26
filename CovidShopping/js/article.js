
export default class Article{
    #articleName;
    #articleUnit;
    #articleId;
    #maxPrice;
    #numOfArticles;


    constructor({articleName, articleUnit, articleId, maxPrice, numOfArticles}) {
        this.#articleName = articleName;
        this.#articleId = articleId;
        this.#maxPrice = maxPrice;
        this.#numOfArticles = numOfArticles;
        this.#articleUnit = articleUnit;
    }

    get articleIdret(){
        return this.#articleId;
    }

    get articleName(){
        return this.#articleName;
    }

    get maxPrice(){
        return this.#maxPrice;
    }

    get articleUnit(){
        return this.#articleUnit;
    }

    get numOfArticle(){
        return this.#numOfArticles;
    }

    printArticle(){
        //console.log("du bist in der ARtikelKlassre");
        //$("articleId_"+this.#articleId).remove();
        let name = this.#articleName;
        let unit = this.#articleUnit;
        let number = this.#numOfArticles;
        let price = this.#maxPrice;


        let article = $(`<tr id="articleId_${this.#articleId}" class="dynCont">
            <td id="aName_${this.#articleId}">${name}</td>
            <td id="aPrice_${this.#articleId}">${price}</td>
            <td id="aUnit_${this.#articleId}">${unit}</td>
            <td id="aAmount_${this.#articleId}">${number}</td>
            <td><button id="${this.#articleId}_aDel" class="deleteArticle"> Artikel löschen</button></td>
            <td><button id="${this.#articleId}_aEdit" class="editArticle"> Artikel bearbeiten</button></td>
        </tr>`);
        $(".tablebody").append(article);
    }





}