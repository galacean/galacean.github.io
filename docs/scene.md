---
order: 2
title: Scene
type: Core
---

Scene can manage the entity tree, especially large game scenes. For example, **scene1** and **scene2** are two different scenes and do not need to be loaded for activation and rendering at the same time. Then we can divide them into different scenes through modeling software or code logic. Activating the corresponding scenes separately or merging scenes at the appropriate time.

## Scene management

|  Properties                                         | Explanation     |
| :------------------------------------------------- | :------- |
| [activeScene](${api}core/SceneManager#activeScene) | Activated scene |

| Methods                                           | Explanation    |
| :------------------------------------------------- | :------- |
| [mergeScenes](${api}core/SceneManager#mergeScenes) | Merge scenes|
| [loadScene](${api}core/SceneManager#loadScene)     | Load scene |

### Basic usage

#### 1. Active Scene

Activating **Scene** is easy, just assign the **scene** you want to activate to `engine.sceneManager.activeScene`.

```typescript
// Suppose there are two inactive scenes
const scene1, scene2;

// Activate scene1
engine.sceneManager.activeScene = scene1;

// Activate scene2
engine.sceneManager.activeScene = scene2;
```

#### 2. Merge scenes

If you want to activate multiple scenes at the same time, you can use `engine.sceneManager.mergeScenes` to merge 2 scenes into 1 scene.

```typescript
// Suppose there are two inactive scenes
const sourceScene, destScene;

// Merge sourceScene into destScene
engine.sceneManager.mergeScenes(sourceScene, destScene);

// Activate destScene
engine.sceneManager.activeScene = destScene;
```

#### 3. Load scene

If you want to load the **Scene** asset in the application, you can pass an url to `engine.sceneManager.loadScene` method.

```typescript
const sceneUrl = '...';

const scenePromise = engine.sceneManager.loadScene(sceneUrl);

// At this point, the loaded scene has been activated, you can do something on the loaded scene:
scenePromise.then((scene) => {
  console.log(scene);
});
```

#### 4. Set background of scene 

The scene background supports adding pure colors and sky:

```typescript
const scene = engine.sceneManager.activeScene;
const { background } = scene;

// Add a solid color background
background.mode = BackgroundMode.SolidColor; // That's the default value of mode
background.solidColor.set(1, 1, 1, 1); // White

// Add a skybox background
background.mode = BackgroundMode.Sky;
const skyMaterial = (background.sky.material = new SkyBoxMaterial(engine)); // Set the material of skybox 
skyMaterial.textureCubeMap = textureCube; // Set the cube texture of material
background.sky.mesh = PrimitiveMesh.createCuboid(engine, 2, 2, 2); // Set the mesh of the skybox
```

The playground example:

<playground src="background.ts"></playground>

#### 5. Set the scene ambient light

AmbientLight setting of the scene:

```typescript
const scene = engine.sceneManager.activeScene;
scene.ambientLight.diffuseSolidColor.set(1, 1, 1, 1);

```

## Entity tree management

### Basic usage

```typescript
const engine = new WebGLEngine('demo');
const scene = engine.sceneManager.activeScene;

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
const cameraEntity = rootEntity.createChild('camera');

cameraEntity.addComponent(Camera);
```
