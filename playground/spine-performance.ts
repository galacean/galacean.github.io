/**
 * @title Spine
 * @category Benchmark
 */
import { Camera, Logger, SystemInfo, Vector3, WebGLEngine, Entity } from "oasis-engine";
import { SpineAnimation } from "@oasis-engine/spine";
import "@oasis-engine/stats";

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
    url: "https://sbfkcel.github.io/pixi-spine-debug/assets/spine/spineboy-pro.json",
    type: "spine"
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
