import Player from '../../components/Player.js';
import values from '../../prefab/constants.js';
import MyColliders from '../../prefab/MyColliders.js';
import Sounds from '../../prefab/Sounds.js';
import SpawnElements from '../../prefab/SpawnElemets.js';
import { score } from '../../prefab/mobxCenter.js';

let sounds;
let myColliders;
let spawnElements;





export default function create() {

    sounds = new Sounds(this.sound);
    sounds.getBackgroundMusic('backgroundMusic');
    
    myColliders = new MyColliders();
    spawnElements = new SpawnElements(this);


    this.staticObjectForPlayerToColide = this.physics.add.staticGroup()          
    this.staticObjectForEnemyToColide = this.physics.add.staticGroup()      //static object for enemy to colide
    
    this.add.tileSprite(0, 0, 3 * values.levelScreen.x, 3 * values.levelScreen.y, 'blackbg').setOrigin(0, 0)
    this.add.image(0, 200, 'road').setOrigin(0,0)
    this.add.image(120, 200, 'road').setOrigin(0,0)
    this.add.image(240, 200, 'road').setOrigin(0,0)
    this.add.image(360, 200, 'road').setOrigin(0,0)
    this.add.image(0, 195, 'entryGate').setOrigin(0,0)
    this.add.image(values.levelScreen.x-70, 195, 'entryGate2').setOrigin(0,0)

    this.staticObjectForPlayerToColide.create(20, 220, 'rock1').setVisible(false)
    this.staticObjectForPlayerToColide.create(20, 320, 'rock1').setVisible(false)
    this.staticObjectForPlayerToColide.create(values.levelScreen.x - 20, 220, 'rock1').setVisible(false)
    this.staticObjectForPlayerToColide.create(values.levelScreen.x - 20, 320, 'rock1').setVisible(false)
    this.staticObjectForPlayerToColide.create(100, 70, 'grave1')
    this.staticObjectForPlayerToColide.create(values.levelScreen.x/2, 70, 'grave2')
    this.staticObjectForPlayerToColide.create(values.levelScreen.x-100, 70, 'grave3')
    this.staticObjectForPlayerToColide.create(values.levelScreen.x/2, 570, 'grave4') 
    this.staticObjectForEnemyToColide.create(values.levelScreen.x / 2, 250, 'rock1').setVisible(false)
    this.staticObjectForEnemyToColide.create(values.levelScreen.x / 2-70, 400, 'rock1').setVisible(false)
    this.staticObjectForEnemyToColide.create(values.levelScreen.x / 2+70, 400, 'rock1').setVisible(false)

    


    this.player = new Player(this, 200, 400, 'player');


    this.bulletGroup = this.add.group()    //player bullet group
    this.enemyGroup = [];
    this.enemyBulletGroup = this.add.group()

    
  

    this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNumbers('zombie', {
            start: 0, end: 16
        }),
        frameRate: 20,
        repate: -1
    })
   


    myColliders.colliders(
        this,
        this.player.playerObject,
        this.staticObjectForPlayerToColide,
        this.bulletGroup
    )

    

    setTimeout(() => {
        spawnElements.tankSpawning();
    }, 10000);
   
    setTimeout(() => {
        spawnElements.ufoSpawning();
    }, 30000);
    
    spawnElements.zombieSpawning();
    spawnElements.timeCapsulSpawning();
    spawnElements.heartCapsulSpawning();
    
    mobx.autorun(() => {
        sounds.backgroundMusic.setVolume(`${score.music}`) 
    })
   
}