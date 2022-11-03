/**
 * @title Gizmo
 * @category Toolkit
 */

/**
 * 本示例展示如何使用Navigation Gizmo控制场景相机, 以及通过Gizmo控制物体移动、缩放、旋转
 */

import {
  Camera,
  Color,
  DirectLight,
  Entity,
  GLTFResource,
  Layer,
  PointerButton,
  Script,
  Vector3,
  WebGLEngine
} from "oasis-engine";
import { LitePhysics } from "@oasis-engine/physics-lite";
import { OrbitControl } from "@oasis-engine-toolkit/controls";
import { FramebufferPicker } from "@oasis-engine-toolkit/framebuffer-picker";
import { NavigationGizmo } from "@oasis-engine-toolkit/navigation-gizmo";
import { AnchorType, CoordinateType, Gizmo, State } from "@oasis-engine-toolkit/gizmo";

import * as dat from "dat.gui";

enum LayerSetting {
  Entity = Layer.Layer22,
  Gizmo = Layer.Layer29,
  NavigationGizmo = Layer.Layer30
}

const gui = new dat.GUI();

export class ControlScript extends Script {
  private _sceneCamera: Camera;
  private _framebufferPicker: FramebufferPicker;
  private _navigator: NavigationGizmo;
  private _gizmo: Gizmo;
  private _orbitControl: OrbitControl;

  constructor(entity: Entity) {
    super(entity);
    this._sceneCamera = entity.findByName("fullscreen-camera").getComponent(Camera);

    // add framebufferPicker
    this._framebufferPicker = entity.addComponent(FramebufferPicker);
    this._framebufferPicker.camera = this._sceneCamera;
    this._framebufferPicker.colorRenderPass.mask = LayerSetting.Entity | LayerSetting.Gizmo;

    // add orbit control
    this._orbitControl = this._sceneCamera.entity.addComponent(OrbitControl);

    // add navigation gizmo
    const navigationGizmo = rootEntity.addComponent(NavigationGizmo);
    navigationGizmo.camera = this._sceneCamera;
    navigationGizmo.layer = LayerSetting.NavigationGizmo;
    this._navigator = navigationGizmo;

    // add gizmo
    const gizmoEntity = this.entity.createChild("editor-gizmo");
    const gizmo = gizmoEntity.addComponent(Gizmo);
    gizmo.camera = this._sceneCamera;
    gizmo.state = State.scale;
    gizmo.layer = LayerSetting.Gizmo;
    this._gizmo = gizmo;

    gizmoEntity.isActive = false;

    this._addGUI();
  }

  onUpdate(deltaTime: number): void {
    this._navigator.target = this._orbitControl.target;
    const { inputManager } = this.engine;
    // single select.
    if (inputManager.isPointerDown(PointerButton.Primary)) {
      const { pointerPosition } = inputManager;
      if (pointerPosition) {
        this._framebufferPicker.pick(pointerPosition.x, pointerPosition.y).then((result) => {
          this._singleSelectHandler(result);
        });
      }
    }
    // multi select
    if (inputManager.isPointerDown(PointerButton.Secondary)) {
      const { pointerPosition } = inputManager;
      if (pointerPosition) {
        this._framebufferPicker.pick(pointerPosition.x, pointerPosition.y).then((result) => {
          this._multiSelectHandler(result);
        });
      }
    }
  }

  // left mouse for single selection
  private _singleSelectHandler(result: RenderElement) {
    const selectedEntity = result?.component?.entity;
    switch (selectedEntity?.layer) {
      case undefined: {
        this._orbitControl.enabled = true;
        this._gizmo.clearEntity();
        this._gizmo.entity.isActive = false;
        break;
      }
      case LayerSetting.Entity: {
        this._orbitControl.enabled = true;
        this._gizmo.clearEntity();
        this._gizmo.addEntity(selectedEntity);
        this._gizmo.entity.isActive = true;
        break;
      }
      case LayerSetting.Gizmo: {
        this._orbitControl.enabled = false;
        break;
      }
    }
  }

  // right mouse for multiply selection
  private _multiSelectHandler(result: RenderElement) {
    const selectedEntity = result?.component?.entity;
    switch (selectedEntity?.layer) {
      case LayerSetting.Entity: {
        this._orbitControl.enabled = true;
        if (!this._gizmo.addEntity(selectedEntity)) {
          this._gizmo.removeEntity(selectedEntity);
        }
        this._gizmo.entity.isActive = true;
        break;
      }
    }
  }

  private _addGUI() {
    const info = {
      Gizmo: State.translate,
      Coordinate: CoordinateType.Local,
      Anchor: AnchorType.Center
    };
    const gizmoConfig = ["null", "translate", "rotate", "scale"];
    const orientationConfig = ["global", "local"];
    const pivotConfig = ["center", "pivot"];

    gui
      .add(info, "Gizmo", gizmoConfig)
      .onChange((v: string) => {
        switch (v) {
          case "null":
            this._gizmo.state = null;
            break;
          case "translate":
            this._gizmo.state = State.translate;
            break;
          case "rotate":
            this._gizmo.state = State.rotate;
            break;
          case "scale":
            this._gizmo.state = State.scale;
            break;
          case "all":
            this._gizmo.state = State.all;
            break;
        }
      })
      .setValue("all");

    gui
      .add(info, "Coordinate", orientationConfig)
      .onChange((v: string) => {
        switch (v) {
          case "global":
            this._gizmo.coordType = CoordinateType.Global;
            break;
          case "local":
            this._gizmo.coordType = CoordinateType.Local;
            break;
        }
      })
      .setValue("local");

    gui
      .add(info, "Anchor", pivotConfig)
      .onChange((v: string) => {
        switch (v) {
          case "center":
            this._gizmo.anchorType = AnchorType.Center;
            break;
          case "pivot":
            this._gizmo.anchorType = AnchorType.Pivot;
            break;
        }
      })
      .setValue("center");
  }
}

const traverseEntity = (entity: Entity, callback: (entity: Entity) => any) => {
  callback(entity);
  for (const child of entity.children) {
    traverseEntity(child, callback);
  }
};

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
cameraEntity.transform.setPosition(15, 9, 15);
cameraEntity.transform.lookAt(new Vector3(0, 0, 0));

// setup scene
const lightEntity = rootEntity.createChild("Light");
lightEntity.transform.setPosition(20, 20, 20);
lightEntity.transform.setRotation(-45, 0, 0);
lightEntity.addComponent(DirectLight);

const ambientLight = scene.ambientLight;
ambientLight.diffuseSolidColor.set(0.8, 0.8, 1, 1);
ambientLight.diffuseIntensity = 0.5;

// add controls
rootEntity.addComponent(ControlScript);

engine.resourceManager
  .load<GLTFResource>(
    "https://gw.alipayobjects.com/os/OasisHub/34156c78-ed78-4792-a027-f6b790ac5bd1/oasis-file/1664436920180/medieval_fantasy_tavern.gltf"
  )
  .then((gltf) => {
    const { defaultSceneRoot } = gltf;
    rootEntity.addChild(defaultSceneRoot);
    traverseEntity(defaultSceneRoot, (entity) => {
      entity.layer = LayerSetting.Entity;
    });
  })
  .then(() => {
    engine.run();
  });
