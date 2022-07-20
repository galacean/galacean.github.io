/**
 * @title Framebuffer Picker
 * @category Toolkit
 */
 import { FramebufferPicker, OrbitControl } from "oasis-engine-toolkit";
 import { Camera, GLTFResource, PBRMaterial, Vector3, WebGLEngine } from "oasis-engine";
 
 const engine = new WebGLEngine("canvas");
 engine.canvas.resizeByClientSize();
 const scene = engine.sceneManager.activeScene;
 const rootNode = scene.createRootEntity();
 scene.ambientLight.diffuseSolidColor.set(1, 1, 1, 1);
 
 // Create camera
 const cameraNode = rootNode.createChild("camera_node");
 cameraNode.transform.position = new Vector3(10, 10, 30);
 const camera = cameraNode.addComponent(Camera);
 const control = cameraNode.addComponent(OrbitControl);
 control.target.set(0, 3, 0);
 
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
 
     document.getElementById("canvas").addEventListener("mousedown", (e) => {
       framebufferPicker.pick(e.offsetX, e.offsetY).then((renderElement) => {
         if (renderElement) {
           material.baseColor.set(1, 0, 0, 1);
         } else {
           material.baseColor.set(1, 1, 1, 1);
         }
       });
     });
   });
 
 // Run
 engine.run();
 
 