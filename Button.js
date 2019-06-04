class Button {
    constructor (scene, x, y, cursorInput) {
        scene.add.existing(this);
        this.x = x;
        this.y = y;
        this.cursorInput = cursorInput;
        this.setImmovable();
    }
}
