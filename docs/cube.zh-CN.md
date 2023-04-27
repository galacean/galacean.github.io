---
order: 2
title: 2. 绘制一个立方体
type: 快速入门
group: 基础
label: Introduction/Basic
---

在初始化完毕画布后，我们趁热打铁开发一个立方体示例：

<playground src="scene-basic.ts"></playground>
## 引入模块

我们开始使用 [TypeScript](https://www.typescriptlang.org/) 编写引擎代码。如果你还不太适应 TypeScript，使用 JavaScript 也一样可以运行，并且同样可以享受到引擎 API 提示（通过使用 [VSCode](https://code.visualstudio.com/) 等 IDE 进行编程）。

回到我们的编程，为了实现这样一个功能，需要在我们的工程里引入如下 Galacean 引擎的类：

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

我们先来简单认识一下这些类：

**WebGL 引擎类**：
- [WebGLEngine](${api}rhi-webgl/WebGLEngine)：WebGL 平台引擎，支持 WebGL1.0 和 WebGL2.0，它能够控制画布的一切行为，包括资源管理、场景管理、执行/暂停/继续、垂直同步等功能。(详见 [引擎](${docs}engine-cn) 章节。)

组件类：
- [Camera](${api}core/Camera)：相机，是一个图形引擎对 3D 投影的抽象概念，作用好比现实世界中的摄像机或眼睛，如果不加相机，画布将什么都画不出来。（详见 [相机](${docs}camera-cn) 章节）
- [DirectLight](${api}core/DirectLight)：直接光，是光照的一种，光照使场景更有层次感，使用光照，能建立更真实的三维场景。（详见 [光照](${docs}light-cn) 章节）
- [Script](${api}core/Script)：脚本，是衔接引擎能力和游戏逻辑的纽带，可以通过它来扩展引擎的功能，也可以脚本组件提供的生命周期钩子函数中编写自己的游戏逻辑代码。（详见 [脚本](${docs}script-cn) 章节）
- [MeshRenderer](${api}core/MeshRenderer)：网格渲染器，使用网格对象（这个例子中就是立方体）作为几何体轮廓的数据源。（详见 [网格渲染器](${docs}mesh-renderer-cn) 章节）

**几何体和材质类**：
- [PrimitiveMesh](${api}core/PrimitiveMesh)：基础几何体，提供了创建立方体、球体等网格对象的便捷方法。（详见 [基础几何体](${docs}primitive-mesh-cn) 章节）
- [BlinnPhongMaterial](${api}core/BlinnPhongMaterial)：材质定义了如何渲染这个立方体，BlinnPhong 材质是经典的材质之一。（详见 [材质](${docs}material-cn) 章节）

**数学库相关类**：
- [Vector3](${api}math/Vector3), [Vector4](${api}math/Vector4), [Color](${api}math/Color)：这几个类是数学计算的一些基本单元，用来计算立方体的位置、颜色等。（详见 [数学库](${docs}math-cn) 章节）

## 创建引擎实例

创建引擎实例，参数 `canvas` 是 *Canvas* 元素的 `id`，若 `id` 不同请自行替换。如上文所述，通过 [resizeByClientSize](${api}rhi-webgl/WebCanvas#resizeByClientSize) 方法重设画布高宽。

```typescript
const engine = new WebGLEngine("canvas");
engine.canvas.resizeByClientSize();
```
## 创建场景根节点

值得注意的是，一个引擎实例可能包含多个场景实例，如果为了在当前激活的场景中添加一个立方体，需要通过引擎的场景管理器 `engine.sceneManager` 获得当前激活的场景。

获得场景后，通过场景的 `createRootEntity` 方法创建一个**根实体**。场景中的根实体是场景树的根节点。

```typescript
const scene = engine.sceneManager.activeScene;
const rootEntity = scene.createRootEntity('root');
```
## 创建一个相机实体

在 Galacean Engine 中，功能是以组件形式添加到实体上的。首先，我们先创建一个实体用来添加相机组件。

创建完成之后，通过实体上自带的变换组件 `transform` 来改变相机的位置和朝向。然后给这个实体添加相机组件 `Camera`。 


```typescript
let cameraEntity = rootEntity.createChild('camera_entity');

cameraEntity.transform.position = new Vector3(0, 5, 10);
cameraEntity.transform.lookAt(new Vector3(0, 0, 0));

let camera = cameraEntity.addComponent(Camera);
```
## 创建光照

同样的，光照也是通过组件形式挂载到实体上。创建完实体之后，添加直接光组件 `DirectLight`，设置直接光组件的颜色、强度属性和光照角度来获得合适的光照效果。

```typescript
let lightEntity = rootEntity.createChild('light');

let directLight = lightEntity.addComponent(DirectLight)
directLight.color = new Color( 1.0, 1.0, 1.0 );
directLight.intensity = 0.5;

lightEntity.transform.rotation = new Vector3(45, 45, 45);

```
## 创建立方体

再创建一个实体用来挂载立方体网格渲染组件。`MeshRenderer` 是网格渲染器组件，通过 `.mesh` 属性设置成 `PrimitiveMesh` 创建的立方体数据，通过 `setMaterial` 方法把立方体的材质设置成 BlinnPhong。

```typescript
let cubeEntity = rootEntity.createChild('cube');
let cube = cubeEntity.addComponent(MeshRenderer);
cube.mesh = PrimitiveMesh.createCuboid(engine, 2, 2, 2);
cube.setMaterial(new BlinnPhongMaterial(engine));
```

## 启动引擎

一切都准备好了，让我们用一行代码来启动引擎吧！

```typescript
engine.run();
```