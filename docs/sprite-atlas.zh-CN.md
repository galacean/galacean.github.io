---
order: 2.1
title: 精灵图集资源
type: 资源系统
---

[SpriteAtlas](${api}core/SpriteAtlas) 是一种精灵集合资源，通过将多个精灵纹理打包成一张精灵图集从而在绘制时合并绘制指令，它拥有以下优势：

- 更好的性能（合并绘制指令）；
- 更少的显存（打包算法降低纹理尺寸）；
- 更少的请求次数（通过减少碎片文件来减少加载的请求次数）；

下图精灵图集例子里每帧只调用了一次绘制指令：

<playground src="sprite-atlas.ts"></playground>

## 图集生成

Oasis 为精灵图集提供了命令行工具，开发者可以按照以下步骤生成图集：

1. 安装包

```bash
npm i @oasis-engine/tool-atlas -g
```

2. 执行打包命令

```bash
oasis-tool-atlas p inputPath -o outputName
```

其中 `inputPath` 表示需要打包的文件夹路径，而 `outputName` 则表示打包输出的精灵图集文件名，如果你得到下图所示结果，那么说明打包成功了。

<img src="https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*UhLBRpt9SwAAAAAAAAAAAAAAARQnAQ" alt="image.png" style="zoom:75%;" />

| 属性           | 解释                                         |
| -------------- | -------------------------------------------- |
| f/format       | 打包输出的精灵图集格式 (默认: "oasis")       |
| o/output       | 打包输出的精灵图集文件名 (默认: "oasis")     |
| a/algorithm    | 打包精灵图集的算法 (默认: "maxrects")        |
| ar/allowRotate | 打包精灵图集是否支持旋转 (默认: false)       |
| p/padding      | 图集中每个精灵和这个精灵边框的距离 (默认: 1) |
| mw/maxWidth    | 最后打包出的精灵图集的最大宽度 (默认: 1024)  |
| mh/maxHeight   | 最后打包出的精灵图集的最大高度 (默认: 1024)  |
| s/square       | 强制打包成正方形 (默认: false)               |
| pot            | 宽高强制打包成 2 的幂 (默认: false)          |

更多请参照[图集打包工具](https://github.com/oasis-engine/tool-atlas/edit/main/README.md)。

## 基本使用

1. 上传图集图片和图集文件至 CDN 同一目录下，例如文件和图片的地址应分别为 `https://*cdnDir*/*atlasName*.atlas` 和 `https://*cdnDir*/*atlasName*.png`。

2. 加载与使用

```typescript
engine.resourceManager
  .load<SpriteAtlas>({
    url: "https://*cdnDir*/*atlasName*.atlas",
    type: AssetType.SpriteAtlas
  })
  .then((atlas) => {
    // Get all sprites.
    const allSprites = atlas.sprites;
    // Get sprite by spriteName.
    atlas.getSprite("spriteName");
    // If multiple sprites have the same name, we can get all like this.
    const allSpritesWithSameName = atlas.getSprites("spriteName", []);
  });
```

## 注意事项

1. 请将绘制时序相连的精灵打包进同一图集，可显著提升性能（降低绘制指令的调用次数）；
2. 清理精灵图集时，需要确保图集内的所有精灵都已不使用；
3. 打包精灵图集是需要统筹精灵数目与尺寸，避免一次打包生成多张精灵图集；
