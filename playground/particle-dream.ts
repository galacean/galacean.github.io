/**
 * @title Particle Dream
 * @category Particle
 */
import {
  AssetType,
  BlendMode,
  BoxShape,
  Burst,
  Camera,
  Color,
  ConeShape,
  Engine,
  Entity,
  Logger,
  ParticleCompositeCurve,
  ParticleCurveMode,
  ParticleGradientMode,
  ParticleMaterial,
  ParticleRenderer,
  ParticleScaleMode,
  ParticleSimulationSpace,
  SphereShape,
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
  scene.background.solidColor = new Color(15 / 255, 38 / 255, 18 / 255, 1);

  // Create camera
  const cameraEntity = rootEntity.createChild("camera_entity");
  cameraEntity.transform.position = new Vector3(0, 1, 3);
  const camera = cameraEntity.addComponent(Camera);
  camera.fieldOfView = 60;

  engine.run();

  engine.resourceManager
    .load([
      {
        url: "https://mdn.alipayobjects.com/huamei_b4l2if/afts/img/A*JPsCSK5LtYkAAAAAAAAAAAAADil6AQ/original",
        type: AssetType.Texture2D,
      },
      {
        url: " https://mdn.alipayobjects.com/huamei_b4l2if/afts/img/A*JlayRa2WltYAAAAAAAAAAAAADil6AQ/original",
        type: AssetType.Texture2D,
      },
      {
        url: "https://mdn.alipayobjects.com/huamei_b4l2if/afts/img/A*J8uhRoxJtYgAAAAAAAAAAAAADil6AQ/original",
        type: AssetType.Texture2D,
      },
      {
        url: "https://mdn.alipayobjects.com/huamei_b4l2if/afts/img/A*Ea3qRb1yCQMAAAAAAAAAAAAADil6AQ/original",
        type: AssetType.Texture2D,
      },
    ])
    .then((textures) => {
      const fireEntity = createDebrisParticle(engine, <Texture2D>textures[0]);
      // createFireGlowParticle(fireEntity, <Texture2D>textures[1]);
      createSparksParticle(fireEntity, <Texture2D>textures[2]);
      createHighlightsParticle(fireEntity, <Texture2D>textures[3]);

      cameraEntity.addChild(fireEntity);
    });
});

function createDebrisParticle(engine: Engine, texture: Texture2D): Entity {
  const particleEntity = new Entity(engine, "Debris");
  particleEntity.transform.position.set(0, -7.5, -8);

  const particleRenderer = particleEntity.addComponent(ParticleRenderer);

  const material = new ParticleMaterial(engine);
  material.baseColor = new Color(1.0, 1.0, 1.0, 1.0);
  material.blendMode = BlendMode.Additive;
  material.baseTexture = texture;
  particleRenderer.setMaterial(material);
  particleRenderer.priority = 2;

  const {
    main,
    emission,
    sizeOverLifetime,
    colorOverLifetime,
    velocityOverLifetime,
  } = particleRenderer.generator;

  // Main module
  main.startSpeed.constant = 0;

  main.startSize.constantMin = 0.1;
  main.startSize.constantMax = 1;
  main.startSize.mode = ParticleCurveMode.TwoConstants;

  main.startRotation.constantMin = 0;
  main.startRotation.constantMax = 360;
  main.startRotation.mode = ParticleCurveMode.TwoConstants;

  main.startColor.constantMin.set(255 / 255, 255 / 255, 255 / 255, 1.0);
  main.startColor.constantMax.set(13 / 255, 255 / 255, 0 / 255, 1.0);
  main.startColor.mode = ParticleGradientMode.TwoConstants;

  // Emission module
  emission.rateOverTime.constant = 5;

  const boxShape = new BoxShape();
  boxShape.size.set(22, 1, 0);
  emission.shape = boxShape;

  // Color over lifetime module
  colorOverLifetime.enabled = true;
  colorOverLifetime.color.mode = ParticleGradientMode.Gradient;

  const gradient = colorOverLifetime.color.gradient;
  gradient.alphaKeys[0].alpha = 0;
  gradient.alphaKeys[1].alpha = 0;
  gradient.addAlphaKey(0.2, 1.0);
  gradient.addAlphaKey(0.8, 1.0);

  // Size over lifetime module
  sizeOverLifetime.enabled = true;
  const keys = sizeOverLifetime.size.curve.keys;
  keys[0].value = 1;
  keys[1].value = 0;

  // Velocity over lifetime module
  velocityOverLifetime.enabled = true;
  velocityOverLifetime.velocityX.constantMin = 2;
  velocityOverLifetime.velocityX.constantMax = 1;
  velocityOverLifetime.velocityX.mode = ParticleCurveMode.TwoConstants;

  velocityOverLifetime.velocityY.constantMin = 4;
  velocityOverLifetime.velocityY.constantMax = 2;
  velocityOverLifetime.velocityY.mode = ParticleCurveMode.TwoConstants;

  velocityOverLifetime.velocityZ.constantMin = 0;
  velocityOverLifetime.velocityZ.constantMax = 0;
  velocityOverLifetime.velocityZ.mode = ParticleCurveMode.TwoConstants;

  return particleEntity;
}

function createFireGlowParticle(fireEntity: Entity, texture: Texture2D): void {
  const particleEntity = fireEntity.createChild("FireGlow");

  const particleRenderer = particleEntity.addComponent(ParticleRenderer);

  const material = new ParticleMaterial(fireEntity.engine);
  material.blendMode = BlendMode.Additive;
  material.baseTexture = texture;
  particleRenderer.setMaterial(material);
  particleRenderer.priority = 1;

  const generator = particleRenderer.generator;
  const {
    main,
    emission,
    velocityOverLifetime,
    sizeOverLifetime,
    colorOverLifetime,
  } = generator;

  // Main module
  main.startLifetime.constantMin = 0.2;
  main.startLifetime.constantMax = 0.6;
  main.startLifetime.mode = ParticleCurveMode.TwoConstants;

  main.startSpeed.constantMin = 0.0;
  main.startSpeed.constantMax = 1.4;
  main.startSpeed.mode = ParticleCurveMode.TwoConstants;

  main.startSize.constant = 1.2;

  main.startRotation.constantMin = 0;
  main.startRotation.constantMax = 360;
  main.startRotation.mode = ParticleCurveMode.TwoConstants;

  main.startColor.constant = new Color(
    255 / 255,
    100 / 255,
    0 / 255,
    168 / 255
  );

  // Emission module
  emission.rateOverTime.constant = 20;

  const coneShape = new ConeShape();
  coneShape.angle = 15;
  coneShape.radius = 0.01;
  emission.shape = coneShape;

  // Color over lifetime module
  colorOverLifetime.enabled = true;
  colorOverLifetime.color.mode = ParticleGradientMode.Gradient;

  const gradient = colorOverLifetime.color.gradient;
  const colorKeys = gradient.colorKeys;
  colorKeys[1].time = 0.998;
  colorKeys[1].color.set(255 / 255, 50 / 255, 0 / 255, 1.0);

  gradient.alphaKeys[0].alpha = 0;
  gradient.alphaKeys[1].alpha = 0;

  gradient.addAlphaKey(0.057, 247 / 255);

  // Size over lifetime module
  sizeOverLifetime.enabled = true;
  sizeOverLifetime.size.mode = ParticleCurveMode.Curve;

  const curve = sizeOverLifetime.size.curve;
  const keys = curve.keys;
  keys[0].value = 1;
  keys[1].value = 0;
}

function createSparksParticle(fireEntity: Entity, texture: Texture2D): void {
  const particleEntity = fireEntity.createChild("Sparks");
  particleEntity.transform.position.set(-1.54, 0, 0);

  const particleRenderer = particleEntity.addComponent(ParticleRenderer);

  const material = new ParticleMaterial(fireEntity.engine);
  material.baseTexture = texture;
  particleRenderer.setMaterial(material);
  particleRenderer.priority = 0;

  const { main, emission, colorOverLifetime, velocityOverLifetime } =
    particleRenderer.generator;

  // Main module
  main.startLifetime.constant = 5;
  main.startSpeed.constant = 0;

  main.startSize.constantMin = 0.05;
  main.startSize.constantMax = 0.2;
  main.startSize.mode = ParticleCurveMode.TwoConstants;

  main.startRotation.constantMin = 0;
  main.startRotation.constantMax = 360;
  main.startRotation.mode = ParticleCurveMode.TwoConstants;

  main.startColor.constant = new Color(
    37 / 255,
    133 / 255,
    255 / 255,
    255 / 255
  );

  // Emission module
  emission.rateOverTime.constant = 30;

  const boxShape = new BoxShape();
  boxShape.size.set(22, 1, 0);
  emission.shape = boxShape;

  // Velocity over lifetime module
  velocityOverLifetime.enabled = true;
  velocityOverLifetime.velocityX.constantMin = 2;
  velocityOverLifetime.velocityX.constantMax = 1;
  velocityOverLifetime.velocityX.mode = ParticleCurveMode.TwoConstants;

  velocityOverLifetime.velocityY.constantMin = 4;
  velocityOverLifetime.velocityY.constantMax = 2;
  velocityOverLifetime.velocityY.mode = ParticleCurveMode.TwoConstants;

  velocityOverLifetime.velocityZ.constantMin = 0;
  velocityOverLifetime.velocityZ.constantMax = 0;
  velocityOverLifetime.velocityZ.mode = ParticleCurveMode.TwoConstants;

  // Color over lifetime module
  colorOverLifetime.enabled = true;
  colorOverLifetime.color.mode = ParticleGradientMode.Gradient;

  const gradient = colorOverLifetime.color.gradient;
  gradient.alphaKeys[0].alpha = 0;
  gradient.alphaKeys[1].alpha = 0;
  gradient.addAlphaKey(0.2, 1.0);
  gradient.addAlphaKey(0.8, 1.0);
}

function createHighlightsParticle(
  fireEntity: Entity,
  texture: Texture2D
): void {
  const particleEntity = fireEntity.createChild("Highlights");
  particleEntity.transform.position.set(-5.31, 0, 0);

  const particleRenderer = particleEntity.addComponent(ParticleRenderer);

  const material = new ParticleMaterial(fireEntity.engine);
  material.blendMode = BlendMode.Additive;
  material.baseTexture = texture;
  particleRenderer.setMaterial(material);
  particleRenderer.priority = 3;

  const generator = particleRenderer.generator;
  const {
    main,
    emission,
    sizeOverLifetime,
    colorOverLifetime,
    velocityOverLifetime,
  } = generator;

  // Main module
  main.startSpeed.constant = 0;

  main.startSize.constantMin = 0.1;
  main.startSize.constantMax = 7;
  main.startSize.mode = ParticleCurveMode.TwoConstants;

  main.startRotation.constantMin = 0;
  main.startRotation.constantMax = 360;
  main.startRotation.mode = ParticleCurveMode.TwoConstants;

  main.startColor.constantMin.set(105 / 255, 198 / 255, 255 / 255, 64 / 255);
  main.startColor.constantMax.set(13 / 255, 255 / 255, 0 / 255, 32 / 255);
  main.startColor.mode = ParticleGradientMode.TwoConstants;

  // Emission module
  emission.rateOverTime.constant = 40;

  const boxShape = new BoxShape();
  boxShape.size.set(22, 1, 0);
  emission.shape = boxShape;

  // Velocity over lifetime module
  velocityOverLifetime.enabled = true;
  velocityOverLifetime.velocityX.constantMin = 3;
  velocityOverLifetime.velocityX.constantMax = 2;
  velocityOverLifetime.velocityX.mode = ParticleCurveMode.TwoConstants;

  velocityOverLifetime.velocityY.constantMin = 4;
  velocityOverLifetime.velocityY.constantMax = 2;
  velocityOverLifetime.velocityY.mode = ParticleCurveMode.TwoConstants;

  velocityOverLifetime.velocityZ.constantMin = 0;
  velocityOverLifetime.velocityZ.constantMax = 0;
  velocityOverLifetime.velocityZ.mode = ParticleCurveMode.TwoConstants;

  // Color over lifetime module
  colorOverLifetime.enabled = true;
  colorOverLifetime.color.mode = ParticleGradientMode.Gradient;

  const gradient = colorOverLifetime.color.gradient;
  gradient.alphaKeys[0].alpha = 0;
  gradient.alphaKeys[1].alpha = 0;
  gradient.addAlphaKey(0.2, 1.0);
  gradient.addAlphaKey(0.8, 1.0);

  // Size over lifetime module
  sizeOverLifetime.enabled = true;
  const curve = sizeOverLifetime.size.curve;
  sizeOverLifetime.size.mode = ParticleCurveMode.Curve;
  curve.keys[0].value = 1;
  curve.keys[1].value = 0;
}
