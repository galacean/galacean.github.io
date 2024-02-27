/**
 * @title ShaderLab Multi Pass
 * @category Material
 */

import {
  AmbientLight,
  AssetType,
  BaseMaterial,
  Camera,
  CameraClearFlags,
  DirectLight,
  GLTFResource,
  Logger,
  MeshRenderer,
  PBRMaterial,
  PrimitiveMesh,
  Script,
  Shader,
  Texture2D,
  Vector3,
  Vector4,
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
    uniform vec4 u_uvTilingOffset;


    varying vec2 v_uv;
    varying vec2 v_uv2;
    varying vec3 v_normal;
    varying vec3 v_pos;

    void main(){
      vec4 position = POSITION;
      vec3 direction = mix(NORMAL, u_gravity * u_gravityIntensity + NORMAL * (1.0 - u_gravityIntensity), u_furOffset);
      position.xyz += direction * u_furLength * u_furOffset;
      gl_Position = renderer_MVPMat * position;
  

      v_normal = normalize( mat3(renderer_NormalMat) * NORMAL );
      vec4 temp_pos = renderer_ModelMat * position;
      v_pos = temp_pos.xyz / temp_pos.w;

      vec2 uvOffset = u_uvTilingOffset.zw * u_furOffset;
      v_uv = TEXCOORD_0 + uvOffset * vec2(1.0, 1.0) / u_uvTilingOffset.xy;
      v_uv2 = TEXCOORD_0 * u_uvTilingOffset.xy + uvOffset;
    }
`,
  `
    uniform vec3 camera_Position;

    uniform sampler2D u_mainTex;
    uniform sampler2D u_layerTex;
    uniform float u_furOffset;


    varying vec2 v_uv;
    varying vec2 v_uv2;
    varying vec3 v_normal;
    varying vec3 v_pos;
    

    void main(){
			  vec3 normalDirection = normalize(v_normal);
			  vec3 viewDirection =  normalize(camera_Position - v_pos);
			  vec4 baseColor = texture2D(u_mainTex, v_uv);
        float alpha2 = u_furOffset * u_furOffset;

			  float mask = texture2D(u_layerTex, v_uv2).r;
			  mask = step(mix(0.0, 1.0, alpha2), mask);

        gl_FragColor.rgb = baseColor.rgb;

        gl_FragColor.a = 1.0 - alpha2;
        gl_FragColor.a *= mask;
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

  // direct light
  const directLightNode = rootEntity.createChild("dir_light");
  directLightNode.addComponent(DirectLight);
  directLightNode.transform.setRotation(30, 30, 0);

  engine.resourceManager
    .load([
      {
        type: AssetType.Texture2D,
        url: "https://pic1.zhimg.com/80/v2-a0ad38493301ccb02b583fd1ba1723e4_1440w.webp"
      },
      {
        type: AssetType.GLTF,
        url: "https://gw.alipayobjects.com/os/OasisHub/267000040/9994/%25E5%25BD%2592%25E6%25A1%25A3.gltf"
      },
      {
        type: AssetType.Env,
        url: "https://gw.alipayobjects.com/os/bmw-prod/f369110c-0e33-47eb-8296-756e9c80f254.bin"
      }
    ])
    .then((res) => {
      const layerTexture = res[0] as Texture2D;
      const glTF = res[1] as GLTFResource;
      const oriMaterial = glTF.materials![0] as PBRMaterial;

      scene.ambientLight = res[2] as AmbientLight;
      // const entity = glTF.defaultSceneRoot.clone();
      // rootEntity.addChild(entity);
      // const renderer = entity.getComponentsIncludeChildren(MeshRenderer, [])[0];

      // create sphere
      const entity = rootEntity.createChild("sphere");
      const renderer = entity.addComponent(MeshRenderer);
      renderer.mesh = PrimitiveMesh.createSphere(engine, 1, 32);

      const material = new BaseMaterial(engine, Shader.find("fur-shader"));
      renderer.setMaterial(material);

      const shaderData = material.shaderData;
      const script = cameraEntity.addComponent(FurScript);
      script.material = material;

      shaderData.setTexture("u_mainTex", oriMaterial.baseTexture);
      shaderData.setTexture("u_layerTex", layerTexture);

      shaderData.setFloat("u_furLength", 0.5);
      shaderData.setVector3("u_gravity", new Vector3(0, -1, 0));
      shaderData.setFloat("u_gravityIntensity", 0.25);
      shaderData.setVector4("u_uvTilingOffset", new Vector4(5, 5, 0.2, 0.2));

      const debugInfo = {
        layer: 20,
        u_furLength: 0.5,
        u_gravityIntensity: 0.25,
        uvScale: 5,
        uvOffset: 0.2
      };

      gui.add(debugInfo, "layer", 0, 40, 1).onChange((v) => {
        script.layer = v;
      });
      gui.add(debugInfo, "u_furLength", 0, 10, 0.01).onChange((v) => {
        shaderData.setFloat("u_furLength", v);
      });
      gui.add(debugInfo, "u_gravityIntensity", 0, 1, 0.01).onChange((v) => {
        shaderData.setFloat("u_gravityIntensity", v);
      });
      gui.add(debugInfo, "uvScale", 0, 50, 1).onChange((v) => {
        const value = shaderData.getVector4("u_uvTilingOffset");
        value.x = value.y = v;
      });
      gui.add(debugInfo, "uvOffset", 0, 1, 0.01).onChange((v) => {
        const value = shaderData.getVector4("u_uvTilingOffset");
        value.z = value.w = v;
      });
      engine.run();
    });
});

class FurScript extends Script {
  material: BaseMaterial;
  layer = 20;
  onEndRender(camera: Camera): void {
    const shaderData = this.material.shaderData;
    const step = 1 / this.layer;
    const oriCameraClearFlag = camera.clearFlags;
    camera.clearFlags = CameraClearFlags.None;
    this.material.isTransparent = true;
    for (let i = 1; i < this.layer; i++) {
      shaderData.setFloat("u_furOffset", step * i);
      camera.render();
    }

    // revert
    shaderData.setFloat("u_furOffset", 0);
    this.material.isTransparent = false;
    camera.clearFlags = oriCameraClearFlag;
  }
}
