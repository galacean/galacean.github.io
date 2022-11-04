---
order: 2.1
title: 环境贴图
type: 编辑器
group: 资产
label: 编辑器/资产

---

## 介绍

与立方纹理不同，环境贴图使用一张 HDR 贴图，能够实现更加逼真的环境反射效果。Oasis 支持通过[编辑器](https://oasis.alipay.com/editor)或者[glTF Viewer](https://oasisengine.cn/gltf-viewer)进行离线烘焙得到 IBL 烘焙产物 `*.env` 文件。

用户只需要从网上选择满意的 [HDRI 贴图](https://polyhaven.com/hdris)，然后上传到编辑器中，即可绑定环境贴图，其中的 IBL 离线烘焙、漫反射球谐烘焙等过程都会自动处理，就算您是零基础的用户，也能轻易上手。

![editor](https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*6eSeSbqAjDUAAAAAAAAAAAAAARQnAQ)

## 获取资源

HDR 贴图是高动态范围的 RGB 贴图，需要用 RGBE 解码方式进行解码，有很多网站可以下载，拿 [polyhaven](https://polyhaven.com/hdris) 举例，先选择一个喜欢的 HDR 贴图，然后下载到本地：

![image-20211115172445792](https://gw.alipayobjects.com/zos/OasisHub/48e59229-0110-4817-9e30-258a9c1e2f4f/image-20211115172445792.png)

注意，我们一般只需要下载分辨率为 1K 的文件即可满足大部分场景需求，并且格式必须为 **HDR**，而不是 EXR:

![image-20211115172759917](https://gw.alipayobjects.com/zos/OasisHub/fa727617-dc38-47df-ac24-cebf41fc5cff/image-20211115172759917.png)

## 上传资源

下载到本地之后，我们需要上传环境贴图到编辑器，编辑器会消耗大概几秒钟帮我们进行离线烘焙：

<img src="https://gw.alipayobjects.com/zos/OasisHub/ff8ce2e2-141a-4602-a17a-9bf58da6717c/image-20211115172848383.png" alt="image-20211115172848383" style="zoom:50%;" />

<img src="https://gw.alipayobjects.com/zos/OasisHub/a519495d-c14a-428a-9a46-2fb69e177443/image-20211115173017750.png" alt="image-20211115173017750" style="zoom:50%;" />

## 绑定

现在环境贴图还是一份资产，还没有绑定到场景中，我们需要在场景面板中，进行绑定希望的环境贴图：

![image-20211115173153921](https://gw.alipayobjects.com/zos/OasisHub/4ea8d187-b7d2-4dba-ba3a-2e3256af763f/image-20211115173153921.png)
