---
order: 2
title: 资产面板
type: 界面
label: Editor-Interface
---

![image-20221228150531761](https://mdn.alipayobjects.com/rms/afts/img/A*ZAjNRZ02xVkAAAAAAAAAAAAAARQnAQ/original/image-20221228150531761.png)

资产面板是整个项目资源管理的关键。用户可以通过资产创建，资产导入增加到项目资产面板中，即可以使用资产去构建场景。目前支持的资产有：

| 支持的资产 | 说明                                                         |
| ---------- | ------------------------------------------------------------ |
| 模型       | 支持 gltf/glb/fbx 文件上传，可以拖动到场景中                 |
| 纹理       | 支持 png/jpeg 文件上传，创建 2D 纹理                         |
| HDR        | 支持 .hdr 文件上传，可用于场景天空，环境光                   |
| 材质       | 直接添加，用于调整渲染效果                                   |
| 网格       | 不可添加，只能使用内部网格和模型中的网格                     |
| 动画控制器 | 直接添加，用于控制动画状态                                   |
| 精灵       | 直接添加，用于 2D 效果制作                                   |
| 精灵图集   | 直接添加，用于 2D 素材优化                                   |
| Lottie     | 支持 lottie 文件（.json） 文件上传，需要把外链图片转成 base64 |
| 字体       | 支持 .ttf,.otf,.woff 文件上传，用于制作 2D 文字              |
| 文件夹     | 直接添加                                                     |
|            |                                                              |

## 资产添加

有两种方式添加资产：

1. 右键资产面板，点击创建
2. 点击资产面板右上角的 + 按钮

![oasis-drag](https://mdn.alipayobjects.com/rms/afts/img/A*Dl7bQ7C-a7wAAAAAAAAAAAAAARQnAQ/original/oasis-drag.gif)

## 资产导入

资产导入分有两种方式

**1. 直接拖入**

可以直接拖动 Folder 中文件到资产面板中

![oasis-drag](https://mdn.alipayobjects.com/rms/afts/img/A*d9OMQZfHiyAAAAAAAAAAAAAAARQnAQ/original/oasis-drag.gif)

**2. 面板导入**

点击资产面板右上角上传按钮，选中需要上传的类型即可：

![oasis-drag](https://mdn.alipayobjects.com/rms/afts/img/A*zFaaRJRAGeYAAAAAAAAAAAAAARQnAQ/original/oasis-drag.gif)

## 资产删除

资产删除可以通过右键删除，也可以通过选中资产，点击右上角删除按钮：

![oasis-drag](https://mdn.alipayobjects.com/rms/afts/img/A*nh1JR4TebMQAAAAAAAAAAAAAARQnAQ/original/oasis-drag.gif)

## 移动资产

拖动资产到文件夹中，或者左侧目录中：

![oasis-drag](https://mdn.alipayobjects.com/rms/afts/img/A*I8oWSpAqH0gAAAAAAAAAAAAAARQnAQ/original/oasis-drag.gif)

## 选定资产类型查看

点击左上角按钮，可以选择特定类型查看：

![oasis-drag](https://mdn.alipayobjects.com/rms/afts/img/A*s7cHQqnnFzsAAAAAAAAAAAAAARQnAQ/original/oasis-drag.gif)

## 资产搜索

在资产面板按 command + f，或者点击搜索框：

![oasis-drag](https://mdn.alipayobjects.com/rms/afts/img/A*z9S8TqajrXwAAAAAAAAAAAAAARQnAQ/original/oasis-drag.gif)

## 运行时资产异步加载

在实际项目中，所有的资源都是按需加载的，按照当前加载的 Scene 来加载对应的资源。

如果在需要在下载的模板中访问当前编辑器中的资源，假设我们需要访问 Material1 资源：

<img src="/Users/husong/Library/Application Support/typora-user-images/image-20230328152809768.png" alt="image-20230328152809768" style="zoom:50%;" />

可以通过绝对路径方式的方式加载：

```typescript
const material1 = await engine.resourceManager.load("/Assets/Material1")
```

