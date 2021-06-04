---
order: 11
title: 导出 Web 平台包
type: 编辑器
---

当你的项目在线完成场景编辑和脚本编写，你可能会困惑如何使用开发的 3D 产物。我们希望 3D 组件和业务前端工程（如用 [React](https://reactjs.org/) 编写的工程）是解耦的（解耦的好处有很多，比如可以沉淀玩法组件），所以我们建议把 3D 产物发布成前端通用的 [NPM](https://npm.alibaba-inc.com/) 包，然后在业务工程中安装这个包来使用。

![image](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*Z1V-TbNyuc4AAAAAAAAAAAAAARQnAQ)

## 使用

### 1. 导出项目至本地

使用 Oasis Editor 导出项目非常简单，只需要点击编辑器右上角的 *下载项目按钮* 即可：

![image](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*bQXuQqaJMQcAAAAAAAAAAAAAARQnAQ)

Oasis Editor 目前提供三种框架模板的导出，分别为：

| 框架  | 介绍                                                         |
| :---- | :----------------------------------------------------------- |
| React | 使用 [sherry](https://sherry.antfin-inc.com/component/) 生成的项目 |
| Rax   | 使用 [rax官方脚手架](http://rax.alibaba-inc.com/docs/guide/getting-start) 生成的项目 |
| Pure  | 没有用任何框架的ts代码                                       |



![image](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*-at1RLaE5PMAAAAAAAAAAAAAARQnAQ)



以 React Component 为例，zip 解压之后目录结构如下：

![image](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*_DPwRrU1X0gAAAAAAAAAAAAAARQnAQ)



如果你的 3D 工程修改了，希望下载的组件也更新，可以在改工程中执行：

```bash
tnpm run sync
```

### 2. 发布组件

解压后的代码一般情况下请不要做修改，而是发布成 [TNPM](https://npm.alibaba-inc.com/) 组件供业务使用。默认会以下载时你输入的名称为包名，如果想要修改包名，在 *package.json* 自行修改即可，如 `MyOasisComponent` ，然后执行：

```bash
tnpm publish
```

> 如果下载的组件需要进行版本管理，请初始化 git。

### 3. 在业务中使用

如要使用上面发布的组件，以`MyOasisComponent` 为例，在你的业务项目中执行：

```bash
tnpm i MyOasisComponent --save
```

业务与3D组件之间的通信使用事件通信的方式，具体见[事件通信](${docs}editor-event-cn)小节。



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

