---
order: 4
title: 帧动画
type: 动画
label: Animation
---

Galacean支持引用类型的动画曲线，你可以添加类型为资产的关键帧比如（精灵）下图为制作精灵动画的流程：

1. 给节点添加 `SpriteRenderer` 组件

![Alt text](https://mdn.alipayobjects.com/huamei_3zduhr/afts/img/A*PxdFQKal1JEAAAAAAAAAAAAADsJ_AQ/original)


2. 在资产面板中创建 `AnimationClip`

![Alt text](https://mdn.alipayobjects.com/huamei_3zduhr/afts/img/A*t1KMQb0s8V8AAAAAAAAAAAAADsJ_AQ/original)

3. 在 `AnimationClip` 编辑器中添加 `sprite` 属性

![Alt text](https://mdn.alipayobjects.com/huamei_3zduhr/afts/img/A*yFnYT5-NDFEAAAAAAAAAAAAADsJ_AQ/original)

4. 开启录制模式，编辑器中点到对应的帧数，在 `SpriteRenderer` 中添加 `Sprite` （sprite 上传相关详见[精灵](${docs}graphics-sprite)）即可自动添加关键帧

![Alt text](https://mdn.alipayobjects.com/huamei_3zduhr/afts/img/A*wN9sSYfs2eAAAAAAAAAAAAAADsJ_AQ/original)

### 脚本实现 

引擎在1.1版本支持引用类型的动画曲线（[AnimationRefCurve](${api}core/AnimationRefCurve)），关键帧的值可以是资产如（精灵，材质），你可以通过创建引用类型的动画曲线实现比如帧动画的能力：

<playground src="animation-sprite.ts"></playground>
