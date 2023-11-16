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

<img src="https://gw.alipayobjects.com/zos/OasisHub/93d8b5ba-6c3d-498d-a343-ec976ba39978/image-20231009113534494.png" alt="image-20231009113534494" style="zoom:50%;" />

#### 使用方式：

<img src="https://gw.alipayobjects.com/zos/OasisHub/b554d6f8-c9a4-48a9-9dd3-475dbf63ae55/image-20231009113622354.png" alt="image-20231009113622354" style="zoom:50%;" />
  
| 属性      | 作用                             |
| :-------- | :------------------------------- |
| Intensity | 控制平行光的强度，**值越高越亮** |
| Color     | 控制平行光的颜色，默认白色       |

### 2. 点光源

存在于空间中的一点，由该点向四面八方发射光线，光照强度随光源距离衰减，如灯泡。

<img src="https://gw.alipayobjects.com/zos/OasisHub/f0d42119-4ebf-4214-a9c1-154e6c00be65/image-20231009113806918.png" alt="image-20231009113806918" style="zoom:50%;" />

#### 使用方式：

<img src="https://gw.alipayobjects.com/zos/OasisHub/5d8e7211-aff1-4911-85ac-844915976ef0/image-20231009113830843.png" alt="image-20231009113830843" style="zoom:50%;" />

| 属性      | 作用                             |
| :-------- | :------------------------------- |
| Intensity | 控制点光源的强度，**值越高越亮** |
| Color     | 控制点光源的颜色，默认白色       |
| Distance  | 有效距离，光照强度随距离衰减     |

### 3. 聚光灯

由一个特定位置发出，向特定方向延伸的光，光照强度随光源距离衰减，光照区域为锥形，锥形边缘随张开角度衰减，如手电筒。

<img src="https://gw.alipayobjects.com/zos/OasisHub/1695c247-a6f1-43c5-8cfe-cb89c507cf31/image-20231009114221422.png" alt="image-20231009114221422" style="zoom:50%;" />

#### 使用方式：

<img src="https://gw.alipayobjects.com/zos/OasisHub/d3ff9ed7-ccba-4112-ba73-568b6b203549/image-20231009114257367.png" alt="image-20231009114257367" style="zoom:50%;" />

| 属性                   | 作用                                                     |
| :--------------------- | :------------------------------------------------------- |
| Angle(散射角度)        | 表示与光源朝向夹角小于多少时有光线                       |
| Intensity(强度)        | 控制聚光灯的强度，**值越高越亮**                         |
| Color(颜色)            | 控制聚光灯的颜色                                         |
| Distance(距离)         | 有效距离，光照强度随距离衰减                             |
| Penumbra(半影衰减角度) | 表示在有效的夹角范围内，随着夹角增大光照强度逐渐衰减至 0 |

## 基于图像的照明（IBL）

![image-20230914142423022](https://gw.alipayobjects.com/zos/OasisHub/ce57cb4c-2285-4c36-b5a2-d89b70280282/image-20230914142423022.png)

除了直接光源，[IBL 技术](https://learnopengl-cn.github.io/07%20PBR/03%20IBL/01%20Diffuse%20irradiance/)将 **周围环境** 视为一个大光源，保存在立方体纹理中，在渲染时，将立方体纹理的每个像素都视为光源，这种方式可以有效地捕捉环境的全局光照和氛围，使物体更好地融入其环境。

因为实时卷积计算 IBL 非常耗时，所以编辑器会 **提前烘焙周围环境** 到一张[预滤波环境贴图](https://learnopengl-cn.github.io/07%20PBR/03%20IBL/02%20Specular%20IBL/)中，即每个 mipmap 级别存储不同粗糙度的预卷积结果。

编辑器支持根据 **场景** 进行烘焙，在编辑器中点击场景，配置如下：

### 相关配置

修改背景或者烘焙分辨率后，点击“烘焙场景”按钮可重新进行烘焙。

#### **环境漫反射**：

<img src="https://gw.alipayobjects.com/zos/OasisHub/7b2f79cc-7886-43da-b1cb-32bb7373dcb0/image-20231009114400810.png" alt="image-20231009114400810" style="zoom:50%;" />

| 属性 | 作用 |
| :-- | :-- |
| Mode | 支持 `Sky`和 `Solid Color` 两种模式，默认 `Sky` 模式，表示使用根据场景烘焙的球谐参数; `Solid Color` 模式时使用纯色作为漫反射颜色 |
| Intensity | 漫反射强度 |

#### **环境镜面反射**：

<img src="https://gw.alipayobjects.com/zos/OasisHub/635ba520-5b7c-4156-a617-445045ddf92d/image-20231009114427072.png" alt="image-20231009114427072" style="zoom:50%;" />

| 属性 | 作用 |
| :-- | :-- |
| Mode | 支持 `Sky`和 `Custom` 两种模式，默认 `Sky` 模式，表示使用根据场景烘焙的预滤波环境贴图; `Custom` 模式时可以单独上传一张 HDR 贴图作为环境反射 |
| Intensity | 镜面反射强度 |
| Baker Resolution | 表示烘焙后的立方体纹理分辨率，默认 128 分辨率，烘焙产物约为 500KB，64 分辨率的烘焙产物约为 125KB，可以根据场景选择合适的烘焙分辨率。 |

#### **背景：**

<img src="https://gw.alipayobjects.com/zos/OasisHub/1604407b-f6e0-442a-b179-aef4836877cf/image-20231009114455268.png" alt="image-20231009114455268" style="zoom:50%;" />

| 属性 | 作用 |
| :-- | :-- |
| Mode | 支持 `Sky`、`Solid Color`、`Texture` 三种模式。默认 `Sky` 模式，配大气散射作为背景； `Solid Color` 模式支持设置纯色作为背景；`Texture` 模式支持设置纹理作为背景 |
| Color | `Solid Color` 模式时，可以设置颜色 |
| Texture | `Texture` 模式时，可以设置纹理 |
| Material | `Sky` 模式时，可以绑定材质球，一般选择天空盒或者大气散射 </br> <img src="https://gw.alipayobjects.com/zos/OasisHub/5e0474d7-136d-4a8a-a2a7-8f5ee83cb5c5/image-20231007172742202.png" alt="image-20231007172742202" style="zoom:50%;" /> |
| Mesh | `Sky` 模式时，可以绑定 Mesh。大气散射搭配球，天空盒搭配立方体 |

## 阴影

平行光组件下面可以打开阴影功能，可以前往 [阴影教程](${docs}shadow-cn) 了解更多细节。

<img src="https://gw.alipayobjects.com/zos/OasisHub/98e9ce45-5de5-4161-964b-0b9b099b7662/image-20231009114604582.png" alt="image-20231009114604582" style="zoom:50%;" />
