---
order: 5
title: 相机
type: 功能
group: 3D 渲染
label: Editor/Feature/Rendering-3d
---

[Camera](${docs}camera-cn) 是场景渲染的入口，通常场景中所有的元素都是以相机为出发点进行渲染，我们可以把相机理解为人眼或者拍摄电影的摄像机。一个场景可以包含多个相机，他们可以将场景的渲染结果呈现在整个屏幕或屏幕的部分区域。Camera 在引擎里是组件，添加组件后可以让 Entity 具备相机功能。相机有两种投影方式，一种是**透视投影**，通常用于 3D 元素的渲染，有近大远小的效果。一种是**正交投影**，没有近大远小，一般做 2D 元素的渲染。Oasis Engine 的相机实现了自动视锥剔除，只渲染视锥体内的物体。详细属性说明可以查看引擎[文档](https://oasisengine.cn/#/docs/latest/zh/camera.zh-CN)。

## 添加相机组件

![image-20221212170918740](https://mdn.alipayobjects.com/rms/afts/img/A*ezoYSoV7hhUAAAAAAAAAAAAAARQnAQ/original/image-20221212170918740.png)在节点树上选中想要添加相机组件实体，点击右侧检查器的『添加组件』按钮，选择相机即可，在检查器里可以看到被添加的相机组件属性：

<img src="https://mdn.alipayobjects.com/rms/afts/img/A*KAfnSrWFK24AAAAAAAAAAAAAARQnAQ" alt="image-20221212171017016" style="zoom:50%;" />

**面板属性仅对 Runtime 生效**

## 相机组件说明

### 切换正交/透视

关于是否正交（isOrthographic）、近裁剪面（nearClipPlane）、远裁剪面（farClipPlane）、视角（fieldOfView）、正交尺寸（orthographicSize）可以查看引擎[文档](https://oasisengine.cn/#/docs/latest/zh/camera.zh-CN)。

在编辑器里可以很方便的通过面板属性进行调整。

透视模式：

<img src="https://mdn.alipayobjects.com/rms/afts/img/A*8u8LSZJ_HoUAAAAAAAAAAAAAARQnAQ/original/image-20221213170001536.png" alt="image-20221213170001536" style="zoom:50%;" />

正交模式：

<img src="https://mdn.alipayobjects.com/rms/afts/img/A*giycTJdSQS8AAAAAAAAAAAAAARQnAQ/original/image-20221213161110593.png" alt="image-20221213161110593" style="zoom:50%;" />

### 渲染优先级

相机会渲染场景中的物体，渲染优先级越高的相机在帧循环中优先调用渲染方法。

### 视锥裁剪

启用视锥裁剪会让相机裁剪掉相机视锥外的渲染器。默认是开启，可以提升渲染性能。

### 视口

设置相机在 Canvas 上的渲染区域，默认是全屏（0，0，1，1），设置值都是归一化的。

<img src="https://mdn.alipayobjects.com/rms/afts/img/A*uVoKRKmg6V8AAAAAAAAAAAAAARQnAQ/original/image-20221213171203458.png" alt="image-20221213171203458" style="zoom:50%;" />

- `x` 起始的水平位置
- `y` 起始的垂直位置
- `z` 输出的屏幕高度
- `w` 输出的屏幕宽度 

### 清除标志

<img src="https://mdn.alipayobjects.com/rms/afts/img/A*tBOkTbZS30AAAAAAAAAAAAAAARQnAQ/original/image-20221214194310258.png" alt="image-20221214194310258" style="zoom:50%;" />

- 所有：清除颜色，深度，模板缓冲
- 颜色：只清除颜色缓冲
- 深度：只清除深度缓冲
- 模板：只清除模板缓冲
- 颜色深度：清除颜色、深度缓冲
- 颜色模板：清除颜色、模板缓冲
- 深度模板：清除深度、模板缓冲
- 无：不清除任何缓冲

