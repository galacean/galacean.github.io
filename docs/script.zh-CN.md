---
order: 4
title: 脚本
type: 核心
---

除了[内置组件](${docs}entity-cn#常用组件)之外，Oasis 引擎还提供强大的脚本系统。脚本系统是衔接引擎能力和游戏逻辑的纽带，脚本扩展自 [Script](${api}core/Script) 基类，用户可以通过它来扩展引擎的功能，也可以脚本组件提供的生命周期钩子函数中编写自己的游戏逻辑代码。

## 添加脚本组件

为实体添加脚本可以这样做：
```typescript
import {
	Entity,
	Script
} from 'oasis-engine'

// 1.创建实体
const entity = new Entity(engine);

// 2. 继承Script
class MyScript extends Script {
	onUpdate() {}
}

// 3. 给实体添加脚本组件
entity.addComponent(MyScript);
```


## 组件生命周期函数

Oasis 为用户提供了丰富的生命周期回调函数，用户只要定义特定的回调函数，Oasis 就会在特定的时期自动执行相关脚本，用户不需要手工调用它们。目前提供给用户的生命周期回调函数如下:

![脚本生命周期-zh](https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*gZuKQocCq9AAAAAAAAAAAAAAARQnAQ)

值得注意的是，**只有当实体被作为相机使用**，也就是添加了相机组件，[onBeginRender](${api}core/Script#onBeginRender) 和 [onEndRender](${api}core/Script#onEndRender) 才会被调用的。  

每个生命周周期回调函数说明：
### [**onAwake**](${api}core/Script#onAwake)

如果脚本添加到的实体的 [isActiveInHierarchy](${api}core/Entity#isactiveinhierarchy) 为 `true`，则在脚本初始化时回调函数将被调用，如果[isActiveInHierarchy](${api}core/Entity#isActiveInHierarchy) 为 `false`，则在实体被激活，即 [isActive](${api}core/Entity#isActive) 被设为 `true` 时被调用。 `onAwake` 只会被调用一次，并且在所有生命周期的最前面，通常我们会在 `onAwake` 中做一些初始化相关的操作：

```typescript
onAwake() {
	this.child = this.entity.getChild(0);
	this.child.isActive = false;
}
```

### [**onEnable**](${api}core/Script#onEnable)

当脚本的 [enabled](${api}core/Component#enabled) 属性从 `false` 变为 `true` 时，或者所在实体的 [isActiveInHierarchy](${api}core/Entity#isactiveinhierarchy) 属性从 `false` 变为 `true` 时，会激活 `onEnable` 回调。倘若实体第一次被创建且 [enabled](${api}core/Component#enabled) 为 `true`，则会在 `onAwake` 之后，`onStart` 之前被调用。

### [**onDisable**](${api}core/Script#ondisable)

当组件的 [enabled](${api}core/Component#enabled) 属性从 `true` 变为 `false` 时，或者所在实体的 [isActiveInHierarchy](${api}core/Entity#isActiveInHierarchy) 属性从 `true` 变为 `false` 时，会激活 `onDisable` 回调

注意：[isActiveInHierarchy](${api}core/Entity#isActiveInHierarchy) 的判断方法为实体在层级树中是被激活状态即该实体为激活状态，它的父亲及父亲的父亲直到根实体都为激活状态 [isActiveInHierarchy](${api}core/Entity#isActiveInHierarchy) 才为 `true` 

### [**onStart**](${api}core/Script#onStart)

`onStart` 回调函数会在脚本第一次进入帧循环，也就是第一次执行 `onUpdate` 之前触发。`onStart` 通常用于初始化一些需要经常修改的数据，这些数据可能在 `onUpdate` 时会发生改变。

```typescript
onStart() {
	this.updateCount = 0
}

onUpdate() {
	this.updateCount++;
}
```

值得注意的是 Oasis 是批量执行完 `onStart` 回调之后再批量执行 `onUpdate` 这样做的好处是，可以在 `onUpdate` 中访问其他实体初始化的值：

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

`onPhysicsUpdate` 回调函数调用频率与物理引擎更新频率保持一致。每个渲染帧可能会调用多次。

### [**onTriggerEnter**](${api}core/Script#onTriggerEnter)

`onTriggerEnter` 回调函数会在触发器相互接触时调用，以处理触发器相遇时的逻辑，例如在触发发生时删除实体。

### [**onTriggerStay**](${api}core/Script#onTriggerStay)

`onTriggerStay` 回调函数会在触发器接触过程中**持续**调用，每帧调用一次。

### [**onTriggerExit**](${api}core/Script#onTriggerExit)
`onTriggerExit` 回调函数会在两个触发器分离时被调用，即触发关系发生改变，只调用一次。

### [**onCollisionEnter**](${api}core/Script#onCollisionEnter)

`onCollisionEnter` 回调函数会在碰撞器碰撞时调用，以处理碰撞体相遇时的逻辑，例如在碰撞发生时删除实体。

### [**onCollisionStay**](${api}core/Script#onCollisionStay)

`onCollisionStay` 回调函数会在碰撞器碰撞过程中**持续**调用，每帧调用一次。

### [**onCollisionExit**](${api}core/Script#onCollisionExit)
`onCollisionExit` 回调函数会在两个碰撞器分离时被调用，即碰撞关系发生改变，只调用一次。

### [**onUpdate**](${api}core/Script#onUpdate)

游戏/动画开发的一个关键点是在每一帧渲染前更新物体的行为，状态和方位。这些更新操作通常都放在 `onUpdate` 回调中。接收与上一次 `onUpdate` 执行时间差参数, 类型是 `number`

```typescript
onStart() {
	this.rotationY = 0
}

onUpdate(deltaTime: number) {
	this.entity.transform.rotate(new Vector3(0, this.rotationY++, 0))
}
```

### [**onLateUpdate**](${api}core/Script#onLateUpdate)

`onUpdate` 会在所有动画更新前执行，但如果我们要在动效（如动画、粒子等）更新之后才进行一些额外操作，或者希望在所有组件的 `onUpdate` 都执行完之后才进行其它操作比如相机跟随，那就需要用到 `onLateUpdate` 回调。接收与上一次 `onLateUpdate` 执行时间差参数, 类型是 `number`

```typescript
onStart() {
	this.rotationY = 0
}

onUpdate() {
	this.entity.transform.rotate(new Vector3(0, this.rotationY++, 0))
}

onLateUpdate(deltaTime: number) {
	this.rotationY %= 360;
}
```
### [**onBeginRender**](${api}core/Script#onBeginRender)

当实体被作为相机使用，也就是添加了相机组件，那么当相机组件的 [render](${api}core/Camera#render) 方法调用之前 `onBeginRender` 回调将被调用。

### [**onEndRender**](${api}core/Script#onEndRender)

当实体被作为相机使用，也就是添加了相机组件，那么当相机组件的 [render](${api}core/Camera#render) 方法调用之后 `onEndRender` 回调将被调用。

### [**onDestroy**](${api}core/Script#onDestroy)

当组件或者所在实体调用了 [destroy](${api}core/Entity#destroy)，则会调用 `onDestroy` 回调，并在当帧结束时统一回收组件。

### 输入系统接口

详见[输入交互](${docs}input-cn)。
