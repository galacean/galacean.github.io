---
order: 5
title: 帧动画
type: 动画
label: Animation
---

编辑器支持引用类型的动画曲线，你可以添加类型为资产的关键帧比如（精灵）下图为制作精灵动画的流程：

1. 给节点添加 `SpriteRenderer` 组件

<img src="https://mdn.alipayobjects.com/huamei_3zduhr/afts/img/A*qaqaTpBc_6oAAAAAAAAAAAAADsJ_AQ/original" alt="image-1" style="zoom:50%;" />


2. 在资产面板中创建 `AnimationClip`

<img src="https://mdn.alipayobjects.com/huamei_3zduhr/afts/img/A*iD-TR4SAADUAAAAAAAAAAAAADsJ_AQ/original" alt="image-2" style="zoom:50%;" />

3. 在 `AnimationClip` 编辑器中添加 `sprite` 曲线

<img src="https://mdn.alipayobjects.com/huamei_3zduhr/afts/img/A*blT2T5NLFx4AAAAAAAAAAAAADsJ_AQ/original" alt="image-3" style="zoom:50%;" />

4. 编辑器中点到对应的帧数，在 `SpriteRenderer` 中添加 `Sprite` （sprite 上传相关详见[精灵](${docs}editor-sprite.zh-CN)）即可自动添加关键帧

<img src="https://mdn.alipayobjects.com/huamei_3zduhr/afts/img/A*tGOdSILNYokAAAAAAAAAAAAADsJ_AQ/original" alt="image-4" style="zoom:50%;" />


完整流程如下：

![spriteAnimation](https://mdn.alipayobjects.com/huamei_3zduhr/afts/img/A*Yo2CQLHR1OkAAAAAAAAAAAAADsJ_AQ/original)

### 脚本实现 

引擎在1.1版本支持引用类型的动画曲线（[AnimationRefCurve](${api}core/AnimationRefCurve)），关键帧的值可以是资产如（精灵，材质），你可以通过创建引用类型的动画曲线实现比如帧动画的能力：

<playground src="animation-sprite.ts"></playground>