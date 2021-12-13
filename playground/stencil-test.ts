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
  CompareFunction,
  CullMode,
  DirectLight,
  GLTFResource,
  Layer,
  Logger,
  Material,
  MeshRenderer,
  PrimitiveMesh,
  RenderQueueType,
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
    .load<GLTFResource>("https://gw.alipayobjects.com/os/bmw-prod/e35f6b80-aa69-494a-aa95-44c602efd31e.glb")
    .then((gltf) => {
      const entity = rootEntity.createChild("");
      console.log(gltf);

      for (let i = 0; i < 3; i++) {
        const clone = gltf.defaultSceneRoot.clone();
        if (i === 0) {
          const test = [];
          clone.getComponentsIncludeChildren(MeshRenderer, test);
          showBorder(test[0]);
          // setTimeout(() => {
          //   hideBorder(test[0]);
          //   setTimeout(() => {
          //     showBorder(test[0]);
          //   }, 1000);
          // }, 1000);
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

if (!Shader.find("border-shader")) {
  const vertex = `
  attribute vec3 POSITION;
  attribute vec3 NORMAL;

  uniform mat4 u_MVPMat;
  
  void main() {
     gl_Position = u_MVPMat * vec4( POSITION + NORMAL * 2.0 , 1.0 );
  }
  `;
  const fragment = `
  void main(){
    gl_FragColor = vec4(1, 1, 1, 1);
  }
  `;

  Shader.create("border-shader", vertex, fragment);
}

const replaceMaterial = new Material(engine, Shader.find("border-shader"));
replaceMaterial.renderQueueType = RenderQueueType.Transparent + 1;
replaceMaterial.renderState.rasterState.cullMode = CullMode.Off;
const stencilState = replaceMaterial.renderState.stencilState;
stencilState.enabled = true;
stencilState.referenceValue = 1;
stencilState.compareFunctionFront = CompareFunction.NotEqual;
stencilState.writeMask = 0x00;

function showBorder(renderer: MeshRenderer) {
  const entity = renderer.entity;
  const material = renderer.getMaterial();
  const stencilState = material.renderState.stencilState;

  stencilState.enabled = true;
  stencilState.referenceValue = 1;
  stencilState.passOperationFront = StencilOperation.Replace;

  const renderers: MeshRenderer[] = [];

  if (entity.getComponents(MeshRenderer, renderers).length === 1) {
    const borderRenderer = entity.addComponent(MeshRenderer);
    borderRenderer.mesh = renderer.mesh;
    borderRenderer.setMaterial(replaceMaterial);
    borderRenderer.enabled = true;
  } else {
    renderers[0].enabled = true;
  }
}

function hideBorder(renderer: MeshRenderer) {
  const entity = renderer.entity;
  const material = renderer.getMaterial();
  const stencilState = material.renderState.stencilState;

  stencilState.enabled = false;

  const renderers: MeshRenderer[] = [];
  if (entity.getComponents(MeshRenderer, renderers).length === 2) {
    renderers[0].enabled = false;
  }
}
