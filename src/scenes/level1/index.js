import create from "./create.js";
import update from "./update.js";

const initializer = {
    Extends: Phaser.Scene,
    initialize: function level1() {
        Phaser.Scene.call(this, { key: 'level1', active: false });
    },
    create: create,
    update: update,
}

var level1 = new Phaser.Class(initializer);
export default level1