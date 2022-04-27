---
order: 1
title: 物理总览 
type: 功能模块
group: 物理系统
---

物理引擎是游戏引擎中非常重要的组成部分。 业界普遍采用 PhysX 引入相关功能。 但是对于轻量级的场景，PhysX 使得最终的应用体积非常大，超出了这些项目的限制。 Oasis 基于多后端设计。 一方面，它通过 WebAssembly
编译得到 [PhysX.js](https://github.com/oasis-engine/physX.js) ; 另一方面，它也提供了轻量级的物理引擎。
两者在 [API](https://github.com/oasis-engine/engine/tree/main/packages/design/src/physics) 设计上是一致的。 用户只需要在初始化引擎时选择特定的物理后端。
可以满足轻量级应用、重量级游戏等各种场景的需求。有关物理组件的总体设计，可以参考 [Wiki](https://github.com/oasis-engine/engine/wiki/Physical-system-design).

对于需要使用各种物理组件，以及 `InputManager` 等需要 Raycast 拾取的场景，都需要在使用之前初始化物理引擎。目前 Oasis 引擎提供两种内置的物理引擎后端实现：

1. [physics-lite](https://github.com/oasis-engine/engine/tree/main/packages/physics-lite)
2. [physics-physx](https://github.com/oasis-engine/engine/tree/main/packages/physics-physx)

初始化只需要将这两个后端的静态对象，绑定到 `physicsManager` 中即可：

```ts
import {LitePhysics} from "@oasis-engine/physics-lite";

const engine = new WebGLEngine("canvas");
engine.physicsManager.initialize(LitePhysics);
```

## Wasm 版物理引擎加载与初始化

由于WASM需要异步加载，因此引擎的初始化需要放在 Promise 的回调中进行。

```ts
import {PhysXPhysics} from "@oasis-engine/physics-physx";

PhysXPhysics.initialize().then(() => {
  const engine = new WebGLEngine("canvas");
  engine.physicsManager.initialize(PhysXPhysics);

  engine.run();
})
```

