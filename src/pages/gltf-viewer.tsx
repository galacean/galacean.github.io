/* eslint-disable no-console */
/* eslint no-multi-assign: "off" */
/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint no-underscore-dangle: 0 */
import { OrbitControl } from "@oasis-engine/controls";
import type { AnimationClip, Entity, Material, Scene, Texture2D, TextureCubeMap } from "oasis-engine";
import {
  Animator,
  AssetType,
  BackgroundMode,
  BoundingBox,
  Camera,
  Color,
  DiffuseMode,
  DirectLight,
  MeshRenderer,
  PBRBaseMaterial,
  PBRMaterial,
  PBRSpecularMaterial,
  PrimitiveMesh,
  SkinnedMeshRenderer,
  SkyBoxMaterial,
  SphericalHarmonics3,
  UnlitMaterial,
  Vector3,
  WebGLEngine
} from "oasis-engine";
import React, { useEffect } from "react";
import WrapperLayout from "../components/layout";
import "./gltf-viewer.less";

const envList = {
  sky: {
    url: [
      "https://gw.alipayobjects.com/mdn/rms_475770/afts/img/A*Gi7CTZqKuacAAAAAAAAAAABkARQnAQ",
      "https://gw.alipayobjects.com/mdn/rms_475770/afts/img/A*iRRMQIExwKMAAAAAAAAAAABkARQnAQ",
      "https://gw.alipayobjects.com/mdn/rms_475770/afts/img/A*ZIcPQZo20sAAAAAAAAAAAABkARQnAQ",
      "https://gw.alipayobjects.com/mdn/rms_475770/afts/img/A*SPYuTbHT-KgAAAAAAAAAAABkARQnAQ",
      "https://gw.alipayobjects.com/mdn/rms_475770/afts/img/A*mGUERbY77roAAAAAAAAAAABkARQnAQ",
      "https://gw.alipayobjects.com/mdn/rms_475770/afts/img/A*ilkPS7A1_JsAAAAAAAAAAABkARQnAQ"
    ],
    sh: [
      1.4536975622177124, 1.2322516441345215, 0.8864129185676575, -0.44435063004493713, -0.2984199821949005,
      -0.04654404893517494, 0.2504007816314697, 0.23473940789699554, 0.10485957562923431, -0.22722581028938293,
      -0.23118487000465393, -0.1346835047006607, 0.2024701088666916, 0.18827538192272186, 0.07655547559261322,
      -0.26720723509788513, -0.24846990406513214, -0.1269611418247223, 0.1128435879945755, 0.07063852250576019,
      0.008191842585802078, -0.06712324172258377, -0.12072498351335526, -0.10238106548786163, 0.1859109252691269,
      0.10431329905986786, -0.017114786431193352
    ]
  },
  house: {
    url: [
      "https://gw.alipayobjects.com/mdn/rms_475770/afts/img/A*1gjTQ7P2mQoAAAAAAAAAAABkARQnAQ",
      "https://gw.alipayobjects.com/mdn/rms_475770/afts/img/A*entSR7DylL0AAAAAAAAAAABkARQnAQ",
      "https://gw.alipayobjects.com/mdn/rms_475770/afts/img/A*izQBQY_vs_4AAAAAAAAAAABkARQnAQ",
      "https://gw.alipayobjects.com/mdn/rms_475770/afts/img/A*x3XnRpq1U-EAAAAAAAAAAABkARQnAQ",
      "https://gw.alipayobjects.com/mdn/rms_475770/afts/img/A*k7FsT5Gprn0AAAAAAAAAAABkARQnAQ",
      "https://gw.alipayobjects.com/mdn/rms_475770/afts/img/A*8LdBQ6ixiQAAAAAAAAAAAABkARQnAQ"
    ],
    sh: [
      0.8962685465812683, 0.7656264901161194, 0.5087476968765259, -0.5958908200263977, -0.47178128361701965,
      -0.4705639183521271, 0.12607601284980774, 0.059399981051683426, 0.029415369033813477, -0.12036323547363281,
      -0.08801775425672531, -0.06222928687930107, 0.10942810773849487, 0.07969340682029724, 0.07417184114456177,
      0.040593646466732025, 0.0655241310596466, 0.05116600915789604, -0.0007216486847028136, 0.013710534200072289,
      -0.03733639046549797, -0.17561253905296326, -0.1475340873003006, -0.10067987442016602, -0.24986475706100464,
      -0.21295468509197235, -0.25329700112342834
    ]
  },
  sunnyDay: {
    url: [
      "https://gw.alipayobjects.com/mdn/rms_475770/afts/img/A*4ZY8T4GpKwYAAAAAAAAAAABkARQnAQ",
      "https://gw.alipayobjects.com/mdn/rms_475770/afts/img/A*8QbJQZwS1wUAAAAAAAAAAABkARQnAQ",
      "https://gw.alipayobjects.com/mdn/rms_475770/afts/img/A*a54kSZ3LmAQAAAAAAAAAAABkARQnAQ",
      "https://gw.alipayobjects.com/mdn/rms_475770/afts/img/A*8CbfTb1yG8MAAAAAAAAAAABkARQnAQ",
      "https://gw.alipayobjects.com/mdn/rms_475770/afts/img/A*Yi4ZRZbdj8MAAAAAAAAAAABkARQnAQ",
      "https://gw.alipayobjects.com/mdn/rms_475770/afts/img/A*KddxSriLYjoAAAAAAAAAAABkARQnAQ"
    ],
    sh: [
      0.49732351303100586, 0.8204453587532043, 1.1980727910995483, -0.047882016748189926, 0.019423319026827812,
      0.061979617923498154, -0.05293811112642288, -0.05558563023805618, -0.05352041870355606, 0.018472276628017426,
      0.01944858208298683, 0.02016768604516983, -0.011690393090248108, -0.015611638315021992, -0.01910223439335823,
      0.03366464003920555, 0.041282784193754196, 0.04779789596796036, 0.358532577753067, 0.4352142810821533,
      0.44211071729660034, -0.11810286343097687, -0.12507741153240204, -0.1150369867682457, 0.33062830567359924,
      0.44129398465156555, 0.47715216875076294
    ]
  },
  miniSampler: {
    url: [
      "https://gw.alipayobjects.com/mdn/rms_475770/afts/img/A*IuyGR4bdwg4AAAAAAAAAAABkARQnAQ",
      "https://gw.alipayobjects.com/mdn/rms_475770/afts/img/A*4rv5RZ0kll4AAAAAAAAAAABkARQnAQ",
      "https://gw.alipayobjects.com/mdn/rms_475770/afts/img/A*cHitTpWoJjoAAAAAAAAAAABkARQnAQ",
      "https://gw.alipayobjects.com/mdn/rms_475770/afts/img/A*RCEbS6k5x18AAAAAAAAAAABkARQnAQ",
      "https://gw.alipayobjects.com/mdn/rms_475770/afts/img/A*IRc7R7cl4CcAAAAAAAAAAABkARQnAQ",
      "https://gw.alipayobjects.com/mdn/rms_475770/afts/img/A*y_4hRYVgzQ4AAAAAAAAAAABkARQnAQ"
    ],
    sh: [
      0.20824000239372253, 0.23156625032424927, 0.30640628933906555, -0.032208919525146484, -0.03681790828704834,
      -0.08673757314682007, 0.026594972237944603, 0.04329078644514084, 0.06584044545888901, -0.18646225333213806,
      -0.25607162714004517, -0.3791993260383606, 0.040871474891901016, 0.0778534933924675, 0.1789904683828354,
      0.022585343569517136, 0.010101129300892353, -0.004903033375740051, -0.04522740840911865, -0.0497514046728611,
      -0.09917914122343063, -0.00019472345593385398, -0.01602073200047016, -0.051514893770217896, 0.11432443559169769,
      0.18823105096817017, 0.2658124566078186
    ]
  },
  road: {
    url: [
      "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*4ebgQaWOLaIAAAAAAAAAAAAAARQnAQ",
      "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*i56eR6AbreUAAAAAAAAAAAAAARQnAQ",
      "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*3wYERKsel5oAAAAAAAAAAAAAARQnAQ",
      "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*YiG7Srwmb3QAAAAAAAAAAAAAARQnAQ",
      "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*VUUwQrAv47sAAAAAAAAAAAAAARQnAQ",
      "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*Dn2qSoqzfwoAAAAAAAAAAAAAARQnAQ"
    ],
    sh: [
      0.2990323305130005, 0.46782827377319336, 0.6490488052368164, -0.08325951546430588, -0.1739923506975174,
      -0.3481740653514862, 0.12110518664121628, 0.10342133790254593, 0.0647989809513092, 0.013654923066496849,
      0.019375042989850044, 0.019014855846762657, -0.010647064074873924, -0.0158681683242321, -0.01735353097319603,
      -0.06292672455310822, -0.06085652485489845, -0.04486454278230667, 0.19867956638336182, 0.21928717195987701,
      0.19299709796905518, 0.01943504437804222, 0.03246982768177986, 0.04340629279613495, 0.13364768028259277,
      0.19655625522136688, 0.21748234331607819
    ]
  }
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
  sh: Record<string, SphericalHarmonics3> = {};
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
              urls: envList[name].url
            };
          })
        )
        .then((textures) => {
          (textures as any).forEach((texture: TextureCubeMap, index) => {
            const name = names[index];
            this.cubeTextures[name] = texture;

            if (envList[name].sh) {
              const sh = new SphericalHarmonics3();
              sh.setValueByArray(envList[name].sh);
              this.sh[name] = sh;
            } else {
              // const sh = new SphericalHarmonics3();
              // SphericalHarmonics3Baker.fromTextureCubeMap(texture, sh);
              // const out = [];
              // sh.toArray(out);
              // console.log(name, out);
              // this.sh[name] = sh;
            }

            if (name === this.state.envTexture) {
              this.scene.ambientLight.specularTexture = texture;
              this.scene.ambientLight.diffuseMode = DiffuseMode.SphericalHarmonics;
              this.scene.ambientLight.diffuseSphericalHarmonics = this.sh[name];
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

        this.scene.ambientLight.diffuseSphericalHarmonics = v === "None" ? null : this.sh[v];
        this.scene.ambientLight.diffuseMode = v === "None" ? DiffuseMode.SolidColor : DiffuseMode.SphericalHarmonics;
      });

    lightFolder.add(this.scene.ambientLight, "specularIntensity", 0, 2);
    lightFolder.add(this.scene.ambientLight, "diffuseIntensity", 0, 2);
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
  }

  loadFileMaps(files: Map<string, File>) {
    const modelReg = /\.(gltf|glb)$/i;
    const imgReg = /\.(jpg|jpeg|png)$/i;
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
            const { uri } = item;
            if (filesMap[uri]) {
              item.uri = filesMap[uri];
            }
          });
          const blob = new Blob([JSON.stringify(gltf)]);
          const urlNew = URL.createObjectURL(blob);
          this.engine.resourceManager
            .load<GLTFResource>({
              type: AssetType.Prefab,
              url: `${urlNew}#.gltf`
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
          url: `${url}#.glb`
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
      { dom: null, url: "https://gw.alipayobjects.com/os/lib/dat.gui/0.7.7/build/dat.gui.min.js" },
      {
        dom: null,
        url: "https://gw.alipayobjects.com/os/lib/simple-dropzone/0.8.1/dist/simple-dropzone.umd.js"
      }
    ];
    Promise.all(
      scripts.map((item) => {
        return new Promise((resolve) => {
          const script = document.createElement("script");
          script.type = "text/javascript";
          document.body.appendChild(script);

          script.onload = () => {
            resolve(undefined);
          };

          script.src = item.url;
          item.dom = script;
        });
      })
    ).then(() => {
      oasis = new Oasis();
    });

    return () => {
      scripts.forEach((script) => {
        document.body.removeChild(script.dom);
      });
      oasis.gui.destroy();
      oasis.engine.destroy();
    };
  });
  return (
    <>
      <WrapperLayout {...props}>
        <div className="page-gltf-view">
          <canvas id="canvas-gltf-viewer" style={{ width: "100%", height: "calc(100vh - 64px)" }} />
          <input id="input" type="file" className="hide" />
          <div id="dropZone" className="dropZone">
            <p>Drag glTF2.0 and texture files or folder on the viewport</p>
          </div>
          <div id="spinner" className="spinner hide" />
          <script type="module" src="./src/index.ts" />
        </div>
      </WrapperLayout>
    </>
  );
}
