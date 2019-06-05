class Button extends Phaser.GameObjects.Sprite{
    constructor (scene, x, y, pictureName, clickFunction) {
        super(scene,x,y,pictureName);
        scene.add.existing(this);
        this.x = x;
        this.y = y;
        //this.cursorInput = cursorInput;
        //this.setImmovable();
        //Function called when the button is clicked
        this.setInteractive();
        this.on('pointerdown',clickFunction);
    }

}
