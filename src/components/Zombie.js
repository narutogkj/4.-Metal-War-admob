export default class Zombie {

    enemyObject = {};
    directiomArray = ["RIGHT", "TOP", "DOWN", "LEFT", "RIGHT"]
    currentDirection = "";
    parent;
    constructor(parent, w, h, sprite) {
        this.parent = parent
        this.enemyObject = parent.physics.add.sprite(w, h, sprite, 1).setScale(0.7,0.7).setVelocityX(30)
        this.enemyObject.typeOfEnemy = "Zombie"
        this.currentDirection = this.directiomArray[0];
    }

    changeDirection() {
        var randomNo = -1 * Math.floor(Math.random() * (0 - 4)) + 0



        this.currentDirection = this.directiomArray[randomNo];

        if (this.currentDirection == "LEFT") {
            this.enemyObject.setVelocityX(-30).setAngle(180)
        } else if (this.currentDirection == "TOP") {
            this.enemyObject.setVelocityY(-30).setAngle(-90)
        } else if (this.currentDirection == "DOWN") {
            this.enemyObject.setVelocityY(30).setAngle(90)
        } else if (this.currentDirection == "RIGHT") {
            this.enemyObject.setVelocityX(30).setAngle(0)
        }


    }


    


}