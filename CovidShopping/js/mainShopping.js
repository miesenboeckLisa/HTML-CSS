
import CovidShopping from "./covidShopping.js";
import Article from "./article.js";
import List from "./list.js";


let covidShopping = new CovidShopping();
let curList;
let curArticle;



$(document).ready(function(){

    //Read JSON
    covidShopping.init();

    /*
    Add a new List to the Map
     */
    $("#newList").click(function () {
        addNewListElementFromInput();
        hilfesuchender();

    });

    /*
    Show the Articles of a List
     */
    $(".list").on("click",".showDetail", function(){
        //Empty the current Entries
        $("#currentList").empty();
        $(".dynCont").empty();

        //Opens the correct PopUp
        let modal = document.querySelector("#myModalDetail");
        var span = document.getElementsByClassName("close")[1];
        openModal(modal, span, 1);

        //get the id of the element to print out the articles of the correct list
        let id = $(this.parentElement.parentElement).attr("id");
        let x = $("#currentList");

        //Add heading, which List is currentlic editing
        let Headline = `<h2 id="List_${id}">Du bearbeitest gerade List ${id} </h2>`;
        x.prepend(Headline);

        //prints out the articles
        covidShopping.printArticlesFromShoppingList(id);
        curList = id;


        //shows the correct Buttons
        //Hilfeleistend is not able to delete and edit an Article
        console.log(user);
        if(user == "leistender"){
            $(".deleteArticle").hide();
            $(".editArticle").hide();
        }
        else{
            $(".deleteArticle").show();
            $(".editArticle").show();
        }


    });




    /*
    Opens the modal and set a clickHandler to all the buttons with
    class "deleteArticle", deleting an article must be confirmed
    by the user
     */
    $("#myModalDetail").on("click", ".deleteArticle", function () {

        //Before
        let eingabe = confirm("Soll der Artikel wirklich gelöscht werden? ");
        if (eingabe==true){
            let idOfArticleELement = $(this).attr("id");
            let idOfA = idOfArticleELement.split("_", 1);
            $(".tablebody").empty();
            covidShopping.deleteArticleFromList(curList, idOfA);
        }
    });



    /*
    Opens the Modal for Editing an Article - Only posssible for Hilfesuchender
     */
    $("#myModalDetail").on("click", ".editArticle", function () {

        //get the correct Id Of the Article, which want the user to edit
        let idOfArticleELement = $(this).attr("id");
        let idOfA = idOfArticleELement.split("_", 1);

        //save the current Article in a global Var
        curArticle = idOfA;

        //get the Name of the current Article
        let bezeichnungArtikel =  $("#aName_"+idOfA).text();

        //Append a heading, for showing the user whicht arte he/she is editing.
        $("#currentArticleToEdit").append(`<h3>${bezeichnungArtikel}</h3>`);

        //correct Modal
        let modal = document.querySelector("#editArticleModal");
        var span = document.getElementsByClassName("close")[2];
        openModal(modal, span, 1);


    });

    /*
     Save the changes
      */
    $("#editArticleModal").on("click", "#saveArticle", function () {

        //Get all Inputs from User
        let articleName = $("#inputArticleName").val();
        let maxPrice = $("#inputArticlePrice").val();
        let articleUnit = $("#inputArticleUnit").val();
        let numOfArticles = $("#inputArticleAmount").val();
        let articleId = String(curArticle[0]);


        //When a field was not filled by the User, the Article gets the value before
        if(articleName=="")
            articleName =  $("#aName_"+articleId).text();

        if(maxPrice==0)
            maxPrice =  $("#aPrice_"+articleId).text();

        if(articleUnit=="")
            articleUnit = $("#aUnit_"+articleId).text();

        if(numOfArticles==0)
            numOfArticles = $("#aAmount_"+articleId).text();

        //create a new Article and add it to the List
        let article = new Article({articleName, articleUnit, articleId, maxPrice, numOfArticles});
        covidShopping.editArticlesOfList(String(curList), article);

        //Set the Input to empty
        $("#inputArticleName").val("");
        $("#inputArticlePrice").val("");
        $("#inputArticleUnit").val("");
        $("#inputArticleAmount").val("");


        let modal = document.querySelector("#editArticleModal");
        modal.style.display = "none";

        //before showing the new Articles of the List, the table has to be clear
        $(".tablebody").empty();

        //print the new ArticleList
        covidShopping.printArticlesFromShoppingList(curList);

        $("#currentArticleToEdit").empty();

    });




    /*
    get the values of the input an create a new List
    listName and creator hast to be filled
     */
    function addNewListElementFromInput(){
        let listName = $("#lNameInput").val();
        let creator = $("#creatorNameInput").val();
        let dueDate = $("#dueDateInput").val();
        let totalPrice = $("#maxPrice").val();
        let listId = counterListElements+1;
        let listStatus = "offen";

        if(listName=="" || creator==""){
            alert("Du musst die Felder Name und Ersteller ausfüllen!")
        }
        else{
            let l = new List ({listName, listId, listStatus, creator, dueDate, totalPrice});
            covidShopping.add(l);
        }
    }

    /*
   editing the list values
    */
    $(".list").on("click",".edit",function () {

        let elem = $(this.parentElement.parentElement);
        let listId = $(elem).attr("id");

        let creator = $("#creator_"+listId).text();
        let listStatus = "offen";

        var modal = document.getElementById("myModalList");
        var span = document.getElementsByClassName("close")[0];

        //opens modal
        openModal(modal, span, 0);

        $("body").on("click", "#save", function () {
            let listName = $("#editListName").val();
            let dueDate = $("#editDueDate").val();
            let totalPrice = $("#editPrice").val();

            if(listName=="")
                listName = $("#listname_"+listId).text();

            if (dueDate==""){
                dueDate = $("#date_"+listId).text();
            }
            if(totalPrice==0){
                totalPrice = $("#price_"+listId).text();
            }

            //Create a new list from the values
            let l = new List ({listName, listId, listStatus, creator, dueDate, totalPrice});

            //add to the new List
            covidShopping.add(l);

            //close modal
            modal.style.display = "none";

            //show correct buttons
            hilfesuchender();

        });

        //Empty input fields
        $("#editListName").val("");
        $("#editDueDate").val("");
        $("#editPrice").val("");
    });


    /*Opens A Modal for adding an article*/
    $(".list").on("click", ".addArticleToList", function(){

        //Opens the correct PopUp
        let modal = document.querySelector("#addArticletoListView");
        var span = document.getElementsByClassName("close")[3];
        openModal(modal, span, 1);

        //get the correct Id Of the Article, which want the user to edit
        let idOfArticleELement = $(this.parentElement.parentElement).attr("id");
        curList = idOfArticleELement.split("_", 1);

    });


    /*
    Add Articles to the List
     */
    $("#addArticletoListView").on("click", "#saveAddArticle", function () {

        let modal = document.querySelector("#addArticletoListView");

        //read entries
        let articleName = $("#inputAName").val();
        let maxPrice = $("#inputAPrice").val();
        let articleUnit = $("#inputAUnit").val();
        let numOfArticles = $("#inputAAmount").val();

        //Add the Article to the List
         covidShopping.addArticleToList(curList[0], articleName, maxPrice, numOfArticles, articleUnit );


        modal.style.display = "none";

        $(".list").empty();
        covidShopping.printCovidShopping();
        //show correct buttons
        hilfesuchender();

    });



    /*
    Opens the Modal
     */
    function openModal(modal, span, nr){
        modal.style.display = "block";

        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            modal.style.display = "none";
            if(nr == 0){
                alert("Deine Änderungen werden nicht gespeichert!");
            }
        };
    }



    /*
      delete a list after confirm
       */
    $(".list").on("click",".delete",function () {
        let eingabe = confirm("Soll die Liste wirklich gelöscht werden? ");
        if (eingabe==true){
            deleteElement(this.parentElement.parentElement);
        }
    });

    /*
    Hilfeleistender take the List
     */
    $(".list").on("click",".take",function () {
        takeList(this.parentElement.parentElement);
    });


    /*
    for finish an List, enter the sum
     */
    $(".list").on("click", ".enterSum", function () {
        let elem = this.parentElement.parentElement;
        let id = $(elem).attr("id");
        let val = $("#sum_"+id).val();
        finishList(elem, val);
        console.log("Hallo");

    });



    /*
    function for taking a list and add an new style
     */
    function takeList(elem){
        //$(".list").empty();
        covidShopping.changeStatus(elem);
        covidShopping.printCovidShopping();
        let x = "#" + $(elem).attr("id");
        $(x).addClass("takenElement");
        hilfeleistender();
    }

    /*
    delete the list element
     */
    function deleteElement(elem){
        covidShopping.delElement(elem);
        //printShoppingList
        covidShopping.printCovidShopping();
        hilfesuchender();
    }


    /*
    After Entering a Sum, the List is completed
     */
    function finishList(elem, val) {
        if (val == "") {
            alert("Du kannst die Liste erst nach Eingabe des Gesamtbetrages abschließen!")
        } else {
            let id = $(elem).attr("id");
            $("#buttonBox_" + id).hide();
            $("#form_" + id).hide();
            let line = $(`<h4>Die Liste wurde abgeschlossen</h4>`);
            $(elem).append(line);
            $("#form_"+id).remove();
        }
    }

});











