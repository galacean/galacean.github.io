---
order: 31
title: 立方体纹理
type: 编辑器
author: 阿霑
---

## 介绍

需要实现天空盒、环境反射等特效时，就少不了立方体纹理。与 2D 纹理不同的是，立方体纹理由 6 张 2D 纹理组成，并且它依靠三维坐标进行采样，详情参考[立方纹理](${docs}texture-cn#2-立方纹理)。

## 获取资源
在上传前我们需要准备好上传的图片，可以看到我们需要的资源如下：

<img src="https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*r-XPSaUTEnEAAAAAAAAAAAAAARQnAQ" alt="image-20210721144328067" style="zoom:100%;" />

此处已经准备了示例的资源，欢迎自取：
- [px.jpeg](https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*Bk5FQKGOir4AAAAAAAAAAAAAARQnAQ)
- [nx.jpeg](https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*_cPhR7JMDjkAAAAAAAAAAAAAARQnAQ)
- [py.jpeg](https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*trqjQp1nOMQAAAAAAAAAAAAAARQnAQ)
- [ny.jpeg](https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*_RXwRqwMK3EAAAAAAAAAAAAAARQnAQ)
- [pz.jpeg](https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*q4Q6TroyuXcAAAAAAAAAAAAAARQnAQ)
- [nz.jpeg](https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*DP5QTbTSAYgAAAAAAAAAAAAAARQnAQ)

## 统筹资源
获取资源后，依照编辑器规则统筹资源。

![image-20210721163102366](https://gw.alipayobjects.com/zos/OasisHub/38db3f7a-39f9-41ff-90a5-917ccbe205a2/image-20210721163102366.png)

我们将加载的资源放置在一个文件夹中，并且以已知的命名规则去命名它（此处六张图的命名规则在**获取资源**步骤中已经给出）。

![image-20210721164726555](https://gw.alipayobjects.com/zos/OasisHub/799d7c05-1347-4379-92a9-fb1b469d99ea/image-20210721164726555.png)

## 上传
准备好资源后，就可以在编辑器中上传了，我们在资源管理面板中点击**上传按钮**，在弹出的资源列表中选中**立方纹理**，选择我们保存立方体纹理的文件夹即可，等待上传成功后，就会发现资源目录下多了一个立方纹理资源。

![buildBox](https://gw.alipayobjects.com/zos/OasisHub/45c8d8cb-0b90-4e84-8c8f-92670c7805f7/buildBox.gif)

## 使用
1.**天空盒**
选中左侧层级管理界面中的 Scene 节点，此时观察右边的属性检查界面，在背景栏的背景模式中选择天空，然后将天空纹理指向之前上传的立方纹理即可，此时可发现整个预览界面都有了天空盒的效果。

![buildBox](https://gw.alipayobjects.com/zos/OasisHub/9282c711-afc8-46fb-b118-9a0ceb69829e/buildBox.gif)

2.**镜面反射**
选中左侧层级管理界面中的 Scene 节点，此时观察右边的属性检查界面，将环境光栏的镜面反射纹理指向之前上传的立方纹理即可，PBR 材质展示了镜面反射的效果。

![buildBox](https://gw.alipayobjects.com/zos/OasisHub/6855c14c-6e20-45b5-b11d-bf1a3a95c429/buildBox.gif)
