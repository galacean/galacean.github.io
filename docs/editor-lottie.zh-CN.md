---
order: 3
title: Lottie
type: 功能
group: 2D 渲染
label: Editor/Feature/Rendering-2d
---

[Lottie](https://airbnb.design/lottie/) 是广受设计师和前端开发者欢迎的动画格式，用户可以在 Oasis Editor 中轻松完成 Lottie 资产的处理和组件添加。

## 使用

建议设计师在 AE 中导出 lottie 文件的时候，图片采用 base64 格式写入 lottie 的 json 文件中。

1. 开发者拿到 `.json` 文件后，首先需要把 `.json` 文件上传到 Oasis Editor。通过资产面板的上传按钮选择 “lottie” 资产，选择本地一个 lottie json 文件，然后：

![image-20210901120042826](https://gw.alipayobjects.com/zos/OasisHub/9bf57e62-a29d-4554-b3f7-316c1d05c0dc/image-20210901120042826.png)

2. 选择一个节点，添加 Lottie 组件，选择 resource 为上一步上传的资产，通过修改 speed 改变播放速度：

![lottie](https://gw.alipayobjects.com/zos/OasisHub/376758af-98c9-4365-9fe3-cda8cc55286a/lottie.gif)

## 参数说明

| 属性 | 功能说明 |
| :--- | :--- |
| `resource` | 选择 Lottie 资产 |
| `isLooping` | 是否循环播放，默认循环 |
| `speed` | 播放速度，`1` 为原速度播放，数值越大播放约快 |

