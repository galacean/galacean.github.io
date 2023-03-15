/**
 * @title CSS DOM
 * @category 2D
 */
import { AssetType, Camera, Entity, GLTFResource, Logger, Script, Vector3, WebGLEngine, WebGLMode } from "oasis-engine";
import { OrbitControl } from "oasis-engine-toolkit";
Logger.enable();

//-- create engine object
const engine = new WebGLEngine("canvas", { webGLMode: WebGLMode.Auto });
engine.canvas.resizeByClientSize();

const scene = engine.sceneManager.activeScene;
const rootEntity = scene.createRootEntity();

//Create camera
const cameraNode = rootEntity.createChild("camera_node");
cameraNode.transform.setPosition(0, 1.5, 5);
const camera = cameraNode.addComponent(Camera);
cameraNode.addComponent(OrbitControl);

engine.run();

// load gltf
engine.resourceManager
  .load<GLTFResource>({
    type: AssetType.Prefab,
    url: "https://gw.alipayobjects.com/os/bmw-prod/8d36415b-5905-461f-9336-68a23d41518e.gltf"
  })
  .then((gltf) => {
    console.log(gltf);

    const { defaultSceneRoot } = gltf;
    rootEntity.addChild(defaultSceneRoot);

    // important !
    defaultSceneRoot.addComponent(Renderer2DScript);
  });

// test dom
const dom = document.createElement("div");
dom.innerHTML = "Hello world!!!";
dom.setAttribute("style", "padding:10px;position:absolute;top:0;left:0;background:white;border-radius:5px;font-size:16px;");
document.body.appendChild(dom);

class Renderer2DScript extends Script {
  screen: Vector3 = new Vector3();
  widthRatio: number;
  heightRatio: number;
  constructor(entity: Entity) {
    super(entity);
    this.widthRatio = engine.canvas.width / engine.canvas._webCanvas.clientWidth;
    this.heightRatio = engine.canvas.height / engine.canvas._webCanvas.clientHeight;
  }

  onUpdate() {
    camera.worldToScreenPoint(this.entity.transform.position, this.screen);
    dom.style.left = `${this.screen.x / this.widthRatio}px`;
    dom.style.top = `${this.screen.y / this.heightRatio}px`;
  }
}
