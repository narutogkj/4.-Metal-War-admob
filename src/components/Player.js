export default class Player {
    playerObject = {}
    whereIAmLooking = ""

    constructor(parent, x, y, sprite) {
        this.playerObject = parent.physics.add.sprite(x, y, sprite).setBounce(0.3);
        this.whereIAmLooking = "TOP";
    }


    addCollider(parent, secondObject) {
        parent.physics.add.collider(this.playerObject, secondObject);
    }
}