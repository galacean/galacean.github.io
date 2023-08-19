/**
 * @title Particle Renderer
 * @category Particle
 */
import {
  AssetType,
  BlendMode,
  Camera,
  Color,
  ConeShape,
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
  cameraEntity.transform.position = new Vector3(0, 1, 3);
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
  const {
    main,
    shape,
    emission,
    textureSheetAnimation,
    sizeOverLifetime,
    colorOverLifetime,
  } = generator;

  // Main module
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

  emission.rateOverTime.constant = 35;

  // Shape module
  shape.enabled = true;
  const coneShape = <ConeShape>shape.shape;
  coneShape.angle = 0.96;
  coneShape.radius = 0.01;

  // Texture sheet animation module
  textureSheetAnimation.enabled = true;
  textureSheetAnimation.tiling = new Vector2(6, 6);
  const frameOverTime = textureSheetAnimation.frameOverTime;
  frameOverTime.mode = ParticleCurveMode.TwoCurves;
  frameOverTime.curveMin = new ParticleCurve(new Key(0, 0.47), new Key(1, 1));

  // Size over lifetime module
  sizeOverLifetime.enabled = true;
  sizeOverLifetime.size.mode = ParticleCurveMode.Curve;

  const curve = sizeOverLifetime.size.curve;
  const keys = curve.keys;
  keys[0].value = 0.153;
  keys[1].value = 0.529;
  curve.addKey(0.074, 0.428);
  curve.addKey(0.55, 0.947);

  // Color over lifetime module
  colorOverLifetime.enabled = true;
  colorOverLifetime.color.mode = ParticleGradientMode.Gradient;

  const gradient = colorOverLifetime.color.gradient;
  const colorKeys = gradient.colorKeys;
  colorKeys[0].color.set(255 / 255, 127 / 255, 4 / 255, 1.0);
  colorKeys[1].time = 0.998;
  colorKeys[1].color.set(255 / 255, 123 / 255, 0 / 255, 1.0);
  gradient.addColorKey(0.157, new Color(1, 1, 1, 1));
  gradient.addColorKey(0.573, new Color(255 / 255, 255 / 255, 137 / 255, 1));
  gradient.alphaKeys[1].time = 0.089;

  particleRenderer.play();
}
