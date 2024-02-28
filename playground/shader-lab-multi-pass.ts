/**
 * @title ShaderLab Multi Pass
 * @category Material
 */

import {
  AssetType,
  BaseMaterial,
  Camera,
  CameraClearFlags,
  Logger,
  MeshRenderer,
  PrimitiveMesh,
  Script,
  Shader,
  ShaderData,
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
    attribute vec3 NORMAL;
    attribute vec2 TEXCOORD_0;

    uniform mat4 renderer_MVPMat;

    uniform float u_furLength;
    uniform float u_furOffset;
    uniform vec4 u_uvTilingOffset;
    uniform vec3 u_gravity;
    uniform float u_gravityIntensity;


    varying vec2 v_uv;
    varying vec2 v_uv2;

    void main(){
      vec4 position = POSITION;
      vec3 direction = mix(NORMAL, u_gravity * u_gravityIntensity + NORMAL * (1.0 - u_gravityIntensity), u_furOffset);
      position.xyz += direction * u_furLength * u_furOffset;


      gl_Position = renderer_MVPMat * position;
  

      vec2 uvOffset = u_uvTilingOffset.zw * u_furOffset;
      v_uv = TEXCOORD_0 + uvOffset * vec2(1.0, 1.0) / u_uvTilingOffset.xy;
      v_uv2 = TEXCOORD_0 * u_uvTilingOffset.xy + uvOffset;
    }
`,
  `
    uniform sampler2D u_mainTex;
    uniform sampler2D u_layerTex;
    uniform float u_furOffset;


    varying vec2 v_uv;
    varying vec2 v_uv2;
    

    void main(){
			  vec4 baseColor = texture2D(u_mainTex, v_uv);
        float alpha2 = u_furOffset * u_furOffset;

			  float mask = texture2D(u_layerTex, v_uv2).r;
			  mask = step(alpha2, mask);

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

  engine.resourceManager
    .load([
      {
        type: AssetType.Texture2D,
        url: "https://mdn.alipayobjects.com/huamei_dmxymu/afts/img/A*R75iTZlbVfgAAAAAAAAAAAAADuuHAQ/original"
      },
      {
        type: AssetType.Texture2D,
        url: "https://mdn.alipayobjects.com/huamei_dmxymu/afts/img/A*t1s4T7h_1OQAAAAAAAAAAAAADuuHAQ/original"
      }
    ])
    .then((res) => {
      const layerTexture = res[0] as Texture2D;
      const baseTexture = res[1] as Texture2D;

      // create sphere
      const entity = rootEntity.createChild("sphere");
      const renderer = entity.addComponent(MeshRenderer);
      renderer.mesh = PrimitiveMesh.createSphere(engine, 0.5, 16);

      const material = new BaseMaterial(engine, Shader.find("fur-shader"));
      renderer.setMaterial(material);

      const shaderData = material.shaderData;
      const script = cameraEntity.addComponent(FurScript);
      script.material = material;

      shaderData.setTexture("u_mainTex", baseTexture);
      shaderData.setTexture("u_layerTex", layerTexture);

      shaderData.setFloat("u_furLength", 0.5);
      shaderData.setVector4("u_uvTilingOffset", new Vector4(5, 5, 0.5, 0.5));
      shaderData.setVector3("u_gravity", new Vector3(0, 0, 0));
      shaderData.setFloat("u_gravityIntensity", 0);

      const randomGravityScript = entity.addComponent(RandomGravityScript);
      randomGravityScript.shaderData = shaderData;

      const debugInfo = {
        layer: 40,
        u_furLength: 0.5,
        uvScale: 5,
        uvOffset: 0.5,
        enable: () => {
          randomGravityScript.enabled = !randomGravityScript.enabled;
          shaderData.setFloat("u_gravityIntensity", 0);
          randomGravityScript.progress = 0;
        }
      };

      gui.add(debugInfo, "layer", 1, 40, 1).onChange((v) => {
        script.layer = v;
      });
      gui.add(debugInfo, "u_furLength", 0, 1, 0.01).onChange((v) => {
        shaderData.setFloat("u_furLength", v);
      });
      gui.add(debugInfo, "uvScale", 1, 20, 1).onChange((v) => {
        const value = shaderData.getVector4("u_uvTilingOffset");
        value.x = value.y = v;
      });
      gui.add(debugInfo, "uvOffset", 0, 1, 0.01).onChange((v) => {
        const value = shaderData.getVector4("u_uvTilingOffset");
        value.z = value.w = v;
      });
      gui.add(debugInfo, "enable").name("pause/resume");
      engine.run();
    });
});

class FurScript extends Script {
  material: BaseMaterial;
  layer = 40;
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

class RandomGravityScript extends Script {
  shaderData: ShaderData;
  progress = 0;
  onUpdate(deltaTime: number) {
    const progress = 0.5 + Math.cos((this.progress = this.progress + deltaTime * 2)) / 2;
    this.shaderData.setFloat("u_gravityIntensity", progress);
  }
}
