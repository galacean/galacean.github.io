/**
 * @title PhysX Select
 * @category Physics
 */

import {
  WebGLEngine, DynamicCollider,
  BoxColliderShape, Vector3,
  MeshRenderer, BlinnPhongMaterial, PointLight,
  PrimitiveMesh, Camera, StaticCollider, Quaternion, Entity, Layer, PlaneColliderShape, Vector2
} from "oasis-engine";
import {OrbitControl} from "@oasis-engine/controls";

import {
  PhysXPhysics
} from "@oasis-engine/physics-physx";

PhysXPhysics.init().then(() => {
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

    //--------------------------------------------------------------------------------------------------------------------
    function addPlane(size: Vector2, position: Vector3, rotation: Quaternion): Entity {
      const mtl = new BlinnPhongMaterial(engine);
      mtl.baseColor.setValue(0.03179807202597362, 0.3939682161541871, 0.41177952549087604, 1);
      const planeEntity = rootEntity.createChild();
      planeEntity.layer = Layer.Layer1;

      const renderer = planeEntity.addComponent(MeshRenderer);
      renderer.mesh = PrimitiveMesh.createPlane(engine, size.x, size.y);
      renderer.setMaterial(mtl);
      planeEntity.transform.position = position;
      planeEntity.transform.rotationQuaternion = rotation;

      const physicsPlane = new PlaneColliderShape();
      physicsPlane.setPosition(0, 0, 0);
      const planeCollider = planeEntity.addComponent(StaticCollider);
      planeCollider.addShape(physicsPlane);

      return planeEntity;
    }

    addPlane(new Vector2(30, 30), new Vector3, new Quaternion);

    function addVerticalBox(x: number, y: number, z: number): void {
      const entity = rootEntity.createChild("entity");
      entity.transform.setPosition(x, y, z);

      const boxMtl = new BlinnPhongMaterial(engine);
      const boxRenderer = entity.addComponent(MeshRenderer);
      boxMtl.baseColor.setValue(0.6, 0.3, 0.3, 1.0);
      boxRenderer.mesh = PrimitiveMesh.createCuboid(engine, 0.5, 0.33, 2);
      boxRenderer.setMaterial(boxMtl);

      const physicsBox = new BoxColliderShape();
      physicsBox.size = new Vector3(0.5, 0.33, 2);
      physicsBox.material.staticFriction = 0.4;
      physicsBox.material.dynamicFriction = 0.4;
      physicsBox.material.bounciness = 0.2;

      const boxCollider = entity.addComponent(DynamicCollider);
      boxCollider.addShape(physicsBox);
    }

  function addHorizontalBox(x: number, y: number, z: number): void {
    const entity = rootEntity.createChild("entity");
    entity.transform.setPosition(x, y, z);

    const boxMtl = new BlinnPhongMaterial(engine);
    const boxRenderer = entity.addComponent(MeshRenderer);
    boxMtl.baseColor.setValue(0.6, 0.3, 0.3, 1.0);
    boxRenderer.mesh = PrimitiveMesh.createCuboid(engine, 2, 0.33, 0.5);
    boxRenderer.setMaterial(boxMtl);

    const physicsBox = new BoxColliderShape();
    physicsBox.size = new Vector3(2, 0.33, 0.5);
    physicsBox.material.staticFriction = 0.4;
    physicsBox.material.dynamicFriction = 0.4;
    physicsBox.material.bounciness = 0.2;

    const boxCollider = entity.addComponent(DynamicCollider);
    boxCollider.addShape(physicsBox);
  }

    function addBox(): void {
      for (let i: number = 0; i < 8; i++) {
        addVerticalBox(-0.65, 0.165 + i * 0.33 * 2, 0);
        addVerticalBox(0, 0.165 + i * 0.33 * 2, 0);
        addVerticalBox(0.65, 0.165 + i * 0.33 * 2, 0);

        addHorizontalBox(0, 0.165 + 0.33 + i * 0.33 * 2, -0.65);
        addHorizontalBox(0, 0.165 + 0.33 + i * 0.33 * 2, 0);
        addHorizontalBox(0, 0.165 + 0.33 + i * 0.33 * 2, 0.65);
      }
    }

    addBox();

    // Run engine
    engine.run();
  }
)
;
