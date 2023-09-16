/**
 * @title GLTF Basic
 * @category Basic
 */
import { OrbitControl } from "@galacean/engine-toolkit-controls";
import { Camera, GLTFResource, Rand, WebGLEngine } from "@galacean/engine";

WebGLEngine.create({ canvas: "canvas" }).then((engine) => {
  engine.canvas.resizeByClientSize();

  const rootEntity = engine.sceneManager.activeScene.createRootEntity();

  const cameraEntity = rootEntity.createChild("camera");
  cameraEntity.addComponent(Camera);
  cameraEntity.transform.setPosition(3, 3, 3);
  cameraEntity.addComponent(OrbitControl);

  engine.sceneManager.activeScene.ambientLight.diffuseSolidColor.set(
    1,
    1,
    1,
    1
  );

  engine.run();
});
