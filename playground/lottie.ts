/**
 * @title Lottie Animation
 * @category 2D
 */
import { OrbitControl } from "@oasis-engine/controls";
import { Camera, Entity, WebGLEngine } from "oasis-engine";
import { LottieAnimation } from "@oasis-engine/lottie";

const engine = new WebGLEngine("canvas");

engine.canvas.resizeByClientSize();

const root = engine.sceneManager.activeScene.createRootEntity();

const cameraEntity = root.createChild("camera");
const camera = cameraEntity.addComponent(Camera);
cameraEntity.transform.setPosition(0, 0, 10);
cameraEntity.addComponent(OrbitControl);

engine.resourceManager.load<Entity>({
  urls: [
    'https://gw.alipayobjects.com/os/bmw-prod/9ad65a42-9171-47ab-9218-54cf175f6201.json',
    'https://gw.alipayobjects.com/os/bmw-prod/58cde292-8675-4299-b400-d98029b48ac7.atlas',
  ],
  type: 'lottie'
}).then((lottieEntity) => {
  root.addChild(lottieEntity);
  const lottie = lottieEntity.getComponent(LottieAnimation);
  lottie.isLooping = true;
  lottie.play();
});

engine.run();
