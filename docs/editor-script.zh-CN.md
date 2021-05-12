---
order: 9
title: 添加脚本组件
type: 编辑器
---

[脚本组件](${book.manual}component/script)是引擎提供给开发者的重要的扩展能力，在 Oasis Editor 中，脚本也是资源的一部分，使用 [Typescript](https://www.typescriptlang.org/) 语言。

## 1. 创建脚本

你可以在资源面板中的右上角通过点击 *资源面板 > +* 来创建一份组件脚本。此时你会在你的资源编辑器中得到一份新的脚本：

![](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*sR34TI55SpwAAAAAAAAAAAAAARQnAQ)

## 2. 添加脚本到实体

选择一个实体，在右侧的**实体检查器**中点击 **添加组件 > 脚本**，选择刚才我们创建的脚本：

![image.png](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*VHmAQaXgzw8AAAAAAAAAAAAAARQnAQ)

这样脚本就挂在到我们的实体上：

![image.png](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*x7XVSZmC5hkAAAAAAAAAAAAAARQnAQ)

有时候我们我们会觉得先创建再添加有点繁琐，也可以选择在添加时直接新建脚本：

![](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*TeVWT7-NjUQAAAAAAAAAAAAAARQnAQ)

## 3. 编辑脚本

选择资源面板中创建的脚本，点击 *文件检查器 > 编辑*（也可以双击脚本资源打开），我们可以看到一个初始的脚本类：

```typescript
import {Script} from 'oasis-engine';
/**
 * 使用时再重写，性能可以得到提升
 */
export class Script1250228 extends Script {
  /**
   * 第一次触发可用状态时调用,只调用一次。
   */
  // onAwake() {}

  /**
   * 触发为可用状态时调用。
   */
  // onEnable() {}

  /**
   * 第一次执行帧级循环前调用，只调用一次。
   */
  // onStart() {}

  /**
   * 主更新，逐帧调用。
   * @param deltaTime - 帧间隔时间
   */
  onUpdate(deltaTime: number) {
    this.entity.
  }

  /**
   * 延迟更新，在执行内部动画逻辑后调用，逐帧调用。
   */
  // onLateUpdate() {}

  /**
   * 触发为禁用状态时调用。
   */
  // onDisable() {}

  /**
   * 在被销毁帧的最后调用。
   */
  // onDestroy() {}
}
```

> 注意：不要写空函数，如果需要使用某个生命周期函数时再写，这样性能可以得到一定的提升。

进入代码编辑界面之后，用户就可以根据自己的需求在提供的生命周期回调函数中实现自己的需求了。修改完毕后，按 `Ctrl+S` 保存右侧的预览面板会自动刷新。

![](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*9UMvS6MTCIAAAAAAAAAAAAAAARQnAQ)



