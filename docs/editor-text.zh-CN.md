---
order: 5
title: 文本渲染组件
type: 功能
group: 2D 渲染
label: Editor-Feature/Rendering-2d
---

文本组件用于在 3D/2D 场景中显示图片，详见 [文本组件](${docs}text-renderer-cn)。

## 添加文本组件

需要显示文本的时候，需要先给一个实体添加文本组件，如下：

![添加文本组件](https://mdn.alipayobjects.com/huamei_w6ifet/afts/img/A*jeemQbTRy_wAAAAAAAAAAAAADjCHAQ/original)

## 设置显示文本

添加完文本组件后，可以设置 Text 属性来显示需要的文本，如下：

![设置显示文本](https://mdn.alipayobjects.com/huamei_w6ifet/afts/img/A*1aBERpFmLD8AAAAAAAAAAAAADjCHAQ/original)

## 设置自定义字体

为了让文本的显示更为丰富，开发者可以上传自己的字体文件，目前编辑器支持的字体文件格式有：**.ttf**、**.otf**、**.woff**

![设置字体](https://mdn.alipayobjects.com/huamei_w6ifet/afts/img/A*0ZNiQZjVpcEAAAAAAAAAAAAADjCHAQ/original)

## 更多属性

![属性面板](https://mdn.alipayobjects.com/huamei_w6ifet/afts/img/A*tCf0RoUc0_gAAAAAAAAAAAAADjCHAQ/original)

在文本组件的属性查看器中可以看到编辑器提供了文本渲染组件所有可设置的属性，属性说明如下：

| 属性 | 功能说明 |
| :--- | :--- |
| `Text` | 需要显示的文本 |
| `Color` | 文本颜色 |
| `FontSize` | 文本的字体大小 |
| `Font` | 自定义字体 |
| `Width` | 文本在三维空间中的宽 |
| `Height` | 文本在三维空间中的高 |
| `LineSpacing` | 行间距 |
| `FontStyle` | 字体样式设置：是否加粗/是否斜体 |
| `HorizontalAlignment` | 水平对齐方式，可选值有：Left/Center/Right |
| `VerticalAlignment` | 竖直对齐方式，可选值有：Top/Center/Bottom |
| `EnableWrapping` | 是否开启换行模式，打开换行模式后，会根据设置的宽来进行换行，如果这时候宽设置为 0，那么文本将不渲染 |
| `OverflowMode` | 当文本总高度超出设置的高的时候的处理方式，可选值有：Overflow/Truncate， Overflow 表示直接溢出显示， Truncate 表示只保留设置高度以内的内容显示，具体显示内容还和文本在竖直方向上的对齐方式有关|