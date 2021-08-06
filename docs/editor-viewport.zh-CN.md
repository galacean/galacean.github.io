---
order: 6
title: Viewport 视图区编辑
type: 编辑器
---

![image-20210719155730830](https://gw.alipayobjects.com/zos/OasisHub/2517d654-a676-411e-b4bc-5dde6680786c/image-20210719155730830.png)

**视图区** 的主要作用是场景编辑，我们可以在这里布置所有的模型、灯光、特效等元素。并且可以选中模型用变换工具（Gizmo）去改变实体的位置（Position），旋转（Rotation）和缩放（Scale）。

## 编辑器相机操作

编辑器视口是由编辑器相机渲染的，通过操作编辑器相机可以实现场景的视角的调试。默认编辑器的相机模式是 3D 模式。

### 相机模式切换

我们可以通过按钮切换 2D/3D 模式：

![2D:3D](https://gw.alipayobjects.com/zos/OasisHub/1230a461-1831-4551-9829-887ad476cedb/2D%3A3D.gif)

### 3D 模式操作

#### 旋转视角

按住**鼠标左键**拖动可以旋转视口：

![3D-rotate](https://gw.alipayobjects.com/zos/OasisHub/18607939-f6a6-48aa-885d-2905bd32df4e/3D-rotate.gif)

#### 拉近/远

滑动**鼠标滚轮**可以拉近/远视角：

![3D-scale](https://gw.alipayobjects.com/zos/OasisHub/7e8fa18b-1406-453c-b3f3-f93da21eb708/3D-scale.gif)

### 2D 模式操作

#### 移动视口

按住鼠标左键拖动可以移动视口：

![2D-translate](https://gw.alipayobjects.com/zos/OasisHub/46acac8b-7ee8-455d-91d9-2af658b6065a/2D-translate.gif)

#### 拉近/远

**滑动鼠标滚轮**可以拉近/远视口：

![2D-scale](https://gw.alipayobjects.com/zos/OasisHub/7afd7c10-4aa5-4fdb-a88c-7fe26e7f749c/2D-scale.gif)

## 选中实体

场景中点击模型，出现包围盒和变换工具，inspector 出现对应实体的属性，表示选中了当前实体。点击空白区取消旋转。

![select](https://gw.alipayobjects.com/zos/OasisHub/f08b07c3-226a-49be-af9c-b20c5951240a/select.gif)

## 变换 Gizmo 操作

下面三个平移、旋转和缩放的工具，我们称为 Gizmo 

![gizmo](https://gw.alipayobjects.com/zos/OasisHub/c12ba611-324d-4f14-bf13-967f73a7c0cb/gizmo.gif)

### 平移

我们先需要选中实体，左侧状态栏选中平移按钮，平移 Gizmo 会出现在视图区。拖动不同的轴，可以往不同的方向移动物体。

![gizmo-translate](https://gw.alipayobjects.com/zos/OasisHub/2337bbf7-b781-46b0-a57c-7a93d5f81ab7/gizmo-translate.gif)

### 旋转

![gizmo-rotate](https://gw.alipayobjects.com/zos/OasisHub/ff5bf975-11ed-481d-a220-73e3dad57fde/gizmo-rotate.gif)

### 缩放

![gizmo-scale](https://gw.alipayobjects.com/zos/OasisHub/9ad7d8bb-5013-4dc0-ad1e-c01aef3ff1ca/gizmo-scale.gif)

## 相机视角转换

相机视角转换是将编辑器相机转换到场景相机，并且可以通过鼠标调整相机的坐标。

![camera-transform](https://gw.alipayobjects.com/zos/OasisHub/e88e425e-a2bb-4fbb-b3af-af2c0aed4a59/camera-transform.gif)

点击工具区即可开启，再次点击就可以关闭：

![image-20210806150416229](/Users/husong/Library/Application Support/typora-user-images/image-20210806150416229.png)

