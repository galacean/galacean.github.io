---
order: 4
title: PBR 材质
type: 图形渲染
group: 材质
---

引擎和编辑器全面提倡使用 PBR 材质 。PBR 全称是 **Physically Based Rendering**，中文意思是**基于物理的渲染**，最早由迪士尼在 2012 年提出，后来被游戏界广泛使用。跟传统的 **Blinn-Phong** 等渲染方法相比，PBR 遵循能量守恒，符合物理规则，美术们只需要调整几个简单的参数，即使在复杂的场景中也能保证正确的渲染效果。

<playground src="pbr-helmet.ts"></playground>

## 通用参数

| 参数 | 应用 |
| :-- | :-- |
| [baseColor](${api}core/PBRBaseMaterial#baseColor) | 基础颜色。**基础颜色** \* **基础颜色纹理** = **最后的基础颜色**。基础颜色是物体的反照率值,与传统的漫反射颜色不同，它会同时贡献镜面反射和漫反射的颜色，我们可以通过上面提到过的金属度、粗糙度，来控制贡献比。 |
| [emissiveColor](${api}core/PBRBaseMaterial#emissiveColor) | 自发光颜色。使得即使没有光照也能渲染出颜色。 |
| [baseTexture](${api}core/PBRBaseMaterial#baseTexture) | 基础颜色纹理。搭配基础颜色使用，是个相乘的关系。 |
| [normalTexture](${api}core/PBRBaseMaterial#normalTexture) | 法线纹理。可以设置法线纹理 ，在视觉上造成一种凹凸感，还可以通过法线强度来控制凹凸程度。 |
| [emissiveTexture](${api}core/PBRBaseMaterial#emissiveTexture) | 自发射光纹理。我们可以设置自发光纹理和自发光颜色（[emissiveFactor](${api}core/PBRBaseMaterial#emissiveTexture)）达到自发光的效果，即使没有光照也能渲染出颜色。 |
| [occlusionTexture](${api}core/PBRBaseMaterial#occlusionTexture) | 阴影遮蔽纹理。我们可以设置阴影遮蔽纹理来提升物体的阴影细节。 |
| [tilingOffset](${api}core/PBRBaseMaterial#tilingOffset) | 纹理坐标的缩放与偏移。是一个 Vector4 数据，分别控制纹理坐标在 uv 方向上的缩放和偏移，参考 [案例](${examples}tiling-offset) |
| [clearCoat](${api}core/PBRBaseMaterial#clearCoat) | 透明涂层的强度，默认为0，既不开启透明涂层效果，参考 [案例](${examples}pbr-clearcoat) 。|
| [clearCoatTexture](${api}core/PBRBaseMaterial#clearCoatTexture) | 透明涂层强度纹理，和 clearCoat 是相乘的关系。 |
| [clearCoatRoughness](${api}core/PBRBaseMaterial#clearCoatRoughness) | 透明涂层的粗糙度。|
| [clearCoatRoughnessTexture](${api}core/PBRBaseMaterial#clearCoatRoughnessTexture) | 透明涂层粗糙度纹理，和 clearCoatRoughness 是相乘的关系。 |
| [clearCoatNormalTexture](${api}core/PBRBaseMaterial#clearCoatNormalTexture) | 透明涂层法线纹理，如果没有设置则会共用原材质的法线。|


除了以上通用参数，PBR 提供了 **金属-粗糙度** 和 **高光-光泽度** 两种工作流，分别对应 [PBRMaterial](${api}core/PBRMaterial) 和 [PBRSpecularMaterial](${api}core/PBRSpecularMaterial)。

## PBRMaterial

| 参数 | 应用 |
| :-- | :-- |
| [metallic](${api}core/PBRMaterial#metallic) | 金属度。模拟材质的金属程度，金属值越大，镜面反射越强，即能反射更多周边环境。 |
| [roughness](${api}core/PBRMaterial#roughness) | 粗糙度。模拟材质的粗糙程度，粗糙度越大，微表面越不平坦，镜面反射越模糊。 |
| [roughnessMetallicTexture](${api}core/PBRMaterial#roughnessMetallicTexture) | 金属粗糙度纹理。搭配金属粗糙度使用，是相乘的关系。 |

<playground src="pbr-base.ts"></playground>

## PBRSpecularMaterial

| 参数 | 应用 |
| :-- | :-- |
| [specularColor](${api}core/PBRSpecularMaterial#specularColor) | 高光度。不同于金属粗糙度工作流的根据金属度和基础颜色计算镜面反射，而是直接使用高光度来表示镜面反射颜色。(注，只有关闭金属粗糙工作流才生效) |
| [glossiness](${api}core/PBRSpecularMaterial#glossiness) | 光泽度。模拟光滑程度，与粗糙度相反。(注，只有关闭金属粗糙工作流才生效) |
| [specularGlossinessTexture](${api}core/PBRSpecularMaterial#specularGlossinessTexture) | 高光光泽度纹理。搭配高光光泽度使用，是相乘的关系。 |

> **注**：如果您使用了 PBR 材质，千万别忘了开启[环境光的 IBL 模式](${docs}light-cn#ibl-模式)～只有添加了之后，属于 PBR 的金属粗糙度、镜面反射、物理守恒、全局光照才会展现出效果。