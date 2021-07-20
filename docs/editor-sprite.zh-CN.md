---
order: 8
title: 精灵资源
type: 编辑器
---

[Sprite](${api}core/Sprite) 是 2D 图形对象，用于角色、道具、子弹以及一些其他 2D 游戏要素。这些图形是从 [Texture2D](${docs}texture-cn) 获得的。[Sprite](${api}core/Sprite) 类主要标识应用于特定Sprite的图像部分。然后 [Entity](${docs}entity-cn) 上的  [SpriteRenderer](${docs}sprite-renderer-cn) 组件可以使用此信息来实际显示图形，[Entity](${docs}entity-cn) 上的 [SpriteMask](${docs}sprite-mask-cn) 组件可以使用此信息来表示遮罩区域。详见 [精灵资源](${docs}sprite-cn)。


## 使用

### 创建精灵资源

在编辑器中创建一个默认的精灵资源如下所示：

![sprite-create](https://gw.alipayobjects.com/zos/OasisHub/f6f58e3d-d9a9-43e1-9683-7e8eccb401e8/sprite-create.gif)

### 设置纹理

创建默认精灵后，我们需要给精灵资源设置一个纹理来表示显示内容，如下：

![sprite-tex](https://gw.alipayobjects.com/zos/OasisHub/978267ca-a69f-4fff-aaee-c9454dee92c8/sprite-tex.gif)

### 设置 pivot

对于 pivot 来说，纹理左下角为 (0, 0)，X 轴从左到右，Y 轴从下到上。在编辑器中，内置了一些常用的 pivot 快捷方式，如下：

![sprite-pivot](https://gw.alipayobjects.com/zos/OasisHub/39fb7688-a2f6-41ed-978b-250a4466e85f/image-20210720202052097.png)

如果内置的 pivot 无法满足需求，可以自定义自己的 pivot，如下：

![sprite-pivot](https://gw.alipayobjects.com/zos/OasisHub/7876d914-1873-4e19-87f8-5aa1c88dad2c/sprite-pivot.gif)

### 设置 region

通过设置 region 可以控制显示图片的区域，如下：

![sprite-region](https://gw.alipayobjects.com/zos/OasisHub/d3c8242f-681c-4bbb-b446-7aa7276f3190/image-20210720202831351.png)
