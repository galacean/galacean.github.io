/**
 * @title Primitive Mesh
 * @category Mesh
 */
import { OrbitControl } from "@oasis-engine/controls";
import {
  AssetType,
  BlinnPhongMaterial,
  Camera,
  Color,
  DirectLight,
  Entity,
  Material,
  MeshRenderer,
  ModelMesh,
  PrimitiveMesh,
  Script,
  Texture2D,
  Vector3,
  WebGLEngine
} from "oasis-engine";

init();

function init(): void {
  // Create engine
  const engine = new WebGLEngine("canvas");
  engine.canvas.resizeByClientSize();

  // Create root entity
  const scene = engine.sceneManager.activeScene;
  const rootEntity = scene.createRootEntity();
  scene.ambientLight.diffuseSolidColor = new Color(0.6, 0.6, 0.6);

  // Create camera
  const cameraEntity = rootEntity.createChild("Camera");
  cameraEntity.transform.setPosition(0, 0, 20);
  cameraEntity.addComponent(Camera);
  cameraEntity.addComponent(OrbitControl);

  // Create direct light
  const lightEntity = rootEntity.createChild("DirectLight");
  const light = lightEntity.addComponent(DirectLight);
  light.intensity = 0.6;

  engine.resourceManager
    .load<Texture2D>({
      url: "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*ArCHTbfVPXUAAAAAAAAAAAAAARQnAQ",
      type: AssetType.Texture2D
    })
    .then((texture) => {
      const distanceX = 2.5;
      const distanceY = 2.5;
      const position = new Vector3();

      // Create material
      const material = new BlinnPhongMaterial(engine);
      material.baseTexture = texture;

      for (let i = 0; i < 3; i++) {
        const posX = (i - 1) * distanceX;

        // Create cuboid
        position.setValue(posX, distanceY * 2.5, 0);
        generatePrimitiveEntity(rootEntity, "cuboid", position, material, PrimitiveMesh.createCuboid(engine));

        // Create sphere
        position.setValue(posX, distanceY * 1.5, 0);
        generatePrimitiveEntity(rootEntity, "sphere", position, material, PrimitiveMesh.createSphere(engine));

        // Create plane
        position.setValue(posX, distanceY * 0.5, 0);
        generatePrimitiveEntity(rootEntity, "plane", position, material, PrimitiveMesh.createPlane(engine));

        // Create cylinder
        position.setValue(posX, -distanceY * 0.5, 0);
        generatePrimitiveEntity(rootEntity, "cylinder", position, material, PrimitiveMesh.createCylinder(engine));

        // Create cone
        position.setValue(posX, -distanceY * 1.5, 0);
        generatePrimitiveEntity(rootEntity, "cone", position, material, PrimitiveMesh.createCone(engine));

        // Create turos
        position.setValue(posX, -distanceY * 2.5, 0);
        generatePrimitiveEntity(rootEntity, "torus", position, material, PrimitiveMesh.createTorus(engine));
      }
    });

  // Run engine
  engine.run();
}

/**
 * generate primitive mesh entity.
 */
function generatePrimitiveEntity(
  rootEntity: Entity,
  name: string,
  position: Vector3,
  material: Material,
  mesh: ModelMesh
): Entity {
  const entity = rootEntity.createChild(name);
  entity.transform.setPosition(position.x, position.y, position.z);
  entity.addComponent(RotateScript);
  const renderer = entity.addComponent(MeshRenderer);
  renderer.mesh = mesh;
  renderer.setMaterial(material);

  return entity;
}

/**
 * Script for rotate.
 */
class RotateScript extends Script {
  /**
   * @override
   * The main loop, called frame by frame.
   * @param deltaTime - The deltaTime when the script update.
   */
  onUpdate(deltaTime: number): void {
    this.entity.transform.rotate(0.5, 0.6, 0);
  }
}
