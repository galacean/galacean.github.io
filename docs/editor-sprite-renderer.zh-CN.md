---
order: 3.1
title: 精灵渲染组件
type: 编辑器
group: 组件
---

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

