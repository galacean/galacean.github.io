/**
 * @title Tween basic
 * @category Toolkit
 */
import {
  Camera,
  MeshRenderer,
  PrimitiveMesh,
  UnlitMaterial,
  Vector3,
  WebGLEngine
} from "@galacean/engine";
import { Tween } from "@galacean/engine-toolkit-tween";
import * as dat from "dat.gui";

const gui = new dat.GUI();
WebGLEngine.create({ canvas: "canvas" }).then((engine) => {
  engine.run();
  engine.canvas.resizeByClientSize();

  const scene = engine.sceneManager.activeScene;
  const rootEntity = scene.createRootEntity();

  const cameraEntity = rootEntity.createChild("camera_entity");
  cameraEntity.addComponent(Camera);
  cameraEntity.transform.setPosition(0, 0, 15);

  const mesh = PrimitiveMesh.createCuboid(engine, 1, 1, 1);
  const material = new UnlitMaterial(engine);
  const entity = rootEntity.createChild();
  const renderer = entity.addComponent(MeshRenderer);
  renderer.setMaterial(material);
  renderer.mesh = mesh;

  const tween = entity.addComponent(Tween) as Tween<Vector3>;
  tween.target = entity.transform.position;
  tween.to = new Vector3(4, 0, 0);
  tween.from = new Vector3(-4, 0, 0);

  // You can also use event
  tween.event.on(Tween.Events.START, () => {
    console.log("Tween animation is started");
  });
  tween.event.on(Tween.Events.END, () => {
    console.log("Tween animation is ended");
  });
  tween.event.on(Tween.Events.PAUSE, () => {
    console.log("Tween animation is paused by user");
  });
  tween.event.on(Tween.Events.RESUME, () => {
    console.log("Tween animation is resumed by user");
  });
  tween.event.on(Tween.Events.LOOP, () => {
    console.log("Tween animation loop " + tween.currentLoop + " times" );
  });

  addGUI(tween);
});

function addGUI(tween: Tween<Vector3>): void {
  const fromGui = gui.addFolder("from");
  fromGui.add(tween.from!, "x", -5, 5, 0.1);
  fromGui.add(tween.from!, "y", -5, 5, 0.1);
  fromGui.add(tween.from!, "z", -5, 5, 0.1);
  const toGui = gui.addFolder("to");
  toGui.add(tween.from!, "x", -5, 5, 0.1);
  toGui.add(tween.from!, "y", -5, 5, 0.1);
  toGui.add(tween.from!, "z", -5, 5, 0.1);

  const settings = gui.addFolder("settings");
  settings.add(tween, "delay", 0, 1000, 100);
  settings.add(tween, "duration", 0.1, 10, 0.1);
  settings.add(tween, "loop", 0, 10, 1);
  settings.add(tween, "speed", 0, 5, 0.1);
  settings.add(tween, "autoPlay");
  settings.add(tween, "yoyo");
  settings.add(tween, "fillMode", Object.values(Tween.FillMode));
  settings.add(tween, "easing", Object.keys(Tween.Easing));

  gui.add(tween, "play");
  gui.add(tween, "reset");
  gui.add(tween, "pause");
  gui.add(tween, "resume");
}
