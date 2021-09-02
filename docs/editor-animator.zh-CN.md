---
order: 3.4
title: Animator
type: 编辑器
group: 组件
---

通过 Animator 编辑器，你可以在上面方便的为动画添加过渡和叠加：

## 基础使用

1. 将带动画的模型上传到编辑器上，编辑器会自动加载其上的动画片段到资源面板中，并且创建一个动画控制器给你编辑动画使用。

![image-20210902230821166](https://gw.alipayobjects.com/zos/OasisHub/6f28e2a1-a062-49ff-bf6e-34eff1495183/image-20210902230821166.png)


1. 为节点增加一个`GLTF模型`组件，并绑定上传的`.gltf` 资产，编辑器会自动帮你把  `AnimatorController` 资产也绑定上,这时一个默认的动画就开始播放了：
   
![animationbindgltf](https://gw.alipayobjects.com/zos/OasisHub/b338d50c-5525-4967-a5cf-1d85497e3cae/animationbindgltf.gif)

### 参数说明
| 属性 | 功能说明 |  |
| :--- | :--- | --- |
| `asset` |  |  |
| `compositionName` | 每个 _vfx_ 文件中含有1个或多个 composition，选择要播放的即可，`null` 表示不播放任何一个 |  |
| `autoPlay` | 是否自动播放，如果勾选，运行时会自动播放，否则需要手动调用 `play` 来播放 |  |


## 动画过渡
双击 AnimatorController 资源文件编辑动画，将两个



![image.png](https://gw.alipayobjects.com/zos/OasisHub/1f3b268d-cede-4dd7-b0a4-0c17323fc6d2/Jul-19-2021%25252017-26-45.gif)

上传完成后，会在资源面板中显示，如下：

![image.png](https://gw.alipayobjects.com/zos/OasisHub/7463abd0-57ee-445c-9995-01a703effb6f/image-20210719173053796.png)

1. 选择一个节点，添加 Mars 组件，如下：

![image.png](https://gw.alipayobjects.com/zos/OasisHub/591ea148-7d08-4882-aae9-5521316d5057/mars-comp.gif))

3. 添加好 Mars 组件后，可以选择对应的 _.vfx_ ，并设置要播放的动画，如下：

![image.png](https://gw.alipayobjects.com/zos/OasisHub/2789b212-e92a-4b12-a84c-4f2b80e51e4b/mars-play.gif)

## 参数说明

| 属性 | 功能说明 |  |
| :--- | :--- | --- |
| `resource` | 选择 Mars 导出的 _vfx_ 资源文件 |  |
| `compositionName` | 每个 _vfx_ 文件中含有1个或多个 composition，选择要播放的即可，`null` 表示不播放任何一个 |  |
| `autoPlay` | 是否自动播放，如果勾选，运行时会自动播放，否则需要手动调用 `play` 来播放 |  |
