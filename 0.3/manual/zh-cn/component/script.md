# 脚本组件

除了[内置组件](${book.api}structure/entity.html)之外，Oasis 引擎还提供强大的脚本系统。脚本系统是衔接引擎能力和游戏逻辑的纽带，脚本扩展自 [Script](${book.api}classes/core.script.html) 基类，用户可以通过它来扩展引擎的功能，也可以在脚本组件提供的生命周期钩子函数中编写自己的游戏逻辑代码。


## 添加脚本组件


为实体添加脚本可以这样做：
```typescript
import {
	Entity,
	Script
} from 'oasis-engine'

// 1.创建实体
const node = new Entity(engine);

// 2. 继承Script
class MyScript extends Script {
	onUpdate() {}
}

// 3. 给实体添加脚本组件
entity.addComponent(MyScript);
```


## 组件生命周期函数

Oasis 为用户提供了丰富的生命周期回调函数，用户只要定义特定的回调函数，Oasis 就会在特定的时期自动执行相关脚本，用户不需要手工调用它们。目前提供给用户的生命周期回调函数如下:

![image.png](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*9QW-T7htvrwAAAAAAAAAAAAAARQnAQ)

值得注意的是，**只有当实体被作为相机使用**，也就是添加了相机组件，[onBeginRender](${book.api}classes/core.script.html#onbeginrender) 和 [onEndRender](${book.api}classes/core.script.html#onendrender) 才会被调用的。  

每个生命周周期回调函数说明：

- [**onAwake**](${book.api}classes/core.script.html#onawake)

	如果脚本添加到的实体的 [`isActiveInHierarchy`](${book.api}classes/core.entity.html#isactiveinhierarchy) 为 `true`，则在脚本初始化时回调函数将被调用，如果[`isActiveInHierarchy`](${book.api}classes/core.entity.html#isactiveinhierarchy) 为 `false`，则在实体被激活，即 [`isActive`](${book.api}classes/core.entity.html#isactive) 被设为 `true` 时被调用。 `onAwake` 只会被调用一次，并且在所有生命周期的最前面，通常我们会在 `onAwake` 中做一些初始化相关的操作：

	```typescript
	onAwake() {
		this.child = this.entity.getChild(0);
		this.child.isActive = false;
	}
	```

- [**onEnable**](${book.api}classes/core.script.html#onenable)

	当脚本的 [`enabled`](${book.api}classes/core.component.html#enabled) 属性从 `false` 变为 `true` 时，或者所在实体的 [`isActiveInHierarchy`](${book.api}classes/core.entity.html#isactiveinhierarchy) 属性从 `false` 变为 `true` 时，会激活 `onEnable` 回调。倘若实体第一次被创建且 [`enabled`](${book.api}classes/core.component.html#enabled) 为 `true`，则会在 `onAwake` 之后，`onStart` 之前被调用。


-	[**onDisable**](${book.api}classes/core.script.html#ondisable)

	当组件的 [`enabled`](${book.api}classes/core.component.html#enabled) 属性从 `true` 变为 `false` 时，或者所在实体的 [`isActiveInHierarchy`](${book.api}classes/core.entity.html#isactiveinhierarchy) 属性从 `true` 变为 `false` 时，会激活 `onDisable` 回调

	注意：[`isActiveInHierarchy`](${book.api}classes/core.entity.html#isactiveinhierarchy) 的判断方法为实体在层级树中是被激活状态即该实体为激活状态，它的父亲及父亲的父亲直到根实体都为激活状态 [`isActiveInHierarchy`](${book.api}classes/core.entity.html#isactiveinhierarchy) 才为 `true` 


- [**onStart**](${book.api}classes/core.script.html#onstart)

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

	> 注：编辑器创建的所有脚本最终都会放在一个目录下，可以通过相对路径 `./` 获取其他脚本类

- [**onUpdate**](${book.api}classes/core.script.html#onupdate)

	游戏/动画开发的一个关键点是在每一帧渲染前更新物体的行为，状态和方位。这些更新操作通常都放在 `onUpdate` 回调中。

	```typescript
	onStart() {
		this.rotationY = 0
	}

	onUpdate() {
		this.entity.transform.rotate(new Vector3(0, this.rotationY++, 0))
	}
	```

- [**onLateUpdate**](${book.api}classes/core.script.html#onlateupdate)

	`onUpdate` 会在所有动画更新前执行，但如果我们要在动效（如动画、粒子等）更新之后才进行一些额外操作，或者希望在所有组件的 `onUpdate` 都执行完之后才进行其它操作比如相机跟随，那就需要用到 `onLateUpdate` 回调。

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


- [**onBeginRender**](${book.api}classes/core.script.html#onbeginrender)

	当实体被作为相机使用，也就是添加了相机组件，那么当相机组件的 [`render`](${book.api}classes/core.camera.html#render) 方法调用之前 `onBeginRender` 回调将被调用。


- [**onEndRender**](${book.api}classes/core.script.html#onendrender)

	当实体被作为相机使用，也就是添加了相机组件，那么当相机组件的 [`render`](${book.api}classes/core.camera.html#render) 方法调用之后 `onBeginRender` 回调将被调用。

- [**onDestroy**](${book.api}classes/core.script.html#ondestroy)

	当组件或者所在实体调用了 `[destroy()](${book.api}classes/core.entity.html#destroy)`，则会调用 `onDestroy` 回调，并在当帧结束时统一回收组件。

