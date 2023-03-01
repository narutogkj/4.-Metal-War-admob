const initializer = {
   Extends: Phaser.Scene,
   initialize:function boot (){
      Phaser.Scene.call(this, { key: 'boot', active: true });
   },
   preload: function preload() {  
      this.load.image('logo', '../../assets/logo.png');
   },
   create: function(){
      this.scene.start('preloadScene')
   }
}

var boot = new Phaser.Class(initializer);
export default boot;