---
order: 3.4
title: Mars
type: 编辑器
group: 组件
---

Mars 是一个非常强大、能帮助我们制作 Web 特效的工具，包含一个[特效编辑器](https://render.alipay.com/p/s/mars-editor/)和一个特效播放库。如果想了解更多关于 Mars 的内容，请跳转至 [Mars](https://yuque.antfin-inc.com/oasisgroup/mars)。

## 使用

在使用我们引擎播放 Mars 特效前，需要设计师先使用 Mars 制作特效并导出 `.vfx` 文件，如果对 Mars 还不了解的话建议先看看[这里](https://render.alipay.com/p/s/mars-editor/#)。

1. 开发者拿到 `.vfx` 后，首先需要把 `.vfx` 文件上传到我们 Oasis 编辑器，如下：

![image.png](https://gw.alipayobjects.com/zos/OasisHub/1f3b268d-cede-4dd7-b0a4-0c17323fc6d2/Jul-19-2021%25252017-26-45.gif)

上传完成后，会在资源面板中显示，如下：

![image.png](https://gw.alipayobjects.com/zos/OasisHub/7463abd0-57ee-445c-9995-01a703effb6f/image-20210719173053796.png)

2. 选择一个节点，添加 Mars 组件，如下：

![image.png](https://gw.alipayobjects.com/zos/OasisHub/591ea148-7d08-4882-aae9-5521316d5057/mars-comp.gif))

3. 添加好 Mars 组件后，可以选择对应的 _.vfx_ ，并设置要播放的动画，如下：

![image.png](https://gw.alipayobjects.com/zos/OasisHub/2789b212-e92a-4b12-a84c-4f2b80e51e4b/mars-play.gif)

## 参数说明

| 属性 | 功能说明 |  |
| :--- | :--- | --- |
| `resource` | 选择 Mars 导出的 _vfx_ 资源文件 |  |
| `compositionName` | 每个 _vfx_ 文件中含有1个或多个 composition，选择要播放的即可，`null` 表示不播放任何一个 |  |
| `autoPlay` | 是否自动播放，如果勾选，运行时会自动播放，否则需要手动调用 `play` 来播放 |  |
