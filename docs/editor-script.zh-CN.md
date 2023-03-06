---
order: 0
title: 编写脚本
type: 功能
group: 脚本
label: Editor-Feature/Scripting
---

[脚本组件](${docs}script-cn)是引擎提供给开发者的重要的扩展能力，在 Oasis Editor 中，脚本也是一种资源。


## 创建脚本

![image-20210720204826392](https://mdn.alipayobjects.com/huamei_vrnqmp/afts/img/A*yl9gR7Jm1s8AAAAAAAAAAAAADgeMAQ/original)

在 `资源面板` 右上角通过点击 `+` 按钮，在弹出的菜单中点击 `脚本` 即可创建一个脚本资源。

## 绑定脚本
创建脚本后，需要将其绑定到节点上才能运行：
1. 选择你想添加脚本的实体
   ![image-20210720205530946](https://mdn.alipayobjects.com/huamei_vrnqmp/afts/img/A*xpU9S4BPYIUAAAAAAAAAAAAADgeMAQ/original)

2. 在右侧的组件列表中点击 `添加组件` -> 脚本 -> 选择你之前创建的脚本
  ![image-20210720210619665](https://mdn.alipayobjects.com/huamei_vrnqmp/afts/img/A*FcveToRFlmQAAAAAAAAAAAAADgeMAQ/original)

## 编辑脚本

创建脚本之后，我们就要对其进行编辑了。在 `资源面板` 中双击击你想要编辑的脚本, 就会打开该脚本的编辑页面：

![image-20210720212141177](https://mdn.alipayobjects.com/huamei_vrnqmp/afts/img/A*Mld6QIBfHKIAAAAAAAAAAAAADgeMAQ/original)

### 代码编辑区
代码编辑区会有 Oasis 创建的脚本模板代码，  Oasis 的脚本编辑使用 [Typescript](https://www.typescriptlang.org/) 语言。默认代码如下：
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

> 注意：不要写空函数，需要使用某个生命周期函数时再写，这样性能更好。

脚本的详细介绍见：[脚本组件](${docs}script-cn)

当你修改完毕后，按 `Ctrl/⌘ + S` 代码即可保存，右侧的实时预览区即可展现最新的效果。


> 提示： Oasis 的代码编辑器使用了 VSCode 团队开源的 Monaco 编辑器，编辑体验与快捷键与 VSCode 基本一致

 Oasis 的代码编辑器还具有代码提示的功能，可以帮助你更加方便的编写代码。

### 实时预览区
在实时预览区你可以调整显示设备以观察项目的兼容性：

<img src="https://mdn.alipayobjects.com/huamei_vrnqmp/afts/img/A*Y9jUSo3wIPAAAAAAAAAAAAAADgeMAQ/original" style="zoom:50%;">

上面的三个按钮的功能分别为：

| 强制刷新页面                                                                                                                              | 手机扫码预览                                                                                                                                                                                                                                                                        | 新开窗口预览                                                                                                                              |
|:-----------------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------------------------------------------------------:|:---------------------------------------------------------------------------------------------------------------------------------------:|
| ![](https://mdn.alipayobjects.com/huamei_vrnqmp/afts/img/A*AtF_Q74WW84AAAAAAAAAAAAADgeMAQ/original) | <img src="https://mdn.alipayobjects.com/huamei_vrnqmp/afts/img/A*M8lCSKudyAYAAAAAAAAAAAAADgeMAQ/original" style="zoom:50%;" /> | ![](https://mdn.alipayobjects.com/huamei_vrnqmp/afts/img/A*rjD2Tb17Xg8AAAAAAAAAAAAADgeMAQ/original) |


### 事件通信区
事件通信区给开发者提供了方便的事件收发测试能力，帮助开发者方便的调试项目，详见[事件通信](${docs}editor-script-communication-cn)。
