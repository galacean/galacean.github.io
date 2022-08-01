/**
 * @title Skeleton Viewer
 * @category Toolkit
 */
import { Animator, Camera, GLTFResource, Vector3, WebGLEngine } from "oasis-engine";
import { OrbitControl } from "@oasis-engine-toolkit/controls";
import { SkeletonViewer } from "@oasis-engine-toolkit/skeleton-viewer";

const engine = new WebGLEngine("canvas");
engine.canvas.resizeByClientSize();
const scene = engine.sceneManager.activeScene;
const rootNode = scene.createRootEntity();
scene.ambientLight.diffuseSolidColor.set(1, 1, 1, 1);

// Create camera
const cameraEntity = rootNode.createChild("camera_node");
cameraEntity.transform.position = new Vector3(10, 10, 30);
cameraEntity.addComponent(Camera);
const control = cameraEntity.addComponent(OrbitControl);
control.target.set(0, 3, 0);

engine.resourceManager
  .load<GLTFResource>("https://gw.alipayobjects.com/os/bmw-prod/f40ef8dd-4c94-41d4-8fac-c1d2301b6e47.glb")
  .then((gltf) => {
    const { defaultSceneRoot, animations } = gltf;
    const animator = defaultSceneRoot.getComponent(Animator);
    defaultSceneRoot.transform.setScale(0.1, 0.1, 0.1);
    rootNode.addChild(defaultSceneRoot);
    animator.play(animations[1].name);

    defaultSceneRoot.addComponent(SkeletonViewer);
  });

// Run
engine.run();
