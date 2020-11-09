# 碰撞检测

碰撞检测用来反映3D空间中的两个物体之间的相交情况。**Collision** 模块提供了常用的碰撞检测功能。


## 碰撞检测组件

**[CollisionDetection]({{book.api}}classes/core.collisiondetection.html)** 用来检测当前 [`Entity`]({{book.api}}classes/core.entity.html)  上的碰撞体（ [`Collider`]({{book.api}}classes/core.collider.html) ) 与场景中其他碰撞体 的碰撞情况。目前支持了以下碰撞体之间的碰撞检测：

| name | 解释 |
| :--- | ---: |
| [BoxCollider]({{book.api}}classes/core.aboxcollider.html) | 包围盒碰撞体 |
| [SphereCollider]({{book.api}}classes/core.aspherecollider.html) | 球型碰撞体 |


给物体添加碰撞体的方法请参考[射线投射]({{book.docs}}collision-system/ray.html)。

## 使用方法

使用碰撞检测，首先需要给场景中的 `Entity`  添加 `Collider` ；然后给需要碰撞检测的 `Entity` 添加 [`CollisionDetection`]({{book.api}}classes/core.collisiondetection.html)  组件，并注册发生碰撞的时候触发的事件：


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
cd.addEventListener('collision', (e) => {
  console.log('collision' + e.data.collider.entity.name);
});
```
