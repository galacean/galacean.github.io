/**
 * @title Probe Reflection
 * @category Advance
 */
import { OrbitControl } from "@oasis-engine/controls";
import * as dat from "dat.gui";
import {
  AssetType,
  BackgroundMode,
  BlinnPhongMaterial,
  Camera,
  Color,
  CubeProbe,
  DiffuseMode,
  DirectLight,
  GLTFResource,
  Layer,
  MeshRenderer,
  PrimitiveMesh,
  Script,
  SkyBoxMaterial,
  SphericalHarmonics3,
  TextureCubeMap,
  WebGLEngine
} from "oasis-engine";

// Create engine object
const engine = new WebGLEngine("canvas");
engine.canvas.resizeByClientSize();

const scene = engine.sceneManager.activeScene;
const rootEntity = scene.createRootEntity();
const { ambientLight, background } = scene;

const gui = new dat.GUI();
gui.domElement.style = "position:absolute;top:0px;left:50vw";

const directLightNode = rootEntity.createChild("dir_light");
const directLightNode2 = rootEntity.createChild("dir_light2");
directLightNode.addComponent(DirectLight);
directLightNode2.addComponent(DirectLight);

directLightNode.transform.setRotation(30, 0, 0);
directLightNode2.transform.setRotation(-30, 180, 0);

// Create camera
const cameraEntity = rootEntity.createChild("camera_node");
cameraEntity.transform.setPosition(0, 0, 5);
cameraEntity.addComponent(Camera);
cameraEntity.addComponent(OrbitControl);

// Create sky
const sky = background.sky;
const skyMaterial = new SkyBoxMaterial(engine);
background.mode = BackgroundMode.Sky;
sky.material = skyMaterial;
sky.mesh = PrimitiveMesh.createCuboid(engine, 1, 1, 1);

function loadModel() {
  return Promise.all([
    engine.resourceManager
      .load<GLTFResource>("https://gw.alipayobjects.com/os/bmw-prod/150e44f6-7810-4c45-8029-3575d36aff30.gltf")
      .then((gltf) => {
        rootEntity.addChild(gltf.defaultSceneRoot);
        console.log(gltf);
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
        ambientLight.specularTexture = cubeMap;
        skyMaterial.textureCubeMap = cubeMap;

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
}

function createSphere(material) {
  const sphereEntity = rootEntity.createChild("sphere");
  const sphereRender = sphereEntity.addComponent(MeshRenderer);
  const geometry = PrimitiveMesh.createSphere(engine, 1, 64);
  sphereRender.mesh = geometry;
  sphereRender.setMaterial(material);
  return sphereEntity;
}

function reflectionDemo() {
  const sphere1Mat = new BlinnPhongMaterial(engine);
  sphere1Mat.baseColor = new Color(1, 0, 0, 1);
  const sphere2Mat = new BlinnPhongMaterial(engine);
  sphere2Mat.baseColor = new Color(0, 1, 0, 1);
  const sphere3Mat = new BlinnPhongMaterial(engine);
  sphere3Mat.baseColor = new Color(0, 0, 1, 1);

  const sphere1 = createSphere(sphere1Mat);
  const sphere2 = createSphere(sphere2Mat);
  const sphere3 = createSphere(sphere3Mat);
  const aMove1 = sphere1.addComponent(MoveScript);
  aMove1.radius = 4;
  aMove1.onX = () => 0;
  const aMove2 = sphere2.addComponent(MoveScript);
  aMove2.radius = 3;
  aMove2.onY = () => 0;
  const aMove3 = sphere3.addComponent(MoveScript);
  aMove3.onX = (time) => Math.sin(time + 2) * 5;
  aMove3.onY = (time) => Math.cos(time + 2) * 5;
  aMove3.onZ = () => 0;

  let probe = null;

  // debug
  const state = {
    enableAnimate: true,
    enableProbe: true,
    size: 1024,
    samples: 1
  };

  probe = cameraEntity.addComponent(CubeProbe);
  probe.probeLayer = Layer.Layer30;
  sphere1.layer = Layer.Layer30;
  sphere2.layer = Layer.Layer30;
  sphere3.layer = Layer.Layer30;
  rootEntity.layer = Layer.Layer30;

  probe.onTextureChange = (texture) => {
    ambientLight.specularTexture = texture;
  };
  gui
    .add(state, "enableAnimate")
    .onChange((v) => {
      aMove1.enabled = v;
      aMove2.enabled = v;
      aMove3.enabled = v;
    })
    .name("动画开关");
  gui
    .add(state, "enableProbe")
    .onChange((v) => {
      probe.enabled = v;
    })
    .name("环境反射开关");
  gui
    .add(state, "size", 1, 2048)
    .onChange((size) => {
      probe.width = probe.height = size;
    })
    .name("分辨率");

  const rhi = engine._hardwareRenderer;
  if (rhi.isWebGL2) {
    const max = rhi.capability.maxAntiAliasing;
    gui
      .add(state, "samples", 0, max, 1)
      .name("MSAA")
      .onChange((samples) => {
        probe.antiAliasing = samples;
      });
  }
}

/**
 * 旋转移动脚本
 */
class MoveScript extends Script {
  time = 0;
  radius = 5;
  onX;
  onY;
  onZ;

  constructor(node) {
    super(node);
    this.onX = (time) => {
      return Math.cos(time) * this.radius;
    };
    this.onY = (time) => {
      return Math.cos(time) * this.radius;
    };
    this.onZ = (time) => {
      return Math.sin(time) * this.radius;
    };
  }

  onUpdate(deltaTime) {
    this.time += deltaTime / 1000;
    let x = this.onX(this.time);
    let y = this.onY(this.time);
    let z = this.onZ(this.time);
    this.entity.transform.setPosition(x, y, z);
  }
}

loadModel().then(() => {
  engine.run();
  reflectionDemo();
});
