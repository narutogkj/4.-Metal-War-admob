import { score } from "./mobxCenter.js";

var screenWidth = innerWidth>innerHeight?400:innerWidth;
var screenHeight = innerHeight;

const values = {
    barintialheight : 230,
    barintialheight2 : 200,
    currentLevel: 1,
    playerHealth: 10,
    speed: 160,
    bulletSpeed: 320,
    gameSize: {
        x: screenWidth,
        y: screenHeight 
    },
    upArrow: {
        x: screenWidth/2,
        x2:90,                       
        y: screenHeight - 210
    },
    leftArrow: {
        x: (screenWidth/2)-50, 
        x2:40,                   
        y: screenHeight - 160
    },
    rightArrow: {
        x: (screenWidth/2)+50,  
        x2:140,                        
        y: screenHeight - 160
    },
    centerArrows: {
        x: screenWidth/2,
        x2:90,             
        y: screenHeight - 160
    },
    downArrow: {
        x: screenWidth/2, 
        x2:90,         
        y: screenHeight - 120
    },

    arrowA: {
        x: screenWidth - 100,
        y: screenHeight - 200
    },
    arrowB: {
        x: screenWidth - 60,
        y: screenHeight - 140
    },
    arrowsC: {
        x: screenWidth - 35,
        y: screenHeight - 150
    },
    arrowsX: {
        x: screenWidth - 70,
        y: screenHeight - 100
    },
    levelScreen: {
        x: screenWidth,
        y: 2.3 * screenHeight / 3
    },
    music: 0.4,
    vibration: true,
    controller: 2
}


export default values;