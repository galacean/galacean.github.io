---
order: 4
title: SpriteMask
type: Graphics
group: 2D
label: Graphics/Mask
---

[SpriteMask](${api}core/SpriteMask) used to realize the masking effect on the sprites in the 3D/2D scene.

<playground src="sprite-mask.ts"></playground>

## Basic usage

1、Download image texture ([Texture](${docs}texture)), Please refer to the download method [resource load](${docs}resource-manager)   
2、Create [Sprite](${docs}sprite)  object through texture  
3、Create [SpriteMask](${api}core/SpriteRenderer)

```typescript
// Create mask entity.
const spriteEntity = rootEntity.createChild(`spriteMask`);
// Add SpriteMask for mask entity.
const spriteMask = spriteEntity.addComponent(SpriteMask);
// Create Sprite object through texture.
const sprite = new Sprite(engine, texture);
// Set the sprite.
spriteMask.sprite = sprite;
// Setting the current mask will affect the sprites in which mask layers.
spriteMask.influenceLayers = SpriteMaskLayer.Layer0;

// Set the mask interaction.
spriteRenderer.maskInteraction = SpriteMaskInteraction.VisibleInsideMask;
// Set which mask layer the sprite is in.
spriteRenderer.maskLayer = SpriteMaskLayer.Layer0;

```

## SpriteMaskLayer

[SpriteMaskLayer](${api}core/SpriteMaskLayer) declares the mask layer provided by the engine, a total of 32 mask layers are declared, namely Layer0~Layer31, the mask layer has nothing to do with rendering, just to help developers set up how to associate `SpriteMask` and `SpriteRenderer`, A prerequisite for a `SpriteMask` object to mask a `SpriteRenderer` object is that the two mask layers overlap.

The `influenceLayers` of `SpriteMask` indicates that the mask will mask the `SpriteRenderer` in which mask layers, and the `maskLayer` of `SpriteRenderer` indicates which mask layers the sprite is in, as follows:

![070C8B9F-14E2-4A9A-BFEC-4BC3F2BB564F](https://gw.alipayobjects.com/zos/OasisHub/09abdf57-84b8-4aa9-b785-822f858fb4f9/070C8B9F-14E2-4A9A-BFEC-4BC3F2BB564F.png)

As shown above, spriteMask has a masking effect on the sprites in `Layer1` and `Layer30`, spriteRenderer0 is in `Layer2`, there is no intersection, so spriteRenderer0 does not work with spriteMask, spriteRenderer1 is in `Layer1`, and spriteMask affects the mask. The overlays have intersections, so spriteRenderer1 and spriteMask work.

## Parameter description

In basic use, we already know how to create a mask, the next step is to control how to interact with [SpriteRenderer](${docs}sprite-renderer#the-usage-of-mask) through the parameters provided by the [SpriteMask](${api}core/SpriteMask).

| parameter | type | description |
| :--- | :--- | :--- |
| influenceLayers | number | The mask layer affected by the current mask, the default value is SpriteMaskLayer.Everything, which means it has an effect on all mask layers |
| alphaCutoff | number | The lower limit of the effective alpha value of the current mask (range: 0~1), that is, the sprite texture whose alpha value is less than alphaCutoff will be discarded |

```typescript
// The sprite of the mask with texture alpha less than 0.5 will be discarded.
spriteMask.alphaCutoff = 0.5;
// Mask is effective for all the sprites of the mask layer
spriteMask.influenceLayers = SpriteMaskLayer.Everything;
// Mask is only valid for the sprites in the mask layer Layer0.
spriteMask.influenceLayers = SpriteMaskLayer.Layer0;
// Mask is valid for the sprites in the mask layer Layer0 and Layer1.
spriteMask.influenceLayers = SpriteMaskLayer.Layer0 | SpriteMaskLayer.Layer1;
```

