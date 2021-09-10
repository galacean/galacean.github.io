---
title: Oasis 组件系统之脚本
type: Blog
time: 2021-08-15
---

## 引言

Oasis是一款“组件式”渲染引擎，使用各种各样的组件给我们的实体添加丰富的能力。脚本是一种特殊的组件，并提供了多种生命周期回调函数，开发者可以重写这些回调函数用于能力扩展和业务逻辑编写。在实际开发中，不可避免的需要用到自定义扩展功能和业务逻辑的编写，所以了解、熟悉脚本的使用与运行机制，对想要使用Oasis开发需求的同学至关重要。



## 脚本系统介绍

### 什么是脚本

脚本系统是衔接引擎能力和游戏逻辑的纽带，脚本扩展自 `Script` 类，而 `Script` 用户可以通过它来扩展引擎的功能，也可以在脚本组件提供的生命周期钩子函数中编写自己的游戏逻辑代码。



### 脚本的生命周期

Oasis 为用户提供了丰富的生命周期回调函数，用户只要重写指定的回调函数，Oasis 就会在特定的时期自动执行相关脚本，用户不需要手工调用它们。目前提供给用户的生命周期回调函数如下:

![img](https://cdn.nlark.com/yuque/0/2021/png/1255339/1628992053587-1d1c1193-d861-4e6e-88bd-f1ddae3999c6.png)

使用方式详见[官网文档](https://oasisengine.cn/0.4/docs/script-cn#组件生命周期函数)

## 组件的运行机制

脚本是组件的一种，所以脚本的运行机制遵循组件的运行机制，相对于其他内置组件，脚本只是拥有更多的生命周期而已，

### 组件的驱动

脚本挂载在实体上，为了找到所有绑定在实体上的脚本并运行他们我们很自然的想到，遍历所有实体，然后发现如果实体上挂有脚本就执行它，如下图：

![img](https://cdn.nlark.com/yuque/0/2021/png/1255339/1628992065463-82688785-4142-4f3b-a894-49f78e62d560.png)

初看之下这个方法既简单又清晰，过去的Oasis也是以这种方式驱动组件执行的。但是细心的读者可能已经从图上发现“猫腻”了，就是我们使用引擎时不是所有的实体都会挂载脚本的，甚至可以说只有极少的实体我们需要挂载脚本去实现我们想要的功能。在复杂的场景中我们的实体数可能是几百，几千，甚至上万的（包含模型的实体数），而真正需要挂载的实体可能只有几个，那这种递归遍历就带来了极大的性能浪费。有的读者可能会好奇不就是多遍历了几个空实体么，能有多大损耗呢。大家很容易忽视的一点就是这个遍历是每帧都要执行的，在这种高频的执行下，这种损耗就会积少成多。   

随着我们的业务越来越复杂，同时也抱着对开源的敬畏之心，我们决定在开源之前想办法解决这个问题。解决办法其实也很简单，组件（脚本就是组件的一种）的执行从依赖实体的管理改为独立管理就好了，我们新建了一个名为

`ComponentsManager`的类用于管理所有的组件。新的组件运行执行机制如下：

![img](https://cdn.nlark.com/yuque/0/2021/png/1255339/1628992130179-3c440bd0-2552-47f3-9e07-379645f177e5.png)

`ComponentsManager`中有多个队列存储着组件的引用，在相应的时机按照生命周期顺序执行：

```
if (scene) {
  componentsManager.callScriptOnStart();
  componentsManager.callScriptOnUpdate(deltaTime);
  componentsManager.callAnimationUpdate(deltaTime);
  componentsManager.callScriptOnLateUpdate(deltaTime);

  this._render(scene);
}

componentsManager.callComponentDestory();
```

### 组件的管理

上文中提到了`ComponentsManager`这个类，那在这部分我就详细的为大家介绍下他是如何对组件进行管理的

#### 组件添加到组件队列

组件添加到`ComponentsManager`对象中的组件队列中的时机是当组件为`enable`时，以脚本的父类 `Script` 为例：

```
_onEnable(): void {
  const componentsManager = this.engine._componentsManager;
  const prototype = Script.prototype;
  if (!this._started) {
    componentsManager.addOnStartScript(this);
  }
	if (this.onUpdate !== prototype.onUpdate) {
  	componentsManager.addOnUpdateScript(this);
	}
	if (this.onLateUpdate !== prototype.onLateUpdate) {
 		componentsManager.addOnLateUpdateScript(this);
	}
	this.onEnable();
}
```

但是并不是你在组件上设置 `enabled` 就可以了哦，`_onEnable` 的触发还依赖挂载实体是

`isActiveInHierarchy` 的（实体为非active时不会接收到任何回调）也就是挂载的实体是`isActive`的并且他的祖先实体们也是`isActive` 的。

```
set enabled(value: boolean) {
  if (value === this._enabled) {
    return;
  }
  this._enabled = value;
  if (value) {
    this._entity.isActiveInHierarchy && this._onEnable();
  } else {
    this._entity.isActiveInHierarchy && this._onDisable();
  }
}
```

#### 组件从组件队列中移出

组件从队列中移出的时机是组件状态为`disable`时，以 `Script` 类为例：

```
_onDisable(): void {
  const componentsManager = this.engine._componentsManager;
  if (this._onStartIndex !== -1) {
    componentsManager.removeOnStartScript(this);
  }
  if (this._onUpdateIndex !== -1) {
    componentsManager.removeOnUpdateScript(this);
  }
  if (this._onLateUpdateIndex !== -1) {
    componentsManager.removeOnLateUpdateScript(this);
  }
  this.onDisable();
}
```

`_onDisable` 的触发与`_onEnable` 同理也需要挂载实体是`isActiveInHierarchy` 的。



#### 组件生命周期回调执行

在《组件的执行》部分已经介绍过了组件的执行机制，这里再对几个特殊的生命周期进行补充。

##### onAwake

与其他生命周期不同，`onAwake` 的回调触发是不在帧循环中的，而是组件第一次被这只为`active` 时。

```
_setActive(value: boolean): void {
  if (value) {
    if (!this._awaked) {
      this._awaked = true;
      this._onAwake();
    }
    // You can do isActive = false in onAwake function.
    if (this._entity._isActiveInHierarchy) {
      this._onActive();
      this._enabled && this._onEnable();
    }
  } else {
  	this._enabled && this._onDisable();
		this._onInActive();
	}
}
```

##### onStart

`onStart` 函数只需执行一次，执行过后我们就可以将其从队列中移出。

```
callScriptOnStart(): void {
  const onStartScripts = this._onStartScripts;
  if (onStartScripts.length > 0) {
    const elements = onStartScripts._elements;
    // The 'onStartScripts.length' maybe add if you add some Script with addComponent() in some Script's onStart()
    for (let i = 0; i < onStartScripts.length; i++) {
      const script = elements[i];
      script._started = true;
      script._onStartIndex = -1;
      script.onStart();
    }
    onStartScripts.length = 0;
  }
}
```

##### onBeginRender，onEndRender

这两个生命周期的特殊之处在于他们是逐相机触发的。

```
if (cameras.length > 0) {
  // Sort on priority
  //@ts-ignore
  cameras.sort((camera1, camera2) => camera1.priority - camera2.priority);
  for (let i = 0, l = cameras.length; i < l; i++) {
    const camera = cameras[i];
    const cameraEntity = camera.entity;
    if (camera.enabled && cameraEntity.isActiveInHierarchy) {
      componentsManager.callCameraOnBeginRender(camera);
      camera.render();
      componentsManager.callCameraOnEndRender(camera);
    }
  }
} else {
  Logger.debug("NO active camera.");
}
```

#### 

#### 组件的销毁

细心的读者可能会发现，销毁的生命周期回调为什么是在帧循环中触发的，不应该是调用销毁方法就马上触发么。在我们的引擎中销毁的生命周期回调是在帧循环的最后才触发的。

这样做的考虑是如果用户在销毁的生命周期回调中，设置了其他组件的 `enabled` 为 `false` ，设置实体的

`active` 为`false`，或者实体和组件的销毁，那就存在一个问题：组件在组件队列中是无序的，这样操作会导致在当前组件之前执行的组件执行完了自己的更新或渲染，在当前组件之后执行的组件会被移出组件队列将不会执行自己的更新渲染（如下图），而这个顺序对用户来说是未知的，就很可能出现不符合预期的情况。

![img](https://cdn.nlark.com/yuque/0/2021/png/1255339/1628992154134-75b27f3a-b245-4ed7-aa69-9aada33d36dd.png)

### 其他想说的

还有一些零碎的点，我放在这部分跟大家分享。

#### ComponentsManager中的组件队列

相信有的读者在看`ComponentsManager`类的代码时会有些疑惑:

1. 为什么脚本，动画，renderer的update要分成不同的队列，执行中通过判断组件的类型不就好了么。
2. 为什么同一类型组件的不同生命周期要分成不同的队列，执行中直接执行组件的生命周期回调，或者通过判断他是否实现了对应的生命周期，再进行调用不就好了么。

```
// Script
private _onStartScripts: DisorderedArray<Script> = new DisorderedArray();
private _onUpdateScripts: DisorderedArray<Script> = new DisorderedArray();
private _onLateUpdateScripts: DisorderedArray<Script> = new DisorderedArray();
private _destoryComponents: Script[] = [];

// Animation
private _onUpdateAnimations: DisorderedArray<Component> = new DisorderedArray();

// Render
private _renderers: DisorderedArray<Renderer> = new DisorderedArray();
private _onUpdateRenderers: DisorderedArray<Renderer> = new DisorderedArray();

// Delay dispose active/inActive Pool
private _componentsContainerPool: Component[][] = [];
```

这里就是我想和大家强调的一个点，希望大家在通过脚本实现功能时也能注意下。大家看上面两个问题，我对应的解决思路都有一个关键词：执行中。还记得我们优化组件执行机制的初衷么，就是不希望在执行中有太多性能损耗，因为生命周期的回调几乎都是每帧更新的，任何小的性能损耗在这样的叠加下都将放大进而影响我们的帧率。

组件的类型判断（instanceOf），空函数的调用，原型链属性的读取都是有一定的性能开销的。而且组件的类型和用户实现的生命周期都是在引擎启动前就决定了，执行的过程中并不会改变，没必要在执行的过程中每帧都做这样重复的判断。因此像上一部分（组件的管理）所写的，我们基本上在组件挂载时就将他分到了他应在的队列中。

#### 帧循环中的性能优化：

强调了很多次帧循环内要注意性能，这里分享一些我本人经常忽略的点：

1. 条件判断尽量用Enum或数字，不要用字符串：

![img](https://cdn.nlark.com/yuque/0/2021/png/1255339/1628992179147-88775750-712c-47a9-ae17-ffa86ef39fa1.png)

1. 尽量用数组存储数据，用数字进行索引，字符串索引是性能杀手：

![img](https://cdn.nlark.com/yuque/0/2021/png/1255339/1628992189600-a1c6b56a-f3d9-4a6f-9ac7-33cc63cfca35.png)

1. for循环倒序最佳

![img](https://cdn.nlark.com/yuque/0/2021/png/1255339/1628992205851-22d11d81-4dff-4dc8-9d0c-74fd62c5913e.png)

这是我平时开发代码最容易忽视的几个点，相信还有很多的优化手段我就不在这里班门弄斧了。

#### 无序数组

前面说了数据的存储建议使用数组，但是在帧循环中如果你的数据要频繁的插入，删除，那这个结论就不成立了。在组件的管理中业务逻辑可能会导致组件enable的频繁切换进而会导致组件队列的增删。我们既想享受到数组快速遍历的特性，又想减少队列增删带来的损耗。因为组件的顺序通常来讲是不重要的，所以我们使用了无序数组来作为组件队列的数据结构。

#### 帧循环中的GC

平时我们都强调要注意GC以免造成内存泄漏。在帧循环中也同样要注意GC，但是是尽量避免GC。因为JS的垃圾回收算法主要依赖于引用，当发现这个对象没人引用时浏览器内核就会将这块内存释放掉，但是释放的时机对我们来说是个黑盒。而频繁大量的GC会占用系统资源，这对我们的帧率来说就像是个不定时的炸弹，随时可能造成我们帧率的抖动。因此我们将帧循环中一些临时用到的数组空间采用“对象池”的方式获得，对象池会持有申请过的对象引用，有新的需求来时对其进行复用，这样就防止了这些临时数组的频繁创建销毁导致内存频繁的申请回收。

```
getActiveChangedTempList(): Component[] {
	return this._componentsContainerPool.length ? this._componentsContainerPool.pop() : [];
}

putActiveChangedTempList(componentContainer: Component[]): void {
	componentContainer.length = 0;
  this._componentsContainerPool.push(componentContainer);
}
```



## 总结

这篇文章介绍的内容其实挺简单的，但是对引擎使用者却非常重要，因为脚本真的太常用了，对项目性能的影响又很大。我们后续也会增加新的生命周期函数，比如用户点击以及物理相关的生命周期函数，使互动项目的开发更便捷。



希望这篇文章可以帮助大家更好的理解脚本/组件的运行机制同时如果大家有什么好的设计思路及性能优化思路，欢迎在我们的github上提issue讨论。最后欢迎对引擎设计感兴趣的同学和我们联系，一起交流。



## 最后

欢迎大家 star 我们的 [github 仓库](https://github.com/oasis-engine/engine)，也可以随时关注我们后续 [v0.5](https://github.com/oasis-engine/engine/milestone/3) 的规划，也可以在 [issues](https://github.com/oasis-engine/engine/issues) 里给我们提需求和问题。开发者可以加入到我们的钉钉群里来跟我们吐槽和探讨一些问题：

![img](https://cdn.nlark.com/yuque/0/2021/png/1255339/1623926985091-5d8d1540-2f9e-4c2e-898f-558f06b3d5be.png)

无论你是渲染、TA 、Web 前端或是游戏方向，只要你和我们一样，渴望实现心中的绿洲，欢迎投递简历到 [chenmo.gl@antgroup.com](mailto:chenmo.gl@antgroup.com)。岗位描述详见：https://www.yuque.com/oasis-engine/announcement/kdlpxt。

