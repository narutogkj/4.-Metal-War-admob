import values from '../../prefab/constants.js';
import { score } from '../../prefab/mobxCenter.js';


export default function create() {




    this.add.image(60, 50, 'logo').setOrigin(0,0);

    this.make.text({
        x: 30,
        y: 210 ,
        text: "Volumne",
        style: {
            font: "25px monospace", fill: '#fff', stroke: '#000', strokeThickness: 3
        }
    }); 
    var volumBox = this.add.graphics();
    volumBox.fillStyle(0x222222, 0.4);
    volumBox.fillRoundedRect(values.levelScreen.x-110, 210, 55, 40, 5)

    this.minus1 = this.add.sprite(values.levelScreen.x-130, 230, "minus").setInteractive()
    this.minus1.on('pointerover', function() {
        if(score.volume > 0){
            score.volume -= 1 
            localStorage.setItem("volume",score.volume)
        }       
    }, this.minus1)
    
    this.volumnText = this.make.text({
        x: values.levelScreen.x-90,
        y: 215 ,
        text: `${score.volume}`,
        style: {
            font: "25px monospace", fill: '#fff', stroke: '#000', strokeThickness: 3
        }
    });
    this.plus1 = this.add.sprite(values.levelScreen.x-35, 230, "plus").setInteractive()
    this.plus1.on('pointerover', function() {
        if(score.music < 10){
            score.volume += 1 
            localStorage.setItem("volume",score.volume)
        }    
    }, this.plus1)


















    this.make.text({
        x: 30,
        y: 270 ,
        text: "Music",
        style: {
            font: "25px monospace", fill: '#fff', stroke: '#000', strokeThickness: 3
        }
    }); 
    var musicBox = this.add.graphics();
    musicBox.fillStyle(0x222222, 0.4);
    musicBox.fillRoundedRect(values.levelScreen.x-110, 270, 55, 40, 5)

    this.minus2 = this.add.sprite(values.levelScreen.x-130, 290, "minus").setInteractive()
    this.minus2.on('pointerover', function() {
        if(score.music > 0){
            score.music -= 1 
            localStorage.setItem("music",score.music)
        }       
    }, this.minus2)

    this.musicText = this.make.text({
        x: values.levelScreen.x-90,
        y: 275 ,
        text: `${score.music}`,
        style: {
            font: "25px monospace", fill: '#fff', stroke: '#000', strokeThickness: 3
        }
    });
    this.plus2 = this.add.sprite(values.levelScreen.x-35, 290, "plus").setInteractive()
    this.plus2.on('pointerover', function() {
        if(score.music < 10){
            score.music += 1 
            localStorage.setItem("music",score.music)
        } 
    }, this.plus2)










    this.make.text({
        x: 30,
        y: 330 ,
        text: "Vibration",
        style: {
            font: "25px monospace", fill: '#fff', stroke: '#000', strokeThickness: 3
        }
    }); 
    var vibrationBox = this.add.graphics();
    vibrationBox.fillStyle(0x222222, 0.4);
    vibrationBox.fillRoundedRect(values.levelScreen.x-110, 330, 55, 40, 5)
    this.minus3 = this.add.sprite(values.levelScreen.x-130, 350, "minus").setInteractive()
    this.minus3.on('pointerover', function() {
        console.log('minus')
    }, this.minus3)
    this.make.text({
        x: values.levelScreen.x-90,
        y: 335 ,
        text: `${values.vibration?"Y":"N"}`,
        style: {
            font: "25px monospace", fill: '#fff', stroke: '#000', strokeThickness: 3
        }
    }); 
    this.plus3 = this.add.sprite(values.levelScreen.x-35, 350, "plus").setInteractive()
    this.plus3.on('pointerover', function() {
        console.log('plus')
    }, this.plus3)










    this.make.text({
        x: 30,
        y: 390 ,
        text: "Controller",
        style: {
            font: "25px monospace", fill: '#fff', stroke: '#000', strokeThickness: 3
        }
    }); 
    var controllerBox = this.add.graphics();
    controllerBox.fillStyle(0x222222, 0.4);
    controllerBox.fillRoundedRect(values.levelScreen.x-110, 390, 55, 40, 5)
    this.minus4 = this.add.sprite(values.levelScreen.x-130, 410, "minus").setInteractive()
    this.minus4.on('pointerover', function() {
        if(score.controller > 1){
            score.controller -= 1 
            localStorage.setItem("controller",score.controller)
        }       
    })
    this.controllerText = this.make.text({
        x: values.levelScreen.x-90,
        y: 395 ,
        text: `${score.controller}`,
        style: {
            font: "25px monospace", fill: '#fff', stroke: '#000', strokeThickness: 3
        }
    });
    this.plus4 = this.add.sprite(values.levelScreen.x-35, 410, "plus").setInteractive()
    this.plus4.on('pointerover', function() {
        if(score.controller < 2){
            score.controller += 1 
            localStorage.setItem("controller",score.controller)
        } 
    }, this.plus4)
    
    
    
    
    
    this.add.sprite(values.levelScreen.x / 2, this.cameras.main.height - 130, "playButton").setOrigin(0.5, 0.5).setScale(1.5, 1.5).setInteractive()
    .on('pointerover', function() {
        this.scene.start('UIScene').start('level1')
    }, this)




    mobx.autorun(() => {
        this.volumnText.setText(`${score.volume}`)  
        this.musicText.setText(`${score.music}`)  
        this.controllerText.setText(`${score.controller}`)  
    })
}