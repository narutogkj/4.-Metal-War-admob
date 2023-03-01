import boot from './scenes/loadingScene/boot.js';
import uiScene from './scenes/UI/index.js';
import menu from './scenes/menu/index.js';
import preloadScene from './scenes/loadingScene/preloadScene.js';
import gameOver from './scenes/gameOver/index.js'
import emmiterScene from './scenes/emiiterScene/index.js'
import level1 from './scenes/level1/index.js';
import OptionScene from './scenes/OptionScene/index.js'
import values from './prefab/constants.js'
import { banner } from './prefab/Ads.js';




let config = {
    type: Phaser.AUTO,
    width: values.gameSize.x,
    height: values.gameSize.y,
    scale: {
        // mode: Phaser.Scale.ScaleModes.FIT,     //To center vertically
        autoCenter: Phaser.Scale.CENTER_BOTH   //to center horizontally
    },
    backgroundColor: '#EAEFF2',    
    physics: {
        default: 'arcade',
        arcade: {
            // debug: true
        }
    },
    input: {
        activePointers: 3
    },
    scene: [boot, preloadScene, menu, level1, OptionScene, emmiterScene, uiScene, gameOver]
};

banner.show();
let game = new Phaser.Game(config);