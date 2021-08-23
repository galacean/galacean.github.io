/**
 * @title Orthographic Camera
 * @category Camera
 */
import * as dat from "dat.gui";
import * as o3 from "oasis-engine";
import {DirectLight, Logger} from "oasis-engine";
import {OrbitControl} from "@oasis-engine/controls";

Logger.enable();
const engine = new o3.WebGLEngine("canvas");
engine.canvas.resizeByClientSize();
const rootEntity = engine.sceneManager.activeScene.createRootEntity();

// init camera
const cameraEntity = rootEntity.createChild("camera");
const camera = cameraEntity.addComponent(o3.Camera);
camera.nearClipPlane = 0.1;
const pos = cameraEntity.transform.position;
pos.setValue(10, 2, 10);
cameraEntity.transform.position = pos;
cameraEntity.transform.lookAt(new o3.Vector3(0, 0, 0));
cameraEntity.addComponent(OrbitControl);

const lightNode = rootEntity.createChild("Light");
lightNode.transform.setRotation(-30, 0, 0);
lightNode.addComponent(DirectLight);

// init cube
const createCube = (x: number, y: number, z: number) => {
  const cubeEntity = rootEntity.createChild("cube");
  cubeEntity.transform.setPosition(x, y, z);
  const renderer = cubeEntity.addComponent(o3.MeshRenderer);
  renderer.mesh = o3.PrimitiveMesh.createCuboid(engine, 1, 1, 1);
  const material = new o3.BlinnPhongMaterial(engine);
  material.baseColor = new o3.Color(1, 0.25, 0.25, 1);
  renderer.setMaterial(material);
}
createCube(0, 0, 0);
createCube(6.5, 0, 6.5);
createCube(-6.5, 0, -6.5);

engine.run();

function addGUI() {
  const gui = new dat.GUI();
  const cameraFolder = gui.addFolder("camera orthogonal switch");
  cameraFolder.open();
  camera.isOrthographic = true;
  cameraFolder.add(camera, "isOrthographic");
}

addGUI();

