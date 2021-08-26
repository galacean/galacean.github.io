---
order: 1.4
title: 碰撞体
type: 编辑器
group: 组件
---

## 介绍

在有 **物理碰撞** 或 **射线检测** 的场景中，需要引入[碰撞体](${docs}collision-cn)的概念，碰撞体在 Oasis 中属于组件，接下来我们将展示下如何在编辑器中 **可视化** 地操作碰撞体。

## 类型
在使用前，我们需要先了解下碰撞体的类型，顾名思义，碰撞体的类型是按照它包围区域的形状确定的。

| 名称 | 解释 |
| :--- | :--- |
| [BoxCollider](${api}core/BoxCollider) | 长方体碰撞体 |
| [SphereCollider](${api}core/SphereCollider) | 球型碰撞体 |
| [PlaneCollider](${api}core/PlaneCollider) | 平面碰撞体 |

## 使用

1.**确定碰撞区域和碰撞体类型** 
在我们为 Entity 增加碰撞体组件时，需要先确定碰撞检测的范围，我们以最简单的几何体模型为例。

![buildBox](https://gw.alipayobjects.com/zos/OasisHub/ad2225ed-e793-4143-a6ed-25a2f9826a6d/buildBox.gif)

因为模型为长方体，所以可以清晰的确定`碰撞范围`为`长方体`，并且选择`碰撞体类型`为`长方体碰撞体`。

2.**绑定碰撞体组件。** 
在确定了碰撞体类型后，就可以为模型加上碰撞体了，点选模型节点，在右侧检查器面板最下方点击 **添加组件** ，在弹出的组件列表中选中 **立方体碰撞体** ，此时节点就成功加上碰撞体了。

![buildBox](https://gw.alipayobjects.com/zos/OasisHub/716234fd-c343-4b7d-8179-1bd438787276/buildBox.gif)

在添加完这个组件后，我们可以看下这个组件的设置。

<img src="https://gw.alipayobjects.com/zos/OasisHub/281656ae-c172-483c-be62-1818cb0a20a7/image-20210721144328067.png" alt="image-20210721144328067" style="zoom:50%;" />

| 设置 | 解释 |
| :--- | :--- |
| isShowCollider | 点选此模型时是否显示碰撞体轮廓（只在编辑时辅助观察使用，不影响 runtime ） |
| center（Vector3） | 碰撞体中心点在模型节点中的相对位置（以从属 Entity 的局部坐标系为参照） |
| size（Vector3） | 碰撞体的尺寸，调整它来覆盖我们已经确定的碰撞区域（以从属 Entity 的局部坐标系为参照） |

3.**调整碰撞体位置与尺寸** 
上个步骤对碰撞体设置的解释中说过，碰撞体的中心点和尺寸都是以模型的局部坐标系为参照的，因此，覆盖碰撞区域可以理解为**用这个碰撞体在其从属的 Entity 的局部坐标系中覆盖模型**。

![buildBox](https://gw.alipayobjects.com/zos/OasisHub/9d545199-a9e7-4d89-afc1-d01d22fb96e6/buildBox.gif)

## 其他示例
1.**一个节点设置多个碰撞体**

![buildBox](https://gw.alipayobjects.com/zos/OasisHub/03ebe9cd-ee6d-4ed8-8308-b7c034d3d078/buildBox.gif)

2.**根节点上为地球子节点增加一个碰撞体组件**

<img src="https://gw.alipayobjects.com/zos/OasisHub/9d9a2d37-b550-4657-9883-064f6cd040ff/image-20210721150306364.png" alt="image-20210721150306364" style="zoom:50%;" />

![buildBox](https://gw.alipayobjects.com/zos/OasisHub/755facc1-ae8f-437c-90e9-decb93a1c6fe/buildBox.gif)

## 注意
- 确定的碰撞区域应尽量简单
- 碰撞体的参照坐标系为从属 Entity 的局部坐标系