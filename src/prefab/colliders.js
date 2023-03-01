import values from './constants.js';
import Sounds from './Sounds.js';


let sounds;
function colliders(parent, _player, _staticGroup, _playerBulletsGroup) {

    sounds = new Sounds(parent.sound)
    parent.physics.world.setBounds(0, 0, values.levelScreen.x, values.levelScreen.y);


    if (_player) {
        _player.body.onWorldBounds = true;
        _player.setCollideWorldBounds(true).setBounce(0)
        if (_staticGroup) {
            parent.physics.add.collider(_player, _staticGroup);
        }
    }



    if (_staticGroup && _playerBulletsGroup) {
        parent.physics.add.collider(_playerBulletsGroup, _staticGroup, (b) => {
            sounds.getBlastSound('blast')
            _playerBulletsGroup.remove(b, true, true)
        });

    }

 
}
export default colliders;