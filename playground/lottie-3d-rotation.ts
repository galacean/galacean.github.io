/**
 * @title Lottie 3D Rotation
 * @category 2D
 */
 import { OrbitControl } from "@oasis-engine/controls";
 import { Camera, Entity, WebGLEngine } from "oasis-engine";
 import { LottieAnimation } from "@oasis-engine/lottie";
 
 // Create engine object
 const engine = new WebGLEngine("canvas");
 engine.canvas.resizeByClientSize();
 
 const scene = engine.sceneManager.activeScene;
 const rootEntity = scene.createRootEntity();
 
 // Create camera
 const cameraEntity = rootEntity.createChild("Camera");
 cameraEntity.transform.setPosition(0, 0, 5);
 cameraEntity.addComponent(Camera);
 cameraEntity.addComponent(OrbitControl);
 
 engine.resourceManager
   .load<Entity>({
     urls: [
      'https://gw.alipayobjects.com/os/bmw-prod/b0019edb-1a08-4f22-8071-74b9d4eb22bf.json',
      'https://gw.alipayobjects.com/os/bmw-prod/39d48a7c-0a55-4e61-9f67-952f0bab02b4.json',
      'https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*XfdwTLGz-psAAAAAAAAAAAAAARQnAQ'
     ],
     type: "lottie"
   })
   .then((lottieEntity) => {
     rootEntity.addChild(lottieEntity);
     const lottie = lottieEntity.getComponent(LottieAnimation);
     lottieEntity.transform.setScale(0.5, 0.5, 1);
     lottie.isLooping = true;
     lottie.play();
   });
 
 engine.run();