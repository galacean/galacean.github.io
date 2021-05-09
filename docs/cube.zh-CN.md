---
order: 1
title: 绘制一个立方体
type: 入门
---

这个教程将带你开发一个立方体示例：

<playground src="cube.ts"></playground>

## 引入模块

为了实现这样一个功能，需要引入以下模块：

```typescript
import { Camera, WebGLEngine, PrimitiveMesh, BlinnPhongMaterial, DirectLight, Vector3, Vector4, Script, Color, MeshRenderer } from 'oasis-engine';
```

WebGL 引擎类：
- [WebGLEngine](${docs}engine-cn)：

组件类：
- [Camera]()：
- [DirectLight]()： 
- [Script]()：
- [MeshRenderer]()：

几何体和材质类：
- [PrimitiveMesh]()：
- [BlinnPhongMaterial]()：

数学库相关类：
- [Vector3]()：
- [Vector4]()：
- [Color]()：

## 创建引擎示例

参数 `canvas` 是canvas元素的id，若id不同请自行替换。通过 [resizeByClientSize]() 设置屏幕适配。

```typescript
const engine = new WebGLEngine("canvas");
// 设置屏幕适配
engine.canvas.resizeByClientSize();

// 启动引擎
engine.run();
```

## 创建一个相机实体

```typescript
// 获取场景根实体
const scene = engine.sceneManager.activeScene;
const rootEntity = scene.createRootEntity('root');

let cameraEntity = rootEntity.createChild('camera_entity');
cameraEntity.transform.position = new Vector3(0, 5, 10);
cameraEntity.transform.lookAt(new Vector3(0, 0, 0));
let camera = cameraEntity.addComponent(Camera);
camera.backgroundColor = new Vector4(1,1,1,1)
```

## 创建灯光

```typescript
// 创建一个实体用来挂载方向光
let lightEntity = rootEntity.createChild('light');

// 创建一个方向光组件
let directLight = lightEntity.addComponent(DirectLight)
directLight.color = new Color( 1.0, 1.0, 1.0 );
directLight.intensity = 0.5;

// 通过灯光实体的旋转角度控制光线方向
lightEntity.transform.rotation = new Vector3(45, 45, 45);

```
## 创建立方体

```typescript
let cubeEntity = rootEntity.createChild('cube');
let cube = cubeEntity.addComponent(MeshRenderer);
cube.mesh = PrimitiveMesh.createCuboid(engine, 2, 2, 2);
cube.setMaterial(new BlinnPhongMaterial(engine));
```