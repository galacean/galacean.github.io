---
order: 4
title: 4. 第一个脚本组件
type: 快速入门
group: 基础
label: Introduction/Basic
---

[上篇教程](${docs}model-cn)中，你已经学会了如何加载一个 3D 模型。这时候，你也许会问：如何给这个鸭子增加一点动画呢？在 Galacean Engine 中，功能以**组件**形式添加到实体上，其中[脚本组件](${docs}script-cn)提供了最灵活的扩展能力。这个教程将带你开发一个“匀速旋转的鸭子”示例：

<playground src="script-basic.ts"></playground>

## 创建旋转脚本组件

[Script](${api}core/Script) 是引擎提供的脚本组件基类，这个类提供了丰富的生命周期函数，只要扩展这个类就可以实现自定义的脚本功能。这篇教程中，我们创建了名为 `Rotate` 的脚本组件，在组件内部用到了 [onUpdate](${api}core/Script#onUpdate) 生命周期函数，它可以让我们在每一帧渲染前更新实体的状态，在函数体内可以通过 `this.entity` 获取当前脚本绑定的实体：

```typescript
class Rotate extends Script {
  onUpdate() {
    console.log('update')'
  }
}
```

## 给实体添加组件

我们把创建好的 `Rotate` 脚本组件添加到鸭子实体上。这时只要打开 Chrome 的控制台，就能看到不断地打印 `update`:

```typescript
// 添加旋转脚本组件
duck.addComponent(Rotate);
```

## 增加旋转逻辑

想要实现旋转，只要在 `onUpdate` 函数内不断改变鸭子的 **Y** 轴角度就可以。旋转、位移、缩放都是经典的变换动画，由于[变换](${docs}transform-cn)是最常用的组件，所以 Galacean Engine 把 `transform` 作为实体属性，通过 `entity.transform` 就可以获得变换组件。

变换组件提供了增量旋转方法 `rotate`，它的参数是类型为 [Vector3](${api}math/Vector3) 的变量。我们让鸭子每帧沿 Y 轴旋转 1 度：

```typescript
class Rotate extends Script {
  onUpdate() {
    this.entity.transform.rotate(new Vector3(0, 1, 0));
  }
}
```

## 小小的优化

到此为止，我们的小黄鸭已经萌萌地旋转起来啦！不过，还有一点小小的不完美的地方：`onUpdate` 是一个每帧都执行的函数，我们在这个高频函数体中不断创建 `Vector3` 实例，会造成 GC 问题。这里我们可以把旋转角度通过私有变量缓存起来：

```typescript
class Rotate extends Script {
  private _tempVector = new Vector3(0, 1, 0);
  onUpdate() {
    this.entity.transform.rotate(this._tempVector);
  }
}
```

> 这个技巧很有用，是常见的性能优化手段之一。