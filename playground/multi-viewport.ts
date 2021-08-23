/**
 * @title Multi Viewport
 * @category Camera
 */
import * as o3 from "oasis-engine";
import {
  CameraClearFlags, DirectLight, Logger, AssetType,
  BackgroundMode, SkyBoxMaterial, PrimitiveMesh
} from "oasis-engine";
import {OrbitControl} from "@oasis-engine/controls";

Logger.enable();
const engine = new o3.WebGLEngine("canvas");
engine.canvas.resizeByClientSize();
const scene = engine.sceneManager.activeScene;
const {background} = scene;
const rootEntity = engine.sceneManager.activeScene.createRootEntity();

// init camera
const leftCameraEntity = rootEntity.createChild("left-camera");
const leftCamera = leftCameraEntity.addComponent(o3.Camera);
leftCamera.viewport.setValue(0, 0, 0.5, 1);
leftCamera.clearFlags = CameraClearFlags.Depth;
leftCameraEntity.transform.setPosition(10, 10, 10);
leftCameraEntity.transform.lookAt(new o3.Vector3(0, 0, 0));
leftCameraEntity.addComponent(OrbitControl);

const rightCameraEntity = rootEntity.createChild("right-camera");
const rightCamera = rightCameraEntity.addComponent(o3.Camera);
rightCamera.viewport.setValue(0.5, 0, 0.5, 1);
rightCamera.clearFlags = CameraClearFlags.Depth;
rightCameraEntity.transform.setPosition(10, 10, 10);
rightCameraEntity.transform.lookAt(new o3.Vector3(0, 0, 0));
rightCameraEntity.addComponent(OrbitControl);

const lightNode = rootEntity.createChild("Light");
lightNode.transform.setRotation(-30, 0, 0);
lightNode.addComponent(DirectLight);

// init cube
const cubeEntity = rootEntity.createChild("cube");
const renderer = cubeEntity.addComponent(o3.MeshRenderer);
renderer.mesh = o3.PrimitiveMesh.createCuboid(engine, 1, 1, 1);
const material = new o3.BlinnPhongMaterial(engine);
material.baseColor = new o3.Color(1, 0.25, 0.25, 1);
renderer.setMaterial(material);

engine.run();

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
    },
    {
      urls: [
        "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*Bk5FQKGOir4AAAAAAAAAAAAAARQnAQ",
        "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*_cPhR7JMDjkAAAAAAAAAAAAAARQnAQ",
        "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*trqjQp1nOMQAAAAAAAAAAAAAARQnAQ",
        "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*_RXwRqwMK3EAAAAAAAAAAAAAARQnAQ",
        "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*q4Q6TroyuXcAAAAAAAAAAAAAARQnAQ",
        "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*DP5QTbTSAYgAAAAAAAAAAAAAARQnAQ"
      ],
      type: AssetType.TextureCube
    }
  ])
  .then(([cubeMap1, cubeMap2]) => {
    // 添加天空盒背景
    background.mode = BackgroundMode.Sky; // 默认纯色背景
    const skyMaterial = (background.sky.material = new SkyBoxMaterial(engine)); // 添加天空盒材质
    skyMaterial.textureCubeMap = cubeMap1; // 设置立方体纹理
    background.sky.mesh = PrimitiveMesh.createCuboid(engine, 2, 2, 2); // 设置天空盒网格
    return [cubeMap1, cubeMap2];
  })
