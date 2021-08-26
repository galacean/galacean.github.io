---
order: 8
title: SpriteRenderer
type: Component
---

[SpriteRenderer](${api}core/SpriteRenderer) Used to display images in 3D/2D scenes.

<playground src="sprite-renderer.ts"></playground>

## Basic usage

1、Download image texture ([Texture](${docs}texture-cn)), Please refer to the download method [resource load](${docs}resource-manager-cn)  
2、Create [Sprite](${docs}sprite-cn)  object through texture  
3、Create [SpriteRenderer](${api}core/SpriteRenderer) to display image

```typescript
import { AssetType, Camera, Script, Sprite, SpriteRenderer, Texture2D, Vector3, WebGLEngine } from "oasis-engine";

engine.resourceManager
  .load<Texture2D>({
    url: "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*d3N9RYpcKncAAAAAAAAAAAAAARQnAQ",
    type: AssetType.Texture2D
  })
  .then((texture) => {
    const spriteEntity = rootEntity.createChild(`sprite`);
    // Add SpriteRenderer for entity.
    const spriteRenderer = spriteEntity.addComponent(SpriteRenderer);
    // Create Sprite object through texture.
    const sprite = new Sprite(engine, texture);
    // Set the sprite.
    spriteRenderer.sprite = sprite;
  });
```

## Image flip

In addition to basic image display, SpriteRenderer also supports image flipping,just set the attribute [flipX](${api}core/SpriteRenderer#flipX) or [flipY](${api}core/SpriteRenderer#flipY) to complete the flip, as follows:

```typescript
// Image flip.
spriteRenderer.flipX = true;
spriteRenderer.flipY = true;
```
<playground src="sprite-flip.ts"></playground>

## Set color

We can adjust the color by setting the [color](${api}core/SpriteRenderer#color) property to achieve some fade-in and fade-out effects, as follows:


```typescript
spriteRenderer.color.setValue(1, 0, 0, 1);
```

<playground src="sprite-color.ts"></playground>

## Custom material

The custom material of SpriteRenderer is used in the same way as the [MeshRenderer](${docs}mesh-renderer-cn), Please refer to [Custom Material](${docs}custom-material-cn) document.

<playground src="sprite-material-blur.ts"></playground>

## The usage of mask

Starting from version 0.4, the engine has added [SpriteMask](${docs}sprite-mask-cn), Use SpriteRenderer and SpriteMask together, various occlusion effects of elves can be realized. The mask function of the sprite can be turned on by the following code:

```typescript
// Set the tpye of mask interaction.
spriteRenderer.maskInteraction = SpriteMaskInteraction.VisibleInsideMask;
// Set which mask layer the sprite is in.
spriteRenderer.maskLayer = SpriteMaskLayer.Layer0;
```

[SpriteMaskInteraction](${api}core/SpriteMaskInteraction) declare the mask interaction of the sprite, [SpriteMaskLayer](${api}core/SpriteMaskLayer) declare all mask layers, This is also needed in SpriteMask.

<playground src="sprite-mask.ts"></playground>