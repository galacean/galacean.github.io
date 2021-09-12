/**
 * @title Lottie 3D Rotation
 * @category 2D
 */
 import { OrbitControl } from "@oasis-engine/controls";
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
    "https://gw.alipayobjects.com/os/bmw-prod/70bed2d5-7284-44bf-9df6-638f66945ffd.json",
    "https://gw.alipayobjects.com/os/bmw-prod/a2853204-2d4a-48e5-9cb7-b89de8dcc7bf.atlas"
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