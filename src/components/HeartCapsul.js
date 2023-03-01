export default class HeartCapsul {

    heartCapsulObject = {};
    parent;
    constructor(parent, w, h, sprite) {
        this.parent = parent
        this.heartCapsulObject = parent.physics.add.sprite(w, h, sprite).setScale(0.7,0.7)
    }

}