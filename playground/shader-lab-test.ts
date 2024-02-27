/**
 * @title ShaderLab Test
 * @category Material
 */

import {
  AssetType,
  BaseMaterial,
  Camera,
  CameraClearFlags,
  GLTFResource,
  Logger,
  MeshRenderer,
  PBRMaterial,
  Script,
  Shader,
  ShaderData,
  Texture2D,
  Vector2,
  Vector3,
  WebGLEngine
} from "@galacean/engine";
import { ShaderLab } from "@galacean/engine-shader-lab";
import { OrbitControl } from "@galacean/engine-toolkit-controls";
import * as dat from "dat.gui";

Logger.enable();
const shaderLab = new ShaderLab();
const gui = new dat.GUI();

Shader.create(
  "fur-shader",
  `
    attribute vec4 POSITION;
    attribute vec2 TEXCOORD_0;
    attribute vec3 NORMAL;

    uniform mat4 renderer_MVPMat;
    uniform mat4 renderer_ModelMat;
    uniform mat4 renderer_NormalMat;

    uniform vec3 u_gravity;
    uniform float u_gravityIntensity;
    uniform float u_furLength;
    uniform float u_furOffset;

    varying vec2 v_uv;
    varying vec3 v_normal;
    varying vec3 v_pos;

    void main(){
      vec4 position = POSITION;
      vec3 direction = mix(NORMAL, u_gravity * u_gravityIntensity + NORMAL * (1.0 - u_gravityIntensity), u_furOffset);
      position.xyz += direction * u_furLength * u_furOffset;
      gl_Position = renderer_MVPMat * position;
  
      v_uv = TEXCOORD_0;
      v_normal = normalize( mat3(renderer_NormalMat) * NORMAL );
      vec4 temp_pos = renderer_ModelMat * position;
      v_pos = temp_pos.xyz / temp_pos.w;
    }
`,
  `
    uniform vec3 camera_Position;
    uniform vec2 u_uvScale;

    uniform sampler2D u_mainTex;
    uniform sampler2D u_layerTex;
    uniform sampler2D u_flowTex;
    uniform float u_edgeFade;
    uniform float u_furOffset;

    varying vec2 v_uv;
    varying vec3 v_normal;
    varying vec3 v_pos;
    
    void main(){
			  vec3 normalDirection = normalize(v_normal);
			  vec3 viewDirection =  normalize(camera_Position - v_pos);

			  vec4 _BaseColor = texture2D(u_mainTex, v_uv);
			  // vec4 _BaseColor = vec4(1);

        vec2 uv = v_uv * u_uvScale;
			  float alpha = (texture2D(u_layerTex, uv)).r;
			  alpha = step(mix(0.0, 1.0, u_furOffset), alpha);

        gl_FragColor.rgb = _BaseColor.rgb;
			  gl_FragColor.a = 1.0 - u_furOffset * u_furOffset;
			  gl_FragColor.a += dot(viewDirection, normalDirection) - u_edgeFade;
			  gl_FragColor.a = max(0.0, gl_FragColor.a);
			  gl_FragColor.a *= alpha;
    }
  `
);

Logger.enable();
WebGLEngine.create({ canvas: "canvas", shaderLab }).then((engine) => {
  engine.canvas.resizeByClientSize();

  const scene = engine.sceneManager.activeScene;
  const rootEntity = scene.createRootEntity();

  // camera
  const cameraEntity = rootEntity.createChild("cameraNode");
  cameraEntity.transform.setPosition(0, 0, 5);
  cameraEntity.addComponent(Camera);
  cameraEntity.addComponent(OrbitControl);

  engine.resourceManager
    .load([
      {
        type: AssetType.Texture2D,
        url: "https://pic1.zhimg.com/80/v2-a0ad38493301ccb02b583fd1ba1723e4_1440w.webp"
      },
      {
        type: AssetType.Texture2D,
        url: "https://mdn.alipayobjects.com/huamei_dmxymu/afts/img/A*lMZtRrnIO48AAAAAAAAAAAAADuuHAQ/original"
      },
      {
        type: AssetType.GLTF,
        url: "https://gw.alipayobjects.com/os/OasisHub/267000040/9994/%25E5%25BD%2592%25E6%25A1%25A3.gltf"
      }
    ])
    .then((res) => {
      const layerTexture = res[0] as Texture2D;
      const flowTexture = res[1] as Texture2D;
      const glTF = res[2] as GLTFResource;
      const oriMaterial = glTF.materials![0] as PBRMaterial;

      // create sphere
      const entity = glTF.defaultSceneRoot.clone();
      rootEntity.addChild(entity);
      const renderer = entity.getComponentsIncludeChildren(MeshRenderer, [])[0];

      const material = new BaseMaterial(engine, Shader.find("fur-shader"));
      material.isTransparent = true;
      renderer.setMaterial(material);

      const shaderData = material.shaderData;
      const script = cameraEntity.addComponent(FurScript);
      script.furShaderData = shaderData;

      shaderData.setTexture("u_mainTex", oriMaterial.baseTexture);
      shaderData.setTexture("u_layerTex", layerTexture);
      shaderData.setTexture("u_flowTex", flowTexture);

      shaderData.setFloat("u_furLength", 1);
      shaderData.setVector3("u_gravity", new Vector3(0, -1, 0));
      shaderData.setFloat("u_gravityIntensity", 0.25);
      shaderData.setFloat("u_edgeFade", 0.4);
      shaderData.setVector2("u_uvScale", new Vector2(10, 10));

      const debugInfo = {
        layer: 10,
        uvScale: 10,
        u_furLength: 1,
        u_gravityIntensity: 0.25,
        u_edgeFade: 0.4
      };

      gui.add(debugInfo, "layer", 0, 40, 1).onChange((v) => {
        script.layer = v;
      });
      gui.add(debugInfo, "uvScale", 0, 40, 1).onChange((v) => {
        shaderData.getVector2("u_uvScale").set(v, v);
      });
      gui.add(debugInfo, "u_furLength", 0, 100, 0.01).onChange((v) => {
        shaderData.setFloat("u_furLength", v);
      });
      gui.add(debugInfo, "u_gravityIntensity", 0, 1, 0.01).onChange((v) => {
        shaderData.setFloat("u_gravityIntensity", v);
      });
      gui.add(debugInfo, "u_edgeFade", 0, 1, 0.01).onChange((v) => {
        shaderData.setFloat("u_edgeFade", v);
      });
      engine.run();
    });
});

class FurScript extends Script {
  furShaderData: ShaderData;
  layer = 10;
  onEndRender(camera: Camera): void {
    const step = 1 / this.layer;
    const oriCameraClearFlag = camera.clearFlags;
    camera.clearFlags = CameraClearFlags.None;
    for (let i = 0; i < this.layer; i++) {
      this.furShaderData.setFloat("u_furOffset", step * (i + 1));
      camera.render();
    }

    // revert
    this.furShaderData.setFloat("u_furOffset", 0);
    camera.clearFlags = oriCameraClearFlag;
  }
}
