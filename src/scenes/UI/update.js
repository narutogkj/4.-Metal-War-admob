import { score } from '../../prefab/mobxCenter.js';

export default function update() {
    score.timeCount -= 0.01;
    if (score.timeCount > 0)
      this.timeText.setText(Math.round(score.timeCount));
    
}