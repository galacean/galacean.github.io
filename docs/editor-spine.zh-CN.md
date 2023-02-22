---
order: 4
title: Spine
type: 功能
group: 2D 渲染
label: Editor-Feature/Rendering-2d
---

spine 资产包含 spine 动画的 json 文件，atlas 图集文件，image 贴图文件。用于渲染 spine 动画效果。


#### 资产上传

<img src="https://gw.alipayobjects.com/zos/OasisHub/fc3bf547-728d-43f3-8744-2b9d500469c3/1626680500571-3e7ab1a2-4991-4f7f-b219-9b6643b69247.png" alt="img" style="zoom:50%;" />

点击资产上传按钮，选择 spine 类型。

上传包含 json，atlas，png 文件的压缩包。

<img src="https://gw.alipayobjects.com/zos/OasisHub/cb928a1b-c74a-48d2-a730-047a7a9eabc1/1626681056140-56a07cc8-641f-4245-9137-dd2d9346971d.png" alt="img" style="zoom: 50%;" />

上传完成后，在资源栏能够看到上传的 spine 动画素材

<img src="https://gw.alipayobjects.com/zos/OasisHub/c4a394e4-e2ba-4f15-b2ba-8a090fa3f128/1626681082986-4901246a-646e-4dbf-b50d-d23da7bf4099.png" alt="img" style="zoom:50%;" />

#### 资产使用

spine 资产需要结合 spine 组件来实现 spine 动画效果，参考[ spine 组件文档](${docs}editor-component-spine-cn)。

spine 组件用于给实体添加 spine 动画效果。



### 组件添加

在[节点树](${docs}editor-hierarchy-cn)中，创建并点击选中实体（Entity）。

<img src="https://gw.alipayobjects.com/zos/OasisHub/4db9a2d5-9a37-4a27-b2a1-0aafb30ad5cd/1626681634222-8beabf17-8f7f-43de-8310-d18e32e27eac.png" alt="img" style="zoom:50%;" />

在[检查器面板](${docs}editor-inspector-cn)中，点击添加组件按钮，选择 spine 动画。

<img src="https://gw.alipayobjects.com/zos/OasisHub/08c20b89-7df9-4d7d-a961-86e6382e7657/1626750041954-834ddb16-f66e-4f7b-b2b5-112f580e3714.png" alt="img" style="zoom:50%;" />

添加完毕后，能够在[检查器面板](${docs}editor-inspector-cn)中看到 spine 组件：

<img src="https://gw.alipayobjects.com/zos/OasisHub/f63e85bf-2f1f-42a7-bd60-f03db615785b/1626682071627-aa55a319-fd35-44b4-adae-98fcababca86.png" alt="img" style="zoom:50%;" />



### 组件使用

#### 资产选择

点击组件的 resource 选项，进入资产选择模式，选择资产面板中的 [spine 资产](${docs}editor-resource-spine-cn)。

<img src="https://gw.alipayobjects.com/zos/OasisHub/3177ad2d-d4a2-4390-95b9-0b11dc142f70/1626750237947-f457782d-807c-4a04-87fa-10f99dbb1a0b.png" alt="img" style="zoom:50%;" />

选中后，就能够在预览窗口中看到 spine 动画了。

<img src="https://gw.alipayobjects.com/zos/OasisHub/6b7cb0dd-6a23-448d-8f8c-17ff3978e06d/1626682342975-ec2ac65d-9b72-48ce-9803-0ea27c061c69.png" alt="img" style="zoom:50%;" />

#### 参数调整

资产选择完毕后，可以通过调整组件参数实现以下效果：

- 动画选择：点击 `animationName` 按钮，能够下拉选择需要播放的动画
- 自动播放：选中 `autoPlay` 能够让动画自动播放

- 缩放调整：调整 `scale` 的数值能够修改 spine 动画的缩放，改变其大小

<img src="https://gw.alipayobjects.com/zos/OasisHub/db05bb60-79a9-486d-bec5-2e5519d047b8/1626682566952-675311f9-5cb0-4bc1-86fa-2717ac9e23cc.png" alt="img" style="zoom:50%;" />

#### 脚本控制

如果 spine 组件本身提供组件参数不能满足开发的需要，我们能够借助[脚本组件](${docs}editor-component-script-cn)实现更加复杂的控制。

如下图所示，在脚本的 `onAwake` 生命周期中，能够通过[事件系统](${docs}editor-script-communication-cn)对外暴露 spine 动画播放事件。

当事件触发时，会执行回调函数 `playAnimation`（左侧事件通信测试面板能手动触发事件）。

在 `playAnimation` 函数中，通过 `getComponentsIncludeChildren` 方法，获取到了该实体中所有添加的 `SpineAnimation` 组件。

我们获取第一个 `SpineAnimation` 组件，通过其暴露的 `state` 对象播放动画。

`state` 对象是 spine 运行时的原生动画类。借助 [AnimationState API](http://zh.esotericsoftware.com/spine-api-reference#AnimationState) 以及 事件系统，就能实现更加复杂的动画控制了。

<img src="https://gw.alipayobjects.com/zos/OasisHub/410b495b-8078-4357-857f-5cec6f51dcf0/1626751647820-7681d1b3-1f36-45eb-9fbd-0516b6c2612f.png" alt="img" style="zoom:50%;" />
