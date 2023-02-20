---
order: 2
title: 视图区
type: 编辑器
group: 基础操作
label: 编辑器/基础操作
---

# 简介

视图窗口是用于选择、定位、更改当前场景中各种类型实体及组件的交互式界面。
![merge](https://mdn.alipayobjects.com/huamei_qbugvr/afts/img/A*KnUgR7hfVrsAAAAAAAAAAAAADtKFAQ/original)

# 导航

## 标准导航

![merge](https://mdn.alipayobjects.com/huamei_qbugvr/afts/img/A*eI0bRorCPVQAAAAAAAAAAAAADtKFAQ/original)

| 操作        | 快捷键                                                             |
| :---------- | :----------------------------------------------------------------- |
| `环绕轨道`  | alt + 鼠标左键                                                     |
| `平移`      | alt + command + 鼠标左键， 或者 按下鼠标滚轮                       |
| `放大/缩小` | alt + control + 鼠标左键，或者 滚动鼠标滚轮，或者 触控板上双指轻扫 |

围绕中心视点旋转视图。

- 单击并按住鼠标左键
- 按住 Alt (Windows) 或 Option (macOS)
- （环绕轨道）拖动鼠标绕中心视点移动视图
- （平移）叠加按住 Command， 拖动鼠标移动场景相机
- （缩放）叠加按住 Control，拖动鼠标缩放场景

或者

- （平移）按住 鼠标滚轮， 拖动鼠标移动场景相机
- （缩放）滚动 鼠标滚轮，或者在触控板上双指轻扫，缩放场景

## 飞行模式

![merge](https://mdn.alipayobjects.com/huamei_qbugvr/afts/img/A*afL_QpOSDocAAAAAAAAAAAAADtKFAQ/original)

| 操作           | 快捷键                        |
| :------------- | :---------------------------- |
| `围绕相机观察` | alt + 鼠标右键                |
| `前进`         | 方向键向上，或者 鼠标右键 + W |
| `后退`         | 方向键向下，或者 鼠标右键 + S |
| `左平移`       | 方向键向左，或者 鼠标右键 + A |
| `右平移`       | 方向键向右，或者 鼠标右键 + D |
| `向上移动`     | 鼠标右键 + E                  |
| `向下移动`     | 鼠标右键 + Q                  |
| `改变飞行速度` | 鼠标右键 + 鼠标滚轮           |

在大型场景中我们通常会使用第一人称控件，即场景相机在三维空间中前后左右上下移动，而不是标准导航中绕着中心视点转。

- 单击并按住鼠标右键
- 按住 **Alt (Windows)** 或 **Option (macOS)**，拖动鼠标绕场景相机移动视图
- 使用 **WASD** 键向左/向右/向前/向后移动，使用 **Q** 和 **E** 键向上和向下移动
- 滚动 鼠标滚轮 可以改变移动速度

或者

- 使用 方向键向左/向右/向前/向后移动

## 导航部件

![merge](https://mdn.alipayobjects.com/huamei_qbugvr/afts/img/A*mLsJQJoi_DwAAAAAAAAAAAAADtKFAQ/original)

用于显示场景相机的当前方向，并且可以通过鼠标操作快速修改视角和投影模式（正交/透视）。

<h2 id = '6'> 聚焦 </h2>

| 图标                                                                                                                              | 操作           | 快捷键 |
| :-------------------------------------------------------------------------------------------------------------------------------- | :------------- | :----- |
| <img src="https://mdn.alipayobjects.com/huamei_qbugvr/afts/img/A*dIQJQLEsSvQAAAAAAAAAAAAADtKFAQ/original" width="24" height="24"> | `聚焦选中物体` | F      |

将场景相机聚焦于选中实体。锚点的选择会影响聚焦目标为中心锚点，或枢纽锚点。

# 选择

![merge](https://mdn.alipayobjects.com/huamei_qbugvr/afts/img/A*VK62T7Q0TSkAAAAAAAAAAAAADtKFAQ/original)

可以在层级中对场景中实体进行选择，也可以直接在视图窗口点选。

选中的实体轮廓颜色为橙色，子节点轮廓为蓝色。

# 工具栏

工具栏位于视图窗口中上，鼠标停留会出现每一项的快捷键，或者内容说明。

![merge](https://mdn.alipayobjects.com/huamei_qbugvr/afts/img/A*vU40Rb-2s5QAAAAAAAAAAAAADtKFAQ/original)

从左到右依次为：

- [Gizmo - 移动](#1)
- [Gizmo - 旋转](#2)
- [Gizmo - 缩放](#3)
- [锚点](#4)
- [坐标](#5)
- [聚焦](#6)
- [设置](#7)

- [场景相机](#8)
- [模式](#9)
- [全局/复原](#10)
- [截屏](#11)

## Gizmo

更改选中实体的可视化变换组件，直接使用鼠标操纵辅助图标轴。

<h3 id = '1'> 移动 </h3>

| 图标                                                                                                                              | 操作                    | 快捷键 |
| :-------------------------------------------------------------------------------------------------------------------------------- | :---------------------- | :----- |
| <img src="https://mdn.alipayobjects.com/huamei_qbugvr/afts/img/A*s6H2RIawrzgAAAAAAAAAAAAADtKFAQ/original" width="24" height="24"> | `切换到 Gizmo 移动模式` | W      |

点击辅助轴，可在单个方向内拖动选中实体。点击辅助平面，可在单个平面内拖动选中实体。

<h3 id = '2'> 旋转 </h3>

| 图标                                                                                                                              | 操作                    | 快捷键 |
| :-------------------------------------------------------------------------------------------------------------------------------- | :---------------------- | :----- |
| <img src="https://mdn.alipayobjects.com/huamei_qbugvr/afts/img/A*lwdcRK3MAUIAAAAAAAAAAAAADtKFAQ/original" width="24" height="24"> | `切换到 Gizmo 选择模式` | E      |

点击并拖动以更改选中实体的旋转。
红色代表绕 X 轴进行旋转，绿色代表绕 y 轴进行旋转，蓝色代表绕 z 轴进行旋转。

<h3 id = '3'> 缩放 </h3>

| 图标                                                                                                                              | 操作                    | 快捷键 |
| :-------------------------------------------------------------------------------------------------------------------------------- | :---------------------- | :----- |
| <img src="https://mdn.alipayobjects.com/huamei_qbugvr/afts/img/A*r7RiRpAiJm0AAAAAAAAAAAAADtKFAQ/original" width="24" height="24"> | `切换到 Gizmo 缩放模式` | R      |

点击中心立方体，在所有轴上均匀的缩放选中实体。点击辅助轴，在单个方向缩放选中实体。

<h2 id = '4'> 锚点 </h2>
确定 Gizmo，以及<strong>聚焦目标</strong>的位置。更改此选项可以更容易地在想要的点周围进行转换。

| 图标                                                                                                                              | 选项       | 内容                           |
| :-------------------------------------------------------------------------------------------------------------------------------- | :--------- | :----------------------------- |
| <img src="https://mdn.alipayobjects.com/huamei_qbugvr/afts/img/A*A5olSoPK_jMAAAAAAAAAAAAADtKFAQ/original" width="24" height="24"> | `中心锚点` | 选中实体及其子节点包围盒的中心 |
| <img src="https://mdn.alipayobjects.com/huamei_qbugvr/afts/img/A*hniTQL6c-D0AAAAAAAAAAAAADtKFAQ/original" width="24" height="24"> | `枢纽锚点` | 选中实体的世界坐标             |

<h2 id = '5'> 坐标 </h2>
确定 gizmo 在场景中姿态

| 图标                                                                                                                              | 选项       | 内容                                              |
| :-------------------------------------------------------------------------------------------------------------------------------- | :--------- | :------------------------------------------------ |
| <img src="https://mdn.alipayobjects.com/huamei_qbugvr/afts/img/A*of8ATKP_4u0AAAAAAAAAAAAADtKFAQ/original" width="24" height="24"> | `本地坐标` | 保持 Gizmo 相对于选中实体的旋转                   |
| <img src="https://mdn.alipayobjects.com/huamei_qbugvr/afts/img/A*Okm5S64_LqEAAAAAAAAAAAAADtKFAQ/original" width="24" height="24"> | `全局坐标` | 固定 Gizmo 与世界空间方向。即与场景中网格方向一致 |

<h2 id = '7'> 设置 </h2>
设置菜单包含用于调整视图辅助显示的选项。包括

- [网格](#1.3)
- [辅助图标](#1.1)
- [辅助线框](#1.2)

<h3 id = '1.1'> 网格 </h3>

在场景中沿 xz 轴方向放置的无极网格。用以增强场景空间感。

| 属性   | 内容                 | 默认 |
| :----- | :------------------- | :--- |
| `网格` | 视图中的网格是否显示 | 开启 |

<h3 id = '1.2'> 辅助图标 </h3>

辅助图标是与场景中特定组件相关联的图形。目前类型包括相机、直射光、点光源、聚光灯。

| 属性      | 内容                                       | 默认 |
| :-------- | :----------------------------------------- | :--- |
| `3D 图标` | 辅助图标是否根据组件与摄像机的距离进行缩放 | 开启 |

<h3 id = '1.3'> 辅助线框 </h3>

辅助线框是与场景中特定组件相关联的线框。仅在选中带有该组件的实体时显示。
| 属性 | 内容 |默认
| :-- | :-- |:-- |
| `相机` | 以锥体显示选中相机组件 | 开启
| `直射光` | 显示直射光组件的方向 | 关闭
| `点光源` | 显示点光源组件| 关闭
| `聚光灯` | 显示聚光灯组件的方向 | 关闭
| `静态碰撞体` | 显示静态碰撞体形状 | 开启
| `动态碰撞体` | 显示动态碰撞体形状 | 开启

<h2 id = '8'> 场景相机 </h2>
场景相机菜单包含用于配置场景相机的选项。这些调整不会影响场景中带有相机组件的实体的设置。

| 属性       | 内容                                                         | 默认                 |
| :--------- | :----------------------------------------------------------- | :------------------- |
| `视角`     | 场景相机的视角                                               | 60                   |
| `动态裁剪` | 相对选中实体和场景相机位置，自动计算场景相机的近裁面和远裁面 | 关闭                 |
| `近裁面`   | 手动调整相对于场景相机的最近点                               | 不勾选动态裁剪后开启 |
| `远裁面`   | 手动调整相对于场景相机的最远点                               | 不勾选动态裁剪后开启 |

<h2 id = '9'> 模式 </h2>
方便在 2D/3D 场景模式间进行点击切换。

2D 模式下，导航部件、正交/透视切换关闭，导航中的环绕轨道不再生效。

| 图标                                                                                                                              | 内容            |
| :-------------------------------------------------------------------------------------------------------------------------------- | :-------------- |
| <img src="https://mdn.alipayobjects.com/huamei_qbugvr/afts/img/A*QzcETYEe338AAAAAAAAAAAAADtKFAQ/original" width="24" height="24"> | `当前模式为 3D` |
| <img src="https://mdn.alipayobjects.com/huamei_qbugvr/afts/img/A*EZezT6T1LBoAAAAAAAAAAAAADtKFAQ/original" width="24" height="24"> | `当前模式为 2D` |

<h2 id = '10'> 全屏/复原 </h2>

| 图标                                                                                                                              | 内容                                       |
| :-------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------- |
| <img src="https://mdn.alipayobjects.com/huamei_qbugvr/afts/img/A*WqDQQZTAOjEAAAAAAAAAAAAADtKFAQ/original" width="24" height="24"> | `最大化视图窗口，最小化层级、资产、检查器` |

<h2 id = '11'> 截屏 </h2>
对当前场景进行快照。仅显示场景内用户创建实体，辅助显示的一系列工具，如图标、网格、gizmo 不会被计入其中。进行截屏后，该快照会在首页作为该项目缩略图。

| 图标                                                                                                                              | 内容   |
| :-------------------------------------------------------------------------------------------------------------------------------- | :----- |
| <img src="https://mdn.alipayobjects.com/huamei_qbugvr/afts/img/A*cqFUSrG5QvgAAAAAAAAAAAAADtKFAQ/original" width="24" height="24"> | `截屏` |

# 预览

![merge](https://mdn.alipayobjects.com/huamei_qbugvr/afts/img/A*wNTaQKkA1bYAAAAAAAAAAAAADtKFAQ/original)

选中带有相机组件的实体时，会在视图窗口左下角显示该相机的实时预览。帮助用户实时调整相机、场景位置。

有 display、phone 两种常见高宽比可以选择。并且可以点击左上角锁形图标锁定预览相机。
