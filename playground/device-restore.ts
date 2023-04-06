/**
 * @title Device restore
 * @category Advance
 */
import {
  Animator,
  Camera,
  Color,
  GLTFResource,
  Vector3,
  WebGLEngine,
} from "@galacean/engine";

WebGLEngine.create({ canvas: "canvas" }).then((engine) => {
  engine.canvas.resizeByClientSize();

  const rootEntity = engine.sceneManager.activeScene.createRootEntity();
  rootEntity.scene.background.solidColor = new Color(0.39, 0.31, 0.55, 1.0);

  const cameraEntity = rootEntity.createChild("camera");
  cameraEntity.addComponent(Camera);
  cameraEntity.transform.setPosition(0, 0.5, 7);
  cameraEntity.transform.lookAt(new Vector3(0, 0.5, 0));

  // Model from sketchfab: https://sketchfab.com/3d-models/cloud-station-26f81b24d83441ba88c7e80a52adbaaf
  // Created by Alex Kruckenberg, Licensed under CC BY 4.0
  engine.resourceManager
    .load<GLTFResource>(
      "https://mdn.alipayobjects.com/huamei_b4l2if/afts/file/A*AGAoTLQHpJoAAAAAAAAAAAAADil6AQ/cloud_station.glb"
    )
    .then((glTFResource) => {
      const { defaultSceneRoot, animations } = glTFResource;
      rootEntity.addChild(defaultSceneRoot);

      const animator = defaultSceneRoot.getComponent(Animator);
      animator.play(animations![0].name);

      // Simulate device loss and recovery
      let time = 6;
      let waitingLost = true;
      const domText = createDomText(time);

      setInterval(() => {
        --time;
        if (waitingLost) {
          if (time === 0) {
            engine.forceLoseDevice();
            waitingLost = false;
            domText.style.color = "cornflowerblue";
            time = 6;
          }
        } else {
          if (time === 0) {
            engine.forceRestoreDevice();
            waitingLost = true;
            domText.style.color = "yellow";
            time = 6;
          }
        }

        domText.textContent = waitingLost
          ? `Device lost countdown: ${time} `
          : `Device restore countdown: ${time} `;
      }, 1000);
    });

  engine.run();
});

function createDomText(time: number) {
  const domText = document.createElement("div");
  const style = domText.style;
  style.whiteSpace = "nowrap";
  style.color = "yellow";
  style.position = "absolute";
  style.top = "50%";
  style.left = "50%";
  style.transform = "translate(-50%, -50%)";
  style.fontSize = "60px";
  document.body.appendChild(domText);

  domText.textContent = `Device lost countdown: ${time} `;
  return domText;
}
