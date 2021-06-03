---
order: 8.1
title: 精灵遮罩
type: 组件
---

[SpriteMask](${api}core/SpriteMask) 组件用于对 3D/2D 场景中的精灵实现遮罩效果。

<playground src="sprite-mask.ts"></playground>

## 基本使用

1、下载图片纹理([Texture](${docs}texture-cn))，下载方法请参考[资源加载](${docs}resource-manager-cn)    
2、通过 texture 创建 [Sprite](${docs}sprite-cn) 对象    
3、创建 [SpriteMask](${api}core/SpriteRenderer)

```typescript
import { AssetType, Sprite, SpriteMask, Texture2D } from "oasis-engine";

engine.resourceManager
  .load<Texture2D>({
    url: "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*qyhFT5Un5AgAAAAAAAAAAAAAARQnAQ",
    type: AssetType.Texture2D
  })
  .then((texture) => {
    const spriteEntity = rootEntity.createChild(`spriteMask`);
    // 给实体添加 SpriteMask 组件
    const spriteMask = spriteEntity.addComponent(SpriteMask);
    // 通过 texture 创建 sprite 对象
    const sprite = new Sprite(engine, texture);
    // 设置 sprite
    spriteMask.sprite = sprite;
  });
```

## 参数说明

在基本使用中已经知道了如何创建一个遮罩，接下来就是通过 [SpriteMask](${api}core/SpriteMask) 提供的参数来控制如何和 [精灵](${docs}sprite-renderer-cn#使用遮罩) 发生作用。

| 参数 | 类型 | 说明 |
| :--- | :--- | :--- |
| influenceLayers | number | 当前 mask 影响的遮罩层，默认值为 SpriteMaskLayer.Everything，表示对所有遮罩层都有影响 |
| alphaCutoff | number | 当前 mask 有效 alpha 值的下限(范围：0~1)，即 sprite 的纹理中 alpha 值小于 alphaCutoff 的将被丢弃 |

```typescript
// mask 的 sprite 中纹理 alpha 小于 0.5 的将被丢弃
spriteMask.alphaCutoff = 0.5;
// mask 对所有遮罩层的精灵都生效
spriteMask.influenceLayers = SpriteMaskLayer.Everything;
// mask 只对处于遮罩层 Layer0 的精灵有效
spriteMask.influenceLayers = SpriteMaskLayer.Layer0;
// mask 对处于遮罩层 Layer0 和 Layer1 的精灵有效
spriteMask.influenceLayers = SpriteMaskLayer.Layer0 | SpriteMaskLayer.Layer1;
```

## 遮罩层

[SpriteMaskLayer](${api}core/SpriteMaskLayer) 里面声明了引擎提供的遮罩层，遮罩层是 SpriteMask 如何和 SpriteRenderer 作用的桥梁。SpriteMask 的 influenceLayers 表示该 mask 对处于哪些遮罩层内的 SpriteRenderer 会起到遮罩作用，SpriteRenderer 的 maskLayer 表示该精灵处于哪些遮罩层，如下：

![070C8B9F-14E2-4A9A-BFEC-4BC3F2BB564F](https://gw.alipayobjects.com/zos/OasisHub/09abdf57-84b8-4aa9-b785-822f858fb4f9/070C8B9F-14E2-4A9A-BFEC-4BC3F2BB564F.png)

上图中，spriteMask 对处于 Layer1 和 Layer30 的精灵有遮罩作用，spriteRenderer0 处于 Layer2，所以 spriteRenderer0 不与 spriteMask 起作用，spriteRenderer1 处于 Layer1，和 spriteMask 有相同的遮罩层，所以 spriteRenderer1 与 spriteMask 起作用。
