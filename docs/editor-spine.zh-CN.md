---
order: 6
title: Spine 渲染组件
type: 功能
group: 2D 渲染
label: Editor-Feature/Rendering-2d
---

[Spine](https://airbnb.design/lottie/) 是一款针对游戏开发的 2D 骨骼动画编辑工具。 Spine 旨在提供更高效和简洁 的工作流程，以创建游戏所需的动画。在 Galacean Editor中，用户能够轻松完成 Spine 资产的处理和组件添加～


## 基础使用

首先，需要设计师在 spine 编辑器中[导出](http://zh.esotericsoftware.com/spine-export#JSON) spine 素材。素材包含 json，atlas，png 三个文件。

开发者需要同时把三个文件上传到 Galacean Editor。通过资产面板的上传按钮选择 “spine” 资产，选择本地的这三个文件，上传成功后能够在资产面板看到上传的 spine 资产：

<img src="https://mdn.alipayobjects.com/huamei_w6ifet/afts/img/A*CwpKQazmEgsAAAAAAAAAAAAADjCHAQ/original"  style="zoom:50%;" />

选择一个节点，添加 Spine 渲染组件，选择 resource 为上一步上传的资产，选择需要显示的皮肤即可显示不同的内容，选择动画名称即播放 spine 动画（如果不选择，默认第一个）：

![spine](https://mdn.alipayobjects.com/huamei_w6ifet/afts/img/A*hr_DQauONmkAAAAAAAAAAAAADjCHAQ/original)

### 参数说明

| 属性 | 功能说明 |
| :--- | :--- |
| `resource` | 选择 Spine 资产 |
| `autoPlay` | 是否自动播放 |
| `loop` | 是否循环播放 |
| `animationName` | 动画名称 |
| `skinName` | 皮肤名称 |
| `Scale` | 动画缩放 |
