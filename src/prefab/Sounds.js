import values from "./constants.js";
import { score } from "./mobxCenter.js";

export default class Sounds {
    parent;
    level = 1;
    introAudio;
    backgroundMusic;
    fireSound;
    blast;


    constructor (_parent){
        this.parent = _parent;
    }
    
    getIntroAudio = function (introAudio){
        this.introAudio =  this.parent.add(introAudio, { volume: score.music/10, loop: true })
        return this.introAudio.play();
    }

    stopIntroAudio = function (){
        this.introAudio.stop();
    }

    getBackgroundMusic = function (backgroundMusic){
        this.backgroundMusic = this.parent.add(backgroundMusic, {volume: score.music/10,loop: true})
        return this.backgroundMusic.play();
    }

    getFireSound = function (fire) {
        this.fireSound = this.parent.add(fire, {volume: score.volume/10, loop: false})
        return this.fireSound.play();
    }
   

    getBlastSound = function (blast) {
        this.blast = this.parent.add(blast, {volume: score.volume/10, loop: false})
        return this.blast.play();
    }
    
  

}