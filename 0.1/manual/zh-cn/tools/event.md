# 事件系统

引擎中提供了基本的事件系统，一般组件间的通信，**游戏和业务**的通信会考虑采用事件系统。引擎提供了 [EventDispatcher](${book.api}classes/core.eventdispatcher.html) 作为事件类，[Engine](${book.api}classes/core.engine.html) 和 [Entity](${book.api}classes/core.entity.html) 继承自 EventDispatcher。

> 注意：一般情况下，推荐使用[脚本组件](${book.manual}component/script})来解决游戏内的组件间通信问题，事件系统只推荐在一些需要解耦的场景下使用。

## 事件监听

- 使用 [on](${book.api}classes/core.eventdispatcher.html#on) 监听：

  ```typescript
  this.engine.on("event-test", ()=> {
    console.log('call event-test')
  })
  ```

- 使用 [once](${book.api}classes/core.eventdispatcher.html#once) 监听，只会触发一次回调函数：

  ```typescript
  this.engine.on("event-test", ()=> {
    console.log('call event-test')
  })
  ```

## 事件派发

调用 [dispatch](${book.api}classes/core.eventdispatcher.html#dispatch) 方法可以派发事件，派发对应事件会触发监听事件回调函数的执行。

```typescript
this.engine.dispatch("event-test", {eventData: 'mydata'})
```

第二个参数是 data，可以传递回调函数需要的数据。