import { Camera, Vector3, WebGLEngine, Entity } from "oasis-engine";
// import { SpineAnimation } from "@oasis-engine/engine-spine";

// @ts-ignore
let { OrbitControl } = window['@oasisEngine/controls']
// @ts-ignore
let { SpineAnimation } = window.oasisSpine;

const engine = new WebGLEngine("canvas");
engine.canvas.resizeByClientSize();
const scene = engine.sceneManager.activeScene;
const rootEntity = scene.createRootEntity();

// camera
const cameraEntity = rootEntity.createChild("camera_node");
cameraEntity.addComponent(Camera);
cameraEntity.transform.position = new Vector3(0, 0, 70);
cameraEntity.addChild(OrbitControl);

engine.resourceManager
  .load({
    url: "https://sbfkcel.github.io/pixi-spine-debug/assets/spine/spineboy-pro.json",
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
