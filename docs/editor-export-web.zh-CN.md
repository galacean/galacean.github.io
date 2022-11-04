---
order: 1
title: 导出 Web 平台包
type: 编辑器
group: 发布
label: 编辑器/发布
---

## 使用

以 React Component 为例，下载的 zip 解压之后目录结构如下：

<img src="https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*_DPwRrU1X0gAAAAAAAAAAAAAARQnAQ" alt="image" style="zoom:50%;" />


如要使用上面发布的组件，假设包名为 `MyOasisComponent` 为例，在你的业务项目中执行：

```bash
tnpm i MyOasisComponent --save
```
#### 使用React组件

```typescript
import MyComponent from "MyOasisComponent";

export default ()=> {
  const detectDowngrade = () => {
    return new Promise((resolve) => {
      // 降级
      // resolve(true);
      // 不降级
      resolve(false);
    });
  };

  const handleDowngrade = () => {
    console.log("downgrade");
  };

  const handleSceneLoaded = oasis => {
    console.log('loaded', oasis);
    // 业务取到engine进行事件通信
    const { engine } = oasis;
    engine.dispatch('test');
  };
  
  return (
    <MyComponent detectDowngrade={detectDowngrade} 
                                 handleDowngrade={handleDowngrade} 
                 handleSceneLoaded={handleSceneLoaded}
    />
  );
}
```

#### 使用Rax组件

```typescript
import { createElement, render } from "rax";
import MyComponent from "MyOasisComponent";

class App extends Component {
  detectDowngrade() {
    return new Promise((resolve) => {
      // 降级
      // resolve(true);
      // 不降级
      resolve(false);
    });
  }

  handleDowngrade() {
    console.log("downgrade");
  }

  handleSceneLoaded(oasis) {
    console.log("loaded", oasis);
    // 业务取到engine进行事件通信
    const { engine } = oasis;
    engine.dispatch('test');
  }

  render() {
    return (
      <MyComponent
        detectDowngrade={detectDowngrade}
        handleDowngrade={handleDowngrade}
        handleSceneLoaded={handleSceneLoaded}
      />
    );
  }
}
```

#### 使用pure组件

```typescript
import init from 'MyOasisComponent'

const canvas = document.getElementById('canvasId') //<canvas id="canvasId"/>
const oasis = init(canvas);
// 业务取到engine进行事件通信
const { engine } = oasis;
engine.dispatch('test');
```

---

## 本地预览

为了验证下载的组件没有问题，我们也在下载的组件工程里提供了本地预览的能力，只要执行即可启动一个本地服务：

```bash
tnpm i
tnpm run dev
```

一切顺利的话，你的项目就展示在浏览器中：

![image](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*oEv0S7CMX5MAAAAAAAAAAAAAARQnAQ)