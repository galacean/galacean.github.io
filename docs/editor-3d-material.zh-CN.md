---
order: 2
title: 材质
type: 功能
group: 3D 渲染
label: Editor-Feature/Rendering-3d
---

## 介绍

在上文提到，模型由网格和材质组成。网格相当于骨架，描绘出模型的轮廓；材质相当于血肉，决定了渲染表现。

通过引擎的 [材质教程](${docs}material-cn) 中可以了解到 Galacean 的标准材质分为 [PBR 材质](${api}core/PBRMaterial)(**推荐**)、[PBR-Specular 材质](${api}core/PBRSpecularMaterial)、[BlinnPhong 材质](${api}core/BlinnPhongMaterial)、 [Unlit 材质](${api}core/UnlitMaterial) 四种材质类型，每种材质类型的应用场景都不一样，其中 PBR 材质为 glTF 模型默认材质标准，其余的类型也可以通过插件方式导入。

- PBR 材质适合需要真实感渲染的应用场景，因为 PBR 是基于物理的渲染，遵循能量守恒，采用金属度-粗糙度工作流，开发者通过调整金属度、粗糙度、灯光等参数，能够保证渲染效果都是物理正确的。
- PBR-Specular 材质是相对于 PBR 的另外一种工作流： 高光-光泽度工作流。唯一的区别就是通过高光、光泽度参数，替代了 PBR 的金属度、粗糙度 参数。
- Blinn Phong 材质适用于那些对真实感没有那么高要求的场景，虽然没有遵循物理，但是其高效的渲染算法和基本齐全的光学部分，可以适用很多的场景。
- Unlit 材质适用于烘焙好的模型渲染，她只需要设置一张基本纹理或者颜色，即可展现离线渲染得到的高质量渲染结果，但是缺点是无法实时展现光影交互，因为 Unlit 由纹理决定渲染，不受任何光照影响，可参考 [烘焙教程](${docs}artist-bake-cn) 和 [导出 Unlit 教程](${docs}artist-unlit-cn)。

另外，[galacean-engine-toolkit 仓库](https://www.npmjs.com/package/@galacean/engine-toolkit) 还提供了 [Bake PBR](https://github.com/galacean/engine-toolkit/blob/dev/1.0/packages/custom-material/src/bake-pbr/BakePBRMaterial.ts) 作为 lightmap 的过渡方案，与 PBR 相比，只增加了一张 `lightmapTexture` 和 `lightmapIntensity`，用来存储光照和阴影信息，替换间接漫反射部分的计算，非常适用于那些需要大量光影计算，但是保持静态的场景。

## 使用

一般情况下，模型已经自动绑定好材质和相应的纹理，用户可以不用做任何操作；但是在一定场景下，开发者可能想要手动微调材质，比如修改颜色，那么我们可以将原材质进行复制，即点击 `duplicate & remap`， 即可在原材质参数的基础上进行修改， 当然，您也可以手动创建新的材质球进行绑定:

![img](https://gw.alipayobjects.com/zos/OasisHub/2c50e9b8-8a59-4422-9a49-762c3973c93d/1673942497459-c6c38ac5-fac7-4b62-a836-d0d89115fd27.gif)

## 切换着色器（Shader）

创建完材质之后，我们通过切换着色器来实现上面说的不同材质功能，并且共用一部分属性，比如基础颜色，如果设置为红色，那么即使切换着色器，基础颜色仍为红色。

<img src="https://gw.alipayobjects.com/zos/OasisHub/34b16fb7-bcde-458d-b8ae-33d7badee344/image-20230314180037650.png" alt="image-20230314180037650" style="zoom:50%;" />

### 1. unlit

正如上文所说， Unlit 不受光照影响，只需要设置烘焙好的纹理即可：

![unlit](https://gw.alipayobjects.com/zos/OasisHub/c6b8ebe2-ca84-4758-9702-89877106e1fb/unlit.gif)

一般 Unlit 的渲染效果非常不错，因为设置的是建模软件通过离线渲染得到的高质量纹理。如果不需要光线的实时变化，则大部分场景都可以使用此模式。

### 2. blinn-phong

blinn-phong 受光照的影响，会随着视线、光照的变化而呈现不同的镜面反射。

- **基础颜色**：控制主色调：
- **镜面反射**：控制高光部分的颜色和强度：
- **法线**：控制视觉上面的 **凹凸感**：

![blinn-phong](https://gw.alipayobjects.com/zos/OasisHub/7f2c52e2-87bb-4474-a47e-e5d7cbf9a301/blinn-phong.gif)

### 3. pbr

PBR 遵循能量守恒，是基于物理的渲染，能设置基础颜色、法线等参数，通过金属度、粗糙度等参数，更加方便地调节渲染效果，并且最重要的是引入了 [环境光](${docs}light-cn#ibl-镜面反射)，可以随着金属、粗糙度的变化，模拟材质的属性反射周边的环境。

- 根据真实世界中光线与材质的交互，绝缘体（即当金属度为 0 时）材质也能反射大约 4% 纯色光线，从而渲染出周边环境，如下模型金属度为 0 但是还能隐约看到反射的周边环境：

![](https://gw.alipayobjects.com/zos/OasisHub/215c982e-d9d4-412e-85a5-706cfc872523/image-20230117171617164.png)

- 我们调节材质的金属度，可以发现，金属度越大，周围的环境越清晰，并且开始从白色纯色变成彩色。这是因为电介质（即金属度为 1 时）材质会将光线 100% 全部反射出物体表面，即反射出彩色的周边环境：

![metallic](https://gw.alipayobjects.com/zos/OasisHub/fe19c2c4-109d-40c1-94b0-fdd3c69f00b1/metallic.gif)

- 真实世界中的大部分材质都是有粗糙度的，在微表面的理论基础上解释即为光线将从物体表面从四面八方反射出去，即越粗糙，光线反射波瓣越大：

![roughness](https://gw.alipayobjects.com/zos/OasisHub/5009c529-7d5d-41c0-8f16-c19a7eff347b/roughness.gif)

除此之外，还有很多通用属性可以配置，比如环境遮蔽，自发射光，透明度等等：

![other](https://gw.alipayobjects.com/zos/OasisHub/dc6e52f6-1a85-44bd-9f1f-f26228889e10/other.gif)

### 4. Bake PBR( lightmap 过渡方案 )

![image-20230315140608854](https://gw.alipayobjects.com/zos/OasisHub/1f1a0a6d-e404-458c-a251-37f71b92ea0c/image-20230315140608854.png)
