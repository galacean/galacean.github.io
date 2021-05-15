/**
 * @title Spine Renderer
 * @category 2D
 */
import { Camera, Vector3, WebGLEngine, Entity } from "oasis-engine";
import { OrbitControl } from "@oasis-engine/controls";
import { SpineAnimation } from "@oasis-engine/engine-spine";

const engine = new WebGLEngine("canvas");
engine.canvas.resizeByClientSize();
const scene = engine.sceneManager.activeScene;
const rootEntity = scene.createRootEntity();

// camera
const cameraEntity = rootEntity.createChild("camera_node");
cameraEntity.addComponent(Camera);
cameraEntity.transform.position = new Vector3(0, 0, 70);
cameraEntity.addComponent(OrbitControl);

engine.resourceManager
  .load({
    urls: [ 
      "https://gw.alipayobjects.com/os/OasisHub/a66ef194-6bc8-4325-9a59-6ea9097225b1/1620888427489.json",
      "https://gw.alipayobjects.com/os/OasisHub/a1e3e67b-a783-4832-ba1b-37a95bd55291/1620888427490.atlas",
      "https://gw.alipayobjects.com/zos/OasisHub/a3ca8f62-1068-43a5-bb64-5c9a0f823dde/1620888427490.png"
    ],
    type: "spine"
  })
  .then((spineEntity: Entity) => {
    spineEntity.transform.setPosition(0, -12, 0);
    rootEntity.addChild(spineEntity);
    const spineAnimation = spineEntity.getComponent(SpineAnimation);
    spineAnimation.state.setAnimation(0, "walk", true);
    spineAnimation.skeleton.scaleX = 0.05;
    spineAnimation.skeleton.scaleY = 0.05;
  });

engine.run();
