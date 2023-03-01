import Bullet from "./bullet.js";
export default class Ufo {

    enemyObject = {};
    fireLock;
    DistanceWithPLayer = Infinity;
    directiomArray = ["RIGHT", "TOP", "DOWN", "LEFT", "RIGHT"]
    speedArray = [50, 50, 50, 50, 400]
    currentDirection = "";
    parent;
    frequnecyArray;
    constructor(parent, w, h, sprite) {
        this.parent = parent
        this.fireLock = false;
        this.enemyObject = parent.physics.add.sprite(w, h, sprite).setScale(0.4, 0.4).setVelocityX(100)
        this.enemyObject.typeOfEnemy = "Ufo";
        this.currentDirection = this.directiomArray[2];
        this.currentSpeed = this.speedArray[0];
        this.frequnecyArray = [2, 8, 10, 12, 14]
    }

    changeDirection() {
        var randomNo = -1 * Math.floor(Math.random() * (0 - 4)) + 0



        this.currentDirection = this.directiomArray[randomNo];
        this.currentSpeed = this.speedArray[randomNo];

        if (this.currentDirection == "LEFT") {
            this.enemyObject.setVelocityX(-this.currentSpeed)
        } else if (this.currentDirection == "TOP") {
            this.enemyObject.setVelocityY(-this.currentSpeed)
        } else if (this.currentDirection == "DOWN") {
            this.enemyObject.setVelocityY(this.currentSpeed)
        } else if (this.currentDirection == "RIGHT") {
            this.enemyObject.setVelocityX(this.currentSpeed)
        }


    }



    getRandomNumber() {
        return this.frequnecyArray[Math.floor(Math.random() * this.frequnecyArray.length)];
    }

    enemyFire(time, p, bulletGroup) {
        if (!this.fireLock) {
            this.fireLock = true
            if (time % 21 == 0) {
                for(var i=0; i<this.directiomArray.length; i++){
                    bulletGroup.add(new Bullet(this.parent, this.enemyObject.x, this.enemyObject.y, 'bomb', this.directiomArray[i]))
                }
                
            }
            this.fireLock = false
        }

    }


}