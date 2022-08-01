/**
 * @title AnimatorStateScript
 * @category Animation
 */
import {
  AnimationClip,
  Animator,
  Camera,
  DirectLight,
  GLTFResource,
  Logger,
  StateMachineScript,
  SystemInfo,
  Vector3,
  WebGLEngine
} from "oasis-engine";
import { OrbitControl } from "@oasis-engine-toolkit/controls";

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

class TestScript extends StateMachineScript {
  // onStateEnter is called when a transition starts and the state machine starts to evaluate this state
  onStateEnter(animator: Animator, stateInfo: any, layerIndex: number) {
    console.log("onStateEnter: ", stateInfo);
  }

  // onStateUpdate is called on each Update frame between onStateEnter and onStateExit callbacks
  onStateUpdate(animator: Animator, stateInfo: any, layerIndex: number) {
    console.log("onStateUpdate: ", stateInfo);
  }

  // onStateExit is called when a transition ends and the state machine finishes evaluating this state
  onStateExit(animator: Animator, stateInfo: any, layerIndex: number) {
    console.log("onStateExit: ", stateInfo);
  }
}

engine.resourceManager
  .load<GLTFResource>("https://gw.alipayobjects.com/os/bmw-prod/5e3c1e4e-496e-45f8-8e05-f89f2bd5e4a4.glb")
  .then((gltfResource) => {
    const { animations, defaultSceneRoot } = gltfResource;
    const animator = defaultSceneRoot.getComponent(Animator);
    const stateMachine = animator.animatorController.layers[0].stateMachine;

    setTimeout(() => {
      animator.crossFade("run", 0.5, 0, 0.1);
    }, 3000);

    if (animations) {
      animations.forEach((clip: AnimationClip) => {
        if (clip.name === "walk" || clip.name === "run") {
          const animatorState = stateMachine.findStateByName(clip.name);
          animatorState.addStateMachineScript(TestScript);
        }
      });
    }
    animator.play("walk");
    animator.speed = 1;
    rootEntity.addChild(defaultSceneRoot);
  });

engine.run();
