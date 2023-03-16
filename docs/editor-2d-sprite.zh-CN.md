---
order: 5
title: 精灵
type: 功能
group: 2D 渲染
label: Editor-Feature/Rendering-2d
---

[Sprite](${api}core/Sprite) 是 2D 图形对象，用于角色、道具、子弹以及一些其他 2D 游戏要素。这些图形是从 [Texture2D](${docs}texture-cn) 获得的。[Sprite](${api}core/Sprite) 类主要标识应用于特定 `Sprite` 的图像部分。然后 [Entity](${docs}entity-cn) 上的  [SpriteRenderer](${docs}sprite-renderer-cn) 组件可以使用此信息来实际显示图形，[Entity](${docs}entity-cn) 上的 [SpriteMask](${docs}sprite-mask-cn) 组件可以使用此信息来表示遮罩区域。详见 [精灵资源](${docs}sprite-cn)。

## 创建精灵资源

在编辑器中创建一个默认的精灵资源如下所示：

![sprite-create](https://mdn.alipayobjects.com/huamei_w6ifet/afts/img/A*8eWyRq8mjxwAAAAAAAAAAAAADjCHAQ/original)

## 设置纹理

创建默认精灵后，我们需要给精灵资源设置一个纹理来表示显示内容，如下：

![sprite-tex](https://mdn.alipayobjects.com/huamei_w6ifet/afts/img/A*xC1_TaLq5t0AAAAAAAAAAAAADjCHAQ/original)

## 设置 pivot

对于 pivot 来说，纹理左下角为 `(0, 0)`，X 轴从左到右，Y 轴从下到上。在编辑器中，内置了一些常用的 pivot 快捷方式，如下：

![sprite-pivot](https://mdn.alipayobjects.com/huamei_w6ifet/afts/img/A*bwquRJomZSoAAAAAAAAAAAAADjCHAQ/original)

如果内置的 pivot 无法满足需求，可以自定义自己的 pivot，如下：

![sprite-pivot](https://mdn.alipayobjects.com/huamei_w6ifet/afts/img/A*I4hdQo2L7rUAAAAAAAAAAAAADjCHAQ/original)

## 设置 region

通过设置 region 可以控制显示图片的区域，如下：

![sprite-region](https://mdn.alipayobjects.com/huamei_w6ifet/afts/img/A*f715QK69MzMAAAAAAAAAAAAADjCHAQ/original)

