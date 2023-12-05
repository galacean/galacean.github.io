---
order: 2
title: 项目预览
type: 基础知识
group: 快速上手
label: Basics/GettingStarted
---

接下来，我们为这个节点再绑定一个 `Script` 组件（[什么是 Script 组件?](https://galacean.antgroup.com/#/docs/latest/cn/script)）。

1. 我们继续使用上述方式在检查器面板中添加 `Script` 组件
2. 接下来，我们在资产面板中 `右键` → `Create` → `Script`  创建一个 `Script` 资产
3. 最后，在检查器面板中将刚创建的脚本文件绑定到脚本组件上

> ⚠️ 注意，如果你没有把脚本资产绑定到实体的脚本组件上，则脚本不会运行

创建脚本后，我们可以 **双击它** 来跳转到代码编辑器页面。

<img src="https://gw.alipayobjects.com/zos/OasisHub/c1f6ec7e-9a9c-453d-ac7f-41fbea3a792e/image-20230921180953712.png" alt="image-20230921180953712" style="zoom:50%;" />


进入代码编辑器后，我们写一个非常简单的旋转功能：

```ts
// Script.ts
import { Script } from '@galacean/engine';

export default class extends Script {
  onUpdate(deltaTime: number) {
    this.entity.transform.rotate(1,1,1);
  }
}
```

在写好代码后，保存（`⌘+s`）, 右侧预览区就可以实时的看到整个场景的效果。
