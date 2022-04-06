/**
 * @title glTF Pointer
 * @category input
 */
import { OrbitControl } from "@oasis-engine/controls";
import {
  AmbientLight,
  AssetType,
  BackgroundMode,
  BlinnPhongMaterial,
  BoundingBox,
  BoxColliderShape,
  Camera,
  Color,
  DirectLight,
  Entity,
  GLTFResource,
  Matrix,
  MeshRenderer,
  PBRMaterial,
  PrimitiveMesh,
  Renderer,
  Script,
  SkyBoxMaterial,
  StaticCollider,
  UnlitMaterial,
  Vector3,
  WebGLEngine
} from "oasis-engine";
import { LitePhysics } from "@oasis-engine/physics-lite";
import * as dat from "dat.gui";

enum MergeModeType {
  merge,
  dontMerge
}
class glTFCollider extends Script {
  private _curClickRenderer: Renderer;
  private _cycleTime: number = 2500;
  private _shapeSize: Vector3 = new Vector3();
  private _shapePosition: Vector3 = new Vector3();
  private _auxiliaryBox: Renderer[] = [];

  private _mergeMode: MergeModeType = MergeModeType.dontMerge;
  private _mergeEntity: Entity;
  private _notMergeEntity: Entity[] = [];

  private _tempColor: Color = new Color();
  private _tempMatrix: Matrix = new Matrix();

  set mergeMode(type: MergeModeType) {
    if (this._mergeMode !== type) {
      this._mergeMode = type;
      const { _notMergeEntity: notMergeEntity, _mergeEntity: mergeEntity } = this;
      const entityLen = notMergeEntity.length;
      this._resetClickRenderer(null);
      switch (type) {
        case MergeModeType.merge:
          for (let i = entityLen - 1; i >= 0; i--) {
            notMergeEntity[i].isActive = false;
          }
          if (mergeEntity) {
            mergeEntity.isActive = true;
          } else {
            this.mergeBoundBox();
          }
          break;
        case MergeModeType.dontMerge:
          mergeEntity.isActive = false;
          if (entityLen > 0) {
            for (let i = entityLen - 1; i >= 0; i--) {
              notMergeEntity[i].isActive = true;
            }
          } else {
            this.dontMergeBoundBox();
          }
          break;
        default:
          break;
      }
    }
  }

  mergeBoundBox() {
    const renderers = this.entity.getComponentsIncludeChildren(MeshRenderer, []);
    const boundingBox = renderers[0].bounds.clone();
    for (let i = renderers.length - 1; i > 0; i--) {
      BoundingBox.merge(boundingBox, renderers[i].bounds, boundingBox);
    }
    this._mergeEntity = this._addBoundingBox(boundingBox);
  }

  dontMergeBoundBox() {
    const { _notMergeEntity: notMergeEntity } = this;
    if (notMergeEntity.length === 0) {
      const renderers = this.entity.getComponentsIncludeChildren(MeshRenderer, []);
      for (let i = renderers.length - 1; i >= 0; i--) {
        notMergeEntity.push(this._addBoundingBox(renderers[i].bounds, renderers[i]));
      }
    }
  }

  onStart(): void {
    this.dontMergeBoundBox();
  }

  onUpdate(): void {
    if (this._curClickRenderer) {
      const v = (Math.sin((2 * Math.PI * (engine.time.nowTime % this._cycleTime)) / this._cycleTime) + 1) / 2;
      this._setRendererColor(this._curClickRenderer, this._tempColor.setValue(v, 0, 0, 1));
    }
  }

  private _addBoundingBox(boundingBox: BoundingBox, renderer?: Renderer): Entity {
    const { entity, engine, _shapePosition: shapePosition, _shapeSize: shapeSize } = this;
    // Calculate the position and size of the collider.
    boundingBox.getCenter(shapePosition);
    Vector3.subtract(boundingBox.max, boundingBox.min, shapeSize);
    // Calculate the world matrix of the collider.
    const cubeWorldMatrix = this._tempMatrix;
    const cubeEntity = entity.createChild("cube");
    Matrix.translation(shapePosition, cubeWorldMatrix);
    cubeEntity.transform.worldMatrix = cubeWorldMatrix;
    const script = cubeEntity.addComponent(Script);
    script.onPointerClick = () => {
      this._resetClickRenderer(renderer);
    };
    // AABB Collider.
    const boxCollider = cubeEntity.addComponent(StaticCollider);
    const boxColliderShape = new BoxColliderShape();
    boxColliderShape.setSize(shapeSize.x, shapeSize.y, shapeSize.z);
    boxCollider.addShape(boxColliderShape);
    // Comment the code below if needed.
    const cubeRenderer = cubeEntity.addComponent(MeshRenderer);
    const material = new BlinnPhongMaterial(engine);
    material.baseColor = this._tempColor.setValue(Math.random(), Math.random(), Math.random(), 0.3);
    material.isTransparent = true;
    cubeRenderer.setMaterial(material);
    const border = Math.max(shapeSize.x, shapeSize.y, shapeSize.z) / 100;
    cubeRenderer.mesh = PrimitiveMesh.createCuboid(
      engine,
      shapeSize.x + border,
      shapeSize.y + border,
      shapeSize.z + border
    );
    this._auxiliaryBox.push(cubeRenderer);
    return cubeEntity;
  }

  private _resetClickRenderer(renderer: Renderer) {
    const { _curClickRenderer: curClickRenderer } = this;
    if (curClickRenderer !== renderer) {
      this._curClickRenderer = renderer;
      curClickRenderer && this._setRendererColor(curClickRenderer, this._tempColor.setValue(1, 1, 1, 1));
    }
  }

  private _setRendererColor(renderer: Renderer, color: Color) {
    const materials = renderer.getMaterials();
    for (let i = 0; i < materials.length; i++) {
      const material = materials[i];
      if (
        material instanceof UnlitMaterial ||
        material instanceof PBRMaterial ||
        material instanceof BlinnPhongMaterial
      ) {
        material.baseColor = color;
      }
    }
  }
}

//-- create engine object
const engine = new WebGLEngine("canvas", LitePhysics);
engine.canvas.resizeByClientSize();

const scene = engine.sceneManager.activeScene;
const { background } = scene;
const rootEntity = scene.createRootEntity();

const directLightNode = rootEntity.createChild("dir_light");
const directLightNode2 = rootEntity.createChild("dir_light2");
directLightNode.addComponent(DirectLight);
directLightNode2.addComponent(DirectLight);
directLightNode.transform.setRotation(30, 0, 0);
directLightNode2.transform.setRotation(-30, 180, 0);

//Create camera
const cameraNode = rootEntity.createChild("camera_node");
cameraNode.transform.setPosition(0, 0, 10);
cameraNode.addComponent(Camera);
cameraNode.addComponent(OrbitControl);

// Create sky
const sky = background.sky;
const skyMaterial = new SkyBoxMaterial(engine);
background.mode = BackgroundMode.Sky;

sky.material = skyMaterial;
sky.mesh = PrimitiveMesh.createCuboid(engine, 1, 1, 1);

Promise.all([
  engine.resourceManager
    .load<GLTFResource>("https://gw.alipayobjects.com/os/bmw-prod/48a1e8b3-06b4-4269-807d-79274e58283a.glb")
    .then((glTF) => {
      const glTFRoot = glTF.defaultSceneRoot;
      const entity = rootEntity.createChild("");
      entity.addChild(glTFRoot);
      glTFRoot.transform.setScale(0.005, 0.005, 0.005);
      const script = glTFRoot.addComponent(glTFCollider);

      const gui = new dat.GUI();
      // Debug
      const debugInfo = {
        mergeBox: false
      };

      gui
        .add(debugInfo, "mergeBox")
        .onChange((v: boolean) => {
          if (v === true) {
            script.mergeMode = MergeModeType.merge;
          } else {
            script.mergeMode = MergeModeType.dontMerge;
          }
        })
        .name("合并包围盒");
    }),
  engine.resourceManager
    .load<AmbientLight>({
      type: AssetType.Env,
      url: "https://gw.alipayobjects.com/os/bmw-prod/f369110c-0e33-47eb-8296-756e9c80f254.bin"
    })
    .then((ambientLight) => {
      scene.ambientLight = ambientLight;
      skyMaterial.textureCubeMap = ambientLight.specularTexture;
      skyMaterial.textureDecodeRGBM = true;
    })
]).then(() => {
  engine.run();
});
