/**
 * @title Lottie 3D Rotation
 * @category 2D
 */
 import { OrbitControl } from "@oasis-engine-toolkit/controls";
 import { Camera, Entity, WebGLEngine } from "oasis-engine";
 import { LottieAnimation } from "@oasis-engine/lottie";
 
 const engine = new WebGLEngine("canvas");
 engine.canvas.resizeByClientSize();
 
 const scene = engine.sceneManager.activeScene;
 const rootEntity = scene.createRootEntity();
 
 const cameraEntity = rootEntity.createChild("Camera");
 cameraEntity.transform.setPosition(0, 0, 5);
 cameraEntity.addComponent(Camera);
 cameraEntity.addComponent(OrbitControl);
 
 engine.resourceManager.load<Entity>({
  urls: [
    "https://gw.alipayobjects.com/os/bmw-prod/bbf83713-c23f-4981-8b8d-241d905fc3bf.json",
    "https://gw.alipayobjects.com/os/bmw-prod/d9b42223-b1ae-4f51-b489-75b2f36a2b2d.atlas"
  ],
  type: 'lottie'
}).then((lottieEntity) => {
  rootEntity.addChild(lottieEntity);
  const lottie = lottieEntity.getComponent(LottieAnimation);
  lottie.isLooping = true;
  lottieEntity.transform.setScale(0.5, 0.5, 0.5);
  lottie.play();
});
 
 engine.run();