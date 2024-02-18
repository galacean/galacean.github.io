---
order: 0
title: 资产总览
type: 资产工作流
label: Resource
---

# 资产总览

在 Galacean 中，网格，材质，纹理，精灵，图集，动画片段，动画控制器等等都属于资产。

## 资产工作流

在 Galacean 中，资产的工作流通常如下：

```mermaid
flowchart LR
   导入资产 --> 编辑资产 --> 构建导出 --> 分发 --> 加载
```

本章节将主要讲述：

- Galacean 的[内置资产类型](${docs}assets-type)
- 编辑状态下[资产的增删改查](${docs}interface-assets)
- 构建项目后[资产如何导出并部署](${interface-publish})
- 运行时如何[加载资产](${docs}assets-load)
- 如何实现[自定义资产加载器](${docs}assets-custom)
- 运行时如何[垃圾回收](${docs}assets-gc)
