---
order: 3
title: Draw a Cube
type: Introduction
group: Basic
label: Introduction/Basic
---

This tutorial will take you to draw a cube example:

<playground src="scene-basic.ts"></playground>
## Introduce Module

Next, we start to use [TypeScript](https://www.typescriptlang.org/) to write engine code. If you are not too comfortable with TypeScript, you can run it with JavaScript, and you can also enjoy engine API prompts (by programming with IDEs such as [VSCode](https://code.visualstudio.com/)).

Back to our programming, in order to achieve such a function, we need to introduce the following Galacean Engine classes in our project:

```typescript
import {
  WebGLEngine,
  Camera,
  MeshRenderer,
  PrimitiveMesh,
  BlinnPhongMaterial,
  DirectLight,
  Script,
  Vector3,
  Vector4,
  Color,
} from "@galacean/engine";
```

Let's first briefly understand these classes:

**WebGL Engine Class**:
- [WebGLEngine](${api}rhi-webgl/WebGLEngine): WebGL platform engine, supports WebGL1.0 and WebGL2.0, it can control all behaviors of the canvas, including resource management, scene management, execution/pause/continue, Vertical synchronization and other functions. (See the [Engine](${docs}engine) chapter for details.)

Component class:
- [Camera](${api}core/Camera): The camera is an abstract concept of a graphics engine for 3D projection. It acts like a camera or eyes in the real world. Without a camera, the canvas will not draw anything. (See the [Camera](${docs}camera) chapter for details)
- [DirectLight](${api}core/DirectLight): Direct light is a kind of lighting, lighting makes the scene more layered, and using lighting can create a more realistic three-dimensional scene. (See the [Lighting](${docs}light) chapter for details)
- [Script](${api}core/Script): Script is the link between engine capabilities and game logic. You can use it to extend the engine's functions, or you can write your own games in the life cycle hook function provided by the script component Logic code. (See the [Script](${docs}script) chapter for details)
- [MeshRenderer](${api}core/MeshRenderer): Mesh renderer, which uses a mesh object (a cube in this example) as the data source for the outline of the geometry. (See [Mesh Renderer](${docs}mesh-renderer) section for details)

**Geometry and Material Class**:
- [PrimitiveMesh](${api}core/PrimitiveMesh): Basic geometry, which provides a convenient way to create mesh objects such as cubes and spheres. (See the [Basic Geometry](${docs}primitive-mesh) chapter for details)
- [BlinnPhongMaterial](${api}core/BlinnPhongMaterial): The material defines how to render the cube. The BlinnPhong material is one of the classic materials. (See the [Material](${docs}material) chapter for details)

**Mathematics library related classes**:
-[Vector3](${api}math/Vector3), [Vector4](${api}math/Vector4), [Color](${api}math/Color): These classes are some basic units of mathematical calculations, used to calculate the position and color of the cube. (See the [Mathematics Library](${docs}math) chapter for details)

## Create an Engine Instance

Create an engine instance. The parameter `canvas` is the `id` of the *Canvas* element. If the `id` is different, please replace it yourself. As mentioned above, use the [resizeByClientSize](${api}rhi-webgl/WebCanvas#resizeByClientSize) method to reset the height and width of the canvas.

```typescript
const engine = new WebGLEngine("canvas");
engine.canvas.resizeByClientSize();
```
## Create Scene Root Entity

It is worth noting that an engine instance may contain multiple scene instances. If you want to add a cube to the currently activated scene, you need to obtain the currently activated scene through the engine's scene manager `engine.sceneManager`.

After obtaining the scene, create a **root entity** through the `createRootEntity` method of the scene. The root entity in the scene is the root node of the scene graph.

```typescript
const scene = engine.sceneManager.activeScene;
const rootEntity = scene.createRootEntity('root');
```
## Create a Camera Entity

In Galacean Engine, functions are added to entities in the form of components. First, we first create an entity to add the camera component.

After creating, change the position and orientation of the camera through the transform component `transform` that comes with the entity. Then add the camera component `Camera` to this entity. 


```typescript
let cameraEntity = rootEntity.createChild('camera_entity');

cameraEntity.transform.position = new Vector3(0, 5, 10);
cameraEntity.transform.lookAt(new Vector3(0, 0, 0));

let camera = cameraEntity.addComponent(Camera);
```
## Create a Light

Similarly, the light is also mounted to the entity in the form of components. After creating the entity, add the direct light component `DirectLight`, and set the color, intensity properties and light angle of the direct light component to obtain a suitable lighting effect.

```typescript
let lightEntity = rootEntity.createChild('light');

let directLight = lightEntity.addComponent(DirectLight)
directLight.color = new Color( 1.0, 1.0, 1.0 );
directLight.intensity = 0.5;

lightEntity.transform.rotation = new Vector3(45, 45, 45);

```
## Create a Cube

Create another entity to mount the cube mesh rendering component. `MeshRenderer` is a mesh renderer component. Set the `.mesh` property to the cube data created by `PrimitiveMesh`, and use the `setMaterial` method to set the cube material to BlinnPhong.

```typescript
let cubeEntity = rootEntity.createChild('cube');
let cube = cubeEntity.addComponent(MeshRenderer);
cube.mesh = PrimitiveMesh.createCuboid(engine, 2, 2, 2);
cube.setMaterial(new BlinnPhongMaterial(engine));
```

## Start the Engine

Everything is ready, let's start the engine with one line of code!

```typescript
engine.run();
```