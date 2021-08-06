/**
 * @title Animation
 * @category Benchmark
 */
import { OrbitControl } from "@oasis-engine/controls";
import { Animator, AssetType, Camera, GLTFResource, PBRMaterial, Texture2D, WebGLEngine } from "oasis-engine";

// Create engine object.
const engine = new WebGLEngine("canvas");
engine.canvas.resizeByClientSize();

// Create root entity and get scene.
const scene = engine.sceneManager.activeScene;
const rootEntity = scene.createRootEntity();
scene.ambientLight.diffuseSolidColor.setValue(1, 1, 1, 1);

// Create camera.
const cameraEntity = rootEntity.createChild("Camera");
cameraEntity.transform.setPosition(0, 0, 12);
cameraEntity.addComponent(Camera);
cameraEntity.addComponent(OrbitControl);

// Load resources and add modles.
engine.resourceManager
  .load([
    {
      url: "https://gw.alipayobjects.com/os/loanprod/bf055064-3eec-4d40-bce0-ddf11dfbb88a/5d78db60f211d21a43834e23/4f5e6bb277dd2fab8e2097d7a418c5bc.gltf",
      type: AssetType.Prefab
    },
    {
      url: "https://gw-office.alipayobjects.com/basement_prod/3c140e43-e7d8-4c51-999e-1f68218afc54.jpg",
      type: AssetType.Texture2D
    }
  ])
  .then((reources: Object[]) => {
    const gltf = <GLTFResource>reources[0];
    const baseTexture = <Texture2D>reources[1];
    const huabei = gltf.defaultSceneRoot;

    gltf.materials.forEach((material: PBRMaterial) => {
      material.baseTexture = baseTexture;
      material.baseColor.setValue(1, 1, 1, 1);
    });

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const huabeiClone = huabei.clone();
        rootEntity.addChild(huabeiClone);

        const { transform } = huabeiClone;
        transform.setRotation(0, -90, 0);
        transform.setScale(0.5, 0.5, 0.5);
        transform.setPosition(i * 1.0 - 3.0, j * 1.2, -j * 3.5);

        huabeiClone.getComponent(Animator).play("A");
      }
    }
  });

// Run engine
engine.run();
