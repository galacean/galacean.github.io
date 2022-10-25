---
order: 3
title: Blinn-Phong 材质
type: 图形
group: 材质
label: Graphics/Material
---

[BlinnPhongMaterial](${api}core/BlinnPhongMaterial) 虽然不是基于物理渲染，但是其高效的渲染算法和基本齐全的光学部分，还是有很多的应用场景。

## 常用参数

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

## 使用

<playground src="blinn-phong.ts"></playground>