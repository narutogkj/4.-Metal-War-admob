
class ScoreState {
    enemyCount = 0
    currentLevel = 0;
    points = 0;
    timeCount = 20;
    controller =  localStorage.getItem("controller")? parseInt(localStorage.getItem("controller")) :1;
    volume = localStorage.getItem("volume")? parseInt(localStorage.getItem("volume")) : 5;
    music = localStorage.getItem("music") ? parseInt(localStorage.getItem("music")): 5;
    highScore = localStorage.getItem("highScore") ? parseInt(localStorage.getItem("highScore")) : 0;
    constructor() {
        mobx.makeAutoObservable(this)
    }
}

export const score = new ScoreState()