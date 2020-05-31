// Imports
import Konva from 'konva';

export default class Shuttle extends Konva.Rect {
  tween: Konva.Tween | null = null;

  animateTo(x: number, y: number, scale: number) {
    this.tween = new Konva.Tween({
      x,
      y,
      scaleX: scale,
      scaleY: scale,
      node: this,
      duration: 0.25,
      easing: Konva.Easings.EaseOut,
    }).play();
  }
}
