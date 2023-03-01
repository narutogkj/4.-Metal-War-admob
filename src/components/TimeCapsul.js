export default class TimeCapsul {

    timeCapsulObject = {};
    parent;
    constructor(parent, w, h, sprite) {
        this.parent = parent
        this.timeCapsulObject = parent.physics.add.sprite(w, h, sprite).setScale(0.7,0.7)
    }

}