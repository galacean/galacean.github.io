/**
 * @title PhysX Attractor
 * @category Physics
 */

import {
  BlinnPhongMaterial,
  Camera, DirectLight,
  DynamicCollider,
  Entity,
  Layer,
  MathUtil,
  MeshRenderer,
  PlaneColliderShape,
  PointLight,
  PrimitiveMesh,
  Quaternion,
  Ray,
  RenderFace,
  Script,
  SphereColliderShape,
  StaticCollider,
  Vector2,
  Vector3,
  WebGLEngine,
} from "oasis-engine";

import {PhysXPhysics} from "@oasis-engine/physics-physx";

class Attractor extends Script {
  private collider: DynamicCollider;
  private force: Vector3 = new Vector3();

  onAwake() {
    this.collider = this.entity.getComponent(DynamicCollider)
  }

  onPhysicsUpdate() {
    this.entity.transform.worldPosition.cloneTo(this.force);
    this.collider.applyForce(this.force.normalize().scale(-10));
  }
}


PhysXPhysics.initialize().then(() => {
  const engine = new WebGLEngine("canvas");
  engine.physicsManager.initialize(PhysXPhysics);

  engine.canvas.resizeByClientSize();
  const scene = engine.sceneManager.activeScene;
  const rootEntity = scene.createRootEntity();

  // init camera
  const cameraEntity = rootEntity.createChild("camera");
  const camera = cameraEntity.addComponent(Camera);
  const pos = cameraEntity.transform.position;
  pos.setValue(0, 0, -15);
  cameraEntity.transform.position = pos;
  cameraEntity.transform.lookAt(new Vector3());

  // init light
  scene.ambientLight.diffuseSolidColor.setValue(1, 1, 1, 1);

  const light = rootEntity.createChild("light");
  light.transform.position = new Vector3(0, 0, 0);
  const p = light.addComponent(PointLight);
  p.intensity = 0.3;

  {
    const attractorEntity = rootEntity.createChild();
    const mtl = new BlinnPhongMaterial(engine);
    mtl.baseColor.setValue(1, 1, 1, 1.0);
    const renderer = attractorEntity.addComponent(MeshRenderer);
    renderer.mesh = PrimitiveMesh.createSphere(engine, 2);
    // renderer.setMaterial(mtl);

    const attractorSphere = new SphereColliderShape();
    attractorSphere.radius = 2;
    const attractorCollider = attractorEntity.addComponent(DynamicCollider);
    attractorCollider.isKinematic = true;
    attractorCollider.addShape(attractorSphere);
    window.addEventListener("mousemove", (event: MouseEvent) => {
      const ray = new Ray();
      camera.screenPointToRay(
        new Vector2(event.pageX * window.devicePixelRatio, event.pageY * window.devicePixelRatio), ray);

      const position = attractorEntity.transform.position;
      ray.origin.cloneTo(position);
      position.add(ray.direction.scale(18));
      attractorEntity.transform.position = position;
    });
  }


  engine.physicsManager.gravity = new Vector3();
  init();
  engine.run();

  //--------------------------------------------------------------------------------------------------------------------
  // init scene
  function init() {
    addPlane(new Vector3(0, -8, 0), new Quaternion);
    const quat180 = new Quaternion;
    quat180.rotateZ(MathUtil.degreeToRadian(180));
    addPlane(new Vector3(0, 8, 0), quat180);

    const quat90 = new Quaternion;
    quat90.rotateZ(MathUtil.degreeToRadian(90));
    addPlane(new Vector3(10, 0, 0), quat90);

    const quatNega90 = new Quaternion;
    quatNega90.rotateZ(MathUtil.degreeToRadian(-90));
    addPlane(new Vector3(-10, 0, 0), quatNega90);

    const quatFront90 = new Quaternion;
    quatFront90.rotateX(MathUtil.degreeToRadian(-90));
    addPlane(new Vector3(0, 0, 20), quatFront90);

    const quatNegaFront90 = new Quaternion;
    quatNegaFront90.rotateX(MathUtil.degreeToRadian(90));
    addPlane(new Vector3(0, 0, 0), quatNegaFront90);

    const quat = new Quaternion(0, 0, 0.3, 0.7);
    quat.normalize();
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        for (let k = 0; k < 4; k++) {
          addSphere(1, new Vector3(
            -4 + 2 * i,
            -4 + 2 * j,
            -4 + 2 * k
          ), quat);
        }
      }
    }
  }

  function addPlane(position: Vector3, rotation: Quaternion): Entity {
    const mtl = new BlinnPhongMaterial(engine);
    mtl.baseColor.setValue(0.03179807202597362, 0.3939682161541871, 0.41177952549087604, 1);
    mtl.renderFace = RenderFace.Double;
    const planeEntity = rootEntity.createChild();
    planeEntity.layer = Layer.Layer1;

    const renderer = planeEntity.addComponent(MeshRenderer);
    renderer.mesh = PrimitiveMesh.createPlane(engine, 10, 10);
    // renderer.setMaterial(mtl);
    planeEntity.transform.position = position;
    planeEntity.transform.rotationQuaternion = rotation;

    const physicsPlane = new PlaneColliderShape();
    const planeCollider = planeEntity.addComponent(StaticCollider);
    planeCollider.addShape(physicsPlane);

    return planeEntity;
  }

  function addSphere(radius: number, position: Vector3, rotation: Quaternion): Entity {
    const mtl = new BlinnPhongMaterial(engine);
    mtl.baseColor.setValue(227/255, 168/255, 196/255, 1.0);
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
    sphereCollider.linearDamping = 0.95;
    sphereCollider.angularDamping = 0.2;
    sphereEntity.addComponent(Attractor);
    return sphereEntity;
  }
});
