---
order: 0
title: 精灵
type: 功能
group: 2D 渲染
label: Editor-Feature/Rendering-2d
---

[Sprite](${api}core/Sprite) 是 2D 图形对象，用于角色、道具、子弹以及一些其他 2D 游戏要素。这些图形是从 [Texture2D](${docs}texture-cn) 获得的。[Sprite](${api}core/Sprite) 类主要标识应用于特定 `Sprite` 的图像部分。然后 [Entity](${docs}entity-cn) 上的  [SpriteRenderer](${docs}sprite-renderer-cn) 组件可以使用此信息来实际显示图形，[Entity](${docs}entity-cn) 上的 [SpriteMask](${docs}sprite-mask-cn) 组件可以使用此信息来表示遮罩区域。详见 [精灵资源](${docs}sprite-cn)。


## 使用

### 创建精灵资源

在编辑器中创建一个默认的精灵资源如下所示：

![sprite-create](https://gw.alipayobjects.com/zos/OasisHub/f6f58e3d-d9a9-43e1-9683-7e8eccb401e8/sprite-create.gif)

### 设置纹理

创建默认精灵后，我们需要给精灵资源设置一个纹理来表示显示内容，如下：

![sprite-tex](https://gw.alipayobjects.com/zos/OasisHub/978267ca-a69f-4fff-aaee-c9454dee92c8/sprite-tex.gif)

### 设置 pivot

对于 pivot 来说，纹理左下角为 `(0, 0)`，X 轴从左到右，Y 轴从下到上。在编辑器中，内置了一些常用的 pivot 快捷方式，如下：

![sprite-pivot](https://gw.alipayobjects.com/zos/OasisHub/39fb7688-a2f6-41ed-978b-250a4466e85f/image-20210720202052097.png)

如果内置的 pivot 无法满足需求，可以自定义自己的 pivot，如下：

![sprite-pivot](https://gw.alipayobjects.com/zos/OasisHub/7876d914-1873-4e19-87f8-5aa1c88dad2c/sprite-pivot.gif)

### 设置 region

通过设置 region 可以控制显示图片的区域，如下：

![sprite-region](https://gw.alipayobjects.com/zos/OasisHub/d3c8242f-681c-4bbb-b446-7aa7276f3190/image-20210720202831351.png)

# 添加精灵组件
精灵组件用于在 3D/2D 场景中显示图片，详见 [精灵组件](${docs}sprite-renderer-cn)。

## 添加精灵组件

需要显示图片的时候，需要先给一个实体添加精灵组件，如下：

![sprite-renderer-create](https://gw.alipayobjects.com/zos/OasisHub/93905eee-26ff-4479-b620-aa524729c213/tttttt.gif)

## 设置精灵资源

![sprite-renderer-add](https://gw.alipayobjects.com/zos/OasisHub/d832a9f7-ccd5-423d-972b-450ff97b6c79/sprite-renderer-add.gif)

## 图片翻转

除了基本的图片显示，`SpriteRenderer` 还支持图片的翻转，只需要通过设置属性 `flipX/flipY` 即可完成翻转，如下：

![sprite-renderer-flip](https://gw.alipayobjects.com/zos/OasisHub/748b5ac1-802e-4cae-aa8b-3d6b867f8560/sprite-renderer-flip.gif)

## 设置颜色

可以通过设置 `color` 属性来调整颜色，从而实现一些淡入淡出的效果，如下：

![sprite-renderer-color](https://gw.alipayobjects.com/zos/OasisHub/c99c7559-297f-414a-8053-0b94b3149398/sprite-renderer-color.gif)

## 使用遮罩

从 0.4 版本开始，引擎加入了 [SpriteMask](${docs}sprite-mask-cn) 组件，`SpriteRenderer` 和 `SpriteMask` 配合使用，可以实现精灵的各种遮挡效果。`SpriteMask` 组件在编辑器中的使用详见 [SpriteMask在编辑器中如何使用](${docs}editor-sprite-mask-cn)。

使用遮罩，需要设置两个字段，如下：

![sprite-renderer-mask-prop](https://gw.alipayobjects.com/zos/OasisHub/d5a96b03-db3c-4d16-82ef-d62b3cef0073/image-20210721114208887.png)

mask interaction：遮罩类型    
mask layer：精灵所属遮罩层

在编辑器中，可以通过设置以上两个字段来看看具体效果，如下：

![sprite-renderer-mask](https://gw.alipayobjects.com/zos/OasisHub/a4e98994-b279-4802-8925-9ac8dd29bd3d/sprite-renderer-mask.gif)

