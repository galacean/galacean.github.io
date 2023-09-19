---
order: 2
title: 精灵渲染组件
type: 功能
group: 2D 渲染
label: Editor-Feature/Rendering-2d
---


精灵渲染组件用于在 3D/2D 场景中显示图片，详见 [精灵组件](${docs}sprite-renderer-cn)。在使用精灵渲染组件之前，你可能需要先了解一下 [Sprite](${docs}editor-sprite-cn) 。

## 添加精灵组件

需要显示图片的时候，需要先给一个实体添加精灵组件，并且设置精灵资源属性，如下：

![sprite-renderer](https://mdn.alipayobjects.com/huamei_w6ifet/afts/img/A*fdp-R4v1Ei4AAAAAAAAAAAAADjCHAQ/original)


## 更多属性

![属性面板](https://mdn.alipayobjects.com/huamei_w6ifet/afts/img/A*CcoCQJ2homcAAAAAAAAAAAAADjCHAQ/original)

在精灵渲染组件的属性查看器中可以看到编辑器提供了精灵渲染组件所有可设置的属性，属性说明如下：

| 属性 | 功能说明 |
| :--- | :--- |
| `Sprite` | 精灵资源 |
| `Width` | 精灵显示宽，默认会根据贴图自动计算 |
| `Height` | 精灵显示高，默认会根据贴图自动计算 |
| `Color` | 精灵颜色 |
| `Flip` | 精灵翻转，支持水平和竖直两个方向 |
| `Draw Mode` | 绘制模式，支持普通与九宫绘制 |
| `Mask Interaction` | 遮罩类型，用于设置精灵是否需要遮罩，以及需要遮罩的情况下，是显示遮罩内还是遮罩外的内容 |
| `Mask Layer` | 精灵所属遮罩层，用于和 SpriteMask 进行匹配，默认为 Everything，表示可以和任何 SpriteMask 发生遮罩 |
| `priority` | 渲染优先级，值越小，渲染优先级越高，越优先被渲染 |

## 使用遮罩

从 0.4 版本开始，引擎加入了 [SpriteMask](${docs}sprite-mask) 组件，`SpriteRenderer` 和 `SpriteMask` 配合使用，可以实现精灵的各种遮罩效果。`SpriteMask` 组件在编辑器中的使用详见 [SpriteMask在编辑器中如何使用](${docs}editor-sprite-mask)。

在有 SpriteMask 匹配的前提下，设置 `Mask Interaction` 为不同值，效果如下：

1、设置为 `sprite mask none`，表示不需要遮罩

<img src="https://mdn.alipayobjects.com/huamei_w6ifet/afts/img/A*SRC4R4Bctp8AAAAAAAAAAAAADjCHAQ/original"  style="zoom:50%;" />

2、设置为 `sprite mask visible in side`，表示显示遮罩区域内内容

<img src="https://mdn.alipayobjects.com/huamei_w6ifet/afts/img/A*48_kTozciMcAAAAAAAAAAAAADjCHAQ/original"  style="zoom:50%;" />

3、设置为 `sprite mask visible out side`，表示显示遮罩区域外内容

<img src="https://mdn.alipayobjects.com/huamei_w6ifet/afts/img/A*bROfQqyt4CcAAAAAAAAAAAAADjCHAQ/original"  style="zoom:50%;" />