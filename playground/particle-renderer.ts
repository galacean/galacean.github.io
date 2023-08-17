/**
 * @title Particle Renderer
 * @category Particle
 */
import {
  AssetType,
  BlendMode,
  Camera,
  Logger,
  ParticleCurveMode,
  ParticleMaterial,
  ParticleRenderer,
  RenderFace,
  Texture2D,
  Vector2,
  Vector3,
  WebGLEngine,
} from "@galacean/engine";
import { WebGLMode } from "oasis-engine";

// Create engine
WebGLEngine.create({
  canvas: "canvas",
  graphicDeviceOptions: { webGLMode: WebGLMode.WebGL1 },
}).then((engine) => {
  Logger.enable();
  engine.canvas.resizeByClientSize();

  const scene = engine.sceneManager.activeScene;
  const rootEntity = scene.createRootEntity();

  // Create camera
  const cameraEntity = rootEntity.createChild("camera_entity");
  cameraEntity.transform.position = new Vector3(0, 5, 10);
  const camera = cameraEntity.addComponent(Camera);
  camera.fieldOfView = 60;

  engine.run();

  const particleEntity = rootEntity.createChild("particle");
  particleEntity.transform.scale.set(1.268892, 1.268892, 1.268892);
  particleEntity.transform.rotate(90, 0, 0);

  const particleRenderer = particleEntity.addComponent(ParticleRenderer);
  const material = new ParticleMaterial(engine);
  material.blendMode = BlendMode.Additive;
  particleRenderer.setMaterial(material);

  engine.resourceManager
    .load<Texture2D>({
      url: "https://mdn.alipayobjects.com/huamei_b4l2if/afts/img/A*yu-DSb0surwAAAAAAAAAAAAADil6AQ/original",
      type: AssetType.Texture2D,
    })
    .then((texture) => {
      const generator = particleRenderer.generator;

      generator.main.startLifetime.constantMin = 0.2;
      generator.main.startLifetime.constantMax = 0.8;
      generator.main.startLifetime.mode = ParticleCurveMode.TwoConstants;


      generator.main.startSpeed.constantMin = 0.4;
      generator.main.startSpeed.constantMax = 1.6;
      generator.main.startSpeed.mode = ParticleCurveMode.TwoConstants;

      generator.main.startSize.constantMin = 0.6;
      generator.main.startSize.constantMax = 0.9;
      generator.main.startSize.mode = ParticleCurveMode.TwoConstants;

      generator.main.startRotation.constantMin = 0;
      generator.main.startRotation.constantMax = 360;
      generator.main.startRotation.mode = ParticleCurveMode.TwoConstants;

      generator.emission.rateOverTime.constant = 1;

      generator.shape.enabled = false;

      generator.textureSheetAnimation.enabled = true;
      generator.textureSheetAnimation.tiling = new Vector2(6, 6);

      // generator.sizeOverLifetime.enabled = true;
      // generator.colorOverLifetime.enabled = true;

      material.baseTexture = texture;
      particleRenderer.play();
    });
});
