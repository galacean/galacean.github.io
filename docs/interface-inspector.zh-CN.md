---
order: 4
title: 检查器面板
type: 基础知识
group: 界面
label: Basics/Interface
---

检查器面板位于编辑器右侧，它会是你在使用编辑器的过程中最常用的面板。基于你当前选择所选择的东西，检查器面板会显示出相对应的属性。你可以使用检查器面板来编辑场景中几乎所有的事物，如场景、实体、组件、资产等等。

<div style="display: flex; gap: 20px;">
  <figure style="flex:1;">
  <img src="https://gw.alipayobjects.com/zos/OasisHub/e5c728d7-02f7-4f2a-bfff-799324db54a1/image-20240122144004260.png" alt="image-20240122144004260" style="zoom:50%;" />
  <figcaption style="text-align:center; color: #889096;font-size:12px">场景检查器</figcaption>
	</figure>
  <figure style="flex:1;">
    <img src="https://gw.alipayobjects.com/zos/OasisHub/814940b3-147c-4d08-9223-dd7721a7c069/image-20240122144102202.png" alt="image-20240122144102202" style="zoom:50%;" />
    <figcaption style="text-align:center; color: #889096;font-size:12px">实体检查器</figcaption>
  </figure>
  <figure style="flex:1;">
    <img src="https://gw.alipayobjects.com/zos/OasisHub/708b77a1-a666-4573-a021-697a001c27c0/image-20240122144141450.png" alt="image-20240122144141450" style="zoom:50%;" />
    <figcaption style="text-align:center; color: #889096;font-size:12px">资产检查器</figcaption>
  </figure>
</div>


## 属性类型

检查器面板中的属性可以分成两大类：

- **基本数值类型**：数字调节、颜色选择、属性切换等
- **引用类型**：通常是资源，比如材质选择、纹理选择等

### 数字调节

检查器中提供了很多数字调节的入口。针对不同的属性，数字可调节的范围，每次调整的大小都会不同。最典型的是调整 `Transform` 组件的位置、旋转、缩放属性值。

你可以通过拖拽输入框右侧的滑块来快速调整数字的大小。在拖拽时，按住 `⌘`（window 上为 `ctrl`）可以更精确地调整数字的大小（精度为原 step 的 1/10）。

<img src="https://gw.alipayobjects.com/zos/OasisHub/252b0426-036b-4950-a90e-24680837fc74/image-20230926105543072.png" alt="image-20230926105543072" style="zoom:50%;" />

一些可以调节的属性是以滑动条的形式出现的。你可以拖动滑块来快速调整数字的大小，如灯光的 `Intensity`。同样的，在拖动滑块时，按住 `⌘`（window 上为 `ctrl`）可以更精确的调整数字的大小。

<img src="https://gw.alipayobjects.com/zos/OasisHub/1cbd4aa5-3cf6-4358-af31-043d93b82d20/image-20230926105935206.png" alt="image-20230926105935206" style="zoom:50%;" />

还有一些数字调节的属性是以输入框和按钮的形式出现的，如阴影的 `shadowDistance`。这些属性往往拥有更精确的步进大小（如 0.1, 1, 10）。点击按钮可以直接以步进长度来增加或减小数值。

<img src="https://gw.alipayobjects.com/zos/OasisHub/e00085ab-60c9-43d0-b012-f1754406ada1/image-20230926110053695.png" alt="image-20230926110053695" style="zoom:50%;" />

### 颜色面板

一些属性需要调整颜色，如光照、场景的背景色，亦或者材质的自发光颜色等。想要调整颜色，你需要点击左侧的颜色按钮来唤起颜色选择器。在颜色选择器中，你可以使用 HUE 来选择颜色，调整颜色的透明度；也可以在输入框来调整颜色具体的 RGBA 数值。点击 <img src="https://gw.alipayobjects.com/zos/OasisHub/dc030a4b-8813-4ea2-acb0-549c04363b1d/image-20230926110451443.png" alt="image-20230926110451443" style="zoom: 33%;" />按钮可以在 HSLA，RGBA 和 HEXA 三种模式下进行切换。

<img src="https://gw.alipayobjects.com/zos/OasisHub/b6a6835c-1c11-4a5a-a62a-58117ffab872/image-20240122143848061.png" alt="image-20240122143848061" style="zoom:50%;" />

### 资产面板

一些属性需要引用到需要的资产，在这种情况下，你可以点击资产选择器的输入框来唤起资产选择浮窗。不同的属性需要的资产类型不同，但资产选择器已经默认配置好了相应的过滤器，直接选择即可。

资产选择浮窗中还提供了一个搜索框，你可以使用它来更精确的找到对应的资产。

<div style="display: flex; gap: 20px;">
  <figure style="flex:1;">
  <img src="https://gw.alipayobjects.com/zos/OasisHub/e2d0e8fd-7926-4c6b-b7bf-b0e712649855/image-20240122143554973.png" alt="image-20240122143554973" style="zoom:50%;" />
  <figcaption style="text-align:center; color: #889096;font-size:12px">Mesh Asset Picker</figcaption>
	</figure>
  <figure style="flex:1;">
    <img src="https://gw.alipayobjects.com/zos/OasisHub/f456c74e-b8ba-4bd6-9cf9-4f907535af26/image-20240122134039213.png" alt="image-20240122134039213" style="zoom:50%;" />
    <figcaption style="text-align:center; color: #889096;font-size:12px">Texture Asset Picker</figcaption>
  </figure>
</div>
