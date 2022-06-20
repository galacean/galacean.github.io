---
order: 3
title: Character Controller
type: Physics
---

The character controller is a very important component provided by the physics engine. Through the character
controller, it is easy to add physical performance to the movement of the animated character. For example, parameters
can be set so that the character cannot climb a steep slope at a certain angle.
It is also possible to avoid collision feedback between the character and other colliders during the movement of the
character, and so on. In fact, the character controller is just an advanced encapsulation of the collider, which
implements various advanced character control behaviors through collision detection.
For this reason, the creation and use of the character controller component is very similar to the collider component.

```ts
const physicsCapsule = new CapsuleColliderShape();
physicsCapsule.radius = radius;
physicsCapsule.height = height;
const characterController = capsuleEntity.addComponent(CharacterController);
characterController.addShape(physicsCapsule);
````

Like the Collider component, the character controller gets a specific shape by constructing a `ColliderShape` and adding
it to the component. But two points need to be emphasized here:

1. The character controller does not support composite shapes, so only single `ColliderShape` can be added.
2. The character controller currently only supports `CapsuleColliderShape` and `BoxColliderShape`,
   and `CapsuleColliderShape` is the most commonly used.

The behavior of subsequent character controllers is controlled by various parameters and methods
of `CharacterController`, the most important of which is the `move` function:

```ts
class Controller extends Script {
    onPhysicsUpdate() {
        const fixedTimeStep = this.engine.physicsManager.fixedTimeStep;
        const character = this._character;
        const flag = character.move(this._displacement, 0.1, fixedTimeStep);
        if (flag | ControllerCollisionFlag.Down) {
            character.move(new Vector3(0, -0.2, 0), 0.1, fixedTimeStep);
        }
        this._displacement.setValue(0, 0, 0);
    }
}
````

Character displacement can be specified in the `move` method, and this method returns a composite value of an
enumeration type `ControllerCollisionFlag` to determine whether the character controller encounters other collider
components:

```ts
export enum ControllerCollisionFlag {
  /** Character is colliding to the sides. */
  Sides = 1,
  /** Character has collision above. */
  Up = 2,
  /** Character has collision below. */
  Down = 4
}
````

This is how the character's next animation and movement should be performed. In the following example, the movement of
the character can be controlled through the keyboard to climb or jump over certain obstacles.
<playground src="physx-controller.ts"></playground>
