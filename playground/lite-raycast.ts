/**
 * @title Lite Raycast
 * @category Physics
 */
import {
  BlinnPhongMaterial,
  BoxColliderShape,
  Camera,
  HitResult,
  Layer,
  MeshRenderer,
  PrimitiveMesh,
  Ray,
  SphereColliderShape,
  StaticCollider,
  Vector2, Color,
  PointLight,
  WebGLEngine
} from "oasis-engine";
import {OrbitControl} from "@oasis-engine/controls";

import { LitePhysics } from "@oasis-engine/physics-lite";

const engine = new WebGLEngine("canvas", LitePhysics);
engine.canvas.resizeByClientSize();
const scene = engine.sceneManager.activeScene;
const rootEntity = scene.createRootEntity("root");

scene.ambientLight.diffuseSolidColor.setValue(1, 1, 1, 1);
scene.ambientLight.diffuseIntensity = 1.2;

// init camera
const cameraEntity = rootEntity.createChild("camera");
const camera = cameraEntity.addComponent(Camera);
cameraEntity.transform.setPosition(10, 10, 10);
cameraEntity.addComponent(OrbitControl);

// init point light
const lightEntity = rootEntity.createChild("light");
lightEntity.transform.setPosition(0, 3, 0);
const pointLight = lightEntity.addComponent(PointLight);
pointLight.intensity = 0.3;

// create sphere test entity
const radius = 1.25;
const sphereEntity = rootEntity.createChild("SphereEntity");
sphereEntity.transform.setPosition(-3, 0, 0);

const sphereMtl = new BlinnPhongMaterial(engine);
const sphereRenderer = sphereEntity.addComponent(MeshRenderer);
sphereMtl.baseColor.setValue(0.7, 0.1, 0.1, 1.0);
sphereRenderer.mesh = PrimitiveMesh.createSphere(engine, radius);
sphereRenderer.setMaterial(sphereMtl);

const sphereCollider = sphereEntity.addComponent(StaticCollider);
const sphereColliderShape = new SphereColliderShape();
sphereColliderShape.radius = radius;
sphereCollider.addShape(sphereColliderShape);

// create box test entity
const cubeSize = 2.0;
const boxEntity = rootEntity.createChild("BoxEntity");

const boxMtl = new BlinnPhongMaterial(engine);
const boxRenderer = boxEntity.addComponent(MeshRenderer);
boxMtl.baseColor.setValue(0.1, 0.7, 0.1, 1.0);
boxRenderer.mesh = PrimitiveMesh.createCuboid(engine, cubeSize, cubeSize, cubeSize);
boxRenderer.setMaterial(boxMtl);

const boxCollider = boxEntity.addComponent(StaticCollider);
const boxColliderShape = new BoxColliderShape();
boxColliderShape.setSize(cubeSize, cubeSize, cubeSize);
boxCollider.addShape(boxColliderShape);

// raycast logic
let pickedMeshRenderer: MeshRenderer;
const originalColor: Color = new Color();
const point = new Vector2();
const ray = new Ray();
const hit = new HitResult();
window.addEventListener("mousedown", (event: MouseEvent) => {
  point.setValue(event.pageX * window.devicePixelRatio, event.pageY * window.devicePixelRatio);
  camera.screenPointToRay(point, ray);

  const result = engine.physicsManager.raycast(ray, Number.MAX_VALUE, Layer.Everything, hit);
  if (result) {
    pickedMeshRenderer = hit.entity.getComponent(MeshRenderer);
    const material = (<BlinnPhongMaterial>pickedMeshRenderer.getMaterial());
    material.baseColor.cloneTo(originalColor);
    material.baseColor.setValue(0.3, 0.3, 0.3, 1.0);
  }
});

window.addEventListener("mouseup", () => {
  (<BlinnPhongMaterial>pickedMeshRenderer.getMaterial()).baseColor = originalColor;
});

// Run engine
engine.run();
