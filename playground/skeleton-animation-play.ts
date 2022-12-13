/**
 * @title Animation Play
 * @category Animation
 */
import * as dat from "dat.gui";
import { Animator, Camera, DirectLight, GLTFResource, Logger, SystemInfo, Vector3, WebGLEngine } from "oasis-engine";
import { OrbitControl } from "@oasis-engine-toolkit/controls";
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
    const { animations = [], defaultSceneRoot } = gltfResource;
    rootEntity.addChild(defaultSceneRoot);
    const animator = defaultSceneRoot.getComponent(Animator);
    animator.play('agree');

    initDatGUI(animator, animations);
  });

engine.run();


const initDatGUI = (animator, animations) => {
  const animationNames = animations.filter((clip) => !clip.name.includes("pose")).map((clip) => clip.name);
  const debugInfo = {
    animation: animationNames[0],
    speed: 1
  };

  gui.add(debugInfo, "animation", animationNames).onChange((v) => {
    animator.play(v);
  });

  gui.add(debugInfo, "speed", -1, 1).onChange((v) => {
    animator.speed = v;
  });
}

// @ts-ignore for e2e test
window.cypressEnv = {
  engine,
}
