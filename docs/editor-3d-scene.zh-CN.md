---
order: 5
title: 场景配置
type: 功能
group: 3D 渲染
label: Editor-Feature/Rendering-3d
---

至此，3D 已经搭建完毕，我们还可以针对场景做一些整体配置：

<img src="https://gw.alipayobjects.com/zos/OasisHub/3abee7ad-a734-4fa8-a3a8-51581552c82d/image-20231009115240696.png" alt="image-20231009115240696" style="zoom:50%;" />

## 背景

<img src="https://gw.alipayobjects.com/zos/OasisHub/c417f715-801b-4ab6-85ca-2d0348570ef4/background.gif" alt="background" style="zoom:50%;" />

| 属性 | 作用 |
| :-- | :-- |
| Mode | 支持 `Sky`、`Solid Color`、`Texture` 三种模式。默认 `Sky` 模式，配大气散射作为背景； `Solid Color` 模式支持设置纯色作为背景；`Texture` 模式支持设置纹理作为背景 |
| Color | `Solid Color` 模式时，可以设置颜色 |
| Texture | `Texture` 模式时，可以设置纹理 |
| Material | `Sky` 模式时，可以绑定材质球，一般选择天空盒或者大气散射 </br> <img src="https://gw.alipayobjects.com/zos/OasisHub/5e0474d7-136d-4a8a-a2a7-8f5ee83cb5c5/image-20231007172742202.png" alt="image-20231007172742202" style="zoom:50%;" /> |
| Mesh | `Sky` 模式时，可以绑定 Mesh。大气散射搭配球，天空盒搭配立方体 |

## 阴影

可以针对整个场景进行阴影分辨率等配置：

<img src="https://gw.alipayobjects.com/zos/OasisHub/0b8707a9-5084-4e87-b530-897bcd37c16b/shadow.gif" alt="shadow" style="zoom:50%;" />

## 雾化

可以给整个场景增加 **线性、指数、指数平方** 3 种雾化：

<img src="https://gw.alipayobjects.com/zos/OasisHub/5a713502-18b2-45eb-af56-d6530a340581/fog.gif" alt="fog" style="zoom:50%;" />
