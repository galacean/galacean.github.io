---
order: 3
title: 光照
type: 功能
group: 3D 渲染
label: Editor-Feature/Rendering-3d
---

## 介绍

在三维世界中，合理地搭配光照和材质可以让整个场景更加真实。

## 直接光

### 1. 平行光

光线以某个方向均匀射出，光线之间是平行的，不受位置影响，常用来模拟太阳光。

![image-20230314181447867](https://gw.alipayobjects.com/zos/OasisHub/3fbe665e-6b9d-470d-a1a6-bfe3ac73c7c8/image-20230314181447867.png)

- 使用：

<img src="https://gw.alipayobjects.com/zos/OasisHub/ab268781-b32a-4e54-b021-07589e15e9da/image-20230314182422257.png" alt="image-20230314182422257" style="zoom:50%;" />

| 属性 | 释义                             |
| :--- | :------------------------------- |
| 强度 | 控制平行光的强度，**值越高越亮** |
| 颜色 | 控制平行光的颜色                 |

### 2. 点光源

存在于空间中的一点，由该点向四面八方发射光线，光照强度随光源距离衰减，如灯泡。

![image-20230314182751079](https://gw.alipayobjects.com/zos/OasisHub/6e5e33d4-0daa-425c-b333-8359572970c6/image-20230314182751079.png)

- 使用

<img src="https://gw.alipayobjects.com/zos/OasisHub/cbc48c49-fb1c-4a5a-8375-eec0543bfea9/image-20230314182958748.png" alt="image-20230314182958748" style="zoom:50%;" />

| 属性 | 释义                                                             |
| :--- | :--------------------------------------------------------------- |
| 强度 | 控制点光源的强度，**值越高越亮**                                 |
| 颜色 | 控制点光源的颜色                                                 |
| 距离 | 有效距离，**距离光源超过有效距离的地方将无法接受到点光源的光线** |

### 3. 聚光灯

由一个特定位置发出，向特定方向延伸的光，光照强度随光源距离衰减，光照区域为锥形，锥形边缘随张开角度衰减，如手电筒。

![image-20230314183453137](https://gw.alipayobjects.com/zos/OasisHub/bc6a0121-2557-4f44-926f-4952d76a310a/image-20230314183453137.png)

- 使用

<img src="https://gw.alipayobjects.com/zos/OasisHub/3b2ebb37-391e-46f7-a834-df232a383983/image-20230314183653847.png" alt="image-20230314183653847" style="zoom:50%;" />

| 属性                   | 释义                                                             |
| :--------------------- | :--------------------------------------------------------------- |
| angle(散射角度)        | 表示与光源朝向夹角小于多少时有光线                               |
| intensity(强度)        | 控制聚光灯的强度，**值越高越亮**                                 |
| Color(颜色)            | 控制聚光灯的颜色                                                 |
| distance(距离)         | 有效距离，**距离光源超过有效距离的地方将无法接受到聚光灯的光线** |
| penumbra(半影衰减角度) | 表示在有效的夹角范围内，随着夹角增大光照强度逐渐衰减至 0 。      |

## IBL

环境贴图使用 HDR 贴图作为环境反射，是 PBR 材质的重要组成部分。Galacean 支持通过[编辑器](https://galacean.antgroup.com/editor)或者[glTF Viewer](https://galacean.antgroup.com/#/gltf-viewer)进行离线烘焙得到 IBL 烘焙产物 `*.env` 文件。

用户只需要从网上选择满意的 [HDRI 贴图](https://polyhaven.com/hdris)，然后上传到编辑器中，即可绑定环境贴图，其中的 IBL 离线烘焙、漫反射球谐烘焙等过程都会自动处理，就算您是零基础的用户，也能轻易上手。

1. **获取资源**

HDR 贴图是高动态范围的 RGB 贴图，需要用 RGBE 解码方式进行解码，有很多网站可以下载，拿 [polyhaven](https://polyhaven.com/hdris) 举例，先选择一个喜欢的 HDR 贴图，然后下载到本地：

![](https://gw.alipayobjects.com/zos/OasisHub/48e59229-0110-4817-9e30-258a9c1e2f4f/image-20211115172445792.png)

注意，我们一般只需要下载分辨率为 1K 的文件即可满足大部分场景需求，并且格式必须为 **HDR**，而不是 EXR:

![](https://gw.alipayobjects.com/zos/OasisHub/fa727617-dc38-47df-ac24-cebf41fc5cff/image-20211115172759917.png)

2. **上传资源**

下载到本地之后，我们需要上传环境贴图到编辑器，编辑器会消耗大概几秒钟帮我们进行离线烘焙：

![image-20230314184830375](https://gw.alipayobjects.com/zos/OasisHub/d6361dd0-e4b7-4072-8b7b-0ebcf53518a8/image-20230314184830375.png)

3. **绑定**

现在环境贴图还是一份资产，还没有绑定到场景中，我们需要在场景面板中，进行绑定希望的环境贴图：

![image-20230314185111042](https://gw.alipayobjects.com/zos/OasisHub/147e5338-a5d2-4d30-95c7-3c6018d3fbf3/image-20230314185111042.png)

4. **查看效果**

![ibl](https://gw.alipayobjects.com/zos/OasisHub/89943cf7-ef91-4224-988f-c36006e275ed/ibl.gif)

调节材质的金属度、粗糙度，能够清晰地看到 IBL 在材质渲染的漫反射、镜面反射上面的作用。

## 阴影

平行光组件下面可以打开阴影功能，可以前往 [阴影教程](${docs}shadow-cn) 了解更多细节。

![image-20230314190243588](https://gw.alipayobjects.com/zos/OasisHub/5936315b-ebbe-41e0-a251-d03ff1378ab6/image-20230314190243588.png)
