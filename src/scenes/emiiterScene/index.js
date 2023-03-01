import values from "../../prefab/constants.js";
import Bullet from '../../components/bullet.js';
import emitter from '../../prefab/EventsCenter.js';


const initializer = {
   Extends: Phaser.Scene,
   initialize:function emmiterScene (){
      Phaser.Scene.call(this, { key: 'emmiterScene', active: true });
   },
   preload: function preload() {   },
   create: function(){
      
      emitter.on('enemychangeDirection', (enemy) => {
          if (this.scene.get(`level${values.currentLevel}`).player.playerObject.active == true) {
              enemy.changeDirection()
          }
      })


      emitter.on('fire', () => {
          if (this.scene.get(`level${values.currentLevel}`).player.playerObject.active == true) {
              if (this.scene.get(`level${values.currentLevel}`).player.whereIAmLooking == "RIGHT") {
                  this.scene.get(`level${values.currentLevel}`).bulletGroup.add(new Bullet(this.scene.get(`level${values.currentLevel}`), this.scene.get(`level${values.currentLevel}`).player.playerObject.x + 20, this.scene.get(`level${values.currentLevel}`).player.playerObject.y, 'bomb').setVelocityX(values.bulletSpeed).setAngle(0))
              } else if (this.scene.get(`level${values.currentLevel}`).player.whereIAmLooking == "LEFT") {
                  this.scene.get(`level${values.currentLevel}`).bulletGroup.add(new Bullet(this.scene.get(`level${values.currentLevel}`), this.scene.get(`level${values.currentLevel}`).player.playerObject.x - 20, this.scene.get(`level${values.currentLevel}`).player.playerObject.y, 'bomb').setVelocityX(-values.bulletSpeed).setAngle(-180))
              } else if (this.scene.get(`level${values.currentLevel}`).player.whereIAmLooking == "DOWN") {
                  this.scene.get(`level${values.currentLevel}`).bulletGroup.add(new Bullet(this.scene.get(`level${values.currentLevel}`), this.scene.get(`level${values.currentLevel}`).player.playerObject.x, this.scene.get(`level${values.currentLevel}`).player.playerObject.y + 25, 'bomb').setVelocityY(values.bulletSpeed).setAngle(90))
              } else {
                  this.scene.get(`level${values.currentLevel}`).bulletGroup.add(new Bullet(this.scene.get(`level${values.currentLevel}`), this.scene.get(`level${values.currentLevel}`).player.playerObject.x, this.scene.get(`level${values.currentLevel}`).player.playerObject.y - 25, 'bomb').setVelocityY(-values.bulletSpeed).setAngle(-90))
              }
          }
      }, this.scene.get(`level${values.currentLevel}`));




      emitter
          .on('moveUp', () => {
            
              if (this.scene.get(`level${values.currentLevel}`).player.playerObject.active == true) {
                  this.scene.get(`level${values.currentLevel}`).player.playerObject.setVelocityY(-values.speed)
                  this.scene.get(`level${values.currentLevel}`).player.whereIAmLooking = "TOP"
              }
          }, this.scene.get(`level${values.currentLevel}`))
          .on('moveDown', () => {
              if (this.scene.get(`level${values.currentLevel}`).player.playerObject.active == true) {
                  this.scene.get(`level${values.currentLevel}`).player.playerObject.setVelocityY(values.speed)
                  this.scene.get(`level${values.currentLevel}`).player.whereIAmLooking = "DOWN"
              }
          }, this.scene.get(`level${values.currentLevel}`))
          .on('moveLeft', () => {
              if (this.scene.get(`level${values.currentLevel}`).player.playerObject.active == true) {
                  this.scene.get(`level${values.currentLevel}`).player.playerObject.setVelocityX(-values.speed)
                  this.scene.get(`level${values.currentLevel}`).player.whereIAmLooking = "LEFT"
              }
          }, this.scene.get(`level${values.currentLevel}`))
          .on('moveRight', () => {
              if (this.scene.get(`level${values.currentLevel}`).player.playerObject.active == true) {
                  this.scene.get(`level${values.currentLevel}`).player.playerObject.setVelocityX(values.speed)
                  this.scene.get(`level${values.currentLevel}`).player.whereIAmLooking = "RIGHT"
              }

          }, this.scene.get(`level${values.currentLevel}`))
          .on('stopMoving', () => {
              if (this.scene.get(`level${values.currentLevel}`).player.playerObject.active == true) {
                  this.scene.get(`level${values.currentLevel}`).player.playerObject.setVelocityX(0)
                  this.scene.get(`level${values.currentLevel}`).player.playerObject.setVelocityY(0)
              }
          }, this.scene.get(`level${values.currentLevel}`));
   }
}

var emmiterScene = new Phaser.Class(initializer);
export default emmiterScene;