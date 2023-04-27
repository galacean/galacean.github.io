/**
 * @title Spine
 * @category Benchmark
 */
import {
  Camera,
  Logger,
  SystemInfo,
  Vector3,
  WebGLEngine,
  Entity,
} from "@galacean/engine";
import { SpineAnimation } from "@galacean/engine-spine";

const engine = new WebGLEngine("canvas");
engine.canvas.resizeByClientSize();
const scene = engine.sceneManager.activeScene;
const rootEntity = scene.createRootEntity();

// camera
const cameraEntity = rootEntity.createChild("camera_node");
const camera = cameraEntity.addComponent(Camera);
cameraEntity.transform.position = new Vector3(0, 0, 110);
camera.farClipPlane = 200;

engine.resourceManager
  .load({
    urls: [
      "https://gw.alipayobjects.com/os/OasisHub/a66ef194-6bc8-4325-9a59-6ea9097225b1/1620888427489.json",
      "https://gw.alipayobjects.com/os/OasisHub/a1e3e67b-a783-4832-ba1b-37a95bd55291/1620888427490.atlas",
      "https://gw.alipayobjects.com/zos/OasisHub/a3ca8f62-1068-43a5-bb64-5c9a0f823dde/1620888427490.png",
    ],
    type: "spine",
  })
  .then((spineEntity: Entity) => {
    for (let i = -5; i < 5; i++) {
      for (let j = -5; j < 5; j++) {
        const clone = spineEntity.clone();
        clone.transform.setPosition(8 * i, 8 * j, 0);
        rootEntity.addChild(clone);
        const spineAnimation = clone.getComponent(SpineAnimation);
        spineAnimation.state.setAnimation(0, "walk", true);
        spineAnimation.scale = 0.01;
      }
    }
  });

engine.run();
