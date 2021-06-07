/**
 * @title PBR Helmet
 * @category Material
 */
import { OrbitControl } from "@oasis-engine/controls";
import * as dat from "dat.gui";
import {
  AssetType,
  BackgroundMode,
  Camera,
  Color,
  DiffuseMode,
  DirectLight,
  GLTFResource,
  PrimitiveMesh,
  SkyBoxMaterial,
  TextureCubeMap,
  Vector3,
  WebGLEngine
} from "oasis-engine";

//-- create engine object
let engine = new WebGLEngine("canvas");
engine.canvas.resizeByClientSize();

let scene = engine.sceneManager.activeScene;
const { ambientLight, background } = scene;
const rootEntity = scene.createRootEntity();

const color2glColor = (color) => new Color(color[0] / 255, color[1] / 255, color[2] / 255);
const glColor2Color = (color) => new Color(color[0] * 255, color[1] * 255, color[2] * 255);
const gui = new dat.GUI();
gui.domElement.style = "position:absolute;top:0px;left:50vw";

let envFolder = gui.addFolder("EnvironmentMapLight");
envFolder.add(ambientLight, "specularIntensity", 0, 1);
envFolder.add(ambientLight, "diffuseIntensity", 0, 1);

let directLightColor = { color: [255, 255, 255] };
let directLightNode = rootEntity.createChild("dir_light");
let directLight = directLightNode.addComponent(DirectLight);
directLight.color = new Color(1, 1, 1);
let dirFolder = gui.addFolder("DirectionalLight1");
dirFolder.add(directLight, "enabled");
dirFolder.addColor(directLightColor, "color").onChange((v) => (directLight.color = color2glColor(v)));
dirFolder.add(directLight, "intensity", 0, 1);

//Create camera
let cameraNode = rootEntity.createChild("camera_node");
cameraNode.transform.position = new Vector3(0, 0, 5);
cameraNode.addComponent(Camera);
cameraNode.addComponent(OrbitControl);

// Create sky
const sky = background.sky;
const skyMaterial = new SkyBoxMaterial(engine);
background.mode = BackgroundMode.Sky;
sky.material = skyMaterial;
sky.mesh = PrimitiveMesh.createCuboid(engine, 1, 1, 1);

Promise.all([
  engine.resourceManager
    .load<GLTFResource>("https://gw.alipayobjects.com/os/bmw-prod/150e44f6-7810-4c45-8029-3575d36aff30.gltf")
    .then((gltf) => {
      rootEntity.addChild(gltf.defaultSceneRoot);
      console.log(gltf);
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
      ambientLight.diffuseMode = DiffuseMode.Texture;
      ambientLight.diffuseTexture = cubeMap;
    }),
  engine.resourceManager
    .load<TextureCubeMap>({
      urls: [
        "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*5w6_Rr6ML6IAAAAAAAAAAAAAARQnAQ",
        "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*TiT2TbN5cG4AAAAAAAAAAAAAARQnAQ",
        "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*8GF6Q4LZefUAAAAAAAAAAAAAARQnAQ",
        "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*D5pdRqUHC3IAAAAAAAAAAAAAARQnAQ",
        "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*_FooTIp6pNIAAAAAAAAAAAAAARQnAQ",
        "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*CYGZR7ogZfoAAAAAAAAAAAAAARQnAQ"
      ],
      type: AssetType.TextureCube
    })
    .then((cubeMap) => {
      ambientLight.specularTexture = cubeMap;
      skyMaterial.textureCubeMap = cubeMap;
    })
]).then(() => {
  engine.run();
});
