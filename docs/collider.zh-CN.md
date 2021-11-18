---
order: 12
title: 碰撞检测
type: 组件
---

碰撞检测用来反映3D空间中的两个物体之间的相交情况。**Physics** 模块提供了常用的碰撞检测功能。

## 碰撞检测组件

[Collider](${api}core/Collider) 用来检测当前 [Entity](${api}core/Entity) 上的碰撞体与场景中其他碰撞体的碰撞情况。Oasis 提供了两种碰撞器：
1. [StaticCollider](${api}core/StaticCollider)：静态碰撞器，主要用于场景中静止的物体；
2. [DynamicCollider](${api}core/DynamicCollider)：动态碰撞器，用于场景中需要受到脚本控制，或者响应物理反馈的物体。

事实上，每一种 Collider 都是 [ColliderShape](${api}core/ColliderShape) 的集合，即每一种Collider都可以通过组合 ColliderShape 设置复合的碰撞器外形。 

目前支持了四种 ColliderShape，但不同的后端物理包支持程度不同，具体如下：

| 名称 | 解释 | 支持的后端物理包 |
| :--- | :--- | :--- |
| [BoxColliderShape](${api}core/BoxColliderShape) | 包围盒碰撞体 | Physics-lite， Physics-PhysX |
| [SphereColliderShape](${api}core/SphereColliderShape) | 球型碰撞体 | Physics-lite， Physics-PhysX |
| [PlaneColliderShape](${api}core/PlaneColliderShape) | 平面碰撞体 | Physics-PhysX |
| [CapsuleColliderShape](${api}core/CapsuleColliderShape) | 胶囊碰撞体 | Physics-PhysX |

## 使用方法

使用碰撞检测，首先需要给场景中的 *Entity*  添加 *Collider* ；该组件会自动触发脚本组件当中的三个函数：
1. [onTriggerEnter](${docs}script-cn#ontriggerenter)：碰撞触发时调用
2. [onTriggerStay](${docs}script-cn#ontriggerstay)：碰撞过程中*循环*调用
3. [onTriggerExit](${docs}script-cn#ontriggerexit)：碰撞结束时调用

需要特别强调的是，**两个 StaticCollider 之间不会触发碰撞检测事件**，除非其中一个是 DynamicCollider。

同时，Oasis支持多物理后端，所以首先需要根据您使用的物理特性，在引擎初始化时设置对应的物理后端，lite包更加轻量，但支持的物理特性较少，physX包强大，但打包后的体积较大，代码如下：

```typescript
import {
  Vector3,
  SphereColliderShape,
  BoxColliderShape,
  StaticCollider,
  DynamicCollider,
  ColliderShape
} from 'oasis-engine';
import { LitePhysics } from "@oasis-engine/physics-lite";

const engine = new WebGLEngine("canvas", LitePhysics);

// create sphere test entity
let sphereEntity = rootEntity.createChild('SphereEntity');
sphereEntity.position = new Vector3(-2, 0, 0);

let sphereCollider = sphereEntity.addComponent(StaticCollider);
let sphhereColliderShape = new SphereColliderShape()
sphhereColliderShape.radius = 1.25;
sphereCollider.addShape(sphhereColliderShape);

// create box test entity
let boxEntity = rootEntity.createChild('BoxEntity');
let boxCollider = boxEntity.addComponent(DynamicCollider);
let boxColliderShape = new BoxColliderShape()
boxColliderShape.setSize(2.0, 2.0, 2.0);
boxCollider.addShape(boxColliderShape);

class CollisionScript extends Script {
  onTriggerExit(other: ColliderShape) {
    console.log('collision' + other.entity.name);
  }
}

// add Script
sphereEntity.addComponent(CollisionScript);
```

<playground src="lite-collision-detection.ts"></playground>