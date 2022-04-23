/**
 * @title glTF Pointer
 * @category input
 */
import { OrbitControl } from "@oasis-engine/controls";
import {
  BoundingBox,
  BoxColliderShape,
  Camera,
  DirectLight,
  Entity,
  GLTFResource,
  Matrix,
  MeshRenderer,
  Renderer,
  Script,
  StaticCollider,
  Vector3,
  WebGLEngine
} from "oasis-engine";
import { LitePhysics } from "@oasis-engine/physics-lite";

class GlTFCollider extends Script {
  private _tempVec30: Vector3 = new Vector3();
  private _tempVec31: Vector3 = new Vector3();
  private _tempMatrix: Matrix = new Matrix();
  private _notMergeEntity: Entity[] = [];

  onStart(): void {
    const { _notMergeEntity: notMergeEntity } = this;
    const renderers = this.entity.getComponentsIncludeChildren(MeshRenderer, []);
    for (let i = renderers.length - 1; i >= 0; i--) {
      notMergeEntity.push(this._addBoundingBox(renderers[i].bounds, renderers[i]));
    }
  }

  private _addBoundingBox(boundingBox: BoundingBox, renderer: Renderer): Entity {
    const { entity, _tempVec30: worldSize, _tempVec31: worldPosition, _tempMatrix: worldMatrix } = this;
    // Calculate the position and size of the collider.
    boundingBox.getCenter(worldPosition);
    Vector3.subtract(boundingBox.max, boundingBox.min, worldSize);
    // Add entity and calculate the world matrix of the collider.
    const cubeEntity = entity.createChild("cube");
    Matrix.translation(worldPosition, worldMatrix);
    cubeEntity.transform.worldMatrix = worldMatrix;
    // Add collider.
    const boxCollider = cubeEntity.addComponent(StaticCollider);
    const boxColliderShape = new BoxColliderShape();
    boxColliderShape.setSize(worldSize.x, worldSize.y, worldSize.z);
    boxCollider.addShape(boxColliderShape);
    // Add click script.
    cubeEntity.addComponent(Script).onPointerClick = () => {
      window.alert("Click:" + renderer.entity.name);
    };
    return cubeEntity;
  }
}

//-- create engine object
const engine = new WebGLEngine("canvas");
engine.canvas.resizeByClientSize();
engine.physicsManager.initialize(LitePhysics);

const scene = engine.sceneManager.activeScene;
const rootEntity = scene.createRootEntity();

const directLightNode = rootEntity.createChild("dir_light");
directLightNode.addComponent(DirectLight);
directLightNode.transform.setRotation(30, 0, 0);

//Create camera
const cameraNode = rootEntity.createChild("camera_node");
cameraNode.transform.setPosition(0, 0, 10);
cameraNode.addComponent(Camera);
cameraNode.addComponent(OrbitControl);

engine.resourceManager
  .load<GLTFResource>("https://gw.alipayobjects.com/os/bmw-prod/48a1e8b3-06b4-4269-807d-79274e58283a.glb")
  .then((glTF) => {
    const glTFRoot = glTF.defaultSceneRoot;
    const entity = rootEntity.createChild("glTF");
    entity.addChild(glTFRoot);
    glTFRoot.transform.setScale(0.005, 0.005, 0.005);
    glTFRoot.addComponent(GlTFCollider);
    engine.run();
  });
