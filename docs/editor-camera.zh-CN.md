---
order: 5
title: 相机组件
type: 编辑器
---

[Camera](${docs}camera-cn) 是场景渲染的入口，通常场景中所有的元素都是以相机为出发点进行渲染，我们可以把相机理解为人眼或者拍摄电影的摄像机。一个场景可以包含多个相机，他们可以将场景的渲染结果呈现在整个屏幕或屏幕的部分区域。Camera 在引擎里是组件，添加组件后可以让 Entity 具备相机功能。相机有两种投影方式，一种是**透视投影**，通常用于 3D 元素的渲染，有近大远小的效果。一种是**正交投影**，没有近大远小，一般做 2D 元素的渲染。

## 使用

### 如何添加

1. 选中任意实体，点击添加组件。

![image-20210720164226658](https://gw.alipayobjects.com/zos/OasisHub/324666eb-7cf5-4f22-9629-577cf9a19f08/image-20210720164226658.png)

2. 选中相机即可。

<img src="/Users/guolei/Library/Application Support/typora-user-images/image-20210720164414642.png" alt="image-20210720164414642" style="zoom:50%;" />

### 属性面板

点击 Camera 所在的实体**检查面板**会显示 Camera 组件的相关属性。

<img src="https://gw.alipayobjects.com/zos/OasisHub/e9728bd7-89af-40dd-999a-e030188e8fa4/image-20210720164512927.png" alt="image-20210720164512927" style="zoom:50%;" />

### 预览场景

调整 Camera 角度并点击编辑器右上角的**预览按钮**进行预览。

![CameraUse](https://gw.alipayobjects.com/zos/OasisHub/68812db6-9e67-46f2-8a09-778fe72f1c63/CameraUse.gif)
