---
order: 1
title: 精灵渲染器
type: 图形
group: 2D
label: Graphics/2D
---

[SpriteRenderer](${api}core/SpriteRenderer) 组件用于在 3D/2D 场景中显示图片。

<playground src="sprite-renderer.ts"></playground>

## 属性说明

| 属性名 | 属性类型 | 描述 |
| :--- | :--- | :--- |
|[sprite](${api}core/SpriteRenderer/#sprite)|[Sprite](${api}core/Sprite)|使用精灵的引用|
|[drawMode](${api}core/SpriteRenderer/#drawMode)|[SpriteDrawMode](${api}core/SpriteDrawMode)|绘制模式（普通绘制，九宫绘制）|
|[width](${api}core/SpriteRenderer/#width)|number|渲染的精灵最后在三维空间中呈现的宽度|
|[height](${api}core/SpriteRenderer/#height)|number|渲染的精灵最后在三维空间中呈现的高度|
|[color](${api}core/SpriteRenderer/#color)|[Color](${api}math/Color)|渲染叠加的颜色|
|[flipX](${api}core/SpriteRenderer/#flipX)|boolean|是否对渲染结果做水平翻转|
|[flipY](${api}core/SpriteRenderer/#flipY)|boolean|是否对渲染结果做垂直翻转|
|[maskLayer](${api}core/SpriteRenderer/#maskLayer)|[SpriteMaskLayer](${api}core/SpriteMaskLayer)|精灵渲染器属于哪个遮罩层|
|[maskInteraction](${api}core/SpriteRenderer/#maskInteraction)|[SpriteMaskInteraction](${api}core/SpriteMaskInteraction)|遮罩的类型|
[priority](${api}core/SpriteRenderer/#priority)|number|渲染器的渲染优先级，值较低的先渲染，值较高的最后渲染|


## 基本使用

1、下载图片纹理([Texture](${docs}texture-cn))，下载方法请参考[资源加载](${docs}resource-manager-cn)  
2、通过 texture 创建 [Sprite](${docs}sprite-cn) 对象  
3、创建 [SpriteRenderer](${api}core/SpriteRenderer) 组件显示图片

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
    // 给实体添加 SpriteRenderer 组件
    const spriteRenderer = spriteEntity.addComponent(SpriteRenderer);
    // 通过 texture 创建 sprite 对象
    const sprite = new Sprite(engine, texture);
    // 设置 sprite
    spriteRenderer.sprite = sprite;
  });
```

注意：精灵渲染器默认在节点局部坐标系中的 XoY 平面上放置这个面片。

![avatar](https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*_5fjTp0r2KEAAAAAAAAAAAAAARQnAQ)

## 绘制模式

精灵渲染器目前提供两种绘制模式，分别是普通绘制与九宫绘制（默认为普通绘制），在不同的绘制模式下，修改绘制宽高可以直观地感受到两种绘制模式的差异，如下：

```typescript
// 绘制模式
spriteRenderer.drawMode = SpriteDrawMode.Sliced;
sprite.border = new Vector4(0.1, 0.1, 0.1, 0.1);
```

<playground src="sprite-drawMode.ts"></playground>

## 渲染尺寸

设置 `SpriteRenderer` 的 `width` 与 `height` 可以明确指定精灵在三维空间中显示的尺寸，若没有设置，则会将 `Sprite` 的尺寸作为默认值，通常为精灵纹理像素值的 `0.01` 倍。

<playground src="sprite-size.ts"></playground>

## 翻转

除了基本的图片显示，SpriteRenderer 还支持水平与垂直翻转，只需要通过设置属性 [flipX](${api}core/SpriteRenderer#flipX)/[flipY](${api}core/SpriteRenderer#flipY) 即可完成翻转，如下：

```typescript
// 翻转图片
spriteRenderer.flipX = true;
spriteRenderer.flipY = true;
```

<playground src="sprite-flip.ts"></playground>

## 设置颜色

可以通过设置 [color](${api}core/SpriteRenderer#color) 属性来调整颜色，从而实现一些淡入淡出的效果，如下：

```typescript
spriteRenderer.color.set(1, 0, 0, 1);
```

<playground src="sprite-color.ts"></playground>

## 自定义材质

SpriteRenderer 的自定义材质的使用方法和 [MeshRenderer](${docs}mesh-renderer-cn) 的一样，请参考[自定义材质](${docs}custom-material-cn)文档。

<playground src="sprite-material-blur.ts"></playground>

## 使用遮罩

从 0.4 版本开始，引擎加入了 [SpriteMask](${docs}sprite-mask-cn) 组件，SpriteRenderer 和 SpriteMask 配合使用，可以实现精灵的各种遮挡效果。可以通过以下代码打开精灵的遮罩功能：

```typescript
// 设置遮罩类型
spriteRenderer.maskInteraction = SpriteMaskInteraction.VisibleInsideMask;
// 设置精灵处于哪个遮罩层
spriteRenderer.maskLayer = SpriteMaskLayer.Layer0;
```

[SpriteMaskInteraction](${api}core/SpriteMaskInteraction) 里面声明了精灵的遮罩类型，[SpriteMaskLayer](${api}core/SpriteMaskLayer) 里面声明了所有的遮罩层，这个在 SpriteMask 中也需要用到。

<playground src="sprite-mask.ts"></playground>
