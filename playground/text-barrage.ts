/**
 * @title Text Barrage
 * @category 2D
 */
import {
  Camera,
  Color,
  Engine,
  Entity,
  Font,
  Script,
  TextHorizontalAlignment,
  TextRenderer,
  WebGLEngine
} from "oasis-engine";

const Colors = [new Color(1, 1, 1, 1), new Color(1, 0, 0, 1), new Color(0, 1, 0.89, 1)];
const ColorLastIndex = Colors.length - 1;

const Words = [
  "Oasis",
  "oasis",
  "Hello",
  "hello",
  "world",
  "World",
  "text",
  "Text",
  "ABCabc",
  "abcDEF",
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

class TextEntityPool {
  private _engine: Engine = null;
  private _elements: Entity[] = [];

  constructor(engine: Engine, count: number) {
    this._engine = engine;
    const elements = this._elements;
    for (let i = 0; i < count; ++i) {
      const entity = new Entity(engine);
      elements[i] = entity;
      entity.addComponent(TextRenderer);
      entity.addComponent(TextBarrageAnimation);
    }
  }

  get(): Entity {
    if (this._elements.length > 0) {
      return this._elements.pop();
    }
    const entity = new Entity(this._engine);
    entity.addComponent(TextRenderer);
    entity.addComponent(TextBarrageAnimation);
    return entity;
  }

  put(entity: Entity): void {
    this._elements.push(entity);
  }
}

class TextBarrageAnimation extends Script {
  public speed: number = 0;
  public range: number = 0;
  private _isPlayging: boolean = false;
  private _cb: Function = null;

  onUpdate(dt: number): void {
    if (this._isPlayging) {
      const { position } = this.entity.transform;
      const curPosX = position.x;
      const targetPosX = curPosX + this.speed * dt;
      position.x = targetPosX;
      if (targetPosX < this.range) {
        this.stop();
        this._cb && this._cb();
      }
    }
  }

  play() {
    this._isPlayging = true;
    return new Promise((resolve) => {
      this._cb = resolve;
    });
  }

  stop() {
    this._isPlayging = false;
  }
}

class TextManager extends Script {
  public halfWidth: number = 0;
  public halfHeight: number = 0;
  public cd: number = 5;
  public curTime: number = 5;

  private _textCount: number = 0;
  private _textEntityPool: TextEntityPool = null;

  onAwake(): void {
    this._textEntityPool = new TextEntityPool(this.engine, 200);
  }

  onUpdate(deltaTime: number): void {
    if (this.curTime < this.cd) {
      this.curTime++;
      return;
    }
    this.curTime = 0;
    this._textCount++;
    const { halfWidth } = this;
    const entity = this._textEntityPool.get();
    entity.parent = this.entity;
    entity.isActive = true;
    const { position } = entity.transform;

    const textRenderer = entity.getComponent(TextRenderer);
    textRenderer.text = `${Words[this._getRandomNum(0, WordLastIndex)]} ${
      Words[this._getRandomNum(0, WordLastIndex)]
    } ${this._getRandomNum(0, 99)}`;
    textRenderer.color = Colors[this._getRandomNum(0, ColorLastIndex)];
    textRenderer.font = Font.createFromOS(entity.engine, "Arial");
    textRenderer.fontSize = 36;
    textRenderer.priority = this._textCount;
    textRenderer.horizontalAlignment = TextHorizontalAlignment.Right;
    const bounds = textRenderer.bounds;
    const textWidth = bounds.max.x - bounds.min.x;
    position.x = halfWidth + textWidth;
    const limitHeight = halfHeight * 100;
    position.y = this._getRandomNum(-limitHeight, limitHeight) * 0.01;

    const textScript = entity.getComponent(TextBarrageAnimation);
    textScript.speed = -0.003 + this._getRandomNum(-200, 100) * 0.00001;
    textScript.range = -halfWidth;
    textScript.play().then(() => {
      entity.parent = null;
      entity.isActive = false;
      this._textEntityPool.put(entity);
    });
  }

  private _getRandomNum(min: number, max: number): number {
    const range = max - min;
    const rand = Math.random();
    return min + Math.round(rand * range);
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

const textManager = rootEntity.addComponent(TextManager);
const halfHeight = camera.orthographicSize;
textManager.halfWidth = halfHeight * camera.aspectRatio;
textManager.halfHeight = halfHeight;
