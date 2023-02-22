---
order: 1
title: 环境光
type: 功能
group: 3D 渲染
label: Editor-Feature/Rendering-3d
---

## 介绍

与立方纹理不同，环境贴图使用一张 HDR 贴图，能够实现更加逼真的环境反射效果。Oasis 支持通过[编辑器](https://oasis.alipay.com/editor)或者[glTF Viewer](https://oasisengine.cn/gltf-viewer)进行离线烘焙得到 IBL 烘焙产物 `*.env` 文件。

用户只需要从网上选择满意的 [HDRI 贴图](https://polyhaven.com/hdris)，然后上传到编辑器中，即可绑定环境贴图，其中的 IBL 离线烘焙、漫反射球谐烘焙等过程都会自动处理，就算您是零基础的用户，也能轻易上手。

![hdr](https://gw.alipayobjects.com/zos/OasisHub/128e05a1-6d0c-4d2e-8565-fc2094cf4edc/hdr.gif)

## 获取资源

HDR 贴图是高动态范围的 RGB 贴图，需要用 RGBE 解码方式进行解码，有很多网站可以下载，拿 [polyhaven](https://polyhaven.com/hdris) 举例，先选择一个喜欢的 HDR 贴图，然后下载到本地：

![](https://gw.alipayobjects.com/zos/OasisHub/48e59229-0110-4817-9e30-258a9c1e2f4f/image-20211115172445792.png)

注意，我们一般只需要下载分辨率为 1K 的文件即可满足大部分场景需求，并且格式必须为 **HDR**，而不是 EXR:

![](https://gw.alipayobjects.com/zos/OasisHub/fa727617-dc38-47df-ac24-cebf41fc5cff/image-20211115172759917.png)

## 上传资源

下载到本地之后，我们需要上传环境贴图到编辑器，编辑器会消耗大概几秒钟帮我们进行离线烘焙：

![](https://gw.alipayobjects.com/zos/OasisHub/b7fe8a0f-5795-4d85-936a-b53085b81684/image-20230117175219564.png)

## 绑定

现在环境贴图还是一份资产，还没有绑定到场景中，我们需要在场景面板中，进行绑定希望的环境贴图：

![](https://gw.alipayobjects.com/zos/OasisHub/96405dc0-0d8b-4732-bf12-c1dac8ec7424/image-20230117175345639.png)
