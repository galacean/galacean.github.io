/**
 * @title Rotation
 * @category Texture
 */
import { OrbitControl } from "@oasis-engine-toolkit/controls";
import * as dat from "dat.gui";
import {
  BaseMaterial,
  Camera,
  Engine,
  MeshRenderer,
  PrimitiveMesh,
  RenderFace,
  Shader,
  Texture2D,
  Vector2,
  WebGLEngine
} from "oasis-engine";
const gui = new dat.GUI();

const fs = `#define PI 0.01745329251
uniform float rotation;
uniform vec2 rotationCenter;
uniform sampler2D baseTexture;

varying vec2 v_uv;

void main() {
  float rad = rotation * PI;
  mat2 rotateMatrix = mat2(cos(rad), -sin(rad), sin(rad), cos(rad));
	gl_FragColor = texture2D(baseTexture, rotateMatrix * (v_uv - rotationCenter) + rotationCenter);
}
`;

const vs = `attribute vec3 POSITION;
attribute vec2 TEXCOORD_0;
uniform mat4 u_MVPMat;
uniform float progress;

varying vec2 v_uv;
varying vec3 v_pos;

void main() {
  v_uv = TEXCOORD_0;
  vec4 position = vec4(POSITION , 1.0);
  gl_Position = u_MVPMat * position;
}`;

const TextureRotationMaterialShader = Shader.create('test', vs, fs);

class TextureRotationMaterial extends BaseMaterial {
  constructor(engine: Engine) {
    super(engine, TextureRotationMaterialShader);
    this.rotation = 0;
    this.rotationCenter = new Vector2(0.5, 0.5);
  }

  clone(): TextureRotationMaterial {
    const dest = new TextureRotationMaterial(this._engine);
    this.cloneTo(dest);
    return dest;
  }

  get texture(): Texture2D {
    return <Texture2D>this.shaderData.getTexture('baseTexture');
  }

  set texture(value: Texture2D) {
    this.shaderData.setTexture('baseTexture', value);
  }

  get rotation(): number {
    return <number>this.shaderData.getFloat('rotation');
  }

  set rotation(value: number) {
    this.shaderData.setFloat('rotation', value);
  }

  get rotationCenter(): Vector2 {
    return <Vector2>this.shaderData.getVector2('rotationCenter');
  }

  set rotationCenter(value: Vector2) {
    this.shaderData.setVector2('rotationCenter', value);
  }
}

// Create engine object
const engine = new WebGLEngine("canvas");
engine.canvas.resizeByClientSize();

const scene = engine.sceneManager.activeScene;
const rootEntity = scene.createRootEntity();

// Create camera
const cameraEntity = rootEntity.createChild("Camera");
cameraEntity.transform.setPosition(0, 0, 1);
cameraEntity.addComponent(Camera);
cameraEntity.addComponent(OrbitControl);

// Create Plane
const mesh = PrimitiveMesh.createPlane(engine, 2, 2);
const material = new TextureRotationMaterial(engine);
material.renderFace = RenderFace.Double;
const planeEntity = rootEntity.createChild("ground");
planeEntity.transform.setRotation(5, 0, 0);
const planeRenderer = planeEntity.addComponent(MeshRenderer);
planeRenderer.mesh = mesh;
planeRenderer.setMaterial(material);

engine.resourceManager
  .load<Texture2D>("https://gw.alipayobjects.com/zos/OasisHub/440001901/3736/spring.jpeg")
  .then((texture) => {
    material.texture = texture;
    addGUI(material);
    engine.run();
  }).catch(alert);

function addGUI(material: TextureRotationMaterial) {
  console.log(material)
  gui.add(material, "rotation", 0, 360, 1);
  gui.add(material.rotationCenter, "x", 0, 1, 0.01);
  gui.add(material.rotationCenter, "y", 0, 1, 0.01);
}
