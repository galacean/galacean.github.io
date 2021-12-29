/**
 * @title Outline
 * @category Advance
 */
import { OrbitControl } from "@oasis-engine/controls";
import * as dat from "dat.gui";
import {
  AmbientLight,
  AssetType,
  Camera,
  Color,
  CompareFunction,
  CullMode,
  Engine,
  Entity,
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
scene.background.solidColor.setValue(0, 0, 0, 0);

// camera
const cameraNode = rootEntity.createChild("camera_node");
cameraNode.transform.setPosition(0, 1, 3);
cameraNode.addComponent(Camera);
cameraNode.addComponent(OrbitControl).target.setValue(0, 1, 0);

// ambient light
engine.resourceManager
  .load<AmbientLight>({
    type: AssetType.Env,
    url: "https://gw.alipayobjects.com/os/bmw-prod/34986a5b-fa16-40f1-83c8-1885efe855d2.bin"
  })
  .then((ambientLight) => {
    scene.ambientLight = ambientLight;
    ambientLight.specularIntensity = ambientLight.diffuseIntensity = 2;
  });

engine.resourceManager
  .load({
    type: AssetType.Prefab,
    url: "https://gw.alipayobjects.com/os/OasisHub/440000554/3615/%25E5%25BD%2592%25E6%25A1%25A3.gltf"
  })
  .then((gltf: GLTFResource) => {
    const { defaultSceneRoot } = gltf;
    rootEntity.addChild(defaultSceneRoot);

    openDebug();
  });

/** ------------------ Border ------------------ */
// 模版测试
class Border extends Script {
  material: Material;
  borderRenderer: MeshRenderer[] = [];

  private _size: number = 0.003;
  private _color: Color = new Color(1, 1, 1, 1);

  get size(): number {
    return this._size;
  }

  set size(value: number) {
    this.material.shaderData.setFloat("u_width", value);
    this._size = value;
  }

  get color(): Color {
    return this._color;
  }

  set color(value: Color) {
    this.material.shaderData.setColor("u_color", value);
    this._color = value;
  }

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
      material.shaderData.setFloat("u_width", this.size);
      material.shaderData.setColor("u_color", this.color);
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

    const borderMaterial = this.getBorderMaterial(entity.engine);

    const borderRenderer = entity.addComponent(MeshRenderer);
    borderRenderer.mesh = renderer.mesh;
    borderRenderer.setMaterial(borderMaterial);

    this.borderRenderer.push(borderRenderer);
  }

  constructor(entity: Entity) {
    super(entity);
    const meshes: MeshRenderer[] = [];
    rootEntity.getComponentsIncludeChildren(MeshRenderer, meshes);
    meshes.forEach((mesh) => {
      this.showBorder(mesh);
    });
  }

  onDestroy() {
    this.borderRenderer.forEach((renderer) => {
      renderer.destroy();
    });
    this.borderRenderer.length = 0;
  }
}

// 内描边
class Border2 extends Script {
  material: Material;
  borderRenderer: MeshRenderer[] = [];
  private _size: number = 0.003;
  private _color: Color = new Color(1, 1, 1, 1);

  get size(): number {
    return this._size;
  }

  set size(value: number) {
    this.material.shaderData.setFloat("u_width", value);
    this._size = value;
  }

  get color(): Color {
    return this._color;
  }

  set color(value: Color) {
    this.material.shaderData.setColor("u_color", value);
    this._color = value;
  }

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
      material.renderState.rasterState.cullMode = CullMode.Front;
      material.shaderData.setFloat("u_width", this.size);
      material.shaderData.setColor("u_color", this.color);
    }

    return this.material;
  }

  showBorder(renderer: MeshRenderer) {
    const entity = renderer.entity;

    const borderMaterial = this.getBorderMaterial(entity.engine);
    const borderRenderer = entity.addComponent(MeshRenderer);
    borderRenderer.mesh = renderer.mesh;
    borderRenderer.setMaterial(borderMaterial);

    this.borderRenderer.push(borderRenderer);
  }

  constructor(entity: Entity) {
    super(entity);
    const renderers: MeshRenderer[] = [];
    rootEntity.getComponentsIncludeChildren(MeshRenderer, renderers);
    renderers.forEach((renderer) => {
      this.showBorder(renderer);
    });
  }

  onDestroy() {
    this.borderRenderer.forEach((renderer) => {
      renderer.destroy();
    });
    this.borderRenderer.length = 0;
  }
}

function openDebug() {
  const borderEntity = rootEntity.createChild("border");
  const color = new Color();
  let border: Border | Border2 = borderEntity.addComponent(Border);

  const config = {
    plan: "模版测试",
    size: 0.003,
    color: [255, 255, 255]
  };

  gui
    .add(config, "plan", ["模版测试", "内描边"])
    .onChange((v) => {
      border.destroy();
      if (v === "模版测试") {
        border = borderEntity.addComponent(Border);
        border.size = config.size;
        border.color = color;
      } else {
        border = borderEntity.addComponent(Border2);
        border.size = config.size;
        border.color = color;
      }
    })
    .name("描边方案");

  gui.add(config, "size", 0, 0.01, 0.001).onChange((v) => {
    border.size = v;
  });

  gui.addColor(config, "color").onChange((v) => {
    color.setValue(v[0] / 255, v[1] / 255, v[2] / 255, 1);
    border.color = color;
  });
}
