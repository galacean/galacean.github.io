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
  Vector2,
  Color,
  PointLight,
  WebGLEngine, Script, PointerButton, Vector3, TextRenderer, Font
} from "oasis-engine";
import { OrbitControl } from "@oasis-engine-toolkit/controls";

import { LitePhysics } from "@oasis-engine/physics-lite";

class Raycast extends Script {
  camera: Camera;
  pickedMeshRenderer: MeshRenderer;
  originalColor: Color = new Color();
  point = new Vector2();
  ray = new Ray();
  hit = new HitResult();

  onAwake() {
    this.camera = this.entity.getComponent(Camera);
  }

  onUpdate(deltaTime: number) {
    const engine = this.engine;
    const ray = this.ray;
    const hit = this.hit;
    const originalColor = this.originalColor;
    const inputManager = this.engine.inputManager;
    if (inputManager.isPointerDown(PointerButton.Primary)) {
      this.camera.screenPointToRay(inputManager.pointerPosition, ray);

      const result = engine.physicsManager.raycast(ray, Number.MAX_VALUE, Layer.Everything, hit);
      if (result) {
        this.pickedMeshRenderer = hit.entity.getComponent(MeshRenderer);
        const material = <BlinnPhongMaterial>this.pickedMeshRenderer.getMaterial();
        originalColor.copyFrom(material.baseColor);
        material.baseColor.set(0.3, 0.3, 0.3, 1.0);
      }
    }

    if (this.pickedMeshRenderer && inputManager.isPointerUp(PointerButton.Primary)) {
      (<BlinnPhongMaterial>this.pickedMeshRenderer.getMaterial()).baseColor = originalColor;
    }
  }
}

const engine = new WebGLEngine("canvas");
engine.physicsManager.initialize(LitePhysics);
engine.canvas.resizeByClientSize();
const scene = engine.sceneManager.activeScene;
const rootEntity = scene.createRootEntity("root");

scene.ambientLight.diffuseSolidColor.set(1, 1, 1, 1);
scene.ambientLight.diffuseIntensity = 1.2;

// init camera
const cameraEntity = rootEntity.createChild("camera");
cameraEntity.addComponent(Camera);
cameraEntity.transform.setPosition(10, 10, 10);
cameraEntity.addComponent(OrbitControl);
cameraEntity.addComponent(Raycast);

const entity = cameraEntity.createChild("text");
entity.transform.position = new Vector3(0, 3.5, -10);
const renderer = entity.addComponent(TextRenderer);
renderer.color = new Color();
renderer.text = "Use mouse to click the entity";
renderer.font = Font.createFromOS(entity.engine, "Arial");
renderer.fontSize = 40;

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
sphereMtl.baseColor.set(0.7, 0.1, 0.1, 1.0);
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
boxMtl.baseColor.set(0.1, 0.7, 0.1, 1.0);
boxRenderer.mesh = PrimitiveMesh.createCuboid(engine, cubeSize, cubeSize, cubeSize);
boxRenderer.setMaterial(boxMtl);

const boxCollider = boxEntity.addComponent(StaticCollider);
const boxColliderShape = new BoxColliderShape();
boxColliderShape.setSize(cubeSize, cubeSize, cubeSize);
boxCollider.addShape(boxColliderShape);

// Run engine
engine.run();
