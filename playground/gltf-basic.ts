/**
 * @title GLTF Basic
 * @category Basic
 */
import { OrbitControl } from "@oasis-engine/controls";
import { Camera, GLTFResource, WebGLEngine } from "oasis-engine";

// 创建画布
const engine = new WebGLEngine("canvas");
// 设置屏幕适配
engine.canvas.resizeByClientSize();

const rootEntity = engine.sceneManager.activeScene.createRootEntity();

const cameraEntity = rootEntity.createChild("camera");
cameraEntity.addComponent(Camera);
cameraEntity.transform.setPosition(3, 3, 3);
cameraEntity.addComponent(OrbitControl);

engine.sceneManager.activeScene.ambientLight.diffuseSolidColor.setValue(1, 1, 1, 1);

engine.resourceManager
  .load<GLTFResource>("https://gw.alipayobjects.com/os/OasisHub/267000040/9994/%25E5%25BD%2592%25E6%25A1%25A3.gltf")
  .then((gltf) => {
    rootEntity.addChild(gltf.defaultSceneRoot);
  });

engine.run();
