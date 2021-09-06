---
order: 3
title: 材质
type: 资源系统
---

## 材质分类

### 1. PBR 通用参数

引擎和编辑器全面提倡使用 PBR 材质 。PBR 全称是 **Physically Based Rendering**，中文意思是**基于物理的渲染**，最早由迪士尼在 2012 年提出，后来被游戏界广泛使用。跟传统的 **Blinn-Phong** 等渲染方法相比，PBR 遵循能量守恒，符合物理规则，美术们只需要调整几个简单的参数，即使在复杂的场景中也能保证正确的渲染效果。

<playground src="pbr-helmet.ts"></playground>

**通用参数介绍:**

| 参数 | 应用 |
| :-- | :-- |
| [baseColor](${api}core/PBRBaseMaterial#baseColor) | 基础颜色。**基础颜色** \* **基础颜色纹理** = **最后的基础颜色**。基础颜色是物体的反照率值,与传统的漫反射颜色不同，它会同时贡献镜面反射和漫反射的颜色，我们可以通过上面提到过的金属度、粗糙度，来控制贡献比。 |
| [emissiveColor](${api}core/PBRBaseMaterial#emissiveColor) | 自发光颜色。使得即使没有光照也能渲染出颜色。 |
| [baseTexture](${api}core/PBRBaseMaterial#baseTexture) | 基础颜色纹理。搭配基础颜色使用，是个相乘的关系。 |
| [normalTexture](${api}core/PBRBaseMaterial#normalTexture) | 法线纹理。可以设置法线纹理 ，在视觉上造成一种凹凸感，还可以通过法线强度来控制凹凸程度。 |
| [emissiveTexture](${api}core/PBRBaseMaterial#emissiveTexture) | 自发射光纹理。我们可以设置自发光纹理和自发光颜色（[emissiveFactor](${api}core/PBRBaseMaterial#emissiveTexture)）达到自发光的效果，即使没有光照也能渲染出颜色。 |
| [occlusionTexture](${api}core/PBRBaseMaterial#occlusionTexture) | 阴影遮蔽纹理。我们可以设置阴影遮蔽纹理来提升物体的阴影细节。 |
| [tilingOffset](${api}core/PBRBaseMaterial#tilingOffset) | 纹理坐标的缩放与偏移。是一个 Vector4 数据，分别控制纹理坐标在 uv 方向上的缩放和偏移，参考 [案例](${examples}tiling-offset) |

除了以上通用参数，PBR 提供了 **金属-粗糙度** 和 **高光-光泽度** 两种工作流，分别对应 [PBRMaterial](${api}core/PBRMaterial) 和 [PBRSpecularMaterial](${api}core/PBRSpecularMaterial)。

### 2. PBRMaterial

| 参数 | 应用 |
| :-- | :-- |
| [metallic](${api}core/PBRMaterial#metallic) | 金属度。模拟材质的金属程度，金属值越大，镜面反射越强，即能反射更多周边环境。 |
| [roughness](${api}core/PBRMaterial#roughness) | 粗糙度。模拟材质的粗糙程度，粗糙度越大，微表面越不平坦，镜面反射越模糊。 |
| [roughnessMetallicTexture](${api}core/PBRMaterial#roughnessMetallicTexture) | 金属粗糙度纹理。搭配金属粗糙度使用，是相乘的关系。 |

<playground src="pbr-base.ts"></playground>

### 3. PBRSpecularMaterial

| 参数 | 应用 |
| :-- | :-- |
| [specularColor](${api}core/PBRSpecularMaterial#specularColor) | 高光度。不同于金属粗糙度工作流的根据金属度和基础颜色计算镜面反射，而是直接使用高光度来表示镜面反射颜色。(注，只有关闭金属粗糙工作流才生效) |
| [glossiness](${api}core/PBRSpecularMaterial#glossiness) | 光泽度。模拟光滑程度，与粗糙度相反。(注，只有关闭金属粗糙工作流才生效) |
| [specularGlossinessTexture](${api}core/PBRSpecularMaterial#specularGlossinessTexture) | 高光光泽度纹理。搭配高光光泽度使用，是相乘的关系。 |

> **注**：如果您使用了 PBR 材质，千万别忘了开启[环境光的 IBL 模式](${docs}light-cn#ibl-镜面反射)～只有添加了之后，属于 PBR 的金属粗糙度、镜面反射、物理守恒、全局光照才会展现出效果。

### 4. BlinnPhongMaterial

[BlinnPhongMaterial](${api}core/BlinnPhongMaterial) 虽然不是基于物理渲染，但是其高效的渲染算法和基本齐全的光学部分，还是有很多的应用场景。

**常用参数介绍**

| 参数 | 应用 |
| :-- | :-- |
| [baseColor](${api}core/BlinnPhongMaterial#baseColor) | 基础颜色。 **基础颜色 \* 基础纹理 = 最后的基础颜色。** |
| [baseTexture](${api}core/BlinnPhongMaterial#baseTexture) | 基础纹理。搭配基础颜色使用，是个相乘的关系。 |
| [specularColor](${api}core/BlinnPhongMaterial#specularColor) | 镜面反射颜色。**镜面反射颜色 \* 镜面反射纹理 = 最后的镜面反射颜色。** |
| [specularTexture](${api}core/BlinnPhongMaterial#specularTexture) | 镜面反射纹理。搭配镜面反射颜色使用，是个相乘的关系。 |
| [normalTexture](${api}core/BlinnPhongMaterial#normalTexture) | 法线纹理。可以设置法线纹理 ，在视觉上造成一种凹凸感，还可以通过法线强度来控制凹凸程度。 |
| [normalIntensity ](${api}core/BlinnPhongMaterial#normalIntensity) | 法线强度。法线强度，用来控制凹凸程度。 |
| [emissiveColor](${api}core/BlinnPhongMaterial#emissiveColor) | 自发光颜色。**自发光颜色 \* 自发光纹理 = 最后的自发光颜色。即使没有光照也能渲染出颜色。** |
| [emissiveTexture](${api}core/BlinnPhongMaterial#emissiveTexture) | 自发光纹理。搭配自发光颜色使用，是个相乘的关系。 |
| [shininess](${api}core/BlinnPhongMaterial#shininess) | 镜面反射系数。值越大镜面反射效果越聚拢。 |
| [tilingOffset](${api}core/BlinnPhongMaterial#tilingOffset) | 纹理坐标的缩放与偏移。是一个 Vector4 数据，分别控制纹理坐标在 uv 方向上的缩放和偏移，参考 [案例](${examples}tiling-offset) |

<playground src="blinn-phong.ts"></playground>

### 5. UnlitMaterial

在一些简单的场景中，可能不希望计算光照，引擎提供了 [UnlitMaterial](${api}core/UnlitMaterial)，使用了最精简的 shader 代码，只需要提供颜色或者纹理即可渲染。

| 参数 | 应用 |
| :-- | :-- |
| [baseColor](${api}core/UnlitMaterial#baseColor) | 基础颜色。**基础颜色 \* 基础颜色纹理 = 最后的颜色。** |
| [baseTexture](${api}core/UnlitMaterial#baseTexture) | 基础纹理。搭配基础颜色使用，是个相乘的关系。 |
| [tilingOffset](${api}core/UnlitMaterial#tilingOffset) | 纹理坐标的缩放与偏移。是一个 Vector4 数据，分别控制纹理坐标在 uv 方向上的缩放和偏移，参考 [案例](${examples}tiling-offset) |

<playground src="unlit-material.ts"></playground>

## 如何使用材质

用户在 Unity、3ds Max、C4D、Blender 等建模软件调试后可以输出 [glTF 文件](https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md)，GLTF 文件里面包含了场景、模型实体、纹理、动画、材质等资源，Oasis 支持使用[资源管理器](${docs}resource-manager-cn)加载解析这个 glTF 文件，解析后模型已经自动赋予了对应的材质，我们也可以拿到模型的材质，进行一些后期加工，比如修改颜色。

```typescript
// 获取想要修改的 renderer
const renderer = entity.getComponent(MeshRenderer);
// 通过 `getMaterial` 获取当前 renderer 的第 i 个材质, 默认第 0 个。
const material = renderer.getMaterial();
// 修改材质颜色
material.baseColor.r = 0;
```

我们也可以直接替换材质类型，比如将模型重新赋予一个 blinn-phong 材质：

```typescript
// 获取想要修改的 renderer
const renderer = entity.getComponent(MeshRenderer);

// 创建 blinn-phong 材质
const material = new BlinnPhongMaterial(engine);
material.baseColor.r = 0;

// 通过 `setMaterial` 设置当前 renderer 的第 i 个材质, 默认第 0 个。
const material = renderer.setMaterial(material);
```

## 材质通用属性

以下属性都可以直接在 [UnlitMaterial](${api}core/UnlitMaterial)、[BlinnPhongMaterial](${api}core/BlinnPhongMaterial)、[PBRMaterial](${api}core/PBRMaterial)、[PBRSpecularMaterial](${api}core/PBRSpecularMaterial) 材质中使用。

| 参数 | 应用 |
| :-- | :-- |
| [isTransparent](${api}core/BaseMaterial#isTransparent) | 是否透明。可以设置材质是否透明。如果设置为透明，可以通过 [BlendMode](${api}core/BaseMaterial#blendMode) 来设置颜色混合模式。 |
| [alphaCutoff](${api}core/BaseMaterial#alphaCutoff) | 透明度裁剪值。可以设置裁剪值，来指定在着色器中，裁剪透明度小于此数值的片元。 |
| [renderFace](${api}core/BaseMaterial#renderFace) | 渲染面。可以决定渲染正面、背面、双面。 |
| [blendMode](${api}core/BaseMaterial#blendMode) | 颜色混合模式。当设置材质为透明后，可以设置此枚举来决定颜色混合模式，参考 [案例](${examples}blend-mode) |

## 常见 QA

### 1. 透明渲染异常？

- 请先确保材质开启了透明度模式，即材质的 [isTransparent](${api}core/BaseMaterial#isTransparent) 属性设置为了 `true`。
- 相应的材质的 [baseColor](${api}core/BlinnPhongMaterial#baseColor) 需要设置正确的透明度。如 `material.baseColor.a = 0.5`。透明度范围为 【0 ～ 1】，数值越小，越透明。
- 如果透明度渲染仍有异常，请确保材质的颜色混合度模式（[blendMode](${api}core/BaseMaterial#blendMode)）为期望的组合。
- 有一些透明度渲染异常可能是因为没有关闭背面剔除，可以通过 [renderFace](${api}core/BaseMaterial#renderFace) 来设置想要渲染的面。
- 如果是自定义材质，请确保设置了正确的混合模式，混合因子，关闭了深度写入，设置了正确的渲染队列。

### 2. 为什么模型背面没有渲染？

- 请确保关闭背面了剔除，可以通过 [RasterState.cullMode](${api}core/RasterState#cullMode) 来设置，也可以通过材质内置的 [renderFace](${api}core/BaseMaterial#renderFace) 来设置想要渲染的面。

### 3. 一般需要打几个光？

- 一般场景只需要使用默认的环境光（[AmbientLight](${api}core/AmbientLight)）就可以了，它可以支持基于图片的照明实现直接光照和间接光照,也可以拥有普通的颜色叠加。
- 如果 环境光 无法满足需求，可以适当添加方向光（[DirectLight](${api}core/DirectLight)）和点光源（[PointLight](${api}core/PointLight)）来补充光照细节。
- 出于性能考虑，尽量不要超过 4 个直接光 。

### 4. 为什么渲染的不够立体？

- 合理搭配使用纹理烘焙、 法线纹理（[normalTexture](${api}core/PBRMaterial#normalTexture)）、阴影遮蔽纹理（[occlusionTexture](${api}core/PBRMaterial#occlusionTexture)）
