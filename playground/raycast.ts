/**
 * @title Raycast
 * @category Physics
 */
/**
 * 本示例展示如何使用几何体渲染器功能、如何创建几何体资源对象、如何创建材质对象
 */
import {
  BlinnPhongMaterial,
  BoxCollider,
  Camera,
  HitResult,
  Layer,
  MeshRenderer,
  PrimitiveMesh,
  Ray,
  SphereCollider,
  Vector2,
  Vector3,
  WebGLEngine
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

window.addEventListener("mousedown", (event: MouseEvent) => {
  const ray = new Ray();
  cameraEntity.getComponent(Camera).screenPointToRay(
    new Vector2(event.pageX * window.devicePixelRatio, event.pageY * window.devicePixelRatio), ray);

  const hit = new HitResult();
  const result = engine.physicsManager.raycast(ray, 2147000, Layer.Everything, hit);

  if (result) {
    const mtl = new BlinnPhongMaterial(engine);
    const color = mtl.baseColor;
    color.r = Math.random();
    color.g = Math.random();
    color.b = Math.random();
    color.a = 1.0;

    const meshes: MeshRenderer[] = [];
    hit.collider.entity.getComponentsIncludeChildren(MeshRenderer, meshes);
    meshes.forEach((mesh: MeshRenderer) => {
      mesh.setMaterial(mtl);
    });
  }
});

// Run engine
engine.run();
