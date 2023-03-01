import create from "./create.js";
import update from "./update.js";


const initializer = {
   Extends: Phaser.Scene,
   initialize:function UIScene (){
      Phaser.Scene.call(this, { key: 'UIScene', active: false });
   },
   create: create,
   update: update,
}

var uiscene = new Phaser.Class(initializer);
export default uiscene;