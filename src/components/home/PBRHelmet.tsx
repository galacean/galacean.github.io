import { OrbitControl } from "@oasis-engine/controls";
import {
  AssetType,
  Camera,
  Color,
  DiffuseMode,
  DirectLight,
  GLTFResource,
  SphericalHarmonics3,
  TextureCubeMap,
  Vector3,
  WebGLEngine
} from "oasis-engine";
import React, { useEffect } from "react";

export default function PBRHelmet() {
  useEffect(() => {
    const engine = init();

    return () => {
      engine.destroy();
    };
  });

  return <canvas id="canvas-pbr-helmet" style={{ width: "400px", height: "400px" }} />;
}

function init(): WebGLEngine {
  // -- create engine object
  const engine = new WebGLEngine("canvas-pbr-helmet");
  engine.canvas.resizeByClientSize();

  const scene = engine.sceneManager.activeScene;
  const rootEntity = scene.createRootEntity();

  const directLightNode = rootEntity.createChild("dir_light");
  const directLight = directLightNode.addComponent(DirectLight);
  directLight.color = new Color(1, 1, 1);

  // -- create camera
  const cameraNode = rootEntity.createChild("camera_node");
  cameraNode.transform.position = new Vector3(0, 0, 3);
  cameraNode.addComponent(Camera);
  scene.background.solidColor.setValue(51 / 255, 51 / 255, 51 / 255, 1);
  const controls = cameraNode.addComponent(OrbitControl);
  controls.enableZoom = false;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.02;

  engine.run();

  Promise.all([
    engine.resourceManager
      .load<GLTFResource>("https://gw.alipayobjects.com/os/bmw-prod/150e44f6-7810-4c45-8029-3575d36aff30.gltf")
      .then((gltf) => {
        gltf.defaultSceneRoot.transform.position = new Vector3(0, 0.1, 0);
        rootEntity.addChild(gltf.defaultSceneRoot);
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
        const ambientLight = scene.ambientLight;
        ambientLight.specularTexture = cubeMap;

        ambientLight.diffuseMode = DiffuseMode.SphericalHarmonics;

        const sh = new SphericalHarmonics3();
        sh.setValueByArray([
          0.2990323305130005, 0.46782827377319336, 0.6490488052368164, -0.08325951546430588, -0.1739923506975174,
          -0.3481740653514862, 0.12110518664121628, 0.10342133790254593, 0.0647989809513092, 0.013654923066496849,
          0.019375042989850044, 0.019014855846762657, -0.010647064074873924, -0.0158681683242321, -0.01735353097319603,
          -0.06292672455310822, -0.06085652485489845, -0.04486454278230667, 0.19867956638336182, 0.21928717195987701,
          0.19299709796905518, 0.01943504437804222, 0.03246982768177986, 0.04340629279613495, 0.13364768028259277,
          0.19655625522136688, 0.21748234331607819
        ]);
        ambientLight.diffuseSphericalHarmonics = sh;
      })
  ]).then(() => {});

  return engine;
}
