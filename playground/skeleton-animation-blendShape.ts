/**
 * @title Animation BlendShape
 * @category Animation
 */
import { OrbitControl } from "@oasis-engine/controls";
import {
  Animator,
  Camera,
  DirectLight,
  Logger,
  SkinnedMeshRenderer,
  SystemInfo,
  Vector3,
  WebGLEngine
} from "oasis-engine";
import type { GLTFResource } from 'oasis-engine';

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
lightNode.addComponent(DirectLight).intensity = 1.0;
lightNode.transform.lookAt(new Vector3(0, 0, 1));
lightNode.transform.rotate(new Vector3(-45, -135, 0));

engine.resourceManager
  // .load<GLTFResource>("https://gw.alipayobjects.com/os/bmw-prod/f49ed603-c10f-4413-b97b-84f3a5d66b65.glb")
  // .load<GLTFResource>("https://gw.alipayobjects.com/os/bmw-prod/9741528a-4f04-47f7-aad6-b360ecd4ed65.glb")
  .load<GLTFResource>("https://gw.alipayobjects.com/os/bmw-prod/746da3e3-fdc9-4155-8fee-0e2a97de4e72.glb")
  .then((asset) => {
    const { defaultSceneRoot } = asset;
    rootEntity.addChild(defaultSceneRoot);
    const animator = defaultSceneRoot.getComponent(Animator);
    const skinMeshRenderer = defaultSceneRoot.getComponent(SkinnedMeshRenderer);

    skinMeshRenderer.blendShapeWeights[0] = 1.0;

    // animator.play("Square");
    animator.play("TheWave");
    // skinMeshRenderer.blendShapeWeights = new Float32Array([1, 0]);
    // console.log(asset);
    // defaultSceneRoot.transform.rotation = new Vector3(0, 0, 0);
    // console.log(defaultSceneRoot.transform.rotation);
  });

engine.run();
