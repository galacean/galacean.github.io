/**
 * @title Animation Additive
 * @category Animation
 */
import { OrbitControl } from "@oasis-engine/controls";
import {
  AnimationClip,
  Animator,
  AnimatorController,
  AnimatorControllerLayer,
  AnimatorLayerBlendingMode,
  AnimatorStateMachine,
  Camera,
  DirectLight,
  GLTFResource,
  Logger,
  SystemInfo,
  Vector3,
  WebGLEngine
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
lightNode.addComponent(DirectLight).intensity = 0.6;
lightNode.transform.lookAt(new Vector3(0, 0, 1));
lightNode.transform.rotate(new Vector3(0, 90, 0));

engine.resourceManager
  .load<GLTFResource>("https://gw.alipayobjects.com/os/bmw-prod/5e3c1e4e-496e-45f8-8e05-f89f2bd5e4a4.glb")
  .then((asset) => {
    const { animations, defaultSceneRoot } = asset;
    const animator = defaultSceneRoot.getComponent(Animator)
    const animatorController = new AnimatorController();
    const layer = new AnimatorControllerLayer("layer");
    const layer1 = new AnimatorControllerLayer("layer1");
    const animatorStateMachine = new AnimatorStateMachine();
    const animatorStateMachine1 = new AnimatorStateMachine();
    animatorController.addLayer(layer);
    animatorController.addLayer(layer1);
    animator.animatorController = animatorController;
    layer.stateMachine = animatorStateMachine;
    layer1.stateMachine = animatorStateMachine1;
    layer1.blendingMode = AnimatorLayerBlendingMode.Additive;

    let animationNames = [];
    let animationNames2 = [];

    if (animations) {
      animations.forEach((clip: AnimationClip) => {
        if (clip.name.includes("pose")) {
          const animatorState2 = animatorStateMachine1.addState(clip.name);
          animatorState2.clip = clip;
          animatorState2.clipStartTime = 1;
          animationNames2.push(clip.name);
        } else {
          const animatorState = animatorStateMachine.addState(clip.name);
          animatorState.clip = clip;
          animationNames.push(clip.name);
        }
      });
    }
    rootEntity.addChild(defaultSceneRoot);
    animator.play(animationNames[0], 0);
    animator.play(animationNames2[1], 1);

    const debugInfo = {
      animation: animationNames[0],
      additive_pose: animationNames2[1],
      additive_weight: 1,
      speed: 1
    };

    gui.add(debugInfo, "animation", animationNames).onChange((v) => {
      animator.play(v, 0);
    });

    gui.add(debugInfo, "additive_pose", animationNames2).onChange((v) => {
      animator.play(v, 1);
    });

    gui.add(debugInfo, "additive_weight", 0, 1).onChange((v) => {
      layer1.weight = v;
    });

    gui.add(debugInfo, "speed", -1, 1).onChange((v) => {
      animator.speed = v
    });
  });

engine.run();
