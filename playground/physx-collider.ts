/**
 * @title PhysX Collision
 * @category Physics
 */
/**
 * 本示例展示如何使用几何体渲染器功能、如何创建几何体资源对象、如何创建材质对象
 */

import {
  WebGLEngine, Entity, BlinnPhongMaterial, MeshRenderer, PrimitiveMesh, Camera, Script
} from "oasis-engine";
import { Vector3, Quaternion } from "@oasis-engine/math";
import { OrbitControl } from "@oasis-engine/controls";

import {
  BoxCollider, SphereCollider, PhysXManager, PhysicsScene, ShapeFlag, Rigidbody, PhysicsCombineMode
} from "../../engine/packages/physics/src/index";

const engine = new WebGLEngine("canvas");
let physic_scene;
let rootEntity;
engine.init((PHYSX) => {
  PhysXManager.init(PHYSX);


  engine.canvas.resizeByClientSize();
  const scene = engine.sceneManager.activeScene;
  rootEntity = scene.createRootEntity();

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

  physic_scene = new PhysicsScene();
  physic_scene.init();
  init();

  update();
});

window.addEventListener("mousedown", (event: MouseEvent) => {
  if (event.button === 2) {
    addSphere(0.5, new Vector3(
      Math.floor(Math.random() * 6) - 2.5,
      5,
      Math.floor(Math.random() * 6) - 2.5
    ), new Quaternion(0, 0, 0.3, 0.7), physic_scene);
  }
});

// init scene
export function init() {
  physic_scene.init();

  addPlane(new Vector3(30, 0.1, 30), new Vector3, new Quaternion, physic_scene);

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      addBox(new Vector3(1, 1, 1), new Vector3(
        -2.5 + i + 0.1 * i,
        Math.floor(Math.random() * 6) + 1,
        -2.5 + j + 0.1 * j
      ), new Quaternion(0, 0, 0.3, 0.7), physic_scene);
    }
  }
}

export function update() {
  physic_scene.simulate();
  physic_scene.fetchResults();

  for (let i = 1; i < PhysXManager.physical_id; i++) {
    const transform = physic_scene.physicObjectsMap[i].getComponent(Rigidbody).getGlobalPose();
    physic_scene.physicObjectsMap[i].transform.position = transform.translation;
    physic_scene.physicObjectsMap[i].transform.rotationQuaternion = transform.rotation;
  }
  engine.update();

  requestAnimationFrame(update);
}

//----------------------------------------------------------------------------------------------------------------------
function addPlane(size: Vector3, position: Vector3, rotation: Quaternion, scene: PhysicsScene): Entity {
  const mtl = new BlinnPhongMaterial(engine);
  const color = mtl.baseColor;
  color.r = 0.03179807202597362;
  color.g = 0.3939682161541871;
  color.b = 0.41177952549087604;
  color.a = 1.0;
  const cubeEntity = rootEntity.createChild();
  const renderer = cubeEntity.addComponent(MeshRenderer);

  renderer.mesh = PrimitiveMesh.createCuboid(engine, size.x, size.y, size.z);
  renderer.setMaterial(mtl);
  cubeEntity.transform.position = position;
  cubeEntity.transform.rotationQuaternion = rotation;

  const box_collider = cubeEntity.addComponent(BoxCollider);
  box_collider.initWithSize(size);
  box_collider.material.staticFriction = 1;
  box_collider.material.dynamicFriction = 2;
  box_collider.material.bounciness = 0.1;
  box_collider.setFlag(ShapeFlag.SIMULATION_SHAPE, true);
  scene.addStaticActor(box_collider);

  return cubeEntity;
}

function addBox(size: Vector3, position: Vector3, rotation: Quaternion, scene: PhysicsScene): Entity {
  const mtl = new BlinnPhongMaterial(engine);
  const color = mtl.baseColor;
  color.r = Math.random();
  color.g = Math.random();
  color.b = Math.random();
  color.a = 1.0;
  const cubeEntity = rootEntity.createChild();
  const renderer = cubeEntity.addComponent(MeshRenderer);

  renderer.mesh = PrimitiveMesh.createCuboid(engine, size.x, size.y, size.z);
  renderer.setMaterial(mtl);
  cubeEntity.transform.position = position;
  cubeEntity.transform.rotationQuaternion = rotation;

  const box_collider = cubeEntity.addComponent(BoxCollider);
  box_collider.initWithSize(size);
  box_collider.material.staticFriction = 1;
  box_collider.material.dynamicFriction = 2;
  box_collider.material.bounciness = 0.1;
  box_collider.setFlag(ShapeFlag.SIMULATION_SHAPE, true);
  const rigid_body = cubeEntity.addComponent(Rigidbody);
  rigid_body.init(position, rotation);
  rigid_body.freezeRotation = false;
  rigid_body.attachShape(box_collider);

  scene.addDynamicActor(rigid_body);
  rigid_body.addForce(new Vector3(0, 300, 0));

  return cubeEntity;
}

function addSphere(radius: number, position: Vector3, rotation: Quaternion, scene: PhysicsScene): Entity {
  const mtl = new BlinnPhongMaterial(engine);
  const color = mtl.baseColor;
  color.r = Math.random();
  color.g = Math.random();
  color.b = Math.random();
  color.a = 1.0;
  const cubeEntity = rootEntity.createChild();
  const renderer = cubeEntity.addComponent(MeshRenderer);

  cubeEntity.addComponent(Script);

  renderer.mesh = PrimitiveMesh.createSphere(engine, radius);
  renderer.setMaterial(mtl);
  cubeEntity.transform.position = position;
  cubeEntity.transform.rotationQuaternion = rotation;

  const sphere_collider = cubeEntity.addComponent(SphereCollider);
  sphere_collider.initWithRadius(radius);
  sphere_collider.material.staticFriction = 0.1;
  sphere_collider.material.dynamicFriction = 0.2;
  sphere_collider.material.bounciness = 2;
  sphere_collider.material.bounceCombine = PhysicsCombineMode.Minimum;
  const rigid_body = cubeEntity.addComponent(Rigidbody);
  rigid_body.init(position, rotation);
  rigid_body.freezeRotation = false;
  rigid_body.attachShape(sphere_collider);

  scene.addDynamicActor(rigid_body);
  rigid_body.addForce(new Vector3(0, 300, 0));

  return cubeEntity;
}
