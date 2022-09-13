/**
 * @title Shadow Basic
 * @category Light
 */

import {FreeControl} from "@oasis-engine-toolkit/controls";
import {Camera, GLTFResource, WebGLEngine, Vector3, DirectLight, Color, MeshRenderer} from "oasis-engine";

const engine = new WebGLEngine("canvas");
engine.canvas.resizeByClientSize();
const scene = engine.sceneManager.activeScene;
scene.ambientLight.diffuseSolidColor.set(1, 1, 1, 1);

const rootEntity = scene.createRootEntity();

const cameraEntity = rootEntity.createChild("camera");
cameraEntity.transform.setPosition(3, 2, 0.5);
cameraEntity.transform.lookAt(new Vector3(0, 2, 0.5));
cameraEntity.addComponent(Camera);
cameraEntity.transform.setPosition(3, 3, 3);
cameraEntity.addComponent(FreeControl);

// Create an entity to add light component
const lightEntity = rootEntity.createChild("light");
lightEntity.transform.setRotation(45, 45, 45);
const directLight = lightEntity.addComponent(DirectLight);
directLight.color = new Color(1.0, 1.0, 1.0);
directLight.enableShadow = true;

engine.resourceManager
  .load<GLTFResource>("https://gw.alipayobjects.com/os/bmw-prod/ca50859b-d736-4a3e-9fc3-241b0bd2afef.gltf")
  .then((gltf) => {
    rootEntity.addChild(gltf.defaultSceneRoot);

    const renderers: MeshRenderer[] = [];
    gltf.defaultSceneRoot.getComponentsIncludeChildren(MeshRenderer, renderers);
    for (let i = 0; i < renderers.length; i++) {
      const renderer = renderers[i];
      renderer.receiveShadows = true;
      renderer.castShadows = true;
    }

    engine.run();
  });
