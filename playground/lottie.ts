/**
 * @title Lottie Animation
 * @category 2D
 */
import { OrbitControl } from "@oasis-engine-toolkit/controls";
import { Camera, Entity, WebGLEngine } from "oasis-engine";
import { LottieAnimation } from "@oasis-engine/lottie";
import { registerEngineForE2E } from './e2eHelper';

const engine = new WebGLEngine("canvas");

engine.canvas.resizeByClientSize();

const root = engine.sceneManager.activeScene.createRootEntity();

const cameraEntity = root.createChild("camera");
const camera = cameraEntity.addComponent(Camera);
cameraEntity.transform.setPosition(0, 0, 10);
cameraEntity.addComponent(OrbitControl);

engine.resourceManager.load<Entity>({
  urls: [
    "https://gw.alipayobjects.com/os/bmw-prod/b46be138-e48b-4957-8071-7229661aba53.json",
    "https://gw.alipayobjects.com/os/bmw-prod/6447fc36-db32-4834-9579-24fe33534f55.atlas"
  ],
  type: 'lottie'
}).then((lottieEntity) => {
  root.addChild(lottieEntity);
  const lottie = lottieEntity.getComponent(LottieAnimation);
  lottie.isLooping = true;
  lottie.play();
});

engine.run();

registerEngineForE2E(engine);
