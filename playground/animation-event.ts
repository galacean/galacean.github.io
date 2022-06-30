/**
 * @title Animation Event
 * @category Animation
 */
import * as dat from "dat.gui";
import {
  AnimationClip,
  AnimationEvent,
  Animator,
  Camera,
  DirectLight,
  GLTFResource,
  Logger,
  Script,
  SystemInfo,
  Vector3,
  WebGLEngine
} from "oasis-engine";
import { OrbitControl } from "oasis-engine-toolkit";
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
  .then((gltfResource) => {
    const { animations, defaultSceneRoot } = gltfResource;
    const animator = defaultSceneRoot.getComponent(Animator);
    defaultSceneRoot.addComponent(EventHandlerScript);

    if (animations) {
      animations.forEach((clip: AnimationClip) => {
        if (clip.name === "run") {
          const event = new AnimationEvent();
          event.functionName = "event0";
          event.time = 0.5;
          clip.addEvent(event);

          const event2 = new AnimationEvent();
          event2.functionName = "event1";
          event2.time = clip.length;
          clip.addEvent(event2);
        }
      });
    }
    rootEntity.addChild(defaultSceneRoot);
    animator.play("run", 0);

    const debugInfo = {
      speed: 1
    };

    gui.add(debugInfo, "speed", -1, 1).onChange((v) => {
      animator.speed = v;
    });
  });

engine.run();

class EventHandlerScript extends Script {
  event0(): void {
    console.log("event0 called");
  }

  event1(): void {
    console.log("event1 called");
  }
}
