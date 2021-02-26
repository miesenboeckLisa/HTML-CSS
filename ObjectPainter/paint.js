/*********************************************************************
 * author: Lisa Miesenböck, 1910456020
 * Homework 6 / Part 2
 * created: 01.06.2020
 * description: this program reference to "objectES6.js"
 * updates the form of the input-fields,
 * and creates the correct objects
 ******************************************************************/
let $inputPosX;
let $inputPosY;
let $inputColor;
let $inputSize;
let $inputWidth;
let $inputHeight;
let $inputAmount;
let positionX="";
let positionY="";

$(document).ready(function(){
	$inputPosX = $("#positionX");
	$inputPosY = $("#positionY");
	$inputColor = $("#color");
	$inputSize = $("#size");
	$inputWidth = $("#width");
	$inputHeight = $("#height");

	updateFormElements();
	
	$("#draw").click(function(){
		validateInputAndDraw();
	});
	
	emptyButton = document.getElementById("empty");
	$("#empty").click(function(){
		$("#paintArea").children().remove();
	}); 
				
	$("#shape").change(function() {
		updateFormElements();
	});

	/*****************************************************
	 * draw the object on the clicked-position,
	 * X and Y Coordinates were defined by the position of the click
	 * in the paintarea
	 *****************************************************/
	$("#paintArea").click(function(e){
		positionX = e.clientX;
		positionY = e.clientY;
		updateFormElements();
		validateInputAndDraw();
		positionY="";
		positionX="";
	});
	
});

/*****************************************************
 *shows and hide the correct input-fields of the objects
 *to enter in the width/height or the size
 *****************************************************/
function updateFormElements() {
	let shape = $("#shape").val();
	switch(shape) {
		case "square":
			$inputSize.parent().show();
			$inputWidth.parent().hide();
			$inputHeight.parent().hide();
			break;
		case "rectangle":
			$inputSize.parent().hide();
			$inputWidth.parent().show();
			$inputHeight.parent().show();
			break;
		case "frame":
			$inputSize.parent().hide();
			$inputWidth.parent().hide();
			$inputHeight.parent().hide();
			break;
		case "circle":
			$inputSize.parent().show();
			$inputWidth.parent().hide();
			$inputHeight.parent().hide();
			break;
		case "triangle":
			$inputSize.parent().hide();
			$inputWidth.parent().show();
			$inputHeight.parent().show();
			break;
		case "figure":
			$inputSize.parent().hide();
			$inputWidth.parent().show();
			$inputHeight.parent().show();
			break;
		default: 
			break;
	}
}

/*****************************************************
 * select the value if the input-fields from the form
 * creates and draw the correct objects
 * switch-case
 *****************************************************/
function validateInputAndDraw() {
	let shape = document.paintForm.shape.options[document.paintForm.shape.selectedIndex].value;
	let color = checkInputField("color");
	if(positionX=="" && positionY == ""){
		positionX = checkInputField("positionX");
		positionY = checkInputField("positionY");
	}

	switch(shape) {
		case "square":
			let size = checkInputField("size");
			let s = new Square(Number(positionX),
                Number(positionY),color,Number(size));
            s.draw($("#paintArea"));
		
			break;
		case "rectangle":
			let width = checkInputField("width");
			let height = checkInputField("height");
            let r = new Rectangle(Number(positionX),
                Number(positionY),color,Number(width), Number(height));
            r.draw($("#paintArea"));
					
			break;
		case "frame":

            let frame = new Frame(Number(positionX), Number(positionY),color);
            let r1 = new Rectangle(0,0,"#aabbcc",5,10);
            frame.addPaintObj(r1);

            let s1 = new Square(100,100,"#aaffcc",50);
            frame.addPaintObj(s1);

            frame.draw($("#paintArea"));
		
			break;

		case "circle":
			let sizeCircle = checkInputField("size");
			let sCircle = new Circle(Number(positionX),
				Number(positionY),color,Number(sizeCircle));
			sCircle.draw($("#paintArea"));
			break;
		case "triangle":
			let wi = checkInputField("width");
			let hi = checkInputField("height");
			let triangle = new Triangle(Number(positionX),
				Number(positionY),color,Number(wi), Number(hi));
			triangle.draw($("#paintArea"));
			break;

		case "figure":
			let w = checkInputField("width");
			let h = checkInputField("height");
			let figure = new Figure(Number(positionX),
				Number(positionY),color,Number(w), Number(h));
			figure.draw($("#paintArea"));

			break;

		default:
			break;


	}
	positionY="";
	positionX="";
}

function checkInputField(id) {
	let $inputField = $("#"+id);
	
	if($inputField.val() == "" ) {
		$inputField.css("border","1px solid red"); //roter Rahmen
		return "";
	} else {
		$inputField.css("border","1px solid #cdcdcd");
		return $inputField.val();
	}
}


