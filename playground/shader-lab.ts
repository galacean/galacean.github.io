/**
 * @title Shader Lab
 * @category Material
 */
import {
  Color,
  Material,
  Shader,
  ShaderProperty,
  Vector3,
  Animator,
  BlinnPhongMaterial,
  Camera,
  DirectLight,
  GLTFResource,
  Logger,
  MeshRenderer,
  PrimitiveMesh,
  WebGLEngine,
} from '@galacean/engine';
import { OrbitControl } from '@galacean/engine-toolkit-controls';
import { ShaderLab } from '@galacean/engine-shader-lab';

// Create ShaderLab
const shaderLab = new ShaderLab();

Logger.enable();
WebGLEngine.create({ canvas: 'canvas', shaderLab }).then((engine) => {
  engine.canvas.resizeByClientSize();
  const scene = engine.sceneManager.activeScene;
  const rootEntity = scene.createRootEntity();

  const cameraEntity = rootEntity.createChild('camera_node');
  cameraEntity.transform.setPosition(0, 1, 5);
  cameraEntity.addComponent(Camera);
  cameraEntity.addComponent(OrbitControl).target = new Vector3(0, 1, 0);

  const lightEntity = rootEntity.createChild('light_node');
  lightEntity.addComponent(DirectLight);
  lightEntity.transform.setPosition(-10, 10, 10);
  lightEntity.transform.lookAt(new Vector3(0, 0, 0));

  const planeEntity = rootEntity.createChild('plane_node');
  const renderer = planeEntity.addComponent(MeshRenderer);
  renderer.mesh = PrimitiveMesh.createPlane(engine, 10, 10);
  const planeMaterial = new BlinnPhongMaterial(engine);
  planeMaterial.baseColor.set(1, 1.0, 0, 1.0);
  renderer.setMaterial(planeMaterial);

  engine.resourceManager
    .load<GLTFResource>(
      'https://gw.alipayobjects.com/os/bmw-prod/5e3c1e4e-496e-45f8-8e05-f89f2bd5e4a4.glb'
    )
    .then((asset) => {
      const { defaultSceneRoot } = asset;
      rootEntity.addChild(defaultSceneRoot);

      const animator = defaultSceneRoot.getComponent(Animator);
      animator.play(asset.animations[0].name);

      const lightDirection = lightEntity.transform.worldForward;

      const renderers = new Array<MeshRenderer>();
      defaultSceneRoot.getComponentsIncludeChildren(MeshRenderer, renderers);

      for (let i = 0, n = renderers.length; i < n; i++) {
        const material = renderers[i].getMaterial();
        PlanarShadowShaderFactory.replaceShader(material);
        PlanarShadowShaderFactory.setShadowFalloff(material, 0.2);
        PlanarShadowShaderFactory.setPlanarHeight(material, 0.01);
        PlanarShadowShaderFactory.setLightDirection(material, lightDirection);
        PlanarShadowShaderFactory.setShadowColor(
          material,
          new Color(0, 0, 0, 1.0)
        );
      }
    });

  engine.run();
});

class PlanarShadowShaderFactory {
  private static _lightDirProp = ShaderProperty.getByName('u_lightDir');
  private static _planarHeightProp = ShaderProperty.getByName('u_planarHeight');
  private static _shadowColorProp = ShaderProperty.getByName(
    'u_planarShadowColor'
  );
  private static _shadowFalloffProp = ShaderProperty.getByName(
    'u_planarShadowFalloff'
  );

  /**
   * Replace material Shader and initialization。
   * @param material - Material to replace and initialization。
   */
  static replaceShader(material: Material) {
    material.shader = Shader.find('PlanarShadow');

    const shaderData = material.shaderData;
    shaderData.setFloat(PlanarShadowShaderFactory._shadowFalloffProp, 0);
    shaderData.setColor(
      PlanarShadowShaderFactory._shadowColorProp,
      new Color(1.0, 1.0, 1.0, 1.0)
    );
    shaderData.setVector3(
      PlanarShadowShaderFactory._lightDirProp,
      new Vector3(0, 0, 0)
    );
    shaderData.setFloat(PlanarShadowShaderFactory._planarHeightProp, 0);
  }

  /**
   * Set planar height.
   */
  static setPlanarHeight(material: Material, value: number) {
    material.shaderData.setFloat(
      PlanarShadowShaderFactory._planarHeightProp,
      value
    );
  }

  /**
   * Set light direction.
   */
  static setLightDirection(material: Material, value: Vector3) {
    const lightDir = material.shaderData.getVector3(
      PlanarShadowShaderFactory._lightDirProp
    );
    if (value !== lightDir) {
      lightDir.copyFrom(value.normalize());
    } else {
      value.normalize();
    }
  }

  /**
   * Set shadow color
   */
  static setShadowColor(material: Material, value: Color) {
    const shadowColor = material.shaderData.getColor(
      PlanarShadowShaderFactory._shadowColorProp
    );
    if (value !== shadowColor) {
      shadowColor.copyFrom(value);
    }
  }

  /**
   * Set Shadow falloff coefficient
   */
  static setShadowFalloff(material: Material, value: number) {
    material.shaderData.setFloat(
      PlanarShadowShaderFactory._shadowFalloffProp,
      value
    );
  }
}

Shader.create(`Shader "PlanarShadow" {

  SubShader "Default" {

    UsePass "pbr/Default/Forward"

    Pass "planarShadow" {
      // render states
      DepthState {
        WriteEnabled = true;
      }

      BlendState blendState {
        Enabled = true;
        SourceColorBlendFactor = BlendFactor.SourceAlpha;
        DestinationColorBlendFactor = BlendFactor.OneMinusSourceAlpha;
        SourceAlphaBlendFactor = BlendFactor.One;
        DestinationAlphaBlendFactor = BlendFactor.OneMinusSourceAlpha;
      }

      StencilState {
        Enabled = true;
        ReferenceValue = 0;
        CompareFunctionFront = CompareFunction.Equal;
        CompareFunctionBack = CompareFunction.Equal;
        FailOperationFront = StencilOperation.Keep;
        FailOperationBack = StencilOperation.Keep;
        ZFailOperationFront = StencilOperation.Keep;
        ZFailOperationBack = StencilOperation.Keep;
        PassOperationFront = StencilOperation.IncrementWrap;
        PassOperationBack = StencilOperation.IncrementWrap;
      }

      BlendState = blendState;

      RenderQueueType = RenderQueueType.Transparent;

      vec3 u_lightDir;
      float u_planarHeight;
      vec4 u_planarShadowColor;
      float u_planarShadowFalloff;

      sampler2D renderer_JointSampler;
      float renderer_JointCount;

      mat4 renderer_ModelMat;
      mat4 camera_VPMat;

      #ifdef RENDERER_HAS_SKIN

        #ifdef RENDERER_USE_JOINT_TEXTURE
          mat4 getJointMatrix(sampler2D smp, float index) {
              float base = index / renderer_JointCount;
              float hf = 0.5 / renderer_JointCount;
              float v = base + hf;

              vec4 m0 = texture2D(smp, vec2(0.125, v ));
              vec4 m1 = texture2D(smp, vec2(0.375, v ));
              vec4 m2 = texture2D(smp, vec2(0.625, v ));
              vec4 m3 = texture2D(smp, vec2(0.875, v ));

              return mat4(m0, m1, m2, m3);
          }
        #elif defined(RENDERER_BLENDSHAPE_COUNT)
            mat4 renderer_JointMatrix[ RENDERER_JOINTS_NUM ];
        #endif
      #endif

      vec3 ShadowProjectPos(vec4 vertPos) {
        vec3 shadowPos;

        // get the world space coordinates of the vertex

        vec3 worldPos = (renderer_ModelMat * vertPos).xyz;
        
        // world space coordinates of the shadow (the part below the ground is unchanged)
        shadowPos.y = min(worldPos.y , u_planarHeight);
        shadowPos.xz = worldPos.xz - u_lightDir.xz * max(0.0, worldPos.y - u_planarHeight) / u_lightDir.y;

        return shadowPos;
      }

      struct a2v {
        vec4 POSITION;
        vec4 JOINTS_0; 
        vec4 WEIGHTS_0;
      }

      struct v2f {
        vec4 color;
      }

      v2f vert(a2v v) {
        v2f o;

        vec4 position = vec4(v.POSITION.xyz, 1.0 );
        #ifdef RENDERER_HAS_SKIN
            #ifdef RENDERER_USE_JOINT_TEXTURE
                mat4 skinMatrix =
                    v.WEIGHTS_0.x * getJointMatrix(renderer_JointSampler, v.JOINTS_0.x ) +
                    v.WEIGHTS_0.y * getJointMatrix(renderer_JointSampler, v.JOINTS_0.y ) +
                    v.WEIGHTS_0.z * getJointMatrix(renderer_JointSampler, v.JOINTS_0.z ) +
                    v.WEIGHTS_0.w * getJointMatrix(renderer_JointSampler, v.JOINTS_0.w );
            #else
                mat4 skinMatrix =
                    v.WEIGHTS_0.x * renderer_JointMatrix[ int( v.JOINTS_0.x ) ] +
                    v.WEIGHTS_0.y * renderer_JointMatrix[ int( v.JOINTS_0.y ) ] +
                    v.WEIGHTS_0.z * renderer_JointMatrix[ int( v.JOINTS_0.z ) ] +
                    v.WEIGHTS_0.w * renderer_JointMatrix[ int( v.JOINTS_0.w ) ];
            #endif
            position = skinMatrix * position;
        #endif

        // get the shadow's world space coordinates
        vec3 shadowPos = ShadowProjectPos(position);

        // convert to clip space
        gl_Position = camera_VPMat * vec4(shadowPos, 1.0);

        // get the world coordinates of the center point
        vec3 center = vec3(renderer_ModelMat[3].x, u_planarHeight, renderer_ModelMat[3].z);
        // calculate shadow falloff
        float falloff = 0.5 - clamp(distance(shadowPos , center) * u_planarShadowFalloff, 0.0, 1.0);

        // shadow color
        o.color = u_planarShadowColor;
        o.color.a *= falloff;
      }
      
      VertexShader = vert;
      FragmentShader = frag;

      void frag(v2f i) {
        gl_FragColor = i.color;
      }
    }
  }
}
`);
