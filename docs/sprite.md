---
order: 2
title: Sprite
type: Graphics
group: 2D
label: Graphics/2D
---

[Sprite](${api}core/Sprite) is a 2D graphic object used for characters, props, bullets and some other 2D game elements. These graphics are obtained from [Texture2D](${docs}texture). The [Sprite](${api}core/Sprite) class mainly identifies the part of the image applied to a specific Sprite. Then the [SpriteRenderer](${docs}sprite-renderer) component on [Entity](${docs}entity) can use this information to actually display the graphics.

## Parameter description

| parameter | type | description |
| :--- | :--- | :--- |
|[texture](${api}core/Sprite#texture)|[Texture2D](${api}core/Texture2D)|Use texture references|
|[region](${api}core/Sprite#region)|[Rect](${api}math/Rect)|The position of the sprite on the original texture, the range is 0～1|
|[pivot](${api}core/Sprite#pivot)|[Vector2](${api}math/Vector2)|The position of the center point of the sprite in the region on the original texture, the range is 0～1|
|[border](${api}core/Sprite#border)|[Vector4](${api}math/Vector4)|When the draw mode of the renderer is `Slice` , the boundary configuration will affect the final rendering effect|

## The relationship between texture、pivot、region
region determines the display content of the sprite, we can select a rectangular area in the texture to display, and the excess part will be automatically filtered out，as follows:

![avatar](https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*ABvvTJnUgpsAAAAAAAAAAAAAARQnAQ)

pivot represents the position of the center of the wizard in the region, as follows:

![avatar](https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*6RyQTpqE4dMAAAAAAAAAAAAAARQnAQ)

## Sprite usage

### Create a default sprite, as follows
```typescript
const sprite = new Sprite(engine);
```
### Set texture
```typescript
engine.resourceManager
  .load<Texture2D>({
    url: "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*ArCHTbfVPXUAAAAAAAAAAAAAARQnAQ",
    type: AssetType.Texture2D
  }).then((texture)=>{
    sprite.texture = texture;
  });
```
### Set pivot
```typescript
sprite.pivot = new Vector2(0.5, 0.5);
```
For pivot, the bottom left corner of the texture is (0, 0), the X axis goes from left to right, and the Y axis goes from bottom to top.
### Set region，let's take the left half of the texture as an example, as follows:
```typescript
sprite.region = new Rect(0, 0, 0.5, 1);
```
When we get the texture content through region, the upper left corner of the texture is (0, 0), the X axis goes from left to right, and the Y axis goes from top to bottom. And when region.x + region.width> 1, region.width will be automatically modified to ensure region.x + region.width <= 1, region.y and region.height are the same.

### Set border

<playground src="sprite-drawMode.ts"></playground>