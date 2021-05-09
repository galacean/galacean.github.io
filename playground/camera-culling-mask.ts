import * as o3 from "oasis-engine";
// import * as dat from "dat.gui";

const engine = new o3.WebGLEngine("canvas");
engine.canvas.resizeByClientSize();

const rootEntity = engine.sceneManager.activeScene.createRootEntity();

// init camera
const cameraEntity = rootEntity.createChild("camera");
const camera = cameraEntity.addComponent(o3.Camera);
const pos = cameraEntity.transform.position;
pos.setValue(10, 10, 10);
cameraEntity.transform.position = pos;
cameraEntity.transform.lookAt(new o3.Vector3(0, 0, 0));

// init light
const light = rootEntity.addComponent(o3.AmbientLight);
light.intensity = 1.2;

// init cube
const cubeEntity = rootEntity.createChild("cube");
const renderer = cubeEntity.addComponent(o3.MeshRenderer);
renderer.mesh = o3.PrimitiveMesh.createCuboid(engine, 1, 1, 1);
const material = new o3.BlinnPhongMaterial(engine);
material.baseColor = new o3.Color(1, 0.25, 0.25, 1);
renderer.setMaterial(material);

engine.run();

// function addGUI() {
//   const gui = new dat.GUI();
//   const cameraFolder = gui.addFolder("camera cullingMask");
//   cameraFolder.open();
//   const constMap = {
//     EveryThing: o3.Layer.Everything,
//     Layer1: o3.Layer.Layer1,
//     Layer2: o3.Layer.Layer2,
//     Layer3: o3.Layer.Layer3
//   };
//   const cameraController = cameraFolder.add({ cullingMask: "EveryThing" }, "cullingMask", Object.keys(constMap));
//   cameraController.onChange((v) => {
//     camera.cullingMask = constMap[v];
//   });

//   const boxFolder = gui.addFolder("box layer");
//   boxFolder.open();
//   const boxController = boxFolder.add({ layer: "EveryThing" }, "layer", Object.keys(constMap));
//   boxController.onChange((v) => {
//     renderer.entity.layer = constMap[v];
//   });
// }

// addGUI();
