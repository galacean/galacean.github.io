/**
 * @title Planar Shadow
 * @category Light
 */

import {OrbitControl, PlanarShadowMaterial} from "oasis-engine-toolkit";
import {
  Animator,
  BlinnPhongMaterial,
  Camera,
  Color,
  DirectLight,
  GLTFResource,
  Logger,
  MeshRenderer,
  PrimitiveMesh,
  SkinnedMeshRenderer,
  SystemInfo,
  Vector3,
  WebGLEngine
} from "oasis-engine";

Logger.enable();
const engine = new WebGLEngine("canvas");
engine.canvas.width = window.innerWidth * SystemInfo.devicePixelRatio;
engine.canvas.height = window.innerHeight * SystemInfo.devicePixelRatio;
const scene = engine.sceneManager.activeScene;
const rootEntity = scene.createRootEntity();

// camera
const cameraEntity = rootEntity.createChild("camera_node");
cameraEntity.transform.position = new Vector3(0, 1, 5);
cameraEntity.addComponent(Camera);
cameraEntity.addComponent(OrbitControl).target = new Vector3(0, 1, 0);

const lightNode = rootEntity.createChild("light_node");
lightNode.addComponent(DirectLight);
lightNode.transform.setPosition(-10, 10, 10);
lightNode.transform.lookAt(new Vector3(0, 0, 0));

const planeNode = rootEntity.createChild("plane_node");
const renderer = planeNode.addComponent(MeshRenderer);
renderer.mesh = PrimitiveMesh.createPlane(engine, 10, 10);
const planeMat = new BlinnPhongMaterial(engine);
planeMat.baseColor.set(1, 1.0, 0, 1.0);
renderer.setMaterial(planeMat);

engine.resourceManager
  .load<GLTFResource>("https://gw.alipayobjects.com/os/bmw-prod/5e3c1e4e-496e-45f8-8e05-f89f2bd5e4a4.glb")
  .then((asset) => {
    const {defaultSceneRoot} = asset;
    rootEntity.addChild(defaultSceneRoot);
    const animator = defaultSceneRoot.getComponent(Animator);
    const animationNames = animator.animatorController.layers[0].stateMachine.states
      .map((state) => state.name)
      .filter((name) => !name.includes("pose"));

    animator.play(animationNames[0]);

    const lightDir = new Vector3();
    lightNode.transform.getWorldForward(lightDir);
    const shadowMaterial = new PlanarShadowMaterial(engine);
    shadowMaterial.shadowFalloff = 0.2;
    shadowMaterial.shadowColor = new Color(0, 0, 0, 1.0);
    shadowMaterial.planarHeight = 0.01;
    shadowMaterial.lightDirection = lightDir;
    const renderers: SkinnedMeshRenderer[] = [];
    defaultSceneRoot.getComponentsIncludeChildren(SkinnedMeshRenderer, renderers);
    for (let i = 0, n = renderers.length; i < n; i++) {
      const skinRenderer = renderers[i];
      const shadowRenderer = defaultSceneRoot.addComponent(SkinnedMeshRenderer);
      shadowRenderer.mesh = skinRenderer.mesh;
      shadowRenderer.skin = skinRenderer.skin;
      shadowRenderer.setMaterial(shadowMaterial);
    }
  });

engine.run();
