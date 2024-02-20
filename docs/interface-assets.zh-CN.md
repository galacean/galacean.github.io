---
order: 3
title: 资产面板
type: 基础知识
group: 界面
label: Basics/Interface
---

<img src="https://gw.alipayobjects.com/zos/OasisHub/f0c6ef22-b6f5-4ac7-876c-fff2e4a8b99d/image-20240122134812991.png" alt="image-20240122134812991" style="zoom:50%;" />

资产面板是编辑器中一个重要的面板，它可以帮助你管理场景中使用到的所有资产。在资产面板中，你可以查看和管理场景中使用到的所有资产，例如材质、贴图、模型等等。通过资产面板，你可以添加或删除资产，以及对资产进行分类管理，从而更好的组织资产。

目前，编辑器支持上传或创建的资产有(**+** 表示组合文件)：

| 支持的资产                                       | 说明                                                           | 交换格式                                            | 创建方式  |
| ------------------------------------------------ | -------------------------------------------------------------- | --------------------------------------------------- | --------- |
| 文件夹                                           | 类似操作系统的文件夹，可以把文件拖拽到文件夹中                 |                                                     | 创建      |
| 场景                                             | 用于实体树管理                                                 |                                                     | 创建      |
| 模型                                             | 3D 模型文件                                                    | `.gltf`+`.bin`+`.jpg`, `.glb`+`.jpg`, .`fbx`+`.jpg` | 上传      |
| 网格                                             | 不可添加，只能使用内部网格和模型中的网格                       |                                                     | -         |
| 材质                                             | 用于调整渲染效果                                               |                                                     | 创建      |
| 纹理                                             | 上传图片文件创建 2D 纹理                                       | `.png`,`.jpg`,` .webp`                              | 上传      |
| 立方体纹理（TextureCube）                        | 用于场景天空，环境光                                           | `.hdr`                                              | 上传      |
| 精灵                                             | 可以直接上传图片文件创建精灵（省去先创建精灵后绑定纹理的步骤） | `.png`,`.jpg`,` .webp`                              | 创建/上传 |
| 精灵图集（SpriteAtlas）                          | 把多个精灵打包成图集，用于优化 2D 资产                         |                                                     | 创建      |
| 字体                                             | 用于制作 2D 文字                                               | `.ttf`, `.otf`, `.woff`                             | 上传      |
| 脚本                                             | 用于编写业务逻辑                                               | `.ts`                                               | 创建      |
| 动画控制器（Animation Controller）               | 用于组织动画片段和控制动画状态                                 |                                                     | 创建      |
| 动画片段（Animation Clip）                       | 预先制作好的、连续的动画数据，包含一段时间内关键帧的变化信息   | `.ts`                                               | 创建      |
| 动画状态机脚本（Animation State Machine Script） | 用来控制和管理动画状态机行为的程序脚本                         |                                                     | 创建      |
| Lottie                                           | 支持 lottie 文件上传                                           | `.json`(+`.jpg`)，图片支持 base64 内置和独立图片    | 上传      |
| Spine                                            | 支持 spine 文件文件上传                                        | `.json` + `.atlas` + `.jpg`                         | 上传      |

### 添加资产

为了在场景中添加资产，你可以点击资产面板上的添加按钮，或者资产面板的右键菜单中的添加选项来添加新资产。添加资产后，你可以在检查器面板中对资产的属性进行编辑。资产面板中的资产类型非常丰富，例如材质、贴图、模型、字体等等。具体可以参照上方的表格。

<figure style="width: 578px;">
 <img src="https://gw.alipayobjects.com/zos/OasisHub/5bc3747d-b1e9-4864-b490-7f9d3eb86e93/image-20240122135556344.png" alt="image-20240122135556344" style="zoom:50%;" />
  <figcaption style="text-align:center; color: #889096; font-size: 12px;">通过右键菜单创建/上传资产</figcaption>
</figure>

你还可以将文件拖动到资产面板中来添加资产，组合文件可以直接选中多个文件拖进资产面板即可。

<figure style="width:605px;">
<img src="https://gw.alipayobjects.com/zos/OasisHub/15d62349-0820-44ec-8eb6-4e5a82121341/drag2.gif" alt="drag2" style="zoom:50%;" />
  <figcaption style="text-align:center; color: #889096; font-size: 12px;">通过拖拽上传图片</figcaption>
</figure>

### 组织资产

资产面板中的资产可以通过分类来管理，以便更好的组织资产。你可以在资产面板中创建文件夹并将资产移动到对应的文件夹中，以实现分类管理。资产面板中的文件夹可以嵌套，你可以创建多层级的文件夹来更好的组织资产。

<img src="https://gw.alipayobjects.com/zos/OasisHub/520edde4-a54b-4b53-bd47-d1738d08e26a/drag1.gif" alt="drag1" style="zoom:50%;" />

资产面板提供了对资产浏览友好的工具栏，帮助你快速地查找某个或某类资产。你也可以根据你的使用习惯，对资产的浏览模式、排序方式和缩略图大小进行修改。

<img src="https://gw.alipayobjects.com/zos/OasisHub/538c4cc0-7180-404a-8163-24564541bd75/drag4.gif" alt="drag4" style="zoom: 50%;" />

组织完资产后，每个资产都有一个**相对路径**，我们可以右击某个资产拷贝路径。

<img src="https://gw.alipayobjects.com/zos/OasisHub/5c56884c-ac30-4f87-95a8-48d96117a53b/image-20240131162519263.png" alt="image-20240131162519263" style="zoom:50%;" />

这对项目开发来说很重要，因为项目中经常遇到需要异步加载资产的情况，即初始化不需要加载某个资产（甚至是场景），可以通过脚本来控制某个资产的加载。具体的语法可以看[资产](${docs}assets-load)和[场景](${docs}core-scene)的加载使用，以加载场景为例：

```typescript
this.engine.resourceManager.load({ url: "...", type: AssetType.Scene });
```

### 删除资产

你可以在选中一个资产后点击资产面板上的删除按钮，或者通过右键菜单中的删除选项来删除资产。删除资产时，你需要注意所删除的资产是否会影响场景中其他节点的关联性。

### 预览资产

在选中一个资产后, 右侧的检查器面板会显示出此资产可配置的属性。不同的资产所对应的可配置项是不同的, 比如 glTF 资产会显示模型预览窗, 材质资产会显示出详细的材质配置选项 。

<figure style="width: 284px;">
 <img src="https://gw.alipayobjects.com/zos/OasisHub/ffb89d11-b221-4757-96f9-c4950ea7f225/image-20240122134306052.png" alt="image-20240122134306052" style="zoom:50%;" />
  <figcaption style="text-align:center; color: #889096;font-size: 12px;">glTF检查器</figcaption>
</figure>

### 使用资产

部分资产（如 glTF 资产）支持拖拽到场景中或节点树中。

<img src="https://gw.alipayobjects.com/zos/OasisHub/1220149f-b509-4e7e-bf11-5f0bc4de5bd6/drag3.gif" alt="drag3" style="zoom:50%;" />

检查器提供了统一的资产选择器，你也可以把资产拖拽到检查器的资产选择框中，以便快速操作。

<figure style="width: 326px;">
 <img src="https://gw.alipayobjects.com/zos/OasisHub/f456c74e-b8ba-4bd6-9cf9-4f907535af26/image-20240122134039213.png" alt="image-20240122134039213" style="zoom:50%;" />
  <figcaption style="text-align:center; color: #889096; font-size: 12px;">资产选择器</figcaption>
</figure>

### 快捷键

| 快捷键         | 功能     |
| -------------- | -------- |
| `⌫` / `Delete` | 删除资源 |
| `⌘` + `D`      | 复制资源 |
| `⌘`+ `F`       | 搜索资源 |
