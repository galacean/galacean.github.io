/**
 * @title AnimatorTransition
 * @category Animation
 */
import { OrbitControl } from "@oasis-engine/controls";
import {
  Animator,
  AnimatorController,
  AnimatorControllerLayer,
  AnimatorStateMachine,
  Camera,
  DirectLight,
  Logger,
  SystemInfo,
  Vector3,
  WebGLEngine,
  AnimationClip,
  GLTFResource,
  AnimatorStateTransition,
  AnimatorState,
  AnimatorConditionMode
} from "oasis-engine";

Logger.enable();
const engine = new WebGLEngine("canvas");
engine.canvas.width = window.innerWidth * SystemInfo.devicePixelRatio;
engine.canvas.height = window.innerHeight * SystemInfo.devicePixelRatio;
const scene = engine.sceneManager.activeScene;
const rootEntity = scene.createRootEntity();

// camera
const cameraEntity = rootEntity.createChild("camera_node");
cameraEntity.transform.position = new Vector3(0, 1, 5);
cameraEntity.addComponent(Camera);
cameraEntity.addComponent(OrbitControl).target = new Vector3(0, 1, 0);

const lightNode = rootEntity.createChild("light_node");
lightNode.addComponent(DirectLight).intensity = 0.6;
lightNode.transform.lookAt(new Vector3(0, 0, 1));
lightNode.transform.rotate(new Vector3(0, 90, 0));

engine.resourceManager
  .load<GLTFResource>("https://gw.alipayobjects.com/os/bmw-prod/5e3c1e4e-496e-45f8-8e05-f89f2bd5e4a4.glb")
  .then((asset) => {
    const { animations, defaultSceneRoot } = asset;

    const animator = defaultSceneRoot.getComponent(Animator);
    const animatorController = new AnimatorController();
    const layer = new AnimatorControllerLayer("layer");
    const animatorStateMachine = new AnimatorStateMachine();
    animatorController.addLayer(layer);
    animator.animatorController = animatorController;
    layer.stateMachine = animatorStateMachine;
    let walkState: AnimatorState, runState: AnimatorState;
    animations.forEach((clip: AnimationClip) => {
      const animatorState = animatorStateMachine.addState(clip.name);
      animatorState.clip = clip;
      if (clip.name === "walk") {
        walkState = animatorState;
      }
      if (clip.name === "run") {
        runState = animatorState;
      }
    });

    animatorController.addParameter('test', 0)

    const transition = new AnimatorStateTransition();
    transition.duration = 1;
    transition.offset = 0;
    transition.exitTime = 0.5;
    transition.destinationState = runState;
    transition.addCondition(AnimatorConditionMode.Equals, 'test', 1);
    transition.solo = true;
    walkState.addTransition(transition);
    const transition2 = new AnimatorStateTransition();
    transition2.duration = 1;
    transition2.offset = 0;
    transition2.exitTime = 0.5;
    transition2.destinationState = runState;
    transition2.addCondition(AnimatorConditionMode.Equals, 'test', 0);
    walkState.addTransition(transition2);

    setTimeout(() => {
      animatorController.setParameter('test', 1)
    }, 3000);

    animator.play("walk");
    rootEntity.addChild(defaultSceneRoot);
  });

engine.run();

