/**
 * @title Scene Fog
 * @category Scene
 */

import { FreeControl } from "@oasis-engine-toolkit/controls";
import * as dat from "dat.gui";
import {
  AmbientLight,
  AssetType,
  Camera,
  Color,
  DirectLight,
  FogMode,
  GLTFResource,
  Scene,
  ShadowType,
  Vector3,
  WebGLEngine
} from "oasis-engine";

async function init() {
  const engine = new WebGLEngine("canvas");
  engine.canvas.resizeByClientSize();

  const scene = engine.sceneManager.activeScene;

  // Set shadow distance
  scene.shadowDistance = 20;

  // Set fog
  scene.fogMode = FogMode.ExponentialSquared;
  scene.fogDensity = 0.1;
  scene.fogEnd = 30;
  scene.fogColor = new Color(0.5, 0.5, 0.5);

  const rootEntity = scene.createRootEntity();

  // Create camera entity and component
  const cameraEntity = rootEntity.createChild("camera");
  cameraEntity.transform.setPosition(3, 2.5, 0);
  cameraEntity.transform.lookAt(new Vector3(0, 2, 0));
  cameraEntity.addComponent(Camera);
  cameraEntity.addComponent(FreeControl).floorMock = false;

  // Create light entity and component
  const lightEntity = rootEntity.createChild("light");
  lightEntity.transform.setPosition(0.5, 0.9, 0);
  lightEntity.transform.lookAt(new Vector3(0, 0, 0));

  // Enable light cast shadow
  const directLight = lightEntity.addComponent(DirectLight);
  directLight.shadowType = ShadowType.SoftLow;

  // Add ambient light
  const ambientLight = await engine.resourceManager.load<AmbientLight>({
    url: "https://gw.alipayobjects.com/os/bmw-prod/09904c03-0d23-4834-aa73-64e11e2287b0.bin",
    type: AssetType.Env,
  });
  scene.ambientLight = ambientLight;

  // Add model
  const glTFResource = await engine.resourceManager.load<GLTFResource>(
    "https://gw.alipayobjects.com/os/bmw-prod/ca50859b-d736-4a3e-9fc3-241b0bd2afef.gltf"
  );
  rootEntity.addChild(glTFResource.defaultSceneRoot);

  engine.run();

  // Add debug GUI for fog
  addDebugGUI(scene);
}

function addDebugGUI(scene: Scene): void {
  let fogStartItem;
  let fogEndItem;
  let fogDensityItem;
  const gui = new dat.GUI();

  let switchMode = (mode: FogMode) => {
    switch (mode) {
      case FogMode.None:
        clearModeItems();
        break;
      case FogMode.Linear:
        clearModeItems();
        fogStartItem = gui.add(debugInfos, "fogStart", 0, 300).onChange((v) => {
          scene.fogStart = v;
        });

        fogEndItem = gui.add(debugInfos, "fogEnd", 0, 300).onChange((v) => {
          scene.fogStart = v;
        });
        break;
      case FogMode.Exponential:
      case FogMode.ExponentialSquared:
        clearModeItems();
        fogDensityItem = gui
          .add(debugInfos, "fogDensity", 0.01, 0.1)
          .onChange((v) => {
            scene.fogDensity = v;
          });
        break;
    }
    scene.fogMode = mode;
  };

  let clearModeItems = () => {
    if (fogStartItem) {
      fogStartItem.remove();
      fogStartItem = null;
    }
    if (fogEndItem) {
      fogEndItem.remove();
      fogEndItem = null;
    }
    if (fogDensityItem) {
      fogDensityItem.remove();
      fogDensityItem = null;
    }
  };

  const fogColor = scene.fogColor;
  const debugInfos = {
    fogMode: scene.fogMode,
    fogColor: [fogColor.r * 255, fogColor.g * 255, fogColor.b * 255],
    fogStart: scene.fogStart,
    fogEnd: scene.fogEnd,
    fogDensity: scene.fogDensity,
  };

  gui
    .add(debugInfos, "fogMode", {
      None: FogMode.None,
      Linear: FogMode.Linear,
      Exponential: FogMode.Exponential,
      ExponentialSquared: FogMode.ExponentialSquared,
    })
    .onChange((v) => {
      switchMode(parseInt(v));
    });

  gui.addColor(debugInfos, "fogColor").onChange((v) => {
    scene.fogColor.set(v[0] / 255, v[1] / 255, v[2] / 255, 1.0);
  });

  switchMode(scene.fogMode);
}
init();
