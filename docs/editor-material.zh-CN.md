---
order: 4
title: 材质
type: 编辑器
group: 资产
---

## 介绍

通过引擎的 [材质教程](${docs}material-cn) 中可以了解到 Oasis 的材质分为 [PBR 材质](${api}core/PBRMaterial)(**推荐**)、[PBR-Specular 材质](${api}core/PBRSpecularMaterial)、[BlinnPhong 材质](${api}core/BlinnPhongMaterial)、 [Unlit 材质](${api}core/UnlitMaterial) 四种材质类型，每种材质类型的应用场景都不一样，其中 PBR 材质为 glTF 模型默认材质标准，其余的类型也可以通过插件方式导入。

- PBR 材质适合需要真实感渲染的应用场景，因为 PBR 是基于物理的渲染，遵循能量守恒，采用金属度-粗糙度工作流，开发者通过调整金属度、粗糙度、灯光等参数，能够保证渲染效果都是物理正确的。
- PBR-Specular 材质是相对于 PBR 的另外一种工作流： 高光-光泽度工作流。唯一的区别就是通过高光、光泽度参数，替代了 PBR 的金属度、粗糙度 参数。
- Blinn Phong 材质适用于那些对真实感没有那么高要求的场景，虽然没有遵循物理，但是其高效的渲染算法和基本齐全的光学部分，可以适用很多的场景。
- Unlit 材质适用于烘焙好的模型渲染，她只需要设置一张基本纹理或者颜色，即可展现离线渲染得到的高质量渲染结果，但是缺点是无法实时展现光影交互，因为 Unlit 由纹理决定渲染，不受任何光照影响，可参考 [烘焙教程](${docs}artist-bake-cn) 和 [导出 Unlit 教程](${docs}artist-unlit-cn)。

## 使用

- 如果导入 glTF 模型，会自动创建对应类型的资源，其中就包含材质，如下图：

![image-20210719162230883](https://gw.alipayobjects.com/zos/OasisHub/d5626811-f20e-4b84-aa28-7c6909dc607b/image-20210719162230883.png)

- 也可以在资源面板手动创建不同类型的材质：

<img src="https://gw.alipayobjects.com/zos/OasisHub/01f73e82-8be1-4568-baca-a7de3baf17fb/image-20210719175600845.png" style="zoom:50%;" />

## 调整渲染效果

通常情况， glTF 导入的材质中已经绑定了相应的纹理和参数，不需要进行任何操作。但是编辑器支持对材质进行二次加工，接下来针对不同材质类型进行渲染效果调整步骤。

### 1. Unlit 材质

正如上文所说， Unlit 材质不受光照影响，只需要设置烘焙好的纹理即可：

![unlit](https://gw.alipayobjects.com/zos/OasisHub/e2639e60-a6ed-416d-9f53-064557261d14/unlit.gif)

一般 Unlit 的渲染效果非常不错，因为设置的是建模软件通过离线渲染得到的高质量纹理。如果不需要光线的实时变化，则大部分场景都可以使用此模式。

### 2. BlinnPhong 材质

BlinnPhong 材质受光照的影响，一般只需要设置基础颜色、镜面反射、法线。

- 基础颜色控制主色调：

![baseColor](https://gw.alipayobjects.com/zos/OasisHub/a3ac25e1-36fa-4994-bb24-37b837698478/baseColor.gif)

- 镜面反射控制高光部分的颜色和强度：

![specular](https://gw.alipayobjects.com/zos/OasisHub/cbda6aec-63e8-4665-b15e-28adaccd7f19/specular.gif)

- 法线控制视觉上面的 **凹凸感**：

![normal](https://gw.alipayobjects.com/zos/OasisHub/9e48930a-a231-416d-9cb0-7bacc675be0a/normal.gif)

### 3. PBR 材质

PBR 材质遵循能量守恒，是基于物理的渲染，也能设置基础颜色、法线等参数，但是不支持像 BlinnPhong 材质一样控制反光颜色和强度，因为这不符合能量守恒，但是可以通过金属度、粗糙度，更加方便地调节渲染效果，并且还可以反射周边的环境，参考 [环境光的 IBL 模式](${docs}light-cn#IBL模式)。

- 根据真实世界中光线与材质的交互，绝缘体，即当金属度为 0 时，材质也能反射大约 4% 纯色光线，从而渲染出周边环境，如下模型的头部：

![env](https://gw.alipayobjects.com/zos/OasisHub/c40a665d-9d37-46f1-9206-a29859be75a3/env.gif)

- 我们调节材质的金属度，可以发现，金属度越大，周围的环境越清晰，并且开始从白色纯色变成彩色。这是因为电介质，即金属度为 1 时，光线将 100% 全部反射出物体表面，即反射出彩色的周边环境：

![metal](https://gw.alipayobjects.com/zos/OasisHub/95562cce-618f-4093-a775-c6a03831c580/metal.gif)

- 真实世界中的大部分材质都是有粗糙度的，在微表面的理论基础上解释即为光线将从物体表面从四面八方反射出去，这样的话，即使金属度为 1，也不能清晰地反射周边环境：

![roughness](https://gw.alipayobjects.com/zos/OasisHub/a51d5eca-e0ae-4882-8941-2fd15c8e523a/roughness.gif)

所有材质类型都支持配置透明度相关：

![opacity](https://gw.alipayobjects.com/zos/OasisHub/7f93cca8-0e2f-4549-b02a-199a9ed36bfc/opacity.gif)
