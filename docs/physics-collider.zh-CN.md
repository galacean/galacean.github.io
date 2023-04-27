---
order: 3
title: 碰撞器组件 
type: 物理
label: Physics
---

引入物理引擎对于互动相互项目来说，最大的好处是使得场景中的物体拥有了物理响应，响应分为两种类型：

1. 触发器模式：物体不具备刚体外形，但发生接触时可以出发特定的脚本函数。
2. 碰撞器模式：物理具有刚体外形，发生接触时不仅可以触发脚本函数，还可以根据物理规律改变原先的运动。

针对这两种类型，脚本中都提供了对应的函数，并且碰撞器组件也提供了一系列设置自身状态的函数，例如速度，质量等等。

## 碰撞器与碰撞器外形

[Collider](${api}core/Collider) 用来检测当前 [Entity](${api}core/Entity)上的碰撞体与场景中其他碰撞体的碰撞情况。Galacean 提供了两种碰撞器：

1. [StaticCollider](${api}core/StaticCollider)：静态碰撞器，主要用于场景中静止的物体；

<playground src="physx-collision-detection.ts"></playground>

2. [DynamicCollider](${api}core/DynamicCollider)：动态碰撞器，用于场景中需要受到脚本控制，或者响应物理反馈的物体。

<playground src="physx-compound.ts"></playground>

事实上，每一种 `Collider` 都是 [ColliderShape](${api}core/ColliderShape) 的集合，即每一种 `Collider` 都可以通过组合 `ColliderShape` 设置复合的碰撞器外形。

目前支持了四种 `ColliderShape`，但不同的后端物理包支持程度不同，具体如下：

| 名称 | 解释       | 支持的后端物理包                    |
| :--- |:---------|:----------------------------|
| [BoxColliderShape](${api}core/BoxColliderShape) | 盒形碰撞外形   | physics-lite， physics-physx |
| [SphereColliderShape](${api}core/SphereColliderShape) | 球形碰撞外形   | physics-lite， physics-physx |
| [PlaneColliderShape](${api}core/PlaneColliderShape) | 无界平面碰撞外形 | physics-physx               |
| [CapsuleColliderShape](${api}core/CapsuleColliderShape) | 胶囊碰撞外形   | physics-physx               |

具体 API 可以参考文档，这里特别强调的是 `Collider` 与 `ColliderShape` 的位置关系。每一个 `Collider` 的姿态和其挂载的 `Entity` 是一致的，每一帧两者都会进行同步。而 `ColliderShape`
上则可以通过 `position` 属性设置 **相对于** `Collider` 的偏移。

![table](https://mdn.alipayobjects.com/huamei_vvspai/afts/img/A*erlGRKk7dNMAAAAAAAAAAAAADsqFAQ/original)

## 触发器脚本函数

对于触发器模式，首先需要给场景中的 `Entity` 添加 `Collider`；该当这些组件相互接触时，会自动触发脚本组件当中的三个函数：

1. [onTriggerEnter](${docs}script-cn#ontriggerenter)：相互接触时调用
2. [onTriggerStay](${docs}script-cn#ontriggerstay)：接触过程中*循环*调用
3. [onTriggerExit](${docs}script-cn#ontriggerexit)：接触结束时调用

可以通过 `ColliderShape` 上的 `isTrigger` 开启触发器模式，但需要特别强调的是，**两个 StaticCollider 之间不会调用触发器事件**，除非其中一个是 `DynamicCollider`。

## 碰撞器脚本函数

对于碰撞器模式，`DynamicCollider` 相互作用时会触发三个碰撞相关的脚本函数：
1. [onCollisionEnter](${docs}script-cn#oncollisionenter)：碰撞触发时调用
2. [onCollisionStay](${docs}script-cn#oncollisionstay)：碰撞过程中*循环*调用
3. [onCollisionExit](${docs}script-cn#oncollisionexit)：碰撞结束时调用
