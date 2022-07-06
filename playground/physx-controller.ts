/**
 * @title PhysX Character Controller
 * @category Physics
 */

import {OrbitControl} from "@oasis-engine/controls";
import {
  AmbientLight,
  AnimationClip,
  Animator,
  AnimatorController,
  AnimatorControllerLayer,
  AnimatorStateMachine,
  AssetType,
  BackgroundMode,
  BoxColliderShape,
  Camera,
  CapsuleColliderShape,
  CharacterController,
  ControllerCollisionFlag,
  DirectLight,
  Entity,
  GLTFResource,
  InputManager,
  Keys,
  Logger,
  Matrix,
  MeshRenderer,
  PBRMaterial,
  PlaneColliderShape,
  PrimitiveMesh,
  Quaternion,
  RenderFace,
  Script,
  SkyBoxMaterial,
  StaticCollider,
  SystemInfo,
  Texture2D,
  Vector2,
  Vector3,
  WebGLEngine
} from "oasis-engine";
import {PhysXPhysics} from "@oasis-engine/physics-physx";

Logger.enable();

type State = "Run" | "Idle" | "Jump_In" | "Fall" | "Landing";

class AnimationState {
  private _state: State = "Idle";
  private _lastKey: Keys = null;

  get state(): State {
    return this._state;
  }

  setMoveKey(value: Keys) {
    this._lastKey = value;
    if (this._state === "Fall" || this._state === "Jump_In") {
      return;
    }

    if (this._lastKey === null && (this._state === "Run" || this._state === "Idle")) {
      this._state = "Idle"
    } else {
      this._state = "Run";
    }
  }

  setJumpKey() {
    this._state = "Jump_In";
  }

  setFallKey() {
    this._state = "Fall";
  }

  setIdleKey() {
    if (this._state == "Jump_In") {
      return;
    }

    if (this._state === "Fall") {
      this._state = "Landing";
    }

    if (this._state === "Landing") {
      this._state = "Idle";
    }
  }
}

InputManager.prototype.isKeyHeldDown = function (key?: Keys): boolean {
  if (key === undefined) {
    return this._keyboardManager._curFrameHeldDownList.length > 0;
  } else {
    return this._keyboardManager._curHeldDownKeyToIndexMap[key] != null;
  }
}

class ControllerScript extends Script {
  _camera: Entity;
  _character: Entity;
  _controller: CharacterController;
  _animator: Animator;

  _displacement = new Vector3();
  _forward = new Vector3();
  _cross = new Vector3();
  _lastKey = true;

  _predictPosition = new Vector3();
  _rotMat = new Matrix();
  _rotation = new Quaternion();
  _newRotation = new Quaternion();

  _animationState = new AnimationState();
  _animationName: State;
  _fallAccumulateTime = 0;

  onAwake() {
    this._controller = this.entity.getComponent(CharacterController);
  }

  targetCamera(camera: Entity) {
    this._camera = camera;
  }

  targetCharacter(character: Entity) {
    this._character = character;
    this._animator = character.getComponent(Animator);
  }

  onUpdate(deltaTime: number) {
    const inputManager = this.engine.inputManager;
    if (inputManager.isKeyHeldDown()) {
      this._camera.transform.getWorldForward(this._forward);
      this._forward.y = 0;
      this._forward.normalize();
      this._cross.set(this._forward.z, 0, -this._forward.x);

      const animationSpeed: number = 0.02;
      const animationState = this._animationState;
      const displacement = this._displacement;
      if (inputManager.isKeyHeldDown(Keys.KeyW)) {
        animationState.setMoveKey(Keys.KeyW);
        Vector3.scale(this._forward, animationSpeed, displacement);
      }
      if (inputManager.isKeyHeldDown(Keys.KeyS)) {
        animationState.setMoveKey(Keys.KeyS);
        Vector3.scale(this._forward, -animationSpeed, displacement);
      }
      if (inputManager.isKeyHeldDown(Keys.KeyA)) {
        animationState.setMoveKey(Keys.KeyA);
        Vector3.scale(this._cross, animationSpeed, displacement);
      }
      if (inputManager.isKeyHeldDown(Keys.KeyD)) {
        animationState.setMoveKey(Keys.KeyD);
        Vector3.scale(this._cross, -animationSpeed, displacement);
      }
      if (inputManager.isKeyDown(Keys.Space)) {
        animationState.setJumpKey();
        displacement.set(0, 0.3, 0);
      }
    } else {
      this._animationState.setMoveKey(null);
      this._displacement.set(0, 0, 0);
    }
    this._playAnimation();
  }

  onPhysicsUpdate() {
    const physicsManager = this.engine.physicsManager;
    const gravity = physicsManager.gravity;
    const fixedTimeStep = physicsManager.fixedTimeStep;
    this._fallAccumulateTime += fixedTimeStep;
    const character = this._controller;
    character.move(this._displacement, 0.0001, fixedTimeStep);

    const flag = character.move(new Vector3(0, gravity.y * fixedTimeStep * this._fallAccumulateTime, 0), 0.0001, fixedTimeStep)
    if (flag & ControllerCollisionFlag.Down) {
      this._fallAccumulateTime = 0;
      this._animationState.setIdleKey();
    } else {
      this._animationState.setFallKey();
    }
    this._playAnimation();

    if (this._displacement.x != 0 || this._displacement.z != 0) {
      this._predictPosition.copyFrom(this._character.transform.worldPosition);
      this._predictPosition.subtract(this._displacement);
      Matrix.lookAt(this._character.transform.worldPosition, this._predictPosition, new Vector3(0, 1, 0), this._rotMat);
      this._rotMat.getRotation(this._rotation).invert();
      const currentRot = this._character.transform.rotationQuaternion;
      Quaternion.slerp(currentRot, this._rotation, 0.1, this._newRotation);
      this._character.transform.rotationQuaternion = this._newRotation;
    }
  }

  _playAnimation() {
    if (this._animationName !== this._animationState.state) {
      this._animator.crossFade(this._animationState.state, 0.1);
      this._animationName = this._animationState.state;
    }
  }
}

PhysXPhysics.initialize().then(() => {
  const engine = new WebGLEngine("canvas");
  engine.physicsManager.initialize(PhysXPhysics);
  engine.canvas.width = window.innerWidth * SystemInfo.devicePixelRatio;
  engine.canvas.height = window.innerHeight * SystemInfo.devicePixelRatio;
  const scene = engine.sceneManager.activeScene;
  const {background} = scene;
  const rootEntity = scene.createRootEntity();

  // camera
  const cameraEntity = rootEntity.createChild("camera_node");
  cameraEntity.transform.position.set(4, 4, -4);
  cameraEntity.addComponent(Camera);
  cameraEntity.addComponent(OrbitControl);

  const lightNode = rootEntity.createChild("light_node");
  lightNode.transform.setPosition(10, 10, 10);
  lightNode.transform.lookAt(new Vector3(0, 0, 0));
  lightNode.addComponent(DirectLight);

  // Create sky
  const sky = background.sky;
  const skyMaterial = new SkyBoxMaterial(engine);
  background.mode = BackgroundMode.Sky;
  sky.material = skyMaterial;
  sky.mesh = PrimitiveMesh.createCuboid(engine, 1, 1, 1);

  function addPlane(size: Vector2, position: Vector3, rotation: Quaternion): Entity {
    const mtl = new PBRMaterial(engine);
    mtl.baseColor.set(0.03179807202597362, 0.3939682161541871, 0.41177952549087604, 1);
    mtl.renderFace = RenderFace.Double;
    const planeEntity = rootEntity.createChild();

    const renderer = planeEntity.addComponent(MeshRenderer);
    renderer.mesh = PrimitiveMesh.createPlane(engine, size.x, size.y);
    renderer.setMaterial(mtl);
    planeEntity.transform.position = position;
    planeEntity.transform.rotationQuaternion = rotation;

    const physicsPlane = new PlaneColliderShape();
    physicsPlane.isTrigger = false;
    const planeCollider = planeEntity.addComponent(StaticCollider);
    planeCollider.addShape(physicsPlane);

    return planeEntity;
  }

  addPlane(new Vector2(10, 6), new Vector3(), new Quaternion);

  function addBox(size: Vector3, position: Vector3, rotation: Quaternion): Entity {
    const mtl = new PBRMaterial(engine);
    mtl.roughness = 0;
    mtl.baseColor.set(1, 1, 0, 1.0);
    const boxEntity = rootEntity.createChild();
    const renderer = boxEntity.addComponent(MeshRenderer);

    renderer.mesh = PrimitiveMesh.createCuboid(engine, size.x, size.y, size.z);
    renderer.setMaterial(mtl);
    boxEntity.transform.position = position;
    boxEntity.transform.rotationQuaternion = rotation;

    const physicsBox = new BoxColliderShape();
    physicsBox.size = size;
    physicsBox.isTrigger = false;
    const boxCollider = boxEntity.addComponent(StaticCollider);
    boxCollider.addShape(physicsBox);

    return boxEntity;
  }

  const slope = new Quaternion();
  Quaternion.rotationEuler(45, 0, 0, slope);
  addBox(new Vector3(4, 4, 0.01), new Vector3(0, 0, 1), slope.normalize());

  function addStair(size: Vector3, position: Vector3, rotation: Quaternion): Entity {
    const mtl = new PBRMaterial(engine);
    mtl.roughness = 0.5;
    mtl.baseColor.set(0.9, 0.9, 0.9, 1.0);
    const mesh = PrimitiveMesh.createCuboid(engine, size.x, size.y, size.z);

    const stairEntity = rootEntity.createChild();
    stairEntity.transform.position = position;
    stairEntity.transform.rotationQuaternion = rotation;
    const boxCollider = stairEntity.addComponent(StaticCollider);
    {
      const level = stairEntity.createChild();
      const renderer = level.addComponent(MeshRenderer);
      renderer.mesh = mesh;
      renderer.setMaterial(mtl);
      const physicsBox = new BoxColliderShape();
      physicsBox.size = size;
      boxCollider.addShape(physicsBox);
    }

    {
      const level = stairEntity.createChild();
      level.transform.setPosition(0, 0.3, 0.5)
      const renderer = level.addComponent(MeshRenderer);
      renderer.mesh = mesh;
      renderer.setMaterial(mtl);
      const physicsBox = new BoxColliderShape();
      physicsBox.size = size;
      physicsBox.setPosition(0, 0.3, 0.5)
      boxCollider.addShape(physicsBox);
    }

    {
      const level = stairEntity.createChild();
      level.transform.setPosition(0, 0.6, 1)
      const renderer = level.addComponent(MeshRenderer);
      renderer.mesh = mesh;
      renderer.setMaterial(mtl);
      const physicsBox = new BoxColliderShape();
      physicsBox.size = size;
      physicsBox.setPosition(0, 0.6, 1)
      boxCollider.addShape(physicsBox);
    }

    {
      const level = stairEntity.createChild();
      level.transform.setPosition(0, 0.9, 1.5)
      const renderer = level.addComponent(MeshRenderer);
      renderer.mesh = mesh;
      renderer.setMaterial(mtl);
      const physicsBox = new BoxColliderShape();
      physicsBox.size = size;
      physicsBox.setPosition(0, 0.9, 1.5)
      boxCollider.addShape(physicsBox);
    }
    return stairEntity;
  }

  addStair(new Vector3(1, 0.3, 0.5), new Vector3(3, 0, 1), new Quaternion());

  engine.resourceManager
    .load<AmbientLight>({
      type: AssetType.Env,
      url: "https://gw.alipayobjects.com/os/bmw-prod/09904c03-0d23-4834-aa73-64e11e2287b0.bin"
    })
    .then((ambientLight) => {
      scene.ambientLight = ambientLight;
      skyMaterial.textureCubeMap = ambientLight.specularTexture;
      skyMaterial.textureDecodeRGBM = true;
    })

  engine.resourceManager
    .load<GLTFResource>("https://gw.alipayobjects.com/os/OasisHub/440001585/5407/Doggy_Demo.gltf")
    .then((asset) => {
      const {defaultSceneRoot} = asset;
      const controllerEntity = rootEntity.createChild("controller");
      controllerEntity.addChild(defaultSceneRoot);

      // animator
      defaultSceneRoot.transform.setPosition(0, -0.35, 0);
      const animator = defaultSceneRoot.addComponent(Animator);
      const animatorController = new AnimatorController();
      const layer = new AnimatorControllerLayer("layer");
      const animatorStateMachine = new AnimatorStateMachine();
      animatorController.addLayer(layer);
      animator.animatorController = animatorController;
      layer.stateMachine = animatorStateMachine;

      // controller
      const physicsCapsule = new CapsuleColliderShape();
      physicsCapsule.radius = 0.2;
      physicsCapsule.height = 0.1;
      const characterController = controllerEntity.addComponent(CharacterController);
      characterController.addShape(physicsCapsule);
      const userController = controllerEntity.addComponent(ControllerScript);
      userController.targetCamera(cameraEntity);
      userController.targetCharacter(defaultSceneRoot);

      engine.resourceManager
        .load<Texture2D>("https://gw.alipayobjects.com/zos/OasisHub/440001585/6990/T_Doggy_1_diffuse.png")
        .then((res) => {
          const materials = asset.materials;
          for (let i = 0, n = materials.length; i < n; i++) {
            const material = materials[i];
            (<PBRMaterial>material).baseTexture = res;
          }
        });
      engine.resourceManager
        .load<Texture2D>("https://gw.alipayobjects.com/zos/OasisHub/440001585/3072/T_Doggy_normal.png")
        .then((res) => {
          const materials = asset.materials;
          for (let i = 0, n = materials.length; i < n; i++) {
            const material = materials[i];
            (<PBRMaterial>material).normalTexture = res;
          }
        });
      engine.resourceManager
        .load<Texture2D>("https://gw.alipayobjects.com/zos/OasisHub/440001585/5917/T_Doggy_roughness.png")
        .then((res) => {
          const materials = asset.materials;
          for (let i = 0, n = materials.length; i < n; i++) {
            const material = materials[i];
            (<PBRMaterial>material).roughnessMetallicTexture = res;
          }
        });
      engine.resourceManager
        .load<Texture2D>("https://gw.alipayobjects.com/zos/OasisHub/440001585/2547/T_Doggy_1_ao.png")
        .then((res) => {
          const materials = asset.materials;
          for (let i = 0, n = materials.length; i < n; i++) {
            const material = materials[i];
            (<PBRMaterial>material).occlusionTexture = res;
          }
        });
      engine.resourceManager
        .load<GLTFResource>("https://gw.alipayobjects.com/os/OasisHub/440001585/7205/Anim_Run.gltf")
        .then((res) => {
          const animations = res.animations;
          if (animations) {
            animations.forEach((clip: AnimationClip) => {
              const animatorState = animatorStateMachine.addState(clip.name);
              animatorState.clip = clip;
            });
          }
        });
      engine.resourceManager
        .load<GLTFResource>("https://gw.alipayobjects.com/os/OasisHub/440001585/3380/Anim_Idle.gltf")
        .then((res) => {
          const animations = res.animations;
          if (animations) {
            animations.forEach((clip: AnimationClip) => {
              const animatorState = animatorStateMachine.addState(clip.name);
              animatorState.clip = clip;
            });
          }
          animator.play("Idle");
        });
      engine.resourceManager
        .load<GLTFResource>("https://gw.alipayobjects.com/os/OasisHub/440001585/5703/Anim_Landing.gltf")
        .then((res) => {
          const animations = res.animations;
          if (animations) {
            animations.forEach((clip: AnimationClip) => {
              const animatorState = animatorStateMachine.addState(clip.name);
              animatorState.clip = clip;
            });
          }
        });
      engine.resourceManager
        .load<GLTFResource>("https://gw.alipayobjects.com/os/OasisHub/440001585/3275/Anim_Fall.gltf")
        .then((res) => {
          const animations = res.animations;
          if (animations) {
            animations.forEach((clip: AnimationClip) => {
              const animatorState = animatorStateMachine.addState(clip.name);
              animatorState.clip = clip;
            });
          }
        });
      engine.resourceManager
        .load<GLTFResource>("https://gw.alipayobjects.com/os/OasisHub/440001585/2749/Anim_Jump_In.gltf")
        .then((res) => {
          const animations = res.animations;
          if (animations) {
            animations.forEach((clip: AnimationClip) => {
              const animatorState = animatorStateMachine.addState(clip.name);
              animatorState.clip = clip;
            });
          }
        });
    });

  engine.run();
});
