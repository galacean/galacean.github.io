/**
 * @title Transparent Shadow
 * @category Light
 */
import {OrbitControl} from "@oasis-engine-toolkit/controls";
import {
  AmbientLight,
  AssetType,
  BackgroundMode,
  BaseMaterial,
  BlendMode,
  Camera,
  Color,
  DirectLight,
  Engine,
  Entity,
  GLTFResource,
  Layer,
  MeshRenderer,
  PBRMaterial,
  PrimitiveMesh,
  Quaternion,
  Renderer,
  Script,
  Shader,
  ShadowCascadesMode,
  ShadowMode,
  ShadowResolution,
  Vector3,
  WebGLEngine,
  WebGLMode
} from "oasis-engine";

Shader.create("transparent-shadow", `
#include <common_vert>
#include <blendShape_input>
#include <uv_share>
#include <fog_share>

void main() {

    #include <begin_position_vert>
    #include <blendShape_vert>
    #include <skinning_vert>
    #include <uv_vert>
    #include <position_vert>

    #include <fog_vert>
}
`, `
#include <common>
#include <uv_share>
#include <fog_share>
#include <shadow_frag_share>

uniform vec4 u_baseColor;
uniform float u_alphaCutoff;

void main() {
     shadowAttenuation = 1.0;
#ifdef OASIS_CALCULATE_SHADOWS
    #ifdef CASCADED_SHADOW_MAP
        shadowAttenuation *= sampleShadowMap();
    #endif
#endif

     vec4 baseColor = vec4(u_baseColor.rgb, saturate(1.0 - shadowAttenuation) * u_baseColor.a);

    #ifdef ALPHA_CUTOFF
        if( baseColor.a < u_alphaCutoff ) {
            discard;
        }
    #endif


    #ifndef OASIS_COLORSPACE_GAMMA
        baseColor = linearToGamma(baseColor);
    #endif

    gl_FragColor = baseColor;

    #include <fog_frag>
}
`)

class TransparentShadow extends BaseMaterial {
  /**
   * Base color.
   */
  get baseColor(): Color {
    return this.shaderData.getColor(TransparentShadow._baseColorProp);
  }

  set baseColor(value: Color) {
    const baseColor = this.shaderData.getColor(TransparentShadow._baseColorProp);
    if (value !== baseColor) {
      baseColor.copyFrom(value);
    }
  }

  constructor(engine: Engine) {
    super(engine, Shader.find("transparent-shadow"));
    this.isTransparent = true;
    this.blendMode = BlendMode.Additive;
    this.shaderData.setColor(TransparentShadow._baseColorProp, new Color(0, 0, 0, 1));
  }
}

const engine = new WebGLEngine("canvas", {webGLMode: WebGLMode.WebGL1});
engine.canvas.resizeByClientSize();
engine.settings.shadowResolution = ShadowResolution.VeryHigh;
engine.settings.shadowCascades = ShadowCascadesMode.FourCascades;
engine.settings.shadowMode = ShadowMode.SoftLow;
const scene = engine.sceneManager.activeScene;

const rootEntity = engine.sceneManager.activeScene.createRootEntity();

const cameraEntity = rootEntity.createChild("camera");
cameraEntity.transform.setPosition(0, 1.5, 1);
cameraEntity.addComponent(OrbitControl).target.set(0, 1.5, 0);
const camera = cameraEntity.addComponent(Camera);
camera.enableFrustumCulling = false;
camera.farClipPlane = 7;
scene.ambientLight.diffuseSolidColor.set(1, 1, 1, 1);

function addPlane(rootEntity: Entity, size: Vector3, position: Vector3, rotation: Quaternion): Entity {
  const mtl = new PBRMaterial(rootEntity.engine);
  mtl.baseColor.set(0.2179807202597362, 0.2939682161541871, 0.31177952549087604, 1);
  mtl.roughness = 0.5;
  mtl.metallic = 0.0;
  const planeEntity = rootEntity.createChild();
  planeEntity.layer = Layer.Layer1;

  const renderer = planeEntity.addComponent(MeshRenderer);
  renderer.receiveShadows = true;
  renderer.mesh = PrimitiveMesh.createCuboid(rootEntity.engine, size.x, size.y, size.z);
  renderer.setMaterial(mtl);
  planeEntity.transform.position = position;
  planeEntity.transform.rotationQuaternion = rotation;

  return planeEntity;
}

// addPlane(rootEntity, new Vector3(30, 0.1, 30), new Vector3, new Quaternion);

class Rotation extends Script {
  pause = false;
  private _time = 0;

  onUpdate(deltaTime: number) {
    if (!this.pause) {
      this._time += deltaTime / 1000;
      this.entity.transform.setRotation(0, this._time * 50,0);
    }
  }
}

// init direct light
const light = rootEntity.createChild("light");
light.transform.setPosition(5, 10, 5);
light.transform.lookAt(new Vector3(), new Vector3(1, 0, 0));
const directLight = light.addComponent(DirectLight);
directLight.intensity = 1;
directLight.enableShadow = true;
directLight.shadowStrength = 1;
directLight.shadowBias = 15;

engine.resourceManager
  //@ts-ignore
  .load<[GLTFResource, AmbientLight, Texture2D]>([
    {url: "https://gw.alipayobjects.com/os/OasisHub/694000084/4848/YouthFemaleNormal_Clothes_Default.gltf",
    type: AssetType.Prefab},
    {url: "https://gw.alipayobjects.com/os/bmw-prod/89c54544-1184-45a1-b0f5-c0b17e5c3e68.bin",
    type: AssetType.Env},
    {url: "http://30.46.128.39:8000/sanmiguel-cover.png",
    type: AssetType.Texture2D},
  ])
  .then(([gltf, ambientLight, background]) => {
    gltf.defaultSceneRoot.addComponent(Rotation);
    rootEntity.addChild(gltf.defaultSceneRoot);
    const renderers: Renderer[] = []
    gltf.defaultSceneRoot.getComponentsIncludeChildren(Renderer, renderers);
    for (let i = 0; i < renderers.length; i++) {
      const renderer = renderers[i];
      renderer.castShadows = true;
      renderer.receiveShadows = true;
    }

    scene.background.mode = BackgroundMode.Texture;
    scene.background.texture = background;

    scene.ambientLight = ambientLight;
    engine.run();
  });
