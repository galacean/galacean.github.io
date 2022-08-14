/**
 * @title Planar Shadow
 * @category Toolkit
 */
import { OrbitControl } from "@oasis-engine-toolkit/controls";
import {
  Animator,
  BlinnPhongMaterial,
  Camera,
  DirectLight,
  GLTFResource,
  Logger,
  MeshRenderer,
  PrimitiveMesh,
  Vector3,
  WebGLEngine
} from "oasis-engine";

import { Color } from "oasis-engine";
import { PlanarShadowMaterial } from "oasis-engine-toolkit";
/**
 * Planar Shadow
 */

Logger.enable();
const engine = new WebGLEngine("canvas");
engine.canvas.resizeByClientSize();
const scene = engine.sceneManager.activeScene;
const rootEntity = scene.createRootEntity();
scene.background.solidColor = new Color(0.9, 0.2, 0.2, 1.0);

const cameraEntity = rootEntity.createChild("camera_node");
cameraEntity.transform.setPosition(0, 1, 5);
cameraEntity.addComponent(Camera);
cameraEntity.addComponent(OrbitControl).target = new Vector3(0, 1, 0);

const lightEntity = rootEntity.createChild("light_node");
lightEntity.addComponent(DirectLight);
lightEntity.transform.setPosition(-10, 10, 10);
lightEntity.transform.lookAt(new Vector3(0, 0, 0));

const planeEntity = rootEntity.createChild("plane_node");
const renderer = planeEntity.addComponent(MeshRenderer);
renderer.mesh = PrimitiveMesh.createPlane(engine, 10, 10);
const planeMaterial = new BlinnPhongMaterial(engine);
planeMaterial.baseColor.set(1, 1.0, 0, 1.0);
renderer.setMaterial(planeMaterial);

engine.resourceManager
  .load<GLTFResource>("https://gw.alipayobjects.com/os/bmw-prod/5e3c1e4e-496e-45f8-8e05-f89f2bd5e4a4.glb")
  .then((asset) => {
    const { defaultSceneRoot } = asset;
    rootEntity.addChild(defaultSceneRoot);

    const animator = defaultSceneRoot.getComponent(Animator);
    animator.play(asset.animations[0].name);

    const lightDirection = new Vector3();
    lightEntity.transform.getWorldForward(lightDirection);

    const renderers = new Array<MeshRenderer>();
    defaultSceneRoot.getComponentsIncludeChildren(MeshRenderer, renderers);

    for (let i = 0, n = renderers.length; i < n; i++) {
      const renderer = renderers[i];
      const shadowMaterial = new PlanarShadowMaterial(engine);
      // copy origin material shader data to shadow material shader data.
      renderer.getMaterial().shaderData.cloneTo(shadowMaterial.shaderData);
      shadowMaterial.shadowFalloff = 0.2;
      shadowMaterial.shadowColor.set(0, 0, 0, 1.0);
      shadowMaterial.planarHeight = 0.01;
      shadowMaterial.lightDirection = lightDirection;

      renderer.setMaterial(shadowMaterial);
    }
  });

engine.run();
