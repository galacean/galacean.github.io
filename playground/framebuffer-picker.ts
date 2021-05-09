// import { OrbitControl } from "@oasis-engine/controls";
// import { FramebufferPicker } from "@oasis-engine/framebuffer-picker";
import { AssetType, Camera, Color, EnvironmentMapLight, GLTFResource, LoadItem, TextureCubeMap, Vector3, WebGLEngine } from "oasis-engine";

const engine = new WebGLEngine("canvas");
engine.canvas.resizeByClientSize();

const scene = engine.sceneManager.activeScene;
const rootNode = scene.createRootEntity();
//-- create engine object

let envLightNode = rootNode.createChild("env_light");
let envLight = envLightNode.addComponent(EnvironmentMapLight);

//-- create camera
let cameraNode = rootNode.createChild("camera_node");
cameraNode.transform.position = new Vector3(0, 0, 30);
const camera = cameraNode.addComponent(Camera);
// cameraNode.addComponent(OrbitControl);

const resources: LoadItem[] = [
  { url: "https://gw.alipayobjects.com/os/bmw-prod/83219f61-7d20-4704-890a-60eb92aa6159.gltf" },
  {
    urls: [
      "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*Bk5FQKGOir4AAAAAAAAAAAAAARQnAQ",
      "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*_cPhR7JMDjkAAAAAAAAAAAAAARQnAQ",
      "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*trqjQp1nOMQAAAAAAAAAAAAAARQnAQ",
      "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*_RXwRqwMK3EAAAAAAAAAAAAAARQnAQ",
      "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*q4Q6TroyuXcAAAAAAAAAAAAAARQnAQ",
      "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*DP5QTbTSAYgAAAAAAAAAAAAAARQnAQ"
    ],
    type: AssetType.TextureCube
  },
  {
    urls: [
      "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*5w6_Rr6ML6IAAAAAAAAAAAAAARQnAQ",
      "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*TiT2TbN5cG4AAAAAAAAAAAAAARQnAQ",
      "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*8GF6Q4LZefUAAAAAAAAAAAAAARQnAQ",
      "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*D5pdRqUHC3IAAAAAAAAAAAAAARQnAQ",
      "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*_FooTIp6pNIAAAAAAAAAAAAAARQnAQ",
      "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*CYGZR7ogZfoAAAAAAAAAAAAAARQnAQ"
    ],
    type: AssetType.TextureCube
  }
];

engine.resourceManager.load(resources).then((res) => {
  const gltf = <GLTFResource>res[0];

  let mesh = gltf.meshes[0];
  for (let x = 0; x < 5; x++) {
    for (let y = 0; y < 5; y++) {
      let testNode = rootNode.createChild("test_mesh" + x + y);
      testNode.addChild(gltf.defaultSceneRoot.clone());
      testNode.transform.position = new Vector3((x - 2) * 5, (y - 2) * 5, 0);
    }
  }

  envLight.diffuseTexture = <TextureCubeMap>res[1];
  envLight.specularTexture = <TextureCubeMap>res[2];

  // framebuffer picker
  let lastMaterial;
  let laseBaseColor;
  let framebufferPicker = rootNode.addComponent(FramebufferPicker);
  framebufferPicker.camera = camera;
  framebufferPicker.onPick = (obj) => {
    if (lastMaterial) lastMaterial.baseColor = laseBaseColor;

    if (obj) {
      const { primitive, component } = obj;
      let material = component.getInstanceMaterial();

      lastMaterial = material;
      laseBaseColor = material.baseColor;
      material.baseColor = new Color(1, 0, 0, 1);
    }
  };

  document.getElementById("canvas").addEventListener("mousedown", (e) => {
    // console.log(e.offsetX, e.offsetY);
    // framebufferPicker.pick(e.offsetX, e.offsetY);
  });
});

//-- run
engine.run();
