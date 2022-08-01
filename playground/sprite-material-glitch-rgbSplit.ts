/**
 * @title Sprite Material Glitch
 * @category 2D
 */

import { OrbitControl } from "@oasis-engine-toolkit/controls";
import * as dat from "dat.gui";
import {
  AssetType,
  BlendFactor,
  Camera,
  CullMode,
  Engine,
  Material,
  RenderQueueType,
  Script,
  Shader,
  Sprite,
  SpriteRenderer,
  Texture2D,
  WebGLEngine
} from "oasis-engine";

init();

function init(): void {
  // Create engine.
  const engine = new WebGLEngine("canvas");
  engine.canvas.resizeByClientSize();

  // Create root entity.
  const rootEntity = engine.sceneManager.activeScene.createRootEntity();

  // Create camera.
  const cameraEntity = rootEntity.createChild("Camera");
  cameraEntity.transform.setPosition(0, 0, 12);
  cameraEntity.addComponent(Camera);
  cameraEntity.addComponent(OrbitControl);

  engine.resourceManager
    .load({
      // Sprite texture
      url: "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*5wypQ5JyDLkAAAAAAAAAAAAAARQnAQ",
      type: AssetType.Texture2D
    })
    .then((texture: Texture2D) => {
      // Create origin sprite entity.
      const spriteEntity = rootEntity.createChild("GlitchSprite");
      const material = addCustomMaterial(engine);
      const renderer = spriteEntity.addComponent(SpriteRenderer);
      renderer.sprite = new Sprite(engine, texture);
      renderer.setMaterial(material);

      // Add glitch animate script.
      const script = spriteEntity.addComponent(AnimateScript);
      // Add custom material.
      script.material = material;
      // Init time.
      script.time = 0.0;

      // Add Data UI.
      addDataGUI(script.material, script);
    });

  engine.run();
}

function addCustomMaterial(engine: Engine): Material {
  const material = new Material(engine, Shader.find("SpriteGlitchRGBSplit"));

  // Init state.
  const renderState = material.renderState;
  const target = renderState.blendState.targetBlendState;
  target.enabled = true;
  target.sourceColorBlendFactor = BlendFactor.SourceAlpha;
  target.destinationColorBlendFactor = BlendFactor.OneMinusSourceAlpha;
  target.sourceAlphaBlendFactor = BlendFactor.One;
  target.destinationAlphaBlendFactor = BlendFactor.OneMinusSourceAlpha;
  renderState.depthState.writeEnabled = false;
  renderState.rasterState.cullMode = CullMode.Off;
  material.renderQueueType = RenderQueueType.Transparent;

  // Set material shader data.
  const { shaderData } = material;
  shaderData.setFloat("u_time", 0.0);
  shaderData.setFloat("u_indensity", 0.5);

  return material;
}

/**
 * Add data GUI.
 */
function addDataGUI(material: Material, animationScript: AnimateScript) {
  const { shaderData } = material;
  const gui = new dat.GUI();
  const guiData = {
    indensity: 0.5,
    reset: () => {
      guiData.indensity = 0.5;
      shaderData.setFloat("u_indensity", 0.5);
      shaderData.setFloat("u_time", 0.0);
      animationScript.time = 0;
    }
  };

  gui
    .add(guiData, "indensity", 0.0, 1.0, 0.01)
    .onChange((value: number) => {
      shaderData.setFloat("u_indensity", value);
      shaderData.setFloat("u_time", 0.0);
      animationScript.time = 0;
    })
    .listen();

  gui.add(guiData, "reset").name("重置");
  return guiData;
}

class AnimateScript extends Script {
  material: Material;
  time: number = 0;

  /**
   * The main loop, called frame by frame.
   * @param deltaTime - The deltaTime when the script update.
   */
  onUpdate(deltaTime: number): void {
    this.time += deltaTime * 0.1;
    this.time = this.time % 1;
    // Update material data.
    this.material.shaderData.setFloat("u_time", this.time);
  }
}

// Custom shader
const spriteVertShader = `
  uniform mat4 u_VPMat;

  attribute vec3 POSITION;
  attribute vec2 TEXCOORD_0;
  attribute vec4 COLOR_0;

  varying vec4 v_color;
  varying vec2 v_uv;

  void main()
  {
    gl_Position = u_VPMat * vec4(POSITION, 1.0);
    v_color = COLOR_0;
    v_uv = TEXCOORD_0;
  }
`;

const spriteFragmentShader = `
  uniform sampler2D u_spriteTexture;
  uniform float u_time;
  uniform float u_indensity;

  varying vec2 v_uv;
  varying vec4 v_color;

  float randomNoise(float time) {
    return fract(sin(dot(vec2(time, 2), vec2(12.9898, 78.233))));
  }

  void main() {
    float splitAmount = u_indensity * randomNoise(u_time);

    vec4 normalColor = texture2D(u_spriteTexture, v_uv);
    float r = texture2D(u_spriteTexture, vec2(v_uv.x + splitAmount, v_uv.y)).r;
    float b = texture2D(u_spriteTexture, vec2(v_uv.x - splitAmount, v_uv.y)).b;
    gl_FragColor = vec4(r, normalColor.g, b, normalColor.a) * v_color;
  }
`;

Shader.create("SpriteGlitchRGBSplit", spriteVertShader, spriteFragmentShader);
