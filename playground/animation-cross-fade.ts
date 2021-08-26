/**
 * @title Animation Cross Fade
 * @category Animation
 */
import { OrbitControl } from "@oasis-engine/controls";
import * as dat from "dat.gui";
import { Animator, Camera, Color, DirectLight, GLTFResource, WebGLEngine } from "oasis-engine";

const gui = new dat.GUI();

//-- create engine object
const engine = new WebGLEngine("canvas");
engine.canvas.resizeByClientSize();

const scene = engine.sceneManager.activeScene;
const rootEntity = scene.createRootEntity();
const lightEntity = rootEntity.createChild("light");
lightEntity.transform.rotate(0, 180, 0);

const light = lightEntity.addComponent(DirectLight);
light.color = new Color(0.8, 0.8, 0.8, 1.0);

//-- create camera
const cameraEntity = rootEntity.createChild("camera_entity");
cameraEntity.transform.setPosition(0, 0, -10);
cameraEntity.addComponent(Camera);
cameraEntity.addComponent(OrbitControl);

engine.run();

engine.resourceManager
  .load<GLTFResource>("https://gw.alipayobjects.com/os/OasisHub/267000040/494/redPacket.gltf")
  .then((asset) => {
    const { animations, defaultSceneRoot } = asset;
    const animationNameList = animations.map(({ name }) => name);

    rootEntity.addChild(defaultSceneRoot);

    const animator = defaultSceneRoot.getComponent(Animator);
    animator.play(animationNameList[0]);

    const debugInfo = {
      animation: animationNameList[0],
      crossFade: true,
      crossTime: 1
    };

    gui.add(debugInfo, "animation", animationNameList).onChange((v) => {
      const { crossFade, crossTime } = debugInfo;
      if (crossFade) {
        animator.crossFade(v, crossTime);
      } else {
        animator.play(v);
      }
    });

    gui.add(debugInfo, "crossFade");
    gui.add(debugInfo, "crossTime", 0, 5).name("过渡时间(秒)");
  });
