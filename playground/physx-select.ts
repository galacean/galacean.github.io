/**
 * @title PhysX Select
 * @category Physics
 */

import {
  BlinnPhongMaterial,
  BoxColliderShape,
  Camera,
  DynamicCollider,
  Entity,
  Layer,
  MeshRenderer,
  PlaneColliderShape,
  Pointer,
  PointLight,
  PrimitiveMesh,
  Quaternion,
  Script,
  StaticCollider,
  Vector2,
  Vector3,
  WebGLEngine,
  CollisionDetectionMode
} from "oasis-engine";

import {PhysXPhysics} from "@oasis-engine/physics-physx";

PhysXPhysics.init().then(() => {
    const engine = new WebGLEngine("canvas", PhysXPhysics);

    engine.canvas.resizeByClientSize();
    const invCanvasWidth = 1 / engine.canvas.width;
    const invCanvasHeight = 1 / engine.canvas.height;
    const inputManager = engine.inputManager;
    const scene = engine.sceneManager.activeScene;
    const rootEntity = scene.createRootEntity("root");

    scene.ambientLight.diffuseSolidColor.setValue(1, 1, 1, 1);
    scene.ambientLight.diffuseIntensity = 1.2;

    // init camera
    const cameraEntity = rootEntity.createChild("camera");
    const camera = cameraEntity.addComponent(Camera);
    cameraEntity.transform.setPosition(8, 5, 8);
    cameraEntity.transform.lookAt(new Vector3(0, 2, 0), new Vector3(0, 1, 0));

    // init point light
    const light = rootEntity.createChild("light");
    light.transform.setPosition(0, 3, 0);
    const pointLight = light.addComponent(PointLight);
    pointLight.intensity = 0.3;

    class PanScript extends Script {
      private startPointerPos = new Vector3();
      private tempVec2: Vector2 = new Vector2();
      private tempVec3: Vector3 = new Vector3();
      private zValue: number = 0;

      private collider: DynamicCollider;

      onStart() {
        this.collider = this.entity.getComponent(DynamicCollider);
      }

      onPointerDown() {
        // get depth
        camera.worldToViewportPoint(this.entity.transform.worldPosition, this.tempVec3);
        this.zValue = (this.tempVec3.z + 1) / 2;
        const {tempVec2, tempVec3} = this;
        // @ts-ignore
        this.getMergePointer(inputManager.pointers, tempVec2);
        tempVec3.setValue(tempVec2.x * invCanvasWidth, tempVec2.y * invCanvasHeight, this.zValue);
        camera.viewportToWorldPoint(tempVec3, this.startPointerPos);

        this.collider.linearVelocity = new Vector3();
        this.collider.angularVelocity = new Vector3();
      }

      onPointerDrag() {
        const {tempVec2, tempVec3, startPointerPos} = this;
        const {transform} = this.entity;
        // @ts-ignore
        this.getMergePointer(inputManager.pointers, tempVec2);
        this.tempVec3.setValue(tempVec2.x * invCanvasWidth, tempVec2.y * invCanvasHeight, this.zValue);
        camera.viewportToWorldPoint(tempVec3, tempVec3);
        Vector3.subtract(tempVec3, startPointerPos, startPointerPos);
        transform.worldPosition = transform.worldPosition.add(startPointerPos);
        tempVec3.cloneTo(startPointerPos);
      }

      getMergePointer(pointers: Pointer[], out: Vector2) {
        pointers[0].position.cloneTo(out);
        const len = pointers.length;
        for (let i = 1; i < len; i++) {
          const pos = pointers[i].position;
          out.x += pos.x;
          out.y += pos.y;
        }
      }
    }

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
      boxMtl.baseColor.setValue(Math.random(), Math.random(), Math.random(), 1.0);
      boxRenderer.mesh = PrimitiveMesh.createCuboid(engine, 0.5, 0.33, 2);
      boxRenderer.setMaterial(boxMtl);

      const physicsBox = new BoxColliderShape();
      physicsBox.size = new Vector3(0.5, 0.33, 2);
      physicsBox.material.staticFriction = 0.4;
      physicsBox.material.dynamicFriction = 0.4;
      physicsBox.material.bounciness = 0.2;

      const boxCollider = entity.addComponent(DynamicCollider);
      boxCollider.addShape(physicsBox);
      boxCollider.mass = 1.0;
      boxCollider.collisionDetectionMode = CollisionDetectionMode.ContinuousSpeculative;

      entity.addComponent(PanScript);
    }

    function addHorizontalBox(x: number, y: number, z: number): void {
      const entity = rootEntity.createChild("entity");
      entity.transform.setPosition(x, y, z);

      const boxMtl = new BlinnPhongMaterial(engine);
      const boxRenderer = entity.addComponent(MeshRenderer);
      boxMtl.baseColor.setValue(Math.random(), Math.random(), Math.random(), 1.0);
      boxRenderer.mesh = PrimitiveMesh.createCuboid(engine, 2, 0.33, 0.5);
      boxRenderer.setMaterial(boxMtl);

      const physicsBox = new BoxColliderShape();
      physicsBox.size = new Vector3(2, 0.33, 0.5);
      physicsBox.material.staticFriction = 0.4;
      physicsBox.material.dynamicFriction = 0.4;
      physicsBox.material.bounciness = 0.2;

      const boxCollider = entity.addComponent(DynamicCollider);
      boxCollider.addShape(physicsBox);
      boxCollider.mass = 1.0;
      boxCollider.collisionDetectionMode = CollisionDetectionMode.ContinuousSpeculative;

      entity.addComponent(PanScript);
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
