/**
 * @title PhysX Joint Basic
 * @category Physics
 */

import {
  AmbientLight,
  AssetType,
  BoxColliderShape,
  Camera,
  Collider,
  Color,
  DirectLight,
  DynamicCollider,
  Entity,
  FixedJoint,
  Font,
  HingeJoint,
  MeshRenderer,
  PBRMaterial,
  PointerButton,
  PrimitiveMesh,
  Quaternion,
  Ray,
  Script,
  ShadowCascadesMode,
  ShadowMode,
  ShadowResolution,
  SphereColliderShape,
  SpringJoint,
  TextRenderer,
  Vector3,
  WebGLEngine
} from "oasis-engine";

import {PhysXPhysics} from "@oasis-engine/physics-physx";

function createText(
  rootEntity: Entity,
  pos: Vector3,
  fontSize: number,
): void {
  // Create text entity
  const entity = rootEntity.createChild("text");
  entity.transform.position = pos;
  // Add text renderer for text entity
  const renderer = entity.addComponent(TextRenderer);
  // Set text color
  renderer.color = new Color();
  // Set text to render
  renderer.text = "Click Mouse to Shoot balls";
  // Set font with font family
  renderer.font = Font.createFromOS(entity.engine, "Arial");
  // Set font size
  renderer.fontSize = fontSize;
}

function addBox(rootEntity: Entity, size: Vector3, position: Vector3, rotation: Quaternion): Entity {
  const mtl = new PBRMaterial(rootEntity.engine);
  mtl.baseColor.set(Math.random(), Math.random(), Math.random(), 1.0);
  mtl.roughness = 0.5;
  mtl.metallic = 0.0;
  const boxEntity = rootEntity.createChild();
  const renderer = boxEntity.addComponent(MeshRenderer);
  renderer.castShadows = true;
  renderer.receiveShadows = true;
  renderer.mesh = PrimitiveMesh.createCuboid(rootEntity.engine, size.x, size.y, size.z);
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

function createChain(rootEntity: Entity, position: Vector3, rotation: Quaternion, length: number, separation: number) {
  const offset = new Vector3();
  let prevCollider: Collider = null;
  for (let i = 0; i < length; i++) {
    const localPosition = new Vector3(0, -separation / 2 * (2 * i + 1), 0);
    const localQuaternion = new Quaternion();
    transform(position, rotation, localPosition, localQuaternion);
    const currentEntity = addBox(rootEntity, new Vector3(2.0, 2.0, 0.5), localPosition, localQuaternion);

    const currentCollider = currentEntity.getComponent(DynamicCollider);
    const fixedJoint = currentEntity.addComponent(FixedJoint);
    if (prevCollider !== null) {
      Vector3.subtract(currentEntity.transform.worldPosition, prevCollider.entity.transform.worldPosition, offset);
      fixedJoint.connectedAnchor = offset;
      fixedJoint.connectedCollider = prevCollider;
    } else {
      fixedJoint.connectedAnchor = position;
    }
    prevCollider = currentCollider;
  }
}

function createSpring(rootEntity: Entity, position: Vector3, rotation: Quaternion) {
  const currentEntity = addBox(rootEntity, new Vector3(2, 2, 1), position, rotation);
  const springJoint = currentEntity.addComponent(SpringJoint);
  springJoint.connectedAnchor = position;
  springJoint.swingOffset = new Vector3(0, 1, 0);
  springJoint.maxDistance = 2;
  springJoint.stiffness = 0.2;
  springJoint.damping = 1;
}

function createHinge(rootEntity: Entity, position: Vector3, rotation: Quaternion) {
  const currentEntity = addBox(rootEntity, new Vector3(4.0, 4.0, 0), position, rotation);
  const hingeJoint = currentEntity.addComponent(HingeJoint);
  hingeJoint.connectedAnchor = position;
  hingeJoint.swingOffset = new Vector3(0, 1, 0);
  hingeJoint.axis = new Vector3(0, 1, 0);
}

function addSphere(rootEntity: Entity, radius: number, position: Vector3, rotation: Quaternion, velocity: Vector3): Entity {
  const mtl = new PBRMaterial(rootEntity.engine);
  mtl.baseColor.set(Math.random(), Math.random(), Math.random(), 1.0);
  mtl.roughness = 0.5;
  mtl.metallic = 0.0;
  const sphereEntity = rootEntity.createChild();
  const renderer = sphereEntity.addComponent(MeshRenderer);
  renderer.castShadows = true;
  renderer.mesh = PrimitiveMesh.createSphere(rootEntity.engine, radius);
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
  ray = new Ray();
  position = new Vector3();
  rotation = new Quaternion();
  camera: Camera;

  onAwake() {
    this.camera = this.entity.getComponent(Camera);
  }

  onUpdate(deltaTime: number) {
    const ray = this.ray;
    const inputManager = this.engine.inputManager;
    if (inputManager.isPointerDown(PointerButton.Primary)) {
      this.camera.screenPointToRay(inputManager.pointerPosition, ray);
      ray.direction.scale(50);
      addSphere(this.entity, 0.5, this.position, this.rotation, ray.direction);
    }
  }
}

//----------------------------------------------------------------------------------------------------------------------
PhysXPhysics.initialize().then(() => {
  const engine = new WebGLEngine("canvas");
  engine.physicsManager.initialize(PhysXPhysics);

  engine.canvas.resizeByClientSize();
  const scene = engine.sceneManager.activeScene;
  const rootEntity = scene.createRootEntity("root");

  scene.ambientLight.diffuseSolidColor.set(0.5, 0.5, 0.5, 1);

  createText(rootEntity, new Vector3(-5, 5), 50);
  createChain(rootEntity, new Vector3(8.0, 10.0, 0.0), new Quaternion(), 10, 2.0);
  createSpring(rootEntity, new Vector3(-4.0, 4.0, 1.0), new Quaternion());
  createHinge(rootEntity, new Vector3(0, 0, 0), new Quaternion());

  // init camera
  const cameraEntity = rootEntity.createChild("camera");
  cameraEntity.addComponent(Camera);
  cameraEntity.transform.setPosition(3, 1, 22);
  cameraEntity.transform.lookAt(new Vector3(3, 1, 0));
  cameraEntity.addComponent(ShootScript);

  // init direct light
  const light = rootEntity.createChild("light");
  light.transform.setPosition(-10, 10, 10);
  light.transform.lookAt(new Vector3());
  const directLight = light.addComponent(DirectLight);
  directLight.intensity = 1;
  directLight.enableShadow = true;
  directLight.shadowStrength = 1;
  directLight.shadowBias = 0.5;
  directLight.shadowRadius = 0.5;

  engine.resourceManager
    .load<AmbientLight>({
      type: AssetType.Env,
      url: "https://gw.alipayobjects.com/os/bmw-prod/89c54544-1184-45a1-b0f5-c0b17e5c3e68.bin"
    })
    .then((ambientLight) => {
      scene.ambientLight = ambientLight;
      engine.run();
    });
});
