---
order: 2
title: 相机
type: 组件
---

相机是一个图形引擎对 [3D 投影](https://en.wikipedia.org/wiki/3D_projection)的抽象概念，作用好比现实世界中的摄像机或眼睛。Oasis Engine 的相机实现了自动视锥剔除，只渲染视锥体内的物体。

<playground src="renderer-cull.ts"></playground>

## 基本用法
```typescript
// 创建实体
const entity = root.createChild('cameraEntity');
// 创建相机组件
const camera = entity.addComponent(Camera);

// 设置透视投影属性
camera.nearClipPlane = 0.1;
camera.farClipPlane = 100;
camera.fieldOfView = 60;
camera.backgroundColor = new Vector4(1,1,1,1);

// 通过 entity 获取相机
entity.engine.sceneManager.activeScene._activeCameras[0]
```
## 属性

|类型|属性|解释|
|:--|:--|:--|
|通用|[isOrthographic](${api}core/Camera#isOrthographic)|是否正交投影，默认是 `false`|
||[aspectRatio](${api}core/Camera#aspectRatio)|画布宽高比，一般是根据 canvas 大小自动计算，也可以手动改变（不推荐）|
|          | [cullingMask](${api}core/Camera#cullingMask) | 裁剪遮罩，用来选择性地渲染场景中的渲染组件。|
|透视投影| [nearClipPlane](${api}core/Camera#nearClipPlane) | 近裁剪平面 |
|| [farClipPlane](${api}core/Camera#farClipPlane) | 远裁剪平面 |
|| [fieldOfView](${api}core/Camera#fieldOfView) | 视角 |
|正交投影|[orthographicSize](${api}core/Camera#orthographicSize)| 正交模式下相机的一半尺寸|

cullingMask 案例：

<playground src="culling-mask.ts"></playground>


## 类型

通过设置 [isOrthographic](${api}core/Camera#isOrthographic) 来决定采用透视投影或正交投影。

### 透视投影

透视投影符合我们的近大远小模型，可以看一下透视模型示意图：

![image.png](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*isMHSpe21ZMAAAAAAAAAAAAAARQnAQ)

根据上图可以看出，近裁剪平面（[nearClipPlane](${api}core/Camera#nearClipPlane)），远裁剪平面（[farClipPlane](${api}core/Camera#farClipPlane)）和 视角（[fieldOfView](${api}core/Camera#fieldOfView)） 会形成一个视椎体 ([*View Frustum*](https://en.wikipedia.org/wiki/Viewing_frustum))。在视椎体内部的物体是会被投影到摄像机里的，也就是会渲染在画布上，而视椎体外的物体则会被裁剪。


### 正交投影

正交投影就是可视区近处和远处看到的物体是等大小的。由正交投影模型产生的可视区称为盒状可视区，盒状可视区模型如下：

![image.png](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*KEuGSqX-vXsAAAAAAAAAAAAAARQnAQ)

如上图所示，有 top、bottom、left 和 right，Oasis 对正交属性做了一些简化，更符合开发者的使用习惯，只有 [orthographicSize](${api}core/Camera#orthographicSize)（正交模式下相机的一半尺寸）。下面是针对各项属性和 [orthographicSize](${api}core/Camera#orthographicSize) 的关系

- `top = orthographicSize`
- `bottom = -orthographicSize`
- `right = orthographicSize * aspectRatio`
- `left = -orthographicSize * aspectRatio`


详情请查看 [API 文档](${api}core/Camera)。