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
    "https://gw.alipayobjects.com/os/bmw-prod/fe5aa92d-b573-439d-a14e-9212d45d480d.json",
    "https://gw.alipayobjects.com/os/bmw-prod/56bd6b71-bd34-485c-b727-6cad484d8896.atlas"
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