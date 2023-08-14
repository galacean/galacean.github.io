/**
 * @title Particle Renderer
 * @category Particle
 */
import {
  AssetType,
  Camera,
  ParticleMaterial,
  ParticleRenderer,
  RenderFace,
  Texture2D,
  Vector3,
  WebGLEngine,
} from "@galacean/engine";

// Create engine
WebGLEngine.create({ canvas: "canvas" }).then((engine) => {
  engine.canvas.resizeByClientSize();

  const scene = engine.sceneManager.activeScene;
  const rootEntity = scene.createRootEntity();

  // Create camera
  const cameraEntity = rootEntity.createChild("camera_entity");
  cameraEntity.transform.position = new Vector3(0, 0, 10);
  cameraEntity.addComponent(Camera);

  engine.run();

  const particleEntity = rootEntity.createChild("particle");
  const particleRenderer = particleEntity.addComponent(ParticleRenderer);
  const material = new ParticleMaterial(engine);
  material.renderFace = RenderFace.Double;
  particleRenderer.setMaterial(material);

  engine.resourceManager
    .load<Texture2D>({
      url: "https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*kxloQYq2YDEAAAAAAAAAAAAAARQnAQ",
      type: AssetType.Texture2D,
    })
    .then((texture) => {
      const generator = particleRenderer.generator;
      generator.shape.enabled = false;

      material.baseTexture = texture;
      particleRenderer.play();
    });
});
