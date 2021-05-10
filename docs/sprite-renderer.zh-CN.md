---
order: 8
title: 精灵渲染器
type: 组件
---

[SpriteRenderer](${api}core/SpriteRenderer) 组件用于在 3D/2D 场景中显示图片。

<playground src="sprite-renderer.ts"></playground>

## 基本使用

1、下载图片纹理([Texture](${docs}texture-cn))，下载方法请参考[资源加载](${docs}resource-manager-cn)    
2、通过 texture 创建 [Sprite](${docs}sprite-cn) 对象    
3、创建 [SpriteRenderer](${api}core/SpriteRenderer) 组件显示图片

```typescript
import { AssetType, Camera, Script, Sprite, SpriteRenderer, SystemInfo, Texture2D, Vector3, WebGLEngine } from "oasis-engine";

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

## 图片翻转

除了基本的图片显示，SpriteRenderer 还支持图片的翻转，只需要通过设置属性 [flipX](${api}core/SpriteRenderer#flipX)/[flipY](${api}core/SpriteRenderer#flipY) 即可完成翻转，如下：

```typescript
// 翻转图片
spriteRenderer.flipX = true;
spriteRenderer.flipY = true;
```
<playground src="sprite-flip.ts"></playground>

## 设置颜色

可以通过设置 [color](${api}core/SpriteRenderer#color) 属性来调整颜色，从而实现一些淡入淡出的效果，如下：

```typescript
spriteRenderer.color.setValue(1, 0, 0, 1);
```

<playground src="sprite-color.ts"></playground>

## 自定义材质

SpriteRenderer 的自定义材质的使用方法和 [MeshRenderer](${docs}mesh-renderer-cn) 的一样，请参考[自定义材质](${docs}custom-material-cn)文档。

<playground src="sprite-material.ts"></playground>