import values from '../../prefab/constants.js';
import { score } from '../../prefab/mobxCenter.js';
import { banner } from '../../prefab/Ads.js';
import { App } from '@capacitor/app';

const initializer = {

    Extends: Phaser.Scene,
    initialize: function gameOver() {
        Phaser.Scene.call(this, { key: 'gameOver', active: false });
    },
    create: function() {
        
        var loadingText = this.make.text({
            x: values.levelScreen.x / 2,
            y: values.levelScreen.y / 2 -100,
            text: 'Game Over',
            style: {
                font: "40px monospace", fill: '#ff0000', stroke: '#fff', strokeThickness: 3
            }
        });

        loadingText.setOrigin(0.5, 0.5)

       this.add.image(values.levelScreen.x/2 - 35, values.levelScreen.y / 2+ 40, 'scoreIcon')
       
       if(score.highScore < score.points){
        
        this.make.text({
            x: values.levelScreen.x / 2 -100,
            y: values.levelScreen.y / 2 - 50 ,
            text: "New High Score",
            style: {
                font: "25px monospace", fill: '#fff', stroke: '#000', strokeThickness: 3
            }
        });
        
        localStorage.setItem("highScore", Math.round(score.points))
       }
       
        var scoreText = this.make.text({
            x: values.levelScreen.x / 2+25,
            y: values.levelScreen.y / 2 +40,
            text: Math.round(score.points),
            style: {
                font: "40px monospace", fill: '#fff', stroke: '#000', strokeThickness: 3
            }
        });

        scoreText.setOrigin(0.5, 0.5)

        this.add.sprite(values.levelScreen.x / 2, this.cameras.main.height - 200, "restartButton").setOrigin(0.5, 0.5).setScale(1.5, 1.5).setInteractive()
        .on('pointerover', function() {
            banner.hide();
            location.reload();
        }, this)

    
        this.add.sprite(values.levelScreen.x / 2, this.cameras.main.height - 130, "exitButton").setOrigin(0.5, 0.5).setScale(1.5, 1.5).setInteractive()
        .on('pointerover', function() {
                if(confirm("Do you realy want to Exit!")){
                    banner.hide();
                    App.exitApp();
                }
        }, this)

        setTimeout(() => {
            banner.hide();
            location.reload();
        }, 8000)

    }
}

var gameOver = new Phaser.Class(initializer);
export default gameOver;