import create from "./create.js";
import update from "./update.js";

const initializer = {
    Extends: Phaser.Scene,
    initialize: function OptionScene() {
        Phaser.Scene.call(this, { key: 'OptionScene', active: false });
    },
    create: create,
    update: update,
}

var OptionScene = new Phaser.Class(initializer);
export default OptionScene