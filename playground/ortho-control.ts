/**
 * @title Ortho Controls
 * @category Camera
 */
import { AssetType, Camera, Sprite, SpriteRenderer, Texture2D, WebGLEngine } from "oasis-engine";
import { OrthoControl } from "@oasis-engine-toolkit/controls";

// Create engine object
const engine = new WebGLEngine("canvas");
engine.canvas.resizeByClientSize();

const scene = engine.sceneManager.activeScene;
const rootEntity = scene.createRootEntity();

// Create camera
const cameraEntity = rootEntity.createChild("Camera");
cameraEntity.transform.setPosition(0, 0, 50);
const camera = cameraEntity.addComponent(Camera);
camera.isOrthographic = true;

// Add camera control.
const cameraControl = cameraEntity.addComponent(OrthoControl);
const mainElement = engine.canvas._webCanvas;
mainElement.addEventListener(
  "wheel",
  (e) => {
    // @ts-ignore
    if (e.deltaY < 0) {
      cameraControl.zoomIn();
    } else {
      cameraControl.zoomOut();
    }
  },
  false
);
mainElement.addEventListener("mousedown", (e) => {
  // @ts-ignore
  cameraControl.panStart(e.clientX, e.clientY);
});
mainElement.addEventListener("mousemove", (e) => {
  // @ts-ignore
  cameraControl.panMove(e.clientX, e.clientY);
});
mainElement.addEventListener("mouseup", (e) => {
  // @ts-ignore
  cameraControl.panEnd();
});

engine.resourceManager
  .load<Texture2D>({
    url: "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*KjnzTpE8LdAAAAAAAAAAAAAAARQnAQ",
    type: AssetType.Texture2D
  })
  .then((texture) => {
    // Create sprite entity.
    const spriteEntity = rootEntity.createChild("sprite");
    const spriteRenderer = spriteEntity.addComponent(SpriteRenderer);
    spriteRenderer.sprite = new Sprite(engine, texture);
  });

engine.run();
