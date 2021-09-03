---
order: 2
title: 相机
type: 组件
---

相机是一个图形引擎对 [3D 投影](https://en.wikipedia.org/wiki/3D_projection)的抽象概念，作用好比现实世界中的摄像机或眼睛。Oasis Engine 的相机实现了自动视锥剔除，只渲染视锥体内的物体。

cullingMask 案例：

<playground src="renderer-cull.ts"></playground>

## 基本用法

```typescript
// 创建实体
const entity = root.createChild("cameraEntity");
// 创建相机组件
const camera = entity.addComponent(Camera);

// 设置透视投影属性
camera.nearClipPlane = 0.1;
camera.farClipPlane = 100;
camera.fieldOfView = 60;

// 通过 entity 获取相机
entity.engine.sceneManager.activeScene._activeCameras[0];
```

## 属性

| 类型 | 属性 | 解释 |
| :-- | :-- | :-- |
| 通用 | [isOrthographic](${api}core/Camera#isOrthographic) | 是否正交投影，默认是 `false` |
|  | [aspectRatio](${api}core/Camera#aspectRatio) | 画布宽高比，一般是根据 canvas 大小自动计算，也可以手动改变（不推荐） |
|  | [cullingMask](${api}core/Camera#cullingMask) | 裁剪遮罩，用来选择性地渲染场景中的渲染组件。 |
|  | [priority](${api}core/Camera#priority) | 渲染优先级，用来确定在多相机的情况下按照什么顺序去渲染相机包含的内容。 |
|  | [renderTarget](${api}core/Camera#renderTarget) | 渲染目标，确定内容最后被渲染到哪个目标上。 |
|  | [viewport](${api}core/Camera#viewport) | 视口，确定内容最后被渲染到目标设备里的范围。 |
| 透视投影 | [nearClipPlane](${api}core/Camera#nearClipPlane) | 近裁剪平面 |
|  | [farClipPlane](${api}core/Camera#farClipPlane) | 远裁剪平面 |
|  | [fieldOfView](${api}core/Camera#fieldOfView) | 视角 |
| 正交投影 | [orthographicSize](${api}core/Camera#orthographicSize) | 正交模式下相机的一半尺寸 |

详情请查看 [API 文档](${api}core/Camera)。

## 类型

通过设置 [isOrthographic](${api}core/Camera#isOrthographic) 来决定采用透视投影或正交投影。

### 透视投影

透视投影符合我们的近大远小模型，可以看一下透视模型示意图：

![image.png](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*isMHSpe21ZMAAAAAAAAAAAAAARQnAQ)

根据上图可以看出，近裁剪平面（[nearClipPlane](${api}core/Camera#nearClipPlane)），远裁剪平面（[farClipPlane](${api}core/Camera#farClipPlane)）和 视角（[fieldOfView](${api}core/Camera#fieldOfView)） 会形成一个视椎体 ([_View Frustum_](https://en.wikipedia.org/wiki/Viewing_frustum))。在视椎体内部的物体是会被投影到摄像机里的，也就是会渲染在画布上，而视椎体外的物体则会被裁剪。

### 正交投影

正交投影就是可视区近处和远处看到的物体是等大小的。由正交投影模型产生的可视区称为盒状可视区，盒状可视区模型如下：

![image.png](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*KEuGSqX-vXsAAAAAAAAAAAAAARQnAQ)

如上图所示，有 top、bottom、left 和 right，Oasis 对正交属性做了一些简化，更符合开发者的使用习惯，只有 [orthographicSize](${api}core/Camera#orthographicSize)（正交模式下相机的一半尺寸）。下面是针对各项属性和 [orthographicSize](${api}core/Camera#orthographicSize) 的关系

- `top = orthographicSize`
- `bottom = -orthographicSize`
- `right = orthographicSize * aspectRatio`
- `left = -orthographicSize * aspectRatio`

### 如何选择

经过对透视投影和正交投影的比较，可以直观地发现他们主要有以下不同点：

- **可视区域模型**
- **是否有近大远小的效果**

因此在实际项目中使用时，一般会以想要获得的视觉效果来确定投影的类型，比如当需要展示 2D 效果时，就选择正交投影，当需要展示 3D 效果时，就选择透视投影。

<playground src="ortho-switch.ts"></playground>

## Q&A

### 当场景中有多个相机时会如何渲染？

首先回顾之前提到的属性 `priority` ，`renderTarget` 和 `viewport` ，当一个场景中同时有多个相机的时候，每次调用渲染时我们会根据 `priority` 来确定相机队列渲染的属性，根据 `viewport` 确定最后需要渲染到 `renderTarget` 的哪些范围内。

<playground src="multi-camera.ts"></playground>

### 相机和相机控件如何配合使用？

详情请查看 [相机控件文档](${docs}controls-cn)。
