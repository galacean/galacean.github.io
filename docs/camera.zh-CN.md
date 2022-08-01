---
order: 1
title: 相机组件
type: 图形
group: 摄像机
---

相机是一个图形引擎对 [3D 投影](https://en.wikipedia.org/wiki/3D_projection)的抽象概念，作用好比现实世界中的摄像机或眼睛。Oasis Engine 的相机实现了自动视锥剔除，只渲染视锥体内的物体。

## 基本用法

```typescript
// 创建实体
const entity = root.createChild("cameraEntity");
// 创建相机组件
const camera = entity.addComponent(Camera);
camera.nearClipPlane = 0.1;
camera.farClipPlane = 100;

// 设置透视投影属性
camera.fieldOfView = 60;

// 通过 entity 获取相机
entity.engine.sceneManager.activeScene._activeCameras[0];
```

## 类型

开发者可以通过设置 [isOrthographic](${api}core/Camera#isOrthographic) 来决定采用透视投影或正交投影。

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

### isOrthographic

<playground src="ortho-switch.ts"></playground>

## 属性

| 类型 | 属性 | 解释 |
| :-- | :-- | :-- |
| 通用 | [isOrthographic](${api}core/Camera#isOrthographic) | 是否正交投影，默认是 `false` |
|  | [aspectRatio](${api}core/Camera#aspectRatio) | 画布宽高比，一般是根据 canvas 大小自动计算，也可以手动改变（不推荐） |
|  | [cullingMask](${api}core/Camera#cullingMask) | 裁剪遮罩，用来选择性地渲染场景中的渲染组件。 |
|  | [priority](${api}core/Camera#priority) | 渲染优先级，用来确定在多相机的情况下按照什么顺序去渲染相机包含的内容。 |
|  | [renderTarget](${api}core/Camera#renderTarget) | 渲染目标，确定内容最后被渲染到哪个目标上。 |
|  | [viewport](${api}core/Camera#viewport) | 视口，确定内容最后被渲染到目标设备里的范围。 |
|  | [nearClipPlane](${api}core/Camera#nearClipPlane) | 近裁剪平面 |
|  | [farClipPlane](${api}core/Camera#farClipPlane) | 远裁剪平面 |
|  | [clearFlags](${api}core/Camera#clearFlags) | 在渲染这个相机前清理画布缓冲的标记 |
| 透视投影 | [fieldOfView](${api}core/Camera#fieldOfView) | 视角 |
| 正交投影 | [orthographicSize](${api}core/Camera#orthographicSize) | 正交模式下相机的一半尺寸 |

详情请查看 [API 文档](${api}core/Camera)。

### cullingMask

相机可以选择性的渲染场景中的节点，只需要设置相机与节点对应的遮罩即可。（注意：通过节点的 createChild 方法得到的子节点会继承父节点的 Layer）

<playground src="renderer-cull.ts"></playground>

### `renderTarget` && `priority` && `clearFlags`

在多个相机的情况下，可以结合相机的渲染目标，渲染优先级与清理缓冲标记，我们可以完成许多高级的实现，比如用多个相机的渲染结果实现画中画的效果。

<playground src="multi-camera.ts"></playground>

### 相机的朝向

由于在 Oasis 中，世界坐标系为右手系，因此任何节点的正方向朝向 -Z 轴，同理，相机的正方向（取景方向）也为 -Z 轴方向，以此类推，在 Unity 等世界坐标系为左手系的引擎中，相机的正方向为 +Z 轴。

为了方便区分，我们可以使用人脸朝向法判断，无论在左手系或者右手系，将右手放在 +X 轴上，将头部放在 +Y 轴上，此时面部朝向即正方向。

## Q&A

### 相机和相机控件如何配合使用？

详情请查看 [相机控件文档](${docs}controls-cn)。
