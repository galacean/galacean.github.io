---
order: 0
title: 精灵
type: 图形
group: 2D
label: Graphics/2D
---

[Sprite](${api}core/Sprite) 是 2D 图形对象，用于角色、道具、子弹以及一些其他 2D 游戏要素。这些图形是从 [Texture2D](${docs}texture-cn) 获得的。[Sprite](${api}core/Sprite) 类主要标识应用于特定 `Sprite` 的图像部分。然后 [Entity](${docs}entity-cn) 上的  [SpriteRenderer](${docs}sprite-renderer-cn) 组件可以使用此信息来实际显示图形，[Entity](${docs}entity-cn) 上的 [SpriteMask](${docs}sprite-mask-cn) 组件可以使用此信息来表示遮罩区域。详见 [精灵资源](${docs}sprite-cn)。

| 属性名 | 属性类型 | 描述 |
| :--- | :--- | :--- |
|[texture](${api}core/Sprite#texture)|[Texture2D](${api}core/Texture2D)|使用纹理的引用|
|[region](${api}core/Sprite#region)|[Rect](${api}math/Rect)|精灵在原始纹理上的位置，范围 0～1|
|[pivot](${api}core/Sprite#pivot)|[Vector2](${api}math/Vector2)|精灵中心点在原始纹理上的region中的位置，范围 0～1|
|[border](${api}core/Sprite#border)|[Vector4](${api}math/Vector4)|渲染器的绘制模式为九宫绘制时，边界配置会影响最终的渲染效果|

region 决定精灵的显示内容，可以在纹理中选择一个矩形区域进行显示，超出部分会自动过滤掉，如下：

<img src="https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*ABvvTJnUgpsAAAAAAAAAAAAAARQnAQ" alt="avatar" style="zoom:50%;" />

pivot 代表精灵中心在 region 中的位置，如下：

<img src="https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*6RyQTpqE4dMAAAAAAAAAAAAAARQnAQ" alt="avatar" style="zoom:50%;" />

## 编辑器使用

### 加载精灵资源

在编辑器中加载一个精灵资源只需要点击加载 Sprite 资源并选择本地一张图片即可，如下所示：

![sprite-create](https://mdn.alipayobjects.com/huamei_w6ifet/afts/img/A*a75JT7WLYGoAAAAAAAAAAAAADjCHAQ/original)

### 设置 pivot

对于 pivot 来说，纹理左下角为 `(0, 0)`，X 轴从左到右，Y 轴从下到上。在编辑器中，内置了一些常用的 pivot 快捷方式，如下：

![sprite-pivot](https://mdn.alipayobjects.com/huamei_w6ifet/afts/img/A*ZKFJR5LdJA0AAAAAAAAAAAAADjCHAQ/original)

如果内置的 pivot 无法满足需求，可以自定义自己的 pivot，如下：

![sprite-pivot](https://mdn.alipayobjects.com/huamei_w6ifet/afts/img/A*tuZ7QJEl_wsAAAAAAAAAAAAADjCHAQ/original)

### 设置 region

通过设置 region 可以控制显示图片的区域，如下：

![sprite-region](https://mdn.alipayobjects.com/huamei_w6ifet/afts/img/A*3lKORLoWYJMAAAAAAAAAAAAADjCHAQ/original)

### 添加精灵组件

[SpriteRenderer](${api}core/SpriteRenderer) 组件用于在 3D/2D 场景中显示图片。

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


### 添加精灵组件并且设置精灵资源

需要显示图片的时候，需要先给一个实体添加精灵组件，然后设置精灵资源，如下：

![sprite-renderer-create](https://mdn.alipayobjects.com/huamei_w6ifet/afts/img/A*adizTpp_l5cAAAAAAAAAAAAADjCHAQ/original)

### 图片翻转

除了基本的图片显示，`SpriteRenderer` 还支持图片的翻转，只需要通过设置属性 `flipX/flipY` 即可完成翻转，如下：

![sprite-renderer-flip](https://mdn.alipayobjects.com/huamei_w6ifet/afts/img/A*sK6tTJELnP0AAAAAAAAAAAAADjCHAQ/original)

### 设置颜色

可以通过设置 `color` 属性来调整颜色，从而实现一些淡入淡出的效果，如下：

![sprite-renderer-color](https://mdn.alipayobjects.com/huamei_w6ifet/afts/img/A*5pRRSLLGfq8AAAAAAAAAAAAADjCHAQ/original)

### 使用遮罩

`SpriteRenderer` 和 `SpriteMask` 配合使用，可以实现精灵的各种遮挡效果。`SpriteMask` 组件在编辑器中的使用详见 [SpriteMask在编辑器中如何使用](${docs}editor-sprite-mask-cn)。使用遮罩，需要设置 `mask interaction`（遮罩类型）和 `mask layer`（精灵所属遮罩层) 两个字段：

![sprite-renderer-mask-prop](https://mdn.alipayobjects.com/huamei_w6ifet/afts/img/A*O0BtQpE83GkAAAAAAAAAAAAADjCHAQ/original)



在编辑器中，可以通过设置以上两个字段来看看具体效果：

![sprite-renderer-mask](https://mdn.alipayobjects.com/huamei_w6ifet/afts/img/A*PewLQaWiLhoAAAAAAAAAAAAADjCHAQ/original)


## 脚本使用

### 使用 Sprite

```typescript
const sprite = new Sprite(engine);
```

#### 设置纹理

```typescript
engine.resourceManager
  .load<Texture2D>({
    url: "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*ArCHTbfVPXUAAAAAAAAAAAAAARQnAQ",
    type: AssetType.Texture2D
  }).then((texture)=>{
    sprite.texture = texture;
  });
```

#### 设置 pivot

```typescript
sprite.pivot = new Vector2(0.5, 0.5);
```

对于 pivot 来说，纹理左下角为 (0, 0)，X 轴从左到右，Y 轴从下到上

#### 设置 region

我们以取纹理左半边为例，如下：

```typescript
sprite.region = new Rect(0, 0, 0.5, 1);
```

我们通过 region 获取纹理内容时，纹理左上角为 (0, 0)，X 轴从左到右，Y 轴从上到下。并且当 region.x + region.width > 1， region.width 会自动修改，保证 region.x + region.width <= 1，region.y 和 region.height 同理。

#### 设置 border

<playground src="sprite-drawMode.ts"></playground>


### 使用 SpriteRenderer

<playground src="sprite-renderer.ts"></playground>

#### 基本使用

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

<img src="https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*_5fjTp0r2KEAAAAAAAAAAAAAARQnAQ" alt="avatar" style="zoom:50%;" />

#### 绘制模式

精灵渲染器目前提供两种绘制模式，分别是普通绘制与九宫绘制（默认为普通绘制），在不同的绘制模式下，修改绘制宽高可以直观地感受到两种绘制模式的差异，如下：

```typescript
// 绘制模式
spriteRenderer.drawMode = SpriteDrawMode.Sliced;
sprite.border = new Vector4(0.1, 0.1, 0.1, 0.1);
```

<playground src="sprite-drawMode.ts"></playground>

#### 渲染尺寸

设置 `SpriteRenderer` 的 `width` 与 `height` 可以明确指定精灵在三维空间中显示的尺寸，若没有设置，则会将 `Sprite` 的尺寸作为默认值，通常为精灵纹理像素值的 `0.01` 倍。

<playground src="sprite-size.ts"></playground>

#### 翻转

除了基本的图片显示，SpriteRenderer 还支持水平与垂直翻转，只需要通过设置属性 [flipX](${api}core/SpriteRenderer#flipX)/[flipY](${api}core/SpriteRenderer#flipY) 即可完成翻转，如下：

```typescript
// 翻转图片
spriteRenderer.flipX = true;
spriteRenderer.flipY = true;
```

<playground src="sprite-flip.ts"></playground>

#### 设置颜色

可以通过设置 [color](${api}core/SpriteRenderer#color) 属性来调整颜色，从而实现一些淡入淡出的效果，如下：

```typescript
spriteRenderer.color.set(1, 0, 0, 1);
```

<playground src="sprite-color.ts"></playground>

#### 自定义材质

SpriteRenderer 的自定义材质的使用方法和 [MeshRenderer](${docs}mesh-renderer-cn) 的一样，请参考[自定义材质](${docs}custom-material-cn)文档。

<playground src="sprite-material-blur.ts"></playground>

#### 使用遮罩

SpriteRenderer 和 SpriteMask 配合使用，可以实现精灵的各种遮挡效果。可以通过以下代码打开精灵的遮罩功能：

```typescript
// 设置遮罩类型
spriteRenderer.maskInteraction = SpriteMaskInteraction.VisibleInsideMask;
// 设置精灵处于哪个遮罩层
spriteRenderer.maskLayer = SpriteMaskLayer.Layer0;
```

[SpriteMaskInteraction](${api}core/SpriteMaskInteraction) 里面声明了精灵的遮罩类型，[SpriteMaskLayer](${api}core/SpriteMaskLayer) 里面声明了所有的遮罩层，这个在 SpriteMask 中也需要用到。

<playground src="sprite-mask.ts"></playground>