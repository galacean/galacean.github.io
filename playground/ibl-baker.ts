/**
 * @title IBL Baker
 * @category Material
 */
import { DecodeMode, IBLBaker, SphericalHarmonics3Baker } from "@oasis-engine/baker";
import { OrbitControl } from "@oasis-engine/controls";
import * as dat from "dat.gui";
import {
  AssetType,
  Camera,
  CullMode,
  DiffuseMode,
  Entity,
  Logger,
  Material,
  MeshRenderer,
  PBRMaterial,
  PrimitiveMesh,
  Shader,
  SphericalHarmonics3,
  Texture2D,
  TextureCubeFace,
  TextureCube,
  Vector3,
  WebGLEngine
} from "oasis-engine";
Logger.enable();

const gui = new dat.GUI();
//-- create engine object
const engine = new WebGLEngine("canvas");
engine.canvas.resizeByClientSize();

const scene = engine.sceneManager.activeScene;
const { ambientLight } = scene;
const rootEntity = scene.createRootEntity();

//Create camera
const cameraNode = rootEntity.createChild("camera_node");
cameraNode.transform.position = new Vector3(0, 0, 10);
cameraNode.addComponent(Camera);
cameraNode.addComponent(OrbitControl);
Promise.all([
  engine.resourceManager.load<TextureCube>({
    urls: [
      "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*5bs-Sb80qcUAAAAAAAAAAAAAARQnAQ",
      "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*rLUCT4VPBeEAAAAAAAAAAAAAARQnAQ",
      "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*LjSHTI5iSPoAAAAAAAAAAAAAARQnAQ",
      "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*pgCvTJ85RUYAAAAAAAAAAAAAARQnAQ",
      "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*0BKxR6jgRDAAAAAAAAAAAAAAARQnAQ",
      "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*Pir4RoxLm3EAAAAAAAAAAAAAARQnAQ"
    ],
    type: AssetType.TextureCube
  }),
  engine.resourceManager.load<TextureCube>({
    url: "https://gw.alipayobjects.com/os/bmw-prod/10c5d68d-8580-4bd9-8795-6f1035782b94.bin", // sunset_1K
    // url: "https://gw.alipayobjects.com/os/bmw-prod/20d58ffa-c7da-4c54-8980-4efaf91a0239.bin",// pisa_1K
    // url: "https://gw.alipayobjects.com/os/bmw-prod/59b28d9f-7589-4d47-86b0-52c50b973b10.bin", // footPrint_2K
    type: "HDR"
  })
]).then((textures: TextureCube[]) => {
  const ldrCubeMap = textures[0];
  const hdrCubeMap = textures[1];
  const bakedLDRCubeMap = IBLBaker.fromTextureCubeMap(ldrCubeMap, DecodeMode.Gamma) as any;
  const bakedHDRCubeMap = IBLBaker.fromTextureCubeMap(hdrCubeMap, DecodeMode.RGBE) as any;

  ambientLight.specularTexture = bakedHDRCubeMap;
  ambientLight.specularTextureDecodeRGBM = true;

  const sh = new SphericalHarmonics3();
  SphericalHarmonics3Baker.fromTextureCubeMap(bakedHDRCubeMap, DecodeMode.RGBM, sh);
  ambientLight.diffuseMode = DiffuseMode.SphericalHarmonics;
  ambientLight.diffuseSphericalHarmonics = sh;

  engine.run();

  debugIBL(bakedLDRCubeMap, bakedHDRCubeMap);
});

function debugIBL(bakedLDRCubeMap: TextureCube, bakedHDRCubeMap: TextureCube) {
  Shader.create(
    "ibl debug test",
    `
      attribute vec3 POSITION;
      attribute vec2 TEXCOORD_0;
  
      uniform mat4 u_MVPMat;
      varying vec2 v_uv;
  
      void main(){
        gl_Position = u_MVPMat * vec4(POSITION, 1.0);
        v_uv = TEXCOORD_0;
    }
    `,
    `
      uniform sampler2D u_env;
      uniform int face;
      varying vec2 v_uv;
  
      vec4 RGBMToLinear( in vec4 value, in float maxRange ) {
       return vec4( value.rgb * value.a * maxRange, 1.0 );
       }
 
  
      void main(){
        vec2 uv = v_uv;
        if(face == 2){
          uv.x = v_uv.y;
          uv.y= 1.0 - v_uv.x;
        }else if(face == 3){
          uv.x = 1.0 - v_uv.y;
          uv.y=  v_uv.x;
        }
 
        gl_FragColor = RGBMToLinear(texture2D(u_env, uv), 5.0);
  
        gl_FragColor.rgb = pow(gl_FragColor.rgb, vec3(1.0 / 2.2));
      }
      `
  );

  let debugTexture = bakedHDRCubeMap;
  const size = debugTexture.width;

  // Create Sphere
  const sphereEntity = rootEntity.createChild("box");
  sphereEntity.transform.setPosition(-1, 2, 0);
  const sphereMaterial = new PBRMaterial(engine);
  sphereMaterial.roughness = 0;
  sphereMaterial.metallic = 1;
  const renderer = sphereEntity.addComponent(MeshRenderer);
  renderer.mesh = PrimitiveMesh.createSphere(engine, 1, 64);
  renderer.setMaterial(sphereMaterial);

  // Create planes
  const planes = new Array<Entity>(6);
  const planeMaterials = new Array<Material>(6);

  for (let i = 0; i < 6; i++) {
    const bakerEntity = rootEntity.createChild("IBL Baker Entity");
    bakerEntity.transform.setRotation(90, 0, 0);
    const bakerMaterial = new Material(engine, Shader.find("ibl debug test"));
    bakerMaterial.renderState.rasterState.cullMode = CullMode.Off;
    const bakerRenderer = bakerEntity.addComponent(MeshRenderer);
    bakerRenderer.mesh = PrimitiveMesh.createPlane(engine, 2, 2);
    bakerRenderer.setMaterial(bakerMaterial);
    planes[i] = bakerEntity;
    planeMaterials[i] = bakerMaterial;
  }

  planes[0].transform.setPosition(1, 0, 0); // PX
  planes[1].transform.setPosition(-3, 0, 0); // NX
  planes[2].transform.setPosition(1, 2, 0); // PY
  planes[3].transform.setPosition(1, -2, 0); // NY
  planes[4].transform.setPosition(-1, 0, 0); // PZ
  planes[5].transform.setPosition(3, 0, 0); // NZ

  //debug
  gui.add(sphereMaterial, "metallic", 0, 1, 0.01);
  gui.add(sphereMaterial, "roughness", 0, 1, 0.01);

  function changeMip(mipLevel: number) {
    const mipSize = size >> mipLevel;
    for (let i = 0; i < 6; i++) {
      const material = planeMaterials[i];
      const data = new Uint8Array(mipSize * mipSize * 4);
      const planeTexture = new Texture2D(engine, mipSize, mipSize, undefined, false); // no mipmap
      debugTexture.getPixelBuffer(TextureCubeFace.PositiveX + i, 0, 0, mipSize, mipSize, mipLevel, data);
      planeTexture.setPixelBuffer(data);
      material.shaderData.setTexture("u_env", planeTexture);
      material.shaderData.setInt("face", i);
    }
  }

  changeMip(0);

  const state = {
    mipLevel: 0,
    HDR: true
  };

  gui.add(state, "mipLevel", 0, debugTexture.mipmapCount - 1, 1).onChange((mipLevel: number) => {
    changeMip(mipLevel);
  });

  gui.add(state, "HDR").onChange((v) => {
    if (v) {
      debugTexture = bakedHDRCubeMap;
    } else {
      debugTexture = bakedLDRCubeMap;
    }

    ambientLight.specularTexture = debugTexture;
    changeMip(state.mipLevel);
  });
}
