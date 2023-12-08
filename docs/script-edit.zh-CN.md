---
order: 1
title: 编辑脚本
type: 脚本
label: Script
---

## 脚本编辑器
用户可以在线使用脚本编辑器编辑脚本，并且实时预览场景，以及调试事件查看日志。

创建脚本之后，在 `资源面板` 中双击击你想要编辑的脚本, 就会打开该脚本的编辑页面：
![CodeEditor](https://mdn.alipayobjects.com/huamei_fvsq9p/afts/img/A*26NQRZbLtAIAAAAAAAAAAAAADqiTAQ/original)

### 代码编辑器
代码编辑区会有 Galacean 使用默认模板创建的脚本代码，Galacean 的脚本编辑使用 [Typescript](https://www.typescriptlang.org/) 语言。默认代码如下：
```typescript
import { Script } from '@galacean/engine';

export default class extends Script {
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
  onUpdate(deltaTime: number) {}

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

> 注意：不要写空函数，需要使用某个生命周期函数时再写，这样性能更好。

脚本的详细介绍见：[脚本组件](${docs}script-cn)

当你修改完毕后，按 `Ctrl/⌘ + S` 代码即可保存，右侧的实时预览区即可展现最新的效果。

> 提示： Galacean 的代码编辑器使用了 VSCode 团队开源的 Monaco 编辑器，编辑体验与快捷键与 VSCode 基本一致

 Galacean 的代码编辑器还具有代码提示的功能，可以帮助你更加方便的编写代码。

### 实时预览区
在实时预览区你可以调整显示设备以观察项目的兼容性：

<img src="https://mdn.alipayobjects.com/huamei_fvsq9p/afts/img/A*7JWrTJnt96sAAAAAAAAAAAAADqiTAQ/original" style="zoom:50%;">

### 事件调试面板
事件通信区给开发者提供了方便的事件收发测试能力，帮助开发者方便的调试项目，详见[事件通信](${docs}editor-script-communication-cn)。

## 引入依赖包

当前的脚本编辑器暂不支持依赖包管理，如需引入外部依赖包，可按以下流程操作。

### 外部依赖包代码

以 `@tweenjs/tween.js` 为例，**首先**需在对应的[包管理网站](https://www.npmjs.com/)上搜索包名：

![](https://mdn.alipayobjects.com/huamei_jvf0dp/afts/img/A*MF67QZFZXt8AAAAAAAAAAAAADleLAQ/original)

**找到依赖库后**，点击 `Versions` 标签选择需要依赖包的版本（只需点选 `Version History` 下相应版本即可）。

![](https://mdn.alipayobjects.com/huamei_jvf0dp/afts/img/A*YzUsQ50BLWQAAAAAAAAAAAAADleLAQ/original)

**确定版本后**，点击 `Code` 标签，找到需要的代码文件（此处我们使用 **esm** 产物）。

![](https://mdn.alipayobjects.com/huamei_jvf0dp/afts/img/A*kKS_Tb8E2wQAAAAAAAAAAAAADleLAQ/original)

### 创建 & 拷贝

按照 [创建脚本](${docs}editor-script-creation-cn) 的流程创建脚本，并将依赖包的代码拷贝至脚本中：

![](https://mdn.alipayobjects.com/huamei_jvf0dp/afts/img/A*CfrYQ7rt9iwAAAAAAAAAAAAADleLAQ/original)

### 引入

只要 `TweenJS.ts` 中 export 的对象都可以供外部使用，引入方式如下：

```
import { update, Tween, Easing } from "./TweenJS";
```

![](https://mdn.alipayobjects.com/huamei_jvf0dp/afts/img/A*OxC1TKEE4K8AAAAAAAAAAAAADleLAQ/original)