import { WebGLEngine, Camera, Vector3, AmbientLight, MeshRenderer, PrimitiveMesh, BlinnPhongMaterial, Color, Layer} from "oasis-engine";
import * as dat from "dat.gui";

const engine = new WebGLEngine("canvas");
engine.canvas.resizeByClientSize();

const rootEntity = engine.sceneManager.activeScene.createRootEntity();

// init camera
const cameraEntity = rootEntity.createChild("camera");
cameraEntity.addComponent(Camera);
const pos = cameraEntity.transform.position;
pos.setValue(10, 10, 10);
cameraEntity.transform.position = pos;
cameraEntity.transform.lookAt(new Vector3(0, 0, 0));

// init light
const light = rootEntity.addComponent(AmbientLight);
light.intensity = 1.2;

// init cube
const cubeEntity = rootEntity.createChild("cube");
const renderer = cubeEntity.addComponent(MeshRenderer);
renderer.mesh = PrimitiveMesh.createCuboid(engine, 1, 1, 1);
const material = new BlinnPhongMaterial(engine);
material.baseColor = new Color(1, 0.25, 0.25, 1);
renderer.setMaterial(material);

engine.run();

function addGUI() {
  const gui = new dat.GUI();
  const cameraFolder = gui.addFolder("camera cullingMask");
  cameraFolder.open();
  const constMap = {
    EveryThing: Layer.Everything,
    Layer1: Layer.Layer1,
    Layer2: Layer.Layer2,
    Layer3: Layer.Layer3
  };
  const cameraController = cameraFolder.add({ cullingMask: "EveryThing" }, "cullingMask", Object.keys(constMap));
  cameraController.onChange((v) => {
    camera.cullingMask = constMap[v];
  });

  const boxFolder = gui.addFolder("box layer");
  boxFolder.open();
  const boxController = boxFolder.add({ layer: "EveryThing" }, "layer", Object.keys(constMap));
  boxController.onChange((v) => {
    renderer.entity.layer = constMap[v];
  });
}

addGUI();
