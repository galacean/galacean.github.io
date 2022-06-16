/**
 * @title Planar Shadow
 * @category Animation
 */
import {OrbitControl} from "@oasis-engine/controls";
import {
  Animator,
  BaseMaterial,
  BlendFactor,
  BlinnPhongMaterial,
  Camera,
  Color,
  CompareFunction,
  DirectLight,
  Engine,
  GLTFResource,
  Logger,
  MeshRenderer,
  PrimitiveMesh,
  Shader,
  SkinnedMeshRenderer,
  StencilOperation,
  SystemInfo,
  Vector3,
  Vector4,
  WebGLEngine
} from "oasis-engine";
import * as dat from "dat.gui";

class PlanarShadow extends BaseMaterial {
  private static _lightProp = Shader.getPropertyByName("u_lightDirAndHeight");
  private static _shadowColorProp = Shader.getPropertyByName("u_planarShadowColor");
  private static _shadowFalloffProp = Shader.getPropertyByName("u_planarShadowFalloff");

  setLightDirAndHeight(x: number, y: number, z: number, h: number) {
    const lightProp = this.shaderData.getVector4(PlanarShadow._lightProp);
    lightProp.setValue(x, y, z, h);
  }

  get shadowColor(): Color {
    return this.shaderData.getColor(PlanarShadow._shadowColorProp);
  }

  set shadowColor(value: Color) {
    const shadowColor = this.shaderData.getColor(PlanarShadow._shadowColorProp);
    if (value !== shadowColor) {
      value.cloneTo(shadowColor);
    }
  }

  get shadowFalloff(): number {
    return this.shaderData.getFloat(PlanarShadow._shadowFalloffProp);
  }

  set shadowFalloff(value: number) {
    this.shaderData.setFloat(PlanarShadow._shadowFalloffProp, value);
  }

  constructor(engine: Engine) {
    super(engine, Shader.find("planar-shadow"));

    this.isTransparent = true;
    this.renderState.stencilState.enabled = true;
    this.renderState.stencilState.referenceValue = 0;
    this.renderState.stencilState.compareFunctionFront = CompareFunction.Equal;
    this.renderState.stencilState.compareFunctionBack = CompareFunction.Equal;
    this.renderState.stencilState.failOperationFront = StencilOperation.Keep;
    this.renderState.stencilState.failOperationBack = StencilOperation.Keep;
    this.renderState.stencilState.zFailOperationFront = StencilOperation.Keep;
    this.renderState.stencilState.zFailOperationBack = StencilOperation.Keep;
    this.renderState.stencilState.passOperationFront = StencilOperation.IncrementWrap;
    this.renderState.stencilState.passOperationBack = StencilOperation.IncrementWrap;
    this.renderState.blendState.targetBlendState.sourceAlphaBlendFactor = BlendFactor.OneMinusSourceAlpha;
    this.renderState.blendState.targetBlendState.destinationAlphaBlendFactor = BlendFactor.One;

    const shaderData = this.shaderData;
    shaderData.setFloat(PlanarShadow._shadowFalloffProp, 0);
    shaderData.setColor(PlanarShadow._shadowColorProp, new Color(1.0, 1.0, 1.0, 1.0));
    shaderData.setVector4(PlanarShadow._lightProp, new Vector4(0, 0, 0, 0));
  }
}

const gui = new dat.GUI();

Logger.enable();
const engine = new WebGLEngine("canvas");
engine.canvas.width = window.innerWidth * SystemInfo.devicePixelRatio;
engine.canvas.height = window.innerHeight * SystemInfo.devicePixelRatio;
const scene = engine.sceneManager.activeScene;
const rootEntity = scene.createRootEntity();

// camera
const cameraEntity = rootEntity.createChild("camera_node");
cameraEntity.transform.position = new Vector3(0, 1, 5);
cameraEntity.addComponent(Camera);
cameraEntity.addComponent(OrbitControl).target = new Vector3(0, 1, 0);

const lightNode = rootEntity.createChild("light_node");
lightNode.addComponent(DirectLight);
lightNode.transform.setPosition(-10, 10, 10);
lightNode.transform.lookAt(new Vector3(0, 0, 0));

const planeNode = rootEntity.createChild("plane_node");
const renderer = planeNode.addComponent(MeshRenderer);
renderer.mesh = PrimitiveMesh.createPlane(engine, 10, 10);
const planeMat = new BlinnPhongMaterial(engine);
planeMat.baseColor.setValue(1, 1.0, 0, 1.0);
renderer.setMaterial(planeMat);

Shader.create(
  "planar-shadow",
  `
    attribute vec4 POSITION;
    varying vec4 color;

    uniform vec4 u_lightDirAndHeight;
    uniform vec4 u_planarShadowColor;
    uniform float u_planarShadowFalloff;

    uniform mat4 u_modelMat;
    uniform mat4 u_VPMat;

    #ifdef O3_HAS_SKIN
      attribute vec4 JOINTS_0;
      attribute vec4 WEIGHTS_0;

      #ifdef O3_USE_JOINT_TEXTURE
        uniform sampler2D u_jointSampler;
        uniform float u_jointCount;
        mat4 getJointMatrix(sampler2D smp, float index) {
            float base = index / u_jointCount;
            float hf = 0.5 / u_jointCount;
            float v = base + hf;

            vec4 m0 = texture2D(smp, vec2(0.125, v ));
            vec4 m1 = texture2D(smp, vec2(0.375, v ));
            vec4 m2 = texture2D(smp, vec2(0.625, v ));
            vec4 m3 = texture2D(smp, vec2(0.875, v ));

            return mat4(m0, m1, m2, m3);
        }
      #else
          uniform mat4 u_jointMatrix[ O3_JOINTS_NUM ];
      #endif
    #endif

    vec3 ShadowProjectPos(vec4 vertPos) {
      vec3 shadowPos;

      //得到顶点的世界空间坐标
      vec3 worldPos = (u_modelMat * vertPos).xyz;

      //灯光方向
      float lightHeight = u_lightDirAndHeight.w;
      vec3 lightDir = normalize(u_lightDirAndHeight.xyz);

      //阴影的世界空间坐标（低于地面的部分不做改变）
      shadowPos.y = min(worldPos.y , lightHeight);
      shadowPos.xz = worldPos.xz - lightDir.xz * max(0.0, worldPos.y - lightHeight) / lightDir.y;

      return shadowPos;
    }

    void main() {
     vec4 position = vec4(POSITION.xyz, 1.0 );
      #ifdef O3_HAS_SKIN
          #ifdef O3_USE_JOINT_TEXTURE
              mat4 skinMatrix =
                  WEIGHTS_0.x * getJointMatrix(u_jointSampler, JOINTS_0.x ) +
                  WEIGHTS_0.y * getJointMatrix(u_jointSampler, JOINTS_0.y ) +
                  WEIGHTS_0.z * getJointMatrix(u_jointSampler, JOINTS_0.z ) +
                  WEIGHTS_0.w * getJointMatrix(u_jointSampler, JOINTS_0.w );
          #else
              mat4 skinMatrix =
                  WEIGHTS_0.x * u_jointMatrix[ int( JOINTS_0.x ) ] +
                  WEIGHTS_0.y * u_jointMatrix[ int( JOINTS_0.y ) ] +
                  WEIGHTS_0.z * u_jointMatrix[ int( JOINTS_0.z ) ] +
                  WEIGHTS_0.w * u_jointMatrix[ int( JOINTS_0.w ) ];
          #endif
          position = skinMatrix * position;
      #endif

      //得到阴影的世界空间坐标
      vec3 shadowPos = ShadowProjectPos(position);

      //转换到裁切空间
      gl_Position = u_VPMat * vec4(shadowPos, 1.0);

      //得到中心点世界坐标
      vec3 center = vec3(u_modelMat[3].x , u_lightDirAndHeight.w , u_modelMat[3].z);
      //计算阴影衰减
      float falloff = 0.5 - clamp(distance(shadowPos , center) * u_planarShadowFalloff, 0.0, 1.0);

      //阴影颜色
      color = u_planarShadowColor;
      color.a *= falloff;
    }
    `,
  `
    varying vec4 color;
    void main() {
       gl_FragColor = color;
    }
    `
);

engine.resourceManager
  .load<GLTFResource>("https://gw.alipayobjects.com/os/bmw-prod/5e3c1e4e-496e-45f8-8e05-f89f2bd5e4a4.glb")
  .then((asset) => {
    const {defaultSceneRoot} = asset;
    rootEntity.addChild(defaultSceneRoot);
    const animator = defaultSceneRoot.getComponent(Animator);
    const animationNames = animator.animatorController.layers[0].stateMachine.states
      .map((state) => state.name)
      .filter((name) => !name.includes("pose"));

    animator.play(animationNames[0]);

    const debugInfo = {
      animation: animationNames[0],
      speed: 1
    };

    gui.add(debugInfo, "animation", animationNames).onChange((v) => {
      animator.play(v);
    });

    gui.add(debugInfo, "speed", -1, 1).onChange((v) => {
      animator.speed = v
    });

    const shadowMaterial = new PlanarShadow(engine);
    const lightDir = new Vector3();
    lightNode.transform.getWorldForward(lightDir);
    shadowMaterial.shadowFalloff = 0.2;
    shadowMaterial.shadowColor = new Color(0, 0, 0, 1.0);
    shadowMaterial.setLightDirAndHeight(lightDir.x, lightDir.y, lightDir.z, 0.01);
    const renderers: SkinnedMeshRenderer[] = [];
    defaultSceneRoot.getComponentsIncludeChildren(SkinnedMeshRenderer, renderers);
    for (let i = 0, n = renderers.length; i < n; i++) {
      const skinRenderer = renderers[i];
      const shadowRenderer = rootEntity.addComponent(SkinnedMeshRenderer);
      shadowRenderer.mesh = skinRenderer.mesh;
      shadowRenderer.skin = skinRenderer.skin;
      shadowRenderer.setMaterial(shadowMaterial);
    }
  });

engine.run();
