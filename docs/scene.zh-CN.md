---
order: 2
title: 场景
type: 核心概念
---

Scene 作为场景单元，可以方便场景的实体树管理，尤其是大型游戏场景。如，**scene1** 和 **scene2** 作为两个不同的场景，不需要同时加载激活和渲染，那么我们完全可以通过建模软件或者代码逻辑，将之划分为不同的场景，在不同的时机分别地激活相应场景，或者合并场景。

## 场景管理

| 属性名称                                           | 解释     |
| :------------------------------------------------- | :------- |
| [activeScene](${api}core/SceneManager#activeScene) | 激活场景 |

| 方法名称                                           | 解释     |
| :------------------------------------------------- | :------- |
| [mergeScenes](${api}core/SceneManager#mergeScenes) | 合并场景 |
| [loadScene](${api}core/SceneManager#loadScene)     | 加载场景 |

### 基本用法

#### 1. 激活 Scene

激活 **Scene** 很简单，只需要将想要激活的 **scene** 赋予到 `engine.sceneManager.activeScene` 上即可。

```typescript
// 假设已经有两个未激活的场景
const scene1, scene2;

// 激活 场景1
engine.sceneManager.activeScene = scene1;

// 激活 场景2
engine.sceneManager.activeScene = scene2;
```

#### 2. 合并 Scene

如果想要同时激活多个场景，可以使用 `engine.sceneManager.mergeScenes` 将 2 个场景进行合并为 1 个场景。

```typescript
// 假设已经有两个未激活的场景
const sourceScene, destScene;

// 将 sourceScene 合并到 destScene
engine.sceneManager.mergeScenes(sourceScene, destScene);

// 激活 destScene
engine.sceneManager.activeScene = destScene;
```

#### 3. 加载 Scene

如果想要加载 **Scene** 资产作为应用中的一个场景，可以使用 `engine.sceneManager.loadScene` 传入 url 即可。

```typescript
const sceneUrl = '...';

const scenePromise = engine.sceneManager.loadScene(sceneUrl);

// 至此，加载的场景已经激活，如果还想对加载到的 scene 进行后续操作,如下：
scenePromise.then((scene) => {
  console.log(scene);
});
```

#### 4. 设置场景背景

目前场景背景支持添加纯色、天空和纹理背景。纯色和天空相对简单，代码示例如下：

```typescript
const scene = engine.sceneManager.activeScene;
const { background } = scene;

// 添加纯色背景
background.mode = BackgroundMode.SolidColor; // 默认纯色背景
background.solidColor.setValue(1, 1, 1, 1); // 纯白色

// 添加天空盒背景
background.mode = BackgroundMode.Sky; // 默认纯色背景
const skyMaterial = (background.sky.material = new SkyBoxMaterial(engine)); // 添加天空盒材质
skyMaterial.textureCubeMap = textureCube; // 设置立方体纹理
background.sky.mesh = PrimitiveMesh.createCuboid(engine, 2, 2, 2); // 设置天空盒网格

// 添加纹理背景
background.mode = BackgroundMode.Texture;
background.textureFillMode = BackgroundTextureFillMode.AspectFitWidth;
background.texture = texture;
```

##### 纹理背景适配模式

通过 `background.textureFillMode = BackgroundTextureFillMode.AspectFitWidth` 设置纹理适配模式。

目前纹理适配模式有以下三种：

| 适配模式        | 说明                                               |
| --------------- | -------------------------------------------------- |
| [AspectFitWidth](${api}core/BackgroundTextureFillMode#AspectFitWidth)  | 保持宽高比，把纹理宽缩放至 Canvas 的宽，上下居中。 |
| [AspectFitHeight](${api}core/BackgroundTextureFillMode#AspectFitHeight) | 保持宽高比，把纹理高缩放至 Canvas 的高，左右居中。 |
| [Fill](${api}core/BackgroundTextureFillMode#Fill)            | 把纹理的宽高填满 Canvas 的宽高。                   |

默认的适配模式是 `BackgroundTextureFillMode.AspectFitHeight`。

Playground 示例如下：

<playground src="background.ts"></playground>

#### 5. 设置场景环境光

场景环境光（AmbientLight）设置：

```typescript
const scene = engine.sceneManager.activeScene;
scene.ambientLight.diffuseSolidColor.setValue(1, 1, 1, 1);

```

## 实体树管理

### 基本用法

```typescript
const engine = new WebGLEngine('demo');
const scene = engine.sceneManager.activeScene;

// 创建根实体
const rootEntity = scene.createRootEntity();

// 添加实体到场景
scene.addRootEntity(rootEntity);

// 删除根实体
scene.removeRootEntity(rootEntity);

// 查找根实体
const allEntities: Readonly<Entity[]> = scene.rootEntities;

const entity2 = scene.getRootEntity(2);
```

### 方法

| 方法名称 | 解释 |
| :-- | :-- |
| [createRootEntity](${api}core/Scene#createRootEntity) | 新创建的 _scene_ 默认没有根实体，需要手动创建 |
| [addRootEntity](${api}core/Scene#addRootEntity) | 可以直接新建实体，或者添加已经存在的实体 |
| [removeRootEntity](${api}core/Scene#removeRootEntity) | 删除根实体 |
| [getRootEntity](${api}core/Scene#getRootEntity) | 查找根实体，可以拿到全部根实体，或者单独的某个实体对象。注意，全部实体是只读数组，不能改变长度和顺序 |

## 其他

需要注意的是，当我们熟悉了 [Engine](${api}core/Engine) 和 [Scene](${api}core/Scene) 之后，如果想要将渲染画面输出到屏幕上或者进行离屏渲染，我们还得确保当前 _scene_ 的实体树上挂载了 [Camera](${api}core/Camera)，挂载相机的方法如下：

```typescript
const cameraEntity = rootEntity.createChild('camera');

cameraEntity.addComponent(Camera);
```
