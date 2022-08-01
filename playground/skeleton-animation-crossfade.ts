/**
 * @title Animation CrossFade
 * @category Animation
 */
import { OrbitControl } from "@oasis-engine-toolkit/controls";
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
  GLTFResource
} from "oasis-engine";
import * as dat from "dat.gui";

const gui = new dat.GUI();

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
lightNode.addComponent(DirectLight) .intensity = 0.6;
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
    let animationNames = [];
    if (animations) {
      animations.forEach((clip: AnimationClip) => {
        if (clip.name !== "sad_pose" && clip.name !== "sneak_pose") {
          animationNames.push(clip.name);
          const animatorState = animatorStateMachine.addState(clip.name);
          animatorState.clip = clip;
        }
      });
    }
    animator.play(animationNames[0]);

    rootEntity.addChild(defaultSceneRoot);

    const debugInfo = {
      animation: animationNames[0],
      crossFade: true,
      normalizedTransitionDuration: 0.5,
      normalizedTimeOffset: 0,
      speed: 1
    };

    gui.add(debugInfo, "animation", animationNames).onChange((v) => {
      const { crossFade, normalizedTransitionDuration, normalizedTimeOffset } = debugInfo;
      if (crossFade) {
        animator.crossFade(v, normalizedTransitionDuration, 0, normalizedTimeOffset);
      } else {
        animator.play(v);
      }
    });

    gui.add(debugInfo, "crossFade");
    gui.add(debugInfo, "normalizedTransitionDuration", 0, 1).name("过渡时间");
    gui.add(debugInfo, "normalizedTimeOffset", 0, 1).name("偏移时间");
    gui.add(debugInfo, "speed", -1, 1).onChange((v) => {
      animator.speed = v
    });
  });

engine.run();
