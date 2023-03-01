import values from "./constants.js";
import emitter from "./EventsCenter.js";
import { score } from "./mobxCenter.js";
import Sounds from './Sounds.js';


let sounds;

class MyColliders{

    updatedcolliders(parent, _player, _staticGroup, _playerBulletsGroup, e, _enemyBulletGroup, _invisbleStaticGroup) {       
          
        sounds = new Sounds(parent.sound)
        var tempObject =  e.enemyObject;  
           
        
        tempObject.body.onWorldBounds = true;
        tempObject.setCollideWorldBounds(true)
    
        parent.physics.world.on("worldbounds", function(body) {
            if (tempObject == body.gameObject) {
                emitter.emit('enemychangeDirection', e)
            }
        }, parent);
    
    
        if (_staticGroup) {
            parent.physics.add.collider(tempObject, _staticGroup, () => {
                emitter.emit('enemychangeDirection', e)
            });
        }
    
        if (_invisbleStaticGroup) {
            parent.physics.add.collider(tempObject, _invisbleStaticGroup, () => {
                emitter.emit('enemychangeDirection', e)
            });
        }
    
        if (_playerBulletsGroup && _player.active == true) {
            parent.physics.add.collider(tempObject, _playerBulletsGroup, (_e, b) => {
                sounds.getBlastSound('blast');
    
                if (_e.active) {
                    
                    if(_e.typeOfEnemy == "Zombie"){ 
                        score.points += 5;
                    }else if(_e.typeOfEnemy == "Tank"){
                        score.points += 10;
                    }
                    _e.setBounce(1)
                    _e.destroy();
                    _playerBulletsGroup.remove(b, true, true)
                    score.enemyCount += 1
                    
                    score.points += 10
                }
    
            });
        }
    
    
    
                if (_player) {
                    parent.physics.add.collider(tempObject, _player, (_e) => {
                        navigator.vibrate(300);
                        emitter.emit('powerDown')
                        var startColor = Phaser.Display.Color.ValueToColor(0xffffff)
                        var endColor = Phaser.Display.Color.ValueToColor(0x000000)
    
                        parent.scene.scene.tweens.addCounter({
                            from: 0,
                            to: 100,
                            duration: 100,
                            repeat: 2,
                            yoyo: true,
                            ease: Phaser.Math.Easing.Sine.InOut,
                            onUpdate: tween => {
                                const value = tween.getValue()
                                const colorObject = Phaser.Display.Color.Interpolate.ColorWithColor(
                                    startColor,
                                    endColor,
                                    100,
                                    value
                                )
                                const color = Phaser.Display.Color.GetColor(
                                    colorObject.r,
                                    colorObject.g,
                                    colorObject.b
                                )
                                _player.setTint(color)
                            }
                        })
    
                        if (values.playerHealth <= 0) {
                            parent.scene.stop('level1')
                            parent.scene.stop('UIScene')
                            parent.scene.start('gameOver')
                        }
                    });
                }
    
    
    
    
    
    
        
    
    
        if (_staticGroup && _playerBulletsGroup) {
           
    
            parent.physics.add.collider(_enemyBulletGroup, _player, (b) => {
                sounds.getBlastSound('blast');
                _enemyBulletGroup.remove(b, true, true)
                navigator.vibrate(300);
                emitter.emit('powerDown')
                var startColor = Phaser.Display.Color.ValueToColor(0xffffff)
                var endColor = Phaser.Display.Color.ValueToColor(0x000000)
    
                parent.scene.scene.tweens.addCounter({
                    from: 0,
                    to: 100,
                    duration: 100,
                    repeat: 2,
                    yoyo: true,
                    ease: Phaser.Math.Easing.Sine.InOut,
                    onUpdate: tween => {
                        const value = tween.getValue()
                        const colorObject = Phaser.Display.Color.Interpolate.ColorWithColor(
                            startColor,
                            endColor,
                            100,
                            value
                        )
                        const color = Phaser.Display.Color.GetColor(
                            colorObject.r,
                            colorObject.g,
                            colorObject.b
                        )
                        _player.setTint(color)
                    }
    
                })
                if (values.playerHealth <= 0) {
                    parent.scene.stop('level1')
                    parent.scene.stop('UIScene')
                    parent.scene.start('gameOver')
                }
    
            })
        }
    
        if (_enemyBulletGroup, _playerBulletsGroup) {
            parent.physics.add.collider(_enemyBulletGroup, _playerBulletsGroup, (e, p) => {
                sounds.getBlastSound('blast');
                _playerBulletsGroup.remove(p, true, true)
                _enemyBulletGroup.remove(e, true, true)
            });
        }
    }

    colliders(parent, _player, _staticGroup, _playerBulletsGroup) {

        sounds = new Sounds(parent.sound)
        parent.physics.world.setBounds(0, 0, values.levelScreen.x, values.levelScreen.y);
    
    
        if (_player) {
            _player.body.onWorldBounds = true;
            _player.setCollideWorldBounds(true).setBounce(0)
            if (_staticGroup) {
                parent.physics.add.collider(_player, _staticGroup);
            }
        }
    
    
    
        if (_staticGroup && _playerBulletsGroup) {
            parent.physics.add.collider(_playerBulletsGroup, _staticGroup, (b) => {
                sounds.getBlastSound('blast')
                _playerBulletsGroup.remove(b, true, true)
            });
    
        }
    
     
    }

    timeCapsulColider( parent, _player, _timeCapsul){
        parent.physics.add.collider(_timeCapsul, _player, (_e) => {
            _e.destroy();
            score.timeCount += 10;
        })
    }

    heartCapsulColider( parent, _player, _heartCapsul){
        parent.physics.add.collider(_heartCapsul, _player, (_e) => {
            _e.destroy();
            emitter.emit('powerUp')
        })
    }
}


export default MyColliders;