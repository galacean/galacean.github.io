---
order: 5
title: 精灵图集
type: 功能
group: 2D 渲染
label: Editor-Feature/Rendering-2d
---

## 介绍

精灵图集是 2D 项目常用的优化手段，它可以带来**更少的绘制次数**，**更少的显存占用**和**更少的资源请求次数**，从而大大提升渲染性能。

## 使用

只需要在导出项目前，将精灵添加到对应到图集中即可，除此之外开发者无需考虑其他的细节：

<img src="https://gw.alipayobjects.com/zos/OasisHub/29140fd3-54ff-450c-8e56-4f499328feb8/buildBox.gif" alt="buildBox" style="zoom: 67%;" />

## 参数详解

精灵图集资产的属性面板都是对打包参数的定义，包含了打包的最大尺寸，边距，形状以及内容等信息，点击`预览`不仅可以浏览打包效果，而且可以检查打包是否成功。

![image-20210901171947471](https://gw.alipayobjects.com/zos/OasisHub/2693707d-4021-4fce-9e05-37f3061306bc/image-20210901171947471.png)

注：预览打包耗时较久，并非无响应，后续会优化打包体验。
