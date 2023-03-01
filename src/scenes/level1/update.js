import values from "../../prefab/constants.js"
import { score } from "../../prefab/mobxCenter.js"

export default function update(time) {
    
    score.points +=  0.05 ;
    
    if (score.timeCount <= 0){
        this.scene.stop('level1')
        this.scene.stop('UIScene')
        this.scene.start('gameOver')
    }

    this.enemyGroup.map(e=>{
        if(e.enemyObject.typeOfEnemy == "Zombie" && e.enemyObject.active){
            e.enemyObject.anims.play('walk', true)
        }
        if (e.enemyObject.typeOfEnemy == "Tank" && e.enemyObject.active) {
            e.enemyFire(time, this.player.playerObject, this.enemyBulletGroup)
        }
        if (e.enemyObject.typeOfEnemy == "Ufo" && e.enemyObject.active) {
            e.enemyFire(time, this.player.playerObject, this.enemyBulletGroup)
        }
        
    })

    if (this.player.whereIAmLooking == "RIGHT") {
        this.player.playerObject.setAngle(90)
    } else if (this.player.whereIAmLooking == "LEFT") {
        this.player.playerObject.setAngle(-90)
    } else if (this.player.whereIAmLooking == "DOWN") {
        this.player.playerObject.setAngle(180)
    } else {
        this.player.playerObject.setAngle(0)
    }


   this.enemyBulletGroup.getChildren().map(e=>{
       if(e.x > values.levelScreen.x || e.x < 0 || e.y > values.levelScreen.y || e.y < 0){
        this.enemyBulletGroup.remove(e, true, true)
       }       
   })

   this.bulletGroup.getChildren().map(e=>{
        if(e.x > values.levelScreen.x || e.x < 0 || e.y > values.levelScreen.y || e.y < 0){
        this.bulletGroup.remove(e, true, true)
        }       
    })
}