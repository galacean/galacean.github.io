---
order: 3 
title: Collider 
label: Physics
---

The biggest advantage of introducing a physics engine for interactive projects is that the objects in the scene have
physical responses. The responses are divided into two types:

1. Trigger mode: The object does not have a rigid body shape, but can trigger a specific script function when it
   contacts.
2. Collider mode: Physics has a rigid body shape. When contact occurs, it can not only trigger script functions, but
   also change the original motion according to the laws of physics.

For these two types, corresponding functions are provided in the script, and the collider component also provides a
series of functions to set its own state, such as velocity, mass, etc.

## Collider and ColliderShape

[Collider](${api}core/Collider) is used to detect the collision between the collider on the
current [Entity](${api}core/Entity) and other colliders in the scene. Oasis provides two colliders:

1. [StaticCollider](${api}core/StaticCollider): static collider, mainly used for static objects in the scene;

<playground src="physx-collision-detection.ts"></playground>

2. [DynamicCollider](${api}core/DynamicCollider): Dynamic Collider, used for objects in the scene that need to be
   controlled by scripts or respond to physical feedback.

<playground src="physx-compound.ts"></playground>

In fact, each `Collider` is a collection of [ColliderShape](${api}core/ColliderShape), that is, each `Collider` can set
a composite collider shape by combining `ColliderShape`.

Currently, four `ColliderShape` are supported, but different back-end physical packages support different degrees, as
follows:

| 名称 | 解释                             | 支持的后端物理包                    |
| :--- |:-------------------------------|:----------------------------|
| [BoxColliderShape](${api}core/BoxColliderShape) | Box collider shape             | physics-lite, physics-physx |
| [SphereColliderShape](${api}core/SphereColliderShape) | Sphere collider shape          | physics-lite, physics-physx |
| [PlaneColliderShape](${api}core/PlaneColliderShape) | Unbounded plane collider shape | physics-physx |
| [CapsuleColliderShape](${api}core/CapsuleColliderShape) | Capsule collider shape         | physics-physx |

For specific APIs, please refer to the documentation. The special emphasis here is on the positional relationship
between `Collider` and `ColliderShape`. The pose of each `Collider` is the same as its mounted `Entity`, and the two are
synchronized every frame. while `ColliderShape`
On the above, you can set the offset relative to the `Collider` through the `position` property.

## Trigger script function

For the trigger mode, you first need to add a `Collider` to the `Entity` in the scene; when these components touch each
other, three functions in the script component are automatically triggered:

1. [onTriggerEnter](${docs}script-cn#ontriggerenter): called when touching each other
2. [onTriggerStay](${docs}script-cn#ontriggerstay): *loop* call during contact
3. [onTriggerExit](${docs}script-cn#ontriggerexit): called when the contact ends

Trigger mode can be enabled via `isTrigger` on `ColliderShape`, but it is important to emphasize that **trigger events
will not be called between two StaticColliders** unless one of them is a `DynamicCollider`.

## Collider script function

For collider mode, `DynamicCollider` interaction triggers three collision related script functions:

1. [onCollisionEnter](${docs}script-cn#oncollisionenter): Called when a collision is triggered
2. [onCollisionStay](${docs}script-cn#oncollisionstay): *loop* call during collision
3. [onCollisionExit](${docs}script-cn#oncollisionexit): called when the collision ends
