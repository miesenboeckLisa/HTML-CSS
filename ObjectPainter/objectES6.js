/*********************************************************************
 *author: Lisa Miesenböck, 1910456020
 *Homework 6 / Part 2
 *created: 01.06.2020
 *description: this program includes different classes:
 * PaintObject, Rectangle, Triangle, Circle, Square, Frame and Figure,
 * Rectangle, Triangle, Circle and Square extends to Super-Class PaintObjects
 * Frame extends to Super-Class Rectangle
 * and Figure extends to Super-Class Frame
 * every class draws a different Object this happens by a draw-method,
 * Moreover, every class includes the methode getHeight and getWidth which
 * returns heigth and width of the object
 * !!-- only comment the methods written for the homework
 ******************************************************************/
class PaintObj{
    constructor(posX, posY, color){ //Konstruktorfunktion
        this.posX = posX;
        this.posY = posY;
        this.color = color;
        this.div = undefined;
    }

    draw($parent){
        //lege mir zusätzliches Attribute an
        this.div = $("<div></div>");
        this.div.css({ //JSON - anonymes Objekt
            position:"absolute",
            top: this.posY+"px",
            left:this.posX+"px",
            background : this.color
        });
        //einhängen in den DOM Baum
        $parent.append(this.div);
        this.setClickHandler();
    }

    deleteElement(div) { //have to handle div - this would be event-object
        div.remove();
    }

    /*****************************************************
     * by clicking on an object in the PaintArea you trigger an click handler,
     * the user is asked if the object should delete or not,
     * by confirm the pop-up the object will delete when dont agree the
     * pop-up the object will not delete
     *****************************************************/
    setClickHandler() {
        //let that = this;
        //this.div.click(function(e){
        //    that.deleteElement(e.currentTarget);
        //});
        this.div.click((e) =>{
            let confirm = window.confirm("Wollen Sie diesen Eintrag wirklich löschen?");
            if(confirm===true) {
               // $(this.div).addClass("highlight");
                this.deleteElement(e.currentTarget);//this is now the klicked div-Element, we need the object - saved it in that
            }
        });
    }

    getWidth() {
        throw "Method abstract - please overwrite in subclass!"
    }

    getHeight() {
        throw "Method abstract - please overwrite in subclass!"
    }
}
//=================================================

class Square extends PaintObj {
    constructor(posX,posY, color, size){
        super(posX,posY,color);
        //neues, zusätzliches Attribute angelegt
        this.size = size;
    }

    //überschreiben der draw Methode
    draw($parent){
        super.draw($parent);
        $(this.div).css({
            width : this.size+"px",
            height:this.size+"px"
        });
    }

    getWidth() {
        return this.size;
    }

    getHeight() {
        return this.size;
    }
}
//=================================================
/*****************************************************
 * class circle extends to the super-class PaintObj
 * width and height are the size of the circle
 *****************************************************/
class Circle extends PaintObj {
    constructor(posX,posY, color, size){
        //reference to the super class, set all the attributes(posX,..) in superclass
        super(posX,posY,color);
        //new, added attribute
        this.size = size;
    }
    /*****************************************************
     * draws the object
     * first reference to super-class
     *****************************************************/
    draw($parent) {
        super.draw($parent);
        $(this.div).css({
            width: this.size + "px",
            height: this.size + "px",
            "border-radius": "50%"
        });
    }

    /*****************************************************
     * return the width of the object Circle
     *****************************************************/
    getWidth() {
        return this.size;
    }

    /*****************************************************
     * return the height of the object Circle
     *****************************************************/
    getHeight() {
        return this.size;
    }
}


//=================================================
/*****************************************************
 * class Triangle extends to the super-class PaintObj
 *****************************************************/
class Triangle extends PaintObj {
    constructor(posX,posY, color, width,height){
        super(posX,posY,color);
        //neues, zusätzliches Attribute angelegt
        this.width = width;
        this.height = height;
    }

    /*****************************************************
     * draws the object
     * first reference to super-class and the draw methods
     * add css style to the object and styles a triangle
     *****************************************************/
    draw($parent) {
        super.draw($parent);
        console.log("hallo");
        $(this.div).css({
            width: "0px",
            height: "0px",
            background : "transparent",
            "border-left": this.width/2 + "px solid transparent",
            "border-right": this.width/2 + "px solid transparent",
            "border-bottom": this.height + "px solid" + this.color
        });
    }

    /*****************************************************
     * return the width of the object Triangle
     *****************************************************/
    getWidth() {
        return this.width;
    }

    /*****************************************************
     * return the height of the object Triangle
     *****************************************************/
    getHeight() {
        return this.height;
    }
}


//=================================================
class Rectangle extends PaintObj{
    constructor(posX,posY, color, width,height){
        super(posX,posY,color);
        //neues, zusätzliches Attribute angelegt
        this.width = width;
        this.height = height;
    }

    //überschreiben der draw Methode
    draw($parent){
        super.draw($parent);
        $(this.div).css({
            width : this.width+"px",
            height:this.height+"px"
        });
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }
}
//=================================================

class Frame extends Rectangle{
    constructor(posX,posY, color) {
        super(posX,posY,color,0,0);
        this.elements = new Array();
    }

    addPaintObj(po) {
        let w = po.getWidth();
        let h = po.getHeight();

        if(this.width < po.posX + w){
            this.width = po.posX + w;
        }

        if(this.height < po.posY + h){
            this.height = po.posY + h;
        }

        this.elements.push(po);//push add an element to the array
    }

    draw($parent){
        super.draw($parent);
        for(let val of this.elements){
            val.draw(this.div);
        }
    }
}

//=================================================

/*****************************************************
 * class Figure extends to Frame
 * makes an empty div around the included objects
 * looks like a Stick-figure
 *****************************************************/
class Figure extends Frame{
    constructor(posX,posY, color, width,height){
        super(posX,posY);
        //new, added attributes
        this.width = width;
        this.height = height;

        //add the objects to the Frame and adjust it by the width and height
        //of the object
        let circle1 = new Circle(width/2, 0, color, width/2);
        this.addPaintObj(circle1);
        let body= new Rectangle(width/2,width/2,color,width/2,height);
        this.addPaintObj(body);
        let armRight= new Rectangle(width,width/2,color,width/3,height/8);
        this.addPaintObj(armRight);
        let armLeft= new Rectangle(width/5,width/2,color,width/3,height/7);
        this.addPaintObj(armLeft);
        let footRight= new Rectangle(width-width/7,height+width/2,color,width/7,height/3);
        this.addPaintObj(footRight);
        let footLeft= new Rectangle(width-width/2,height+width/2,color,width/7,height/3);
        this.addPaintObj(footLeft);
    }

    /*****************************************************
     * overwrite the draw methods from super-class
     *****************************************************/
    draw($parent){
        super.draw($parent);
        $(this.div).css({
            width : this.width+"px",
            height:this.height+"px"
        });


    }

    /*****************************************************
     * return the width of the object Figure
     *****************************************************/
    getWidth() {
        return this.width;
    }

    /*****************************************************
     * return the height of the object Figure
     *****************************************************/
    getHeight() {
        return this.height;
    }
}
//=================================================

