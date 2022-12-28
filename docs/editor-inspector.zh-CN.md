---
order: 4
title: 检查器
type: 编辑器
group: 基础操作
label: 编辑器/基础操作
---

检查器面板位于编辑器右侧，它会是你在使用编辑器的过程中最常用的面板。基于你当前选择所选择的东西, 检查器面板会显示出相对应的属性。你可以使用检查器面板来编辑场景中几乎所有的事物，如场景、实体、组件、资产等等。

<img src="https://mdn.alipayobjects.com/huamei_x9dkln/afts/img/A*UFVgQroh2YkAAAAAAAAAAAAADsGIAQ/original" style="zoom: 50%">

## 属性类型

检查器面板中的属性可以分成两大类：基本数值类型与引用类型。

**基本数值类型**：数字调节，颜色选择，属性切换等
**引用类型**：材质选择，纹理选择等

### 数字调节

检查器中提供了很多数字调节的入口。针对不同的属性，数字可调节的范围，每次调整的大小都会不同。
你可以通过拖拽输入框右侧的滑块来快速调整数字的大小。在拖拽时，按住 `⌘`(window上为 `ctrl`)可以更精确的调整数字的大小

<img src="https://mdn.alipayobjects.com/huamei_x9dkln/afts/img/A*7BgOTI6rup4AAAAAAAAAAAAADsGIAQ/original">

一些可以调节的属性是以滑动条的形式出现的. 你可以拖动滑块来快速调整数字的大小. 同样的, 在拖动滑块时, 按住 `⌘`(window上为 `ctrl`) 可以更精确的调整数字的大小

![slider](https://mdn.alipayobjects.com/huamei_x9dkln/afts/img/A*w3fOTJkaZpsAAAAAAAAAAAAADsGIAQ/original)

还有一些数字调节的属性是以输入框和按钮的形式出现的. 这些属性往往拥有更精确的步进大小(如 0.1, 1, 10). 点击按钮可以直接以步进长度来增加或减小数值.

![slider](https://mdn.alipayobjects.com/huamei_x9dkln/afts/img/A*mWKtQ6p0r8gAAAAAAAAAAAAADsGIAQ/original)


### 颜色选择

![colorpicker](https://mdn.alipayobjects.com/huamei_x9dkln/afts/img/A*W-3STp0S41QAAAAAAAAAAAAADsGIAQ/original)

一些属性需要调整颜色,如光照,场景的背景色,亦或者材质的自发光颜色等。想要调整颜色，你需要点击左侧的颜色按钮来唤起颜色选择器。在颜色选择器中，你可以使用 HUE 来选择颜色，调整颜色的透明度；也可以在输入框来调整颜色具体的数值。  
> 点击 ![switcher](https://mdn.alipayobjects.com/huamei_x9dkln/afts/img/A*As3nRrWtvNsAAAAAAAAAAAAADsGIAQ/original) 按钮可以在 HSLA，RGBA 和 HEXA 三种模式下进行切换。

### 资产选择

一些属性需要引用到需要的资产，在这种情况下，你可以点击资产选择器的 ![button](https://mdn.alipayobjects.com/huamei_x9dkln/afts/img/A*JLu3QIuLoFMAAAAAAAAAAAAADsGIAQ/original) 按钮来唤起资产选择浮窗。不同的属性需要的资产类型不同，但资产选择器已经默认配置好了相应的过滤器，直接选择即可。

资产选择浮窗中还提供了一个搜索框，你可以使用它来更精确的找到对应的资产。

<img src="https://mdn.alipayobjects.com/huamei_x9dkln/afts/img/A*DyYQQJebgYIAAAAAAAAAAAAADsGIAQ/original" width="300px">
<img src="https://mdn.alipayobjects.com/huamei_x9dkln/afts/img/A*6nbkToYYx3kAAAAAAAAAAAAADsGIAQ/original" width="300px">

## 编辑场景属性

在选中根节点后，或不选择任何节点或资产的情况下，检查器面板将显示当前场景可以编辑的属性。你可以在此时调整场景的环境贴图、背景模式或阴影效果等。

<img src="https://mdn.alipayobjects.com/huamei_x9dkln/afts/img/A*ohTITKznWUsAAAAAAAAAAAAADsGIAQ/original">

## 编辑资产

在资产面板中选择资产后，检查器面板会显示当前所选资产所可以编辑的属性。

<img src="https://mdn.alipayobjects.com/huamei_x9dkln/afts/img/A*tqVeQoTcLr8AAAAAAAAAAAAADsGIAQ/original">

需要注意的是，针对prefab中的材质，你不能够直接编辑它，而是需要点击 `duplicate & remap` 按钮来生成一份该材质的副本，然后再编辑该副本。

<img src="https://mdn.alipayobjects.com/huamei_x9dkln/afts/img/A*I2KcS56b46QAAAAAAAAAAAAADsGIAQ/original">

### 调整 Prefab 的材质

在选中 Prefab 后，你可以使用检查器中的 `remapped material` 属性来将某个材质映射到新的材质当中。一个最常用的使用场景是 **调整一个 gltf 中的材质的数值**，此时，你需要做如下操作：
- 在资产面板中找到该 gltf
- 点击展开按钮，找到你想要编辑的材质
- 点击检查器中的 `duplicate & remap` 按钮，此时编辑器会自动完成如下操作
  - 生成一份该材质的副本
  - 并选中该副本
  - 自动将gltf此材质的remapped属性设置为选中的副本材质
- 调整相应的数值

## 编辑实体

<img src="https://mdn.alipayobjects.com/huamei_x9dkln/afts/img/A*IdEQSL4U4xkAAAAAAAAAAAAADsGIAQ/original">

从层级面板或场景中选择一个实体后，检查器将显示出当前选中节点所可以调整的属性。在此情况下，你可以点击添加组件按钮来为当前实体添加新的组件。
