---
order: 6
title: Lottie 渲染组件
type: 功能
group: 2D 渲染
label: Editor-Feature/Rendering-2d
---

[Lottie](https://airbnb.design/lottie/) 是广受设计师和前端开发者欢迎的动画格式，用户可以在 Galacean Editor 中轻松完成 Lottie 资产的处理和组件添加。

## 基础使用

建议设计师在 AE 中导出 lottie 文件的时候，图片采用 base64 格式写入 lottie 的 json 文件中。

开发者拿到 `.json` 文件后，首先需要把 `.json` 文件上传到 Galacean Editor。通过资产面板的上传按钮选择 “lottie” 资产，选择本地一个 lottie json 文件，然后：

<img src="https://mdn.alipayobjects.com/huamei_w6ifet/afts/img/A*5RjfT6nvt1cAAAAAAAAAAAAADjCHAQ/original"  style="zoom:50%;" />

选择一个节点，添加 Lottie 组件，选择 resource 为上一步上传的资产，通过修改 speed 改变播放速度：

![lottie](https://mdn.alipayobjects.com/huamei_w6ifet/afts/img/A*FaB1RIf5jakAAAAAAAAAAAAADjCHAQ/original)

### 参数说明

| 属性 | 功能说明 |
| :--- | :--- |
| `resource` | 选择 Lottie 资产 |
| `isLooping` | 是否循环播放，默认循环 |
| `speed` | 播放速度，`1` 为原速度播放，数值越大播放约快 |


## 切片功能
编辑器提供了动画切片的功能，可以把设计师提供的整个片段切成多段，每个片段需要定义片段名、开始帧、结束帧三个字段。运行时的具体使用请看[这里](${docs}lottie)。

<img src="https://mdn.alipayobjects.com/huamei_2uqjce/afts/img/A*pIMCQ4XQIk8AAAAAAAAAAAAADsF_AQ/original" style="zoom:50%;" />