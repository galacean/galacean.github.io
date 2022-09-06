/**
 * @title Cascaded Stable Shadow
 * @category Light
 */

import {
  AmbientLight,
  AssetType,
  BaseMaterial,
  Camera,
  Color,
  DirectLight,
  Engine,
  MeshRenderer,
  PBRMaterial,
  PrimitiveMesh,
  RenderFace,
  Script,
  Shader,
  ShadowCascadesMode,
  ShadowMode,
  ShadowResolution,
  Vector3,
  WebGLEngine,
  WebGLMode,
} from "oasis-engine";
import {OrbitControl} from "@oasis-engine-toolkit/controls";
import * as dat from "dat.gui";

const gui = new dat.GUI();
const engine = new WebGLEngine("canvas", {webGLMode: WebGLMode.WebGL2});
engine.canvas.resizeByClientSize();

const scene = engine.sceneManager.activeScene;
const rootEntity = scene.createRootEntity();

Shader.create(
  "shadow-map-visual",
  `
#include <common>
#include <common_vert>
#include <blendShape_input>
#include <uv_share>
#include <color_share>
#include <normal_share>
#include <worldpos_share>
#include <shadow_share>

#include <fog_share>
#include <shadow_vert_share>

void main() {

    #include <begin_position_vert>
    #include <begin_normal_vert>
    #include <blendShape_vert>
    #include <skinning_vert>
    #include <uv_vert>
    #include <color_vert>
    #include <normal_vert>
    #include <worldpos_vert>
    #include <position_vert>

    #include <shadow_vert>

    #include <fog_vert>

}`,
  `
#include <common>
#include <common_frag>

#include <uv_share>
#include <normal_share>
#include <color_share>
#include <worldpos_share>

#include <light_frag_define>
#include <shadow_frag_share>
#include <mobile_material_frag>

void main() {
    vec4 emission = u_emissiveColor;
    vec4 diffuse = u_baseColor;
    vec4 specular = u_specularColor;
    vec4 ambient = vec4(u_envMapLight.diffuse * u_envMapLight.diffuseIntensity, 1.0) * diffuse;

#ifdef CASCADED_SHADOW_MAP_COUNT
    int cascadeIndex = computeCascadeIndex(v_pos);
    if (cascadeIndex == 0) {
        diffuse = vec4(1.0, 1.0, 1.0, 1.0);
    } else if (cascadeIndex == 1) {
        diffuse = vec4(1.0, 0.0, 0.0, 1.0);
    } else if (cascadeIndex == 2) {
        diffuse = vec4(0.0, 1.0, 0.0, 1.0);
    } else if (cascadeIndex == 3) {
        diffuse = vec4(0.0, 0.0, 1.0, 1.0);
    }
#endif

    gl_FragColor = emission + ambient + diffuse + specular;
    gl_FragColor.a = diffuse.a;
}
`
);

class CSSMVisualMaterial extends BaseMaterial {
  constructor(engine: Engine) {
    super(engine, Shader.find("shadow-map-visual"));
    this.shaderData.enableMacro("O3_SHADOW_MAP_COUNT", "1");
    this.shaderData.enableMacro("O3_NEED_WORLDPOS");
  }
}

class Rotation extends Script {
  pause = true;
  private _time = 0;
  private _center = new Vector3();

  onUpdate(deltaTime: number) {
    if (!this.pause) {
      this._time += deltaTime / 1000;
      this.entity.transform.setPosition(10 * Math.cos(this._time), 10, 10 * Math.sin(this._time));
      this.entity.transform.lookAt(this._center);
    }
  }
}

// init camera
const cameraEntity = rootEntity.createChild("camera");
cameraEntity.transform.setPosition(0, 10, 50);
cameraEntity.transform.lookAt(new Vector3());
cameraEntity.addComponent(OrbitControl)
const camera = cameraEntity.addComponent(Camera);
camera.farClipPlane = 1000;

const light = rootEntity.createChild("light");
light.transform.setPosition(10, 10, 0);
light.transform.lookAt(new Vector3());
const rotation = light.addComponent(Rotation);
const directLight = light.addComponent(DirectLight);
directLight.shadowStrength = 1.0;
directLight.enableShadow = true;

// create box test entity
const cubeSize = 2.0;
const boxMesh = PrimitiveMesh.createCuboid(engine, cubeSize, cubeSize, cubeSize);
const boxMtl = new PBRMaterial(engine);
boxMtl.roughness = 0;
boxMtl.metallic = 1;
const boxRenderers: MeshRenderer[] = [];
for (let i = 0; i < 40; i++) {
  const boxEntity = rootEntity.createChild("BoxEntity");
  boxEntity.transform.setPosition(0, 2, i * 10 - 200);

  const boxRenderer = boxEntity.addComponent(MeshRenderer);
  boxRenderer.mesh = boxMesh;
  boxRenderer.setMaterial(boxMtl);
  boxRenderer.castShadows = true;
  // boxRenderer.receiveShadows = true;
  boxRenderers.push(boxRenderer);
}

const planeEntity = rootEntity.createChild("PlaneEntity");
const planeMtl = new PBRMaterial(engine);
planeMtl.baseColor = new Color(1.0, 0.2, 0, 1.0);
planeMtl.roughness = 0;
planeMtl.metallic = 0;
planeMtl.renderFace = RenderFace.Double;

const planeRenderer = planeEntity.addComponent(MeshRenderer);
planeRenderer.receiveShadows = true;
planeRenderer.mesh = PrimitiveMesh.createPlane(engine, 10, 400);
planeRenderer.setMaterial(planeMtl);

const visualMtl = new CSSMVisualMaterial(engine);

engine.resourceManager
  .load<AmbientLight>({
    type: AssetType.Env,
    url: "https://gw.alipayobjects.com/os/bmw-prod/89c54544-1184-45a1-b0f5-c0b17e5c3e68.bin"
  })
  .then((ambientLight) => {
    scene.ambientLight = ambientLight;
    scene.ambientLight.specularIntensity = scene.ambientLight.diffuseIntensity = 0.5;
    openDebug();
    engine.run();
  });

function openDebug() {
  const info = {
    rotation: false,
    debugMode: false,
    cascadeMode: ShadowCascadesMode.FourCascades,
    resolution: ShadowResolution.VeryHigh,
    shadowMode: ShadowMode.SoftLow,
    shadowCascadeSplitRatio: 0.95
  }

  gui.add(info, "rotation").onChange((v) => {
    rotation.pause = !v;
  });

  gui.add(info, "debugMode").onChange((v) => {
    if (v) {
      planeRenderer.setMaterial(visualMtl);
      for (let i = 0; i < boxRenderers.length; i++) {
        const boxRenderer = boxRenderers[i];
        boxRenderer.setMaterial(visualMtl);
      }
    } else {
      planeRenderer.setMaterial(planeMtl);
      for (let i = 0; i < boxRenderers.length; i++) {
        const boxRenderer = boxRenderers[i];
        boxRenderer.setMaterial(boxMtl);
      }
    }
  });

  gui.add(directLight, "shadowBias", 0, 10);
  gui.add(directLight, "shadowNormalBias", 0, 10);
  gui.add(directLight, "shadowStrength", 0, 1);
  gui.add(info, "shadowMode", {
    None: ShadowMode.None,
    Hard: ShadowMode.Hard,
    Soft: ShadowMode.SoftLow,
    VerySoft: ShadowMode.SoftHigh
  }).onChange((v) => {
    engine.settings.shadowMode = parseInt(v);
  });

  gui.add(info, "cascadeMode", {
    NoCascades: ShadowCascadesMode.NoCascades,
    TwoCascades: ShadowCascadesMode.TwoCascades,
    FourCascades: ShadowCascadesMode.FourCascades
  }).onChange((v) => {
    engine.settings.shadowCascades = parseInt(v);
  });

  gui.add(info, "resolution", {
    Low: ShadowResolution.Low,
    Medium: ShadowResolution.Medium,
    High: ShadowResolution.High,
    VeryHigh: ShadowResolution.VeryHigh
  }).onChange((v) => {
    engine.settings.shadowResolution = parseInt(v);
  });
  gui.add(info, "shadowCascadeSplitRatio").onChange((v) => {
    engine.settings.shadowCascadeSplitRatio = v;
  });
}
