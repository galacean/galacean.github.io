/**
 * @title Multi Camera
 * @category Camera
 */

import {
  CameraClearFlags,
  DirectLight,
  Logger,
  AssetType,
  Entity,
  Camera,
  WebGLEngine,
  Vector3,
  MeshRenderer,
  BlinnPhongMaterial,
  Color,
  BackgroundMode,
  SkyBoxMaterial,
  PrimitiveMesh,
  Layer,
  Script
} from "oasis-engine";
import {OrbitControl} from "@oasis-engine/controls";
import {SpineAnimation} from "@oasis-engine/spine";

/**
 * Script for rotate.
 */
class RotateScript extends Script {
  /**
   * @override
   * The main loop, called frame by frame.
   * @param deltaTime - The deltaTime when the script update.
   */
  onUpdate(_: number): void {
    this.entity.transform.rotate(0.0, 0.6, 0);
  }
}

Logger.enable();
const engine = new WebGLEngine("canvas");
engine.canvas.resizeByClientSize();
const scene = engine.sceneManager.activeScene;
const {background} = scene;
const rootEntity = engine.sceneManager.activeScene.createRootEntity();

// init full screen camera
const cameraEntity = rootEntity.createChild("fullscreen-camera");
const camera = cameraEntity.addComponent(Camera);
camera.cullingMask = Layer.Layer0;
camera.clearFlags = CameraClearFlags.Depth;
cameraEntity.transform.setPosition(10, 10, 10);
cameraEntity.transform.lookAt(new Vector3(0, 0, 0));
cameraEntity.addComponent(OrbitControl);

const lightEntity = rootEntity.createChild("Light");
lightEntity.transform.setRotation(-30, 0, 0);
lightEntity.addComponent(DirectLight);

// init cube
const cubeEntity = rootEntity.createChild("cube");
cubeEntity.transform.setPosition(-3, 0, 3);
const renderer = cubeEntity.addComponent(MeshRenderer);
renderer.mesh = PrimitiveMesh.createCuboid(engine, 2, 2, 2);
const material = new BlinnPhongMaterial(engine);
material.baseColor = new Color(1, 0.25, 0.25, 1);
renderer.setMaterial(material);
cubeEntity.addComponent(RotateScript);

//----------------------------------------------------------------------------------------------------------------------
// init window camera
const windowEntity = engine.sceneManager.activeScene.createRootEntity();
windowEntity.layer = Layer.Layer1;
const windowCameraEntity = windowEntity.createChild("window-camera");
const windowCamera = windowCameraEntity.addComponent(Camera);
windowCamera.cullingMask = Layer.Layer1;
windowCamera.viewport.setValue(0.5, 0.2, 0.3, 0.6);
windowCamera.clearFlags = CameraClearFlags.Depth;
windowCamera.farClipPlane = 200;
windowCameraEntity.transform.setPosition(0, 3, 20);

engine.run();

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
    const clone = spineEntity.clone();
    clone.layer = Layer.Layer1;
    windowEntity.addChild(clone);
    const spineAnimation = clone.getComponent(SpineAnimation);
    spineAnimation.state.setAnimation(0, "walk", true);
    spineAnimation.scale = 0.01;
  });

engine.resourceManager
  //@ts-ignore
  .load<TextureCubeMap[]>([
    {
      urls: [
        "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*5w6_Rr6ML6IAAAAAAAAAAAAAARQnAQ",
        "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*TiT2TbN5cG4AAAAAAAAAAAAAARQnAQ",
        "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*8GF6Q4LZefUAAAAAAAAAAAAAARQnAQ",
        "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*D5pdRqUHC3IAAAAAAAAAAAAAARQnAQ",
        "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*_FooTIp6pNIAAAAAAAAAAAAAARQnAQ",
        "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*CYGZR7ogZfoAAAAAAAAAAAAAARQnAQ"
      ],
      type: AssetType.TextureCube
    }
  ])
  .then(([cubeMap1]) => {
    // 添加天空盒背景
    background.mode = BackgroundMode.Sky; // 默认纯色背景
    const skyMaterial = (background.sky.material = new SkyBoxMaterial(engine)); // 添加天空盒材质
    skyMaterial.textureCubeMap = cubeMap1; // 设置立方体纹理
    background.sky.mesh = PrimitiveMesh.createCuboid(engine, 2, 2, 2); // 设置天空盒网格
  })
