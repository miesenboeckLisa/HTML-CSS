let user;
let counterListElements = 0;
/*
Opens the correct Tabs
 */
function openTab(tab) {
    // Declare all variables
    let i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = $(".header");
    $(tabcontent).each(function () {
        $(this).css("display", "none");
    });

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = $(".tablinks");
    $(tablinks).each(function () {
        $(this).removeClass("active");
    });

    // Show the current tab, and add an "active" class to the button that opened the tab
    $("#"+tab).css("display", "block");
    $(".tablinks").each(function () {
        user = tab;

        if( $(this).text() == tab)
            $(this).addClass("active");
        if(tab=="suchender"){
            hilfesuchender();
        }
        else{
            hilfeleistender();
        }
    })
}

/*
Hide the correct buttons of a taken list
 */
function searchforTakenListAndHideButton(){
    let list = $(".status");
    for(let l of list){
        let x = $(l).text();
        if($(l).text()=="übernommen"){
            let ButtonBox = l.parentElement.nextElementSibling.nextElementSibling.nextElementSibling;
            $(ButtonBox).hide();
        }
    }
}

/*
Hide and Show the correct buttons of the user
 */
function hilfeleistender(){
    $(".edit").hide();
    $(".delete").hide();
    $(".take").show();
    $(".sumBetrag").show();
    $(".addArticleToList").hide();

}


/*
Hide and Show the correct buttons of the user
 */
function hilfesuchender(){
    //ButtonStyle
    $(".take").hide();
    $(".edit").show();
    $(".delete").show();
    $(".sumBetrag").hide();
    $(".addArticleToList").show();


    searchforTakenListAndHideButton();
}


//$("#defaultOpen").click();
