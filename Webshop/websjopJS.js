/*********************************************************************
 * author: Lisa Miesenböck
 * description: this program creates a webshop,
 * creates a shopping basket for all the items a user want to shop
 * (shows the price, the amount of every items and the description)
 * Moreover, counts the sum of all the added items to the basket
 ******************************************************************/
let countItem = 1;
let sum = 0;

$(document).ready(function() {
    let AddItemStore = $(".store");
    AddItemStore.click(function(){
        addItem(this);
    });
});

function addItem(elem){
    /*****************************************************
     * select all the attribute which are used for the
     * shopping basket (src, id, description and price) of
     * every item
     *****************************************************/
    let box = $(".imgBox");
    let imgSRC = $(elem.parentElement).find(".img").attr("src");
    let imgID = $(elem.parentElement).find(".img").attr("id");
    let description = $(elem.parentElement).find(".description").text();
    let price = $(elem.parentElement).find(".price").text();

    /*****************************************************
     * check if image of the item does already exist
     *****************************************************/
    let array = $(".imgBox figure");
    let check = false;
    for(elem of array){
       if($(elem).attr("id") === imgID){
           check=true;
       }
    }

    /*****************************************************
     * when the item isn't already added to the store,
     * the item is added to the shopping basket
     * else, only change the amount of the items
     *****************************************************/
    if(check===false) {
        $(box).append("<figure id=" + imgID + "><img src=" + imgSRC + "><figcaption>" + description + "</figcaption>" +
            "<figcaption> Preis: " + price + "€ </figcaption>" +
            "<figcaption> Anzahl: <span id=counter_"+imgID+"> "+countItem+"</span></figcaption></figure>");
        $(box).find("img").addClass("imageStore");
    }
    else{
        let count = $(`#counter_${imgID}`).text();
        $(`#counter_${imgID}`).text(Number(count)+1);
    }

    /*****************************************************
     * update the sum of the shopping basket
     *****************************************************/
    sum += Number(price);
    $(".summe").text(sum);

}

/*****************************************************
 * opens the correct tab-control of the items
 * Source: https://www.w3schools.com/howto/howto_js_tabs.asp
 *****************************************************/
function openItems(evt, article) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(article).style.display = "block";
    evt.currentTarget.className += " active";
}