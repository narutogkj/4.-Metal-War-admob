import values from "../../prefab/constants.js";

const initializer = {

    Extends: Phaser.Scene,
    initialize: function preloadScene() {
        Phaser.Scene.call(this, { key: 'preloadScene', active: false });
    },
    create: function() {
        this.scene.start('menu')
    },
    preload: function preload() {


        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.2);
        progressBox.fillRoundedRect(20, values.levelScreen.y - 57, 320, 30, 10);



        var loadingPercentageText = this.make.text({
            x: values.levelScreen.x/2,
            y: values.levelScreen.y - 43,
            text: '0%',
            style: {
                font: '20px monospace',
                fill: '0xFF0000'
            }
        });
        loadingPercentageText.setOrigin(0.5, 0.5)




        var loadingText = this.make.text({
            x: values.levelScreen.x / 2,
            y: values.levelScreen.y - 10,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '0xFF0000'
            }
        });
        loadingText.setOrigin(0.5, 0.5);


        this.load.image("arrows", "../../assets/Controller/arrows.png");
        this.load.image("upArrow", "../../assets/Controller/upArrow.png");
        this.load.image("leftArrow", "../../assets/Controller/leftArrow.png");
        this.load.image("rightArrow", "../../assets/Controller/rightArrow.png");
        this.load.image("downArrow", "../../assets/Controller/downArrow.png");
        this.load.image("centerArrow", "../../assets/Controller/centerArrow.png");
        this.load.image("arrowA", "../../assets/Controller/arrowA.png");
        this.load.image("arrowB", "../../assets/Controller/arrowB.png");
        this.load.image("minus", "../../assets/Controller/minus.png");
        this.load.image("plus", "../../assets/Controller/plus.png");

        this.load.audio('backgroundMusic', '../../assets/Sounds/backgroundMusic.mp3')
        this.load.audio('introAudio', '../../assets/Sounds/introMusic.mp3')
        this.load.audio('tank', '../../assets/Sounds/tank.mp3')
        this.load.audio('blast', '../../assets/Sounds/blast.mp3')
        this.load.audio('fire', '../../assets/Sounds/fire.mp3')



        this.load.image("bullet", "../../assets/Prefabs/bullet.png");
        this.load.image("bomb", "../../assets/Prefabs/bomb.png");
        this.load.image("grave1", "../../assets/Prefabs/grave1.png")
        this.load.image("grave2", "../../assets/Prefabs/grave2.png")
        this.load.image("grave3", "../../assets/Prefabs/grave3.png")
        this.load.image("grave4", "../../assets/Prefabs/grave4.png")
        this.load.image("bunker", "../../assets/Prefabs/bunker.png")
        this.load.image("entryGate", "../../assets/Prefabs/entryGate.png")
        this.load.image("entryGate2", "../../assets/Prefabs/entryGate2.png")
        this.load.image("road", "../../assets/Prefabs/road.png")


        this.load.image("exitButton", "../../assets/Icons/exitButton.jpg")
        this.load.image("restartButton", "../../assets/Icons/restartButton.jpg")
        this.load.image("optionsButton", "../../assets/Icons/optionsButton.jpg")
        this.load.image("playButton", "../../assets/Icons/playButton.jpg")
        this.load.image("heartIcon", "../../assets/Icons/heart.png")
        this.load.image("enemyIcon", "../../assets/Icons/enemyIcon.png")
        this.load.image("timeIcon", "../../assets/Icons/timeIcon.png")
        this.load.image("timeIcon1", "../../assets/Icons/timeIcon1.png")
        this.load.image("scoreIcon", "../../assets/Icons/scoreIcon.png")
        this.load.image("pointsIcon", "../../assets/Icons/pointsIcon.png")

        this.load.image('bg', '../../assets/Backgrounds/bg.jpg');
        this.load.image("blackbg", "../../assets/Backgrounds/blackbg.png");

        this.load.image('ufoEnemy', '../../assets/Sprites/ufoEnemy.png');
        this.load.image('bugEnemy', '../../assets/Sprites/bugEnemy.png');
        this.load.image('player', '../../assets/Sprites/player.png');
        this.load.image("enemy1", "../../assets/Sprites/enemy1.png");
        this.load.spritesheet('zombie', '../../assets/Sprites/zombieSprite.png', {
            frameWidth: 60, frameHight: 60
        });


       

        // for(var i=0; i<1000; i++){
        //     this.load.image(`demo${i}`, "../../assets/house3.png")
        // }

        
        
        
        this.add.image(40, 100, 'logo').setOrigin(0,0)

        this.load.on('progress', function(value) {


            loadingPercentageText.setText(Math.ceil(value * 100) + "%")
            progressBar.clear();

            progressBar.fillStyle(0xFFFF00, 1);
            progressBar.fillRoundedRect(25, values.levelScreen.y - 52, 300 * value, 21, 7);

        });

        this.load.on('complete', function() {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
        });
    }

}

var preloadScene = new Phaser.Class(initializer);
export default preloadScene;