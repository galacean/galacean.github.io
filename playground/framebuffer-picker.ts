/**
 * @title Framebuffer Picker
 * @category Advance
 */
import { OrbitControl } from "@oasis-engine/controls";
import { FramebufferPicker } from "@oasis-engine/framebuffer-picker";
import { Camera, GLTFResource, PBRMaterial, Vector3, WebGLEngine } from "oasis-engine";

const engine = new WebGLEngine("canvas");
engine.canvas.resizeByClientSize();
const scene = engine.sceneManager.activeScene;
const rootNode = scene.createRootEntity();
scene.ambientLight.diffuseSolidColor.setValue(0.6, 0.6, 0.6, 1);

// Create camera
const cameraNode = rootNode.createChild("camera_node");
cameraNode.transform.position = new Vector3(10, 10, 30);
const camera = cameraNode.addComponent(Camera);
const control = cameraNode.addComponent(OrbitControl);
control.target.setValue(0, 3, 0);

engine.resourceManager
  .load<GLTFResource>("https://gw.alipayobjects.com/os/bmw-prod/f40ef8dd-4c94-41d4-8fac-c1d2301b6e47.glb")
  .then((gltf) => {
    const { defaultSceneRoot, materials } = gltf;
    const material = materials[0] as PBRMaterial;

    defaultSceneRoot.transform.setScale(0.1, 0.1, 0.1);
    rootNode.addChild(defaultSceneRoot);

    // add framebuffer picker component
    const framebufferPicker = rootNode.addComponent(FramebufferPicker);
    framebufferPicker.camera = camera;
    framebufferPicker.onPick = (obj) => {
      if (obj) {
        const { component, mesh } = obj;
        console.log(component, mesh);
        material.baseColor.setValue(1, 0, 0, 1);
      } else {
        material.baseColor.setValue(1, 1, 1, 1);
      }
    };

    document.getElementById("canvas").addEventListener("mousedown", (e) => {
      framebufferPicker.pick(e.offsetX, e.offsetY);
    });
  });

// Run
engine.run();
