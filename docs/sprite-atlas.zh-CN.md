---
order: 2.1
title: 精灵图集
type: 资源
---

[SpriteAtlas](${api}core/SpriteAtlas) 也就是常说的图集，顾名思义就是一系列散图的合集，好好利用它可以带来 `一次上传批量绘制` 和 `节约内存` 等好处，下方示例将散图全部打包至一张大图集中，最终绘制只消耗一次 drawcall 。

<playground src="sprite-atlas.ts"></playground>

## 图集生成

图集的生成已经集成进 Oasis 的工作流，请按照以下步骤生成图集：

1. 安装包

```bash
npm i @oasis-engine/tool-atlas -g
```

2. 执行打包命令

```bash
oasis-tool-atlas p inputPath -o outputName
```

其中 `inputPath` 表示需要打包的文件夹路径，而 `outputName` 则表示打包输出的图集文件名，如果你得到下图所示结果，那么说明打包成功了。

<img src="https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*UhLBRpt9SwAAAAAAAAAAAAAAARQnAQ" alt="image.png" style="zoom:75%;" />

| 属性           | 解释                                         |
| -------------- | -------------------------------------------- |
| f/format       | 打包输出的图集格式 (默认: "oasis")           |
| o/output       | 打包输出的图集文件名 (默认: "oasis")         |
| a/algorithm    | 打包图集的算法 (默认: "maxrects")            |
| ar/allowRotate | 打包图集是否支持旋转 (默认: false)           |
| p/padding      | 图集中每个散图和这个散图边框的距离 (默认: 1) |
| mw/maxWidth    | 最后打包出的大图的最大宽度 (默认: 1024)      |
| mh/maxHeight   | 最后打包出的大图的最大高度 (默认: 1024)      |
| s/square       | 强制打包成正方形 (默认: false)               |
| pot            | 宽高强制打包成 2 的幂 (默认: false)          |

更多请参照[图集打包工具](https://github.com/oasis-engine/tool-atlas/edit/main/README.md)。

## 基本使用

在打包完图集后，

1. 上传图集图片和图集文件至远端，此处需要保证图集文件中 img 的地址和实际的图集图片地址一致。

<img src="https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*gB6MTKuSvqsAAAAAAAAAAAAAARQnAQ" alt="image.png" style="zoom:75%;" />

上图使用了相对路径的方式确定图集图片的远端位置，因此按照上图所示最终的文件和图片的地址必定为 `https://******/oasis.atlas` 和 `https://******/oasis.png` ，当然也可以采取绝对路径的方式，只需要修改 img 如下图所示即可。

<img src="https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*H1NYQ7yopnsAAAAAAAAAAAAAARQnAQ" alt="image.png" style="zoom:75%;" />

2. 加载与使用

```typescript
engine.resourceManager
  .load<SpriteAtlas>({
    url: "https://******.atlas",
    type: AssetType.SpriteAtlas
  })
  .then((atlas) => {
    // Get all sprites.
    const allSprites = atlas.sprites;
    // Get sprite by spriteName.
    atlas.getSprite("spriteName");
    // If multiple sprites have the same name, we can get all like this.
    const allSpritesWithSameName = atlas.getSprite("spriteName", []);
  });
```

## 最佳实践

在考虑图集的最佳实践时，需要提前了解图集有什么优势与不足：

优势：

1. 图集可以一次上传，批量绘制，大大减少 drawcall ；
2. 通过裁剪的打包方式可以大大减少内存空间的浪费；
3. 在控制好加载时机后，可以大大提升展示的体验；

可能的不足：

1. 图集中的精灵利用率低；
2. 图集文件过大导致加载较慢；
3. 清理图集资源时较为麻烦（有一个精灵在使用时便无法清理）；
4. 散图数目过大可能导致图集打包成两份，反而导致绘制性能变差；

因此在考虑图集打包时，我们并不能一股脑将所有的散图都打包进一张图集，应该尽量遵循以下原则：

1. 根据使用场景进行打包，如一个动画中的所有资源；
2. 根据所属模块进行打包，如一个抽奖模块中的所有资源；
3. 根据同一个显示风格进行打包，如 GUI 中使用的所有资源；
4. 根据渲染的顺序进行打包，如在 runtime 中，将文字抽至最上层后可以将其打包进一张大的文字图集，以减少 drawcall ；

以上，只要在利用图集时尽量物尽其用且避免可能的不足，图集将会为你的项目带来巨大的性能提升。
