/**
 * @title Shadow
 * @category Light
 */
import {
  BlinnPhongMaterial,
  Camera,
  Color,
  MeshRenderer,
  PrimitiveMesh,
  Script,
  SpotLight,
  Vector3,
  WebGLEngine
} from "oasis-engine";
import { OrbitControl } from "@oasis-engine-toolkit/controls";
const target = new Vector3(0, -3, 0);
const up = new Vector3(0, 1, 0);

class Move extends Script {
  time = 0;
  y = 3;
  range = 5;

  constructor(node) {
    super(node);
  }

  onUpdate(deltaTime) {
    this.time += deltaTime / 1000;
    let x = Math.cos(this.time) * this.range;
    let y = Math.sin(this.time) * this.range * 0.2 + this.y;
    let z = Math.cos(this.time) * this.range;
    this.entity.transform.position = new Vector3(x, y, z);
  }
}

// 控制 light entity 始终看向固定点
class LookAtFocus extends Script {
  onUpdate(deltaTime) {
    light1.transform.lookAt(target, up);
  }
}

//-- create engine object
const engine = new WebGLEngine("canvas");
engine.canvas.resizeByClientSize();

const scene = engine.sceneManager.activeScene;
const rootEntity = scene.createRootEntity();

// Logger.enable();
function createCuboidGeometry(name, position, rotation, w, h, d, castShadow: boolean = false) {
  let obj = rootEntity.createChild(name);
  obj.transform.position = position;
  obj.transform.rotation = rotation;
  let cubeRenderer = obj.addComponent(MeshRenderer);
  cubeRenderer.mesh = PrimitiveMesh.createCuboid(rootEntity.engine, w, h, d);
  cubeRenderer.setMaterial(mtl);
  cubeRenderer["recieveShadow"] = !castShadow;
  cubeRenderer["castShadow"] = castShadow;
}

let mtl = new BlinnPhongMaterial(engine);
mtl.baseColor = new Color(0.1, 0.9, 0.8, 1);
//-- create light entity
let lighthouse = rootEntity.createChild("lighthouse");
let light1 = lighthouse.createChild("light1");
light1.addComponent(Move);
light1.addComponent(LookAtFocus);

let spotLight = light1.addComponent(SpotLight);
spotLight.angle = Math.PI / 12;
spotLight["enableShadow"] = true;
spotLight["shadow"].bias = 0.0001;
spotLight["shadow"].intensity = 0.2;

let sphereRenderer3 = light1.addComponent(MeshRenderer);
sphereRenderer3.mesh = PrimitiveMesh.createSphere(engine, 0.1);
sphereRenderer3.setMaterial(mtl);

//-- create geometry
createCuboidGeometry("cubiod1", new Vector3(0, -3, 0), new Vector3(0, 0, 0), 10, 0.1, 10);
createCuboidGeometry("cubiod2", new Vector3(5, -2, 0), new Vector3(0, 0, 0), 0.1, 2, 10);
createCuboidGeometry("cubiod3", new Vector3(-5, -2, 0), new Vector3(0, 0, 0), 0.1, 2, 10);
createCuboidGeometry("cubiod4", new Vector3(0, -2, -5), new Vector3(0, 0, 0), 10, 2, 0.1);
createCuboidGeometry("cubiod-cast-shadow", new Vector3(0, -1, 0), new Vector3(0, 0, 0), 1, 1, 1, true);

//-- create camera
let cameraNode = rootEntity.createChild("camera_node");
cameraNode.transform.position = new Vector3(0, 5, 17);
cameraNode.transform.lookAt(new Vector3(), new Vector3(0, 1, 0));
cameraNode.addComponent(Camera);
cameraNode.addComponent(OrbitControl);

//-- run
engine.run();
