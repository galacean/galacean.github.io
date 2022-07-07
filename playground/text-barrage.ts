/**
 * @title Text Barrage
 * @category 2D
 */

import { Camera, Entity, Font, FontStyle, Script, TextRenderer, Vector3, WebGLEngine } from "oasis-engine";

class TextBarrageAnimation extends Script {
  static range: number = 0;
  
  public isFromLeft: boolean = true;
  private _isPlayging: boolean = false;
  private _speed: number = 0.003;

  onUpdate(dt: number): void {
    if (this._isPlayging) {
      const { _speed } = this;
      const curPosX = this.entity.transform.position.x;
      const diff = this.isFromLeft ? _speed : -_speed;
      const targetPosX = curPosX + diff * dt;
      this.entity.transform.setPosition(targetPosX, 0, 0);
      if (Math.abs(targetPosX) > TextBarrageAnimation.range) {
        this.stop();
      }
    }
  }

  play() {
    this._isPlayging = true;
    const { range } = TextBarrageAnimation;
    this.entity.transform.setPosition(this.isFromLeft ? -range : range, 0, 0);
  }

  stop() {
    this._isPlayging = false;
  }
}

// Create engine object
const engine = new WebGLEngine("canvas");
engine.canvas.resizeByClientSize();
engine.run();

const scene = engine.sceneManager.activeScene;
const rootEntity = scene.createRootEntity();

// Create camera
const cameraEntity = rootEntity.createChild("camera_entity");
cameraEntity.transform.setPosition(0, 0, 10);
const camera = cameraEntity.addComponent(Camera);
camera.isOrthographic = true;
TextBarrageAnimation.range = camera.orthographicSize * camera.aspectRatio;

//
const textEntity = createText();
const textScript = textEntity.addComponent(TextBarrageAnimation);
textScript.play();

/**
 * Create text to display by params.
 * @param fontFamily - The font family
 * @param fontSize - The size of font
 * @param bold - The text whether bold
 * @param italic - The text whether italic
 */
function createText(
  fontFamily: string = "Arial",
  fontSize: number = 36,
  bold: boolean = false,
  italic: boolean = false
): Entity {
  // Create text entity
  const entity = rootEntity.createChild("text");
  entity.transform.position = new Vector3();
  // Add text renderer for text entity
  const renderer = entity.addComponent(TextRenderer);
  // // Set text color
  // renderer.color = color;
  // Set text to render
  renderer.text = "Hello World";
  // Set font with font family
  renderer.font = Font.createFromOS(entity.engine, fontFamily);
  // Set font size
  renderer.fontSize = fontSize;
  // Set font whether bold
  bold && (renderer.fontStyle |= FontStyle.Bold);
  // Set font whether italic
  italic && (renderer.fontStyle |= FontStyle.Italic);
  return entity;
}
