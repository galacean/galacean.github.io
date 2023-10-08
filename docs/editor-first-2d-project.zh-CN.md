---
order: 1
title: 第一个 2D 项目
type: 介绍
label: Editor-Introduction
---

> 相信大家对 Flappy Bird 都不陌生，本文简单描述下如何用 Galacean 复刻这个 2D 游戏。
>
> 原游戏链接：[http://flappybird.io/](http://flappybird.io/)

Flappy Bird 是一个 2D 项目， 我们先通过编辑器的 `New Project`  创建一个 `2D Project`。项目创建之后，会自动打开一个空白的 2D 场景编辑器。

## 准备资源

Flappy Bird 依赖的资源是一堆图片，点击[这里]()可以下载图片包到本地。解压之后看到以下图片：

- 0-9 的分数数字图
- 游戏背景图
- 小鸟的动画帧图
- 草地、管道
- 游戏重新开始按钮

<img src="https://gw.alipayobjects.com/zos/OasisHub/154a2280-92d5-465e-8501-4ecc3f01c9d1/image-20231007170002181.png" alt="image-20231007170002181" style="zoom:50%;" />

### 上传资源

回到场景编辑器，点击资源面板上的上传按钮 <img src="https://gw.alipayobjects.com/zos/OasisHub/07b876d3-462b-4a06-a2da-ce68d2932034/image-20231007145111353.png" alt="image-20231007145111353" style="zoom:50%;" />，选择  `Sprite`，此时会唤起操作系统的文件查看器，选中所有 FlappyBird 目录下的图片。上传之后，如下图所示，编辑器为每张图片创建了一个 [Texture](${docs}texture) 资源和 一个 [Sprite](${docs}sprite) 资源（为了和 Texture 资源作区分，Sprite 对象带灰色圆角矩形背景）。在接下来的操作中，我们只需要关心 Sprite 资源。

<img src="https://gw.alipayobjects.com/zos/OasisHub/7f13679f-de18-4621-81b1-5834b5d00bd7/image-20231007145451371.png" alt="image-20231007145451371" style="zoom:50%;" />

到这里，我们已经把资源上传完，但是有洁癖的你看到这散乱的资源可能已经按耐不住整理的冲动了。让我们创建一个文件夹，并重命名为 *Sprites*，把刚上传的资源批量选中后拖到 *Sprites* 目录中。这样做的目的不仅是让资源面板更加整洁，还为我们下一步创建 [Atlas 图集](${docs}sprite-atlas)资源做好了准备。

### 创建图集

为了达到更好的运行时性能，我们选择把这些 Sprite 资源打包到一个 Atlas 资源。我们点击 <img src="https://gw.alipayobjects.com/zos/OasisHub/16aa674c-1bee-49d7-a516-21c591a4ce36/image-20231007152415467.png" alt="image-20231007152415467" style="zoom:50%;" /> 按钮选择 `Sprite Atlas`，创建后选中它，通过检查器面板上的 `Add to List` 按钮把除了背景图（ `background-spr.png`） 和地面（`grass.png`）之外的 Sprite 资源都添加到列表中。

<img src="https://gw.alipayobjects.com/zos/OasisHub/a58d8beb-7e8e-4b5e-a53e-03ad37304009/image-20231007171348757.png" alt="image-20231007171348757" style="zoom:50%;" />

点击 `Pack and Preview` 按钮可以看到 Atlas 创建成功：

<img src="https://gw.alipayobjects.com/zos/OasisHub/cc3e12d2-5b7a-4968-8f4f-e8304a060caa/image-20231007153448666.png" alt="image-20231007153448666" style="zoom:50%;" />



恭喜你，到这里你已经完成了资源上传和管理的操作。接下去我们进行游戏场景搭建的环节。



## 搭建场景

搭建 2D 场景就像玩拼图一样充满乐趣。首先，我们试着把游戏背景图从资源面板拖动场景中。不要怕拖的位置不准，只要拖到大概的位置，我们后面可以在检查器面板中精细调整。

![drag1](https://gw.alipayobjects.com/zos/OasisHub/6cabaeea-cc36-4fe1-8bb5-d7ed8a9a49b7/drag1.gif)

选中层级树面板中的 `Camera` 节点，可以预览场景在各种设备上渲染的样子。

> 如果你发现画面太大或太小，可以调整正交相机的 `Orthographic Size` 来实现缩放。

<img src="https://gw.alipayobjects.com/zos/OasisHub/6b8b4c29-95fe-400d-b9a7-9f29ac5495b8/image-20231007162550749.png" alt="image-20231007162550749" style="zoom:50%;" />

### 加上小鸟

同样，我们把小鸟的 Sprite（`bird3-spr.png`）也拖到场景中。小鸟“飞”的动画是通过序列帧实现的，详见[帧动画](${docs}editor-frame-animation)。

### 加上管道

随着游戏的进行，管道会在画面中重复出现，并且是上下成对出现。这里有个小技巧，可以把上面的管道的 `Scale` 值设成 `-1`，这样就优雅地实现了翻转。

<img src="https://gw.alipayobjects.com/zos/OasisHub/c4e2cf84-3834-4178-86d0-3ad9faa7bd28/image-20231007163240028.png" alt="image-20231007163240028" style="zoom:50%;" />

考虑到管道会重复出现，我们在节点树中把一对管道设置成一个 `PipeMother` 的组，并把它放到 `Pipe` 节点下。这样，后面通过在 Pipe 上绑定脚本组件就可以获取  `PipeMother` 以实现管道的复用。

<img src="https://gw.alipayobjects.com/zos/OasisHub/ef20415a-aa57-4236-b29e-e4df88f7e747/image-20231007163400680.png" alt="image-20231007163400680" style="zoom:50%;" />

### 加上草地

我们通过材质的 `tilingOffset` 属性来实现草地在地上平铺且能水平移动的效果。

> 由于 `SpriteRenderer` 的默认材质尚未支持  `tilingOffset` 属性，我们暂时先用一个平面几何体绑定 unlit 材质的方式来实现。后续等  `SpriteRenderer` 支持  `tilingOffset` 属性后就不需要这么麻烦了。

步骤如下：

1. 在节点树中创建一个节点，命名为 `ground`。

2. 在检查器面板中通过 `Add Component` 按钮添加 `Mesh Renderer` 组件，并且把 `Mesh` 属性设置成 `Plane`。

3. 在资源面版中创建一个 `Material`，把 `Shader` 属性设置成 `Unlit`，`Base Texture` 设置成 `ground.png`，`UV tiling offset` 的 `x` 值设置成 `21`。

   <img src="https://gw.alipayobjects.com/zos/OasisHub/d5d5114c-ec4a-4bd0-a395-ae14633065c5/image-20231007173243980.png" alt="image-20231007173243980" style="zoom:50%;" />

4. 重新选中 `ground` 节点，设置 `Mesh Renderer` 的 `Material` 为上一步创建的材质，然后调整一下节点的变换属性。

   <img src="https://gw.alipayobjects.com/zos/OasisHub/efc19c94-d350-4de8-a043-774d6cf36f4a/image-20231007173843994.png" alt="image-20231007173843994" style="zoom:50%;" />

### 加上 GUI

GUI 包括分数显示和重新开始按钮。我们分数（ `0.png`） 和重新开始按钮（ `restart.png`） 两个精灵拖到场景中，并放到新建的 `GUI` 节点下。

<img src="https://gw.alipayobjects.com/zos/OasisHub/2f443e5f-1523-4341-8f10-4c85c421fb50/image-20231007180819265.png" alt="image-20231007180819265" style="zoom:50%;" />

至此，界面搭建完毕！观察一下左侧的节点树的完整结构，好的树结构对复杂场景管理来说很重要。

> 如果你在上述过程中需要处理精灵之间的遮盖关系，就像 CSS 里的 `z-index` 属性一样，你可以通过 `Sprite Renderer`  的 `priority` 属性来设置，值越大越后渲染，即越能遮住其他精灵。

## 编写逻辑
