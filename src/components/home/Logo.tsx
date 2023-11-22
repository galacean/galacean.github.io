import { AmbientLight, AssetType, BackgroundMode, BlendFactor, Camera, Color, CullMode, DirectLight, Engine, GLTFResource, Material, RenderQueueType, Script, Shader, Sprite, SpriteRenderer, Texture2D, Vector2, Vector3, WebGLEngine } from "@galacean/engine";
import React, { useEffect } from "react";

export default function Logo() {
  useEffect(() => {
    const engine = init();

    return () => {
      engine.destroy();
    };
  }, []);

  return <canvas id="canvas-logo" style={{ width: "512px", height: "128px" }} />;
}

function addCustomMaterial(engine: Engine, texture: Texture2D): Material {
  const material = new Material(engine, Shader.find("GalaceanLogoShader"));

  // Init state.
  // const renderState = material.renderState;
  // const target = renderState.blendState.targetBlendState;
  // target.enabled = true;
  // target.sourceColorBlendFactor = BlendFactor.SourceAlpha;
  // target.destinationColorBlendFactor = BlendFactor.OneMinusSourceAlpha;
  // target.sourceAlphaBlendFactor = BlendFactor.One;
  // target.destinationAlphaBlendFactor = BlendFactor.OneMinusSourceAlpha;
  // renderState.depthState.writeEnabled = false;
  // renderState.rasterState.cullMode = CullMode.Off;
  // material.renderQueueType = RenderQueueType.Transparent;

  // Set material shader data.
  const { shaderData } = material;
  shaderData.setVector2('u_resolution', new Vector2(512, 128));
  shaderData.setFloat('u_time', 0);
  shaderData.setTexture('u_colorTexture', texture);

  return material;
}

class AnimateScript extends Script {
  guiData: any;
  time: number = 0;
  material: Material;

  /**
   * The main loop, called frame by frame.
   * @param deltaTime - The deltaTime when the script update.
   */
  onUpdate(deltaTime: number): void {
    // Update material data.
    this.time += 0.05;
    this.material.shaderData.setFloat("u_time", this.time);
  }
}

function init(): WebGLEngine {
  // -- create engine object
  const engine = new WebGLEngine("canvas-logo", { alpha: true, antialias: true });
  engine.canvas.resizeByClientSize();
  const scene = engine.sceneManager.activeScene;
  const { background } = scene;
  background.mode = BackgroundMode.SolidColor;
  background.solidColor.set(1, 1, 1, 0);

  // Create root entity.
  const rootEntity = engine.sceneManager.activeScene.createRootEntity();

  // Create camera.
  const cameraEntity = rootEntity.createChild("Camera");
  cameraEntity.transform.setPosition(0, 0, 3.2);
  cameraEntity.addComponent(Camera);

  engine.resourceManager
    .load([
      {
        // Sprite texture
        url: "https://mdn.alipayobjects.com/huamei_2uqjce/afts/img/A*WTAQQquXdNIAAAAAAAAAAAAADsF_AQ/fmt.webp",
        type: AssetType.Texture2D
      },
      {
        // Sprite texture
        url: "https://mdn.alipayobjects.com/huamei_2uqjce/afts/img/A*mpf6R7Rm5-UAAAAAAAAAAAAADsF_AQ/fmt.webp",
        type: AssetType.Texture2D
      }
    ])
    .then((textures: Texture2D[]) => {
      // Create origin sprite entity.
      const spriteEntity = rootEntity.createChild("LogoSprite");
      const material = addCustomMaterial(engine, textures[1]);
      const renderer = spriteEntity.addComponent(SpriteRenderer);
      renderer.setMaterial(material);

      renderer.sprite = new Sprite(engine, textures[0]);

      // Add animate script.
      const script = spriteEntity.addComponent(AnimateScript);
      // Add custom material.
      script.material = material;

      // Add dissolve animate script.
      // const script = spriteEntity.addComponent(AnimateScript);
      // Add custom material.
      // script.material = material;
    });

  engine.run();

  // Custom shader
  const spriteVertShader = `
precision highp float;

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
precision mediump float;
precision mediump int;

uniform sampler2D u_spriteTexture;
uniform sampler2D u_colorTexture;
uniform vec2 u_resolution;
uniform float u_time;

varying vec2 v_uv;
varying vec4 v_color;

float random (in float x) {
  return fract(sin(x)*1e4);
}

float random (in vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);
}

float pattern(vec2 st, vec2 v, float t) {
  vec2 p = floor(st+v);
  return step(t, random(100.+p*.000001)+random(p.x)*0.5);
}

vec4 lerp(vec4 a, vec4 b, float w) {
  return a + w * (b - a);
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  st.x *= u_resolution.x / u_resolution.y;

  vec2 grid = vec2(20.0, 20.);
  st *= grid;

  vec2 ipos = floor(st);  // integer
  vec2 fpos = fract(st);  // fraction

  vec2 vel = vec2(u_time * 2. * max(grid.x, grid.y)); // time
  vel *= vec2(0., 1.) * random(1.0 + ipos.x); // direction

  // Assign a random value base on the integer coord
  vec2 offset = vec2(0.1, 0.);

  vec4 color = texture2D(u_spriteTexture, v_uv);

  // Margins
  float margin = step(0.2, fpos.y);
  float c = pattern(st, vel, 0.5);

  color.r = (1.0 - color.r) * c;
  color.g = (1.0 - color.g) * c;
  color.b = (1.0 - color.b) * c;


  gl_FragColor = vec4(1.0 - color.x, 1.0 - color.y, 1.0 - color.z, 1.0);
}
`;

  Shader.create("GalaceanLogoShader", spriteVertShader, spriteFragmentShader);

  return engine;
}
