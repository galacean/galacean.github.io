# 添加脚本组件

[脚本组件](${book.manual}component/script)是引擎提供给开发者的重要的扩展能力，在 Oasis Editor 中，脚本也是资源的一部分，使用 [Typescript](https://www.typescriptlang.org/) 语言。

## 1. 创建脚本

你可以在资源面板中的右上角通过点击 *资源面板 > +* 来创建一份组件脚本。此时你会在你的资源编辑器中得到一份新的脚本：

![](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/6148/1602495944812-acad3d5b-d509-4dd7-b9af-814b7fdb285b.png#align=left&display=inline&height=206&margin=%5Bobject%20Object%5D&name=%E6%88%AA%E5%B1%8F2020-10-12%20%E4%B8%8B%E5%8D%885.45.41.png&originHeight=206&originWidth=936&size=10671&status=done&style=none&width=936)

## 2. 添加脚本到实体

选择一个实体，在右侧的**实体检查器**中点击 **添加组件 > 脚本**，选择刚才我们创建的脚本：

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/18082/1593673965869-b8275542-259a-463d-969e-111941b7e1bf.png#align=left&display=inline&height=557&margin=%5Bobject%20Object%5D&name=image.png&originHeight=646&originWidth=558&size=160658&status=done&style=none&width=481)

这样脚本就挂在到我们的实体上：

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/18082/1593674018150-1d2e830f-8514-4490-9b90-31f79f3defe1.png#align=left&display=inline&height=377&margin=%5Bobject%20Object%5D&name=image.png&originHeight=356&originWidth=353&size=36409&status=done&style=none&width=374)

有时候我们我们会觉得先创建再添加有点繁琐，也可以选择在添加时直接新建脚本：

![](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/6148/1602496330750-f9264452-172d-40bd-aca4-086c68231b09.png#align=left&display=inline&height=560&margin=%5Bobject%20Object%5D&name=%E6%88%AA%E5%B1%8F2020-10-12_%E4%B8%8B%E5%8D%885_46_28.png&originHeight=560&originWidth=612&size=57739&status=done&style=none&width=612)

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

![](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/6148/1602495699185-84af04ac-9d00-4a4e-88b1-3b4159dcb052.png#align=left&display=inline&height=856&margin=%5Bobject%20Object%5D&name=%E6%88%AA%E5%B1%8F2020-10-12%20%E4%B8%8B%E5%8D%885.41.34.png&originHeight=856&originWidth=1354&size=163651&status=done&style=none&width=1354)



