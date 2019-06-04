class Button {
    constructor (scene, x, y, cursorInput) {
        scene.add.existing(this);
        this.x = x;
        this.y = y;
        this.cursorInput = cursorInput;
        this.setImmovable();
        //Function called when the button is clicked
        this.clickFunction= null;
    }
    function setClickFunction(func)
    {
        this.clickFunction = func;
    }

}
