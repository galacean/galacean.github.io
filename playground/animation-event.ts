import { OrbitControl } from "@oasis-engine/controls";
import {
  Animator,
  Camera,
  DirectLight,
  Logger,
  SystemInfo,
  Vector3,
  WebGLEngine,
  AnimatorController,
  AnimatorControllerLayer,
  AnimatorStateMachine,
  AnimationClip,
  AnimationEvent,
  Script,
  GLTFResource
} from "oasis-engine";

Logger.enable();
const engine = new WebGLEngine("o3-demo");
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

class EventHandlerScript extends Script {
  test() {
    console.log("EventHandlerScript test triggered");
  }
}

class EventHandlerScript2 extends Script {
  test() {
    console.log("EventHandlerScript2 test triggered");
  }
}

engine.resourceManager
  .load<GLTFResource>("https://gw.alipayobjects.com/os/bmw-prod/5e3c1e4e-496e-45f8-8e05-f89f2bd5e4a4.glb")
  .then((asset) => {
    const { animations, defaultSceneRoot } = asset;
    const animator = defaultSceneRoot.addComponent(Animator);
    defaultSceneRoot.addComponent(EventHandlerScript);
    defaultSceneRoot.addComponent(EventHandlerScript2);
    const animatorController = new AnimatorController();
    const layer = new AnimatorControllerLayer("layer");
    const animatorStateMachine = new AnimatorStateMachine();
    layer.stateMachine = animatorStateMachine;
    animatorController.addLayer(layer);
    animator.animatorController = animatorController;

    if (animations) {
      animations.forEach((clip: AnimationClip) => {
        if (clip.name === "run") {
          const animatorState = animatorStateMachine.addState(clip.name);
          animatorState.clipStartTime = 0.1;
          animatorState.clip = clip;
          const event = new AnimationEvent();
          event.functionName = "test";
          event.time = 0.5;
          clip.addEvent(event);
        }
      });
    }
    rootEntity.addChild(defaultSceneRoot);
    animator.play("run", 0);
  });

engine.run();
