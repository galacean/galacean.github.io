/**
 * @title Sprite Atlas
 * @category 2D
 */
import { AssetType, Camera, SpriteAtlas, SpriteRenderer, Vector3, WebGLEngine } from "oasis-engine";

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
    url: "https://gw.alipayobjects.com/os/bmw-prod/c4ccf5ec-3b3b-4c08-bf65-5092d014f797.atlas",
    type: AssetType.SpriteAtlas
  })
  .then((atlas) => {
    const tempPos1 = new Vector3(0, 0, 0);
    const tempPos2 = new Vector3(0, 0, 0);
    /**
     * Draw a set of items.
     * @param spriteName The name of the sprite resource used for drawing
     * @param from  Starting point of drawing
     * @param to End point of drawing
     */
    function addGroupSpriteRenderer(spriteName: string, from: Vector3, to?: Vector3): void {
      if (to) {
        const { x: fromX, y: fromY } = from;
        const { x: toX, y: toY } = to;
        for (let i = fromX; i <= toX; i++) {
          for (let j = fromY; j <= toY; j++) {
            addSpriteRenderer(spriteName, tempPos1.setValue(i, j, 0));
          }
        }
      } else {
        addSpriteRenderer(spriteName, from);
      }
    }

    /**
     * Draw an item.
     * @param spriteName The name of the sprite resource used for drawing
     * @param position Position of drawing
     */
    function addSpriteRenderer(spriteName: string, position: Vector3): void {
      const spriteEntity = rootEntity.createChild();
      spriteEntity.transform.position = position;
      spriteEntity.transform.scale.setValue(4, 4, 4);
      const spriteRenderer = spriteEntity.addComponent(SpriteRenderer);
      spriteRenderer.sprite = atlas.getSprite(spriteName);
    }

    // Draw the fence.
    addGroupSpriteRenderer("terrains-5", tempPos1.setValue(-6, -6, 0), tempPos2.setValue(6, -6, 0));
    addGroupSpriteRenderer("terrains-5", tempPos1.setValue(-6, 6, 0), tempPos2.setValue(6, 6, 0));
    addGroupSpriteRenderer("terrains-5", tempPos1.setValue(-6, -5, 0), tempPos2.setValue(-6, 5, 0));
    addGroupSpriteRenderer("terrains-5", tempPos1.setValue(6, -5, 0), tempPos2.setValue(6, 5, 0));

    // Draw the walls.
    addGroupSpriteRenderer("terrains-3", tempPos1.setValue(-5, -2, 0), tempPos2.setValue(-5, 5, 0));
    addGroupSpriteRenderer("terrains-3", tempPos1.setValue(-4, -3, 0), tempPos2.setValue(-4, -1, 0));
    addGroupSpriteRenderer("terrains-3", tempPos1.setValue(-3, -2, 0));
    addGroupSpriteRenderer("terrains-3", tempPos1.setValue(-2, -3, 0), tempPos2.setValue(-2, -2, 0));
    addGroupSpriteRenderer("terrains-3", tempPos1.setValue(-1, -2, 0), tempPos2.setValue(-1, 5, 0));
    addGroupSpriteRenderer("terrains-3", tempPos1.setValue(5, -2, 0), tempPos2.setValue(5, 5, 0));
    addGroupSpriteRenderer("terrains-3", tempPos1.setValue(4, -3, 0), tempPos2.setValue(4, -1, 0));
    addGroupSpriteRenderer("terrains-3", tempPos1.setValue(3, -2, 0));
    addGroupSpriteRenderer("terrains-3", tempPos1.setValue(2, -3, 0), tempPos2.setValue(2, -2, 0));
    addGroupSpriteRenderer("terrains-3", tempPos1.setValue(1, -2, 0), tempPos2.setValue(1, 5, 0));

    // Draw the ground.
    addGroupSpriteRenderer("terrains-0", tempPos1.setValue(0, -5, 0), tempPos2.setValue(0, 5, 0));
    addGroupSpriteRenderer("terrains-0", tempPos1.setValue(-1, -3, 0), tempPos2.setValue(1, -3, 0));

    // Draw the magma.
    addGroupSpriteRenderer("terrains-45", tempPos1.setValue(-5, -5, 0), tempPos2.setValue(-1, -4, 0));
    addGroupSpriteRenderer("terrains-45", tempPos1.setValue(-4, -3, 0), tempPos2.setValue(-4, -3, 0));
    addGroupSpriteRenderer("terrains-45", tempPos1.setValue(-5, -3, 0));
    addGroupSpriteRenderer("terrains-45", tempPos1.setValue(-3, -3, 0));
    addGroupSpriteRenderer("terrains-45", tempPos1.setValue(1, -5, 0), tempPos2.setValue(5, -4, 0));
    addGroupSpriteRenderer("terrains-45", tempPos1.setValue(4, -3, 0), tempPos2.setValue(4, -3, 0));
    addGroupSpriteRenderer("terrains-45", tempPos1.setValue(5, -3, 0));
    addGroupSpriteRenderer("terrains-45", tempPos1.setValue(3, -3, 0));

    // Draw the river.
    addGroupSpriteRenderer("terrains-46", tempPos1.setValue(-4, 0, 0), tempPos2.setValue(-2, 5, 0));
    addGroupSpriteRenderer("terrains-46", tempPos1.setValue(-3, -1, 0), tempPos2.setValue(-2, -1, 0));
    addGroupSpriteRenderer("terrains-46", tempPos1.setValue(2, 0, 0), tempPos2.setValue(4, 5, 0));
    addGroupSpriteRenderer("terrains-46", tempPos1.setValue(2, -1, 0), tempPos2.setValue(3, -1, 0));

    // Draw the npcs.
    addGroupSpriteRenderer("npcs-0", tempPos1.setValue(0, -4, 1));
    addGroupSpriteRenderer("npcs-7", tempPos1.setValue(-1, -3, 1));
  });

engine.run();
