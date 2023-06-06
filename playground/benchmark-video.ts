/**
 * @title Video
 * @category Benchmark
 */

import {
  Camera,
  Entity,
  Script,
  Sprite,
  SpriteRenderer,
  Texture2D,
  TextureFormat,
  TextureUsage,
  Vector3,
  WebGLEngine,
} from "@galacean/engine";
import { Stats } from "@galacean/engine-toolkit";

const videoes = {
  "540p_0": {
    width: 480,
    height: 960,
    url: "https://gw.alipayobjects.com/v/huamei_p0cigc/afts/video/A*dftzSq2szUsAAAAAAAAAAAAADtN3AQ",
  },
  "540p_1": {
    width: 480,
    height: 960,
    url: "https://gw.alipayobjects.com/v/huamei_p0cigc/afts/video/A*7gPzSo3RxlQAAAAAAAAAAAAADtN3AQ",
  },
  "540p_2": {
    width: 512,
    height: 1024,
    url: "https://mdn.alipayobjects.com/huamei_p0cigc/afts/file/A*ZOgXRbmVlsIAAAAAAAAAAAAADoB5AQ",
  },
  "540p_3": {
    width: 512,
    height: 1024,
    url: "https://mdn.alipayobjects.com/huamei_p0cigc/afts/file/A*8xcvSJqCc3IAAAAAAAAAAAAADoB5AQ",
  },
};

let index = 0;
export class VideoScript extends Script {
  video: HTMLVideoElement;
  texture: Texture2D;

  onAwake() {
    const { width, height, url } = videoes[`540p_${index++}`];
    if (index === 4) {
      index = 0;
    }

    const entity = this.entity.createChild("video");
    const sr = entity.addComponent(SpriteRenderer);
    const { engine } = this;
    const texture = (this.texture = new Texture2D(
      engine,
      width,
      height,
      TextureFormat.R8G8B8A8,
      false,
      TextureUsage.Dynamic
    ));
    sr.sprite = new Sprite(engine, texture);

    const dom: HTMLVideoElement = document.createElement("video");
    dom.src = url;
    dom.crossOrigin = "anonymous";
    dom.loop = true;
    dom.muted = true;
    dom.play();
    dom.playsInline = true;
    document.body.onclick = () => {
      dom.play();
    };

    const updateVideo = () => {
      texture.setImageSource(dom);
      dom.requestVideoFrameCallback(updateVideo);
    };
    if ("requestVideoFrameCallback" in dom) {
      updateVideo();
    } else {
      this.video = dom;
    }
  }

  onUpdate() {
    if (this.video) {
      this.texture.setImageSource(this.video);
    }
  }
}

function addVideo(parent: Entity, posX: number, posY: number): Entity {
  const videoEntity = parent.createChild("");
  videoEntity.addComponent(VideoScript);
  const { transform } = videoEntity;
  transform.setPosition(posX, posY, 0);
  return videoEntity;
}

// Create engine object
const engine = await WebGLEngine.create({
  canvas: "canvas",
});
engine.canvas.resizeByClientSize();

const scene = engine.sceneManager.activeScene;
const rootEntity = scene.createRootEntity();

// Create camera
const cameraEntity = rootEntity.createChild("camera_entity");
cameraEntity.addComponent(Camera);
cameraEntity.transform.setPosition(0, 0, 20);
cameraEntity.transform.lookAt(new Vector3(0, 0, 0));
cameraEntity.addComponent(Stats);

addVideo(rootEntity, -12, 5);
addVideo(rootEntity, -8, 5);
addVideo(rootEntity, -4, 5);
addVideo(rootEntity, 0, 5);
addVideo(rootEntity, 4, 5);
addVideo(rootEntity, 8, 5);
addVideo(rootEntity, 12, 5);
addVideo(rootEntity, -6, 5);

addVideo(rootEntity, -12, -5);
addVideo(rootEntity, -8, -5);
addVideo(rootEntity, -4, -5);
addVideo(rootEntity, 0, -5);
addVideo(rootEntity, 4, -5);
addVideo(rootEntity, 8, -5);
addVideo(rootEntity, 12, -5);
addVideo(rootEntity, -6, -5);

engine.run();
