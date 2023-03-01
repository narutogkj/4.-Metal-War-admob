import Enemy from '../components/Enemy.js';
import Zombie from '../components/Zombie.js';
import TimeCapsul from '../components/TimeCapsul.js';
import Ufo from '../components/Ufo.js';
import HeartCapsul from '../components/HeartCapsul.js';
import MyColliders from './MyColliders.js';
import values from './constants.js';



var myColliders = new MyColliders();
export default class SpawnElements {

    parent;
    constructor(_parent){
        this.parent = _parent
    }
    zombieSpawning = function(){

        var randomPositionsArray = [100, 200, 300];
        
        setInterval(()=>{
            var tempEnemy = new Zombie(this.parent, randomPositionsArray[Math.floor(Math.random()*randomPositionsArray.length)], 80, 'zombie');
            this.parent.enemyGroup.push(tempEnemy)
            myColliders.updatedcolliders(
                this.parent,
                this.parent.player.playerObject,
                this.parent.staticObjectForPlayerToColide,
                this.parent.bulletGroup,
                tempEnemy,
                this.parent.enemyBulletGroup,
                this.parent.staticObjectForEnemyToColide
            )
        }, 3000);
    }
    
    tankSpawning = function(){
        setInterval(()=>{
            var tempEnemy = new Enemy(this.parent, 20, 270, 'enemy1');
            this.parent.enemyGroup.push(tempEnemy)
            myColliders.updatedcolliders(
                this.parent,
                this.parent.player.playerObject,
                this.parent.staticObjectForPlayerToColide,
                this.parent.bulletGroup,
                tempEnemy,
                this.parent.enemyBulletGroup,
                this.parent.staticObjectForEnemyToColide
            )
        }, 7000);
    }

    ufoSpawning = function(){
        setInterval(()=>{
            var tempEnemy = new Ufo(this.parent, values.levelScreen.x/2, 200, 'ufoEnemy');
            this.parent.enemyGroup.push(tempEnemy)
            myColliders.updatedcolliders(
                this.parent,
                this.parent.player.playerObject,
                this.parent.staticObjectForPlayerToColide,
                this.parent.bulletGroup,
                tempEnemy,
                this.parent.enemyBulletGroup,
                this.parent.staticObjectForEnemyToColide
            )
        }, 15000);
    }
    
    
    timeCapsulSpawning = function(){
        var randomPositionsArray = [100, 200, 300];
        setInterval(()=>{
            var timeCapsul = new TimeCapsul(this.parent, 
                randomPositionsArray[Math.floor(Math.random()*randomPositionsArray.length)], 
                randomPositionsArray[Math.floor(Math.random()*randomPositionsArray.length)],
                'timeIcon1'
            );
           
            myColliders.timeCapsulColider(
                this.parent,
                this.parent.player.playerObject,
                timeCapsul.timeCapsulObject
            )
        }, 6000);
    }

    heartCapsulSpawning = function(){
        var randomPositionsArray = [800, 160, 240];
        setInterval(()=>{
            var heartCapsul = new HeartCapsul(this.parent, 
                randomPositionsArray[Math.floor(Math.random()*randomPositionsArray.length)], 
                randomPositionsArray[Math.floor(Math.random()*randomPositionsArray.length)],
                'heartIcon'
            );
           
            myColliders.heartCapsulColider(
                this.parent,
                this.parent.player.playerObject,
                heartCapsul.heartCapsulObject
            )
        }, 10000);
    }
}