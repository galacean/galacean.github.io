---
order: 4
title: 事件通信
type: 脚本
label: Script
---

开发完的互动项目往往还需要添加到真正的业务项目中和业务代码相结合，引擎中提供了基本的事件系统，一般组件间的通信，**游戏和业务**的通信会考虑采用事件系统。引擎提供了 [EventDispatcher](${api}core/EventDispatcher) 作为事件类，[Engine](${api}core/Engine) 继承自 EventDispatcher，我们可以使用他作为内外部通信的媒介。

> **注意**：一般情况下，推荐使用[脚本组件](${docs}script)来解决游戏内的组件间通信问题，事件系统只推荐在一些需要解耦的场景下使用。

## 编辑器使用

在 Galacean Editor 的代码编辑器中，我们提供了一个事件测试面板，用户可以使用它进行事件通信的测试：

![image.png](https://mdn.alipayobjects.com/huamei_vrnqmp/afts/img/A*qSY-RZu6p-kAAAAAAAAAAAAADgeMAQ/original)

3D项目中监听的事件会出现在输入事件列表中，触发的事件则会出现在输出事件面板中。

> 注意，脚本组件一定要绑定到某个实体上，才会展示事件列表。

点击输入事件列表中的事件名右侧的编辑按钮，可以配置事件参数：

<img src="https://mdn.alipayobjects.com/huamei_vrnqmp/afts/img/A*V9teS7ZRmw0AAAAAAAAAAAAADgeMAQ/original" alt="image.png" style="" />

<img src="https://mdn.alipayobjects.com/huamei_vrnqmp/afts/img/A*UlAMSpDP8o0AAAAAAAAAAAAADgeMAQ/original" alt="image.png" style="" />

点击触发按钮事件就被触发了：

<img src="https://mdn.alipayobjects.com/huamei_vrnqmp/afts/img/A*GdcqQY1kW18AAAAAAAAAAAAADgeMAQ/original" alt="image.png" style="" />

## 脚本使用

### 事件监听

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

### 事件监听移除

```typescript
// Remove the specific function "fun" that listen to "event-test".
this.engine.off("event-test", fun);
// Remove all functions that listen to "event-test".
this.engine.off("event-test");
```

### 事件派发

调用 [dispatch](${api}core/EventDispatcher#dispatch) 方法可以派发事件，派发对应事件会触发监听事件回调函数的执行。

```typescript
this.engine.dispatch("event-test", { eventData: "mydata" });
```

### 回调参数

回调参数与发送时携带的参数一致。

下面介绍 Galacean 与业务双向通信分别怎么写。

### 从外到里通信

1. 在脚本组件的[生命周期函数](${docs}script#组件生命周期函数)（如 `onAwake` ）内可以监听事件：

```typescript
onAwake () {
  // 监听事件
  this.engine.addEventListener('test', e => {
    console.log('test event triggered', e);
  });
}
```

2. 在业务代码里触发事件：

```typescript
import MyGalaceanComponent from "MyGalaceanComponent";

export default ()=> {
  let engine = null

  const handleSceneLoaded = galacean => {
    // 从 galacean 对象中可以直接拿到 engine 实例
    engine = galacean.engine;
  };

  const handleClick = () => {
    // 触发事件
    engine && engine.dispatch('rotate');
  };

  return (
    < >
    <button onClick={handleClick}>旋转</button>
    <MyGalaceanComponent
			handleSceneLoaded={handleSceneLoaded}/>
    </>
  );
}

```

### 从里到外通信

1. 在业务代码里触发事件：

```typescript
import { Event } from '@galacean/engine';
import MyGalaceanComponent from "MyGalaceanComponent";

export default ()=> {
  let engine = null

  const handleSceneLoaded = galacean => {
    // 从 galacean 对象中可以直接拿到 engine 实例
    engine = galacean.engine;
    
    // 监听事件
    engine.addEventListener('test', e => {
      console.log('test event triggered', e);
    });
  };

  return (
    < >
    <MyGalaceanComponent
			handleSceneLoaded={handleSceneLoaded}/>
    </>
  );
}

```

2. 在脚本组件的[生命周期函数](${docs}script)内可以触发事件：

```typescript
this.engine.dispatch('rotate');
```
