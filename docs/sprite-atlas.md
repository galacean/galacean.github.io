---
order: 2.1
title: Sprite Atlas
type: Graphics Rendering
group: 2D Rendering
---

[SpriteAtlas](${api}core/SpriteAtlas) is a collection of sprite resources. By packaging multiple sprite textures into a sprite atlas to combine drawing commands when drawing, it has the following advantages:

- Better performance (combined drawing instructions);
- Less video memory (packing algorithm reduces texture size);
- Fewer requests (reducing the number of requests for loading by reducing fragmented files);

In the sprite atlas example in the figure below, the drawing command is called only once per frame:

<playground src="sprite-atlas.ts"></playground>

## Generate sprite atlas

Oasis provides a command line tool for the sprite atlas. Developers can follow the steps below to generate the atlas:

1. Install

```bash
npm i @oasis-engine/tool-atlas -g
```

2. Execute command line

```bash
oasis-tool-atlas p inputPath -o outputName
```

Among them, `inputPath` represents the folder path to be packaged, and `outputName` represents the file name of the sprite atlas for packaged output. If you get the result shown in the figure below, then the package is successful.

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

For more information, please refer to [Atlas Packaging Tool](https://github.com/oasis-engine/tool-atlas/edit/main/README.md).

## Instructions for use

1. Upload atlas pictures and atlas files to the same CDN directory, for example, the addresses of the files and pictures should be `https://*cdnDir*/*atlasName*.atlas` and `https://*cdnDir*/*atlasName respectively *.png`.

2. Load and use

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

## Precautions

1. Please pack the sprites connected in the drawing sequence into the same atlas, which can significantly improve performance (reduce the number of calls to drawing commands);
2. When cleaning up the sprite atlas, you need to make sure that all the sprites in the atlas are not used;
3. Packing the sprite atlas requires coordinating the number and size of the sprites to avoid generating multiple sprite atlases in one package;
