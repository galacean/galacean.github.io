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
  Layer,
  Material,
  MeshRenderer,
  PrimitiveMesh,
  RenderColorTexture,
  RenderQueueType,
  RenderTarget,
  Script,
  Shader,
  StencilOperation,
  Vector2,
  WebGLEngine
} from "oasis-engine";

const gui = new dat.GUI();
const engine = new WebGLEngine("canvas");
engine.run();
engine.canvas.resizeByClientSize();

const scene = engine.sceneManager.activeScene;
const rootEntity = scene.createRootEntity();
scene.background.solidColor.setValue(1, 1, 1, 1);

// camera
const cameraNode = rootEntity.createChild("camera_node");
cameraNode.transform.setPosition(0, 1.3, 1);
const camera = cameraNode.addComponent(Camera);
camera.enableFrustumCulling = false;
cameraNode.addComponent(OrbitControl).target.setValue(0, 1.3, 0);

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
// 外描边-模版测试
class Border extends Script {
  material: Material;
  borderRenderer: MeshRenderer[] = [];

  private _size: number = 3;
  private _color: Color = new Color(0, 0, 0, 1);

  get size(): number {
    return this._size;
  }

  set size(value: number) {
    this.material.shaderData.setFloat("u_width", value * 0.001);
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
      this.size = this._size;
      this.color = this._color;
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

// 内描边-背面剔除
class Border2 extends Script {
  material: Material;
  borderRenderer: MeshRenderer[] = [];
  private _size: number = 3;
  private _color: Color = new Color(0, 0, 0, 1);

  get size(): number {
    return this._size;
  }

  set size(value: number) {
    this.material.shaderData.setFloat("u_width", value * 0.001);
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
      this.size = this._size;
      this.color = this._color;
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

class PostScript extends Script {
  renderTarget: RenderTarget;

  onBeginRender(camera: Camera): void {
    camera.renderTarget = this.renderTarget;
    camera.cullingMask = Layer.Layer0;
  }

  onEndRender(camera: Camera): void {
    camera.renderTarget = null;
    camera.cullingMask = Layer.Layer1;
    camera.render();
  }
}

// 边缘检测-后处理
class Border3 extends Script {
  material: Material;
  private _color: Color = new Color(0, 0, 0, 1);
  private _camera: Camera;
  private _screen: Entity;
  private _postScript: PostScript;

  get color(): Color {
    return this._color;
  }

  set color(value: Color) {
    this.material.shaderData.setColor("u_color", value);
    this._color = value;
  }

  get camera(): Camera {
    return this._camera;
  }

  set camera(value: Camera) {
    if (this._camera !== value) {
      this._camera = value;
      this._postScript = this.camera.entity.addComponent(PostScript);

      const material = this.getScreenMaterial(this.engine);
      const { width, height } = engine.canvas;

      const renderColorTexture = new RenderColorTexture(engine, width, height);
      const renderTarget = new RenderTarget(engine, width, height, renderColorTexture);
      const screen = (this._screen = rootEntity.createChild("screen"));
      const screenRenderer = screen.addComponent(MeshRenderer);
      this._postScript.renderTarget = renderTarget;

      screen.layer = Layer.Layer1;
      screenRenderer.mesh = PrimitiveMesh.createPlane(engine, 2, 2);
      screenRenderer.setMaterial(material);
      material.shaderData.setTexture("u_texture", renderColorTexture);
    }
  }

  getScreenMaterial(engine: Engine) {
    if (!this.material) {
      if (!Shader.find("screen-shader")) {
        const vertex = `
        attribute vec3 POSITION;
        attribute vec2 TEXCOORD_0;
        
        varying vec2 v_uv;
        
        void main(){
            gl_Position = vec4( POSITION.xzy , 1.0);
            gl_Position.y *= -1.0;
            v_uv = TEXCOORD_0;
            v_uv.y = 1.0 - v_uv.y;
        }
                `;
        const fragment = `
                uniform vec3 u_color;
                uniform sampler2D u_texture;
                uniform vec2 u_texSize;

                varying vec2 v_uv;


                float luminance(vec4 color) {
                  return  0.2125 * color.r + 0.7154 * color.g + 0.0721 * color.b; 
                }

                float sobel() {
                  float Gx[9] = float[](
                              -1.0,  0.0,  1.0,
                              -2.0,  0.0,  2.0,
                              -1.0,  0.0,  1.0);
                  float Gy[9] = float[](
                              -1.0, -2.0, -1.0,
                              0.0,  0.0,  0.0,
                              1.0,  2.0,  1.0);		
                  
                  float texColor;
                  float edgeX = 0.0;
                  float edgeY = 0.0;
                  vec2 uv[9];

                  uv[0] = v_uv + u_texSize.xy * vec2(-1, -1);
				          uv[1] = v_uv + u_texSize.xy * vec2(0, -1);
				          uv[2] = v_uv + u_texSize.xy * vec2(1, -1);
				          uv[3] = v_uv + u_texSize.xy * vec2(-1, 0);
				          uv[4] = v_uv + u_texSize.xy * vec2(0, 0);
				          uv[5] = v_uv + u_texSize.xy * vec2(1, 0);
				          uv[6] = v_uv + u_texSize.xy * vec2(-1, 1);
				          uv[7] = v_uv + u_texSize.xy * vec2(0, 1);
				          uv[8] = v_uv + u_texSize.xy * vec2(1, 1);

                  for (int i = 0; i < 9; i++) {
                    texColor = luminance(texture2D(u_texture, uv[i]));
                    edgeX += texColor * Gx[i];
                    edgeY += texColor * Gy[i];
                  }
                  
                  return abs(edgeX) + abs(edgeY);
                }

                void main(){
                  // float sobelFactor = step(1.0, sobel());
                  float sobelFactor = sobel();
                  gl_FragColor = mix( texture2D(u_texture, v_uv), vec4(u_color,1.0), sobelFactor);
                  // gl_FragColor = mix( vec4(1.0), vec4(u_color,1.0), sobelFactor);
                  // gl_FragColor = vec4(u_color,1.0) * sobelFactor;
                }
                `;

        Shader.create("screen-shader", vertex, fragment);
      }
      const material = new Material(engine, Shader.find("screen-shader"));
      this.material = material;
      this.color = this._color;
      const { width, height } = engine.canvas;
      material.shaderData.setVector2("u_texSize", new Vector2(1 / width, 1 / height));
    }

    return this.material;
  }

  onDestroy() {
    this._screen.destroy();
    if (this.camera) {
      this._postScript.renderTarget.destroy();
      this._postScript.destroy();
      this._postScript = null;
      this.camera.cullingMask = Layer.Layer0;
    }
  }
}

function openDebug() {
  const borderEntity = rootEntity.createChild("border");
  const color = new Color();
  let border: Border | Border2 | Border3 = borderEntity.addComponent(Border);

  const config = {
    plan: "外描边",
    size: 3,
    color: [0, 0, 0]
  };

  gui
    .add(config, "plan", ["外描边", "内描边", "后处理"])
    .onChange((v) => {
      color.setValue(config.color[0] / 255, config.color[1] / 255, config.color[2] / 255, 1);

      border.destroy();
      if (v === "外描边") {
        border = borderEntity.addComponent(Border);

        border.size = config.size;
        border.color = color;
        showSize();
      } else if (v === "内描边") {
        border = borderEntity.addComponent(Border2);
        border.size = config.size;
        border.color = color;
        showSize();
      } else if (v === "后处理") {
        border = borderEntity.addComponent(Border3);
        border.camera = camera;
        border.color = color;
        hideSize();
      }
    })
    .name("描边方案");

  let size;
  function showSize() {
    hideSize();
    size = gui.add(config, "size", 0, 5, 1).onChange((v) => {
      if (!(border instanceof Border3)) {
        border.size = v;
      }
    });
  }
  function hideSize() {
    size && size.remove();
    size = null;
  }

  showSize();
  gui.addColor(config, "color").onChange((v) => {
    color.setValue(v[0] / 255, v[1] / 255, v[2] / 255, 1);
    border.color = color;
  });
}
