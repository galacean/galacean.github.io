---
order: 3
title: 事件系统
type: 工具库
---

引擎中提供了基本的事件系统，一般组件间的通信，**游戏和业务**的通信会考虑采用事件系统。引擎提供了 [EventDispatcher](${api}core/EventDispatcher) 作为事件类，[Engine](${api}core/Engine) 和 [Entity](${api}core/Entity) 继承自 EventDispatcher。

> **注意**：一般情况下，推荐使用[脚本组件](${docs}script-cn)来解决游戏内的组件间通信问题，事件系统只推荐在一些需要解耦的场景下使用。

## 事件监听

- 使用 [on](${api}core/EventDispatcher#on) 监听：

  ```typescript
  this.engine.on("event-test", () => {
    console.log("call event-test");
  });
  ```

- 使用 [once](${api}core/EventDispatcher#once) 监听，只会触发一次回调函数：

  ```typescript
  this.engine.once("event-test", () => {
    console.log("call event-test");
  });
  ```

## 事件监听移除

```typescript
// Remove the specific function "fun" that listen to "event-test".
this.engine.off("event-test", fun);
// Remove all functions that listen to "event-test".
this.engine.off("event-test");
```

## 事件派发

调用 [dispatch](${api}core/EventDispatcher#dispatch) 方法可以派发事件，派发对应事件会触发监听事件回调函数的执行。

```typescript
this.engine.dispatch("event-test", { eventData: "mydata" });
```

## 回调参数格式

回调参数与发送时携带的参数格式完全一致。
