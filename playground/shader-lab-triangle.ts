/**
 * @title Shader Lab - Triangle
 * @category Material
 */

import { OrbitControl } from '@galacean/engine-toolkit-controls';
import {
  BufferMesh,
  Camera,
  Logger,
  SystemInfo,
  Vector3,
  WebGLEngine,
  Buffer,
  BufferBindFlag,
  BufferUsage,
  VertexElement,
  VertexElementFormat,
  MeshRenderer,
  Shader,
  Material,
  Color,
} from '@galacean/engine';
import { ShaderLab } from '@galacean/engine-shader-lab';

const shaderLab = new ShaderLab();

const shaderSource = `
Shader "Triangle" {
  SubShader "Default" {
    Pass "0" {
      mat4 renderer_MVPMat;
      vec3 u_color;

      struct a2v {
        vec4 POSITION;
      }

      struct v2f {
        vec3 v_color;
      }

      VertexShader = vert;
      FragmentShader = frag;

      v2f vert(a2v v) {
        v2f o;

        gl_Position = renderer_MVPMat * v.POSITION;
        o.v_color = u_color;
        return o;
      }

      void frag(v2f i) {
        gl_FragColor = vec4(i.v_color, 1.0);
      }
    }
  }
}`;

function createTriangleMesh(engine: WebGLEngine) {
  const mesh = new BufferMesh(engine);
  const vertices = new Float32Array([-1, -1, 1, 1, -1, 1, 0, 0.8, 1]);
  const vertexBuffer = new Buffer(
    engine,
    BufferBindFlag.VertexBuffer,
    vertices,
    BufferUsage.Static
  );
  mesh.setVertexBufferBinding(vertexBuffer, 12);
  mesh.setVertexElements([
    new VertexElement('POSITION', 0, VertexElementFormat.Vector3, 0),
  ]);
  mesh.addSubMesh(0, 3);
  return mesh;
}

Logger.enable();
WebGLEngine.create({ canvas: 'canvas', shaderLab }).then((engine) => {
  engine.canvas.resizeByClientSize();

  engine.canvas.width = window.innerWidth * SystemInfo.devicePixelRatio;
  engine.canvas.height = window.innerHeight * SystemInfo.devicePixelRatio;
  const scene = engine.sceneManager.activeScene;
  const rootEntity = scene.createRootEntity();

  // camera
  const cameraEntity = rootEntity.createChild('cameraNode');
  cameraEntity.transform.position = new Vector3(0, 0, 5);
  cameraEntity.addComponent(Camera);
  cameraEntity.addComponent(OrbitControl);

  // create triangle
  const triangle = rootEntity.createChild('Triangle');
  const renderer = triangle.addComponent(MeshRenderer);
  renderer.mesh = createTriangleMesh(engine);
  const shader = Shader.create(shaderSource);
  const material = new Material(engine, shader);
  material.shaderData.setColor('u_color', new Color(1.0, 1.0, 0));
  renderer.setMaterial(material);

  engine.run();
});
