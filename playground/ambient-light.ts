/**
 * @title AmbientLight
 * @category Light
 */
// import { SphericalHarmonics3Baker } from "@oasis-engine/baker";
import { OrbitControl } from "@oasis-engine/controls";
import * as dat from "dat.gui";
import {
  AssetType,
  BackgroundMode,
  Camera,
  DiffuseMode,
  MeshRenderer,
  PBRMaterial,
  PrimitiveMesh,
  SkyBoxMaterial,
  SphericalHarmonics3,
  TextureCubeMap,
  Vector3,
  WebGLEngine
} from "oasis-engine";

const engine = new WebGLEngine("canvas");
engine.canvas.resizeByClientSize();

const scene = engine.sceneManager.activeScene;
const rootEntity = scene.createRootEntity();
const gui = new dat.GUI();

// Create camera
const cameraNode = rootEntity.createChild("camera_node");
cameraNode.transform.position = new Vector3(-3, 0, 3);
cameraNode.addComponent(Camera);
cameraNode.addComponent(OrbitControl);

// Create sky
const sky = scene.background.sky;
const skyMaterial = new SkyBoxMaterial(engine);
scene.background.mode = BackgroundMode.Sky;
sky.material = skyMaterial;
sky.mesh = PrimitiveMesh.createCuboid(engine, 1, 1, 1);

// material ball
const ball = rootEntity.createChild("ball");
const ballRender = ball.addComponent(MeshRenderer);
const material = new PBRMaterial(engine);
material.metallic = 0;
material.roughness = 0;
ballRender.mesh = PrimitiveMesh.createSphere(engine, 1, 64);
ballRender.setMaterial(material);

engine.resourceManager
  .load<TextureCubeMap>({
    urls: [
      "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*TUkMQpLvsGYAAAAAAAAAAAAAARQnAQ",
      "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*1PF-Q5j3HKYAAAAAAAAAAAAAARQnAQ",
      "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*cY8-QLCjqrIAAAAAAAAAAAAAARQnAQ",
      "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*LTrfR619LjIAAAAAAAAAAAAAARQnAQ",
      "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*qrYcQYE-SOoAAAAAAAAAAAAAARQnAQ",
      "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*o_QqQI9ii9wAAAAAAAAAAAAAARQnAQ"
    ],
    type: AssetType.TextureCube
  })
  .then((cubeMap) => {
    skyMaterial.textureCubeMap = cubeMap;
    scene.ambientLight.specularTexture = cubeMap;

    const sh = new SphericalHarmonics3();

    /**
     * ---------SH Baker---------
     */
    // SphericalHarmonics3Baker.fromTextureCubeMap(cubeMap, sh);
    // const arr = [];
    // sh.toArray(arr);
    // console.log(arr);

    sh.setValueByArray([
      0.46520230174064636, 0.42419639229774475, 0.4576752185821533, -0.30826228857040405, -0.2794589698314667,
      -0.3521991968154907, 0.03157062828540802, 0.05860103666782379, 0.07541826367378235, 0.07828482985496521,
      -0.1252007931470871, -0.2944774031639099, -0.10218218713998795, 0.12605193257331848, 0.3290803134441376,
      -0.03329377993941307, -0.06737647205591202, -0.08467923104763031, -0.04482593759894371, -0.04074505716562271,
      -0.06285601109266281, 0.06323294341564178, -0.02942776307463646, -0.07708701491355896, 0.03481125831604004,
      0.03877147659659386, 0.002551637589931488
    ]);
    scene.ambientLight.diffuseSphericalHarmonics = sh;
    scene.ambientLight.diffuseMode = DiffuseMode.SphericalHarmonics;

    engine.run();
    openDebug(cubeMap);
  });

function openDebug(specularTexture) {
  const info = {
    diffuseMode: "SphericalHarmonics",
    diffuseSolidColor: [0.212 * 255, 0.227 * 255, 0.259 * 255],
    specularTexture: true
  };

  gui.add(info, "diffuseMode", ["SolidColor", "SphericalHarmonics"]).onChange((v) => {
    if (v === "SphericalHarmonics") {
      scene.ambientLight.diffuseMode = DiffuseMode.SphericalHarmonics;
    } else if (v === "SolidColor") {
      scene.ambientLight.diffuseMode = DiffuseMode.SolidColor;
    }
  });

  gui.addColor(info, "diffuseSolidColor").onChange((v) => {
    scene.ambientLight.diffuseSolidColor.setValue(v[0] / 255, v[1] / 255, v[2] / 255, 1);
  });

  gui.add(info, "specularTexture").onChange((v) => {
    if (v) {
      scene.ambientLight.specularTexture = specularTexture;
    } else {
      scene.ambientLight.specularTexture = null;
    }
  });

  // env light debug
  gui.add(scene.ambientLight, "specularIntensity", 0, 1);
  gui.add(scene.ambientLight, "diffuseIntensity", 0, 1);
}
