---
order: 1
title: Physics Overall 
type: Physics
---

The physics engine is a very important part of the game engine. The industry generally adopts PhysX to introduce related
functions. But for lightweight scenarios, PhysX makes the size of final application very large, beyond the constraints of
these projects. Oasis is based on a multi-backend design. On the one hand, it uses WebAssembly Compile to
get [PhysX.js](https://github.com/oasis-engine/physX.js) ; on the other hand, it also provides a lightweight physics
engine. Both are identical in [API](https://github.com/oasis-engine/engine/tree/main/packages/design/src/physics)
design. Users only need to select a specific physical backend when initializing the engine. It can meet the needs of
various scenarios such as lightweight applications and heavyweight games. For the overall design of physical components,
you can refer to [Wiki](https://github.com/oasis-engine/engine/wiki/Physical-system-design)

For scenes that need to use various physics components, `InputManager` and other scenes that need to be picked up by
Raycast, you need to initialize the physics engine before use. Currently, the Oasis engine provides two built-in physics
engine backend implementations:

1. [physics-lite](https://github.com/oasis-engine/engine/tree/main/packages/physics-lite)
2. [physics-physx](https://github.com/oasis-engine/engine/tree/main/packages/physics-physx)

Initialization only needs to bind the static objects of these two backends to `physicsManager`:

```ts
import {LitePhysics} from "@oasis-engine/physics-lite";

const engine = new WebGLEngine("canvas");
engine.physicsManager.initialize(LitePhysics);
```

## Wasm version physics engine loading and initialization

Since WASM needs to be loaded asynchronously, the initialization of the engine needs to be done in the callback of
Promise.

```ts
import {PhysXPhysics} from "@oasis-engine/physics-physx";

PhysXPhysics.initialize().then(() => {
  const engine = new WebGLEngine("canvas");
  engine.physicsManager.initialize(PhysXPhysics);

  engine.run();
})
```

