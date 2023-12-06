---
order: 1
title: 相机
type: 图形
label: Graphics
---

相机是一个图形引擎对 [3D 投影](https://en.wikipedia.org/wiki/3D_projection)的抽象概念，作用好比现实世界中的摄像机或眼睛。Galacean Engine 的相机实现了自动视锥剔除，只渲染视锥体内的物体。

## 类型

### 透视投影

透视投影符合我们的近大远小模型，可以看一下透视模型示意图：

![image.png](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*isMHSpe21ZMAAAAAAAAAAAAAARQnAQ)

根据上图可以看出，近裁剪平面（[nearClipPlane](${api}core/Camera#nearClipPlane)），远裁剪平面（[farClipPlane](${api}core/Camera#farClipPlane)）和 视角（[fieldOfView](${api}core/Camera#fieldOfView)） 会形成一个视椎体 ([_View Frustum_](https://en.wikipedia.org/wiki/Viewing_frustum))。在视椎体内部的物体是会被投影到摄像机里的，也就是会渲染在画布上，而视椎体外的物体则会被裁剪。

### 正交投影

正交投影就是可视区近处和远处看到的物体是等大小的。由正交投影模型产生的可视区称为盒状可视区，盒状可视区模型如下：

![image.png](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*KEuGSqX-vXsAAAAAAAAAAAAAARQnAQ)

如上图所示，有 top、bottom、left 和 right，Galacean 对正交属性做了一些简化，更符合开发者的使用习惯，只有 [orthographicSize](${api}core/Camera#orthographicSize)（正交模式下相机的一半尺寸）。下面是针对各项属性和 [orthographicSize](${api}core/Camera#orthographicSize) 的关系

- `top = orthographicSize`
- `bottom = -orthographicSize`
- `right = orthographicSize * aspectRatio`
- `left = -orthographicSize * aspectRatio`

### 如何选择

经过对透视投影和正交投影的比较，可以直观地发现他们主要有以下不同点：

- 可视区域模型
- 是否有近大远小的效果

因此在实际项目中使用时，一般会以想要获得的视觉效果来确定投影的类型，比如当需要展示 2D 效果时，就选择正交投影，当需要展示 3D 效果时，就选择透视投影。

## 编辑器操作

编辑器项目已经自带了一个相机组件，当然，我们也可以手动添加：

<img src="https://gw.alipayobjects.com/zos/OasisHub/c6a1a344-630c-40c6-88ef-abb447cfd183/image-20231009114711623.png" alt="image-20231009114711623" style="zoom:50%;" />

在检查器里可以查看相机属性，并且左下角的相机预览可以方便地查看项目实际运行时的相机效果：

<img src="https://gw.alipayobjects.com/zos/OasisHub/24fa20d2-8f50-49bd-907a-3806f31e462e/image-20231009114816056.png" alt="image-20231009114816056" style="zoom:50%;" />

相机属性介绍详见[相机文档](${docs}camera-cn)。

## 脚本使用

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


## 属性

| 类型     | 属性                                                       | 解释                                                                                        |
| :------- | :--------------------------------------------------------- | :------------------------------------------------------------------------------------------ |
| 通用     | [isOrthographic](${api}core/Camera#isOrthographic)         | 是否正交投影，默认是 `false`                                                                |
|          | [aspectRatio](${api}core/Camera#aspectRatio)               | 画布宽高比，一般是根据 canvas 大小自动计算，也可以手动改变（不推荐）                        |
|          | [cullingMask](${api}core/Camera#cullingMask)               | 裁剪遮罩，用来选择性地渲染场景中的渲染组件。                                                |
|          | [priority](${api}core/Camera#priority)                     | 渲染优先级，用来确定在多相机的情况下按照什么顺序去渲染相机包含的内容。                      |
|          | [renderTarget](${api}core/Camera#renderTarget)             | 渲染目标，确定内容最后被渲染到哪个目标上。                                                  |
|          | [viewport](${api}core/Camera#viewport)                     | 视口，确定内容最后被渲染到目标设备里的范围。                                                |
|          | [pixelViewport](${api}core/Camera#pixelViewport)           | 屏幕上相机的视口（以像素坐标表示）。 在像素屏幕坐标中，左上角为(0, 0)，右下角为(1.0, 1.0)。 |
|          | [nearClipPlane](${api}core/Camera#nearClipPlane)           | 近裁剪平面                                                                                  |
|          | [farClipPlane](${api}core/Camera#farClipPlane)             | 远裁剪平面                                                                                  |
|          | [clearFlags](${api}core/Camera#clearFlags)                 | 在渲染这个相机前清理画布缓冲的标记                                                          |
| 透视投影 | [fieldOfView](${api}core/Camera#fieldOfView)               | 视角                                                                                        |
| 正交投影 | [orthographicSize](${api}core/Camera#orthographicSize)     | 正交模式下相机的一半尺寸                                                                    |
|          | [depthTextureMode](<(${api}core/Camera#depthTextureMode)>) | 深度模式，默认为`DepthTextureMode.None`                                                     |

详情请查看 [API 文档](${api}core/Camera)。

### isOrthographic
开发者可以通过设置 [isOrthographic](${api}core/Camera#isOrthographic) 来决定采用透视投影或正交投影。

<playground src="ortho-switch.ts"></playground>

### cullingMask

相机可以选择性的渲染场景中的节点，只需要设置相机与节点对应的遮罩即可。（注意：通过节点的 createChild 方法得到的子节点会继承父节点的 Layer）

<playground src="renderer-cull.ts"></playground>

### `renderTarget` && `priority` && `clearFlags`

在多个相机的情况下，可以结合相机的渲染目标，渲染优先级与清理缓冲标记，我们可以完成许多高级的实现，比如用多个相机的渲染结果实现画中画的效果。

<playground src="multi-camera.ts"></playground>

### 相机的朝向

由于在 Galacean 中，世界坐标系为右手系，因此任何节点的正方向朝向 -Z 轴，同理，相机的正方向（取景方向）也为 -Z 轴方向，以此类推，在 Unity 等世界坐标系为左手系的引擎中，相机的正方向为 +Z 轴。

为了方便区分，我们可以使用人脸朝向法判断，无论在左手系或者右手系，将右手放在 +X 轴上，将头部放在 +Y 轴上，此时面部朝向即正方向。

### 深度纹理

相机可以通过 [depthTextureMode](<(${api}core/Camera#depthTextureMode)>) 属性开启深度纹理，开启深度纹理后可以通过 `camera_DepthTexture` 属性在 Shader 中访问深度纹理。深度纹理可以用于实现软粒子和水面边缘过渡，以及一些简单的后处理效果。
注意：深度纹理仅渲染非透明物体。

<playground src="camera-depth-texture.ts"></playground>

## 方法

| 属性                                                               | 解释                                     |
| :----------------------------------------------------------------- | :--------------------------------------- |
| [resetProjectionMatrix](${api}core/Camera#resetProjectionMatrix)   | 重置自定义投影矩阵，恢复到自动模式。     |
| [resetAspectRatio](${api}core/Camera#resetAspectRatio)             | 重置自定义渲染横纵比，恢复到自动模式。   |
| [worldToViewportPoint](${api}core/Camera#worldToViewportPoint)     | 将一个点从世界空间转换到视口空间。       |
| [viewportToWorldPoint](${api}core/Camera#viewportToWorldPoint)     | 将一个点从视口空间转换到世界空间。       |
| [viewportPointToRay](${api}core/Camera#viewportPointToRay)         | 通过视口空间中的一个点生成世界空间射线。 |
| [screenToViewportPoint](${api}core/Camera#screenToViewportPoint)   | 将一个点从屏幕空间转换到视口空间。       |
| [viewportToScreenPoint](${api}core/Camera#viewportToScreenPoint)   | 将一个点从视口空间转换到屏幕空间。       |
| [worldToScreenPoint](${api}core/Camera#worldToScreenPoint)         | 将一个点从世界空间转换到屏幕空间。       |
| [screenToWorldPoint](${api}core/Camera#screenToWorldPoint)         | 将一个点从屏幕空间转换到世界空间。       |
| [screenPointToRay](${api}core/Camera#screenPointToRay)             | 通过屏幕空间中的一个点生成世界空间射线。 |
| [render](${api}core/Camera#render)                                 | 手动渲染。                               |
| [setReplacementShader](${api}core/Camera#setReplacementShader)     | 设置全局渲染替换着色器。                 |
| [resetReplacementShader](${api}core/Camera#resetReplacementShader) | 清空全局渲染替换着色器。                 |


## 相机控件

顾名思义就是和相机一起搭配来展示三维场景的组件，这类组件根据不同的功能定制相应的参数，通过影响着相机的属性来控制三维场景的展示。

### 基本原理

相机控件继承于功能强大的脚本，挂载在包含 `Camera` 组件的 `Entity` 上，因此可以顺其自然地拿到 `Camera` ，在生命周期函数中响应外部输入并执行相应的操作。

### 控件类型

#### 轨道控制器

`OrbitControl` 用来模拟轨道交互，适用于围绕一个目标对象进行 360 度旋转交互，需要注意的是，**请务必在添加相机组件后再添加轨道控制器**。

<playground src="gltf-basic.ts"></playground>

|属性|解释|
|:--|:--|
|`target`|观察的目标位置|
|`autoRotate`|是否自动旋转，默认为 false ，可通过 autoRotateSpeed 调整旋转速度|
|`autoRotateSpeed`|自动旋转的速度|
|`enableDamping`| 是否开启相机阻尼，默认为true|
|`dampingFactor` | 旋转阻尼参数，默认为 0.1|
|`enableKeys`| 是否支持键盘操作（上下左右键）|
|`enablePan`| 是否支持相机平移，默认为 true| 
|`keyPanSpeed` | 键盘持续按下时操作的幅度| 
|`enableRotate` | 是否支持相机旋转，默认为 true| 
|`rotateSpeed` | 相机旋转速度，默认为 1.0| 
|`enableZoom`| 是否支持相机缩放，默认为 true| 
|`minAzimuthAngle`| onUpdate 时，水平方向操作合理范围的最小弧度，默认为负无穷大| 
|`maxAzimuthAngle`| onUpdate 时，水平方向操作合理范围的最大弧度，默认为正无穷大| 
|`minDistance` | onUpdate 时，判定的距离操作合理范围的最小值| 
|`maxDistance` | onUpdate 时，判定的距离操作合理范围的最大值| 
|`minPolarAngle` | onUpdate 时，竖直方向操作合理范围的最小弧度| 
|`maxPolarAngle` | onUpdate 时，竖直方向操作合理范围的最大弧度|

#### 自由控制器

`FreeControl` 一般用于漫游控制，常见于游戏场景，需要注意的是，**请务必在添加相机组件后再添加自由控制器**。

<playground src="controls-free.ts"></playground>

|属性|解释|
|:--|:--|
|`floorMock` | 是否模拟地面，默认为 true |
|`floorY` | 配合 `floorMock` 使用，声明地面的位置信息 |
|`movementSpeed` | 移动速度 |
|`rotateSpeed` | 旋转速度 |

#### 正交控制器

`OrthoControl` 一般用于控制 2D 场景中的缩放和位移：

<playground src="ortho-control.ts"></playground>

|属性|解释|
|:--|:--|
|`zoomSpeed`| 缩放速度 |
