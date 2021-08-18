/**
 * @title Collision Detection
 * @category Physics
 */
/**
 * 本示例展示如何使用几何体渲染器功能、如何创建几何体资源对象、如何创建材质对象
 */
import {
  WebGLEngine, SphereCollider,
  BoxCollider, Vector3,
  MeshRenderer, BlinnPhongMaterial,
  PrimitiveMesh, Camera, CollisionDetection, Script
} from "oasis-engine";
import { OrbitControl } from "@oasis-engine/controls";

const engine = new WebGLEngine("canvas");
engine.canvas.resizeByClientSize();
const scene = engine.sceneManager.activeScene;
const rootEntity = scene.createRootEntity("root");

// init camera
const cameraEntity = rootEntity.createChild("camera");
cameraEntity.addComponent(Camera);
const pos = cameraEntity.transform.position;
pos.setValue(10, 10, 10);
cameraEntity.transform.position = pos;
cameraEntity.addComponent(OrbitControl);

// init light
scene.ambientLight.diffuseSolidColor.setValue(1, 1, 1, 1);
scene.ambientLight.diffuseIntensity = 1.2;

// create sphere test entity
const sphereEntity = rootEntity.createChild("SphereEntity");
sphereEntity.position = new Vector3(-2, 0, 0);
const radius = 1.25;
const mtl = new BlinnPhongMaterial(engine);
const color = mtl.baseColor;
color.r = Math.random();
color.g = Math.random();
color.b = Math.random();
color.a = 1.0;
const renderer = sphereEntity.addComponent(MeshRenderer);
renderer.mesh = PrimitiveMesh.createSphere(engine, radius);
renderer.setMaterial(mtl);
const sphereCollider = sphereEntity.addComponent(SphereCollider);
sphereCollider.setSphere(new Vector3(), radius);

class Move extends Script {
  pos: Vector3 = new Vector3(-5, 0, 0);
  vel: number = 0.005;

  onUpdate(deltaTime: number) {
    super.onUpdate(deltaTime);
    if (this.pos.x >= 5 || this.pos.x <= -5) {
      this.vel *= -1;
    }
    this.pos.x += deltaTime * this.vel;

    this.entity.transform.position = this.pos;
  }
}

sphereEntity.addComponent(Move);

// create box test entity
const boxEntity = rootEntity.createChild("BoxEntity");
const cubeSize = 2.0;
{
  const mtl = new BlinnPhongMaterial(engine);
  const color = mtl.baseColor;
  color.r = Math.random();
  color.g = Math.random();
  color.b = Math.random();
  color.a = 1.0;
  const renderer = boxEntity.addComponent(MeshRenderer);
  renderer.mesh = PrimitiveMesh.createCuboid(engine, cubeSize, cubeSize, cubeSize);
  renderer.setMaterial(mtl);
}
const boxCollider = boxEntity.addComponent(BoxCollider);
boxCollider.setBoxCenterSize(new Vector3(), new Vector3(cubeSize, cubeSize, cubeSize));

// add CollisionDetection
sphereEntity.addComponent(CollisionDetection);

class CollisionScript extends Script {
  onTriggerExit() {
    const mtl = new BlinnPhongMaterial(engine);
    const color = mtl.baseColor;
    color.r = Math.random();
    color.g = Math.random();
    color.b = Math.random();
    color.a = 1.0;
    renderer.setMaterial(mtl);
  }

  onTriggerEnter() {
    const mtl = new BlinnPhongMaterial(engine);
    const color = mtl.baseColor;
    color.r = Math.random();
    color.g = Math.random();
    color.b = Math.random();
    color.a = 1.0;
    renderer.setMaterial(mtl);
  }
}

// add Script
sphereEntity.addComponent(CollisionScript);

// Run engine
engine.run();
