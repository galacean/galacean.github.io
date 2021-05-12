import { Camera, Vector3, WebGLEngine, Entity, Vector4 } from "oasis-engine";
import { SpineAnimation } from "@oasis-engine/engine-spine";
import { OrbitControl } from "@oasis-engine/controls";
import React, { useEffect } from "react";

export default function PBRHelmet () {
  useEffect(() => {
    const engine = init();

    return () => {
      engine.destroy();
    }
  });

  return <canvas id="canvas-spine" style={{width: '300px', height: '400px'}}/>
}

function init (): WebGLEngine {
  const engine = new WebGLEngine("canvas-spine");
  engine.canvas.resizeByClientSize();
  const scene = engine.sceneManager.activeScene;
  const rootEntity = scene.createRootEntity();

  // camera
  const cameraEntity = rootEntity.createChild("camera_node");
  const camera = cameraEntity.addComponent(Camera);
  camera.backgroundColor = new Vector4(51/255, 51/255, 51/255, 1);
  cameraEntity.transform.position = new Vector3(0, 0, 50);
  const controls = cameraEntity.addComponent(OrbitControl);
  controls.enableZoom = false;

  engine.run();

  engine.resourceManager
    .load({
      url: "https://sbfkcel.github.io/pixi-spine-debug/assets/spine/spineboy-pro.json",
      type: "spine"
    })
    .then((spineEntity: Entity) => {
      spineEntity.transform.setPosition(0, -15, 0);
      rootEntity.addChild(spineEntity);
      const spineAnimation = spineEntity.getComponent(SpineAnimation);
      spineAnimation.state.setAnimation(0, "walk", true);
      spineAnimation.skeleton.scaleX = 0.05;
      spineAnimation.skeleton.scaleY = 0.05;
    });

  return engine;

}