/**
 * @title Gizmo
 * @category Toolkit
 */

/**
 * 本示例展示如何使用Navigation Gizmo控制场景相机, 以及通过Gizmo控制物体移动、缩放、旋转
 */

import {
  AmbientLight,
  AssetType,
  BackgroundMode,
  BlinnPhongMaterial,
  Camera,
  Color,
  DirectLight,
  Entity,
  GLTFResource,
  Layer,
  MeshRenderer,
  PointerButton,
  PrimitiveMesh,
  Script,
  SkyBoxMaterial,
  Vector3,
  WebGLEngine
} from "oasis-engine";
import { LitePhysics } from "@oasis-engine/physics-lite";
import { OrbitControl } from "@oasis-engine-toolkit/controls";
import { FramebufferPicker } from "@oasis-engine-toolkit/framebuffer-picker";
import { NavigationGizmo } from "./navigation-gizmo/src";
import { GizmoControls, GizmoState } from "./gizmo/src";
import * as dat from "dat.gui";

enum LayerSetting {
  Entity = Layer.Layer0,
  Gizmo = Layer.Layer22,
  NavigationGizmo = Layer.Layer30
}

const gui = new dat.GUI();

export class ControlScript extends Script {
  private sceneCamera: Camera;
  private framebufferPicker: FramebufferPicker;
  private gizmoControls: GizmoControls;
  private orbitControl: OrbitControl;

  constructor(entity: Entity) {
    super(entity);
    this.sceneCamera = entity.findByName("fullscreen-camera").getComponent(Camera);

    // FramebufferPicker
    this.framebufferPicker = entity.addComponent(FramebufferPicker);
    this.framebufferPicker.camera = this.sceneCamera;
    this.framebufferPicker.colorRenderPass.mask = LayerSetting.Entity | LayerSetting.Gizmo;

    // orbit Controls
    this.orbitControl = this.sceneCamera.entity.addComponent(OrbitControl);

    // add navigation gizmo
    const navigationGizmo = rootEntity.addComponent(NavigationGizmo);
    navigationGizmo.camera = this.sceneCamera;
    navigationGizmo.layer = LayerSetting.NavigationGizmo;

    // GizmoControls
    const gizmoEntity = this.entity.createChild("editor-gizmo");
    gizmoEntity.layer = LayerSetting.Gizmo;
    this.gizmoControls = gizmoEntity.addComponent(GizmoControls);
    this.gizmoControls.initGizmoControl(this.sceneCamera);
    this.gizmoControls.onGizmoChange(GizmoState.translate);
    this.gizmoControls.onToggleGizmoAnchor(true);
    this.gizmoControls.onToggleGizmoOrient(true);
    gizmoEntity.isActive = false;

    this.addGUI();
  }

  addGUI() {
    const info = {
      Gizmo: GizmoState.translate,
      Orientation: "Global",
      PivotPoint: "Center"
    };
    const gizmoConfig = [GizmoState.translate, GizmoState.rotate, GizmoState.scale];
    const orientationConfig = ["Global", "Local"];
    const pivotConfig = ["Center", "Pivot"];

    gui.add(info, "Gizmo", gizmoConfig).onChange((v: GizmoState) => {
      this.gizmoControls.onGizmoChange(v);
    });

    gui.add(info, "Orientation", orientationConfig).onChange((v) => {
      if (v === "Global") {
        this.gizmoControls.onToggleGizmoOrient(true);
      } else {
        this.gizmoControls.onToggleGizmoOrient(false);
      }
    });

    gui.add(info, "PivotPoint", pivotConfig).onChange((v) => {
      if (v === "Center") {
        this.gizmoControls.onToggleGizmoAnchor(true);
      } else {
        this.gizmoControls.onToggleGizmoAnchor(false);
      }
    });
  }

  _selectHandler(result) {
    const selectedEntity = result?.component?.entity;
    switch (selectedEntity?.layer) {
      case undefined: {
        this.orbitControl.enabled = true;
        this.gizmoControls.onEntitySelected(null);
        this.gizmoControls.entity.isActive = false;
        break;
      }
      case LayerSetting.Entity: {
        this.orbitControl.enabled = true;
        this.gizmoControls.onEntitySelected(selectedEntity);
        this.gizmoControls.entity.isActive = true;
        break;
      }
      case LayerSetting.Gizmo: {
        this.orbitControl.enabled = false;
        break;
      }
    }
  }

  onUpdate(deltaTime: number): void {
    const { inputManager } = this.engine;
    // Handle select.
    if (inputManager.isPointerDown(PointerButton.Primary)) {
      const { pointerPosition } = inputManager;
      if (pointerPosition) {
        this.framebufferPicker.pick(pointerPosition.x, pointerPosition.y).then((result) => {
          this._selectHandler(result);
        });
      }
    }
  }
}

const engine = new WebGLEngine("canvas");
engine.physicsManager.initialize(LitePhysics);
engine.canvas.resizeByClientSize();
const scene = engine.sceneManager.activeScene;
const { background } = scene;
background.solidColor = new Color(0.8, 0.8, 0.8, 1);
const rootEntity = scene.createRootEntity();

// init full screen camera
const cameraEntity = rootEntity.createChild("fullscreen-camera");
const camera = cameraEntity.addComponent(Camera);

cameraEntity.transform.setPosition(0, 10, 10);
cameraEntity.transform.lookAt(new Vector3(0, 0, 0));

// setup scene
const sky = background.sky;
const skyMaterial = new SkyBoxMaterial(engine);
background.mode = BackgroundMode.Sky;

sky.material = skyMaterial;
sky.mesh = PrimitiveMesh.createCuboid(engine, 1, 1, 1);

const lightEntity = rootEntity.createChild("Light");
lightEntity.transform.setRotation(-30, 0, 0);
lightEntity.addComponent(DirectLight);

const bigEntity = rootEntity.createChild("parent");
bigEntity.transform.setPosition(-2, 0, 0);
const bigRenderer = bigEntity.addComponent(MeshRenderer);
bigRenderer.mesh = PrimitiveMesh.createSphere(engine, 0.5);
const mat = new BlinnPhongMaterial(engine);
mat.baseColor.set(0.2, 0.6, 0.8, 1);
bigRenderer.setMaterial(mat);

const smallEntity = bigEntity.createChild("small");
smallEntity.transform.setPosition(0, 3, 0);
const smallRenderer = smallEntity.addComponent(MeshRenderer);
smallRenderer.mesh = PrimitiveMesh.createSphere(engine, 0.3);
smallRenderer.setMaterial(mat);

// add controls
rootEntity.addComponent(ControlScript);

Promise.all([
  engine.resourceManager
    .load<GLTFResource>("https://gw.alipayobjects.com/os/bmw-prod/477b0093-7ee8-41af-a0dd-836608a4f130.gltf")
    .then((gltf) => {
      const { defaultSceneRoot } = gltf;
      rootEntity.addChild(defaultSceneRoot);
      defaultSceneRoot.transform.setScale(100, 100, 100);
    }),
  engine.resourceManager
    .load<AmbientLight>({
      type: AssetType.Env,
      url: "https://gw.alipayobjects.com/os/bmw-prod/89c54544-1184-45a1-b0f5-c0b17e5c3e68.bin"
    })
    .then((ambientLight) => {
      scene.ambientLight = ambientLight;
      skyMaterial.textureCubeMap = ambientLight.specularTexture;
      skyMaterial.textureDecodeRGBM = true;
    })
]).then(() => {
  engine.run();
});
