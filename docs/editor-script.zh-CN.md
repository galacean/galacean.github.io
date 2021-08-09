---
order: 9
title: 脚本
type: 编辑器
---

[脚本组件](${docs}script-cn)是引擎提供给开发者的重要的扩展能力，在 Oasis Editor 中，脚本也是一种资源。


## 创建脚本
在Oasis编辑器中有两种创建脚本的方式：
### 1. 在资源面板中创建

![image-20210720204826392](https://gw.alipayobjects.com/zos/OasisHub/728f0e47-ac0f-4bc2-8842-ed524b0d5a1d/image-20210720204826392.png)

将你的鼠标 `hover/悬停` 在 `资源面板` 右上角通过点击 `+` 按钮上。在弹出的菜单中点击脚本即可创建一个脚本资源，如下图：

![image-20210720204627127](https://gw.alipayobjects.com/zos/OasisHub/ba51d8f7-eb03-40c2-8bf1-2bcc6e59808e/image-20210720204627127.png)

### 2. 通过添加组件创建

你也可以直接在模型的组件列表中点击 `添加组件` 来创建：
1. 选择你想添加脚本的实体
   ![image-20210720205530946](https://gw.alipayobjects.com/zos/OasisHub/3f66f051-0a7e-4ef9-b4c6-041996ff590e/image-20210720205530946.png)
2. 在右侧的组件列表中点击`添加组件` -> 脚本 ->  `新建脚本`
  ![image-20210720205823481](https://gw.alipayobjects.com/zos/OasisHub/248110c9-bdbe-42a4-acea-78b2880f64c5/image-20210720205823481.png)

之后在 `资源面板` 中就会出现你创建的脚本
![image-20210720204627127](https://gw.alipayobjects.com/zos/OasisHub/ba51d8f7-eb03-40c2-8bf1-2bcc6e59808e/image-20210720204627127.png)

## 绑定脚本
如果你的脚本是通过上文说的第二种方式创建的， Oasis 编辑器会自动将脚本绑到实体上，无需再操作了。如果你是通过第一种方式创建的，就需要将其绑定到节点上才能运行：
1. 选择你想添加脚本的实体
   ![image-20210720205530946](https://gw.alipayobjects.com/zos/OasisHub/3f66f051-0a7e-4ef9-b4c6-041996ff590e/image-20210720205530946.png)

2. 在右侧的组件列表中点击 `添加组件` -> 脚本 -> 选择你之前创建的脚本
  ![image-20210720210619665](https://gw.alipayobjects.com/zos/OasisHub/dfe4d6f1-7c65-449e-baa0-70eed9a4971c/image-20210720210619665.png)

## 编辑脚本

创建脚本之后，我们就要对其进行编辑了。在 `资源面板` 中点击你想要编辑的脚本, 你可以在右侧的 `检查器` 中对脚本文件名称及其内容进行编辑
![image-20210720211125751](https://gw.alipayobjects.com/zos/OasisHub/4f554dec-faef-4720-a1b1-d707c8ed3e89/image-20210720211125751.png)

点击 `编辑` 按钮就会打开该脚本的编辑页面

![image-20210720212141177](https://gw.alipayobjects.com/zos/OasisHub/a7a07bf4-bafb-44fb-b388-c9ddb776b704/image-20210720212141177.png)

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

> 注意：不要写空函数，需要使用某个生命周期函数时再写，这样性能更好。

脚本的详细介绍见：[脚本组件](${docs}script-cn)

当你修改完毕后，按 `Ctrl/⌘ + S` 代码即可保存，右侧的实时预览区即可展现最新的效果。


> 提示： Oasis 的代码编辑器使用了 VSCode 团队开源的 Monaco 编辑器，编辑体验与快捷键与 VSCode 基本一致

 Oasis 的代码编辑器还具有代码提示的功能，可以帮助你更加方便的编写代码。

![codeTip](https://gw.alipayobjects.com/zos/OasisHub/d8f14771-df23-4faf-bb22-6644aeb30df9/codeTip.gif)


### 实时预览区
在实时预览区你可以像 `chrome-devtool` 一样调整显示设备的尺寸以观察项目的兼容性。
![image-20210720213311086](https://gw.alipayobjects.com/zos/OasisHub/f6f7e38a-8562-4678-8325-17337808b778/image-20210720213311086.png)。
上面的四个按钮的功能分别为：
![image-20210720213505759](https://gw.alipayobjects.com/zos/OasisHub/4d9b1330-38d7-4ee6-8621-75a0ff3a20c1/image-20210720213505759.png)： 强制刷新页面

![image-20210720213738841](https://gw.alipayobjects.com/zos/OasisHub/71b86746-f893-49f4-a492-3355aa14518f/image-20210720213738841.png)： 手机扫码预览

![image-20210720213848186](https://gw.alipayobjects.com/zos/OasisHub/65e41eb5-b711-40b3-a92f-5b9f324e1e62/image-20210720213848186.png)： 代码保存

![image-20210720214203477](https://gw.alipayobjects.com/zos/OasisHub/ecd1cf70-8b75-43f6-b630-6de300536d94/image-20210720214203477.png): 新开窗口预览


### 事件通信区
事件通信区给开发者提供了方便的事件收发测试能力，帮助开发者方便的调试项目，详见[事件通信](${docs}editor-script-communication-cn)。
