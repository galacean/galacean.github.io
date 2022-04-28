---
order: 2
title: 相机控件
type: 图形
group: 摄像机
---

相机控件，顾名思义就是和相机一起搭配来展示三维场景的组件，这类组件根据不同的功能定制相应的参数，通过影响着相机的属性来控制三维场景的展示。

## 基本原理

相机控件继承于功能强大的脚本，挂载在包含 `Camera` 组件的 `Entity` 上，因此可以顺其自然地拿到 `Camera` ，在生命周期函数中响应外部输入并执行相应的操作。

## 控件类型

### 轨道控制器

[OrbitControl](${api}controls/OrbitControl) 用来模拟轨道交互，适用于围绕一个目标对象进行 360旋转交互：

<playground src="gltf-basic.ts"></playground>

|属性|解释|
|:--|:--|
|[target](${api}controls/OrbitControl#target)|观察的目标位置|
|[autoRotate](${api}controls/OrbitControl#autoRotate)|是否自动旋转，默认为 false ，可通过 autoRotateSpeed 调整旋转速度|
|[autoRotateSpeed](${api}controls/OrbitControl#autoRotateSpeed)|自动旋转的速度|
|[enableDamping](${api}controls/OrbitControl#enableDamping) | 是否开启相机阻尼，默认为true|
|[dampingFactor](${api}controls/OrbitControl#dampingFactor) | 旋转阻尼参数，默认为 0.1|
|[enableKeys](${api}controls/OrbitControl#enableKeys) | 是否支持键盘操作（上下左右键）|
|[enablePan](${api}controls/OrbitControl#enablePan) | 是否支持相机平移，默认为 true| 
|[keyPanSpeed](${api}controls/OrbitControl#keyPanSpeed) | 键盘持续按下时操作的幅度| 
|[enableRotate](${api}controls/OrbitControl#enableRotate) | 是否支持相机旋转，默认为 true| 
|[rotateSpeed](${api}controls/OrbitControl#rotateSpeed) | 相机旋转速度，默认为 1.0| 
|[enableZoom](${api}controls/OrbitControl#enableZoom) | 是否支持相机缩放，默认为 true| 
|[minAzimuthAngle](${api}controls/OrbitControl#minAzimuthAngle) | onUpdate 时，水平方向操作合理范围的最小弧度，默认为负无穷大| 
|[maxAzimuthAngle](${api}controls/OrbitControl#maxAzimuthAngle) | onUpdate 时，水平方向操作合理范围的最大弧度，默认为正无穷大| 
|[minDistance](${api}controls/OrbitControl#minDistance) | onUpdate 时，判定的距离操作合理范围的最小值| 
|[maxDistance](${api}controls/OrbitControl#maxDistance) | onUpdate 时，判定的距离操作合理范围的最大值| 
|[minPolarAngle](${api}controls/OrbitControl#minPolarAngle) | onUpdate 时，竖直方向操作合理范围的最小弧度| 
|[maxPolarAngle](${api}controls/OrbitControl#maxPolarAngle) | onUpdate 时，竖直方向操作合理范围的最大弧度|

### 自由控制器

[FreeControl](${api}controls/FreeControl) 一般用于漫游控制，常见于游戏场景：

<playground src="controls-free.ts"></playground>

|属性|解释|
|:--|:--|
|[floorMock](${api}controls/FreeControl#floorMock)| 是否模拟地面，默认为 true |
|[floorY](${api}controls/FreeControl#floorY)| 配合 `floorMock` 使用，声明地面的位置信息 |
|[movementSpeed](${api}controls/FreeControl#movementSpeed) | 移动速度 |
|[rotateSpeed](${api}controls/FreeControl#rotateSpeed) | 旋转速度 |

### 正交控制器

[OrthoControl](${api}controls/OrthoControl) 一般用于控制 2D 场景中的缩放和位移：

<playground src="ortho-control.ts"></playground>

|属性|解释|
|:--|:--|
|[zoomSpeed](${api}controls/OrthoControl#zoomSpeed)| 缩放速度 |