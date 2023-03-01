import Bullet from "./bullet.js";
export default class Enemy {

    enemyObject = {};
    fireLock;
    DistanceWithPLayer = Infinity;
    directiomArray = ["RIGHT", "TOP", "DOWN", "LEFT", "RIGHT"]
    currentDirection = "";
    parent;
    frequnecyArray;
    constructor(parent, w, h, sprite) {
        this.parent = parent
        this.fireLock = false;
        this.enemyObject = parent.physics.add.sprite(w, h, sprite).setScale(0.4, 0.4).setVelocityX(100)
        this.enemyObject.typeOfEnemy = "Tank";
        this.currentDirection = this.directiomArray[0];
        this.frequnecyArray = [2, 8, 10, 12, 14]
    }

    changeDirection() {
        var randomNo = -1 * Math.floor(Math.random() * (0 - 4)) + 0



        this.currentDirection = this.directiomArray[randomNo];

        if (this.currentDirection == "LEFT") {
            this.enemyObject.setVelocityX(-100).setAngle(180)
        } else if (this.currentDirection == "TOP") {
            this.enemyObject.setVelocityY(-100).setAngle(-90)
        } else if (this.currentDirection == "DOWN") {
            this.enemyObject.setVelocityY(100).setAngle(90)
        } else if (this.currentDirection == "RIGHT") {
            this.enemyObject.setVelocityX(100).setAngle(0)
        }


    }


    findValueOfD(p) {
        switch (this.currentDirection) {
            case "RIGHT":
                {
                    if (Math.round(p.x - this.enemyObject.x) > 0 && Math.abs(this.enemyObject.y - p.y) < 20) {
                        return Math.round(p.x - this.enemyObject.x)
                    }
                    break;
                }
            case "LEFT":
                {
                    if (Math.round(this.enemyObject.x - p.x) > 0 && Math.abs(this.enemyObject.y - p.y) < 20) {
                        return Math.round(this.enemyObject.x - p.x)
                    }
                    break;
                }
            case "TOP":
                {
                    if (Math.round(this.enemyObject.y - p.y) > 0 && Math.abs(this.enemyObject.x - p.x) < 20) {
                        return Math.round(this.enemyObject.y - p.y)
                    }
                    break;
                }
            case "DOWN":
                {
                    if (Math.round(p.y - this.enemyObject.y) > 0 && Math.abs(this.enemyObject.x - p.x) < 20) {
                        return Math.round(p.y - this.enemyObject.y)
                    }
                    break;
                }
        }
        return Infinity
    }

    getRandomNumber() {
        return this.frequnecyArray[Math.floor(Math.random() * this.frequnecyArray.length)];
    }

    enemyFire(time, p, bulletGroup) {
        if (!this.fireLock) {
            this.fireLock = true
            if ((time % this.getRandomNumber() == 0) || (this.findValueOfD(p) < 200 && time % 6 == 0)) {
                bulletGroup.add(new Bullet(this.parent, this.enemyObject.x, this.enemyObject.y, 'bomb', this.currentDirection))
            }

            this.fireLock = false
        }

    }


}