---
order: 3
title: 网格渲染器
type: 功能
group: 3D 渲染
label: Editor/Feature/Rendering-3d
---

网格渲染器组件是渲染的核心组件，通过选取当前场景的**网格**和**材质**，可以将模型渲染到场景中。

![image-20221228142344978](https://mdn.alipayobjects.com/rms/afts/img/A*InckTZ33n9kAAAAAAAAAAAAAARQnAQ/original/image-20221228142344978.png)

<img src="https://mdn.alipayobjects.com/rms/afts/img/A*sPPRQ5fhyA4AAAAAAAAAAAAAARQnAQ/original/image-20221228144751533.png" alt="image-20221228144751533" style="zoom: 50%;" />

| 属性     | 说明                                                         |
| -------- | ------------------------------------------------------------ |
| 网格     | 选取项目中的网格，描述顶点信息（位置，拓扑，顶点颜色，UV 等） |
| 材质     | 选取项目中的材质，描述材质信息                               |
| 接受阴影 | 当前渲染器是否接受阴影                                       |
| 投射阴影 | 当前渲染器是否投射阴影                                       |

## 选取网格

添加网格渲染器组件后，可以选取项目中网格：

![image-20221228143529503](https://mdn.alipayobjects.com/rms/afts/img/A*piA3TKSy5WwAAAAAAAAAAAAAARQnAQ/original/image-20221228143529503.png)

## 选取材质

![image-20221228143339567](https://mdn.alipayobjects.com/rms/afts/img/A*JruJSam4sDUAAAAAAAAAAAAAARQnAQ/original/image-20221228143339567.png)

选取材质和网格之后，渲染效果能展示在编辑器中。

![image-20221228145211356](https://mdn.alipayobjects.com/rms/afts/img/A*EnGWSJCTjmkAAAAAAAAAAAAAARQnAQ/original/image-20221228145211356.png)

