/*********************************************************************
 *author: Lisa Miesenböck
 *description: this program creates a game called "memory"
 *in different difficult-levels (easy-8 pairs, medium - 12 pairs ,hard-18 pairs)
 *target: find all the pairs with the same animal on it
 *if you uncover two different cards the cards were covered again
 *if you find a two correct cards the cards are removed from the game and
 *impossible to click on again
 ******************************************************************/
let pairsWin  = 0;
$(document).ready(function(){
    $("#btn_start").click(function(){
        console.log("ja das klicken auf den Button funktioniert einwandfrei");
        let choice = $("input[name='diff']:checked").val();
        console.log(choice);

        /*****************************************************
         * easy: 8 pairs - 16 cards
         * medium: 12 pairs - 24 cards
         * hard: 18 pairs - 36 cards
         *****************************************************/
        let size = 180;
        if(choice==="easy"){
            $("#memoryField").css({
                "width" : `${(size*4)}px`,
                "height" : `auto`
            });
            pairsWin = 8;
            buildBoard(16);
        }
        else if(choice === "medium"){
            $("#memoryField").css({
                "width" : `${(size*6)}px`,
                "height" : `auto`
            });
            pairsWin = 12;
            buildBoard(24);
        }
        else if(choice === "hard"){
            $("#memoryField").css({
                "width" : `${(size*6)}px`,
                "height" : `auto`
            });
            pairsWin = 18;
            buildBoard(36);
        }
    });
});

/*****************************************************
 * randomly built of the memoryField - regarding
 * the difficult levels
 *****************************************************/
function buildBoard(cards){

    //clear the memory-field
    $("#memoryField").empty();

    let counterTry=0;
    let pairsFound=0;
    let firstCard = " ";
    let secondCard = " ";

    let arr = new Array();
    for (let i=0; i<cards; i++){
        arr.push(i);
        $("#memoryField").append("<div class='memoryCards'><img width='75' src='imgs/' id='card_" + i + "' /></div>");
    }
    let r;
    for (let i=0; i<(cards/2); i++){
        r = getRandom(0, arr.length-1);
        $("#memoryField div #card_" + arr[r]).attr(
            "src", "imgs/img_" + i + ".jpg");
        arr.splice(r, 1); //deletes the element on index r
        r = getRandom(0, arr.length-1);
        $("#memoryField div #card_" + arr[r]).attr(
            "src", "imgs/img_" + i + ".jpg");
        arr.splice(r, 1);
    }

    /*****************************************************
     * hide all the cards and start with the game
     * first click --> firstCard (ID), second click --> secondCard (ID)
     * no action: clicking one card twice times
     *****************************************************/
    window.setTimeout(function(){
        $(".memoryCards img").fadeOut(2000);

        $("div .memoryCards").click(function(){
            let elem = $(this).find("img");
            $(elem).fadeIn("fast");

            //set first-Card
            if(firstCard === " "){
                firstCard = elem.attr("id");
            }

            //set second-card
           else if(secondCard === " ") {
                secondCard = elem.attr("id");

                //handling - clicking twice times the same card
                if (secondCard != firstCard) {
                    let firstSrc = $(`#${firstCard}`).attr("src");
                    let secondSrc = $(`#${secondCard}`).attr("src");

                    /*****************************************************
                     *check if cards are a match
                     *****************************************************/
                    if (firstSrc == secondSrc) {
                        let firstOne = $(`#${firstCard}`);
                        let secondOne = $(`#${secondCard}`);

                        //rise the tries and the amount of the matching pairs
                        counterTry++;
                        pairsFound++;

                        //start searching for pairs again :-)
                        firstCard = " ";
                        secondCard = " ";

                        /*****************************************************
                         *set a timeOut that it is possible to have a look at the
                         *matching cards and afterwards the cards remove from the
                         *memory-field - not possible to click again
                         *****************************************************/
                        window.setTimeout(function () {
                            $(firstOne).parent().css({
                                "background-color": "#a85416"
                            });
                            $(secondOne).parent().css({
                                "background-color": "#a85416"
                            });
                            $(firstOne).remove();
                            $(secondOne).remove();

                            /*****************************************************
                             *check if all pairs are found - game completed
                             *display all the tries you needed in an alert
                             *****************************************************/
                            if (pairsFound === pairsWin) {
                                $("#memoryField").empty();
                                alert("Gratuliere! \nDu hast das Spiel abgeschlossen!" +
                                    "\nInsgesamt hast du " + counterTry + " Züge benötigt!");
                            }
                        }, 500);

                    }
                    /*****************************************************
                     *if the cards not matching they were covered again
                     *and the game goes on!
                     *****************************************************/
                    else {
                        let firstOne = $(`#${firstCard}`);
                        let secondOne = $(`#${secondCard}`);
                        window.setTimeout(function () {
                            $(firstOne).fadeOut();
                            $(secondOne).fadeOut();
                        }, 1000);
                        counterTry++;
                        firstCard = " ";
                        secondCard = " ";
                    }
                }
                //when a card is clicked twice time, there is no action :)
                else
               secondCard = " ";
            }
        })
    },1000);
}

function getRandom(min, max){
    if (min > max)
        return -1;
    if (min == max)
        return min;
    return min + parseInt(Math.random() * (max-min+1));
}