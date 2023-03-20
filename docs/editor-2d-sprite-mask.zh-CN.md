---
order: 3
title: 精灵遮罩组件
type: 功能
group: 2D 渲染
label: Editor-Feature/Rendering-2d
---

精灵遮罩组件用于对 3D/2D 场景中的[精灵](${docs}editor-sprite-renderer-cn)实现遮罩效果，详见 [精灵遮罩组件](${docs}sprite-mask-cn)。在使用精灵遮罩组件之前，你可能需要先了解一下 [Sprite](${docs}editor-2d-sprite-cn) 。

## 添加精灵遮罩组件

当我们需要对一个精灵进行遮罩的时候，首先需要创建一个实体，并添加精灵遮罩组件，如下：

![mask-create](https://mdn.alipayobjects.com/huamei_w6ifet/afts/img/A*2aiPQpvSyncAAAAAAAAAAAAADjCHAQ/original)

## 设置遮罩区域

精灵遮罩组件通过图片来表示遮罩区域，这里我们通过组件的 `sprite` 参数来设置精灵资源，如下：

![mask-sprite](https://mdn.alipayobjects.com/huamei_w6ifet/afts/img/A*iVO6SaltbFoAAAAAAAAAAAAADjCHAQ/original)

## 设置精灵的遮罩类型

通过以上两个步骤，如果发现遮罩还是没有任何效果，大概率是因为当前的精灵的遮罩类型还是默认的(None)，我们设置场景中精灵的 `Mask Interaction` 设置为非 `sprite mask none` 即可。

## 设置 alpha cutoff

这个参数表示当前 mask 有效 `alpha` 值的下限(范围：`0~1`)，即 sprite 的纹理中 alpha 值小于 alpha cutoff 的将被丢弃(也就是不会当作遮罩区域)。我们可以通过动态调整这个属性的值来看下实际效果，如下：

![mask-alpha](https://mdn.alipayobjects.com/huamei_w6ifet/afts/img/A*he3fT5IKYesAAAAAAAAAAAAADjCHAQ/original)

