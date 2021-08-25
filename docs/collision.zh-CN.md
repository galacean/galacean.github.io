---
order: 12
title: 碰撞检测
type: 组件
---

碰撞检测用来反映3D空间中的两个物体之间的相交情况。**Collision** 模块提供了常用的碰撞检测功能。

## 碰撞检测组件

[CollisionDetection](${api}core/CollisionDetection) 用来检测当前 [Entity](${api}core/Entity)  上的碰撞体与场景中其他碰撞体 的碰撞情况。目前支持了以下碰撞体之间的碰撞检测：

| 名称 | 解释 |
| :--- | :--- |
| [BoxCollider](${api}core/BoxCollider) | 包围盒碰撞体 |
| [SphereCollider](${api}core/SphereCollider) | 球型碰撞体 |
| [PlaneCollider](${api}core/PlaneCollider) | 平面碰撞体 |


给物体添加碰撞体的方法请参考[射线投射](${docs}ray-cn)。

## 使用方法

使用碰撞检测，首先需要给场景中的 *Entity*  添加 *Collider* ；然后给需要碰撞检测的 *Entity* 添加 [CollisionDetection](${api}core/CollisionDetection) 组件。该组件会自动触发脚本组件当中的三个函数：
1. onTriggerEnter：碰撞触发时调用
2. onTriggerStay：碰撞过程中*循环*调用
3. onTriggerExit：碰撞结束时调用

代码如下：

```typescript
// 加载 collider 和 raycast 模块
import { SphereCollider, BoxCollider, CollisionDetection, Vector3 } from 'oasis-engine';

// create sphere test entity
let sphereEntity = rootEntity.createChild('SphereEntity');
sphereEntity.position = new Vector3(-2, 0, 0);

let radius = 1.25;
let sphereCollider = sphereEntity.addComponent(SphereCollider);
sphereCollider.setSphere(new Vector3(), radius);

// create box test entity
let boxEntity = rootEntity.createChild('BoxEntity');
let boxCollider = boxEntity.addComponent(BoxCollider);
let cubeSize = 2.0;
boxCollider.setBoxCenterSize(new Vector3(), new Vector3(cubeSize, cubeSize, cubeSize));

// add CollisionDetection
let cd = sphereEntity.addComponent(CollisionDetection);

class CollisionScript extends Script {
  onTriggerExit(other: ACollider) {
    console.log('collision' + other.entity.name);
  }
}
// add Script
sphereEntity.addComponent(CollisionScript);

```
