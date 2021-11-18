---
order: 13
title: 射线投射
type: 组件
---

射线可以理解成 3D 世界中一个点向一个方向发射的一条无终点的线。射线投射在 3D 应用中非常广泛。通过射线投射，可以在用户点击屏幕时，拾取 3D 场景中的物体；也可以在射击游戏中，判断子弹能否射中目标。

![image.png](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*sr_IRYSLugMAAAAAAAAAAAAAARQnAQ)
（_图片来源于网络_）

Oasis 中的射线检测根据不同的物理后端采用不同的算法，目前支持的物理后端有：

1. [physics-lite](https://www.npmjs.com/package/@oasis-engine/physics-lite)

<playground src="lite-raycast.ts"></playground>

2. [physics-physx](https://www.npmjs.com/package/@oasis-engine/physics-physx)

<playground src="physx-raycast.ts"></playground>

前者是过去里程碑中所使用的射线检测，直接遍历场景中的所有碰撞器求交。后者则是基于 [PhysX](https://www.nvidia.cn/geforce/technologies/physx/) 提供的碰撞检测算法，在有更多碰撞盒的情况下有更好的性能。

为了适用不同的物理后端，就需要在初始化引擎时指定特定的后端，例如下面的例子所展示的，要传入 LitePhysics，对应的PhysX 后端则需要传入 PhysXPhysics。

## 使用射线投射

在使用射线投射，首先要在代码中引入 [Ray](${api}math/Ray) 模块；然后生成射线，射线可以自定义生成，也可以通过相机（[camera](${api}core/Camera#viewportPointToRay)）将屏幕输入转化成射线；最后调用 [PhysicsManager.raycast](${api}core/PhysicsManager#raycast) 方法即可检测射线投射命中的碰撞体。代码如下：


```typescript
// 加载 Raycast 模块
import { WebGLEngine, HitResult, Ray } from 'oasis-engine';
import { LitePhysics } from "@oasis-engine/physics-lite";
const engine = new WebGLEngine("canvas", LitePhysics);
engine.canvas.resizeByClientSize();

// 自定义 Ray
let ray = new Ray([0, 0, 0], [0, 0, 1]);
let result = scene.raycast(ray);
if (result) {
  console.log("hit on the object");
}

// 将屏幕输入转换成Ray
document.getElementById('canvas').addEventListener('click', (e) => {
  const ratio = window.devicePixelRatio;
  camera.screenPointToRay(new Vector2(e.offsetX, e.offsetY).scale(ratio), ray);
  const hit = new HitResult();
  result = engine.physicsManager.raycast(ray, Number.MAX_VALUE, Layer.Everything, hit);
  if (result) {
    console.log(hit.entity.name);
  }
});
```

需要特别指出，如果想要对 Entity 启用射线投射，该 Entity 就必须拥有 **Collider** ，否则无法触发。