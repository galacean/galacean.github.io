import { AssetType, Camera, EnvironmentMapLight, MeshRenderer, PBRMaterial, PrimitiveMesh, SkyBox, TextureCubeMap, Vector3, WebGLEngine } from "oasis-engine";
// import { OrbitControl } from "@oasis-engine/controls";
import * as dat from "dat.gui";

// @ts-ignore
let { OrbitControl } = window['@oasisEngine/controls']

/**
 * use PBR material
 */
function usePBR(rows = 5, cols = 5, radius = 1, gap = 1) {
  const deltaGap = radius * 2 + gap;
  const minX = (-deltaGap * (cols - 1)) / 2;
  const maxY = (deltaGap * (rows - 1)) / 2;
  const deltaMetal = 1 / (cols - 1);
  const deltaRoughness = 1 / (rows - 1);

  // create model mesh
  const mesh = PrimitiveMesh.createSphere(engine, radius, 64);

  // create renderer
  for (let i = 0, count = rows * cols; i < count; i++) {
    const entity = rootEntity.createChild();
    const renderer = entity.addComponent(MeshRenderer);
    const material = new PBRMaterial(engine);
    const currentRow = Math.floor(i / cols);
    const currentCol = i % cols;

    renderer.mesh = mesh;
    renderer.setMaterial(material);
    entity.transform.setPosition(minX + currentCol * deltaGap, maxY - currentRow * deltaGap, 0);

    // pbr metallic
    material.metallicFactor = 1 - deltaMetal * currentRow;

    // pbr roughness
    material.roughnessFactor = deltaRoughness * currentCol;

    // base color
    if (currentRow === 0) {
      material.baseColor.setValue(186 / 255, 110 / 255, 64 / 255, 1.0);
    } else if (currentRow === rows - 1) {
      material.baseColor.setValue(0, 0, 0, 1);
    }
  }
}

const gui = new dat.GUI();
const guiDebug = {
  env: "forrest",
  introX: "从左到右粗糙度递增",
  introY: "从上到下金属度递减"
};
gui.add(guiDebug, "introX");
gui.add(guiDebug, "introY");

// create engine object
const engine = new WebGLEngine("canvas");
engine.canvas.resizeByClientSize();

const scene = engine.sceneManager.activeScene;
const rootEntity = scene.createRootEntity();

// create camera
const cameraEntity = rootEntity.createChild("camera_entity");
cameraEntity.transform.position = new Vector3(0, 0, 20);
cameraEntity.addComponent(Camera);
const control = cameraEntity.addComponent(OrbitControl);
control.maxDistance = 20;
control.minDistance = 2;

// create skybox
const skybox = rootEntity.addComponent(SkyBox);

// create env light
const envLight = rootEntity.addComponent(EnvironmentMapLight);

// load env texture
engine.resourceManager
  .load([
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
    },
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
        "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*4ebgQaWOLaIAAAAAAAAAAAAAARQnAQ",
        "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*i56eR6AbreUAAAAAAAAAAAAAARQnAQ",
        "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*3wYERKsel5oAAAAAAAAAAAAAARQnAQ",
        "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*YiG7Srwmb3QAAAAAAAAAAAAAARQnAQ",
        "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*VUUwQrAv47sAAAAAAAAAAAAAARQnAQ",
        "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*Dn2qSoqzfwoAAAAAAAAAAAAAARQnAQ"
      ],
      type: AssetType.TextureCube
    }
  ])
  .then((cubeMaps: TextureCubeMap[]) => {
    envLight.diffuseTexture = cubeMaps[0];
    envLight.specularTexture = cubeMaps[1];
    skybox.skyBoxMap = cubeMaps[1];

    gui.add(guiDebug, "env", ["forrest", "road"]).onChange((v) => {
      switch (v) {
        case "forrest":
          envLight.specularTexture = cubeMaps[1];
          skybox.skyBoxMap = cubeMaps[1];
          break;
        case "road":
          envLight.specularTexture = cubeMaps[2];
          skybox.skyBoxMap = cubeMaps[2];
          break;
      }
    });
  });

// run engine
engine.run();

// show pbr materials
usePBR();
