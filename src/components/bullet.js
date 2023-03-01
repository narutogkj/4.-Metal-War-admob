import values from "../prefab/constants.js"
export default class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, position) {
        super(scene, x, y, texture)

        scene.add.existing(this)
        scene.physics.add.existing(this)



        if (position) {

            switch (position) {
                case "RIGHT":
                    {
                        this.body.setVelocityX(values.bulletSpeed)
                        break;
                    }
                case "LEFT":
                    {
                        this.body.setVelocityX(-values.bulletSpeed)
                        break;
                    }
                case "TOP":
                    {
                        this.body.setVelocityY(-values.bulletSpeed)
                        break;
                    }
                case "DOWN":
                    {
                        this.body.setVelocityY(values.bulletSpeed)
                        break;
                    }
            }

        }
    }

}