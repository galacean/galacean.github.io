/**
 * @title Draw Lines
 * @category input
 */
import {
  Camera,
  Color,
  MeshRenderer,
  UnlitMaterial,
  Vector3,
  WebGLEngine,
  Mesh,
  ModelMesh,
  Script,
  Entity,
  StaticCollider,
  BoxColliderShape,
  MathUtil,
  Quaternion,
  RenderFace
} from "oasis-engine";
import * as dat from "dat.gui";
import { LitePhysics } from "@oasis-engine/physics-lite";
import { OrbitControl } from "@oasis-engine/controls";

const gui = new dat.GUI();
const tempLine = new Vector3();
const tempPerpendicular = new Vector3();
const tempP1 = new Vector3();
const tempP2 = new Vector3();
const tempP3 = new Vector3();
const tempP4 = new Vector3();
const tempZAxis = new Vector3(0, 0, 1);
const tempRotateAxis = new Vector3();

class DrawScript extends Script {
  private _preDrawTime: number = 0;
  private _prePointer: Vector3 = new Vector3();
  private _meshEntity: Entity;
  private _meshMaterial: UnlitMaterial;

  private _camera: Camera;
  private _depth: number = 10;
  private _lineWidth: number = 0.1;
  private _forward: Vector3 = new Vector3();
  private _precision: number = 15;
  private _drawInterval: number = 30;
  private _color: Color = new Color(1, 1, 1, 1);

  private tempPointer: Vector3 = new Vector3();

  set camera(val: Camera) {
    this._camera = val;
    val.entity.transform.getWorldForward(this._forward);
  }

  set lineWidth(val: number) {
    this._lineWidth = val;
  }

  set precision(val: number) {
    this._precision = val;
  }

  set depth(val: number) {
    this._depth = val;
  }

  set drawInterval(val: number) {
    this._drawInterval = val;
  }

  setColor(r: number, g: number, b: number, a: number) {
    this._meshMaterial = new UnlitMaterial(this.engine);
    this._meshMaterial.renderFace = RenderFace.Double;
    this._meshMaterial.baseColor = this._color.setValue(r, g, b, a);
  }

  onStart(): void {
    this._meshEntity = this.entity.createChild("mesh");
    this._meshMaterial = new UnlitMaterial(this.engine);
    this._meshMaterial.renderFace = RenderFace.Double;
    this._meshMaterial.baseColor = this._color;
  }

  onPointerDrag(): void {
    const now = this.engine.time.nowTime;
    if (now - this._preDrawTime >= this._drawInterval) {
      this._preDrawTime = now;
      const { tempPointer: endPointer, _prePointer: startPointer } = this;
      const { x: screenX, y: screenY } = this.engine.inputManager.pointers[0].position;
      this._camera.screenToWorldPoint(endPointer.setValue(screenX, screenY, this._depth), endPointer);
      const { x: sx, y: sy, z: sz } = startPointer;
      const { x: ex, y: ey, z: ez } = endPointer;
      if (sx === ex && sy === ey && sz === ez) {
        return;
      }
      const { _meshEntity: meshEntity, _forward: forward, _lineWidth: lineWidth, _meshMaterial: meshMaterial } = this;
      // Draw circle.
      const rendererCircle = meshEntity.addComponent(MeshRenderer);
      rendererCircle.mesh = createCircleMesh(endPointer, forward, lineWidth, this._precision);
      rendererCircle.setMaterial(meshMaterial);
      // Draw line.
      const renderer = meshEntity.addComponent(MeshRenderer);
      renderer.mesh = createLineMesh(startPointer, endPointer, forward, lineWidth);
      renderer.setMaterial(meshMaterial);
      startPointer.setValue(ex, ey, ez);
    }
  }

  onPointerDown(): void {
    // Screen pointer to world pointer.
    this._preDrawTime = this.engine.time.nowTime;
    const { x: screenX, y: screenY } = this.engine.inputManager.pointers[0].position;
    const { _prePointer: startPointer } = this;
    this._camera.screenToWorldPoint(startPointer.setValue(screenX, screenY, this._depth), startPointer);
    // Draw circle.
    const renderer = this._meshEntity.addComponent(MeshRenderer);
    renderer.mesh = createCircleMesh(this._prePointer, this._forward, this._lineWidth, this._precision);
    renderer.setMaterial(this._meshMaterial);
  }
}

const engine = new WebGLEngine("canvas", LitePhysics);
engine.canvas.resizeByClientSize();
const scene = engine.sceneManager.activeScene;
const rootEntity = scene.createRootEntity();

// init light
scene.ambientLight.diffuseSolidColor.setValue(1, 1, 1, 1);
scene.ambientLight.diffuseIntensity = 1.2;

// init camera
const cameraEntity = rootEntity.createChild("camera");
const camera = cameraEntity.addComponent(Camera);
cameraEntity.transform.setPosition(0, 0, 10);
cameraEntity.transform.lookAt(new Vector3(0, 0, 0));
const cameraControl = cameraEntity.addComponent(OrbitControl);
cameraControl.enabled = false;

// init plane
const planeEntity = rootEntity.createChild("camera");
const planeCollider = planeEntity.addComponent(StaticCollider);
const planeShape = new BoxColliderShape();
planeShape.setSize(20, 20, 1);
planeCollider.addShape(planeShape);
const planeScript = planeEntity.addComponent(DrawScript);
planeScript.camera = camera;

engine.run();

/**
 * Draw a line segment perpendicular to the forward vector.
 * @param startPos - Start world position
 * @param endPos - End world position
 * @param forwardVec3 - Forward vector
 * @param lineWidth - Line width
 * @returns ModelMesh containing mesh information
 */
function createLineMesh(startPos: Vector3, endPos: Vector3, forwardVec3: Vector3, lineWidth: number): Mesh {
  // Get direction vector.
  Vector3.subtract(endPos, startPos, tempLine);
  // Get perpendicular vector.
  Vector3.cross(tempLine, forwardVec3, tempPerpendicular);
  tempPerpendicular.normalize().scale(lineWidth / 2);
  // Get four vertices.
  Vector3.add(startPos, tempPerpendicular, tempP1);
  Vector3.subtract(startPos, tempPerpendicular, tempP2);
  Vector3.add(tempP1, tempLine, tempP3);
  Vector3.add(tempP2, tempLine, tempP4);
  // Draw two triangles.
  const mesh = new ModelMesh(engine);
  mesh.setPositions([tempP1, tempP2, tempP3, tempP4]);
  mesh.setIndices(new Uint16Array([0, 1, 2, 2, 1, 3]));
  mesh.addSubMesh(0, 6);
  mesh.uploadData(false);
  return mesh;
}

/**
 * Draw a circle perpendicular to the forward vector.
 * @param pos - The world position of the center of the circle
 * @param forwardVec3 - Forward vector
 * @param lineWidth - Line width
 * @param precision - Precision
 * @returns ModelMesh containing mesh information
 */
function createCircleMesh(pos: Vector3, forwardVec3: Vector3, lineWidth: number, precision: number): Mesh {
  Vector3.cross(tempZAxis, forwardVec3, tempRotateAxis);
  const vec3Arr: Vector3[] = [];
  const axisLen = tempRotateAxis.length();
  const rad = (2 * Math.PI) / precision;
  if (axisLen <= MathUtil.zeroTolerance) {
    for (let i = 0; i < precision; i++) {
      const vec3 = new Vector3((lineWidth * Math.sin(rad * i)) / 2, (lineWidth * Math.cos(rad * i)) / 2, 0);
      vec3Arr.push(vec3.add(pos));
    }
  } else {
    const rotateVal = Vector3.dot(tempZAxis, forwardVec3) > 0 ? Math.asin(axisLen) : Math.PI - Math.asin(axisLen);
    const quat = new Quaternion();
    quat.rotationAxisAngle(tempRotateAxis, rotateVal);
    for (let i = 0; i < precision; i++) {
      const vec3 = new Vector3((lineWidth * Math.sin(rad * i)) / 2, (lineWidth * Math.cos(rad * i)) / 2, 0);
      vec3.transformByQuat(quat);
      vec3Arr.push(vec3.add(pos));
    }
  }
  vec3Arr.push(pos);
  const mesh = new ModelMesh(engine);
  mesh.setPositions(vec3Arr);
  const indexArr = [];
  for (let i = 0; i < precision; i++) {
    indexArr.push(i, precision, (i + 1) % precision);
  }
  mesh.setIndices(new Uint16Array(indexArr));
  mesh.addSubMesh(0, indexArr.length);
  mesh.uploadData(false);
  return mesh;
}

// Debug
const debugInfo = {
  drawAble: "绘制",
  lineWidth: 0.1,
  precision: 15,
  depth: 10,
  lineColor: [255, 255, 255],
  drawInterval: 30,
  resetView: () => {
    cameraControl.enabled && cameraEntity.transform.setPosition(0, 0, 10);
  }
};

gui
  .add(debugInfo, "drawAble", ["观察", "绘制"])
  .onChange((v: string) => {
    if (v === "绘制") {
      planeScript.camera = camera;
      planeScript.enabled = true;
      cameraControl.enabled = false;
    } else {
      planeScript.enabled = false;
      cameraControl.enabled = true;
      cameraEntity.transform.lookAt(new Vector3(0, 0, 0));
    }
  })
  .name("当前操作");

gui
  .add(debugInfo, "lineWidth", 0.01, 2, 0.02)
  .onChange((v: number) => {
    planeScript.lineWidth = v;
  })
  .name("线条宽度");

gui
  .add(debugInfo, "precision", 4, 40, 1)
  .onChange((v: number) => {
    planeScript.precision = v;
  })
  .name("圆润程度");

gui
  .add(debugInfo, "depth", 5, 15, 0.5)
  .onChange((v: number) => {
    planeScript.depth = v;
  })
  .name("绘制深度");

gui
  .add(debugInfo, "drawInterval", 15, 100, 1)
  .onChange((v: number) => {
    planeScript.drawInterval = v;
  })
  .name("绘制延迟");

gui
  .addColor(debugInfo, "lineColor")
  .onChange((v: number) => {
    planeScript.setColor(v[0] / 255, v[1] / 255, v[2] / 255, 1);
  })
  .name("线条颜色");

gui.add(debugInfo, "resetView").name("重置视角");
