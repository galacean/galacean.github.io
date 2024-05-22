/**
 * @title Transparent Shadow
 * @category Light
 */
import { AssetType, Light, ShadowResolution, ShadowType, WebGLEngine, WebGLMode } from "@galacean/engine";
import { OrbitControl } from "@galacean/engine-toolkit";
import * as dat from "dat.gui";
const gui = new dat.GUI();

WebGLEngine.create({
  canvas: "canvas",
  graphicDeviceOptions: {
    webGLMode: WebGLMode.WebGL2
  }
}).then((engine) => {
  engine.canvas.resizeByClientSize();

  engine.resourceManager
    .load<void>({
      type: AssetType.Project,
      url: "https://mdn.alipayobjects.com/oasis_be/afts/file/A*SzT-T4bHZecAAAAAAAAAAAAADkp5AQ/project.json"
    })
    .then(() => {
      const scene = engine.sceneManager.activeScene;
      const cameraEntity = scene.findEntityByName("Camera")!;
      const lightEntity = scene.findEntityByName("DirectLight")!;
      cameraEntity.addComponent(OrbitControl)!;
      const light = lightEntity.getComponent(Light);

      scene.enableTransparentShadow = true;

      const debugInfo = {
        shadowResolution: scene.shadowResolution
      };

      gui.add(scene, "enableTransparentShadow");
      gui.add(light, "shadowType", [ShadowType.None, ShadowType.Hard, ShadowType.SoftLow, ShadowType.SoftHigh]);
      gui.add(scene, "shadowDistance", 0, 200);
      gui
        .add(debugInfo, "shadowResolution", [
          ShadowResolution.Low,
          ShadowResolution.Medium,
          ShadowResolution.High,
          ShadowResolution.VeryHigh
        ])
        .onChange((v) => {
          scene.shadowResolution = v - 0;
        });

      engine.run();
    });
});
