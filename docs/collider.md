---
order: 12
title: Collision Detection
type: Component
---

Collision detection is used to reflect the intersection between two objects in 3D space. The **Physics** module provides
common collision detection functions.

## Collision detection component

[Collider](${api}core/Collider) is used to detect the collision between the current collider
on [Entity](${api}core/Entity) and other colliders in the scene. Oasis provides two types of colliders:

1. [StaticCollider](${api}core/StaticCollider): Static collider, mainly used for static objects in the scene;
2. [DynamicCollider](${api}core/DynamicCollider): Dynamic Collider, used for objects in the scene that need to be controlled by scripts or respond to
   physical feedback.

In fact, each type of Collider is a collection of [ColliderShape](${api}core/ColliderShape), that is, each type of
Collider can set a composite collider shape by combining ColliderShape.

Currently, four types of ColliderShape are supported, but different back-end physical packages support different levels,
as follows:

| Name | Explanation | Supported back-end physical package |
| :--- | :--- | :--- |
| [BoxColliderShape](${api}core/BoxColliderShape) | Bounding Box Collider | Physics-lite, Physics-PhysX |
| [SphereColliderShape](${api}core/SphereColliderShape) | Sphere collider | Physics-lite, Physics-PhysX |
| [PlaneColliderShape](${api}core/PlaneColliderShape) | Plane Collider | Physics-PhysX |
| [CapsuleColliderShape](${api}core/CapsuleColliderShape) | Capsule Collider | Physics-PhysX |

The collision detection in Oasis uses different algorithms according to different physical backends. The currently supported
physical backends are:

1. [physics-lite](https://www.npmjs.com/package/@oasis-engine/physics-lite)

<playground src="lite-collision-detection.ts"></playground>

2. [physics-physx](https://www.npmjs.com/package/@oasis-engine/physics-physx)

<playground src="physx-collision-detection.ts"></playground>

## Instructions

To use collision detection, you first need to add *Collider* to the *Entity* in the scene; this component will
automatically trigger three functions in the script component:

1. [onTriggerEnter](${docs}script#ontriggerenter): called when the collision is triggered
2. [onTriggerStay](${docs}script#ontriggerstay): *loop* called during collision
3. [onTriggerExit](${docs}script#ontriggerexit): called when the collision ends

It is important to emphasize that **no collision detection event will be triggered between two StaticColliders** unless
one of them is DynamicCollider.

At the same time, Oasis supports multiple physical backends, so you first need to set the corresponding physical backends when you initialize the engine according to the physical features you use. The lite package is more lightweight, but supports fewer physical features. The physX package is powerful, but packaged The latter mention is larger, and the code is as follows:

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