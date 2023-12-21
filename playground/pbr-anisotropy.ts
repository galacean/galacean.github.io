/**
 * @title PBR Anisotropy
 * @category Material
 */
import {
  AmbientLight,
  AssetType,
  BackgroundMode,
  Camera,
  DirectLight,
  GLTFResource,
  PBRMaterial,
  PrimitiveMesh,
  Script,
  SkyBoxMaterial,
  Vector3,
  WebGLEngine
} from "@galacean/engine";
import { OrbitControl } from "@galacean/engine-toolkit-controls";
import * as dat from "dat.gui";

const gui = new dat.GUI();

WebGLEngine.create({ canvas: "canvas" }).then((engine) => {
  engine.canvas.resizeByClientSize();
  const scene = engine.sceneManager.activeScene;
  const rootEntity = scene.createRootEntity();
  const cameraEntity = rootEntity.createChild("camera");
  const target = new Vector3(0, 1.4, 0);
  cameraEntity.addComponent(Camera);
  cameraEntity.transform.setPosition(0, target.y, 0.8);
  cameraEntity.transform.lookAt(target);
  const control = cameraEntity.addComponent(OrbitControl);
  control.target = target;
  control.minDistance = 0.5;
  control.maxDistance = 3;

  // Create sky
  const sky = scene.background.sky;
  const skyMaterial = new SkyBoxMaterial(engine);
  scene.background.mode = BackgroundMode.Sky;

  sky.material = skyMaterial;
  sky.mesh = PrimitiveMesh.createCuboid(engine, 1, 1, 1);

  const directLightNodeFront = rootEntity.createChild("dir_light_front");
  const directLightNodeBack = rootEntity.createChild("dir_light_back");
  directLightNodeFront.addComponent(DirectLight);
  directLightNodeBack.addComponent(DirectLight);
  directLightNodeBack.transform.setRotation(0, 180, 0);

  class Rotate extends Script {
    onUpdate(deltaTime: number): void {
      this.entity.transform.rotate(100 * deltaTime, 0, 0);
    }
  }

  const rotateComponent = directLightNodeFront.addComponent(Rotate);

  engine.resourceManager
    .load<AmbientLight>({
      type: AssetType.Env,
      url: "https://gw.alipayobjects.com/os/bmw-prod/89c54544-1184-45a1-b0f5-c0b17e5c3e68.bin"
    })
    .then((ambientLight) => {
      scene.ambientLight = ambientLight;
      skyMaterial.texture = ambientLight.specularTexture;
      skyMaterial.textureDecodeRGBM = true;
      engine.run();
    });

  engine.resourceManager
    .load<GLTFResource>("https://mdn.alipayobjects.com/oasis_be/afts/file/A*qEVES6mkMjkAAAAAAAAAAAAADkp5AQ/hair.glb")
    .then((gltf) => {
      const hairMat = gltf.materials![0] as PBRMaterial;
      rootEntity.addChild(gltf.defaultSceneRoot);

      hairMat.metallic = 0;
      hairMat.anisotropy = 0.8;

      const debugInfo = {
        aniso_x: 1,
        aniso_y: 0,
        rotate: true
      };

      gui.add(hairMat, "anisotropy", 0, 1, 0.01);
      gui.add(debugInfo, "aniso_x", 0, 1, 0.01).onChange((v) => {
        hairMat.anisotropyDirection.x = v;
      });
      gui.add(debugInfo, "aniso_y", 0, 1, 0.01).onChange((v) => {
        hairMat.anisotropyDirection.y = v;
      });

      gui.add(debugInfo, "rotate").onChange((v) => {
        rotateComponent.enabled = v;
      });
    });
});
