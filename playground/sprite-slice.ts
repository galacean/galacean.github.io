/**
 * @title Sprite Slice
 * @category 2D
 */
import * as dat from "dat.gui";
import {
  AssetType,
  Camera,
  Color,
  Entity,
  MathUtil,
  MeshRenderer,
  MeshTopology,
  ModelMesh,
  Script,
  Sprite,
  SpriteDrawMode,
  SpriteRenderer,
  SubMesh,
  Texture2D,
  UnlitMaterial,
  Vector4,
  WebGLEngine
} from "oasis-engine";

// Create engine
WebGLEngine.create({ canvas: "canvas" }).then((engine) => {
  engine.canvas.resizeByClientSize();

  // Create root entity.
  const rootEntity = engine.sceneManager.activeScene.createRootEntity();

  // Create camera.
  const cameraEntity = rootEntity.createChild("Camera");
  cameraEntity.transform.setPosition(0, 0, 5);
  const camera = cameraEntity.addComponent(Camera);
  camera.isOrthographic = true;
  camera.orthographicSize = 5;

  engine.resourceManager
    .load<Texture2D>({
      url: "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*0vm_SJVssKAAAAAAAAAAAAAAARQnAQ",
      type: AssetType.Texture2D,
    })
    .then((texture) => {
      // Create origin sprite entity.
      const spriteEntity = rootEntity.createChild("spriteSlice");
      const spriteRenderer = spriteEntity.addComponent(SpriteRenderer);
      const sprite = (spriteRenderer.sprite = new Sprite(engine, texture));
      spriteRenderer.drawMode = SpriteDrawMode.Sliced;
      sprite.border = new Vector4();
      addDataGUI(spriteEntity);
    });

  engine.run();

  /**
   * Auxiliary display.
   */
  class TriangleScript extends Script {
    private triangleEntity: Entity;
    private modelMesh: ModelMesh;
    private targetSpriteRenderer: SpriteRenderer;

    onAwake(): void {
      const { engine, entity } = this;
      const triangleEntity = (this.triangleEntity = entity.createChild("tag"));
      const meshRenderer = triangleEntity.addComponent(MeshRenderer);
      meshRenderer.mesh = this.modelMesh = new ModelMesh(engine, "tag");
      const material = new UnlitMaterial(engine);
      material.baseColor = new Color(1, 0, 0, 1);
      meshRenderer.setMaterial(material);
      this.targetSpriteRenderer = entity.getComponent(SpriteRenderer);
    }

    setShow(value: boolean) {
      this.enabled = this.triangleEntity.isActive = value;
    }

    onUpdate(): void {
      const { modelMesh, targetSpriteRenderer } = this;
      // @ts-ignore
      const { positions, vertexCount, triangles } =
        targetSpriteRenderer._renderData;
      if (vertexCount > 0) {
        const length = triangles.length * 2;
        if (length <= 0) {
          return;
        }
        const myTriangles = modelMesh.getIndices() || new Uint16Array(length);
        const myPositions = modelMesh.getPositions() || [];
        for (let i = 0; i < positions.length; i++) {
          myPositions[i] = positions[i].clone();
        }
        for (let i = 0; i < triangles.length / 3; i++) {
          myTriangles[6 * i] = triangles[i * 3];
          myTriangles[6 * i + 1] = triangles[i * 3 + 1];
          myTriangles[6 * i + 2] = triangles[i * 3 + 1];
          myTriangles[6 * i + 3] = triangles[i * 3 + 2];
          myTriangles[6 * i + 4] = triangles[i * 3 + 2];
          myTriangles[6 * i + 5] = triangles[i * 3];
        }
        modelMesh.setPositions(myPositions);
        modelMesh.setIndices(myTriangles);
        modelMesh.clearSubMesh();
        modelMesh.addSubMesh(new SubMesh(0, length, MeshTopology.Lines));
        modelMesh.uploadData(false);
      }
    }
  }

  /**
   * Add data GUI.
   */
  function addDataGUI(entity: Entity) {
    const spriteRenderer = entity.getComponent(SpriteRenderer);
    const triangleScript = entity.addComponent(TriangleScript);
    triangleScript.setShow(false);
    const sprite = spriteRenderer.sprite;
    const border = sprite.border;
    const gui = new dat.GUI();
    const defaultWidth = spriteRenderer.width;
    const defaultHeight = spriteRenderer.height;
    const guiData = {
      drawMode: "Slice",
      left: 0,
      bottom: 0,
      right: 0,
      top: 0,
      showTriangle: false,
      width: defaultWidth,
      height: defaultHeight,
      reset: () => {
        spriteRenderer.width = guiData.width = defaultWidth;
        spriteRenderer.height = guiData.height = defaultHeight;
        guiData.left = guiData.bottom = guiData.right = guiData.top = 0;
        sprite.border = border.set(0, 0, 0, 0);
        guiData.showTriangle = false;
      },
    };

    gui
      .add(guiData, "drawMode", ["Simple", "Slice"])
      .onChange((value: string) => {
        if (value === "Simple") {
          spriteRenderer.drawMode = SpriteDrawMode.Simple;
        } else {
          spriteRenderer.drawMode = SpriteDrawMode.Sliced;
        }
      })
      .listen();
    gui
      .add(guiData, "left", 0.0, 1.0, 0.01)
      .onChange((value: number) => {
        guiData.left = border.x = MathUtil.clamp(value, 0, 1 - border.z);
        sprite.border = border;
      })
      .listen();
    gui
      .add(guiData, "bottom", 0.0, 1.0, 0.01)
      .onChange((value: number) => {
        guiData.bottom = border.y = MathUtil.clamp(value, 0, 1 - border.w);
        sprite.border = border;
      })
      .listen();
    gui
      .add(guiData, "right", 0.0, 1.0, 0.01)
      .onChange((value: number) => {
        guiData.right = border.z = MathUtil.clamp(value, 0, 1 - border.x);
        sprite.border = border;
      })
      .listen();
    gui
      .add(guiData, "top", 0.0, 1.0, 0.01)
      .onChange((value: number) => {
        guiData.top = border.w = MathUtil.clamp(value, 0, 1 - border.y);
        sprite.border = border;
      })
      .listen();
    gui
      .add(guiData, "showTriangle")
      .onChange((value: boolean) => {
        triangleScript.setShow(value);
      })
      .listen();
    gui
      .add(
        guiData,
        "width",
        defaultWidth / 5,
        defaultWidth * 5,
        defaultWidth / 10
      )
      .onChange((value: number) => {
        spriteRenderer.width = value;
      })
      .listen();
    gui
      .add(
        guiData,
        "height",
        defaultHeight / 5,
        defaultHeight * 5,
        defaultHeight / 10
      )
      .onChange((value: number) => {
        spriteRenderer.height = value;
      })
      .listen();
    gui.add(guiData, "reset").name("重置");

    return guiData;
  }
});
