/*********************************************************************
 *author: Lisa Miesenböck, 1910456020
 *Homework 4
 *created: 07.05.2020
 *description: this program creates a online-form
 * you can add the tasks to a table above,
 * you can filter the tasks by date, priority and
 * category, after filtering it is possible to show all the tasks again
 * you can also delete a task by click on the button "löschen" in
 * the table row below.
******************************************************************/

$(document).ready(function(){

$(".anlegen").click(function(){
    add();
});

$(".löschen").click(function(){
    deleteAll();
});

$(".dateFil").click(function(){
    dateFilter()
    });

$(".katFil").click(function(){
    katFilter();
});

$(".prioFil").click(function(){
        prioFilter();
    });

    $(".FilAufheben").click(function(){
        filterAufheben();
    });

});


/*****************************************************
 * add the tasks to the table in .div3
 *****************************************************/
function add(){
    //get the value of the input
    let title = $("#title").val();

    let bezeichnung = $("#bezeichnung").val();

    //gehört eingeschränkt dass nur Datum in der Zukunft erlaubt ist
    let faelligkeitsdatum = $("#date").val();

    let entryDate = new Date(faelligkeitsdatum);
    console.log(entryDate);

    let datecurrent = new Date();
    let Day = datecurrent.getDate();
    let Month = datecurrent.getMonth();
    let Year = datecurrent.getFullYear();
    let h = datecurrent.setHours(0);
    let m = datecurrent.setMinutes(0);

    let kat = $("#sel").val();

    let radioPrio = $("input[name='priorität']:checked").val();



    //Error-Handling, all Elements have to be selected
    if(title==="" || bezeichnung==="" || faelligkeitsdatum==="" || radioPrio===undefined){
        alert("Bitte füllen Sie das Formular volständig aus! \n" +
            "Titel, Bezeichnung, Datum und Priorität müssen ausgewählt sein! ");
    }
    else{
        if(entryDate>=datecurrent){
            addTask(title, bezeichnung, faelligkeitsdatum, kat, radioPrio);
        }
        else
            alert("Kein Datum in der Vergangenheit zulässig!");
    }
}

    /*************************************************************
     add the Tasks to the table below
     *************************************************************/
function addTask(title, bezeichnung, faelligkeitsdatum, kat, radioPrio){

    //append a table-row to the table-body
    $(".tbody").append("<tr> </tr>");
    let row = $("tbody tr:last-child");

    //creating an array with all the input-values and make new table-datas
    let arr = [faelligkeitsdatum, title, bezeichnung, kat, radioPrio];

    for(let i = 0; i<=arr.length; i++){
        if(i===arr.length){
            row.append("<td><button>Löschen</button></td>");
            let buttonDel = $("tbody td button");
            //unbind extract the element from the others and add an click-handler
            buttonDel.addClass(".deleteRow").unbind("click").click(function (e) {
                   e.preventDefault(); //make it possible to click the button again :-)
                   deleteRow(this);
            });
        }
        else {
            row.append("<td>"+arr[i]+"</td>"); //Add the elements
        }
    }

        /**
         set the right backgorund-color to the priorities
         red = high priority
         orange = middle priority
         green = no priority
         **/
        if(radioPrio==="hoch"){
            row.css({
                "background-color" : "#DE7173"
            });
        }
        else if(radioPrio==="mittel"){
            row.css({
                "background-color" : "#DEA36F"
            });
        }
        else{
            row.css({
                "background-color" : "#9DDE96"
            });
        }
    }


/********************************************************************
delete all the elements (<tr></tr>) in
 the table below
 ******************************************************************/
function deleteAll(){
    //select all the tr and delete every element
   let elem = $("tbody tr");
   console.log(elem);
   for(let i = 0; i<elem.length; i++){
       elem[i].remove(this);
    }
}

/********************************************************************
fist - securityCheck : if the user say it is "okay"
the object (this tr) is deleted
 ******************************************************************/
function deleteRow(thisObj){
    let confirm = window.confirm("Wollen Sie diesen Eintrag wirklich löschen?");
    if(confirm===true) {
        $(thisObj.parentElement.parentElement).remove();
    }
}

/*****************************************************
 * filter the date of the tasks, show the task between
 * date1 and date2
 *****************************************************/
function dateFilter(){
    //get the input and convert them into a Date-Object
    let input1 = $("#dateFil1").val();
    let input2 = $("#dateFil2").val();
    let date1 = new Date(input1);
    let date2 = new Date(input2);
    let arr = $("tr td").filter(":nth-child(1)");

    //show or hide the elements , parentElement=<tr></tr>
    for(let i = 0; i<arr.length; i++){
        let help = $(arr[i]).text();
        let date = new Date(help);
        if(date>date1 && date<date2){
            $(arr[i].parentElement).show();
        }
        else
            $(arr[i].parentElement).hide();
    }

}

/*****************************************************
 * show high, middle or not priority tasks (selected by
 * the user) and hide the other ones
 *****************************************************/
function prioFilter(){
    //select the value of the selected button
    let radio = $("input[name='prio']:checked").val();

    //Array of the 5th TableData column - Priorities
    let arr = $("tr td").filter(":nth-child(5)");
    for(let i = 0; i<arr.length; i++){
        let prioRad = $(arr[i]).text();
        if(prioRad!==radio){
            $(arr[i].parentElement).hide();
        }
        else
            $(arr[i].parentElement).show();
    }
}

/*****************************************************
 * user select a option and all of these tasks are shown
 *****************************************************/
function katFilter(){

    //select the value of the selected button
    let radio = $("#selKat").val();

    //Array of the 4th TableData column - category
    let arr = $("tr td").filter(":nth-child(4)");
    for(let i = 0; i<arr.length; i++){
        let prioRad = $(arr[i]).text();
        if(prioRad!==radio){
            $(arr[i].parentElement).hide();
        }
        else
            $(arr[i].parentElement).show();
    }
}

/*****************************************************
 * show all the task in the table and remove the filter
 *****************************************************/
function filterAufheben(){
    let arr = $("tr");
    for(let i = 0; i<arr.length; i++){
       $(arr[i]).show();
    }
}




