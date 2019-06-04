class Button {
    constructor (scene, x, y, cursorInput, clickFunction) {
        scene.add.existing(this);
        this.x = x;
        this.y = y;
        this.cursorInput = cursorInput;
        this.setImmovable();
        //Function called when the button is clicked
        this.clickFunction= clickFunction;
    }

}
