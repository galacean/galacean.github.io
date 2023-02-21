---
order: 2
title: glTF 模型
type: 功能
group: 3D 渲染
label: Editor/Feature/Rendering-3d
---

## 介绍

编辑器目前支持导入 glTF、FBX 两种模型格式，但是最后编辑器都会转换成运行时也可以解析的 glTF 格式。

glTF 模型是一种高效传输的 3D 资源格式标准，实际上是一个 JSON 文件，包含了场景、渲染、动画等数据结构。详见[ glTF 资源教程](${docs}gltf-cn)

## 上传模型

1.**准备 glTF 资源。** glTF 格式的资源比较灵活，通常有如下几种组合方式：

- `.gltf` + `图片`
- `.glb`
- `.gltf` + `.bin` + `图片`

如果是单文件，直接拖拽即可；如果是多文件，需要先压缩打包成 `.zip` 再进行拖拽。

> zip 打包的时候，要选中所有资源，右击选择压缩 x 个项目”，不要选择外层文件夹打包。

<img src="https://gw.alipayobjects.com/zos/OasisHub/28f36b3d-8463-4da3-b458-047a4155d3b3/gltf.gif" alt="gltf" style="zoom:50%;" />

2.**上传 glTF 模型。** 可以选择以下两种方式上传：

- 直接把模型文件或者 **.zip** 拖进编辑器的资源面板即可完成上传（**推荐**）；

- 在编辑器下方的资源面板中选择上传 **模型**。

<img src="https://gw.alipayobjects.com/zos/OasisHub/17849ead-b064-4f33-975f-ec60ff784980/1673513850696-8b7d63d5-db2f-4e27-b4fa-a2755cca5856-20230112171540079.png" alt="img" style="zoom:50%;" />

3.**预览模型相关资产。** 在资源上传成功后，glTF 资源的 Mesh 网格、贴图、材质等内容都会被展示在资源面板当中：

![img](https://gw.alipayobjects.com/zos/OasisHub/226a127f-598f-4b65-a7e1-6bede92d4002/1673514346738-3dd44b9b-1f19-4337-bce8-1452e84bb557.png)

如果模型很多，可以使用编辑器的筛选/查找功能。

<img src="https://gw.alipayobjects.com/zos/OasisHub/df255915-49dc-42f1-a458-32813ed6a2b5/1673514428252-843a7087-2390-4f35-b8a7-e107420ff04f.png" alt="img" style="zoom:50%;" />

4.**更多信息。** 检查器面板还支持预览模型+动画，查看 url 地址，面数，drawcall 等信息，绑定材质等功能。

<img src="https://gw.alipayobjects.com/zos/OasisHub/225e2bd9-4a3a-47b6-b364-32965d7feb30/1673514900887-aca83634-da5b-4c9b-8e9f-a551c30a0e07.png" alt="img" style="zoom:50%;" />

## 置入场景

上传完模型之后，场景并不会自动渲染该模型，我们可以将模型拖拽至场景窗口，或者节点树相应的层级下面：

![img](https://gw.alipayobjects.com/zos/OasisHub/e16be3d5-1e74-4a87-9cbf-1e64408de608/1673516227645-101c76d5-2d8f-4ebe-b299-c416bc082f6c.gif)

模型置入场景后，可以基于模型做很多操作，比如可以通过绑定 `AnimatorController` 资源进行动画的控制，详见 [动画编辑](${docs}editor-animator-cn) 教程。

## 修改材质

一般情况下，模型已经自动绑定好材质和相应的纹理，用户可以不用做任何操作；但是在一定场景下，开发者可能想要手动微调材质，比如修改颜色，那么我们可以将原材质进行复制，即点击 `duplicate & remap`, 即可在原材质参数的基础上进行修改：

![material](https://gw.alipayobjects.com/zos/OasisHub/ee709fab-ec1b-40fe-a643-be15df939f48/material.gif)

当然，您也可以手动创建新的材质球进行绑定:

![new](https://gw.alipayobjects.com/zos/OasisHub/643554d8-c5eb-4794-b263-30075f570142/new.gif)

> 更多材质调试详见 [材质资产](${docs}editor-material-cn) 教程。
