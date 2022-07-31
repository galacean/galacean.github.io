/**
 * @title input-pointer
 * @category input
 */
import {
  Camera,
  MeshRenderer,
  PrimitiveMesh,
  Script,
  WebGLEngine,
  StaticCollider,
  BoxColliderShape,
  PointLight,
  BlinnPhongMaterial,
  Vector3,
  Vector2,
  Vector4,
  Entity,
  Pointer
} from "oasis-engine";
import { LitePhysics } from "@oasis-engine/physics-lite";

const engine = new WebGLEngine("canvas");
engine.physicsManager.initialize(LitePhysics);
engine.canvas.resizeByClientSize();
const invCanvasWidth = 1 / engine.canvas.width;
const invCanvasHeight = 1 / engine.canvas.height;
// @ts-ignore
const inputManager = engine.inputManager;
const scene = engine.sceneManager.activeScene;
const rootEntity = scene.createRootEntity("root");

scene.ambientLight.diffuseSolidColor.set(1, 1, 1, 1);
scene.ambientLight.diffuseIntensity = 1.2;

// init camera
const cameraEntity = rootEntity.createChild("camera");
const camera = cameraEntity.addComponent(Camera);
cameraEntity.transform.setPosition(10, 10, 10);
cameraEntity.transform.lookAt(new Vector3(0, 0, 0));

// init point light
let light = rootEntity.createChild("light1");
light.transform.setPosition(-8, -2, 8);
light.addComponent(PointLight).intensity = 0.12;

light = rootEntity.createChild("light2");
light.transform.setPosition(8, -2, 0);
light.addComponent(PointLight).intensity = 0.12;

class PanScript extends Script {
  private startPointerPos = new Vector3();
  private tempVec2: Vector2 = new Vector2();
  private tempVec3: Vector3 = new Vector3();
  private zValue: number = 0;

  onPointerDown() {
    this.zValue = camera.worldToViewportPoint(this.entity.transform.worldPosition, this.tempVec3).z;
    const { tempVec2, tempVec3 } = this;
    tempVec2.copyFrom(inputManager.pointerPosition);
    tempVec3.set(tempVec2.x * invCanvasWidth, tempVec2.y * invCanvasHeight, this.zValue);
    camera.viewportToWorldPoint(tempVec3, this.startPointerPos);
  }

  onPointerDrag() {
    const { tempVec2, tempVec3, startPointerPos } = this;
    const { transform } = this.entity;
    tempVec2.copyFrom(inputManager.pointerPosition);
    tempVec3.set(tempVec2.x * invCanvasWidth, tempVec2.y * invCanvasHeight, this.zValue);
    camera.viewportToWorldPoint(tempVec3, tempVec3);
    Vector3.subtract(tempVec3, startPointerPos, startPointerPos);
    transform.worldPosition.add(startPointerPos);
    startPointerPos.copyFrom(tempVec3);
  }
}

class ClickScript extends Script {
  private material: BlinnPhongMaterial;
  onStart() {
    this.material = <BlinnPhongMaterial>this.entity.getComponent(MeshRenderer).getInstanceMaterial();
  }

  onPointerClick() {
    this.material.baseColor.set(Math.random(), Math.random(), Math.random(), 1.0);
  }
}

class EnterExitScript extends Script {
  private material: BlinnPhongMaterial;
  onStart() {
    this.material = <BlinnPhongMaterial>this.entity.getComponent(MeshRenderer).getInstanceMaterial();
  }

  onPointerEnter() {
    this.material.baseColor.set(Math.random(), Math.random(), Math.random(), 1.0);
  }

  onPointerExit() {
    this.material.baseColor.set(Math.random(), Math.random(), Math.random(), 1.0);
  }
}

function createBox(x: number, y: number, z: number): Entity {
  // create box test entity
  const cubeSize = 2.0;
  const boxEntity = rootEntity.createChild("BoxEntity");
  boxEntity.transform.setPosition(x, y, z);

  const boxMtl = new BlinnPhongMaterial(engine);
  const boxRenderer = boxEntity.addComponent(MeshRenderer);
  boxMtl.baseColor.set(0.6, 0.3, 0.3, 1.0);
  boxRenderer.mesh = PrimitiveMesh.createCuboid(engine, cubeSize, cubeSize, cubeSize);
  boxRenderer.setMaterial(boxMtl);

  const boxCollider: StaticCollider = boxEntity.addComponent(StaticCollider);
  const boxColliderShape = new BoxColliderShape();
  boxColliderShape.setSize(cubeSize, cubeSize, cubeSize);
  boxCollider.addShape(boxColliderShape);
  return boxEntity;
}
createBox(0, 0, 0).addComponent(PanScript);
createBox(3, 0, -3).addComponent(ClickScript);
createBox(-3, 0, 3).addComponent(EnterExitScript);

// Run engine
engine.run();
