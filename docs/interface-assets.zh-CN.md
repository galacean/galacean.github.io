---
order: 3
title: 资产面板
type: 基础知识
group: 界面
label: Basics/Interface
---

<img src="https://gw.alipayobjects.com/zos/OasisHub/b4ef8a10-3a03-4a85-afc0-1ada972a50ab/image-20230925180630387.png" alt="image-20230925180630387" style="zoom:50%;" />

资产面板是编辑器中一个重要的面板，它可以帮助你管理场景中使用到的所有资产。在资产面板中，你可以查看和管理场景中使用到的所有资产，例如材质、贴图、模型等等。通过资产面板，你可以添加或删除资产，以及对资产进行分类管理，从而更好的组织资产。

目前，编辑器支持上传或创建的资产有：

| 支持的资产 | 说明 | 创建方式 |
| --- | --- | --- |
| 模型 | 支持 gltf/glb/fbx 文件上传，可以拖动到场景中 | 上传 |
| 纹理 | 支持 png/jpeg 文件上传，创建 2D 纹理 | 上传 |
| HDR | 支持 .hdr 文件上传，可用于场景天空，环境光 | 上传 |
| Lottie | 支持 lottie 文件（.json） 文件上传，需要把外链图片转成 base64 | 上传 |
| 材质 | 用于调整渲染效果 | 创建 |
| 网格 | 不可添加，只能使用内部网格和模型中的网格 | - |
| 动画控制器 | 用于控制动画状态 | 创建 |
| 精灵 | 用于 2D 效果制作 | 创建 |
| 精灵图集 | 用于 2D 素材优化 | 创建 |
| 字体 | 支持 `.ttf`, `.otf`, `.woff` 文件上传，用于制作 2D 文字 | 创建 |
| 文件夹 | 和系统一致的文件夹逻辑，可以把文件拖拽到文件夹中 | 创建 |

### 添加资产

为了在场景中添加资产，你可以点击资产面板上的添加按钮，或者资产面板的右键菜单中的添加选项来添加新资产。添加资产后，你可以在检查器面板中对资产的属性进行编辑。资产面板中的资产类型非常丰富，例如材质、贴图、模型、字体等等。具体可以参照上方的表格。

<figure style="margin:0 auto;width: 697px;">
  <img alt="Upload Asset by drag" src="https://gw.alipayobjects.com/zos/OasisHub/a87e7e88-c8e5-460f-9daf-704d6ad09dfa/image-20230925180747370.png" width="100%">
  <figcaption style="text-align:center; color: #889096; font-size: 12px;">通过右键菜单创建/上传资产</figcaption>
</figure>

你还可以将文件拖动到资产面板中来添加资产。支持的文件类型包括 `glTF`, `glb`, `fbx`, `png`, `jpeg`, `hdr`, `ttf`, `otf`, `woff`, `json`（仅 lottie json） 等等。

<figure style="margin:0 auto;width: 700px;">
  <img alt="Upload Asset by drag" src="https://mdn.alipayobjects.com/huamei_fvsq9p/afts/img/A*9kmHQ6X7qVIAAAAAAAAAAAAADqiTAQ/original" width="100%">
  <figcaption style="text-align:center; color: #889096; font-size: 12px;">通过拖拽上传图片</figcaption>
</figure>

资产面板中的资产可以通过分类来管理，以便更好的组织资产。你可以在资产面板中创建文件夹并将资产移动到对应的文件夹中，以实现分类管理。资产面板中的文件夹可以嵌套，你可以创建多层级的文件夹来更好的组织资产。

![drag](https://gw.alipayobjects.com/zos/OasisHub/d1c3f972-bec6-47fc-92ab-dc18b8d447b1/drag.gif)

资产搜索功能可以帮助你快速定位场景中的资产，特别是对于大型场景或者资产数量较多的场景，搜索功能可以提高你的工作效率。资产面板上方有一个搜索框，你可以通过输入名称搜索场景中的资产。搜索框支持模糊搜索，你可以输入资产名称或类型的部分字符来查找资产。搜索框旁还有一个过滤器，你可以使用过滤器来筛选资产类型，例如只显示模型或只显示材质等等。

### 删除资产

你可以在选中一个资产后点击资产面板上的删除按钮，或者通过右键菜单中的删除选项来删除资产。删除资产时，你需要注意所删除的资产是否会影响场景中其他节点的关联性。

### 预览资产

在选中一个资产后, 右侧的检查器面板会显示出此资产可配置的属性。不同的资产所对应的可配置项是不同的, 比如 glTF 资产会显示模型预览窗, 材质资产会显示出详细的材质配置选项 。

<figure style="width:305px">
  <img alt="Hierarchy Pane" src="https://gw.alipayobjects.com/zos/OasisHub/ac387a20-4a2e-4d59-9d80-f06a7f69158b/image-20230925180421581.png" >
  <figcaption style="text-align:center; color: #889096">glTF检查器</figcaption>
</figure>

### 使用资产

部分资产（如 glTF 资产）支持拖拽到场景中或节点树中。

![drag1](https://gw.alipayobjects.com/zos/OasisHub/d79190c7-db54-49b3-9417-ac777a19ac30/drag1.gif)

检查器提供了统一的资产选择器，你也可以把资产拖拽到检查器的资产选择框中，以便快速操作。

<figure style="width:341px">
  <img alt="Hierarchy Pane" src="https://gw.alipayobjects.com/zos/OasisHub/57a69991-5d67-4e1d-ae50-585ea434224d/image-20230925180956061.png" >
  <figcaption style="text-align:center; color: #889096">资产选择器</figcaption>
</figure>
