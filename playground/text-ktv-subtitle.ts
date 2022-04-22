/**
 * @title Text KTV Subtitle
 * @category 2D
 */

import {
  AssetType,
  BackgroundMode,
  BaseMaterial,
  BlendFactor,
  BlendOperation,
  Camera,
  Color,
  CullMode,
  Entity,
  Font,
  Material,
  RenderFace,
  RenderQueueType,
  Script,
  Shader,
  TextRenderer,
  Texture2D,
  WebGLEngine
} from "oasis-engine";

// Create engine object
const engine = new WebGLEngine("canvas");
engine.canvas.resizeByClientSize();
engine.run();

const scene = engine.sceneManager.activeScene;
const rootEntity = scene.createRootEntity();

// Create camera
const cameraEntity = rootEntity.createChild("camera_entity");
cameraEntity.transform.setPosition(0, 0, 10);
cameraEntity.addComponent(Camera);

async function init() {
  // Set background
  const bgTex = await engine.resourceManager.load<Texture2D>({
    url: "https://gw.alipayobjects.com/zos/OasisHub/440000879/4935/src%3Dhttp___n.sinaimg.cn_sinakd10114_760_w960h600_20210213_d2fe-kiweitw9266876.jpg%26refer%3Dhttp___n.sinaimg.webp",
    type: AssetType.Texture2D
  });
  const background = engine.sceneManager.activeScene.background;
  background.mode = BackgroundMode.Texture;
  background.texture = bgTex;

  // Create texts
  const text1Entity = createText("去吗？去啊！以最卑微的梦", -2, -2);
  const text2Entity = createText("战吗？战啊！以最孤高的梦", 0, -3);

  // Add KTV subtitle material and animate script
  const animateScript1 = addCustomMaterialAndAnimateScript(text1Entity, 5000);
  const animateScript2 = addCustomMaterialAndAnimateScript(text2Entity, 5000);

  // Play animation loop
  while (true) {
    await animateScript1.play();
    animateScript1.reset();
    await animateScript2.play();
    animateScript2.reset();
  }
}

function createText(text: string, posX: number, posY: number): Entity {
  // Create text entity
  const textEntity = rootEntity.createChild("text");
  rootEntity.addChild(textEntity);
  // Add text renderer for text entity
  const renderer = textEntity.addComponent(TextRenderer);
  // Set font size
  renderer.fontSize = 48;
  // Set font with font family
  renderer.font = Font.createFromOS(textEntity.engine);
  // Set text to display
  renderer.text = text;
  // Set position
  textEntity.transform.position.setValue(posX, posY, 0);
  return textEntity;
}

function addCustomMaterialAndAnimateScript(entity: Entity, time: number): AnimateScript {
  // Create material
  const material = new BaseMaterial(engine, Shader.find("TextKTVSubtitle"));
  entity.getComponent(TextRenderer).setMaterial(material);
  // Init state
  material.isTransparent = true;
  material.renderFace = RenderFace.Double;
  // Set uniform
  material.shaderData.setFloat("u_percent", 0);
  material.shaderData.setColor("u_subtitleColor", new Color(0, 1, 0.89, 1));

  // Add AnimateScript
  const script = entity.addComponent(AnimateScript);
  script.material = material;
  script.totalTime = time;
  return script;
}

// Custom shader
const vertShader = `
  precision highp float;

  uniform mat4 u_VPMat;
  uniform float u_worldPosX;

  attribute vec3 POSITION;
  attribute vec2 TEXCOORD_0;
  attribute vec4 COLOR_0;

  varying vec4 v_color;
  varying vec2 v_uv;
  varying float v_startX;
  varying float v_width;
  varying float v_posX;

  void main()
  {
    gl_Position = u_VPMat * vec4(POSITION, 1.0);
    v_uv = TEXCOORD_0;
    v_color = COLOR_0;
    float halfWidth = abs(u_worldPosX - POSITION.x);
    v_startX = u_worldPosX - halfWidth;
    v_width = halfWidth * 2.0;
    v_posX = POSITION.x;
  }
`;

const fragmentShader = `
  precision mediump float;
  precision mediump int;

  uniform sampler2D u_spriteTexture;
  uniform float u_percent;
  uniform vec4 u_subtitleColor;

  varying vec2 v_uv;
  varying vec4 v_color;
  varying float v_startX;
  varying float v_width;
  varying float v_posX;

  void main() {
    vec4 baseColor = texture2D(u_spriteTexture, v_uv);
    float percent = (v_posX - v_startX) / v_width;
    if (percent <= u_percent) {
      gl_FragColor = baseColor * u_subtitleColor;
    } else {
      gl_FragColor = baseColor * v_color;
    }
  }
`;

Shader.create("TextKTVSubtitle", vertShader, fragmentShader);

class AnimateScript extends Script {
  material: Material;
  totalTime: number = 0;

  private _curTime: number = 0;
  private _isPlaying: boolean = false;
  private _cb: Function = null;

  onUpdate(dt: number) {
    if (this._isPlaying) {
      this._curTime += dt;
      const { _curTime: curTime, totalTime } = this;
      const { shaderData } = this.material;
      shaderData.setFloat("u_percent", curTime / totalTime);
      shaderData.setFloat("u_worldPosX", this.entity.transform.worldPosition.x);
      if (curTime >= totalTime) {
        this._isPlaying = false;
        this._cb && this._cb();
      }
    }
  }

  play() {
    const { material } = this;
    if (!material) {
      return;
    }

    this._isPlaying = true;
    this._curTime = 0;
    return new Promise((resolve) => {
      this._cb = resolve;
    });
  }

  reset() {
    this._isPlaying = false;
    this.material.shaderData.setFloat("u_percent", 0);
  }
}

init();
