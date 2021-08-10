/**
 * @title Render Target
 * @category Camera
 */
import { OrbitControl } from "@oasis-engine/controls";
import {
  AssetType,
  BackgroundMode,
  Camera,
  Entity,
  GLTFResource,
  Layer,
  MeshRenderer,
  PrimitiveMesh,
  RenderColorTexture,
  RenderFace,
  RenderTarget,
  Script,
  SkyBoxMaterial,
  TextureCubeMap,
  UnlitMaterial,
  WebGLEngine
} from "oasis-engine";

// Create scene
const engine = new WebGLEngine("canvas");
engine.canvas.resizeByClientSize();

const scene = engine.sceneManager.activeScene;
const rootEntity = scene.createRootEntity();
const cameraEntity = rootEntity.createChild("camera");
cameraEntity.addComponent(Camera);
cameraEntity.transform.setPosition(0, 0, 10);
cameraEntity.addComponent(OrbitControl);
scene.ambientLight.diffuseSolidColor.setValue(1, 1, 1, 1);

// Create planes to mock mirror
const planeEntity = rootEntity.createChild("mirror");
const planeRenderer = planeEntity.addComponent(MeshRenderer);
const mesh = PrimitiveMesh.createPlane(engine, 2, 2);
const material = new UnlitMaterial(engine);

planeEntity.transform.setRotation(0, 0, 180);
material.renderFace = RenderFace.Double;
planeRenderer.mesh = mesh;
planeRenderer.setMaterial(material);
for (let i = 0; i < 8; i++) {
  const clone = planeEntity.clone();
  planeEntity.parent.addChild(clone);

  clone.layer = Layer.Layer1;
  clone.transform.setPosition((i - 4) * 2, 0, i % 2 ? -5 : -8);
}
planeEntity.isActive = false;

// Create sky
const background = scene.background;
const sky = background.sky;
const skyMaterial = new SkyBoxMaterial(engine);
background.mode = BackgroundMode.Sky;
sky.material = skyMaterial;
sky.mesh = PrimitiveMesh.createCuboid(engine, 1, 1, 1);

engine.resourceManager
  .load<TextureCubeMap>({
    urls: [
      "https://gw.alipayobjects.com/mdn/rms_475770/afts/img/A*Gi7CTZqKuacAAAAAAAAAAABkARQnAQ",
      "https://gw.alipayobjects.com/mdn/rms_475770/afts/img/A*iRRMQIExwKMAAAAAAAAAAABkARQnAQ",
      "https://gw.alipayobjects.com/mdn/rms_475770/afts/img/A*ZIcPQZo20sAAAAAAAAAAAABkARQnAQ",
      "https://gw.alipayobjects.com/mdn/rms_475770/afts/img/A*SPYuTbHT-KgAAAAAAAAAAABkARQnAQ",
      "https://gw.alipayobjects.com/mdn/rms_475770/afts/img/A*mGUERbY77roAAAAAAAAAAABkARQnAQ",
      "https://gw.alipayobjects.com/mdn/rms_475770/afts/img/A*ilkPS7A1_JsAAAAAAAAAAABkARQnAQ"
    ],
    type: AssetType.TextureCube
  })
  .then((cubeMap) => {
    scene.ambientLight.specularTexture = cubeMap;
    skyMaterial.textureCubeMap = cubeMap;
  });

// Load glTF
engine.resourceManager
  .load<GLTFResource>("https://gw.alipayobjects.com/os/OasisHub/267000040/9994/%25E5%25BD%2592%25E6%25A1%25A3.gltf")
  .then((gltf) => {
    rootEntity.addChild(gltf.defaultSceneRoot);
  });

// Add script to switch `camera.renderTarget`
class switchRTScript extends Script {
  renderColorTexture = new RenderColorTexture(engine, 1024, 1024);
  renderTarget = new RenderTarget(engine, 1024, 1024, this.renderColorTexture);

  constructor(entity: Entity) {
    super(entity);
    material.baseTexture = this.renderColorTexture as any;
  }

  onBeginRender(camera: Camera) {
    camera.renderTarget = this.renderTarget;
    camera.cullingMask = Layer.Layer0;
    camera.render();
    camera.renderTarget = null;
    camera.cullingMask = Layer.Everything;
  }
}

cameraEntity.addComponent(switchRTScript);

engine.run();
