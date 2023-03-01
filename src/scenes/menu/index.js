import { App } from '@capacitor/app';
import { banner } from '../../prefab/Ads.js';

import values from '../../prefab/constants.js';
import { score } from '../../prefab/mobxCenter.js';
import Sounds from '../../prefab/Sounds.js';



let sounds;
const initializer = {

    Extends: Phaser.Scene,
    initialize: function menu() {
        Phaser.Scene.call(this, { key: 'menu', active: false });
    },

    create: async function() {
        

        sounds = new Sounds(this.sound);
        sounds.getIntroAudio('introAudio');     

        mobx.autorun(() => {
            sounds.introAudio.setVolume(score.music) 
        })


        this.add.image(40, 100, 'logo').setOrigin(0,0);
        this.add.sprite(values.levelScreen.x / 2, this.cameras.main.height - 270, "playButton").setOrigin(0.5, 0.5).setScale(1.5, 1.5).setInteractive()
        .on('pointerover', function() {
            sounds.stopIntroAudio();
            this.scene.start('UIScene').start('level1')
        }, this)

        this.add.sprite(values.levelScreen.x / 2, this.cameras.main.height - 200, "optionsButton").setOrigin(0.5, 0.5).setScale(1.5, 1.5).setInteractive()
        .on('pointerover', function() {
          
            this.scene.start('OptionScene')
        }, this)

        this.add.sprite(values.levelScreen.x / 2, this.cameras.main.height - 130, "exitButton").setOrigin(0.5, 0.5).setScale(1.5, 1.5).setInteractive()
        .on('pointerover', function() {
            if(confirm("Do you realy want to Exit!")){
                banner.hide();
                App.exitApp(); 
            }     
        }, this)
        document.addEventListener("backbutton", function(e) {
            e.preventDefault();
            if(confirm("Do you realy want to Exit!")){
                banner.hide();
                App.exitApp(); 
            }
        }, false);
        
        
        this.make.text({
            x: values.levelScreen.x / 2 - 80,
            y: values.levelScreen.y / 2 ,
            text: "High Score",
            style: {
                font: "25px monospace", fill: '#fff', stroke: '#000', strokeThickness: 3
            }
        });    
        this.add.image(values.levelScreen.x/2 - 55, values.levelScreen.y / 2+70, 'scoreIcon')
        var scoreText = this.make.text({
            x: values.levelScreen.x / 2 - 30,
            y: values.levelScreen.y / 2 + 45 ,
            text: score.highScore,
            style: {
                font: "40px monospace", fill: '#fff', stroke: '#000', strokeThickness: 3
            }
        });

        
        mobx.autorun(() => {
            sounds.introAudio.setVolume(`${score.music}`) 
        })
    
    }
}

var menu = new Phaser.Class(initializer);
export default menu;