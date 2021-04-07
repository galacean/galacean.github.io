# 场景

Scene 作为场景单元，可以方便场景的实体树管理，尤其是大型游戏场景。如，**scene1** 和 **scene2** 作为两个不同的场景，不需要同时加载激活和渲染，那么我们完全可以通过建模软件或者代码逻辑，将之划分为不同的场景，在不同的时机分别地激活相应场景，或者合并场景。


## 场景管理

| 属性名称 | 解释 |
| :--- | :--- |
| [activeScene](${book.api}classes/core.scenemanager.html#activescene) | 激活场景 |

| 方法名称 | 解释 |
| :--- | :--- |
| [mergeScenes](${book.api}classes/core.scenemanager.html#mergescenes) | 合并场景 |
| [loadScene](${book.api}classes/core.scenemanager.html#loadscene) | 加载场景 |

### 基本用法

#### 1. 激活 Scene
 激活 **Scene** 很简单，只需要将想要激活的 **scene** 赋予到 [engine.sceneManager.activeScene](${book.api}classes/core.scenemanager.html#activescene) 上即可。

```typescript
// 假设已经有两个未激活的场景
const scene1,scene2;

// 激活 场景1
engine.sceneManager.activeScene = scene1;

// 激活 场景2
engine.sceneManager.activeScene = scene2;
```


#### 2. 合并 Scene

如果想要同时激活多个场景，可以使用 [engine.sceneManager.mergeScenes](${book.api}classes/core.scenemanager.html#mergescenes) 将2个场景进行合并为1个场景。

```typescript
// 假设已经有两个未激活的场景
const sourceScene,destScene;

// 将 sourceScene 合并到 destScene
engine.sceneManager.mergeScenes(sourceScene,destScene);

// 激活 destScene
engine.sceneManager.activeScene = destScene;
```


#### 3. 加载 Scene

如果想要加载 **Scene** 资产作为应用中的一个场景，可以使用 [engine.sceneManager.loadScene](${book.api}classes/core.scenemanager.html#loadscene) 传入 url 即可。

```typescript
const sceneUrl = "https://*****";

const scenePromise = engine.sceneManager.loadScene(sceneUrl);

// 至此，加载的场景已经激活，如果还想对加载到的 scene 进行后续操作,如下：
scenePromise.then( scene => {
	console.log( scene );
})
```

## 实体树管理

### 基本用法

```typescript
const engine = new WebGLEngine("demo");
const scene = engine.sceneManager.activeScene;

// 创建根实体
const rootEntity = scene.createRootEntity();

// 添加实体到场景
scene.addRootEntity(rootEntity);

// 删除根实体
scene.removeRootEntity(rootEntity);

// 查找根实体
const allEntities:Readonly<Entity[]> = scene.rootEntities;

const entity2 = scene.getRootEntity(2);
```

### 方法
| 方法名称 | 解释 |
| :--- | :--- |
| [createRootEntity](${book.api}classes/core.scene.html#createrootentity) | 新创建的 *scene* 默认没有根实体，需要手动创建 |
| [addRootEntity](${book.api}classes/core.scene.html#addrootentity) | 可以直接新建实体，或者添加已经存在的实体 |
| [removeRootEntity](${book.api}core.scene.html#removerootentity) | 删除根实体 |
| [getRootEntity](${book.api}classes/core.scene.html#getrootentity) | 查找根实体，可以拿到全部根实体，或者单独的某个实体对象。注意，全部实体是只读数组，不能改变长度和顺序|


## 其他

需要注意的是，当我们熟悉了 [Engine](${book.api}classes/core.engine.html) 和 [Scene](${book.api}classes/core.scene.html) 之后，如果想要将渲染画面输出到屏幕上或者进行离屏渲染，我们还得确保当前 *scene* 的实体树上挂载了 [Camera](${book.api}classes/core.camera.html)，挂载相机的方法如下：

```typescript
const cameraEntity = rootEntity.createChild("camera");

cameraEntity.addComponent(Camera);
```