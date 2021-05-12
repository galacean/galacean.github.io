import { AmbientLight, AssetType, Camera, Color, DirectLight, EnvironmentMapLight, GLTFResource, TextureCubeMap, Vector3, Vector4, WebGLEngine } from "oasis-engine";
import { OrbitControl } from "@oasis-engine/controls";
import React, { useEffect } from "react";

export default function PBRHelmet () {
  useEffect(() => {
    const engine = init();

    return () => {
      engine.destroy();
    }
  });

  return <canvas id="canvas-pbr-helmet" style={{width: '400px', height: '400px'}}/>
}

function init (): WebGLEngine {
  //-- create engine object
  const engine = new WebGLEngine("canvas-pbr-helmet");
  engine.canvas.resizeByClientSize();

  let scene = engine.sceneManager.activeScene;
  const rootEntity = scene.createRootEntity();

  let envLightNode = rootEntity.createChild("env_light");
  let envLight = envLightNode.addComponent(EnvironmentMapLight);

  let directLightNode = rootEntity.createChild("dir_light");
  let directLight = directLightNode.addComponent(DirectLight);
  directLight.color = new Color(1, 1, 1);

  const ambient = rootEntity.addComponent(AmbientLight);
  ambient.color = new Color(0.2, 0.2, 0.2, 1);

  //-- create camera
  let cameraNode = rootEntity.createChild("camera_node");
  cameraNode.transform.position = new Vector3(0, 0, 3);
  const camera = cameraNode.addComponent(Camera);
  camera.backgroundColor = new Vector4(51/255, 51/255, 51/255, 1);
  const controls = cameraNode.addComponent(OrbitControl);
  controls.enableZoom = false;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.02;

  engine.run();

  Promise.all([
    engine.resourceManager
      .load<GLTFResource>("https://gw.alipayobjects.com/os/bmw-prod/83219f61-7d20-4704-890a-60eb92aa6159.gltf")
      .then((gltf) => {
      gltf.defaultSceneRoot.transform.position = new Vector3(0, 0.1, 0);
        rootEntity.addChild(gltf.defaultSceneRoot);
      }),
    engine.resourceManager
      .load<TextureCubeMap>({
        urls: [
          "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*Bk5FQKGOir4AAAAAAAAAAAAAARQnAQ",
          "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*_cPhR7JMDjkAAAAAAAAAAAAAARQnAQ",
          "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*trqjQp1nOMQAAAAAAAAAAAAAARQnAQ",
          "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*_RXwRqwMK3EAAAAAAAAAAAAAARQnAQ",
          "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*q4Q6TroyuXcAAAAAAAAAAAAAARQnAQ",
          "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*DP5QTbTSAYgAAAAAAAAAAAAAARQnAQ"
        ],
        type: AssetType.TextureCube
      })
      .then((cubeMap) => {
        envLight.diffuseTexture = cubeMap;
      }),
    engine.resourceManager
      .load<TextureCubeMap>({
        urls: [
          "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*4ebgQaWOLaIAAAAAAAAAAAAAARQnAQ",
          "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*i56eR6AbreUAAAAAAAAAAAAAARQnAQ",
          "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*3wYERKsel5oAAAAAAAAAAAAAARQnAQ",
          "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*YiG7Srwmb3QAAAAAAAAAAAAAARQnAQ",
          "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*VUUwQrAv47sAAAAAAAAAAAAAARQnAQ",
          "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*Dn2qSoqzfwoAAAAAAAAAAAAAARQnAQ"
        ],
        type: AssetType.TextureCube
      })
      .then((cubeMap) => {
        envLight.specularTexture = cubeMap;
      })
  ]).then(() => {
  });

  return engine;
}