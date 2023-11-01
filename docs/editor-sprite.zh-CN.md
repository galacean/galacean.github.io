---
order: 0
title: 精灵
type: 功能
group: 2D 渲染
label: Editor-Feature/Rendering-2d
---

[Sprite](${api}core/Sprite) 是 2D 图形对象，用于角色、道具、子弹以及一些其他 2D 游戏要素。这些图形是从 [Texture2D](${docs}texture-cn) 获得的。[Sprite](${api}core/Sprite) 类主要标识应用于特定 `Sprite` 的图像部分。然后 [Entity](${docs}entity-cn) 上的  [SpriteRenderer](${docs}sprite-renderer-cn) 组件可以使用此信息来实际显示图形，[Entity](${docs}entity-cn) 上的 [SpriteMask](${docs}sprite-mask-cn) 组件可以使用此信息来表示遮罩区域。详见 [精灵资源](${docs}sprite-cn)。


## 使用

### 加载精灵资源

在编辑器中加载一个精灵资源只需要点击加载 Sprite 资源并选择本地一张图片即可，如下所示：

![sprite-create](https://mdn.alipayobjects.com/huamei_w6ifet/afts/img/A*a75JT7WLYGoAAAAAAAAAAAAADjCHAQ/original)

### 设置 pivot

对于 pivot 来说，纹理左下角为 `(0, 0)`，X 轴从左到右，Y 轴从下到上。在编辑器中，内置了一些常用的 pivot 快捷方式，如下：

![sprite-pivot](https://mdn.alipayobjects.com/huamei_w6ifet/afts/img/A*ZKFJR5LdJA0AAAAAAAAAAAAADjCHAQ/original)

如果内置的 pivot 无法满足需求，可以自定义自己的 pivot，如下：

![sprite-pivot](https://mdn.alipayobjects.com/huamei_w6ifet/afts/img/A*tuZ7QJEl_wsAAAAAAAAAAAAADjCHAQ/original)

### 设置 region

通过设置 region 可以控制显示图片的区域，如下：

![sprite-region](https://mdn.alipayobjects.com/huamei_w6ifet/afts/img/A*3lKORLoWYJMAAAAAAAAAAAAADjCHAQ/original)

# 添加精灵组件
精灵组件用于在 3D/2D 场景中显示图片，详见 [精灵组件](${docs}sprite-renderer-cn)。

## 添加精灵组件并且设置精灵资源

需要显示图片的时候，需要先给一个实体添加精灵组件，然后设置精灵资源，如下：

![sprite-renderer-create](https://mdn.alipayobjects.com/huamei_w6ifet/afts/img/A*adizTpp_l5cAAAAAAAAAAAAADjCHAQ/original)

## 图片翻转

除了基本的图片显示，`SpriteRenderer` 还支持图片的翻转，只需要通过设置属性 `flipX/flipY` 即可完成翻转，如下：

![sprite-renderer-flip](https://mdn.alipayobjects.com/huamei_w6ifet/afts/img/A*sK6tTJELnP0AAAAAAAAAAAAADjCHAQ/original)

## 设置颜色

可以通过设置 `color` 属性来调整颜色，从而实现一些淡入淡出的效果，如下：

![sprite-renderer-color](https://mdn.alipayobjects.com/huamei_w6ifet/afts/img/A*5pRRSLLGfq8AAAAAAAAAAAAADjCHAQ/original)

## 使用遮罩

从 0.4 版本开始，引擎加入了 [SpriteMask](${docs}sprite-mask-cn) 组件，`SpriteRenderer` 和 `SpriteMask` 配合使用，可以实现精灵的各种遮挡效果。`SpriteMask` 组件在编辑器中的使用详见 [SpriteMask在编辑器中如何使用](${docs}editor-sprite-mask-cn)。

使用遮罩，需要设置两个字段，如下：

![sprite-renderer-mask-prop](https://mdn.alipayobjects.com/huamei_w6ifet/afts/img/A*O0BtQpE83GkAAAAAAAAAAAAADjCHAQ/original)

mask interaction：遮罩类型    
mask layer：精灵所属遮罩层

在编辑器中，可以通过设置以上两个字段来看看具体效果，如下：

![sprite-renderer-mask](https://mdn.alipayobjects.com/huamei_w6ifet/afts/img/A*PewLQaWiLhoAAAAAAAAAAAAADjCHAQ/original)

