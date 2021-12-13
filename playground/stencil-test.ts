/**
 * @title Stencil test for outline
 * @category Material
 */
import { OrbitControl } from "@oasis-engine/controls";
import {
  AmbientLight,
  AssetType,
  BackgroundMode,
  Camera,
  CameraClearFlags,
  CompareFunction,
  DirectLight,
  Entity,
  GLTFResource,
  Layer,
  Logger,
  Material,
  PrimitiveMesh,
  RenderPass,
  RenderQueue,
  RenderQueueType,
  Script,
  Shader,
  SkyBoxMaterial,
  StencilOperation,
  WebGLEngine
} from "oasis-engine";
Logger.enable();
//-- create engine object
const engine = new WebGLEngine("canvas");
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
cameraNode.transform.setPosition(0, 0, 5);
const camera = cameraNode.addComponent(Camera);
cameraNode.addComponent(OrbitControl);

// Create sky
const sky = background.sky;
const skyMaterial = new SkyBoxMaterial(engine);
background.mode = BackgroundMode.Sky;

sky.material = skyMaterial;
sky.mesh = PrimitiveMesh.createCuboid(engine, 1, 1, 1);

Promise.all([
  engine.resourceManager
    .load<GLTFResource>("https://gw.alipayobjects.com/os/bmw-prod/150e44f6-7810-4c45-8029-3575d36aff30.gltf")
    .then((gltf) => {
      const entity = rootEntity.createChild("");
      console.log(gltf);

      for (let i = 0; i < 3; i++) {
        const clone = gltf.defaultSceneRoot.clone();
        if (i === 0) {
          clone.layer = Layer.Layer25 + i;
        }
        entity.addChild(clone);
        clone.transform.setPosition(i * 2, 0, 0);
      }
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

// test border
class Border extends Script {
  preRenderPass: RenderPass;
  postRenderPass: RenderPass;
  layer: Layer = Layer.Layer25;

  private _camera: Camera;

  /**
   * Camera.
   */
  get camera(): Camera {
    return this._camera;
  }

  set camera(value: Camera) {
    if (this._camera !== value) {
      this._camera = value;
      //@ts-ignore
      this.camera._renderPipeline.addRenderPass(this.preRenderPass);
      //@ts-ignore
      this.camera._renderPipeline.addRenderPass(this.postRenderPass);
    }
  }

  constructor(entity: Entity) {
    super(entity);
    if (!Shader.find("border-shader")) {
      const vertex = `
      attribute vec3 POSITION;

      uniform mat4 u_MVPMat;
      
      void main() {
         gl_Position = u_MVPMat * vec4( POSITION * 1.1 , 1.0 );
      }
      `;
      const fragment = `
      void main(){
        gl_FragColor = vec4(1, 0, 0, 1);
      }
      `;

      Shader.create("border-shader", vertex, fragment);
    }
    const replaceMaterial = new Material(engine, Shader.find("border-shader"));
    const preRenderPass = (this.preRenderPass = new RenderPass(
      "pre-border-pass",
      -1,
      null,
      replaceMaterial,
      Layer.Layer25
    ));
    const postRenderPass = (this.postRenderPass = new RenderPass(
      "post-border-pass",
      1,
      null,
      replaceMaterial,
      Layer.Layer25
    ));
    preRenderPass.enabled = false;
    preRenderPass.preRender = (camera: Camera, opaqueQueue: RenderQueue) => {
      for (let i = 0, length = opaqueQueue.items.length; i < length; i++) {
        const item = opaqueQueue.items[i];
        if (item.component.entity.layer & this.layer) {
          const stencilState = item.material.renderState.stencilState;
          stencilState.enabled = true;
          stencilState.referenceValue = 1;
          stencilState.passOperationFront = StencilOperation.Replace;
        }
      }
    };

    postRenderPass.clearFlags = CameraClearFlags.None;
    const stencilState = replaceMaterial.renderState.stencilState;
    stencilState.enabled = true;
    stencilState.referenceValue = 1;
    stencilState.compareFunctionFront = CompareFunction.NotEqual;
    stencilState.writeMask = 0x00;
  }

  onDestroy() {
    if (this.camera && !this.camera.destroyed) {
      //@ts-ignore
      this.camera._renderPipeline.removeRenderPass(this.preRenderPass);
      //@ts-ignore
      this.camera._renderPipeline.removeRenderPass(this.postRenderPass);
    }
  }

  onDisable() {
    this.preRenderPass.enabled = false;
    this.postRenderPass.enabled = false;
  }

  onEnable() {
    this.preRenderPass.enabled = true;
    this.postRenderPass.enabled = true;
  }
}

const border = rootEntity.addComponent(Border);
border.camera = camera;

setTimeout(() => {
  // border.enabled = false;
}, 2000);
