/**
 * @title Outline
 * @category Toolkit
 */
import * as dat from "dat.gui";
import { AmbientLight, Animator, AssetType, Camera, GLTFResource, Logger, WebGLEngine, WebGLMode } from "oasis-engine";
import { FramebufferPicker, OrbitControl, OutlineManager } from "oasis-engine-toolkit";
Logger.enable();
const gui = new dat.GUI();
const engine = new WebGLEngine("canvas", { webGLMode: WebGLMode.WebGL1 });
engine.run();
engine.canvas.resizeByClientSize();

const scene = engine.sceneManager.activeScene;
const rootEntity = scene.createRootEntity();
scene.background.solidColor.set(1, 1, 1, 1);

// camera
const cameraEntity = rootEntity.createChild("camera_node");
cameraEntity.transform.setPosition(0, 1.3, 10);

const camera = cameraEntity.addComponent(Camera);
camera.enableFrustumCulling = false;
cameraEntity.addComponent(OrbitControl).target.set(0, 1.3, 0);

const outlineManager = cameraEntity.addComponent(OutlineManager);
gui.add(outlineManager, "size", 1, 6, 0.1);
gui
  .addColor(
    { color: [outlineManager.color.r * 255, outlineManager.color.g * 255, outlineManager.color.b * 255] },
    "color"
  )
  .onChange((v) => {
    outlineManager.color.set(v[0] / 255, v[1] / 255, v[2] / 255, 1);
  });

const framebufferPicker = rootEntity.addComponent(FramebufferPicker);
framebufferPicker.camera = camera;

document.getElementById("canvas").addEventListener("mousedown", (e) => {
  framebufferPicker.pick(e.offsetX, e.offsetY).then((renderElement) => {
    outlineManager.clear();
    if (renderElement) {
      console.log(renderElement.component.entity);

      outlineManager.addEntity(renderElement.component.entity.parent);
    }
  });
});

// ambient light
engine.resourceManager
  .load<AmbientLight>({
    type: AssetType.Env,
    url: "https://gw.alipayobjects.com/os/bmw-prod/89c54544-1184-45a1-b0f5-c0b17e5c3e68.bin"
  })
  .then((ambientLight) => {
    scene.ambientLight = ambientLight;
    ambientLight.specularIntensity = ambientLight.diffuseIntensity = 2;
  });

engine.resourceManager
  .load({
    type: AssetType.Prefab,
    // url: "https://gw.alipayobjects.com/os/OasisHub/440000554/3615/%25E5%25BD%2592%25E6%25A1%25A3.gltf"
    // url: "https://gw.alipayobjects.com/os/OasisHub/267000040/9994/%25E5%25BD%2592%25E6%25A1%25A3.gltf"
    url: "https://gw.alipayobjects.com/os/bmw-prod/5e3c1e4e-496e-45f8-8e05-f89f2bd5e4a4.glb"
  })
  .then((gltf: GLTFResource) => {
    const { defaultSceneRoot, animations } = gltf;

    for (let i = 0; i < 10; i++) {
      const clone = defaultSceneRoot.clone();
      clone.transform.setPosition(i - 5, 0, 0);
      rootEntity.addChild(clone);
      const animator = clone.getComponent(Animator);
      animator.play(animations[0].name);
    }
  });
