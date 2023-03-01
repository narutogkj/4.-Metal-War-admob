import emitter from './EventsCenter.js'
import Sounds from './Sounds.js';


let sounds;
function gamePadEvents(myController){
    myController
    .on('up0', () => {  emitter.emit('moveUp')})
    .on('down0', () => { emitter.emit('moveDown') })
    .on('right0', () => { emitter.emit('moveRight') })
    .on('left0',  () => {  emitter.emit('moveLeft') })
    .after('up0', () => { emitter.emit('stopMoving')})
    .after('down0',  () => {  emitter.emit('stopMoving') })
    .after('right0', () => { emitter.emit('stopMoving') })
    .after('left0', () => { emitter.emit('stopMoving')})
    .after('button0', () =>{
        sounds.getFireSound('fire');
        emitter.emit('fire')
    })
}

export function inputs(parent) {

    parent.cursors = parent.input.keyboard.createCursorKeys();
    parent.zKeyStrok = parent.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z)
    sounds = new Sounds(parent.sound);

    parent.zKeyStrok.on('down', () => {

        
        sounds.getFireSound('fire');
        emitter.emit('fire')
    })

    parent.cursors.up
        .on('down', () => {
            emitter.emit('moveUp')
        })
        .on('up', () => {
            emitter.emit('stopMoving')
        })

    parent.cursors.left
        .on('down', () => {
            emitter.emit('moveLeft')
        })
        .on('up', () => {
            emitter.emit('stopMoving')
        })


    parent.cursors.right
        .on('down', () => {
            emitter.emit('moveRight')
        })
        .on('up', () => {
            emitter.emit('stopMoving')
        })



    parent.cursors.down
        .on('down', () => {
            emitter.emit('moveDown')
        })
        .on('up', () => {
            emitter.emit('stopMoving')
        })



    parent.upArrow
        .on('pointerover', function() {
            emitter.emit('moveUp')
        }, parent.upArrow)
        .on('pointerout', function() {
            emitter.emit('stopMoving')
        });

    parent.leftArrow
        .on('pointerover', function() {
            emitter.emit('moveLeft')
        })
        .on('pointerout', function() {
            emitter.emit('stopMoving')
        })


    parent.rightArrow
        .on('pointerover', function() {
            emitter.emit('moveRight')
        })
        .on('pointerout', function() {
            emitter.emit('stopMoving')
        });

    parent.downArrow
        .on('pointerover', function() {
            emitter.emit('moveDown')
        })
        .on('pointerout', function() {
            emitter.emit('stopMoving')
        });

    parent.centerArrow
        .on('pointerover', function(pointer) {
            sounds.getFireSound('fire');
            emitter.emit('fire')
        });
    
    if(parent.arrowB){
        parent.arrowB
        .on('pointerover', function(pointer) {
            sounds.getFireSound('fire');
            emitter.emit('fire')
        });
    }
   

    //GamePad controllers



    if(gameControl.getGamepad(0) ){
        gamePadEvents(gameControl.getGamepad(0))
    }else{
        gameControl.on('connect', function(gamepad) {
            gamePadEvents(gameControl.getGamepad(0))
        })
    }   
   

}