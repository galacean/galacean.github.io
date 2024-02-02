---
order: 0
title: 脚本总览
type: 脚本
label: Script
---

除了[内置组件](${docs}core-component)之外，Galacean 引擎还提供强大的脚本系统。脚本系统是衔接引擎能力和游戏逻辑的纽带，脚本扩展自 [Script](${api}core/Script) 基类，用户可以通过它来扩展引擎的功能，也可以脚本组件提供的生命周期钩子函数中编写自己的游戏逻辑代码。

## 添加脚本组件

为实体添加脚本可以这样做：
```typescript
import {
	Entity,
	Script
} from "@galacean/engine"

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

Galacean 为用户提供了丰富的生命周期回调函数，用户只要定义特定的回调函数，Galacean 就会在特定的时期自动执行相关脚本，用户不需要手工调用它们。目前提供给用户的生命周期回调函数如下:

![脚本生命周期-zh](https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*_8C-TJP2UIgAAAAAAAAAAAAAARQnAQ)

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

值得注意的是 Galacean 是批量执行完 `onStart` 回调之后再批量执行 `onUpdate` 这样做的好处是，可以在 `onUpdate` 中访问其他实体初始化的值：

```typescript
import { TheScript } from './TheScript'
onStart() {
	this.otherEntity = this.entity.findByName('otherEntity');
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

详见[输入交互](${docs}input)。

[实体](${docs}core-entity)是脚本的主要操作对象，以下展示一些常用操作：

## 常用实体操作
### 变换

以旋转为例，在 [onUpdate](${api}core/Script#onUpdate) 中通过 [setRotation](${api}core/Transform#setRotation) 方法来旋转实体：

```typescript
this.entity.transform.setRotation(0, 5, 0);
```

### 访问实体和其他组件

你可以在编辑器场景检查器里修改节点和组件，也能在脚本中动态修改。脚本能够响应玩家输入，能够修改、创建和销毁节点或组件，实现各种各样的游戏逻辑。要实现这些效果，你需要先在脚本中获得你要修改的节点或组件。这里我们简单地介绍如何在脚本内:

#### 获得组件所在的实体

我们可以在脚本的任意生命周期内获得它所绑定的实体，如：

```typescript
onAwake() {
	const entity = this.entity;
}
```

#### 获得其它组件

当我们需要获取同一节点上的其他组件，这时就要用到 [getComponent](${api}core/Entity#getComponent) 这个API, 它会帮你查找你要的组件。

```typescript
onAwake() {
	const component = this.entity.getComponent(o3.Model);
}
```

有些时候可能会有多个同一类型的组件，上面的方法只会返回第一个找到的组件，如果需要找到所有组件可以用 [getComponents](${api}core/Entity#getComponents) ：

```typescript
onAwake() {
 	const components = []
	this.entity.getComponents(o3.Model, components);
}
```

#### 查找子节点

有时候，场景中会有很多个相同类型的对象，像多个粒子动画，多个金币，它们通常都有一个全局的脚本来统一管理。如果用一个一个将它们关联到这个脚本上，那工作就会很繁琐。为了更好地统一管理这些对象，我们可以把它们放到一个统一的父物体下，然后通过父物体来获得所有的子物体：

如果明确知道子节点在父节点中的index可以直接使用 [getChild](${api}core/Entity#getChild) ：          

```typescript
onAwake() {
	this.entity.getChild(0);
}
```

如果不清楚子节点的index，可以使用 [findByName](${api}core/Entity#findByName) 通过节点的名字找到它, [findByName](${api}core/Entity#findByName) 不仅会查找子节点，还会查找孙子节点

```typescript
onAwake() {
	this.entity.findByName('model');
}
```

如果有同名的节点可以使用 [findByPath](${api}core/Entity#findByPath) 传入路径进行逐级查找，使用此API也会一定程度上提高查找效率。

```typescript
onAwake() {
	this.entity.findByPath('parent/child/grandson');
}
```