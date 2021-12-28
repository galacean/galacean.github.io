/**
 * @title Outline
 * @category Advance
 */
import { OrbitControl } from "@oasis-engine/controls";
import { FramebufferPicker } from "@oasis-engine/framebuffer-picker";
import * as dat from "dat.gui";
import {
  AmbientLight,
  AssetType,
  Camera,
  Color,
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

const gui = new dat.GUI();
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

// ambient light
engine.resourceManager
  .load<AmbientLight>({
    type: AssetType.Env,
    url: "https://gw.alipayobjects.com/os/bmw-prod/f369110c-0e33-47eb-8296-756e9c80f254.bin"
  })
  .then((ambientLight) => {
    scene.ambientLight = ambientLight;
  });

// gltf model
const models = [
  "https://gw.alipayobjects.com/os/bmw-prod/8ba6b70e-9a92-4dfd-9342-8b23c0319b7b.glb",
  "https://gw.alipayobjects.com/os/bmw-prod/3869e495-2e04-4e80-9d22-13b37116379a.gltf" // 猴子
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
      defaultSceneRoot.transform.setPosition(i - models.length / 2, 0, 0);
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
  
                uniform float u_width;
                uniform mat4 u_MVPMat;
                uniform mat4 u_modelMat;
                uniform mat4 u_viewMat;
                uniform mat4 u_projMat;
                uniform mat4 u_normalMat;
                
                void main() {
                   vec4 mPosition = u_modelMat * vec4(POSITION, 1.0);
                   vec3 mNormal = normalize( mat3(u_normalMat) * NORMAL );
                   mPosition.xyz += mNormal * u_width;
                   gl_Position = u_projMat * u_viewMat * mPosition;
                }
                `;
        const fragment = `
                uniform vec3 u_color;

                void main(){
                  gl_FragColor = vec4(u_color, 1);
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
      material.shaderData.setFloat("u_width", 0.1);
      material.shaderData.setColor("u_color", new Color(1, 1, 1, 1));
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

const borderEntity = rootEntity.createChild("border");
borderEntity.addComponent(Border);

const config = {
  plan: "模版测试"
};

gui
  .add(config, "plan", ["模版测试", "a"])
  .onChange((v) => {
    borderEntity.isActive = false;
    if (v === "模版测试") {
      borderEntity.isActive = true;
    } else {
      borderEntity.isActive = false;
    }
  })
  .name("描边方案");
