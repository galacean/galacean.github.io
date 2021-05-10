 import { Camera, BlinnPhongMaterial, MeshRenderer, MeshTopology, WebGLEngine, Color, PrimitiveMesh } from "oasis-engine";
 import { FreeControl } from "@oasis-engine/controls";
 
 const engine = new WebGLEngine("canvas");
 engine.canvas.resizeByClientSize();
 const scene = engine.sceneManager.activeScene;
 const rootNode = scene.createRootEntity("root");
 
 // 在场景中创建相机节点、配置位置和目标方向
 const cameraNode = rootNode.createChild("camera_node");
 cameraNode.transform.setPosition(0, 0, 20);
 
 const camera = cameraNode.addComponent(Camera);
 camera.farClipPlane = 2000;
 
 const controler = cameraNode.addComponent(FreeControl);
 controler.movementSpeed = 100;
 controler.rotateSpeed = 1;
 
 const cuboid = PrimitiveMesh.createCuboid(engine, 50, 50, 50);
 const material = new BlinnPhongMaterial(engine);
 material.emissiveColor = new Color(0.5, 0.6, 0.6, 1);
 
 const groundGeometry = PrimitiveMesh.createPlane(engine, 2000, 2000, 100, 100);
 groundGeometry.subMesh.topology = MeshTopology.LineStrip;
 const groundMaterial = new BlinnPhongMaterial(engine);
 groundMaterial.emissiveColor = new Color(1, 1, 1, 1);
 
 // create meshes in scene
 for (let i = 0; i < 100; i++) {
   let cube = rootNode.createChild("cube");
   cube.transform.setPosition(Math.random() * 2000 - 1000, Math.random() * 200, Math.random() * 2000 - 1000);
   const cubeRenderer = cube.addComponent(MeshRenderer);
   cubeRenderer.mesh = cuboid;
   cubeRenderer.setMaterial(material);
 }
 
 // Ground
 const ground = rootNode.createChild("ground");
 ground.transform.setPosition(0, -25, 0);
 ground.transform.rotate(-90, 0, 0);
 const groundRender = ground.addComponent(MeshRenderer);
 groundRender.mesh = groundGeometry;
 groundRender.setMaterial(groundMaterial);
 
 // Run engine
 engine.run();
 