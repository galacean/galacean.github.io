/**
 * @title Outline
 * @category Advance
 */
import { OrbitControl } from "@oasis-engine/controls";
import { FramebufferPicker } from "@oasis-engine/framebuffer-picker";
import {
  AmbientLight,
  AssetType,
  Camera,
  CompareFunction,
  CullMode,
  Engine,
  GLTFResource,
  Material,
  MeshRenderer,
  RenderQueueType,
  Script,
  Shader,
  StencilOperation,
  WebGLEngine
} from "oasis-engine";

const engine = new WebGLEngine("canvas");
engine.run();
engine.canvas.resizeByClientSize();

const scene = engine.sceneManager.activeScene;
const rootEntity = scene.createRootEntity();

// camera
const cameraNode = rootEntity.createChild("camera_node");
cameraNode.transform.setPosition(0, 0, 15);
const camera = cameraNode.addComponent(Camera);
cameraNode.addComponent(OrbitControl);

// gltf model
const models = [
  "https://gw.alipayobjects.com/os/bmw-prod/8ba6b70e-9a92-4dfd-9342-8b23c0319b7b.glb",
  "https://gw.alipayobjects.com/os/bmw-prod/151ddae9-2800-491d-b5ee-f8849821b542.glb",
  "https://gw.alipayobjects.com/os/bmw-prod/0777d299-12a1-42e2-8c27-7f0495b11a1b.glb",
  "https://gw.alipayobjects.com/os/bmw-prod/f23efc3b-bf13-43e8-9a85-c4628c3007dd.glb",
  "https://gw.alipayobjects.com/os/bmw-prod/19ff24f6-d40a-48e6-9eef-96f259def1b7.glb",
  "https://gw.alipayobjects.com/os/bmw-prod/18484ae9-f4c5-486d-8ed7-2e387a5e1df0.glb",
  "https://gw.alipayobjects.com/os/bmw-prod/25cfb56a-e345-4f49-b7ee-e7bcfd58745b.glb",
  "https://gw.alipayobjects.com/os/bmw-prod/116ce28b-2c10-46af-92d8-e5b35a4909d2.glb"
];

engine.resourceManager
  .load(
    models.map((url) => ({
      type: AssetType.Prefab,
      url
    }))
  )
  .then((gltfs: GLTFResource[]) => {
    gltfs.forEach((gltf, i) => {
      const { defaultSceneRoot } = gltf;
      rootEntity.addChild(defaultSceneRoot);
      defaultSceneRoot.transform.setPosition(i - 4, 0, 0);
    });
  });

/** ------------------ Border ------------------ */
class Border extends Script {
  material: Material;

  getBorderMaterial(engine: Engine) {
    if (!this.material) {
      if (!Shader.find("border-shader")) {
        const vertex = `
                attribute vec3 POSITION;
                attribute vec3 NORMAL;
  
                uniform mat4 u_MVPMat;
                
                void main() {
                   gl_Position = u_MVPMat * vec4( POSITION + NORMAL * 3.0, 1.0 );
                }
                `;
        const fragment = `
                void main(){
                  gl_FragColor = vec4(1, 1, 1, 1);
                }
                `;

        Shader.create("border-shader", vertex, fragment);
      }
      const material = new Material(engine, Shader.find("border-shader"));
      this.material = material;
      material.renderQueueType = RenderQueueType.Transparent + 1;
      material.renderState.rasterState.cullMode = CullMode.Off;
      const stencilState = material.renderState.stencilState;
      stencilState.enabled = true;
      stencilState.referenceValue = 1;
      stencilState.compareFunctionFront = CompareFunction.NotEqual;
      stencilState.compareFunctionBack = CompareFunction.NotEqual;
      stencilState.writeMask = 0x00;
    }

    return this.material;
  }

  showBorder(renderer: MeshRenderer) {
    const entity = renderer.entity;
    const material = renderer.getMaterial();
    const stencilState = material.renderState.stencilState;

    stencilState.enabled = true;
    stencilState.referenceValue = 1;
    stencilState.passOperationFront = StencilOperation.Replace;

    const renderers: MeshRenderer[] = [];
    const borderMaterial = this.getBorderMaterial(entity.engine);

    if (entity.getComponents(MeshRenderer, renderers).length === 1) {
      const borderRenderer = entity.addComponent(MeshRenderer);
      borderRenderer.mesh = renderer.mesh;
      borderRenderer.setMaterial(borderMaterial);
      borderRenderer.enabled = true;
    } else {
      renderers[0].enabled = true;
    }
  }

  hideBorder(renderer: MeshRenderer) {
    const entity = renderer.entity;
    const material = renderer.getMaterial();
    const stencilState = material.renderState.stencilState;

    stencilState.enabled = false;

    const renderers: MeshRenderer[] = [];
    if (entity.getComponents(MeshRenderer, renderers).length === 2) {
      renderers[0].enabled = false;
    }
  }

  onStart() {
    const framebufferPicker = this.entity.addComponent(FramebufferPicker);
    framebufferPicker.camera = camera;
    let lastRenderer = null;
    framebufferPicker.onPick = (obj) => {
      if (obj) {
        const { component } = obj;
        lastRenderer && this.hideBorder(lastRenderer);
        this.showBorder(component);
        lastRenderer = component;
      } else {
        // lastRenderer && this.hideBorder(lastRenderer);
      }
    };

    engine.canvas._webCanvas.addEventListener("mousedown", (e) => {
      framebufferPicker.pick(e.offsetX, e.offsetY);
    });
  }
}

rootEntity.addComponent(Border);
