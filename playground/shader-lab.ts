/**
 * @title Shader Lab
 * @category Material
 */
import {
  AssetType,
  Camera,
  Color,
  Engine,
  Entity,
  Material,
  MeshRenderer,
  ModelMesh,
  PrimitiveMesh,
  Script,
  Shader,
  Texture2D,
  Vector3,
  WebGLEngine,
} from "@galacean/engine";
import { ShaderLab } from "@galacean/engine-shaderlab";

// Create ShaderLab
const shaderLab = new ShaderLab();

main();

async function main() {
  // Create engine
  const engine = await WebGLEngine.create({ canvas: "canvas", shaderLab });
  engine.canvas.resizeByClientSize();

  // Custom shader
  const shaderSource = `
  Shader Water {
    SubShader {
      Pass Water {
        struct Attributes {
          vec4 POSITION;
          vec2 TEXCOORD_0; 
        }

        struct Varyings {
          vec2 uv;
          vec3 position;
        }

        mat4 renderer_MVPMat;
        mat4 renderer_MVMat;

        sampler2D material_BaseTexture;
        vec4 u_color;
        vec4 u_fogColor;
        float u_fogDensity;
        
        VertexShader = vert;
        FragmentShader = frag;

       

        Varyings vert(Attributes input) {
          Varyings v;

          v.uv = input.TEXCOORD_0;
          vec4 tmp = renderer_MVMat * POSITION;
          v.position = tmp.xyz;
          gl_Position = renderer_MVPMat * input.POSITION;
          return v;
        }

        void frag(Varyings v) {
          vec4 color = texture2D(material_BaseTexture, v.uv) * u_color;
          float fogDistance = length(v.position);
          float fogAmount = 1.0 - exp2(-u_fogDensity * u_fogDensity * fogDistance * fogDistance * 1.442695);
          fogAmount = clamp(fogAmount, 0.0, 1.0);
          gl_FragColor = mix(color, u_fogColor, fogAmount); 
    
          #ifndef ENGINE_IS_COLORSPACE_GAMMA
            gl_FragColor = linearToGamma(gl_FragColor);
          #endif
        }

        vec4 linearToGamma(vec4 linearIn) {
          return vec4(pow(linearIn.rgb, vec3(1.0 / 2.2)), linearIn.a);
        }
      }
    }
  }
`;

  // Init shader
  Shader.create(shaderSource);

  // Create root entity
  const rootEntity = engine.sceneManager.activeScene.createRootEntity();

  // Create camera
  const cameraEntity = rootEntity.createChild("Camera");
  cameraEntity.transform.setPosition(0, 10, 10);
  cameraEntity.transform.lookAt(new Vector3(0, 8, 0));
  const camera = cameraEntity.addComponent(Camera);
  camera.farClipPlane = 2000;
  camera.fieldOfView = 55;

  createPlane(engine, rootEntity);
  
  engine.run();
}

/**
 * Create a plane as a child of entity.
 */
function createPlane(engine: Engine, entity: Entity): void {
  engine.resourceManager
    .load<Texture2D>({
      url: "https://gw.alipayobjects.com/mdn/rms_2e421e/afts/img/A*fRtNTKrsq3YAAAAAAAAAAAAAARQnAQ",
      type: AssetType.Texture2D,
    })
    .then((texture) => {
      const planeEntity = entity.createChild("plane");
      const meshRenderer = planeEntity.addComponent(MeshRenderer);
      const material = new Material(engine, Shader.find("Water"));

      meshRenderer.mesh = PrimitiveMesh.createPlane(
        engine,
        1245,
        1245,
        100,
        100,
        false
      );
      meshRenderer.setMaterial(material);

      planeEntity.addComponent(PlaneAnimation);

      const { shaderData } = material;
      shaderData.setTexture("material_BaseTexture", texture);
      shaderData.setColor("u_fogColor", new Color(0.25, 0.25, 0.25, 1));
      shaderData.setFloat("u_fogDensity", 0.004);
      shaderData.setColor(
        "u_color",
        new Color(86 / 255, 182 / 255, 194 / 255, 1)
      );
    });
}

/**
 * Plane animation script.
 */
class PlaneAnimation extends Script {
  private _planeMesh: ModelMesh;
  private _initZ: number[];
  private _counter: number = 0;

  /**
   * @override
   * Called when be enabled first time, only once.
   */
  onAwake(): void {
    const renderer = this.entity.getComponent(MeshRenderer);
    const mesh = <ModelMesh>renderer.mesh;
    const { vertexCount } = mesh;
    const positions = mesh.getPositions()!;
    const initY = new Array<number>(vertexCount);

    for (var i = 0; i < vertexCount; i++) {
      const position = positions[i];
      position.y += Math.random() * 10 - 10;
      initY[i] = position.y;
    }
    this._initZ = initY;
    this._planeMesh = mesh;
  }

  /**
   * @override
   * The main loop, called frame by frame.
   * @param deltaTime - The deltaTime when the script update.
   */
  onUpdate(deltaTime: number): void {
    const mesh = this._planeMesh;
    let { _counter: counter, _initZ: initZ } = this;
    const positions = mesh.getPositions()!;
    for (let i = 0, n = positions.length; i < n; i++) {
      const position = positions[i];
      position.y =
        Math.sin(i + counter * 0.00002) * (initZ[i] - initZ[i] * 0.6);
      counter += 0.1;
    }
    mesh.setPositions(positions);
    mesh.uploadData(false);
    this._counter = counter;
  }
}
