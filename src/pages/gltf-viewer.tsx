import { OrbitControl } from "@oasis-engine/controls";
import {
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
  SkinnedMeshRenderer,
  SkyBoxMaterial,
  Texture2D,
  TextureCubeMap,
  UnlitMaterial,
  Vector3,
  WebGLEngine
} from "oasis-engine";
import React, { useEffect } from "react";
import WrapperLayout from "../components/layout";
import "./gltf-viewer.less";

const envList = {
  sky: [
    "https://gw.alipayobjects.com/mdn/rms_475770/afts/img/A*Gi7CTZqKuacAAAAAAAAAAABkARQnAQ",
    "https://gw.alipayobjects.com/mdn/rms_475770/afts/img/A*iRRMQIExwKMAAAAAAAAAAABkARQnAQ",
    "https://gw.alipayobjects.com/mdn/rms_475770/afts/img/A*ZIcPQZo20sAAAAAAAAAAAABkARQnAQ",
    "https://gw.alipayobjects.com/mdn/rms_475770/afts/img/A*SPYuTbHT-KgAAAAAAAAAAABkARQnAQ",
    "https://gw.alipayobjects.com/mdn/rms_475770/afts/img/A*mGUERbY77roAAAAAAAAAAABkARQnAQ",
    "https://gw.alipayobjects.com/mdn/rms_475770/afts/img/A*ilkPS7A1_JsAAAAAAAAAAABkARQnAQ"
  ],
  house: [
    "https://gw.alipayobjects.com/mdn/rms_475770/afts/img/A*1gjTQ7P2mQoAAAAAAAAAAABkARQnAQ",
    "https://gw.alipayobjects.com/mdn/rms_475770/afts/img/A*entSR7DylL0AAAAAAAAAAABkARQnAQ",
    "https://gw.alipayobjects.com/mdn/rms_475770/afts/img/A*izQBQY_vs_4AAAAAAAAAAABkARQnAQ",
    "https://gw.alipayobjects.com/mdn/rms_475770/afts/img/A*x3XnRpq1U-EAAAAAAAAAAABkARQnAQ",
    "https://gw.alipayobjects.com/mdn/rms_475770/afts/img/A*k7FsT5Gprn0AAAAAAAAAAABkARQnAQ",
    "https://gw.alipayobjects.com/mdn/rms_475770/afts/img/A*8LdBQ6ixiQAAAAAAAAAAAABkARQnAQ"
  ],
  sunnyDay: [
    "https://gw.alipayobjects.com/mdn/rms_475770/afts/img/A*4ZY8T4GpKwYAAAAAAAAAAABkARQnAQ",
    "https://gw.alipayobjects.com/mdn/rms_475770/afts/img/A*8QbJQZwS1wUAAAAAAAAAAABkARQnAQ",
    "https://gw.alipayobjects.com/mdn/rms_475770/afts/img/A*a54kSZ3LmAQAAAAAAAAAAABkARQnAQ",
    "https://gw.alipayobjects.com/mdn/rms_475770/afts/img/A*8CbfTb1yG8MAAAAAAAAAAABkARQnAQ",
    "https://gw.alipayobjects.com/mdn/rms_475770/afts/img/A*Yi4ZRZbdj8MAAAAAAAAAAABkARQnAQ",
    "https://gw.alipayobjects.com/mdn/rms_475770/afts/img/A*KddxSriLYjoAAAAAAAAAAABkARQnAQ"
  ],
  miniSampler: [
    "https://gw.alipayobjects.com/mdn/rms_475770/afts/img/A*IuyGR4bdwg4AAAAAAAAAAABkARQnAQ",
    "https://gw.alipayobjects.com/mdn/rms_475770/afts/img/A*4rv5RZ0kll4AAAAAAAAAAABkARQnAQ",
    "https://gw.alipayobjects.com/mdn/rms_475770/afts/img/A*cHitTpWoJjoAAAAAAAAAAABkARQnAQ",
    "https://gw.alipayobjects.com/mdn/rms_475770/afts/img/A*RCEbS6k5x18AAAAAAAAAAABkARQnAQ",
    "https://gw.alipayobjects.com/mdn/rms_475770/afts/img/A*IRc7R7cl4CcAAAAAAAAAAABkARQnAQ",
    "https://gw.alipayobjects.com/mdn/rms_475770/afts/img/A*y_4hRYVgzQ4AAAAAAAAAAABkARQnAQ"
  ],
  road: [
    "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*4ebgQaWOLaIAAAAAAAAAAAAAARQnAQ",
    "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*i56eR6AbreUAAAAAAAAAAAAAARQnAQ",
    "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*3wYERKsel5oAAAAAAAAAAAAAARQnAQ",
    "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*YiG7Srwmb3QAAAAAAAAAAAAAARQnAQ",
    "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*VUUwQrAv47sAAAAAAAAAAAAAARQnAQ",
    "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*Dn2qSoqzfwoAAAAAAAAAAAAAARQnAQ"
  ]
};

class Oasis {
  static guiToColor(gui: number[], color: Color) {
    color.setValue(gui[0] / 255, gui[1] / 255, gui[2] / 255, color.a);
  }

  static colorToGui(color: Color = new Color(1, 1, 1)): number[] {
    const v = [];
    v[0] = color.r * 255;
    v[1] = color.g * 255;
    v[2] = color.b * 255;
    return v;
  }

  cubeTextures: Record<string, TextureCubeMap> = {};
  textures: Record<string, Texture2D> = {};

  engine: WebGLEngine = new WebGLEngine("canvas-gltf-viewer", { alpha: true });
  scene: Scene = this.engine.sceneManager.activeScene;
  skyMaterial: SkyBoxMaterial = new SkyBoxMaterial(this.engine);

  // Entity
  rootEntity: Entity = this.scene.createRootEntity("root");
  cameraEntity: Entity = this.rootEntity.createChild("camera");
  gltfRootEntity: Entity = this.rootEntity.createChild("gltf");
  lightEntity1: Entity = this.rootEntity.createChild("light1");
  lightEntity2: Entity = this.rootEntity.createChild("light2");

  // Component
  camera: Camera = this.cameraEntity.addComponent(Camera);
  controler: OrbitControl = this.cameraEntity.addComponent(OrbitControl);
  light1: DirectLight = this.lightEntity1.addComponent(DirectLight);
  light2: DirectLight = this.lightEntity2.addComponent(DirectLight);

  // Debug
  gui = new window.dat.GUI();
  materialFolder = null;
  animationFolder = null;
  state = {
    // Scene
    background: false,
    // Lights
    envTexture: "miniSampler",
    envIntensity: 1,
    addLights: true,
    lightColor: Oasis.colorToGui(new Color(1, 1, 1)),
    lightIntensity: 0.8
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
  $close = document.getElementById("close");

  constructor() {
    const guiStyle = this.gui.domElement.style;
    guiStyle.position = "relative";
    guiStyle.top = "68px";
    guiStyle.right = "-12px";

    this.initResources().then(() => {
      this.initScene();
      this.initDropZone();
      this.addSceneGUI();
      this.initDefaultDebugMesh();
    });
  }

  initResources() {
    const names = Object.keys(envList);

    return new Promise((resolve) => {
      this.engine.resourceManager
        .load(
          names.map((name) => {
            return {
              type: AssetType.TextureCube,
              urls: envList[name]
            };
          })
        )
        .then((textures) => {
          (textures as any).forEach((texture: TextureCubeMap, index) => {
            const name = names[index];
            this.cubeTextures[name] = texture;
            if (name === this.state.envTexture) {
              this.scene.ambientLight.specularTexture = texture;
              this.skyMaterial.textureCubeMap = texture;
            }
          });
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
    if (!this.state.addLights) {
      this.light1.enabled = this.light2.enabled = false;
    }
    this.light1.intensity = this.light2.intensity = this.state.lightIntensity;
    this.lightEntity1.transform.setRotation(30, 0, 0);
    this.lightEntity2.transform.setRotation(-30, 180, 0);
    this.scene.ambientLight.specularIntensity = this.state.envIntensity;
    this.scene.background.solidColor = new Color(0, 0, 0, 0);
    this.scene.background.sky.material = this.skyMaterial;
    this.scene.background.sky.mesh = PrimitiveMesh.createCuboid(this.engine, 1, 1, 1);
    this.engine.run();
  }

  addSceneGUI() {
    const { gui } = this;
    // Display controls.
    const dispFolder = gui.addFolder("Scene");
    dispFolder.add(this.state, "background").onChange((v: boolean) => {
      if (v) {
        this.scene.background.mode = BackgroundMode.Sky;
      } else {
        this.scene.background.mode = BackgroundMode.SolidColor;
      }
    });

    // Lighting controls.
    const lightFolder = gui.addFolder("Lighting");
    lightFolder
      .add(this.state, "envTexture", ["None", ...Object.keys(this.cubeTextures)])
      .name("IBL")
      .onChange((v) => {
        this.scene.ambientLight.specularTexture = this.skyMaterial.textureCubeMap =
          v === "None" ? null : this.cubeTextures[v];
      });
    lightFolder
      .add(this.state, "envIntensity", 0, 2)
      .onChange((v) => {
        this.scene.ambientLight.specularIntensity = v;
      })
      .name("间接光强度");
    lightFolder
      .add(this.state, "addLights")
      .onChange((v) => {
        this.light1.enabled = this.light2.enabled = v;
      })
      .name("直接光");
    lightFolder.addColor(this.state, "lightColor").onChange((v) => {
      Oasis.guiToColor(v, this.light1.color);
      Oasis.guiToColor(v, this.light2.color);
    });
    lightFolder
      .add(this.state, "lightIntensity", 0, 2)
      .onChange((v) => {
        this.light1.intensity = this.light2.intensity = v;
      })
      .name("直接光强度");

    dispFolder.open();
    lightFolder.open();
  }

  initDefaultDebugMesh() {
    const mesh = PrimitiveMesh.createSphere(this.engine, 5, 64);
    const material = new PBRMaterial(this.engine);
    material.metallic = 0;
    material.roughness = 0;
    material.name = "default";
    const renderer = this.gltfRootEntity.addComponent(MeshRenderer);

    renderer.mesh = mesh;
    renderer.setMaterial(material);

    this.loadMaterialGUI([material]);
    this.setCenter([renderer]);
  }

  setCenter(renderers: Renderer[]) {
    const boundingBox = this._boundingBox;
    const center = this._center;
    const extent = this._extent;

    boundingBox.min.setValue(0, 0, 0);
    boundingBox.max.setValue(0, 0, 0);

    renderers.forEach((renderer) => {
      BoundingBox.merge(renderer.bounds, boundingBox, boundingBox);
    });
    boundingBox.getExtent(extent);
    const size = extent.length();

    boundingBox.getCenter(center);
    this.controler.target.setValue(center.x, center.y, center.z);
    this.cameraEntity.transform.setPosition(center.x, center.y, size * 3);

    this.camera.farClipPlane = size * 12;

    if (this.camera.nearClipPlane > size) {
      this.camera.nearClipPlane = size / 10;
    } else {
      this.camera.nearClipPlane = 0.1;
    }

    this.controler.maxDistance = size * 10;
  }

  initDropZone() {
    const dropCtrl = new window.SimpleDropzone.SimpleDropzone(document.body, this.$input);
    dropCtrl.on("drop", ({ files }) => this.loadFileMaps(files));
    this.$close.onclick = () => {
      this.$dropZone.classList.add("hide");
    };
  }

  loadFileMaps(files: Map<String, File>) {
    const modelReg = /\.(gltf|glb)$/i;
    const imgReg = /\.(jpg|jpeg|png)$/i;
    let mainFile: File;
    let rootPath: string;
    let type = "gltf";
    const filesMap = {}; // [fileName]:LocalUrl
    const fileArray: any = Array.from(files); //['/*/*.*',obj:File]

    fileArray.some(([path, file]) => {
      if (modelReg.test(file.name)) {
        type = RegExp.$1;
        mainFile = file;
        rootPath = path.replace(file.name, ""); // '/somePath/'
        return true;
      }
    });

    fileArray.forEach(([path, file]) => {
      if (!modelReg.test(file.name)) {
        const url = URL.createObjectURL(file);
        const fileName = file.name;
        filesMap[fileName] = url;
        if (imgReg.test(fileName)) {
          this.addTexture(fileName, url);
        }
      }
    });

    if (mainFile) {
      this.dropStart();
      const url = URL.createObjectURL(mainFile);
      this.loadModel(url, filesMap, type as any);
    }
  }

  loadModel(url: string, filesMap: { [key: string]: string }, type: "gltf" | "glb") {
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
            const uri = item.uri;
            if (filesMap[uri]) {
              item.uri = filesMap[uri];
            }
          });
          const blob = new Blob([JSON.stringify(gltf)]);
          const urlNew = URL.createObjectURL(blob);
          this.engine.resourceManager
            .load<GLTFResource>({
              type: AssetType.Prefab,
              url: urlNew + "#.gltf"
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
          type: AssetType.Prefab,
          url: url + "#.glb"
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
    const { defaultSceneRoot, materials, animations } = asset;
    console.log(asset);
    this.dropSuccess();
    this.gltfRootEntity = defaultSceneRoot;
    this.rootEntity.addChild(defaultSceneRoot);

    const meshRenderers = [];
    const skinnedMeshRenderers = [];
    defaultSceneRoot.getComponentsIncludeChildren(MeshRenderer, meshRenderers);
    defaultSceneRoot.getComponentsIncludeChildren(SkinnedMeshRenderer, skinnedMeshRenderers);

    this.setCenter(meshRenderers.concat(skinnedMeshRenderers));
    this.loadMaterialGUI(materials);
    this.loadAnimationGUI(animations);
  }

  addTexture(name: string, url: string) {
    let repeat = Object.keys(this.textures).find((textureName) => textureName === name);
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
        this.loadMaterialGUI();
        console.log("图片上传成功！", name);
      });
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

  loadMaterialGUI(materials?: Material[]) {
    const { gui } = this;
    if (this.materialFolder) {
      gui.removeFolder(this.materialFolder);
      this.materialFolder = null;
    }
    if (!materials) {
      materials = this._materials;
    }
    this._materials = materials;
    if (!materials.length) return;

    const folder = (this.materialFolder = gui.addFolder("Material"));
    const folderName = {};

    materials.forEach((material) => {
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
        const mode1 = f.addFolder("金属模式");
        mode1.add(material, "metallic", 0, 1).step(0.01);
        mode1.add(material, "roughness", 0, 1).step(0.01);
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
        const mode2 = f.addFolder("高光模式");
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
        const common = f.addFolder("通用");

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
    let oasis: Oasis;
    const scripts = [
      { dom: null, url: "https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.7.7/dat.gui.min.js" },
      {
        dom: null,
        url: "https://cdn.jsdelivr.net/npm/simple-dropzone@0.8.1/dist/simple-dropzone.umd.js"
      }
    ];
    Promise.all(
      scripts.map((item) => {
        return new Promise((resolve) => {
          const script = document.createElement("script");
          script.type = "text/javascript";
          document.body.appendChild(script);

          script.onload = () => {
            resolve(void 0);
          };

          script.src = item.url;
          item.dom = script;
        });
      })
    ).then(() => {
      oasis = new Oasis();
    });

    return () => {
      oasis.engine.destroy();
      oasis.gui.destroy();

      scripts.forEach((script) => {
        document.body.removeChild(script.dom);
      });
    };
  });
  return (
    <>
      <WrapperLayout {...props}>
        <div className="page-gltf-view">
          <canvas id="canvas-gltf-viewer" style={{ width: "100%", height: "calc(100vh - 64px)" }}></canvas>
          <input id="input" type="file" className="hide" />
          <div id="dropZone" className="dropZone">
            <img
              id="close"
              className="closeIcon"
              src="https://gw.alipayobjects.com/mdn/mybank_yul/afts/img/A*B7GAQq_VPyIAAAAAAAAAAABkARQnAQ"
              alt=""
            />
            <p>拖拽 gltf 2.0 规范的文件或者文件夹到此页面进行预览</p>
            <p>拖拽支持的图片或者文件夹到此页面，调试纹理贴图</p>
            <br />
            <p>模型格式支持:.gltf .glb .bin</p>
            <p>贴图格式支持:.jpg .png</p>
          </div>
          <div id="spinner" className="spinner hide" />
          <script type="module" src="./src/index.ts"></script>
        </div>
      </WrapperLayout>
    </>
  );
}
