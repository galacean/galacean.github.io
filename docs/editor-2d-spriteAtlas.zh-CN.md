---
order: 4
title: 精灵图集
type: 功能
group: 2D 渲染
label: Editor-Feature/Rendering-2d
---

## 介绍

精灵图集是 2D 项目常用的优化手段，它可以带来**更少的绘制次数**和**更少的资源请求次数**，从而大大提升渲染性能，而且使用图集的流程也十分简单，只需在开发过程中将精灵添加到对应的图集中即可。

## 使用

### 创建精灵图集

在`资产面板`内右键，选择`功能列表`中的`创建`，并选中`精灵图集`，此时，一个空白的精灵图集资产就创建成功了。

<img src="https://mdn.alipayobjects.com/huamei_jvf0dp/afts/img/A*7WPGR717BDIAAAAAAAAAAAAADleLAQ/original" alt="buildBox" style="zoom: 67%;" />

选中`精灵图集`资产，可以在`检查器面板`查看资产的详细信息。

<img src="https://mdn.alipayobjects.com/huamei_jvf0dp/afts/img/A*SQ_XSYntdccAAAAAAAAAAAAADleLAQ/original" alt="buildBox" style="zoom: 67%;" />

### 添加精灵

在确定`精灵图集`与`精灵`之间的包含关系后，需要将`精灵`添加至对应的`精灵图集`，此步骤即可通过操作`精灵`资产实现，也可通过操作`精灵图集`资产实现，接下来就分别实践两种方式。

#### 方式一：操作精灵

左键选中需要添加的`精灵`资产，可以在`检查器面板`找到精灵的`从属关系`，选择`打包进图集`就可以选取希望打包进的`精灵图集`资产了。

<img src="https://mdn.alipayobjects.com/huamei_jvf0dp/afts/img/A*fqiITImT7JsAAAAAAAAAAAAADleLAQ/original" alt="buildBox" style="zoom: 67%;" />

#### 方式二：操作精灵图集

左键选中目标`精灵图集`资产，可以在`检查器面板`找到图集打包的精灵列表，选择`添加精灵`就可以选取希望打包的`精灵`资产了。（若选取文件夹，则会添加文件夹目录下的所有精灵）

<img src="https://mdn.alipayobjects.com/huamei_jvf0dp/afts/img/A*D38jT658CaUAAAAAAAAAAAAADleLAQ/original" alt="buildBox" style="zoom: 67%;" />

<img src="https://mdn.alipayobjects.com/huamei_jvf0dp/afts/img/A*zAsESLtqQeEAAAAAAAAAAAAADleLAQ/original" alt="buildBox" style="zoom: 67%;" />

### 移除精灵

#### 方式一：操作精灵

左键选中需要从图集中移除的的`精灵`资产，可以在`检查器面板`找到精灵的`从属关系`（注意需确认目标图集的路径是否匹配），点击移除按钮就可以从目标图集中移除该精灵。

<img src="https://mdn.alipayobjects.com/huamei_jvf0dp/afts/img/A*dQ_CT5qjHacAAAAAAAAAAAAADleLAQ/original" alt="buildBox" style="zoom: 67%;" />

#### 方式二：操作精灵图集

左键选中需要操作的`精灵图集`资产，可以在`检查器面板`找到图集的精灵列表，找到要移除的精灵对象并点击移除按钮即可。

<img src="https://mdn.alipayobjects.com/huamei_jvf0dp/afts/img/A*K7FKQ6gB4uUAAAAAAAAAAAAADleLAQ/original" alt="buildBox" style="zoom: 67%;" />

### 快速操作精灵

`精灵`资产被加入`精灵图集`后，可以在`精灵图集`的`检查器面板`中快速操作精灵，他的属性会同步修改到`精灵`资产中

<img src="https://mdn.alipayobjects.com/huamei_jvf0dp/afts/img/A*j_BOQ6W8xpkAAAAAAAAAAAAADleLAQ/original" alt="buildBox" style="zoom: 67%;" />

## 设置

### 打包设置

| 设置名称 | 释义 |
| --- | --- |
| 纹理最大宽度 | 打包得到纹理的最大限制宽度 |
| 纹理最大高度 | 打包得到纹理的最大限制高度 |
| 边缘填充 | 打包精灵的边缘填充宽度 |
| 允许旋转（未启用） | 是否通过旋转提高图集打包的空间利用率 |
| 空白裁减（未启用） | 是否通过空白裁减提高图集打包的空间利用率 |

### 导出设置

| 属性 |值  |
| --- | --- |
| 循环模式U（[wrapModeU](${api}core/Texture#wrapModeU)）       | 截取模式（[Clamp](${api}core/TextureWrapMode#Clamp)）、 重复模式（[Repeat](${api}core/TextureWrapMode#Repeat)）、镜像重复模式（[Mirror](${api}core/TextureWrapMode#Mirror)） |
| 循环模式V（[wrapModeV](${api}core/Texture#wrapModeV)）       | 截取模式（[Clamp](${api}core/TextureWrapMode#Clamp)）、重复模式（[Repeat](${api}core/TextureWrapMode#Repeat)）、 镜像重复模式（[Mirror](${api}core/TextureWrapMode#Mirror)） |
| 过滤模式（[filterMode](${api}core/Texture#filterMode)）      | 点过滤（[Point](${api}core/TextureFilterMode#Point)）、双线性过滤（[Bilinear](${api}core/TextureFilterMode#Bilinear)）、 三线性过滤（[Trilinear](${api}core/TextureFilterMode#Trilinear)） |
| 各向异性过滤等级（[anisoLevel](${api}core/Texture#anisoLevel)） | 向向异性等级，1 ~ 16                                         |
| 纹理映射([Mipmap](${api}core/Texture#generateMipmaps)） | true , false                   |

## 最佳实践

点击`精灵图集`资产，通过调整`打包设置`的`纹理最大宽度`与`纹理最大高度`，同时调用`打包对象`中的`打包并预览`，可以保证图集利用率在一个较高的水平。

![image-20210901171947471](https://mdn.alipayobjects.com/huamei_jvf0dp/afts/img/A*7UDwRajZtacAAAAAAAAAAAAADleLAQ/original)

预览图中左侧表示导出图片的大小信息，右侧表示图集利用率信息（代表所有散图面积的和占用最终大图的面积百分比），可依据此值调整打包设置以达到较佳的结果。