---
order: 5
title: 项目发布
type: 界面
label: Editor-Interface
---

<figure style="float: right;position: relative; z-index: 2;">
  <img alt="Hierarchy Pane" src="https://mdn.alipayobjects.com/rms/afts/img/A*XXiMTbmWKg0AAAAAAAAAAAAAARQnAQ/original/image-20230914161439413.png">
  <figcaption style="text-align:center; color: #889096;font-size:12px">项目导出导出配置面板</figcaption>
</figure>

Galacean Editor 项目导出功能可以将当前编辑器项目作为一个前端项目下载到本地。你可以在编辑器中配置项目导出的参数，如资产导出配置、渲染导出配置、物理导出配置等。基于这些配置，编辑器会生成出项目所需的代码、资产, 生成对应的 `package.json`，并最终打包成一个 zip 包供你下载。

## 导出配置

### 资产导出配置

资产导出配置可以用来控制导出的资源类型和质量等参数。在资产导出配置中，你可以选择导出的资源类型，例如模型、纹理、HDR 等等，以及选择每种类型的导出质量和格式等参数。在导出模型时，你可以选择是否导出模型的网格信息、骨骼信息、动画信息等。

#### KTX2
勾选 [KTX2](https://www.khronos.org/ktx/) 开启[纹理压缩](${docs}texture-compression-cn)优化选项。**压缩纹理**是一种优化图形性能的技术，它通过使用专门的算法将图形数据压缩为更小的大小。在游戏和其他图形密集型应用中，压缩纹理可以显著降低 GPU 的内存并提高帧率，从而改善用户体验。

默认的压缩配置是 UASTC，开启 MIPMAP 和 ZSTD 压缩。后续编辑器的迭代会逐步开放更多的配置选项。Galacean 采取的是 **KTX2(Khronos Texture Container version 2.0)** 方案。KTX2 会根据设备平台支持运行时转码到对应格式的压缩纹理。

### 渲染导出配置

渲染导出配置可以用来控制项目的渲染效果和性能等参数。在渲染导出配置中，你可以配置 WebGL 的版本, 是否为项目开启抗锯齿, 设备的像素比等.

### 物理导出配置

物理导出配置可以用来控制项目的物理效果和性能等参数。在物理导出配置中，你可以选择需要的物理引擎类型.

## 项目启动

在点击导出面板中的下载按钮后, 你将得到一个项目的压缩包. 解压缩后进入文件夹, 依次运行 `npm install`, `npm run dev`. 项目就可以在本地运行了.

## 注意事项

在使用编辑器项目导出功能时，你需要注意以下事项：

1. 导出的项目需要在支持 WebGL 的浏览器中运行，因此你可能需要在项目中添加相应的浏览器兼容性代码。
2. 导出的项目中可能包含大量的资源文件，你需要对项目进行优化和压缩，以提高项目的性能和加载速度。
3. 导出的项目中可能包含敏感信息和数据，你需要对项目进行安全性评估和保护，以防止信息泄漏和数据丢失等情况。