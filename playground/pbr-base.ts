/**
 * @title PBR Base
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
  SphericalHarmonics3,
  TextureCubeMap,
  Vector3,
  WebGLEngine
} from "oasis-engine";

//-- create engine object
const engine = new WebGLEngine("canvas");
engine.canvas.resizeByClientSize();

const scene = engine.sceneManager.activeScene;
const { ambientLight, background } = scene;
const rootEntity = scene.createRootEntity();

const color2glColor = (color) => new Color(color[0] / 255, color[1] / 255, color[2] / 255);
const gui = new dat.GUI();

const envFolder = gui.addFolder("EnvironmentMapLight");
envFolder.add(ambientLight, "specularIntensity", 0, 1);
envFolder.add(ambientLight, "diffuseIntensity", 0, 1);

const directLightColor = { color: [255, 255, 255] };
const directLightNode = rootEntity.createChild("dir_light");
const directLight = directLightNode.addComponent(DirectLight);
directLight.color = new Color(1, 1, 1);
const dirFolder = gui.addFolder("DirectionalLight1");
dirFolder.add(directLight, "enabled");
dirFolder.addColor(directLightColor, "color").onChange((v) => (directLight.color = color2glColor(v)));
dirFolder.add(directLight, "intensity", 0, 1);

//Create camera
const cameraNode = rootEntity.createChild("camera_node");
cameraNode.transform.position = new Vector3(0.25, 0.5, 1.5);
cameraNode.addComponent(Camera);
const control = cameraNode.addComponent(OrbitControl);
control.target.setValue(0.25, 0.25, 0);

// Create sky
const sky = background.sky;
const skyMaterial = new SkyBoxMaterial(engine);
background.mode = BackgroundMode.Sky;
sky.material = skyMaterial;
sky.mesh = PrimitiveMesh.createCuboid(engine, 1, 1, 1);

Promise.all([
  engine.resourceManager
    .load<GLTFResource>("https://gw.alipayobjects.com/os/bmw-prod/dda73ec2-6921-42c7-b109-b5cd386f4410.glb")
    .then((gltf) => {
      rootEntity.addChild(gltf.defaultSceneRoot);
      gltf.defaultSceneRoot.transform.setScale(100, 100, 100);
      console.log(gltf);
    }),
  engine.resourceManager
    .load<TextureCubeMap>({
      urls: [
        "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*5bs-Sb80qcUAAAAAAAAAAAAAARQnAQ",
        "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*rLUCT4VPBeEAAAAAAAAAAAAAARQnAQ",
        "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*LjSHTI5iSPoAAAAAAAAAAAAAARQnAQ",
        "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*pgCvTJ85RUYAAAAAAAAAAAAAARQnAQ",
        "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*0BKxR6jgRDAAAAAAAAAAAAAAARQnAQ",
        "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*Pir4RoxLm3EAAAAAAAAAAAAAARQnAQ"
      ],
      type: AssetType.TextureCube
    })
    .then((cubeMap) => {
      ambientLight.specularTexture = cubeMap;
      skyMaterial.textureCubeMap = cubeMap;

      ambientLight.diffuseMode = DiffuseMode.SphericalHarmonics;

      const sh = new SphericalHarmonics3();
      sh.setValueByArray([
        1.8788462324918593, 1.7312828350173162, 2.192336144643786, -0.6525031748653022, -0.8654715759989732,
        -1.4377779850288188, -0.8416757486504501, -0.41179952604695474, -0.1938213424322001, -1.3376251509896964,
        -0.8442529811610728, -0.6636745076744581, 0.4910727199644451, 0.34840739912192364, 0.28813369830776675,
        0.32862785633745595, 0.19673766013799854, 0.10167597732474559, 0.13255842780633711, 0.11016791384190244,
        0.05570034532455586, 1.0923561959080181, 0.5169269988464549, 0.29335295647453824, 1.0160477739941591,
        0.4602609485053868, 0.0878602808986376
      ]);
      ambientLight.diffuseSphericalHarmonics = sh;
    })
]).then(() => {
  engine.run();
});
