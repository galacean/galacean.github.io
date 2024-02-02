/**
 * @title Sprite Atlas
 * @category 2D
 */
import {
  AssetType,
  Camera,
  Sprite,
  SpriteAtlas,
  SpriteDrawMode,
  SpriteRenderer,
  Vector3,
  WebGLEngine,
} from "@galacean/engine";

// Create engine
WebGLEngine.create({ canvas: "canvas" }).then((engine) => {
  engine.canvas.resizeByClientSize();

  // Create root entity.
  const rootEntity = engine.sceneManager.activeScene.createRootEntity();

  // Create camera.
  const cameraEntity = rootEntity.createChild("Camera");
  cameraEntity.transform.setPosition(0, 0, 10);
  const camera = cameraEntity.addComponent(Camera);
  camera.isOrthographic = true;
  camera.orthographicSize = 10;

  engine.resourceManager
    .load<SpriteAtlas>({
      url: "https://mdn.alipayobjects.com/oasis_be/afts/file/A*8za0QYkWZIkAAAAAAAAAAAAADkp5AQ/SpriteAtlas.json",
      type: AssetType.SpriteAtlas,
    })
    .then((atlas) => {
      const entity = rootEntity.createChild();
      const renderer = entity.addComponent(SpriteRenderer);
      renderer.drawMode = SpriteDrawMode.Tiled;
      renderer.sprite = atlas.getSprite("/9-spr.png");
      // addSpriteRenderer(atlas.getSprite("/1-spr.png"), new Vector3(-3, 0, 0));
    });

  /**
   * Draw an item.
   * @param spriteName - The name of the sprite resource used for drawing
   * @param position - Position of drawing
   */
  function addSpriteRenderer(
    sprite: Sprite,
    position: Vector3 = new Vector3()
  ): void {
    const spriteEntity = rootEntity.createChild();
    spriteEntity.transform.position = position;
    spriteEntity.transform.scale.set(100 / 32, 100 / 32, 100 / 32);
    spriteEntity.addComponent(SpriteRenderer).sprite = sprite;
  }

  engine.run();
});
