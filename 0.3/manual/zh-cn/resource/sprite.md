# 精灵

[Sprite](${book.api}classes/core.sprite.html) 是 2D 图形对象，用于角色、道具、子弹以及一些其他 2D 游戏要素。这些图形是从 [Texture2D](${book.manual}resource/texture.md) 获得的。[Sprite](${book.api}classes/core.sprite.html) 类主要标识应用于特定Sprite的图像部分。然后 [Entity](${book.manual}structure/entity.md) 上的  [SpriteRenderer](${book.manual}component/sprite-renderer.md) 组件可以使用此信息来实际显示图形。

## 属性说明

| 属性名 | 属性类型 | 描述 |
| :--- | :--- | :--- |
|texture|[Texture2D](${book.api}classes/core.texture2d.html)|使用纹理的引用|
|pivot|[Vector2](${book.api}classes/math.vector2.html)|精灵中心点在原始纹理上的rect中的位置，范围 0～1|
|rect|[Rect](${book.api}classes/math.rect.html)|精灵在原始纹理上的位置，范围 0～1|

## 纹理、pivot、rect 三者关系
rect 决定精灵的显示内容，可以在纹理中选择一个矩形区域进行显示，超出部分会自动过滤掉，如下：

![avatar](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*Thx9Rpk6WkQAAAAAAAAAAAAAARQnAQ)

pivot 代表精灵中心在 rect 中的位置，如下：

![avatar](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*-h_1Sri5P6oAAAAAAAAAAAAAARQnAQ)
## 使用 Sprite

### 创建一个默认 Sprite 如下:
```typescript
const sprite = new Sprite(engine);
```
### 设置纹理
```typescript
engine.resourceManager
  .load<Texture2D>({
    url: "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*ArCHTbfVPXUAAAAAAAAAAAAAARQnAQ",
    type: AssetType.Texture2D
  }).then((texture)=>{
    sprite.texture = texture;
  });
```
### 设置 pivot
```typescript
sprite.pivot = new Vector2(0.5, 0.5);
```
对于 pivot 来说，纹理左下角为 (0, 0)，X 轴从左到右，Y 轴从下到上
### 设置 rect，我们以取纹理左半边为例，如下：
```typescript
sprite.rect = new Rect(0, 0, 0.5, 1);
```
我们通过 rect 获取纹理内容时，纹理左上角为 (0, 0)，X 轴从左到右，Y 轴从上到下。并且当 rect.x + rect.width > 1 时，rect.width 会自动修改，保证 rect.x + rect.width <= 1，rect.y 和 rect.height 同理。

