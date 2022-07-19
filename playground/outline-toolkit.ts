/**
 * @title Outline
 * @category Toolkit
 */
import * as dat from "dat.gui";
import {
  AmbientLight,
  AssetType,
  Camera,
  Entity,
  GLTFResource,
  Layer,
  MeshRenderer,
  PrimitiveMesh,
  UnlitMaterial,
  WebGLEngine
} from "oasis-engine";
import { OrbitControl, FramebufferPicker, OutlineManager } from "oasis-engine-toolkit";

const gui = new dat.GUI();
const engine = new WebGLEngine("canvas");
engine.run();
engine.canvas.resizeByClientSize();

const scene = engine.sceneManager.activeScene;
const rootEntity = scene.createRootEntity();
scene.background.solidColor.set(1, 1, 1, 1);

// camera
const cameraEntity = rootEntity.createChild("camera_node");
const outlineManager = cameraEntity.addComponent(OutlineManager);

cameraEntity.transform.setPosition(0, 1.3, 10);
const camera = cameraEntity.addComponent(Camera);
camera.enableFrustumCulling = false;
cameraEntity.addComponent(OrbitControl).target.set(0, 1.3, 0);

const framebufferPicker = rootEntity.addComponent(FramebufferPicker);
framebufferPicker.camera = camera;
framebufferPicker.colorRenderPass.mask = Layer.Layer0;

document.getElementById("canvas").addEventListener("mousedown", (e) => {
  framebufferPicker.pick(e.offsetX, e.offsetY).then((renderElement) => {
    outlineManager.clear();
    if (renderElement) {
      console.log(renderElement.component.entity);

      outlineManager.addEntity(renderElement.component.entity);
    }
  });
});

// ambient light
engine.resourceManager
  .load<AmbientLight>({
    type: AssetType.Env,
    url: "https://gw.alipayobjects.com/os/bmw-prod/09904c03-0d23-4834-aa73-64e11e2287b0.bin"
  })
  .then((ambientLight) => {
    scene.ambientLight = ambientLight;
    ambientLight.specularIntensity = ambientLight.diffuseIntensity = 2;
  });

// engine.resourceManager
//   .load({
//     type: AssetType.Prefab,
//     url: "https://gw.alipayobjects.com/os/OasisHub/440000554/3615/%25E5%25BD%2592%25E6%25A1%25A3.gltf"
//   })
//   .then((gltf: GLTFResource) => {
//     const { defaultSceneRoot } = gltf;

//     for (let i = 0; i < 10; i++) {
//       const clone = defaultSceneRoot.clone();
//       clone.transform.setPosition(i - 5, 0, 0);
//       rootEntity.addChild(clone);
//     }
//   });

const mesh = PrimitiveMesh.createSphere(engine);
const entity = new Entity(engine);
const renderer = entity.addComponent(MeshRenderer);
const material = new UnlitMaterial(engine);
material.baseColor.set(0.5, 0.5, 0, 1);
renderer.mesh = mesh;

renderer.setMaterial(material);
for (let i = 0; i < 10; i++) {
  const clone = entity.clone();
  clone.transform.setPosition(i - 5, 0, 0);
  rootEntity.addChild(clone);
}
