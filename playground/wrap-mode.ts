/**
 * @title Wrap Mode
 * @category Texture
 */
import { OrbitControl } from "oasis-engine-toolkit";
import * as dat from "dat.gui";
import {
  AssetType,
  Camera,
  CullMode,
  MeshRenderer,
  PrimitiveMesh,
  Texture2D,
  TextureFilterMode,
  TextureWrapMode,
  UnlitMaterial,
  WebGLEngine
} from "oasis-engine";
const gui = new dat.GUI();

// Create engine object
const engine = new WebGLEngine("canvas");
engine.canvas.resizeByClientSize();

const scene = engine.sceneManager.activeScene;
const rootEntity = scene.createRootEntity();

// Create camera
const cameraEntity = rootEntity.createChild("Camera");
cameraEntity.transform.setPosition(0, 0, 5);
cameraEntity.addComponent(Camera);
cameraEntity.addComponent(OrbitControl);

// Create Plane
const mesh = PrimitiveMesh.createPlane(engine, 2, 2);
const material = new UnlitMaterial(engine);
material.tilingOffset.x = 2;
material.tilingOffset.y = 2;
material.isTransparent = true;
material.renderState.rasterState.cullMode = CullMode.Off;
const planeEntity = rootEntity.createChild("plane");
const planeRenderer = planeEntity.addComponent(MeshRenderer);
planeEntity.transform.setRotation(90, 0, 0);
planeRenderer.mesh = mesh;
planeRenderer.setMaterial(material);

engine.resourceManager
  .load<Texture2D>({
    url: "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*rgNGR4Vb7lQAAAAAAAAAAAAAARQnAQ",
    type: AssetType.Texture2D
  })
  .then((texture) => {
    material.baseTexture = texture;
    addGUI(texture);
    engine.run();
  });

function addGUI(texture: Texture2D) {
  const wrapModeMap: Record<TextureFilterMode, string> = {
    [TextureWrapMode.Clamp]: "Clamp",
    [TextureWrapMode.Repeat]: "Repeat",
    [TextureWrapMode.Mirror]: "Mirror"
  };
  const state = {
    wrapMode: wrapModeMap[texture.wrapModeU]
  };
  gui.add(state, "wrapMode", Object.values(wrapModeMap)).onChange((v) => {
    for (let key in wrapModeMap) {
      const value = wrapModeMap[key];
      if (v === value) {
        texture.wrapModeU = Number(key);
        texture.wrapModeV = Number(key);
      }
    }
  });
}
