/**
 * @title Particle Renderer
 * @category Particle
 */
import {
  AssetType,
  BlendMode,
  Camera,
  Color,
  Entity,
  Key,
  Logger,
  ParticleCurve,
  ParticleCurveMode,
  ParticleGradientMode,
  ParticleMaterial,
  ParticleRenderer,
  ParticleSimulationSpace,
  Texture2D,
  Vector2,
  Vector3,
  WebGLEngine,
  WebGLMode,
} from "@galacean/engine";

// Create engine
WebGLEngine.create({
  canvas: "canvas",
  graphicDeviceOptions: { webGLMode: WebGLMode.WebGL1 },
}).then((engine) => {
  Logger.enable();
  engine.canvas.resizeByClientSize();

  const scene = engine.sceneManager.activeScene;
  const rootEntity = scene.createRootEntity();
  scene.background.solidColor = new Color(0.25, 0.25, 0.25, 1);

  // Create camera
  const cameraEntity = rootEntity.createChild("camera_entity");
  cameraEntity.transform.position = new Vector3(0, 5, 10);
  const camera = cameraEntity.addComponent(Camera);
  camera.fieldOfView = 60;

  engine.run();

  engine.resourceManager
    .load<Texture2D>({
      url: "https://mdn.alipayobjects.com/huamei_b4l2if/afts/img/A*yu-DSb0surwAAAAAAAAAAAAADil6AQ/original",
      type: AssetType.Texture2D,
    })
    .then((texture) => {
      createFireParticle(rootEntity, texture);
    });
});

function createFireParticle(rootEntity: Entity, texture: Texture2D) {
  const particleEntity = rootEntity.createChild("particle");
  particleEntity.transform.scale.set(1.268892, 1.268892, 1.268892);
  particleEntity.transform.rotate(90, 0, 0);

  const particleRenderer = particleEntity.addComponent(ParticleRenderer);

  const material = new ParticleMaterial(rootEntity.engine);
  material.baseColor = new Color(1.0, 1.0, 1.0, 1.0);
  material.blendMode = BlendMode.Additive;
  material.baseTexture = texture;
  particleRenderer.setMaterial(material);

  const generator = particleRenderer.generator;
  const { main, textureSheetAnimation, colorOverLifetime } = generator;

  main.simulationSpace = ParticleSimulationSpace.World;

  main.startLifetime.constantMin = 0.2;
  main.startLifetime.constantMax = 0.8;
  main.startLifetime.mode = ParticleCurveMode.TwoConstants;

  main.startSpeed.constantMin = 0.4;
  main.startSpeed.constantMax = 1.6;
  main.startSpeed.mode = ParticleCurveMode.TwoConstants;

  main.startSize.constantMin = 0.6;
  main.startSize.constantMax = 0.9;
  main.startSize.mode = ParticleCurveMode.TwoConstants;

  main.startRotation.constantMin = 0;
  main.startRotation.constantMax = 360;
  main.startRotation.mode = ParticleCurveMode.TwoConstants;

  generator.emission.rateOverTime.constant = 35;

  generator.shape.enabled = false;

  textureSheetAnimation.enabled = true;
  textureSheetAnimation.tiling = new Vector2(6, 6);
  textureSheetAnimation.frameOverTime.mode = ParticleCurveMode.TwoCurves;
  textureSheetAnimation.frameOverTime.curveMin = new ParticleCurve(
    new Key(0, 0.47),
    new Key(1, 1)
  );

  // generator.sizeOverLifetime.enabled = true;

  colorOverLifetime.enabled = true;
  colorOverLifetime.color.mode = ParticleGradientMode.Gradient;
  colorOverLifetime.color.gradient.colorKeys[0].color.set(
    255 / 255,
    127 / 255,
    4 / 255,
    1.0
  );
  colorOverLifetime.color.gradient.colorKeys[1].time = 0.998;
  colorOverLifetime.color.gradient.colorKeys[1].color.set(
    255 / 255,
    123 / 255,
    0 / 255,
    1.0
  );
  colorOverLifetime.color.gradient.addColorKey(0.157, new Color(1, 1, 1, 1));
  colorOverLifetime.color.gradient.addColorKey(
    0.573,
    new Color(255 / 255, 255 / 255, 137 / 255, 1)
  );

  colorOverLifetime.color.gradient.addAlphaKey(0.089, 1.0);

  particleRenderer.play();
}
