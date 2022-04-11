/**
 * @title PBR Parallax vs Normal
 * @category Material
 */
import { OrbitControl } from "@oasis-engine/controls";
import * as dat from "dat.gui";
import {
  AmbientLight,
  AssetType,
  Camera,
  DirectLight,
  Logger,
  MeshRenderer,
  PBRMaterial,
  PrimitiveMesh,
  Texture2D,
  WebGLEngine
} from "oasis-engine";

const gui = new dat.GUI();
Logger.enable();
//-- create engine object
const engine = new WebGLEngine("canvas");
engine.canvas.resizeByClientSize();

const scene = engine.sceneManager.activeScene;
const rootEntity = scene.createRootEntity();
scene.background.solidColor.setValue(1, 1, 1, 1);
const directLightNode = rootEntity.createChild("dir_light");
const directLightNode2 = rootEntity.createChild("dir_light2");
directLightNode.addComponent(DirectLight);
directLightNode2.addComponent(DirectLight);
directLightNode.transform.setRotation(30, 30, 0);
directLightNode2.transform.setRotation(-30, 210, 0);

// Create camera
const cameraNode = rootEntity.createChild("camera_node");
cameraNode.transform.setPosition(0, 2, 1);
cameraNode.addComponent(Camera);
cameraNode.addComponent(OrbitControl);

// create cube
const entity = rootEntity.createChild();
const renderer = entity.addComponent(MeshRenderer);
renderer.mesh = PrimitiveMesh.createCuboid(engine, 1, 1, 1);
const material = new PBRMaterial(engine);
material.metallic = 0;
renderer.setMaterial(material);

engine.resourceManager
  .load([
    {
      type: AssetType.Texture2D,
      url: "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*D5AfTIcwpjcAAAAAAAAAAAAAARQnAQ"
    },
    {
      type: AssetType.Texture2D,
      url: "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*HclhSLAworUAAAAAAAAAAAAAARQnAQ"
    },
    {
      type: AssetType.Texture2D,
      url: "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*aFxKT5_8ToYAAAAAAAAAAAAAARQnAQ"
    }
  ])
  .then((textures) => {
    const parallaxTexture = textures[2] as Texture2D;
    material.baseTexture = textures[0] as Texture2D;
    material.normalTexture = textures[1] as Texture2D;
    material.occlusionTexture = textures[3] as Texture2D;
    material.parallaxTexture = parallaxTexture;
    material.useParallaxOcclusion = true;
    engine.run();

    const debugInfo = {
      parallaxMode: "normal + parallax occlusion"
    };
    gui.add(debugInfo, "parallaxMode", ["normal", "normal + parallax", "normal + parallax occlusion"]).onChange((v) => {
      switch (v) {
        case "normal":
          material.parallaxTexture = null;
          break;
        case "normal + parallax":
          material.parallaxTexture = parallaxTexture;
          material.useParallaxOcclusion = false;
          break;
        case "normal + parallax occlusion":
          material.parallaxTexture = parallaxTexture;
          material.useParallaxOcclusion = true;
          break;
      }
    });
    gui.add(material, "parallaxTextureIntensity", 0, 0.1, 0.01).name("intensity");
  });

engine.resourceManager
  .load<AmbientLight>({
    type: AssetType.Env,
    url: "https://gw.alipayobjects.com/os/bmw-prod/09904c03-0d23-4834-aa73-64e11e2287b0.bin"
  })
  .then((ambientLight) => {
    scene.ambientLight = ambientLight;
  });
