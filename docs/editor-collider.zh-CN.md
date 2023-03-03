---
order: 0
title: 碰撞器
type: 功能
group: 物理
label: Editor-Feature/Physics
---

## 介绍

在有 **物理碰撞** 或 **射线检测** 的场景中，需要引入[碰撞器](${docs}collision-cn)的概念，碰撞器在 Oasis 中属于组件，接下来我们将展示下如何在编辑器中 **可视化** 地操作碰撞器。

## 类型
在使用前，我们需要先了解下碰撞器的类型：

| 名称                                           | 解释                   |
|:---------------------------------------------|:---------------------|
| [StaticCollider](${api}core/StaticCollider)  | 静态碰撞器，一般用于阻挡用户前进的空气墙 |
| [DynamicCollider](${api}core/SphereCollider) | 动态碰撞器，可以使得物体受到物理规律的作用而发生运动               |

## 使用

1. **添加碰撞器组件**
首先需要考虑的是，碰撞器是静态的还是动态的，然后添加对应的碰撞器组件，静态碰撞器 StaticCollider 或者 动态 DynamicCollider

![buildBox](https://mdn.alipayobjects.com/huamei_vvspai/afts/img/A*ha7AS4lbXvsAAAAAAAAAAAAADsqFAQ/original)

2. **选择碰撞器的外形**
在引擎当中支持复合的碰撞器外形，也就是说，碰撞器本身可以由 BoxColliderShape，SphereColliderShape，CapsuleColliderShape 复合而成。
在加入碰撞器组件后，不会默认添加碰撞器外形，因此需要点击 Add Item 进行添加，添加后会在视口中看到碰撞器的辅助渲染出现。

![buildBox2](https://mdn.alipayobjects.com/huamei_vvspai/afts/img/A*2iyJQYNc7ZQAAAAAAAAAAAAADsqFAQ/original)

对于每一个碰撞器外形，都可以设计对应的一些大小属性。例如

![buildBox2](https://mdn.alipayobjects.com/huamei_vvspai/afts/img/A*miQpS5GQ6x8AAAAAAAAAAAAADsqFAQ/original)

但无论那个碰撞器外形，都可以设置 Local Position，即相对于 Entity 坐标的局部偏移

![buildBox2](https://mdn.alipayobjects.com/huamei_vvspai/afts/img/A*_vceQ529MJIAAAAAAAAAAAAADsqFAQ/original)

3. **动态碰撞器设置**
和静态碰撞器不同，动态碰撞器会受到物理规律的作用，因此有许多附加的物理属性进行设置

![buildBox2](https://mdn.alipayobjects.com/huamei_vvspai/afts/img/A*bUd8RIXCuXgAAAAAAAAAAAAADsqFAQ/original)

在修改这些参数后，视口不会发生变化，因为动态碰撞器默认会受到重力的作用，因此需要在 Play 模式下才能进行观察。

## 注意
- 确定的碰撞区域应尽量简单，以提高物理引擎检测的性能
- 碰撞器的参照坐标系为从属 Entity 的坐标系
- PlaneColliderShape 表示全平面，因此没有辅助线的显示，一般作为地板使用