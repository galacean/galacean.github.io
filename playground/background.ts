/**
 * @title Scene Background
 * @category Scene
 */
import * as dat from "dat.gui";
import {
  AssetType,
  BackgroundMode,
  Camera,
  PrimitiveMesh,
  SkyBoxMaterial,
  TextureCubeMap,
  WebGLEngine
} from "oasis-engine";

import { OrbitControl } from "@oasis-engine/controls";

const engine = new WebGLEngine("canvas");
const scene = engine.sceneManager.activeScene;
const { background } = scene;
const root = scene.createRootEntity();
const cameraEntity = root.createChild();
cameraEntity.transform.setPosition(0, 0, 10);
cameraEntity.addComponent(Camera);
cameraEntity.addComponent(OrbitControl);

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
  .then((cubeMaps) => {
    const gui = new dat.GUI();
    gui.add(background, "mode", { Sky: BackgroundMode.Sky, SolidColor: BackgroundMode.SolidColor }).onChange((v) => {
      background.mode = parseInt(v);
    });

    const solidColor = background.solidColor;
    let colorObj = { color: [solidColor.r / 255, solidColor.g / 255, solidColor.b / 255, solidColor.a] };
    gui.addColor(colorObj, "color").onChange((v) => {
      background.solidColor.setValue(v[0] / 255, v[1] / 255, v[2] / 255, v[3] / 255);
    });

    const obj = {
      cubeMap: 0
    };

    gui.add(obj, "cubeMap", { cubeMap1: 0, cubeMap2: 1 }).onChange((v) => {
      // @ts-ignore
      background.sky.material.textureCubeMap = cubeMaps[parseInt(v)];
    });
  });
