/**
 * @title Sprite Atlas
 * @category 2D
 */
import { AssetType, Camera, Sprite, SpriteAtlas, SpriteRenderer, Vector3, WebGLEngine } from "oasis-engine";

// Create engine object.
const engine = new WebGLEngine("canvas");
engine.canvas.resizeByClientSize();

// Create root entity.
const rootEntity = engine.sceneManager.activeScene.createRootEntity();

// Create camera.
const cameraEntity = rootEntity.createChild("Camera");
cameraEntity.transform.setPosition(0, 0, 4);
cameraEntity.addComponent(Camera).isOrthographic = true;

engine.resourceManager
  .load<SpriteAtlas>({
    url: "https://gw.alipayobjects.com/os/bmw-prod/da0bccd4-020a-41d5-82e0-a04f4413d9a6.atlas",
    type: AssetType.SpriteAtlas
  })
  .then((atlas) => {
    const from = new Vector3(0, 0, 0);
    const to = new Vector3(0, 0, 0);
    // Draw the fence.
    let sprite = atlas.getSprite("terrains-5");
    addGroupSpriteRenderer(sprite, from.setValue(-6, -6, 0), to.setValue(6, -6, 0));
    addGroupSpriteRenderer(sprite, from.setValue(-6, 6, 0), to.setValue(6, 6, 0));
    addGroupSpriteRenderer(sprite, from.setValue(-6, -5, 0), to.setValue(-6, 5, 0));
    addGroupSpriteRenderer(sprite, from.setValue(6, -5, 0), to.setValue(6, 5, 0));

    // Draw the walls.
    sprite = atlas.getSprite("terrains-3");
    addGroupSpriteRenderer(sprite, from.setValue(-5, -2, 0), to.setValue(-5, 5, 0));
    addGroupSpriteRenderer(sprite, from.setValue(-4, -3, 0), to.setValue(-4, -1, 0));
    addGroupSpriteRenderer(sprite, from.setValue(-3, -2, 0));
    addGroupSpriteRenderer(sprite, from.setValue(-2, -3, 0), to.setValue(-2, -2, 0));
    addGroupSpriteRenderer(sprite, from.setValue(-1, -2, 0), to.setValue(-1, 5, 0));
    addGroupSpriteRenderer(sprite, from.setValue(5, -2, 0), to.setValue(5, 5, 0));
    addGroupSpriteRenderer(sprite, from.setValue(4, -3, 0), to.setValue(4, -1, 0));
    addGroupSpriteRenderer(sprite, from.setValue(3, -2, 0));
    addGroupSpriteRenderer(sprite, from.setValue(2, -3, 0), to.setValue(2, -2, 0));
    addGroupSpriteRenderer(sprite, from.setValue(1, -2, 0), to.setValue(1, 5, 0));

    // Draw the ground.
    sprite = atlas.getSprite("terrains-0");
    addGroupSpriteRenderer(sprite, from.setValue(0, -5, 0), to.setValue(0, 5, 0));
    addGroupSpriteRenderer(sprite, from.setValue(-1, -3, 0), to.setValue(1, -3, 0));

    // Draw the magma.
    sprite = atlas.getSprite("terrains-45");
    addGroupSpriteRenderer(sprite, from.setValue(-5, -5, 0), to.setValue(-1, -4, 0));
    addGroupSpriteRenderer(sprite, from.setValue(-4, -3, 0), to.setValue(-4, -3, 0));
    addGroupSpriteRenderer(sprite, from.setValue(-5, -3, 0));
    addGroupSpriteRenderer(sprite, from.setValue(-3, -3, 0));
    addGroupSpriteRenderer(sprite, from.setValue(1, -5, 0), to.setValue(5, -4, 0));
    addGroupSpriteRenderer(sprite, from.setValue(4, -3, 0), to.setValue(4, -3, 0));
    addGroupSpriteRenderer(sprite, from.setValue(5, -3, 0));
    addGroupSpriteRenderer(sprite, from.setValue(3, -3, 0));

    // Draw the river.
    sprite = atlas.getSprite("terrains-46");
    addGroupSpriteRenderer(sprite, from.setValue(-4, 0, 0), to.setValue(-2, 5, 0));
    addGroupSpriteRenderer(sprite, from.setValue(-3, -1, 0), to.setValue(-2, -1, 0));
    addGroupSpriteRenderer(sprite, from.setValue(2, 0, 0), to.setValue(4, 5, 0));
    addGroupSpriteRenderer(sprite, from.setValue(2, -1, 0), to.setValue(3, -1, 0));

    // Draw the npcs.
    addGroupSpriteRenderer(atlas.getSprite("npcs-0"), from.setValue(0, -4, 1));
    addGroupSpriteRenderer(atlas.getSprite("npcs-7"), from.setValue(-1, -3, 1));
  });

/**
 * Draw a set of items.
 * @param spriteName The name of the sprite resource used for drawing
 * @param from  Starting point of drawing
 * @param to End point of drawing
 */
function addGroupSpriteRenderer(sprite: Sprite, from: Vector3, to?: Vector3): void {
  if (to) {
    const { x: fromX, y: fromY } = from;
    const { x: toX, y: toY } = to;
    for (let i = fromX; i <= toX; i++) {
      for (let j = fromY; j <= toY; j++) {
        addSpriteRenderer(sprite, from.setValue(i, j, 0));
      }
    }
  } else {
    addSpriteRenderer(sprite, from);
  }
}

/**
 * Draw an item.
 * @param spriteName The name of the sprite resource used for drawing
 * @param position Position of drawing
 */
function addSpriteRenderer(sprite: Sprite, position: Vector3): void {
  const spriteEntity = rootEntity.createChild();
  spriteEntity.transform.position = position;
  spriteEntity.transform.scale.setValue(4, 4, 4);
  const spriteRenderer = spriteEntity.addComponent(SpriteRenderer);
  spriteRenderer.sprite = sprite;
}

engine.run();
