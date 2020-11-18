# 事件通信

如果你已经完成了上一步的[产物组件](${book.editor}export-web)，把组件安装到业务项目中，这时候就会面临一个问题：

> Oasis 组件如何与业务代码进行双向的通信 ？

举个例子，点击业务中用 React 编写的 UI 按钮通知游戏开始，这时候就需要用到事件通信。Oasis Engine 中的 [Engine](${book.manual}structure/engine) 就是一个 [EventDispatcher](${book.manual}tools/event) 我们可以使用他作为内外部通信的媒介。

## 基本用法

- **监听事件**

```typescript
 engine.addEventListener('test', e => {
   console.log('test event triggered', e);
 });
```

- **触发事件**：

```typescript
engine.trigger('test');
```

下面介绍 Oasis 与业务双向通信分别怎么写。

## 从外到里通信

1. 在脚本组件的[生命周期函数](https://yuque.antfin-inc.com/oasisgroup/oasis3d_manual/phb3mi#qh8HJ)（如 `onAwake` ）内可以监听事件：

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
import MyOasisComponent from "MyOasisComponent";

export default ()=> {
  let engine = null

  const handleSceneLoaded = oasis => {
    // 从 oasis 对象中可以直接拿到 engine 实例
    engine = oasis.engine;
  };

  const handleClick = () => {
    // 触发事件
    engine && engine.trigger('rotate');
  };

  return (
    < >
    <button onClick={handleClick}>旋转</button>
    <MyOasisComponent
			handleSceneLoaded={handleSceneLoaded}/>
    </>
  );
}

```


## 从里到外通信

1. 在业务代码里触发事件：

```typescript
import { Event } from 'oasis-engine';
import MyOasisComponent from "MyOasisComponent";

export default ()=> {
  let engine = null

  const handleSceneLoaded = oasis => {
    // 从 oasis 对象中可以直接拿到 engine 实例
    engine = oasis.engine;
    
    // 监听事件
    engine.addEventListener('test', e => {
      console.log('test event triggered', e);
    });
  };

  return (
    < >
    <MyOasisComponent
			handleSceneLoaded={handleSceneLoaded}/>
    </>
  );
}

```

2. 在脚本组件的[生命周期函数](${book.manual}component/script)内可以触发事件：

```typescript
this.engine.trigger(new o3.Event('rotate'));
```

## 事件测试
在 Oasis Editor 的代码编辑器中，我们提供了一个事件测试面板，用户可以使用它进行事件通信的测试：

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/18082/1599044791937-31647ce9-0a03-4c54-bbd3-d6a7093ca46b.png#align=left&display=inline&height=895&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1790&originWidth=3356&size=1363512&status=done&style=none&width=1678)

3D项目中监听的事件会出现在输入事件列表中，触发的事件则会出现在输出事件面板中。

> 注意，脚本组件一定要绑定到某个实体上，才会展示事件列表。

点击输入事件列表中的事件名右侧的编辑按钮，可以配置事件参数：

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/18082/1599044901759-50f725c4-bcd4-4352-9005-af569db3df59.png#align=left&display=inline&height=435&margin=%5Bobject%20Object%5D&name=image.png&originHeight=870&originWidth=676&size=66421&status=done&style=none&width=338)![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/18082/1599044979832-67e6b78f-99b2-4a86-9f9f-3b8a5219e6b5.png#align=left&display=inline&height=529&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1058&originWidth=1726&size=197306&status=done&style=none&width=863)

点击触发按钮事件就被触发了：

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/18082/1599045076386-223767de-da95-464b-868f-235065d3e3a0.png#align=left&display=inline&height=446&margin=%5Bobject%20Object%5D&name=image.png&originHeight=892&originWidth=682&size=58023&status=done&style=none&width=341)
