---
order: 2
title: Scene
type: Core
label: Core
---

As a scene unit, Scene can facilitate entity tree management, especially for large-scale game scenes. For example, **scene1** and **scene2** are two different scenes, each independently manages its own **Entity** tree, so the lighting components, rendering components and physical components in the scene are also isolated from each other , do not affect each other. We can render one or more Scenes at the same time, or dynamically switch Scenes according to project logic at specific times.

Structurally, each Engine can contain one or more active scenes. Each Scene can have multiple root entities.

## Scene management

| Properties                                         | Explanation     |
| :------------------------------------------------- | :-------------- |
| [scenes](${api}core/SceneManager#scenes) | Scene list |

| Methods                                            | Explanation  |
| :------------------------------------------------- | :----------- |
| [addScene](${api}core/SceneManager#addScene) | Add scene |
| [removeScene](${api}core/SceneManager#removeScene) | Remove scene |
| [mergeScenes](${api}core/SceneManager#mergeScenes) | Merge scenes |
| [loadScene](${api}core/SceneManager#loadScene)     | Load scene   |

### Basic usage

#### 1. Add/Remove Scene

Adding and removing **Scene** is very simple, just call `addScene()` and `removeScene()` of `engine.sceneManager`, and multiple scenes can be added and rendered at the same time.

```typescript
// Suppose there are two scenes
const scene1, scene2;

// Add scene1
engine.sceneManager.addScene(scene1);

// Add scene2
engine.sceneManager.addScene(scene1);

// Remove scene2
engine.sceneManager.removeScene(scene2);
```

#### 2. Merge scenes

If you want to activate multiple scenes at the same time, you can use `engine.sceneManager.mergeScenes` to merge 2 scenes into 1 scene.

```typescript
// Suppose there are two inactive scenes
const sourceScene, destScene;

// Merge sourceScene into destScene
engine.sceneManager.mergeScenes(sourceScene, destScene);

// Activate destScene
engine.sceneManager.addScene(destScene);
```

#### 3. Load scene

If you want to load the **Scene** asset in the application, you can pass an url to `engine.sceneManager.loadScene` method.

```typescript
const sceneUrl = "...";

engine.resourceManager.load({ type: AssetType.Scene, url: "..." }).then(scene=>{
  engine.sceneManager.addScene(scene);
});
```

#### 4. Destroy scene

Call `scene.destroy()` will destroy the scene.

#### 4. Set background of scene

The scene background supports adding pure colors and sky:

```typescript
const scene = engine.sceneManager.scenes[0];
const { background } = scene;

// Add a solid color background
background.mode = BackgroundMode.SolidColor; // That's the default value of mode
background.solidColor.set(1, 1, 1, 1); // White

// Add a skybox background
background.mode = BackgroundMode.Sky;
const skyMaterial = (background.sky.material = new SkyBoxMaterial(engine)); // Set the material of skybox
skyMaterial.texture = textureCube; // Set the cube texture of material
background.sky.mesh = PrimitiveMesh.createCuboid(engine, 2, 2, 2); // Set the mesh of the skybox
```

The playground example:

<playground src="background.ts"></playground>

#### 5. Set the scene ambient light

AmbientLight setting of the scene:

```typescript
const scene = engine.sceneManager.scenes[0];
scene.ambientLight.diffuseSolidColor.set(1, 1, 1, 1);
```

## Entity tree management

### Basic usage

```typescript
const engine = await WebGLEngine.create({ canvas: "demo" });
const scene = engine.sceneManager.scenes[0];

// Create root entity
const rootEntity = scene.createRootEntity();

// Add entities to the scene
scene.addRootEntity(rootEntity);

// Delete the root entity
scene.removeRootEntity(rootEntity);

// Find the root entity
const allEntities: Readonly<Entity[]> = scene.rootEntities;

const entity2 = scene.getRootEntity(2);
```

### Methods

| Methods | Explanations |
| :-- | :-- |
| [createRootEntity](${api}core/Scene#createRootEntity) | The newly created _scene_ has no root entity by default and needs to be created manually |
| [addRootEntity](${api}core/Scene#addRootEntity) | You can create a new entity directly, or add an existing entity |
| [removeRootEntity](${api}core/Scene#removeRootEntity) | Delete the root entity |
| [getRootEntity](${api}core/Scene#getRootEntity) | Find the root entity, you can get all the root entities, or a single entity object. Note that all entities are read-only arrays, and the length and order cannot be changed |

## Other tips

Note that if the rendered image is need to show on the screen or off-screen, the [Camera](${api}core/Camera) must be added on the entity in the current _scene_. The method of mounting the camera is as follows:

```typescript
const cameraEntity = rootEntity.createChild("camera");

cameraEntity.addComponent(Camera);
```
