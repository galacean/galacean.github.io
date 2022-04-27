---
order: 4
title: Script
type: Core
---

In addition to [built-in components](${docs}entity#Common\ components), the Oasis engine also provides a powerful scripting system. The script system is the link between engine capabilities and game logic. The script is extended from the base class [Script](${api}core/Script). You can use it to extend the engine’s functions, as well as the life cycle hook functions provided by script components. Write your own game logic code in.

## Add script component

To add a script to the entity, you can do like this:

```typescript
import {
	Entity,
	Script
} from 'oasis-engine'

// 1. Create entity
const node = new Entity(engine);

// 2. Inherit Script
class MyScript extends Script {
	onUpdate() {}
}

// 3. Add a script component to the entity
entity.addComponent(MyScript);
```


## Component life cycle function

Oasis provides users with a wealth of life cycle callback functions. As long as the user defines a specific callback function, Oasis will automatically execute related scripts in a specific period, and the user does not need to manually call them. The life cycle callback functions currently provided to users are as follows:

![脚本生命周期-en](https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*-PrCQ7FP2WsAAAAAAAAAAAAAARQnAQ)


It is worth noting that only when **the entity is used as a camera**, that is, the camera component is added, [onBeginRender](${api}core/Script#onBeginRender) and [onEndRender](${api}core/Script #onEndRender) will be called.

The callback function description of each life cycle:

### [**onAwake**](${api}core/Script#onAwake)

If the [isActiveInHierarchy](${api}core/Entity#isactiveinhierarchy) of the entity to which the script is added is `true`, the callback function will be called when the script is initialized. If [isActiveInHierarchy](${api}core/Entity#isActiveInHierarchy) is `false`, it is called when the entity is activated, that is, [isActive](${api}core/Entity#isActive) is set to `true`. `onAwake` will only be called once, and at the forefront of all life cycles, usually we will do some initialization related operations in `onAwake`:

```typescript
onAwake() {
	this.child = this.entity.getChild(0);
	this.child.isActive = false;
}
```

### [**onEnable**](${api}core/Script#onEnable)

When the script’s [enabled](${api}core/Component#enabled) attribute changes from `false` to `true`, or the entity’s [isActiveInHierarchy](${api}core/Entity#isactiveinhierarchy) attribute changes from `false` to `true`, the `onEnable` callback will be activated. If the entity is created for the first time and [enabled](${api}core/Component#enabled) is `true`, it will be called after `onAwake` but before `onStart`.

### [**onDisable**](${api}core/Script#ondisable)

When the component's [enabled](${api}core/Component#enabled) property changes from `true` to `false`, or the entity's [isActiveInHierarchy](${api}core/Entity#isActiveInHierarchy) attribute changes from `true` to `false`, the `onDisable` callback will be activated.
Note: [isActiveInHierarchy](${api}core/Entity#isActiveInHierarchy) determines that the entity is activated in the hierarchical tree, that is, only when the entity is active, and its father and father’s father until the root entity are all active [isActiveInHierarchy](${api}core/Entity#isActiveInHierarchy) is `true`

### [**onStart**](${api}core/Script#onStart)

The `onStart` callback function will be triggered when the script enters the frame loop for the first time, that is, before the first execution of `onUpdate`. `onStart` is usually used to initialize some data that needs to be modified frequently. These data may be used in `onUpdate`.	

```typescript
onStart() {
	this.updateCount = 0
}

onUpdate() {
	this.updateCount++;
}
```
  
It is worth noting that Oasis executes the onUpdate in batches after the onStart callback is executed in batches. The advantage of this is that the initialized values of other entities can be accessed in the onUpdate:

```typescript
import { TheScript } from './TheScript'
onStart() {
	this.otherEntity = Entity.findByName('otherEntity');
	this.otherEntityScript = this.otherEntity.getComponent(TheScript)
}

onUpdate() {
	console.log(this.otherEntityScript.updateCount)
}
```

### [**onPhysicsUpdate**](${api}core/Script#onPhysicsUpdate)

The `onPhysicsUpdate` callback function is called at the same frequency as the physics engine update frequency. 
It may be called multiple times per rendered frame.

### [**onTriggerEnter**](${api}core/Script#onTriggerEnter)

`onTriggerEnter` will be called when the trigger collides, which handle the logic when the triggers meet, 
such as deleting the entity when the collision occurs.

### [**onTriggerStay**](${api}core/Script#onTriggerStay)

`onTriggerStay` will be called continuously during the collision of the trigger, once per frame.

### [**onTriggerExit**](${api}core/Script#onTriggerExit)

`onTriggerExit` will be called when the two triggers are separated, that is, 
when the collision relationship changes, it will be called only once.

### [**onCollisionEnter**](${api}core/Script#onCollisionEnter)

`onCollisionEnter` will be called when the collider collides, which handle the logic when the colliders meet,
such as deleting the entity when the collision occurs.

### [**onCollisionStay**](${api}core/Script#onCollisionStay)

`onCollisionStay` will be called continuously during the collision of the collider, once per frame.

### [**onCollisionExit**](${api}core/Script#onCollisionExit)

`onCollisionExit` will be called when the two colliders are separated, that is,
when the collision relationship changes, it will be called only once.

### [**onUpdate**](${api}core/Script#onUpdate)

A key point in game/animation development is to update the behavior, state and orientation of the object before each frame is rendered. These update operations are usually placed in the `onUpdate` callback.
```typescript
onStart() {
	this.rotationY = 0
}

onUpdate() {
	this.entity.transform.rotate(new Vector3(0, this.rotationY++, 0))
}
```

### [**onLateUpdate**](${api}core/Script#onLateUpdate)

`onUpdate` will be executed before all animations are updated, but if we need to perform some additional operations after the animations (such as animations, particles, etc.) are updated, or if we want to perform other operations after all the components of `onUpdate` have been executed For example, if the camera follows, you need to use the `onLateUpdate` callback.
```typescript
onStart() {
	this.rotationY = 0
}

onUpdate() {
	this.entity.transform.rotate(new Vector3(0, this.rotationY++, 0))
}

onLateUpdate() {
	this.rotationY %= 360;
}
```

### [**onBeginRender**](${api}core/Script#onBeginRender)

When the entity is used as a camera, that is, a camera component is added, the `onBeginRender` callback will be called before the camera component's [render](${api}core/Camera#render) method is called.

### [**onEndRender**](${api}core/Script#onEndRender)

When the entity is used as a camera, that is, a camera component is added, the `onEndRender` callback will be called after the camera component's [render](${api}core/Camera#render) method is called.

### [**onDestroy**](${api}core/Script#onDestroy)

When the component or entity calls [destroy](${api}core/Entity#destroy), the `onDestroy` callback will be called, and the component will be recycled at the end of the frame.

### Interfaces of input system

See [Input](${docs}input) for details。
