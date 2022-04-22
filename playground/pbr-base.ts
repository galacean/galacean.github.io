/**
 * @title PBR Base
 * @category Material
 */
import { OrbitControl } from "@oasis-engine/controls";
import * as dat from "dat.gui";
import {
  AmbientLight,
  AssetType,
  BackgroundMode,
  Camera,
  DirectLight,
  GLTFResource,
  PrimitiveMesh,
  SkyBoxMaterial,
  Vector3,
  WebGLEngine
} from "oasis-engine";

//-- create engine object
const engine = new WebGLEngine("canvas");
engine.canvas.resizeByClientSize();

const scene = engine.sceneManager.activeScene;
const rootEntity = scene.createRootEntity();

const gui = new dat.GUI();

const directLightNode = rootEntity.createChild("dir_light");
const directLight = directLightNode.addComponent(DirectLight);
const dirFolder = gui.addFolder("DirectionalLight1");
directLight.intensity = 0.5;
dirFolder.add(directLight, "enabled");
dirFolder.add(directLight, "intensity", 0, 1);
directLightNode.transform.setPosition(5, 5, 5);
directLightNode.transform.lookAt(new Vector3(0, 0, 0));

//Create camera
const cameraNode = rootEntity.createChild("camera_node");
cameraNode.transform.position = new Vector3(0.25, 0.5, 1.5);
cameraNode.addComponent(Camera);
const control = cameraNode.addComponent(OrbitControl);
control.target.setValue(0.25, 0.25, 0);

// Create sky
const sky = scene.background.sky;
const skyMaterial = new SkyBoxMaterial(engine);
scene.background.mode = BackgroundMode.Sky;
sky.material = skyMaterial;
sky.mesh = PrimitiveMesh.createCuboid(engine, 1, 1, 1);

Promise.all([
  engine.resourceManager
    .load<GLTFResource>("https://gw.alipayobjects.com/os/bmw-prod/477b0093-7ee8-41af-a0dd-836608a4f130.gltf")
    .then((gltf) => {
      const { defaultSceneRoot, entities, materials } = gltf;
      rootEntity.addChild(defaultSceneRoot);
      defaultSceneRoot.transform.setScale(100, 100, 100);
      console.log(gltf);
      // entities[57].isActive = false;
    }),
  engine.resourceManager
    .load<AmbientLight>({
      type: AssetType.Env,
      url: "https://gw.alipayobjects.com/os/bmw-prod/09904c03-0d23-4834-aa73-64e11e2287b0.bin"
    })
    .then((ambientLight) => {
      scene.ambientLight = ambientLight;
      skyMaterial.textureCubeMap = ambientLight.specularTexture;
      skyMaterial.textureDecodeRGBM = true;

      const envFolder = gui.addFolder("EnvironmentMapLight");
      envFolder.add(ambientLight, "specularIntensity", 0, 1);
      envFolder.add(ambientLight, "diffuseIntensity", 0, 1);
    })
]).then(() => {
  engine.run();
});
