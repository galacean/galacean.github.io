import { Animation, Camera, DirectLight, EnvironmentMapLight, GLTFResource, Vector3, WebGLEngine } from "oasis-engine";
import { OrbitControl } from "@oasis-engine/controls";

const engine = new WebGLEngine("canvas");
engine.canvas.resizeByClientSize();
const scene = engine.sceneManager.activeScene;
const rootEntity = scene.createRootEntity();

// camera
const cameraEntity = rootEntity.createChild("camera_node");
cameraEntity.transform.position = new Vector3(0, 1, 3);
cameraEntity.addComponent(Camera);
cameraEntity.addComponent(OrbitControl).target = new Vector3(0, 1, 0);

const lightNode = rootEntity.createChild("light_node");
rootEntity.addComponent(EnvironmentMapLight);
lightNode.addComponent(DirectLight).intensity = 0.6;
lightNode.transform.lookAt(new Vector3(0, 0, 1));
lightNode.transform.rotate(new Vector3(0, 90, 0));

engine.resourceManager
  .load<GLTFResource>("https://gw.alipayobjects.com/os/basement_prod/aa318303-d7c9-4cb8-8c5a-9cf3855fd1e6.gltf")
  .then((asset) => {
    const { animations, defaultSceneRoot } = asset;
    rootEntity.addChild(defaultSceneRoot);

    const animator = defaultSceneRoot.getComponent(Animation);
    animator.playAnimationClip(animations[0].name);
  });

engine.run();
