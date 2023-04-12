/**
 * @title Buffer Mesh Particle Shader Effect
 * @category Mesh
 */
import { OrbitControl } from "@oasis-engine-toolkit/controls";
import {
  BaseMaterial,
  Buffer,
  BufferBindFlag,
  BufferMesh,
  Camera,
  Engine,
  MeshRenderer,
  RenderFace,
  Script,
  Shader,
  Texture2D,
  VertexBufferBinding,
  VertexElement,
  VertexElementFormat,
  WebGLEngine
} from "oasis-engine";

const fs = `uniform float progress;
uniform sampler2D texture1;
uniform sampler2D texture2;

varying vec2 v_uv;

// This function could be changed. Some great effects could be referred to https://gl-transitions.com/gallery
vec4 transition(vec2 p, float progress) {
  vec2 dir = p - vec2(.5);
  float dist = length(dir);

  if (dist > progress) {
    return mix(texture2D(texture1, v_uv), texture2D(texture2, v_uv), progress);
  } else {
    vec2 offset = dir * sin(dist * 30. - progress * 30.);
    return mix(texture2D(texture1, v_uv + offset), texture2D(texture2, v_uv), progress);
  }
}

void main() {
	gl_FragColor = transition(v_uv, clamp(progress, 0., 1.));
}
`;

const vs = `#define PI 3.14159265359
attribute vec3 POSITION;
attribute vec3 INDEX;
attribute vec2 UV;
uniform mat4 galacean_MVPMat;
uniform float progress;

varying vec2 v_uv;
varying vec3 v_pos;

void main() {
  v_uv = UV;
  vec4 position = vec4(POSITION , 1.0);
  float distance = length(INDEX.xy);
  float maxDistance = 40. * 1.414;
  float wait = distance / maxDistance * 0.5;

  float p = clamp(progress-wait, 0., 2.0);
  position.z += sin(p * PI * 6.) * 3. * (maxDistance - distance * 0.5) / maxDistance * (2. - progress) * 0.5;

  gl_Position = galacean_MVPMat * position;
}`;

const ParticleMeshShader = Shader.create("test", vs, fs);

class ParticleMeshMaterial extends BaseMaterial {
  constructor(engine: Engine) {
    super(engine, ParticleMeshShader);
  }

  clone(): ParticleMeshMaterial {
    const dest = new ParticleMeshMaterial(this._engine);
    this.cloneTo(dest);
    return dest;
  }

  get texture1(): Texture2D {
    return <Texture2D>this.shaderData.getTexture("texture1");
  }

  set texture1(value: Texture2D) {
    this.shaderData.setTexture("texture1", value);
  }

  get texture2(): Texture2D {
    return <Texture2D>this.shaderData.getTexture("texture2");
  }

  set texture2(value: Texture2D) {
    this.shaderData.setTexture("texture2", value);
  }

  get progress(): number {
    return <number>this.shaderData.getFloat("progress");
  }

  set progress(value: number) {
    this.shaderData.setFloat("progress", value);
  }
}

class AnimationComponent extends Script {
  time = 0;
  mtl: ParticleMeshMaterial | undefined;
  onAwake() {
    this.mtl = this.entity
      .getComponent(MeshRenderer)
      .getMaterial() as ParticleMeshMaterial;
  }
  onUpdate(time: number) {
    this.time += time;
    if (this.mtl) {
      this.mtl.progress = (this.time / 5000) % 2;
    }
  }
}

// segmentX and segmentY handle how many particles we create
function createPlaneParticleMesh(
  engine: WebGLEngine,
  width: number,
  height: number,
  segmentX: number,
  segmentY: number,
  isIn: boolean
) {
  const triangleCount = segmentX * segmentY * 2; // we create segmentX * segmentY rectangles, each rectangle has 2 triangles
  const vertexCount = triangleCount * 3;

  const halfWidth = width * 0.5;
  const halfHeight = height * 0.5;
  const segmentWidth = width / segmentX;
  const segmentHeight = height / segmentY;

  let positionBuffer = new Float32Array(vertexCount * 3);
  let uvBuffer = new Float32Array(vertexCount * 2);
  let indexBuffer = new Float32Array(vertexCount * 3);

  let i = 0;
  for (let y = 0; y < segmentY; y++) {
    for (let x = 0; x < segmentX; x++) {
      // create vertex attribute buffer according to each square seperated by segemntX and segmentY
      let index = i * 3 * 3;
      positionBuffer[index] = -halfWidth + x * segmentWidth;
      positionBuffer[index + 1] = -halfHeight + y * segmentHeight;
      positionBuffer[index + 2] = 0;
      positionBuffer[index + 3] = -halfWidth + (x + 1) * segmentWidth;
      positionBuffer[index + 4] = -halfHeight + y * segmentHeight;
      positionBuffer[index + 5] = 0;
      positionBuffer[index + 6] = -halfWidth + x * segmentWidth;
      positionBuffer[index + 7] = -halfHeight + (y + 1) * segmentHeight;
      positionBuffer[index + 8] = 0;
      positionBuffer[index + 9] = -halfWidth + (x + 1) * segmentWidth;
      positionBuffer[index + 10] = -halfHeight + y * segmentHeight;
      positionBuffer[index + 11] = 0;
      positionBuffer[index + 12] = -halfWidth + (x + 1) * segmentWidth;
      positionBuffer[index + 13] = -halfHeight + (y + 1) * segmentHeight;
      positionBuffer[index + 14] = 0;
      positionBuffer[index + 15] = -halfWidth + x * segmentWidth;
      positionBuffer[index + 16] = -halfHeight + (y + 1) * segmentHeight;
      positionBuffer[index + 17] = 0;

      indexBuffer[index] = x * 2 - segmentX;
      indexBuffer[index + 1] = y * 2 - segmentY;
      indexBuffer[index + 2] = i;
      indexBuffer[index + 3] = x * 2 - segmentX;
      indexBuffer[index + 4] = y * 2 - segmentY;
      indexBuffer[index + 5] = i;
      indexBuffer[index + 6] = x * 2 - segmentX;
      indexBuffer[index + 7] = y * 2 - segmentY;
      indexBuffer[index + 8] = i;
      indexBuffer[index + 9] = x * 2 + 1 - segmentX;
      indexBuffer[index + 10] = y * 2 + 1 - segmentY;
      indexBuffer[index + 11] = i + 1;
      indexBuffer[index + 12] = x * 2 + 1 - segmentX;
      indexBuffer[index + 13] = y * 2 + 1 - segmentY;
      indexBuffer[index + 14] = i + 1;
      indexBuffer[index + 15] = x * 2 + 1 - segmentX;
      indexBuffer[index + 16] = y * 2 + 1 - segmentY;
      indexBuffer[index + 17] = i + 1;

      index = i * 2 * 3;
      uvBuffer[index] = x / segmentX;
      uvBuffer[index + 1] = 1 - y / segmentY;
      uvBuffer[index + 2] = (x + 1) / segmentX;
      uvBuffer[index + 3] = 1 - y / segmentY;
      uvBuffer[index + 4] = x / segmentX;
      uvBuffer[index + 5] = 1 - (y + 1) / segmentY;
      uvBuffer[index + 6] = (x + 1) / segmentX;
      uvBuffer[index + 7] = 1 - y / segmentY;
      uvBuffer[index + 8] = (x + 1) / segmentX;
      uvBuffer[index + 9] = 1 - (y + 1) / segmentY;
      uvBuffer[index + 10] = x / segmentX;
      uvBuffer[index + 11] = 1 - (y + 1) / segmentY;

      i += 2;
    }
  }

  const mesh = new BufferMesh(engine);
  mesh.setVertexBufferBindings([
    new VertexBufferBinding(
      new Buffer(engine, BufferBindFlag.VertexBuffer, positionBuffer),
      3 * Float32Array.BYTES_PER_ELEMENT
    ),
    new VertexBufferBinding(
      new Buffer(engine, BufferBindFlag.VertexBuffer, uvBuffer),
      2 * Float32Array.BYTES_PER_ELEMENT
    ),
    new VertexBufferBinding(
      new Buffer(engine, BufferBindFlag.VertexBuffer, indexBuffer),
      3 * Float32Array.BYTES_PER_ELEMENT
    ),
  ]);

  mesh.setVertexElements([
    new VertexElement("POSITION", 0, VertexElementFormat.Vector3, 0),
    new VertexElement("UV", 0, VertexElementFormat.Vector2, 1),
    new VertexElement("INDEX", 0, VertexElementFormat.Vector3, 2),
  ]);

  mesh.addSubMesh(0, vertexCount);
  return mesh;
}

WebGLEngine.create({ canvas: "canvas" }).then((engine) => {
  engine.canvas.resizeByClientSize();
  const scene = engine.sceneManager.activeScene;
  const rootEntity = scene.createRootEntity();

  const cameraEntity = rootEntity.createChild("camera");
  cameraEntity.addComponent(Camera);
  cameraEntity.transform.position.set(0, 0, 50);
  cameraEntity.addComponent(OrbitControl);

  engine.resourceManager
    .load([
      "https://gw.alipayobjects.com/zos/OasisHub/440001901/3736/spring.jpeg",
      "https://gw.alipayobjects.com/zos/OasisHub/440001901/9546/winter.jpeg",
    ])
    .then((assets) => {
      const entity = rootEntity.createChild("plane");
      const renderer = entity.addComponent(MeshRenderer);
      const mesh = createPlaneParticleMesh(engine, 20, 20, 80, 80, true);
      const mtl = new ParticleMeshMaterial(engine);
      renderer.setMaterial(mtl);
      renderer.mesh = mesh;
      mtl.texture1 = assets[0] as Texture2D;
      mtl.texture2 = assets[1] as Texture2D;
      mtl.renderFace = RenderFace.Double;

      entity.addComponent(AnimationComponent);
    });

  engine.run();
});
