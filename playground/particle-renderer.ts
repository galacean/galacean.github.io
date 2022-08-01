/**
 * @title Particle Renderer
 * @category Particle
 */
// import { OrbitControl } from "@oasis-engine-toolkit/controls";
import { AssetType, Camera, Color, ParticleRenderer, Texture2D, Vector3, WebGLEngine } from "oasis-engine";

//-- create engine object
const engine = new WebGLEngine("canvas");
engine.canvas.resizeByClientSize();

const scene = engine.sceneManager.activeScene;
const rootEntity = scene.createRootEntity();

//-- create camera
const cameraEntity = rootEntity.createChild("camera_entity");
cameraEntity.transform.position = new Vector3(0, 0, 50);
cameraEntity.addComponent(Camera);

engine.run();

const particleEntity = rootEntity.createChild("particle");

let particles: ParticleRenderer = particleEntity.addComponent(ParticleRenderer);

engine.resourceManager
  .load<Texture2D>({
    url: "https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*kxloQYq2YDEAAAAAAAAAAAAAARQnAQ",
    type: AssetType.Texture2D
  })
  .then((resource) => {
    particles.maxCount = 100;
    particles.startTimeRandomness = 10;
    particles.lifetime = 4;
    particles.position = new Vector3(0, 20, 0);
    particles.positionRandomness = new Vector3(100, 0, 0);
    particles.velocity = new Vector3(0, -3, 0);
    particles.velocityRandomness = new Vector3(1, 2, 0);
    particles.accelerationRandomness = new Vector3(0, 1, 0);
    particles.velocityRandomness = new Vector3(-1, -1, -1);
    particles.rotateVelocity = 1;
    particles.rotateVelocityRandomness = 1;
    particles.size = 1;
    particles.sizeRandomness = 0.8;
    particles.color = new Color(0.5, 0.5, 0.5);
    particles.colorRandomness = 1;
    particles.isFadeIn = true;
    particles.isFadeOut = true;
    particles.texture = resource;
    particles.start();
  });
