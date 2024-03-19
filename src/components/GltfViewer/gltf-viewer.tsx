/* eslint-disable no-console */
/* eslint no-multi-assign: "off" */
/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint no-underscore-dangle: 0 */
import {
  AmbientLight,
  AnimationClip,
  Animator,
  AssetType,
  BackgroundMode,
  BoundingBox,
  Camera,
  Color,
  DirectLight,
  Entity,
  GLTFResource,
  Material,
  MeshRenderer,
  PBRBaseMaterial,
  PBRMaterial,
  PBRSpecularMaterial,
  PrimitiveMesh,
  Renderer,
  Scene,
  SkyBoxMaterial,
  SphericalHarmonics3,
  Texture2D,
  TextureCube,
  UnlitMaterial,
  Vector3,
  WebGLEngine
} from "@galacean/engine";
import { OrbitControl } from "@galacean/engine-toolkit-controls";
import {
  BakerResolution,
  DecodeMode,
  IBLBaker,
  SphericalHarmonics3Baker,
  downloadArrayBuffer,
  toBuffer
} from "@galacean/tools-baker";
import * as dat from "dat.gui";
import { useEffect } from "react";
import { SimpleDropzone } from "simple-dropzone";
import "./gltf-viewer.less";

const envList = {
  sunset: "https://gw.alipayobjects.com/os/bmw-prod/89c54544-1184-45a1-b0f5-c0b17e5c3e68.bin",
  pisa: "https://gw.alipayobjects.com/os/bmw-prod/6470ea5e-094b-4a77-a05f-4945bf81e318.bin",
  park: "https://gw.alipayobjects.com/os/bmw-prod/37f204c2-bc5b-4344-a368-8251bbeb0717.bin",
  foot_2K: "https://gw.alipayobjects.com/os/bmw-prod/23c1893a-fe29-4e91-bd6a-bb1c4201a876.bin"
};

class Oasis {
  static guiToColor(gui: number[], color: Color) {
    color.set(gui[0] / 255, gui[1] / 255, gui[2] / 255, color.a);
  }

  static colorToGui(color: Color = new Color(1, 1, 1)): number[] {
    const v = [];
    v[0] = color.r * 255;
    v[1] = color.g * 255;
    v[2] = color.b * 255;
    return v;
  }

  textures: Record<string, Texture2D> = {};
  env: Record<string, AmbientLight> = {};

  engine: WebGLEngine;
  scene: Scene;
  skyMaterial: SkyBoxMaterial;

  // Entity
  rootEntity: Entity;
  cameraEntity: Entity;
  gltfRootEntity: Entity;
  lightEntity1: Entity;
  lightEntity2: Entity;

  // Component
  camera: Camera;
  controler: OrbitControl;
  light1: DirectLight;
  light2: DirectLight;

  // Debug
  gui = new dat.GUI();
  materialFolder = null;
  animationFolder = null;
  sceneFolder = null;
  lightFolder = null;
  state = {
    // Scene
    background: true,
    // Lights
    env: "park",
    lights: true,
    lightColor1: Oasis.colorToGui(new Color(1, 1, 1)),
    lightColor2: Oasis.colorToGui(new Color(1, 1, 1)),
    lightIntensity1: 1,
    lightIntensity2: 1
  };
  _materials: Material[] = [];

  // temporary
  _boundingBox: BoundingBox = new BoundingBox();
  _center: Vector3 = new Vector3();
  _extent: Vector3 = new Vector3();

  // DOM
  $spinner = document.getElementById("spinner");
  $dropZone = document.getElementById("dropZone");
  $input = document.getElementById("input");

  constructor() {
    const guiStyle = this.gui.domElement.style;
    guiStyle.position = "relative";
    guiStyle.top = "68px";
    guiStyle.right = "-12px";

    WebGLEngine.create({ canvas: "canvas-gltf-viewer" }).then((engine) => {
      this.engine = engine;
      this.scene = this.engine.sceneManager.activeScene;
      this.skyMaterial = new SkyBoxMaterial(this.engine);
      this.rootEntity = this.scene.createRootEntity("root");
      this.cameraEntity = this.rootEntity.createChild("camera");
      this.gltfRootEntity = this.rootEntity.createChild("gltf");
      this.lightEntity1 = this.rootEntity.createChild("direct_light1");
      this.lightEntity2 = this.rootEntity.createChild("direct_light2");
      this.camera = this.cameraEntity.addComponent(Camera);
      this.controler = this.cameraEntity.addComponent(OrbitControl);
      this.light1 = this.lightEntity1.addComponent(DirectLight);
      this.light2 = this.lightEntity2.addComponent(DirectLight);

      this.loadEnv(this.state.env).then(() => {
        this.initScene();
        this.initDropZone();
        this.addSceneGUI();
        this.initDefaultDebugMesh();
      });
    });
  }

  loadEnv(envName: string) {
    return new Promise((resolve) => {
      this.engine.resourceManager
        .load<AmbientLight>({
          type: AssetType.Env,
          url: envList[envName]
        })
        .then((env) => {
          this.env[envName] = env;

          this.scene.ambientLight = env;
          this.skyMaterial.texture = env.specularTexture;
          this.skyMaterial.textureDecodeRGBM = true;
          resolve(true);
        });
    });
  }

  initScene() {
    this.engine.canvas.resizeByClientSize();
    this.controler.minDistance = 0;

    // debug sync
    if (this.state.background) {
      this.scene.background.mode = BackgroundMode.Sky;
    }
    if (!this.state.lights) {
      this.light1.enabled = this.light2.enabled = false;
    }
    this.light1.intensity = this.state.lightIntensity1;
    this.light2.intensity = this.state.lightIntensity2;
    this.lightEntity1.transform.setRotation(-45, 0, 0);
    this.lightEntity2.transform.setRotation(-45, 180, 0);
    this.scene.background.solidColor = new Color(0, 0, 0, 0);
    this.scene.background.sky.material = this.skyMaterial;
    this.scene.background.sky.mesh = PrimitiveMesh.createCuboid(this.engine, 1, 1, 1);
    this.engine.run();

    window.onresize = () => {
      this.engine.canvas.resizeByClientSize();
    };
  }

  addSceneGUI() {
    const { gui } = this;
    // Display controls.
    if (this.sceneFolder) {
      gui.removeFolder(this.sceneFolder);
    }
    if (this.sceneFolder) {
      gui.removeFolder(this.lightFolder);
    }
    this.sceneFolder = gui.addFolder("Scene");
    this.sceneFolder.add(this.state, "background").onChange((v: boolean) => {
      if (v) {
        this.scene.background.mode = BackgroundMode.Sky;
      } else {
        this.scene.background.mode = BackgroundMode.SolidColor;
      }
    });

    // Lighting controls.
    this.lightFolder = gui.addFolder("Lighting");
    this.lightFolder
      .add(this.state, "env", [...Object.keys(envList)])
      .name("IBL")
      .onChange((v) => {
        this.loadEnv(v);
      });

    this.lightFolder.add(this.state, "lights").onChange((v) => {
      this.light1.enabled = this.light2.enabled = v;
    });
    this.lightFolder.addColor(this.state, "lightColor1").onChange((v) => {
      Oasis.guiToColor(v, this.light1.color);
    });
    this.lightFolder.addColor(this.state, "lightColor2").onChange((v) => {
      Oasis.guiToColor(v, this.light2.color);
    });
    this.lightFolder.add(this.state, "lightIntensity1", 0, 2).onChange((v) => {
      this.light1.intensity = v;
    });
    this.lightFolder.add(this.state, "lightIntensity2", 0, 2).onChange((v) => {
      this.light2.intensity = v;
    });

    this.sceneFolder.open();
    this.lightFolder.open();
  }

  initDefaultDebugMesh() {
    const mesh = PrimitiveMesh.createSphere(this.engine, 5, 64);
    const material = new PBRMaterial(this.engine);
    material.metallic = 1;
    material.roughness = 0;
    material.name = "default";
    const renderer = this.gltfRootEntity.addComponent(MeshRenderer);

    renderer.mesh = mesh;
    renderer.setMaterial(material);

    this.addMaterialGUI([material]);
    this.setCenter([renderer]);
  }

  setCenter(renderers: Renderer[]) {
    const boundingBox = this._boundingBox;
    const center = this._center;
    const extent = this._extent;

    boundingBox.min.set(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
    boundingBox.max.set(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);

    renderers.forEach((renderer) => {
      BoundingBox.merge(renderer.bounds, boundingBox, boundingBox);
    });
    boundingBox.getExtent(extent);
    const size = extent.length();

    boundingBox.getCenter(center);
    this.controler.target.set(center.x, center.y, center.z);
    this.cameraEntity.transform.setPosition(center.x, center.y, size * 3);

    this.camera.farClipPlane = size * 12;
    this.camera.nearClipPlane = size / 100;

    this.controler.maxDistance = size * 10;
  }

  initDropZone() {
    const dropCtrl = new SimpleDropzone(document.body, this.$input);
    dropCtrl.on("drop", ({ files }) => this.loadFileMaps(files));
  }

  loadFileMaps(files: Map<string, File>) {
    const modelReg = /\.(gltf|glb)$/i;
    const imgReg = /\.(jpg|jpeg|png)$/i;
    const envReg = /\.(hdr|hdri)$/i;

    let mainFile: File;
    let type = "gltf";

    const filesMap = {}; // [fileName]:LocalUrl
    const fileArray: any = Array.from(files); // ['/*/*.*',obj:File]

    fileArray.some((f) => {
      const file = f[1];
      if (modelReg.test(file.name)) {
        type = RegExp.$1;
        mainFile = file;
        return true;
      }

      return false;
    });

    fileArray.forEach((f) => {
      const file = f[1];
      if (!modelReg.test(file.name)) {
        const url = URL.createObjectURL(file);
        const fileName = file.name;
        filesMap[fileName] = url;
        if (imgReg.test(fileName)) {
          this.addTexture(fileName, url);
        } else if (envReg.test(fileName)) {
          this.addEnv(fileName, url);
        }
      }
    });

    if (mainFile) {
      this.dropStart();
      const url = URL.createObjectURL(mainFile);
      this.loadModel(url, filesMap, type as any);
    }
  }

  loadModel(url: string, filesMap: Record<string, string>, type: "gltf" | "glb") {
    this.destoryGLTF();

    // replace relative path
    if (type.toLowerCase() === "gltf") {
      this.engine.resourceManager
        .load({
          type: AssetType.JSON,
          url
        })
        .then((gltf: any) => {
          gltf.buffers.concat(gltf.images).forEach((item) => {
            if (!item) return;
            let { uri } = item;
            if (uri) {
              let index = uri.lastIndexOf("/");
              if (index > -1) {
                uri = uri.substr(index + 1);
              }
              if (filesMap[uri]) {
                item.uri = filesMap[uri];
              }
            }
          });
          const blob = new Blob([JSON.stringify(gltf)]);
          const urlNew = URL.createObjectURL(blob);
          this.engine.resourceManager
            .load<GLTFResource>({
              type: AssetType.GLTF,
              url: urlNew
            })
            .then((asset) => {
              this.handleGltfResource(asset);
            })
            .catch(() => {
              this.dropError();
            });
        });
    } else {
      this.engine.resourceManager
        .load<GLTFResource>({
          type: AssetType.GLTF,
          url
        })
        .then((asset) => {
          this.handleGltfResource(asset);
        })
        .catch(() => {
          this.dropError();
        });
    }
  }

  handleGltfResource(asset: GLTFResource) {
    const { materials, animations } = asset;
    const defaultSceneRoot = asset.instantiateSceneRoot();
    console.log(asset);
    this.dropSuccess();
    this.gltfRootEntity = defaultSceneRoot;
    this.rootEntity.addChild(defaultSceneRoot);

    const meshRenderers: MeshRenderer[] = [];
    defaultSceneRoot.getComponentsIncludeChildren(MeshRenderer, meshRenderers);

    this.setCenter(meshRenderers);
    this.addMaterialGUI(materials);
    this.loadAnimationGUI(animations as AnimationClip[]);
  }

  addTexture(name: string, url: string) {
    const repeat = Object.keys(this.textures).find((textureName) => textureName === name);
    if (repeat) {
      console.warn(`${name} 已经存在，请更换图片名字重新上传`);
      return;
    }
    this.engine.resourceManager
      .load<Texture2D>({
        type: AssetType.Texture2D,
        url
      })
      .then((texture) => {
        this.textures[name] = texture;
        this.addMaterialGUI();
        console.log("图片上传成功！", name);
      });
  }

  async addEnv(name: string, url: string) {
    const texture = await this.engine.resourceManager.load<TextureCube>({
      url,
      type: AssetType.HDR
    });

    const bakedHDRCubeMap = IBLBaker.fromTextureCubeMap(texture, BakerResolution.R128, DecodeMode.RGBM);
    const sh = new SphericalHarmonics3();
    await SphericalHarmonics3Baker.fromTextureCube(texture, sh);
    const arrayBuffer = toBuffer(bakedHDRCubeMap, sh);
    downloadArrayBuffer(arrayBuffer, name);

    // update debuger
    const blob = new Blob([arrayBuffer], { type: "text/plain" });
    const bakeUrl = URL.createObjectURL(blob);
    this.state.env = name;
    envList[name] = bakeUrl;
    this.loadEnv(name);
    this.addSceneGUI();
    this.addMaterialGUI();
  }

  dropStart() {
    this.$dropZone.classList.add("hide");
    this.$spinner.classList.remove("hide");
  }

  dropError() {
    this.$dropZone.classList.remove("hide");
    this.$spinner.classList.add("hide");
  }

  dropSuccess() {
    this.$dropZone.classList.add("hide");
    this.$spinner.classList.add("hide");
  }

  destoryGLTF() {
    this.gltfRootEntity.destroy();
  }

  addMaterialGUI(materials?: Material[]) {
    const { gui } = this;
    if (this.materialFolder) {
      gui.removeFolder(this.materialFolder);
      this.materialFolder = null;
    }

    const _materials = materials || this._materials;
    this._materials = _materials;
    if (!_materials.length) return;

    const folder = (this.materialFolder = gui.addFolder("Material"));
    const folderName = {};

    _materials.forEach((material) => {
      if (!(material instanceof PBRBaseMaterial) && !(material instanceof UnlitMaterial)) return;
      if (!material.name) {
        material.name = "default";
      }
      const state = {
        opacity: material.baseColor.a,
        baseColor: Oasis.colorToGui(material.baseColor),
        emissiveColor: Oasis.colorToGui((material as PBRBaseMaterial).emissiveColor),
        specularColor: Oasis.colorToGui((material as PBRSpecularMaterial).specularColor),
        baseTexture: material.baseTexture ? "origin" : "",
        roughnessMetallicTexture: (material as PBRMaterial).roughnessMetallicTexture ? "origin" : "",
        normalTexture: (material as PBRBaseMaterial).normalTexture ? "origin" : "",
        emissiveTexture: (material as PBRBaseMaterial).emissiveTexture ? "origin" : "",
        occlusionTexture: (material as PBRBaseMaterial).occlusionTexture ? "origin" : "",
        specularGlossinessTexture: (material as PBRSpecularMaterial).specularGlossinessTexture ? "origin" : ""
      };

      const originTexture = {
        baseTexture: material.baseTexture,
        roughnessMetallicTexture: (material as PBRMaterial).roughnessMetallicTexture,
        normalTexture: (material as PBRBaseMaterial).normalTexture,
        emissiveTexture: (material as PBRBaseMaterial).emissiveTexture,
        occlusionTexture: (material as PBRBaseMaterial).occlusionTexture,
        specularGlossinessTexture: (material as PBRSpecularMaterial).specularGlossinessTexture
      };

      const f = folder.addFolder(
        folderName[material.name] ? `${material.name}_${folderName[material.name] + 1}` : material.name
      );

      folderName[material.name] = folderName[material.name] == null ? 1 : folderName[material.name] + 1;

      // metallic
      if (material instanceof PBRMaterial) {
        const mode1 = f.addFolder("Metallic-Roughness props");
        mode1.add(material, "metallic", 0, 1).step(0.01);
        mode1.add(material, "roughness", 0, 1).step(0.01);
        mode1.add(material, "ior", 0, 5).step(0.01);
        mode1
          .add(state, "roughnessMetallicTexture", ["None", "origin", ...Object.keys(this.textures)])
          .onChange((v) => {
            material.roughnessMetallicTexture =
              v === "None" ? null : this.textures[v] || originTexture.roughnessMetallicTexture;
          });
        mode1.open();
      }
      // specular
      else if (material instanceof PBRSpecularMaterial) {
        const mode2 = f.addFolder("Specular-Glossiness props");
        mode2.add(material, "glossiness", 0, 1).step(0.01);
        mode2.addColor(state, "specularColor").onChange((v) => {
          Oasis.guiToColor(v, material.specularColor);
        });
        mode2
          .add(state, "specularGlossinessTexture", ["None", "origin", ...Object.keys(this.textures)])
          .onChange((v) => {
            material.specularGlossinessTexture =
              v === "None" ? null : this.textures[v] || originTexture.specularGlossinessTexture;
          });
        mode2.open();
      } else if (material instanceof UnlitMaterial) {
        f.add(state, "baseTexture", ["None", "origin", ...Object.keys(this.textures)]).onChange((v) => {
          material.baseTexture = v === "None" ? null : this.textures[v] || originTexture.baseTexture;
        });

        f.addColor(state, "baseColor").onChange((v) => {
          Oasis.guiToColor(v, material.baseColor);
        });
      }

      // common
      if (!(material instanceof UnlitMaterial)) {
        const common = f.addFolder("Common props");

        common
          .add(state, "opacity", 0, 1)
          .step(0.01)
          .onChange((v) => {
            material.baseColor.a = v;
          });
        common.add(material, "isTransparent");
        common.add(material, "alphaCutoff", 0, 1).step(0.01);

        common.addColor(state, "baseColor").onChange((v) => {
          Oasis.guiToColor(v, material.baseColor);
        });
        common.addColor(state, "emissiveColor").onChange((v) => {
          Oasis.guiToColor(v, material.emissiveColor);
        });
        common.add(state, "baseTexture", ["None", "origin", ...Object.keys(this.textures)]).onChange((v) => {
          material.baseTexture = v === "None" ? null : this.textures[v] || originTexture.baseTexture;
        });
        common.add(state, "normalTexture", ["None", "origin", ...Object.keys(this.textures)]).onChange((v) => {
          material.normalTexture = v === "None" ? null : this.textures[v] || originTexture.normalTexture;
        });
        common.add(state, "emissiveTexture", ["None", "origin", ...Object.keys(this.textures)]).onChange((v) => {
          material.emissiveTexture = v === "None" ? null : this.textures[v] || originTexture.emissiveTexture;
        });
        common.add(state, "occlusionTexture", ["None", "origin", ...Object.keys(this.textures)]).onChange((v) => {
          material.occlusionTexture = v === "None" ? null : this.textures[v] || originTexture.occlusionTexture;
        });
        common.open();
      }
    });

    folder.open();
  }

  loadAnimationGUI(animations: AnimationClip[]) {
    if (this.animationFolder) {
      this.gui.removeFolder(this.animationFolder);
      this.animationFolder = null;
    }

    if (animations?.length) {
      this.animationFolder = this.gui.addFolder("Animation");
      this.animationFolder.open();
      const animator = this.gltfRootEntity.getComponent(Animator);
      animator.play(animations[0].name);
      const state = {
        animation: animations[0].name
      };
      this.animationFolder
        .add(state, "animation", ["None", ...animations.map((animation) => animation.name)])
        .onChange((name) => {
          if (name === "None") {
            animator.speed = 0;
          } else {
            animator.speed = 1;
            animator.play(name);
          }
        });
    }
  }
}

export default function GLTFView(props: any) {
  useEffect(() => {
    let oasis = new Oasis();
    document.oncontextmenu = () => false;

    return () => {
      if (oasis) {
        oasis.gui.destroy();
        oasis.engine.destroy();
      }
    };
  });
  return (
    <div className="page-gltf-view">
      <canvas id="canvas-gltf-viewer" style={{ width: "100%", height: "calc(100vh - 64px)" }} />
      <div id="dropZone" className="dropZone">
        <img
          className="upload"
          src="https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*-sHKTYv5U94AAAAAAAAAAAAAARQnAQ"
        />
        <input id="input" type="file" className="input" multiple />
        <p>Drop your glTF2.0、images、HDRs here!</p>
      </div>
      <div id="spinner" className="spinner hide" />
      <script type="module" src="./src/index.ts" />
    </div>
  );
}
