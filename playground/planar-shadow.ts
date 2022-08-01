/**
 * @title Planar Shadow
 * @category Toolkit
 */
import { OrbitControl } from "@oasis-engine-toolkit/controls";
import { PlanarShadowMaterial } from "@oasis-engine-toolkit/planar-shadow-material";
import {
  Animator,
  BlinnPhongMaterial,
  Camera,
  DirectLight,
  GLTFResource,
  Logger,
  MeshRenderer,
  PrimitiveMesh,
  SkinnedMeshRenderer,
  Vector3,
  WebGLEngine
} from "oasis-engine";

Logger.enable();
const engine = new WebGLEngine("canvas");
engine.canvas.resizeByClientSize();
const scene = engine.sceneManager.activeScene;
const rootEntity = scene.createRootEntity();

// camera
const cameraEntity = rootEntity.createChild("camera_node");
cameraEntity.transform.setPosition(0, 1, 5);
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
    const { defaultSceneRoot } = asset;
    rootEntity.addChild(defaultSceneRoot);
    const animator = defaultSceneRoot.getComponent(Animator);
    animator.play(asset.animations[0].name);

    const lightDir = new Vector3();
    lightNode.transform.getWorldForward(lightDir);
    const shadowMaterial = new PlanarShadowMaterial(engine);
    shadowMaterial.shadowFalloff = 0.2;
    shadowMaterial.shadowColor.set(0, 0, 0, 1.0);
    shadowMaterial.planarHeight = 0.01;
    shadowMaterial.lightDirection = lightDir;
    const renderers: SkinnedMeshRenderer[] = [];
    defaultSceneRoot.getComponentsIncludeChildren(SkinnedMeshRenderer, renderers);
    for (let i = 0, n = renderers.length; i < n; i++) {
      const skinRenderer = renderers[i];
      const shadowRenderer = skinRenderer.entity.addComponent(SkinnedMeshRenderer);
      shadowRenderer.mesh = skinRenderer.mesh;
      shadowRenderer.skin = skinRenderer.skin;
      shadowRenderer.setMaterial(shadowMaterial);
    }
  });

engine.run();
