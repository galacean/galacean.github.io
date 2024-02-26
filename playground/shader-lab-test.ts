/**
 * @title ShaderLab Test
 * @category Material
 */

import {
  AssetType,
  Camera,
  Logger,
  Material,
  MeshRenderer,
  PrimitiveMesh,
  Shader,
  Texture2D,
  Vector3,
  WebGLEngine
} from "@galacean/engine";
import { ShaderLab } from "@galacean/engine-shader-lab";
import { OrbitControl } from "@galacean/engine-toolkit-controls";
Logger.enable();
const shaderLab = new ShaderLab();

const FurShaderSource = `Shader "Fur" {
  SubShader "Default" {
    BlendState blendState {
      Enabled = true;
      SourceColorBlendFactor = BlendFactor.SourceAlpha;
      DestinationColorBlendFactor = BlendFactor.OneMinusSourceAlpha;
      SourceAlphaBlendFactor = BlendFactor.One;
      DestinationAlphaBlendFactor = BlendFactor.OneMinusSourceAlpha;
    }

    BlendState = blendState;
    RenderQueueType = RenderQueueType.Transparent;
    
    mat4 renderer_MVPMat;
    mat4 renderer_ModelMat;
    mat4 renderer_NormalMat;
    vec3 camera_Position;

    sampler2D _MainTex;
		sampler2D _LayerTex;
		sampler2D _NoiseTex;

    vec3 _Gravity;
    float _GravityIntensity;
    float _EdgeFade;
    float _Cutoff;
    float _CutoffEnd;
    float _FurLength;

    struct a2v {
      vec4 POSITION;
      vec2 TEXCOORD_0;
      vec3 NORMAL;
    }

    struct v2f {
      vec2 v_uv;
      vec3 v_normal;
      vec3 v_pos;
    }

     
    Pass "0" {
      v2f vert(a2v v) {
        v2f o;
        float furOffset = 0.0;
        vec4 position = v.POSITION;
        vec3 direction = mix(v.NORMAL, _Gravity * _GravityIntensity + v.NORMAL * (1.0 - _GravityIntensity), furOffset);
        position.xyz += direction * _FurLength * furOffset;
        gl_Position = renderer_MVPMat * position;

        o.v_uv = v.TEXCOORD_0;
        o.v_normal = normalize( mat3(renderer_NormalMat) * v.NORMAL );
        vec4 temp_pos = renderer_ModelMat * position;
        o.v_pos = temp_pos.xyz / temp_pos.w;

        return o;
      }

      void frag(v2f i) {
        float furOffset = 0.0;
			  vec3 normalDirection = normalize(i.v_normal);
			  vec3 viewDirection =  normalize(camera_Position - i.v_pos);

			  vec4 _BaseColor = texture2D(_MainTex, i.v_uv);

			  float alpha = (texture2D(_LayerTex, i.v_uv)).r;
			  alpha = step(mix(_Cutoff, _CutoffEnd, furOffset), alpha);
			  float Noise =  (texture2D(_NoiseTex,i.v_uv)).r;

        gl_FragColor.rgb = _BaseColor.rgb;
			  gl_FragColor.a = 1.0 - furOffset * furOffset;
			  gl_FragColor.a += dot(viewDirection, normalDirection) - _EdgeFade;
			  gl_FragColor.a = max(0.0, gl_FragColor.a);
			  gl_FragColor.a *= alpha;
      }

      VertexShader = vert;
      FragmentShader = frag;
    }

    Pass "1" {
      v2f vert(a2v v) {
        v2f o;
        float furOffset = 0.1;
        vec4 position = v.POSITION;
        vec3 direction = mix(v.NORMAL, _Gravity * _GravityIntensity + v.NORMAL * (1.0 - _GravityIntensity), furOffset);
        position.xyz += direction * _FurLength * furOffset;
        gl_Position = renderer_MVPMat * position;

        o.v_uv = v.TEXCOORD_0;
        o.v_normal = normalize( mat3(renderer_NormalMat) * v.NORMAL );
        vec4 temp_pos = renderer_ModelMat * position;
        o.v_pos = temp_pos.xyz / temp_pos.w;

        return o;
      }

      void frag(v2f i) {
        float furOffset = 0.1;
			  vec3 normalDirection = normalize(i.v_normal);
			  vec3 viewDirection =  normalize(camera_Position - i.v_pos);

			  vec4 _BaseColor = texture2D(_MainTex, i.v_uv);

			  float alpha = (texture2D(_LayerTex, i.v_uv)).r;
			  alpha = step(mix(_Cutoff, _CutoffEnd, furOffset), alpha);
			  float Noise =  (texture2D(_NoiseTex,i.v_uv)).r;

        gl_FragColor.rgb = _BaseColor.rgb;
			  gl_FragColor.a = 1.0 - furOffset * furOffset;
			  gl_FragColor.a += dot(viewDirection, normalDirection) - _EdgeFade;
			  gl_FragColor.a = max(0.0, gl_FragColor.a);
			  gl_FragColor.a *= alpha;
      }

      VertexShader = vert;
      FragmentShader = frag;
    }

    Pass "2" {
      v2f vert(a2v v) {
        v2f o;
        float furOffset = 0.2;
        vec4 position = v.POSITION;
        vec3 direction = mix(v.NORMAL, _Gravity * _GravityIntensity + v.NORMAL * (1.0 - _GravityIntensity), furOffset);
        position.xyz += direction * _FurLength * furOffset;
        gl_Position = renderer_MVPMat * position;

        o.v_uv = v.TEXCOORD_0;
        o.v_normal = normalize( mat3(renderer_NormalMat) * v.NORMAL );
        vec4 temp_pos = renderer_ModelMat * position;
        o.v_pos = temp_pos.xyz / temp_pos.w;

        return o;
      }

      void frag(v2f i) {
        float furOffset = 0.2;
			  vec3 normalDirection = normalize(i.v_normal);
			  vec3 viewDirection =  normalize(camera_Position - i.v_pos);

			  vec4 _BaseColor = texture2D(_MainTex, i.v_uv);

			  float alpha = (texture2D(_LayerTex, i.v_uv)).r;
			  alpha = step(mix(_Cutoff, _CutoffEnd, furOffset), alpha);
			  float Noise =  (texture2D(_NoiseTex,i.v_uv)).r;

        gl_FragColor.rgb = _BaseColor.rgb;
			  gl_FragColor.a = 1.0 - furOffset * furOffset;
			  gl_FragColor.a += dot(viewDirection, normalDirection) - _EdgeFade;
			  gl_FragColor.a = max(0.0, gl_FragColor.a);
			  gl_FragColor.a *= alpha;
      }

      VertexShader = vert;
      FragmentShader = frag;
    }

    Pass "3" {
      v2f vert(a2v v) {
        v2f o;
        float furOffset = 0.3;
        vec4 position = v.POSITION;
        vec3 direction = mix(v.NORMAL, _Gravity * _GravityIntensity + v.NORMAL * (1.0 - _GravityIntensity), furOffset);
        position.xyz += direction * _FurLength * furOffset;
        gl_Position = renderer_MVPMat * position;

        o.v_uv = v.TEXCOORD_0;
        o.v_normal = normalize( mat3(renderer_NormalMat) * v.NORMAL );
        vec4 temp_pos = renderer_ModelMat * position;
        o.v_pos = temp_pos.xyz / temp_pos.w;

        return o;
      }

      void frag(v2f i) {
        float furOffset = 0.3;
			  vec3 normalDirection = normalize(i.v_normal);
			  vec3 viewDirection =  normalize(camera_Position - i.v_pos);

			  vec4 _BaseColor = texture2D(_MainTex, i.v_uv);

			  float alpha = (texture2D(_LayerTex, i.v_uv)).r;
			  alpha = step(mix(_Cutoff, _CutoffEnd, furOffset), alpha);
			  float Noise =  (texture2D(_NoiseTex,i.v_uv)).r;

        gl_FragColor.rgb = _BaseColor.rgb;
			  gl_FragColor.a = 1.0 - furOffset * furOffset;
			  gl_FragColor.a += dot(viewDirection, normalDirection) - _EdgeFade;
			  gl_FragColor.a = max(0.0, gl_FragColor.a);
			  gl_FragColor.a *= alpha;
      }

      VertexShader = vert;
      FragmentShader = frag;
    }

    Pass "4" {
      v2f vert(a2v v) {
        v2f o;
        float furOffset = 0.4;
        vec4 position = v.POSITION;
        vec3 direction = mix(v.NORMAL, _Gravity * _GravityIntensity + v.NORMAL * (1.0 - _GravityIntensity), furOffset);
        position.xyz += direction * _FurLength * furOffset;
        gl_Position = renderer_MVPMat * position;

        o.v_uv = v.TEXCOORD_0;
        o.v_normal = normalize( mat3(renderer_NormalMat) * v.NORMAL );
        vec4 temp_pos = renderer_ModelMat * position;
        o.v_pos = temp_pos.xyz / temp_pos.w;

        return o;
      }

      void frag(v2f i) {
        float furOffset = 0.4;
			  vec3 normalDirection = normalize(i.v_normal);
			  vec3 viewDirection =  normalize(camera_Position - i.v_pos);

			  vec4 _BaseColor = texture2D(_MainTex, i.v_uv);

			  float alpha = (texture2D(_LayerTex, i.v_uv)).r;
			  alpha = step(mix(_Cutoff, _CutoffEnd, furOffset), alpha);
			  float Noise =  (texture2D(_NoiseTex,i.v_uv)).r;

        gl_FragColor.rgb = _BaseColor.rgb;
			  gl_FragColor.a = 1.0 - furOffset * furOffset;
			  gl_FragColor.a += dot(viewDirection, normalDirection) - _EdgeFade;
			  gl_FragColor.a = max(0.0, gl_FragColor.a);
			  gl_FragColor.a *= alpha;
      }

      VertexShader = vert;
      FragmentShader = frag;
    }

    Pass "5" {
      v2f vert(a2v v) {
        v2f o;
        float furOffset = 0.5;
        vec4 position = v.POSITION;
        vec3 direction = mix(v.NORMAL, _Gravity * _GravityIntensity + v.NORMAL * (1.0 - _GravityIntensity), furOffset);
        position.xyz += direction * _FurLength * furOffset;
        gl_Position = renderer_MVPMat * position;

        o.v_uv = v.TEXCOORD_0;
        o.v_normal = normalize( mat3(renderer_NormalMat) * v.NORMAL );
        vec4 temp_pos = renderer_ModelMat * position;
        o.v_pos = temp_pos.xyz / temp_pos.w;

        return o;
      }

      void frag(v2f i) {
        float furOffset = 0.5;
			  vec3 normalDirection = normalize(i.v_normal);
			  vec3 viewDirection =  normalize(camera_Position - i.v_pos);

			  vec4 _BaseColor = texture2D(_MainTex, i.v_uv);

			  float alpha = (texture2D(_LayerTex, i.v_uv)).r;
			  alpha = step(mix(_Cutoff, _CutoffEnd, furOffset), alpha);
			  float Noise =  (texture2D(_NoiseTex,i.v_uv)).r;

        gl_FragColor.rgb = _BaseColor.rgb;
			  gl_FragColor.a = 1.0 - furOffset * furOffset;
			  gl_FragColor.a += dot(viewDirection, normalDirection) - _EdgeFade;
			  gl_FragColor.a = max(0.0, gl_FragColor.a);
			  gl_FragColor.a *= alpha;
      }

      VertexShader = vert;
      FragmentShader = frag;
    }

    Pass "6" {
      v2f vert(a2v v) {
        v2f o;
        float furOffset = 0.6;
        vec4 position = v.POSITION;
        vec3 direction = mix(v.NORMAL, _Gravity * _GravityIntensity + v.NORMAL * (1.0 - _GravityIntensity), furOffset);
        position.xyz += direction * _FurLength * furOffset;
        gl_Position = renderer_MVPMat * position;

        o.v_uv = v.TEXCOORD_0;
        o.v_normal = normalize( mat3(renderer_NormalMat) * v.NORMAL );
        vec4 temp_pos = renderer_ModelMat * position;
        o.v_pos = temp_pos.xyz / temp_pos.w;

        return o;
      }

      void frag(v2f i) {
        float furOffset = 0.6;
			  vec3 normalDirection = normalize(i.v_normal);
			  vec3 viewDirection =  normalize(camera_Position - i.v_pos);

			  vec4 _BaseColor = texture2D(_MainTex, i.v_uv);

			  float alpha = (texture2D(_LayerTex, i.v_uv)).r;
			  alpha = step(mix(_Cutoff, _CutoffEnd, furOffset), alpha);
			  float Noise =  (texture2D(_NoiseTex,i.v_uv)).r;

        gl_FragColor.rgb = _BaseColor.rgb;
			  gl_FragColor.a = 1.0 - furOffset * furOffset;
			  gl_FragColor.a += dot(viewDirection, normalDirection) - _EdgeFade;
			  gl_FragColor.a = max(0.0, gl_FragColor.a);
			  gl_FragColor.a *= alpha;
      }

      VertexShader = vert;
      FragmentShader = frag;
    }

    Pass "7" {
      v2f vert(a2v v) {
        v2f o;
        float furOffset = 0.7;
        vec4 position = v.POSITION;
        vec3 direction = mix(v.NORMAL, _Gravity * _GravityIntensity + v.NORMAL * (1.0 - _GravityIntensity), furOffset);
        position.xyz += direction * _FurLength * furOffset;
        gl_Position = renderer_MVPMat * position;

        o.v_uv = v.TEXCOORD_0;
        o.v_normal = normalize( mat3(renderer_NormalMat) * v.NORMAL );
        vec4 temp_pos = renderer_ModelMat * position;
        o.v_pos = temp_pos.xyz / temp_pos.w;

        return o;
      }

      void frag(v2f i) {
        float furOffset = 0.7;
			  vec3 normalDirection = normalize(i.v_normal);
			  vec3 viewDirection =  normalize(camera_Position - i.v_pos);

			  vec4 _BaseColor = texture2D(_MainTex, i.v_uv);

			  float alpha = (texture2D(_LayerTex, i.v_uv)).r;
			  alpha = step(mix(_Cutoff, _CutoffEnd, furOffset), alpha);
			  float Noise =  (texture2D(_NoiseTex,i.v_uv)).r;

        gl_FragColor.rgb = _BaseColor.rgb;
			  gl_FragColor.a = 1.0 - furOffset * furOffset;
			  gl_FragColor.a += dot(viewDirection, normalDirection) - _EdgeFade;
			  gl_FragColor.a = max(0.0, gl_FragColor.a);
			  gl_FragColor.a *= alpha;
      }

      VertexShader = vert;
      FragmentShader = frag;
    }

    Pass "8" {
      v2f vert(a2v v) {
        v2f o;
        float furOffset = 0.8;
        vec4 position = v.POSITION;
        vec3 direction = mix(v.NORMAL, _Gravity * _GravityIntensity + v.NORMAL * (1.0 - _GravityIntensity), furOffset);
        position.xyz += direction * _FurLength * furOffset;
        gl_Position = renderer_MVPMat * position;

        o.v_uv = v.TEXCOORD_0;
        o.v_normal = normalize( mat3(renderer_NormalMat) * v.NORMAL );
        vec4 temp_pos = renderer_ModelMat * position;
        o.v_pos = temp_pos.xyz / temp_pos.w;

        return o;
      }

      void frag(v2f i) {
        float furOffset = 0.8;
			  vec3 normalDirection = normalize(i.v_normal);
			  vec3 viewDirection =  normalize(camera_Position - i.v_pos);

			  vec4 _BaseColor = texture2D(_MainTex, i.v_uv);

			  float alpha = (texture2D(_LayerTex, i.v_uv)).r;
			  alpha = step(mix(_Cutoff, _CutoffEnd, furOffset), alpha);
			  float Noise =  (texture2D(_NoiseTex,i.v_uv)).r;

        gl_FragColor.rgb = _BaseColor.rgb;
			  gl_FragColor.a = 1.0 - furOffset * furOffset;
			  gl_FragColor.a += dot(viewDirection, normalDirection) - _EdgeFade;
			  gl_FragColor.a = max(0.0, gl_FragColor.a);
			  gl_FragColor.a *= alpha;
      }

      VertexShader = vert;
      FragmentShader = frag;
    }

    Pass "9" {
      v2f vert(a2v v) {
        v2f o;
        float furOffset = 0.9;
        vec4 position = v.POSITION;
        vec3 direction = mix(v.NORMAL, _Gravity * _GravityIntensity + v.NORMAL * (1.0 - _GravityIntensity), furOffset);
        position.xyz += direction * _FurLength * furOffset;
        gl_Position = renderer_MVPMat * position;

        o.v_uv = v.TEXCOORD_0;
        o.v_normal = normalize( mat3(renderer_NormalMat) * v.NORMAL );
        vec4 temp_pos = renderer_ModelMat * position;
        o.v_pos = temp_pos.xyz / temp_pos.w;

        return o;
      }

      void frag(v2f i) {
        float furOffset = 0.9;
			  vec3 normalDirection = normalize(i.v_normal);
			  vec3 viewDirection =  normalize(camera_Position - i.v_pos);

			  vec4 _BaseColor = texture2D(_MainTex, i.v_uv);

			  float alpha = (texture2D(_LayerTex, i.v_uv)).r;
			  alpha = step(mix(_Cutoff, _CutoffEnd, furOffset), alpha);
			  float Noise =  (texture2D(_NoiseTex,i.v_uv)).r;

        gl_FragColor.rgb = _BaseColor.rgb;
			  gl_FragColor.a = 1.0 - furOffset * furOffset;
			  gl_FragColor.a += dot(viewDirection, normalDirection) - _EdgeFade;
			  gl_FragColor.a = max(0.0, gl_FragColor.a);
			  gl_FragColor.a *= alpha;
      }

      VertexShader = vert;
      FragmentShader = frag;
    }

    Pass "10" {
      v2f vert(a2v v) {
        v2f o;
        float furOffset = 1.0;
        vec4 position = v.POSITION;
        vec3 direction = mix(v.NORMAL, _Gravity * _GravityIntensity + v.NORMAL * (1.0 - _GravityIntensity), furOffset);
        position.xyz += direction * _FurLength * furOffset;
        gl_Position = renderer_MVPMat * position;

        o.v_uv = v.TEXCOORD_0;
        o.v_normal = normalize( mat3(renderer_NormalMat) * v.NORMAL );
        vec4 temp_pos = renderer_ModelMat * position;
        o.v_pos = temp_pos.xyz / temp_pos.w;

        return o;
      }

      void frag(v2f i) {
        float furOffset = 1.0;
			  vec3 normalDirection = normalize(i.v_normal);
			  vec3 viewDirection =  normalize(camera_Position - i.v_pos);

			  vec4 _BaseColor = texture2D(_MainTex, i.v_uv);

			  float alpha = (texture2D(_LayerTex, i.v_uv)).r;
			  alpha = step(mix(_Cutoff, _CutoffEnd, furOffset), alpha);
			  float Noise =  (texture2D(_NoiseTex,i.v_uv)).r;

        gl_FragColor.rgb = _BaseColor.rgb;
			  gl_FragColor.a = 1.0 - furOffset * furOffset;
			  gl_FragColor.a += dot(viewDirection, normalDirection) - _EdgeFade;
			  gl_FragColor.a = max(0.0, gl_FragColor.a);
			  gl_FragColor.a *= alpha;
      }

      VertexShader = vert;
      FragmentShader = frag;
    }

  }
}`;

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

  // create sphere
  const entity = rootEntity.createChild();
  const renderer = entity.addComponent(MeshRenderer);
  renderer.mesh = PrimitiveMesh.createSphere(engine, 1, 64);
  const shader = Shader.create(FurShaderSource);
  const material = new Material(engine, shader);
  renderer.setMaterial(material);

  const shaderData = material.shaderData;

  engine.resourceManager
    .load([
      {
        type: AssetType.Texture2D,
        url: "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*g_HIRqQdNUcAAAAAAAAAAAAAARQnAQ"
      },
      {
        type: AssetType.Texture2D,
        url: "https://pic1.zhimg.com/80/v2-a0ad38493301ccb02b583fd1ba1723e4_1440w.webp"
      },
      {
        type: AssetType.GLTF,
        url: "https://gw.alipayobjects.com/os/bmw-prod/72a8e335-01da-4234-9e81-5f8b56464044.gltf"
      }
    ])
    .then((res) => {
      const baseTexture = res[0] as Texture2D;
      const layerTexture = res[1] as Texture2D;
      const noiseTexture = res[2] as Texture2D;
      shaderData.setTexture("_MainTex", baseTexture);
      shaderData.setTexture("_LayerTex", layerTexture);
      shaderData.setTexture("_NoiseTex", noiseTexture);

      shaderData.setFloat("_FurLength", 0.25);
      shaderData.setFloat("_Cutoff", 0.2);
      shaderData.setFloat("_CutoffEnd", 0.5);
      shaderData.setVector3("_Gravity", new Vector3(0, -1, 0));
      shaderData.setFloat("_GravityIntensity", 0.25);
      engine.run();
    });
});
