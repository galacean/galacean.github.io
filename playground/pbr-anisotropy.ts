/**
 * @title PBR Anisotropy
 * @category Material
 */
import {
  AmbientLight,
  AssetType,
  Camera,
  DirectLight,
  MeshRenderer,
  PBRMaterial,
  PrimitiveMesh,
  Script,
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
  cameraEntity.addComponent(Camera);
  cameraEntity.transform.setPosition(0, 2, 2.5);
  cameraEntity.transform.lookAt(new Vector3(0, 0, 0));
  cameraEntity.addComponent(OrbitControl);

  const lightEntity = rootEntity.createChild("light");
  const light = lightEntity.addComponent(DirectLight);
  lightEntity.transform.setRotation(-50, 180, 0);
  light.color.set(0.1, 0, 0);

  class Rotate extends Script {
    onUpdate(deltaTime: number): void {
      this.entity.transform.rotate(0, 50 * deltaTime, 0);
    }
  }

  engine.resourceManager
    .load<AmbientLight>({
      type: AssetType.Env,
      url: "https://mdn.alipayobjects.com/oasis_be/afts/file/A*4zvFQaMWvOsAAAAAAAAAAAAADkp5AQ/ambient.bin"
    })
    .then((ambientLight) => {
      ambientLight.specularIntensity = 2;
      scene.ambientLight = ambientLight;
      engine.run();
    });

  const entity = rootEntity.createChild("entity");
  const renderer = entity.addComponent(MeshRenderer);
  const material = new PBRMaterial(engine);
  material.metallic = 1;
  material.roughness = 0.3;
  material.anisotropy = 1;
  renderer.mesh = PrimitiveMesh.createCylinder(engine, 1, 1, 0, 64);
  renderer.setMaterial(material);

  engine.resourceManager
    .load({
      type: AssetType.Texture2D,
      url: "https://mdn.alipayobjects.com/huamei_dmxymu/afts/img/A*dQ44Q6E5TzUAAAAAAAAAAAAADuuHAQ/original"
    })
    .then((texture) => {
      material.anisotropyTexture = texture;
      const rotateComponent = entity.addComponent(Rotate);

      const debugInfo = {
        aniso_x: 1,
        aniso_y: 1,
        rotate: true,
        texture: true
      };

      gui.add(material, "roughness", 0, 1, 0.01);
      gui.add(material, "anisotropy", -5, 5, 0.01);
      gui.add(material, "anisotropyRotation", -180, 180, 0.01);

      gui.add(debugInfo, "rotate").onChange((v) => {
        rotateComponent.enabled = v;
      });

      gui.add(debugInfo, "texture").onChange((v) => {
        if (v) {
          material.anisotropyTexture = texture;
        } else {
          material.anisotropyTexture = null;
        }
      });
    });
});
