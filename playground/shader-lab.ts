/**
 * @title Shader Lab
 * @category Material
 */
import { OrbitControl } from '@galacean/engine-toolkit-controls';
import * as dat from 'dat.gui';
import {
  AssetType,
  Camera,
  Color,
  Engine,
  Material,
  MeshRenderer,
  PrimitiveMesh,
  Shader,
  Texture2D,
  Vector3,
  WebGLEngine,
} from '@galacean/engine';
import { ShaderLab } from '@galacean/engine-shaderlab';

const gui = new dat.GUI();
const shaderLab = new ShaderLab();
// create engine
WebGLEngine.create({ canvas: 'canvas', shaderLab }).then((engine) => {
  engine.canvas.resizeByClientSize();

  const scene = engine.sceneManager.activeScene;
  const rootEntity = scene.createRootEntity();

  // create camera
  const cameraEntity = rootEntity.createChild('camera_entity');
  cameraEntity.transform.position = new Vector3(0, 0, 15);
  cameraEntity.addComponent(Camera);
  const orbitControl = cameraEntity.addComponent(OrbitControl);
  orbitControl.minDistance = 15;
  orbitControl.maxDistance = 15;

  // 自定义材质
  const shaderSource = `Shader "Water22" {
    SubShader "water22" {
      Tags { ReplacementTag = "Opaque",PipelineStage = "test" } 
  
      Pass "default" {
        Tags { PipelineStage = "Forward"}
  
        struct a2v {
         vec4 POSITION;
         vec2 TEXCOORD_0; 
        }
  
        struct v2f {
         vec2 v_uv;
         vec3 v_position;
        }
  
        mat4 u_MVPMat;
        sampler2D u_baseTexture;
        vec4 u_color;
        vec4 u_fogColor;
        float u_fogDensity;
        
        VertexShader = vert;
        FragmentShader = frag;
  
        vec4 linearToGamma(vec4 linearIn) {
            return vec4(pow(linearIn.rgb, vec3(1.0 / 2.2)), linearIn.a);
      }
  
        v2f vert(a2v v) {
          v2f o;
  
          o.v_uv = v.TEXCOORD_0;
          vec4 tmp = u_MVPMat * POSITION;
          o.v_position = tmp.xyz;
          gl_Position = u_MVPMat * v.POSITION;
          return o;
        }
  
        void frag(v2f i) {
          vec4 color = texture2D(u_baseTexture, i.v_uv) * u_color;
          float fogDistance = length(i.v_position);
          float fogAmount = 1.0 - exp2(-u_fogDensity * u_fogDensity * fogDistance * fogDistance * 1.442695);
          fogAmount = clamp(fogAmount, 0.0, 1.0); 
          gl_FragColor = mix(color, u_fogColor, fogAmount); 
    
          #ifndef OASIS_COLORSPACE_GAMMA
            gl_FragColor = linearToGamma(gl_FragColor);
          #endif
        }
      }
    }
  }
  `;

  // 初始化 shader
  Shader.create(shaderSource);

  class ShaderMaterial extends Material {
    constructor(engine: Engine) {
      super(engine, Shader.find('customWater'));

      this.shaderData.setFloat('u_sea_height', 0.6);
      this.shaderData.setFloat('u_water_scale', 0.2);
      this.shaderData.setFloat('u_water_speed', 3.5);
      this.shaderData.setColor('u_sea_base', new Color(0.1, 0.2, 0.22));
      this.shaderData.setColor('u_water_color', new Color(0.8, 0.9, 0.6));
    }
  }
  const material = new ShaderMaterial(engine);

  // 创建球体形的海面
  const sphereEntity = rootEntity.createChild('sphere');
  const renderer = sphereEntity.addComponent(MeshRenderer);
  renderer.mesh = PrimitiveMesh.createSphere(engine, 3, 50);
  renderer.setMaterial(material);

  // 加载噪声纹理
  engine.resourceManager
    .load({
      type: AssetType.Texture2D,
      url: 'https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*AC4IQZ6mfCIAAAAAAAAAAAAAARQnAQ',
    })
    .then((texture: Texture2D) => {
      material.shaderData.setTexture('u_texture', texture);
      engine.run();
    });

  // debug
  function openDebug() {
    const shaderData = material.shaderData;
    const baseColor = shaderData.getColor('u_sea_base');
    const waterColor = shaderData.getColor('u_water_color');
    const debug = {
      sea_height: shaderData.getFloat('u_sea_height'),
      water_scale: shaderData.getFloat('u_water_scale'),
      water_speed: shaderData.getFloat('u_water_speed'),
      sea_base: [baseColor.r * 255, baseColor.g * 255, baseColor.b * 255],
      water_color: [waterColor.r * 255, waterColor.g * 255, waterColor.b * 255],
    };

    gui.add(debug, 'sea_height', 0, 3).onChange((v) => {
      shaderData.setFloat('u_sea_height', v);
    });
    gui.add(debug, 'water_scale', 0, 4).onChange((v) => {
      shaderData.setFloat('u_water_scale', v);
    });
    gui.add(debug, 'water_speed', 0, 4).onChange((v) => {
      shaderData.setFloat('u_water_speed', v);
    });
    gui.addColor(debug, 'sea_base').onChange((v) => {
      baseColor.r = v[0] / 255;
      baseColor.g = v[1] / 255;
      baseColor.b = v[2] / 255;
    });
    gui.addColor(debug, 'water_color').onChange((v) => {
      waterColor.r = v[0] / 255;
      waterColor.g = v[1] / 255;
      waterColor.b = v[2] / 255;
    });
  }

  openDebug();
});
