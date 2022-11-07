---
order: 5
title: Joint Basic
type: Physics
label: Physics
---

The physical constraint component is a very important physical component. Through the constraint, you can better control
the movement of the dynamic collider component and add interesting interactive responses to the scene. This article
mainly introduces the three most basic physical constraint components:

1. Fixed constraint components

   ![fixedJoint](https://gameworksdocs.nvidia.com/PhysX/4.1/documentation/physxguide/_images/fixedJoint.png)
2. Elastic Constraint Components

   ![springJoint](https://gameworksdocs.nvidia.com/PhysX/4.1/documentation/physxguide/_images/distanceJoint.png)
3. Hinge restraint assembly

   ![hingeJoint](https://gameworksdocs.nvidia.com/PhysX/4.1/documentation/physxguide/_images/revoluteJoint.png)

All physical constraints have two effect objects, which represent the dynamic collider affected by the physical
constraint (the physical constraint component is mounted on this node), and the other is the position where the
constraint is mounted or another dynamic collider (via component configuration).
Therefore, these components are used in a similar way, taking the fixed constraint component `FixedJoint` as an example:

```typescript
const fixedJoint = currentEntity.addComponent(FixedJoint);
fixedJoint.connectedCollider = prevCollider;
````

## Local coordinates and world coordinates

One of the key points to understand the use of physical constraint components is to understand **local coordinates**
and **world coordinates**. All physics constraints can be configured with the `connectedCollider` property.
In addition, some physical constraint components can also set the location of the physical constraint by
configuring the `connectedAnchor` property.

**It is important to note that when `connectedCollider` is set, `connectedAnchor` represents the local coordinates
relative to the collider. When `connectedCollider` is null,
`connectedAnchor` represents world coordinates. **

## Hinge constraints

Among the above three physical constraints, the hinge constraint is relatively complex, because in addition to
configuring `connectedCollider` and `connectedAnchor`, you also need to specify the rotation axis direction and rotation
radius of the hinge.
These two properties can be specified by configuring `axis` (the default direction is towards the positive x-axis)
and `swingOffset`.
`swingOffset` is also a vector, which can be understood as the offset from the rotation center jointly determined
by `connectedAnchor` and `connectedCollider`, and the dynamic collision is moved to this point and starts to rotate
around the rotation axis.

For the use of the above physical constraint components, you can refer to:
<playground src="physx-joint-basic.ts"></playground>
