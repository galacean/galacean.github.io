# 图片显示

有时候需要在3D空间中显示图片，并控制图片淡入淡出等属性。使用 [SpriteRenderer](${book.api}classes/core.spriterenderer.html) 组件可以轻松实现这些功能。

## 基本使用

首先，需要先下载图片纹理（[Texture](${book.manual}resource/texture.md)），下载方法请参考[资源加载](${book.manual}resource/resource-manager.md)。


然后，通过 [SpriteRenderer](${book.api}classes/core.spriterenderer.html) 组件 将图片绘制到3D空间。代码如下：


```typescript
import { SpriteRenderer } from 'oasis-engine';

const texture2D = await this.engine.resourceManager.load("test.png");
const spriteNode = rootNode.createChild('sprite');
const spriteRenderer = spriteNode.addComponent(SpriteRenderer);
spriteRenderer.texture = texture2D;
```

可以通过SpriteRenderer.tintColor属性来调整颜色，实现淡入淡出效果。

```typescript
spriteRenderer.tintColor = new Vector4(1.0, 1.0, 1.0, 0.5);
```
