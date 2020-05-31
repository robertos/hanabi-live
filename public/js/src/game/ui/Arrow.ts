// Imports
import Konva from 'konva';

// These are arrows used to show which cards that are touched by a clue
// (and for pointing to various things in a shared replay)
export default class Arrow {
  view: Konva.Group;
  pointingTo: any;
  private tween: Konva.Tween | null;

  private base: Konva.Arrow;
  private circle: Konva.Circle;
  private text: Konva.Text;

  constructor(winW: number, winH: number) {
    const x = 0.1 * winW;
    const y = 0.1 * winH;
    this.view = new Konva.Group({
      x,
      y,
      offset: {
        x,
        y,
      },
      visible: false,
    });

    // Class variables
    // (we can't initialize these above due to "super()" not being on the first line)
    this.pointingTo = null;
    this.tween = null;

    const pointerLength = 0.006 * winW;

    // We want there to be a black outline around the arrow,
    // so we draw a second arrow that is slightly bigger than the first
    const border = new Konva.Arrow({
      points: [
        x,
        0,
        x,
        y * 0.8,
      ],
      pointerLength,
      pointerWidth: pointerLength,
      fill: 'black',
      stroke: 'black',
      strokeWidth: pointerLength * 2,
      shadowBlur: pointerLength * 4,
      shadowOpacity: 1,
    });
    this.view.add(border);

    // The border arrow will be missing a bottom edge,
    // so draw that manually at the bottom of the arrow
    const edge = new Konva.Line({
      points: [
        x - pointerLength,
        0,
        x + pointerLength,
        0,
      ],
      fill: 'black',
      stroke: 'black',
      strokeWidth: pointerLength * 0.75,
    });
    this.view.add(edge);

    // The main (inside) arrow is exported so that we can change the color later
    this.base = new Konva.Arrow({
      points: [
        x,
        0,
        x,
        y * 0.8,
      ],
      pointerLength,
      pointerWidth: pointerLength,
      fill: 'white',
      stroke: 'white',
      strokeWidth: pointerLength * 1.25,
    });
    this.view.add(this.base);

    // A circle will appear on the body of the arrow to indicate the type of clue given
    this.circle = new Konva.Circle({
      x,
      y: y * 0.3,
      radius: pointerLength * 2.25,
      fill: 'black',
      stroke: 'white',
      strokeWidth: pointerLength * 0.25,
      visible: false,
      listening: false,
    });
    this.view.add(this.circle);

    // The circle will have text inside of it to indicate the number of the clue given
    this.text = new Konva.Text({
      x,
      y: y * 0.3,
      offset: {
        x: this.circle.width() / 2,
        y: this.circle.height() / 2,
      },
      width: this.circle.width(),
      // For some reason the text is offset if we place it exactly in the middle of the
      // circle, so nudge it downwards
      height: this.circle.height() * 1.09,
      fontSize: y * 0.38,
      fontFamily: 'Verdana',
      fill: 'white',
      align: 'center',
      verticalAlign: 'middle',
      visible: false,
      listening: false,
    });
    this.view.add(this.text);
  }

  // Pos is a point with x and y properties
  animateTo(pos : any) {
    this.tween = new Konva.Tween({
      node: this,
      duration: 0.5,
      x: pos.x,
      y: pos.y,
      easing: Konva.Easings.EaseOut,
    }).play();
  }

  get baseColor(): string {
    return this.base.fill();
  }

  set baseColor(color: string) {
    this.base.fill(color);
    this.base.stroke(color);
  }

  setVisible(isVisible: boolean) {
    this.view.visible(isVisible);
  }

  setRotation(rot: number) {
    this.view.rotation(rot);

    // We want the text to always be right-side up (e.g. have a rotation of 0)
    this.text.rotation(360 - rot);
  }

  hideCircle() {
    this.circle.hide();
    this.text.hide();
  }

  moveToTop() {
    this.view.moveToTop();
  }

  show() {
    this.view.show();
  }

  setText(text: string) {
    this.text.text(text);
  }

  showText() {
    this.text.show();
  }

  setCircleFill(color: string) {
    this.circle.fill(color);
  }

  setCircleStroke(color: string) {
    this.circle.stroke(color);
  }

  setAbsolutePosition(pos: any) {
    this.view.setAbsolutePosition(pos);
  }

  hide() {
    this.view.hide();
  }

  hideText() {
    this.text.hide();
  }

  showCircle() {
    this.circle.show();
  }

  stopAnimation() {
    if (this.tween) {
      this.tween!.destroy();
    }
  }
}
