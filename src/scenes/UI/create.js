import { inputs } from '../../prefab/input.js';
import values from '../../prefab/constants.js';
import emitter from '../../prefab/EventsCenter.js';
import { score } from '../../prefab/mobxCenter.js';

export default function create() {

   // Health Bar -------------------------------------------------------------------------------------
    if (helthBar) {
        helthBar.clear()
    }
        
    this.add.image(values.arrowsC.x-15,values.barintialheight + 220,"heartIcon").setOrigin(0)
    var helthBar = this.add.graphics();
    var healthBox = this.add.graphics();
    healthBox.fillStyle(0x222222, 0.4);
    healthBox.fillRoundedRect(values.arrowsC.x-10, values.barintialheight-10, 30, 220, 5);
    helthBar.fillStyle(0xFF0000, 0.8);
    helthBar.fillRoundedRect(values.arrowsC.x-6, values.barintialheight, 22, values.barintialheight2, 5);

    emitter.on('powerDown', () => {
        values.playerHealth -= 1;
        helthBar.clear();
        helthBar.fillStyle(0xFF0000, 0.8);
        values.barintialheight = values.barintialheight + 20 
        values.barintialheight2 = values.barintialheight2 -20
        helthBar.fillRoundedRect(values.arrowsC.x-6, values.barintialheight, 20,  values.barintialheight2, 5);
    })

    emitter.on('powerUp', () => {
        if(values.playerHealth < 10){
            console.log("prev"+values.playerHealth)
            values.playerHealth += 1;
            console.log("after"+values.playerHealth)
            helthBar.clear();
            helthBar.fillStyle(0xFF0000, 0.8);
            values.barintialheight = values.barintialheight - 20 
            values.barintialheight2 = values.barintialheight2 + 20
            helthBar.fillRoundedRect(values.arrowsC.x-6, values.barintialheight, 20,  values.barintialheight2, 5);
        }
    })
   //---------------------------------------------------------------------------------------------------



    
    // Game Keypads --------------------------------------------------------------------------------------
    var inputBoxShadow = this.add.graphics();
    inputBoxShadow.fillStyle(0x222222, 0.3);
    inputBoxShadow.fillRoundedRect(5, values.upArrow.y - 25, values.levelScreen.x - 10, 150, 5)

   
    if(score.controller < 2){
        this.upArrow = this.add.sprite(values.upArrow.x, values.upArrow.y, "upArrow").setInteractive()
        this.leftArrow = this.add.sprite(values.leftArrow.x, values.leftArrow.y, "leftArrow").setInteractive()
        this.rightArrow = this.add.sprite(values.rightArrow.x, values.rightArrow.y, "rightArrow").setInteractive()
        this.downArrow = this.add.sprite(values.downArrow.x, values.downArrow.y, "downArrow").setInteractive()
        this.centerArrow = this.add.sprite(values.centerArrows.x, values.centerArrows.y, "centerArrow").setInteractive()
        this.arrows = this.add.sprite(values.leftArrow.x-27, values.upArrow.y-25, "arrows").setOrigin(0,0)    
    }else{
        this.upArrow = this.add.sprite(values.upArrow.x2, values.upArrow.y, "upArrow").setInteractive()
        this.leftArrow = this.add.sprite(values.leftArrow.x2, values.leftArrow.y, "leftArrow").setInteractive()
        this.rightArrow = this.add.sprite(values.rightArrow.x2, values.rightArrow.y, "rightArrow").setInteractive()
        this.downArrow = this.add.sprite(values.downArrow.x2, values.downArrow.y, "downArrow").setInteractive()
        this.centerArrow = this.add.sprite(values.centerArrows.x2, values.centerArrows.y, "centerArrow").setInteractive()
        this.arrowB = this.add.sprite(values.arrowB.x, values.arrowB.y, "arrowB").setInteractive().setScale(0.75,0.75)
        this.arrowA = this.add.sprite(values.arrowA.x, values.arrowA.y, "arrowA").setInteractive().setScale(0.75,0.75)    
        this.arrows = this.add.sprite(values.leftArrow.x2-27, values.upArrow.y-25, "arrows").setOrigin(0,0)      
    }
    
   
   
   
   
   
    //-----------------------------------------------------------------------------------------------------



    //Audio----------------------------------------------------------------------------------------------
   
    //---------------------------------------------------------------------------------------------------


   
   // Score Board UI-------------------------------------------------------------------------------------
    var scoreBox = this.add.graphics();
    scoreBox.fillStyle(0x222222, 0.4);
    scoreBox.fillRoundedRect(5, 15, 50, 40, 7)
    this.add.image(30, 35, 'pointsIcon')
    this.scorePoint = this.make.text({
        x: 55,
        y: 22,
        text: '00',
        style: {
            font: '25px monospace',
            fill: '#fff', 
            stroke: '#ff0000',
            strokeThickness: 2
        }
    });


    var timeBox = this.add.graphics();
    timeBox.fillStyle(0x222222, 0.4);
    timeBox.fillRoundedRect((values.levelScreen.x-100)/2, 15, 50, 40, 5)
    this.add.image((values.levelScreen.x-48)/2, 35, 'timeIcon')
    this.timeText = this.add.text((values.levelScreen.x-10)/2, 22, score.timeCount, { font: "24px monospace", fill: '#fff', stroke: '#ff0000', strokeThickness: 2 }); //Elapsed Time Text


 

    var enemyBox = this.add.graphics();
    enemyBox.fillStyle(0x222222, 0.4);
    enemyBox.fillRoundedRect(values.levelScreen.x - 58, 15, 55, 40, 5)
    this.add.image(values.levelScreen.x - 30, 35, 'enemyIcon')
    this.enemyCount = this.make.text({
        x: values.levelScreen.x - 80,
        y: 22,
        text: '00',
        style: {
            font: '25px monospace',
            fill: '#fff', 
            stroke: '#ff0000',
            strokeThickness: 2
        }
    });
    //------------------------------------------------------------------------------------------------



    mobx.autorun(() => {
        if(this.enemyCount.active){
            if(score.enemyCount < 10){
                this.enemyCount.setText(`0${score.enemyCount}`)
            }else{
                this.enemyCount.setText(`${score.enemyCount}`)
            } 
        }
        if(this.scorePoint.active){
            this.scorePoint.setText(`${Math.round(score.points)}`) 
        }
    })
    inputs(this);
}