---
order: 5
title: 文字渲染器
type: 图形
group: 2D
label: Graphics/2D
---

[TextRenderer](${api}core/TextRenderer) 组件用于在 3D/2D 场景中显示文本。

<playground src="text-renderer.ts"></playground>

## 基本使用

1、创建 [TextRenderer](${api}core/TextRenderer) 组件显示文本    
2、通过 font 设置 [Font](${docs}font-cn) 对象    
3、通过 text 设置需要显示的文本    
3、通过 fontSize 设置字体大小    
4、通过 color 设置文本颜色    

```typescript
import { Camera, Color, Font, FontStyle, TextRenderer, Vector3, WebGLEngine } from "oasis-engine";

const textEntity = rootEntity.createChild("text");
// 给实体添加 TextRenderer 组件
const textRenderer = textEntity.addComponent(TextRenderer);
// 通过 font 设置 Font 对象
textRenderer.font = Font.createFromOS(engine, "Arial");
// 通过 text 设置需要显示的文本
textRenderer.text = "Oasis 会写字了！";
// 通过 fontSize 设置字体大小
textRenderer.fontSize = 36;
// 通过 color 设置文本颜色
textRenderer.color.set(1, 0, 0, 1);
```

## 设置宽高

可以通过 width/height 来设置文本在三维空间中的大小，主要有以下几个用处：    
1、用于包围盒的计算    
2、在需要多行显示文本时会结合宽高来确认换行原则    

```typescript
// 设置宽
textRenderer.width = 10;
// 设置高
textRenderer.height = 10;
```

## 设置行间距

当需要显示多行文本时，可以通过 lineSpacing 来设置两行文本在竖直方向的间距

```typescript
// 设置行间距
textRenderer.lineSpacing = 0.1;
```

## 多行文本显示

当文本过长时，可能希望文本能够多行来显示，这时候可以通过 enableWrapping 字段来设置开启换行模式，打开换行模式后，会根据前面设置的宽来进行换行，如果这时候宽设置为 0，那么文本将不渲染

```typescript
// 打开换行模式
textRenderer.enableWrapping = true;
```

## 文本截取

当显示多行文本时，可能存在文本行数过多，这时候可以通过 overflowMode 字段设置是否截取一部分显示，只保留设置高度以内的内容显示，具体显示内容还和文本在竖直方向上的对齐方式有关(相见：文本对齐)，如下：

```typescript
// 文本溢出
textRenderer.overflowMode = OverflowMode.Overflow;
// 文本截取
textRenderer.overflowMode = OverflowMode.Truncate;
```

## 文本对齐

文本对齐用来设置在指定宽高的情况下，文本如何在宽高内显示，如下：

| 属性名 | 属性类型 | 描述 |
| :--- | :--- | :--- |
|[horizontalAlignment](${api}core/TextRenderer#horizontalAlignment)|[TextHorizontalAlignment](${api}core/TextHorizontalAlignment)|水平方向对齐方式：Left/Center/Right 分别代表 左对齐/居中对齐/右对齐 显示|
|[verticalAlignment](${api}core/TextRenderer#horizontalAlignment)|[TextVerticalAlignment](${api}core/TextVerticalAlignment)|竖直方向对齐方式：Top/Center/Bottom 分别代表 顶部开始显示/居中显示/底部开始显示|

## 文本的字体样式
文本的字体样式用来设置文本是否加粗显示，是否斜体显示，如下：

| 属性名 | 属性类型 | 描述 |
| :--- | :--- | :--- |
|[fontStyle](${api}core/TextRenderer#fontStyle)|[FontStyle](${api}core/FontStyle)|字体样式：None/Bold/Italic 分别代表 正常/加粗/斜体 显示|

使用方式如下：
```typescript
// 正常显示
textRenderer.fontStyle = FontStyle.None;
// 加粗显示
textRenderer.fontStyle = FontStyle.Bold;
// 斜体显示
textRenderer.fontStyle = FontStyle.Italic;
// 既加粗又斜体显示
textRenderer.fontStyle = FontStyle.Bold | FontStyle.Italic;
```

## 多行文本示例

<playground src="text-wrap-alignment.ts"></playground>

## 自定义字体示例
<playground src="text-renderer-font.ts"></playground>