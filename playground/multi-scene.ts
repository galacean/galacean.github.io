/**
 * @title Multi Scene
 * @category Scene
 */

import {
  AssetType,
  BackgroundMode,
  BlinnPhongMaterial,
  Camera,
  Color,
  DirectLight,
  Engine,
  GLTFResource,
  Layer,
  MeshRenderer,
  PrimitiveMesh,
  Scene,
  Script,
  SkyBoxMaterial,
  TextureCube,
  Vector3,
  WebGLEngine,
} from "@galacean/engine";
import { OrbitControl } from "@galacean/engine-toolkit-controls";

WebGLEngine.create({ canvas: "canvas" }).then((engine) => {
  engine.canvas.resizeByClientSize();

  initFirstScene(engine);
  initSecondScene(engine);

  engine.run();
});

function initFirstScene(engine: Engine): void {
  const scene = engine.sceneManager.scenes[0];
  const rootEntity = scene.createRootEntity();

  // Add sky box background
  engine.resourceManager
    .load<TextureCube>({
      urls: [
        "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*5w6_Rr6ML6IAAAAAAAAAAAAAARQnAQ",
        "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*TiT2TbN5cG4AAAAAAAAAAAAAARQnAQ",
        "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*8GF6Q4LZefUAAAAAAAAAAAAAARQnAQ",
        "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*D5pdRqUHC3IAAAAAAAAAAAAAARQnAQ",
        "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*_FooTIp6pNIAAAAAAAAAAAAAARQnAQ",
        "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*CYGZR7ogZfoAAAAAAAAAAAAAARQnAQ",
      ],
      type: AssetType.TextureCube,
    })
    .then((cubeMap1) => {
      const { background } = scene;
      background.mode = BackgroundMode.Sky;
      const skyMaterial = new SkyBoxMaterial(engine);
      skyMaterial.texture = cubeMap1;

      background.sky.material = skyMaterial;
      background.sky.mesh = PrimitiveMesh.createCuboid(engine, 2, 2, 2);
    });

  // Create full screen camera
  const cameraEntity = rootEntity.createChild("fullscreen-camera");
  const camera = cameraEntity.addComponent(Camera);
  camera.cullingMask = Layer.Layer0;
  cameraEntity.transform.setPosition(10, 10, 10);
  cameraEntity.transform.lookAt(new Vector3(0, 0, 0));
  cameraEntity.addComponent(OrbitControl);

  const lightEntity = rootEntity.createChild("Light");
  lightEntity.transform.setRotation(-30, 0, 0);
  lightEntity.addComponent(DirectLight);

  // Create cube
  const cubeEntity = rootEntity.createChild("cube");
  cubeEntity.transform.setPosition(-3, 0, 3);
  const renderer = cubeEntity.addComponent(MeshRenderer);
  renderer.mesh = PrimitiveMesh.createSphere(engine, 2, 24);
  const material = new BlinnPhongMaterial(engine);
  material.baseColor = new Color(1, 0.25, 0.25, 1);
  renderer.setMaterial(material);
}
4;

function initSecondScene(engine: Engine): void {
  // Init window camera
  const scene = new Scene(engine);
  engine.sceneManager.addScene(scene);
  const rootEntity = scene.createRootEntity();

  const lightEntity = rootEntity.createChild("Light");
  lightEntity.transform.setRotation(-45, 0, 0);
  lightEntity.addComponent(DirectLight);

  const cameraEntity = rootEntity.createChild("window-camera");
  const camera = cameraEntity.addComponent(Camera);
  camera.viewport.set(0.6, 0.2, 0.25, 0.6);
  camera.farClipPlane = 200;
  cameraEntity.transform.setPosition(0, 3, 5);
  cameraEntity.transform.lookAt(new Vector3(0, 1, 0));

  engine.resourceManager
    .load<GLTFResource>(
      "https://gw.alipayobjects.com/os/OasisHub/267000040/9994/%25E5%25BD%2592%25E6%25A1%25A3.gltf"
    )
    .then((gltf) => {
      const defaultSceneRoot = gltf.defaultSceneRoot;
      rootEntity.addChild(defaultSceneRoot);
      defaultSceneRoot.addComponent(RotateScript);
    });
}

/**
 * Script for rotate.
 */
class RotateScript extends Script {
  /**
   * @override
   * The main loop, called frame by frame.
   * @param deltaTime - The deltaTime when the script update.
   */
  onUpdate(deltaTime: number): void {
    this.entity.transform.rotate(0.0, 50 * deltaTime, 0);
  }
}
