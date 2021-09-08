/**
 * @title Collision Detection
 * @category Physics
 */

import {
  WebGLEngine, SphereCollider,
  BoxCollider, Vector3,
  MeshRenderer, BlinnPhongMaterial, PointLight,
  PrimitiveMesh, Camera, Script
} from "oasis-engine";
import { OrbitControl } from "@oasis-engine/controls";

import {
  PhysicsEngine
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

Oasis.init(PhysicsEngine.init).then(() => {
  const engine = new WebGLEngine("canvas", new PhysicsEngine());
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

  const boxCollider = boxEntity.addComponent(BoxCollider);
  boxCollider.initWithSize(new Vector3(cubeSize, cubeSize, cubeSize));

  // create sphere test entity
  const radius = 1.25;
  const sphereEntity = rootEntity.createChild("SphereEntity");
  sphereEntity.transform.setPosition(-2, 0, 0);

  const sphereMtl = new BlinnPhongMaterial(engine);
  const sphereRenderer = sphereEntity.addComponent(MeshRenderer);
  sphereMtl.baseColor.setValue(Math.random(), Math.random(), Math.random(), 1.0);
  sphereRenderer.mesh = PrimitiveMesh.createSphere(engine, radius);
  sphereRenderer.setMaterial(sphereMtl);

  const sphereCollider = sphereEntity.addComponent(SphereCollider);
  sphereCollider.initWithRadius(radius);

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
    onTriggerExit() {
      (<BlinnPhongMaterial>sphereRenderer.getMaterial()).baseColor.setValue(Math.random(), Math.random(), Math.random(), 1.0);
    }

    onTriggerEnter() {
      (<BlinnPhongMaterial>sphereRenderer.getMaterial()).baseColor.setValue(Math.random(), Math.random(), Math.random(), 1.0);
    }
  }

  sphereEntity.addComponent(CollisionScript);
  sphereEntity.addComponent(MoveScript);

  // Run engine
  engine.run();

});
