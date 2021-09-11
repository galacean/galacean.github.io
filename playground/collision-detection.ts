/**
 * @title Collision Detection
 * @category Physics
 */

import {
  WebGLEngine, SphereColliderShape, DynamicCollider,
  BoxColliderShape, Vector3,
  MeshRenderer, BlinnPhongMaterial, PointLight,
  PrimitiveMesh, Camera, Script, StaticCollider
} from "oasis-engine";
import { OrbitControl } from "@oasis-engine/controls";

import {
  PhysXPhysics
} from "../../engine/packages/physics-physx/src/index";

class Oasis {
  static init(type: () => Promise<void>): Promise<void> {
    return new Promise((resolve) => {
      type().then(() => {
        resolve();
      });
    });
  }
}

Oasis.init(PhysXPhysics.init).then(() => {
  const engine = new WebGLEngine("canvas", PhysXPhysics);

  engine.canvas.resizeByClientSize();
  const scene = engine.sceneManager.activeScene;
  const rootEntity = scene.createRootEntity("root");

  scene.ambientLight.diffuseSolidColor.setValue(1, 1, 1, 1);
  scene.ambientLight.diffuseIntensity = 1.2;

  // init camera
  const cameraEntity = rootEntity.createChild("camera");
  cameraEntity.addComponent(Camera);
  cameraEntity.transform.setPosition(10, 10, 10);
  cameraEntity.addComponent(OrbitControl);

  // init point light
  const light = rootEntity.createChild("light");
  light.transform.setPosition(0, 3, 0);
  const pointLight = light.addComponent(PointLight);
  pointLight.intensity = 0.3;

  // create box test entity
  const cubeSize = 2.0;
  const boxEntity = rootEntity.createChild("BoxEntity");

  const boxMtl = new BlinnPhongMaterial(engine);
  const boxRenderer = boxEntity.addComponent(MeshRenderer);
  boxMtl.baseColor.setValue(0.6, 0.3, 0.3, 1.0);
  boxRenderer.mesh = PrimitiveMesh.createCuboid(engine, cubeSize, cubeSize, cubeSize);
  boxRenderer.setMaterial(boxMtl);

  const physicsBox = new BoxColliderShape()
  physicsBox.extents = new Vector3(cubeSize, cubeSize, cubeSize)
  physicsBox.material.staticFriction = 0.1;
  physicsBox.material.dynamicFriction = 0.2;
  physicsBox.material.bounciness = 1;
  physicsBox.isTrigger(true);

  const boxCollider = boxEntity.addComponent(StaticCollider);
  boxCollider.addShape(physicsBox);
  engine.physicsManager.addCollider(boxCollider);

  // create sphere test entity
  const radius = 1.25;
  const sphereEntity = rootEntity.createChild("SphereEntity");
  sphereEntity.transform.setPosition(-2, 0, 0);

  const sphereMtl = new BlinnPhongMaterial(engine);
  const sphereRenderer = sphereEntity.addComponent(MeshRenderer);
  sphereMtl.baseColor.setValue(Math.random(), Math.random(), Math.random(), 1.0);
  sphereRenderer.mesh = PrimitiveMesh.createSphere(engine, radius);
  sphereRenderer.setMaterial(sphereMtl);

  const physicsSphere = new SphereColliderShape();
  physicsSphere.radius = radius;
  physicsSphere.material.staticFriction = 0.1;
  physicsSphere.material.dynamicFriction = 0.2;
  physicsSphere.material.bounciness = 1;

  const sphereCollider = sphereEntity.addComponent(DynamicCollider);
  sphereCollider.addShape(physicsSphere);
  engine.physicsManager.addCollider(sphereCollider);

  class MoveScript extends Script {
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

  // Collision Detection
  class CollisionScript extends Script {
    onTriggerExit(other: DynamicCollider) {
      (<BlinnPhongMaterial>sphereRenderer.getMaterial()).baseColor.setValue(Math.random(), Math.random(), Math.random(), 1.0);
    }

    onTriggerEnter(other: DynamicCollider) {
      (<BlinnPhongMaterial>sphereRenderer.getMaterial()).baseColor.setValue(Math.random(), Math.random(), Math.random(), 1.0);
    }
  }

  sphereEntity.addComponent(CollisionScript);
  sphereEntity.addComponent(MoveScript);

  // Run engine
  engine.run();

});
