# 图片显示

[SpriteRenderer](${book.api}classes/core.spriterenderer.html) 组件用于在 3D/2D 场景中显示图片。完整使用示例见 [playgournd](https://oasisengine.cn/0.3/playground/#/sprite-renderer)

## 基本使用

1、下载图片纹理([Texture](${book.manual}resource/texture.md))，下载方法请参考[资源加载](${book.manual}resource/resource-manager.md)    
2、通过 texture 创建 [Sprite](${book.manual}resource/sprite.md) 对象    
3、创建 [SpriteRenderer](${book.api}classes/core.2d.spriterenderer.html) 组件显示图片

```typescript
import {
  AssetType,
  Camera,
  Script,
  Sprite,
  SpriteRenderer,
  SystemInfo,
  Texture2D,
  Vector3,
  WebGLEngine
} from "oasis-engine";

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

除了基本的图片显示，SpriteRenderer 还支持图片的翻转，只需要通过设置属性 flipX/flipY 即可完成翻转，如下：

```typescript
import {
  AssetType,
  Camera,
  Script,
  Sprite,
  SpriteRenderer,
  SystemInfo,
  Texture2D,
  Vector3,
  WebGLEngine
} from "oasis-engine";

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
    // 翻转图片
    spriteRenderer.flipX = true;
    spriteRenderer.flipY = true;
  });
```

## 设置颜色

可以通过设置 color 属性来调整颜色，从而实现一些淡入淡出的效果，如下：

```typescript
import {
  AssetType,
  Camera,
  Script,
  Sprite,
  SpriteRenderer,
  SystemInfo,
  Texture2D,
  Vector3,
  WebGLEngine
} from "oasis-engine";

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
    // 设置为红色
    spriteRenderer.color.setValue(1, 0, 0, 1);
  });
```