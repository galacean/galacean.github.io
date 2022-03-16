/**
 * @title PhysX Raycast
 * @category Physics
 */

import {
  BlinnPhongMaterial,
  BoxColliderShape,
  Camera,
  CapsuleColliderShape,
  Entity,
  HitResult,
  Layer,
  MeshRenderer,
  PlaneColliderShape,
  PointLight,
  PrimitiveMesh,
  Ray,
  SphereColliderShape,
  StaticCollider,
  DynamicCollider,
  WebGLEngine,
  Quaternion,
  Vector2,
  Vector3
} from "oasis-engine";
import { OrbitControl } from "@oasis-engine/controls";

import { PhysXPhysics } from "@oasis-engine/physics-physx";

PhysXPhysics.init().then(() => {
  const engine = new WebGLEngine("canvas", PhysXPhysics);

  engine.canvas.resizeByClientSize();
  const scene = engine.sceneManager.activeScene;
  const rootEntity = scene.createRootEntity();

  // init camera
  const cameraEntity = rootEntity.createChild("camera");
  cameraEntity.addComponent(Camera);
  const pos = cameraEntity.transform.position;
  pos.setValue(20, 20, 20);
  cameraEntity.transform.position = pos;
  cameraEntity.addComponent(OrbitControl);

  // init light
  scene.ambientLight.diffuseSolidColor.setValue(1, 1, 1, 1);
  scene.ambientLight.diffuseIntensity = 1.2;

  const light = rootEntity.createChild("light");
  light.transform.position = new Vector3(0, 5, 0);
  const p = light.addComponent(PointLight);
  p.intensity = 0.3;

  init();

  window.addEventListener("mousedown", (event: MouseEvent) => {
    const ray = new Ray();
    cameraEntity.getComponent(Camera).screenPointToRay(
      new Vector2(event.pageX * window.devicePixelRatio, event.pageY * window.devicePixelRatio), ray);

    const hit = new HitResult();
    const result = engine.physicsManager.raycast(ray, Number.MAX_VALUE, Layer.Layer0, hit);
    if (result) {
      const mtl = new BlinnPhongMaterial(engine);
      const color = mtl.baseColor;
      color.r = Math.random();
      color.g = Math.random();
      color.b = Math.random();
      color.a = 1.0;

      const meshes: MeshRenderer[] = [];
      hit.entity.getComponentsIncludeChildren(MeshRenderer, meshes);
      meshes.forEach((mesh: MeshRenderer) => {
        mesh.setMaterial(mtl);
      });
    }
  });

  window.addEventListener("mousedown", (event: MouseEvent) => {
    const quat = new Quaternion(0, 0, 0.3, 0.7);
    quat.normalize();
    if (event.button === 2) {
      if (Math.random() > 0.5) {
        addSphere(0.5, new Vector3(
          Math.floor(Math.random() * 6) - 2.5,
          5,
          Math.floor(Math.random() * 6) - 2.5
        ), quat);
      } else {
        addCapsule(0.5, 2.0, new Vector3(
          Math.floor(Math.random() * 6) - 2.5,
          5,
          Math.floor(Math.random() * 6) - 2.5
        ), quat);
      }
    }
  });

  engine.run();

  //--------------------------------------------------------------------------------------------------------------------
  // init scene
  function init() {
    const quat = new Quaternion(0, 0, 0.3, 0.7);
    quat.normalize();
    addPlane(new Vector3(30, 0.1, 30), new Vector3, new Quaternion);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 8; i++) {
      // eslint-disable-next-line no-plusplus
      for (let j = 0; j < 8; j++) {
        const random = Math.floor(Math.random() * 3) % 3;
        switch (random) {
          case 0:
            addBox(new Vector3(1, 1, 1), new Vector3(
              -2.5 + i + 0.1 * i,
              Math.floor(Math.random() * 6) + 1,
              -2.5 + j + 0.1 * j
            ), quat);
            break;
          case 1:
            addSphere(0.5, new Vector3(
              Math.floor(Math.random() * 16) - 2.5,
              5,
              Math.floor(Math.random() * 16) - 2.5
            ), quat);
            break;
          case 2:
            addCapsule(0.5, 2.0, new Vector3(
              Math.floor(Math.random() * 16) - 2.5,
              5,
              Math.floor(Math.random() * 16) - 2.5
            ), quat);
            break;
          default:
            break;
        }


      }
    }
  }

  //--------------------------------------------------------------------------------------------------------------------
  function addPlane(size: Vector3, position: Vector3, rotation: Quaternion): Entity {
    const mtl = new BlinnPhongMaterial(engine);
    mtl.baseColor.setValue(0.03179807202597362, 0.3939682161541871, 0.41177952549087604, 1);
    const planeEntity = rootEntity.createChild();
    planeEntity.layer = Layer.Layer1;

    const renderer = planeEntity.addComponent(MeshRenderer);
    renderer.mesh = PrimitiveMesh.createCuboid(engine, size.x, size.y, size.z);
    renderer.setMaterial(mtl);
    planeEntity.transform.position = position;
    planeEntity.transform.rotationQuaternion = rotation;

    const physicsPlane = new PlaneColliderShape();
    physicsPlane.setPosition(0, size.y, 0);
    const planeCollider = planeEntity.addComponent(StaticCollider);
    planeCollider.addShape(physicsPlane);

    return planeEntity;
  }

  function addBox(size: Vector3, position: Vector3, rotation: Quaternion): Entity {
    const mtl = new BlinnPhongMaterial(engine);
    mtl.baseColor.setValue(Math.random(), Math.random(), Math.random(), 1.0);
    const boxEntity = rootEntity.createChild();
    const renderer = boxEntity.addComponent(MeshRenderer);

    renderer.mesh = PrimitiveMesh.createCuboid(engine, size.x, size.y, size.z);
    renderer.setMaterial(mtl);
    boxEntity.transform.position = position;
    boxEntity.transform.rotationQuaternion = rotation;

    const physicsBox = new BoxColliderShape();
    physicsBox.size = size;
    physicsBox.isTrigger = false;
    const boxCollider = boxEntity.addComponent(DynamicCollider);
    boxCollider.addShape(physicsBox);

    return boxEntity;
  }

  function addSphere(radius: number, position: Vector3, rotation: Quaternion): Entity {
    const mtl = new BlinnPhongMaterial(engine);
    mtl.baseColor.setValue(Math.random(), Math.random(), Math.random(), 1.0);
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

    return sphereEntity;
  }

  function addCapsule(radius: number, height: number, position: Vector3, rotation: Quaternion): Entity {
    const mtl = new BlinnPhongMaterial(engine);
    mtl.baseColor.setValue(Math.random(), Math.random(), Math.random(), 1.0);
    const capsuleEntity = rootEntity.createChild();
    const renderer = capsuleEntity.addComponent(MeshRenderer);

    renderer.mesh = PrimitiveMesh.createCapsule(engine, radius, height, 20)
    renderer.setMaterial(mtl);
    capsuleEntity.transform.position = position;
    capsuleEntity.transform.rotationQuaternion = rotation;

    const physicsCapsule = new CapsuleColliderShape();
    physicsCapsule.radius = radius;
    physicsCapsule.height = height;
    const capsuleCollider = capsuleEntity.addComponent(DynamicCollider);
    capsuleCollider.addShape(physicsCapsule);

    return capsuleEntity;
  }
});
