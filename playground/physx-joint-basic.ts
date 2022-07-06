/**
 * @title PhysX Joint Basic
 * @category Physics
 */

import {
  WebGLEngine,
  DynamicCollider,
  BoxColliderShape,
  Vector3,
  MeshRenderer,
  BlinnPhongMaterial,
  PrimitiveMesh,
  Camera,
  DirectLight,
  Quaternion,
  Entity,
  Collider,
  StaticCollider,
  FixedJoint,
  SpringJoint,
  SphereColliderShape, Script, Keys, HingeJoint
} from "oasis-engine";
import {OrbitControl} from "oasis-engine-toolkit";

import {
  PhysXPhysics
} from "@oasis-engine/physics-physx";

PhysXPhysics.initialize().then(() => {
  const engine = new WebGLEngine("canvas");
  engine.physicsManager.initialize(PhysXPhysics);

  engine.canvas.resizeByClientSize();
  const scene = engine.sceneManager.activeScene;
  const rootEntity = scene.createRootEntity("root");

  scene.ambientLight.diffuseSolidColor.set(0.5, 0.5, 0.5, 1);

  function addBox(size: Vector3, position: Vector3, rotation: Quaternion): Entity {
    const mtl = new BlinnPhongMaterial(engine);
    mtl.baseColor.set(Math.random(), Math.random(), Math.random(), 1.0);
    const boxEntity = rootEntity.createChild();
    const renderer = boxEntity.addComponent(MeshRenderer);

    renderer.mesh = PrimitiveMesh.createCuboid(engine, size.x, size.y, size.z);
    renderer.setMaterial(mtl);
    boxEntity.transform.position = position;
    boxEntity.transform.rotationQuaternion = rotation;

    const physicsBox = new BoxColliderShape();
    physicsBox.size = size;
    const boxCollider = boxEntity.addComponent(DynamicCollider);
    boxCollider.addShape(physicsBox);

    return boxEntity;
  }

  function transform(position: Vector3, rotation: Quaternion, outPosition: Vector3, outRotation: Quaternion) {
    Quaternion.multiply(rotation, outRotation, outRotation);
    Vector3.transformByQuat(outPosition, rotation, outPosition);
    outPosition.add(position);
  }

  function createChain(position: Vector3, rotation: Quaternion, length: number, separation: number) {
    let prevCollider: Collider = null;
    for (let i = 0; i < length; i++) {
      const localPosition = new Vector3(0, -separation / 2 * (2 * i + 1), 0);
      const localQuaternion = new Quaternion();
      transform(position, rotation, localPosition, localQuaternion);

      if (prevCollider === null) {
        const staticEntity = rootEntity.createChild();
        staticEntity.transform.position = position;
        staticEntity.transform.rotationQuaternion = rotation;

        const physicsBox = new BoxColliderShape();
        physicsBox.size = new Vector3(2.0, 2.0, 0.5);
        prevCollider = staticEntity.addComponent(StaticCollider);
        prevCollider.addShape(physicsBox);
      }

      const currentEntity = addBox(new Vector3(2.0, 2.0, 0.5), localPosition, localQuaternion);
      const currentCollider = currentEntity.getComponent(DynamicCollider);
      const fixedJoint = currentEntity.addComponent(FixedJoint);
      fixedJoint.connectedCollider = prevCollider;

      prevCollider = currentCollider;
    }
  }

  createChain(new Vector3(6.0, 10.0, 0.0), new Quaternion(), 10, 2.0);

  function createSpring(position: Vector3, rotation: Quaternion) {
    const currentEntity = addBox(new Vector3(2.0, 2.0, 2), position, rotation);
    const springJoint = currentEntity.addComponent(SpringJoint);
    springJoint.connectedAnchor = position;
    springJoint.swingOffset = new Vector3(0, 1, 0);
    springJoint.maxDistance = 10;
    springJoint.stiffness = 0.2;
    springJoint.damping = 0.1;
  }

  createSpring(new Vector3(0.0, 10.0, 0.0), new Quaternion());

  function createHinge(position: Vector3, rotation: Quaternion) {
    const currentEntity = addBox(new Vector3(4.0, 4.0, 0), position, rotation);
    const hingeJoint = currentEntity.addComponent(HingeJoint);
    hingeJoint.connectedAnchor = position;
    hingeJoint.swingOffset = new Vector3(0, 1, 0);
    hingeJoint.axis = new Vector3(0, 1, 0);
  }
  createHinge(new Vector3(0, 0, 0), new Quaternion());

  function addSphere(radius: number, position: Vector3, rotation: Quaternion, velocity: Vector3): Entity {
    const mtl = new BlinnPhongMaterial(engine);
    mtl.baseColor.set(Math.random(), Math.random(), Math.random(), 1.0);
    const sphereEntity = rootEntity.createChild();
    const renderer = sphereEntity.addComponent(MeshRenderer);

    renderer.mesh = PrimitiveMesh.createSphere(engine, radius);
    renderer.setMaterial(mtl);
    sphereEntity.transform.position = position;
    sphereEntity.transform.rotationQuaternion = rotation;

    const physicsSphere = new SphereColliderShape();
    physicsSphere.radius = radius;
    const sphereCollider = sphereEntity.addComponent(DynamicCollider);
    sphereCollider.addShape(physicsSphere);
    sphereCollider.linearVelocity = velocity;
    sphereCollider.angularDamping = 0.5;

    return sphereEntity;
  }

  class ShootScript extends Script {
    private _dir = new Vector3();

    onUpdate(deltaTime: number) {
      const transform = this.entity.transform;
      const dir = this._dir;
      transform.getWorldForward(this._dir);
      dir.scale(50);

      if (this.engine.inputManager.isKeyDown(Keys.Space)) {
        addSphere(0.5, transform.worldPosition, transform.worldRotationQuaternion, dir);
      }
    }
  }

  // init camera
  const cameraEntity = rootEntity.createChild("camera");
  cameraEntity.addComponent(Camera);
  cameraEntity.transform.setPosition(15, 15, 15);
  cameraEntity.addComponent(OrbitControl);
  cameraEntity.addComponent(ShootScript);

  // init direct light
  const light = rootEntity.createChild("light");
  light.transform.setPosition(-10, 10, 10);
  light.transform.lookAt(new Vector3());
  light.addComponent(DirectLight);

  // Run engine
  engine.run();

});
