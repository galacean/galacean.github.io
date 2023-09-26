---
order: 1
title: SpriteRenderer
type: Graphics
group: 2D
label: Graphics/2D
---

[SpriteRenderer](${api}core/SpriteRenderer) Used to display images in 3D/2D scenes.

<playground src="sprite-renderer.ts"></playground>

## Parameter description

| parameter | type | description |
| :--- | :--- | :--- |
|[sprite](${api}core/SpriteRenderer/#sprite)|[Sprite](${api}core/Sprite)|Use sprite references|
|[drawMode](${api}core/SpriteRenderer/#drawMode)|[SpriteDrawMode](${api}core/SpriteDrawMode)|The draw mode of the sprite renderer|
|[width](${api}core/SpriteRenderer/#width)|number|The rendering width of the sprite|
|[height](${api}core/SpriteRenderer/#height)|number|The rendering height of the sprite|
|[color](${api}core/SpriteRenderer/#color)|[Color](${api}math/Color)|Render the color of the overlay|
|[flipX](${api}core/SpriteRenderer/#flipX)|boolean|Whether to flip the rendering result horizontally|
|[flipY](${api}core/SpriteRenderer/#flipY)|boolean|Whether to flip the rendering result vertically|
|[maskLayer](${api}core/SpriteRenderer/#maskLayer)|[SpriteMaskLayer](${api}core/SpriteMaskLayer)|The mask layer the sprite renderer belongs to|
|[maskInteraction](${api}core/SpriteRenderer/#maskInteraction)|[SpriteMaskInteraction](${api}core/SpriteMaskInteraction)|Interacts with the masks|
[priority](${api}core/SpriteRenderer/#priority)|number|The render priority of the renderer, lower values are rendered first and higher values are rendered last|

## Basic usage

1、Download image texture ([Texture](${docs}texture)), Please refer to the download method [resource load](${docs}resource-manager)  
2、Create [Sprite](${docs}sprite) object through texture  
3、Create [SpriteRenderer](${api}core/SpriteRenderer) to display image

```typescript
import { AssetType, Camera, Script, Sprite, SpriteRenderer, Texture2D, Vector3, WebGLEngine } from "@galacean/engine";

const engine = await WebGLEngine.create({ canvas: "canvas" });

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
    spriteRenderer.width = 5;
    spriteRenderer.height = 5;
  });
```

Note: The sprite renderer places this patch on the XoY plane in the node's local coordinate system by default.

![avatar](https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*_5fjTp0r2KEAAAAAAAAAAAAAARQnAQ)

## Draw Mode

The sprite renderer currently provides two drawing modes, namely `Simple` and `Slice` (the default is normal drawing). In different drawing modes, you can intuitively feel the difference between the two drawing modes by modifying the drawing width and height, as follows:

```typescript
// Draw mode.
spriteRenderer.drawMode = SpriteDrawMode.Sliced;
sprite.border = new Vector4(0.1, 0.1, 0.1, 0.1);
```

<playground src="sprite-drawMode.ts"></playground>

## Renderer Size

设置 `SpriteRenderer` 的 `width` 与 `height` 可以明确指定精灵在三维空间中显示的尺寸，若没有设置，则会将 `Sprite` 的尺寸作为默认值，通常为精灵纹理像素值的 `0.01` 倍。

Setting the `width` and `height` of the `SpriteRenderer` can clearly specify the size of the sprite displayed in the three-dimensional space. If not set, the size of the `Sprite` will be used as the default value, which is usually `0.01` times the pixel value of the sprite texture.


<playground src="sprite-size.ts"></playground>

## Flip

In addition to basic image display, SpriteRenderer also support horizontal and vertical flip, just set the attribute [flipX](${api}core/SpriteRenderer#flipX) or [flipY](${api}core/SpriteRenderer#flipY) to complete the flip, as follows:

```typescript
// Image flip.
spriteRenderer.flipX = true;
spriteRenderer.flipY = true;
```

<playground src="sprite-flip.ts"></playground>

## Set color

We can adjust the color by setting the [color](${api}core/SpriteRenderer#color) property to achieve some fade-in and fade-out effects, as follows:

```typescript
spriteRenderer.color.set(1, 0, 0, 1);
```

<playground src="sprite-color.ts"></playground>

## Custom material

The custom material of SpriteRenderer is used in the same way as the [MeshRenderer](${docs}mesh-renderer), Please refer to [Custom Material](${docs}custom-material) document.

<playground src="sprite-material-blur.ts"></playground>

## The usage of mask

Starting from version 0.4, the engine has added [SpriteMask](${docs}sprite-mask), Use SpriteRenderer and SpriteMask together, various occlusion effects of elves can be realized. The mask function of the sprite can be turned on by the following code:

```typescript
// Set the tpye of mask interaction.
spriteRenderer.maskInteraction = SpriteMaskInteraction.VisibleInsideMask;
// Set which mask layer the sprite is in.
spriteRenderer.maskLayer = SpriteMaskLayer.Layer0;
```

[SpriteMaskInteraction](${api}core/SpriteMaskInteraction) declare the mask interaction of the sprite, [SpriteMaskLayer](${api}core/SpriteMaskLayer) declare all mask layers, This is also needed in SpriteMask.

<playground src="sprite-mask.ts"></playground>
