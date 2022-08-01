---
order: 2
title: 精灵资源
type: 图形
group: 2D
---

[Sprite](${api}core/Sprite) 是 2D 图形对象，用于角色、道具、子弹以及一些其他 2D 游戏要素。这些图形是从 [Texture2D](${docs}texture-cn) 获得的。[Sprite](${api}core/Sprite) 类主要标识应用于特定Sprite的图像部分。然后 [Entity](${docs}entity-cn) 上的  [SpriteRenderer](${docs}sprite-renderer-cn) 组件可以使用此信息来实际显示图形。

## 属性说明

| 属性名 | 属性类型 | 描述 |
| :--- | :--- | :--- |
|[texture](${api}core/Sprite#texture)|[Texture2D](${api}core/Texture2D)|使用纹理的引用|
|[region](${api}core/Sprite#region)|[Rect](${api}math/Rect)|精灵在原始纹理上的位置，范围 0～1|
|[pivot](${api}core/Sprite#pivot)|[Vector2](${api}math/Vector2)|精灵中心点在原始纹理上的region中的位置，范围 0～1|
|[border](${api}core/Sprite#border)|[Vector4](${api}math/Vector4)|渲染器的绘制模式为九宫绘制时，边界配置会影响最终的渲染效果|

## 纹理、pivot、region 三者关系

region 决定精灵的显示内容，可以在纹理中选择一个矩形区域进行显示，超出部分会自动过滤掉，如下：

![avatar](https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*ABvvTJnUgpsAAAAAAAAAAAAAARQnAQ)

pivot 代表精灵中心在 region 中的位置，如下：

![avatar](https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*6RyQTpqE4dMAAAAAAAAAAAAAARQnAQ)

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
### 设置 region，我们以取纹理左半边为例，如下：
```typescript
sprite.region = new Rect(0, 0, 0.5, 1);
```
我们通过 region 获取纹理内容时，纹理左上角为 (0, 0)，X 轴从左到右，Y 轴从上到下。并且当 region.x + region.width > 1， region.width 会自动修改，保证 region.x + region.width <= 1，region.y 和 region.height 同理。

### 设置 border

<playground src="sprite-slice.ts"></playground>