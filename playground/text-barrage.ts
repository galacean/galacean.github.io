/**
 * @title Text Barrage
 * @category 2D
 */
import { Camera, Color, Font, Script, TextHorizontalAlignment, TextRenderer, WebGLEngine } from "oasis-engine";

const Colors = [new Color(1, 1, 1, 1), new Color(1, 0, 0, 1), new Color(0, 1, 0.89, 1)];
const ColorLastIndex = Colors.length - 1;

const Words = [
  "OASIS",
  "oasis",
  "HELLO",
  "hello",
  "WORLD",
  "world",
  "TEXT",
  "text",
  "PEACE",
  "peace",
  "LOVE",
  "love",
  "abcdefg",
  "hijklmn",
  "opqrst",
  "uvwxyz",
  "ABCDEFG",
  "HIJKLMN",
  "OPQRST",
  "UVWXYZ",
  "~!@#$",
  "%^&*",
  "()_+"
];
const WordLastIndex = Words.length - 1;

function getRandomNum(min: number, max: number): number {
  const range = max - min;
  const rand = Math.random();
  return min + Math.round(rand * range);
}

class TextBarrageAnimation extends Script {
  public halfWidth: number = 0;
  public halfHeight: number = 0;
  public textCount: number = 0;
  public speed: number = 0;
  public range: number = 0;
  public delayFrame: number = 0;
  private _curFrame: number = 0;
  private _isPlayging: boolean = false;
  private _textRenderer: TextRenderer = null;

  onStart(): void {
    this._textRenderer = this.entity.getComponent(TextRenderer);
    this.reset();
  }

  onUpdate(dt: number): void {
    if (this._isPlayging) {
      const { position } = this.entity.transform;
      const curPosX = position.x;
      const targetPosX = curPosX + this.speed * dt;
      position.x = targetPosX;
      if (targetPosX < this.range) {
        this.reset();
      }
    } else {
      this._curFrame++;
      if (this._curFrame >= this.delayFrame) {
        this.play();
      }
    }
  }

  play() {
    this._isPlayging = true;
  }

  reset() {
    const { entity } = this;
    const { position } = entity.transform;
    const textRenderer = this._textRenderer;
    // Reset priority for renderer.
    textRenderer.priority += this.textCount;
    // Reset the text to render.
    textRenderer.text = `${Words[getRandomNum(0, WordLastIndex)]} ${
      Words[getRandomNum(0, WordLastIndex)]
    } ${getRandomNum(0, 99)}`;
    // Reset position.
    const bounds = textRenderer.bounds;
    const textWidth = bounds.max.x - bounds.min.x;
    position.x = this.halfWidth + textWidth;
    const limitHeight = this.halfHeight * 100;
    position.y = getRandomNum(-limitHeight, limitHeight) * 0.01;
    // Reset speed.
    this.speed = -0.003 + getRandomNum(-200, 100) * 0.00001;
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

// Create text barrage.
const halfHeight = camera.orthographicSize;
const halfWidth = halfHeight * camera.aspectRatio;
const textCount = 50;
for (let i = 0; i < textCount; ++i) {
  const textEntity = rootEntity.createChild();
  // Init text renderer.
  const textRenderer = textEntity.addComponent(TextRenderer);
  textRenderer.color = Colors[getRandomNum(0, ColorLastIndex)];
  textRenderer.font = Font.createFromOS(engine, "Arial");
  textRenderer.fontSize = 36;
  textRenderer.priority = i;
  textRenderer.horizontalAlignment = TextHorizontalAlignment.Right;
  // Init and reset text barrage animation.
  const barrage = textEntity.addComponent(TextBarrageAnimation);
  barrage.halfWidth = halfWidth;
  barrage.halfHeight = halfHeight;
  barrage.textCount = textCount;
  barrage.range = -halfWidth;
  barrage.delayFrame = i * 5;
}
