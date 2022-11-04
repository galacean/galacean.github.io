---
order: 3
title: Blinn-Phong Material
label: Graphics/Material
---

Although [BlinnPhongMaterial](${api}core/BlinnPhongMaterial) is not based on physical rendering, its efficient rendering algorithm and basic complete optical part, there are still a lot of application scene.

## General parameter

| Parameter | Feature |
| :-- | :-- |
| [baseColor](${api}core/BlinnPhongMaterial#baseColor) | **baseColor \* baseTexture = final color** |
| [baseTexture](${api}core/BlinnPhongMaterial#baseTexture) | With the `baseColor`, it is a multiplied relationship. |
| [specularColor](${api}core/BlinnPhongMaterial#specularColor) | **specularColor \* specularTexture = final specular color** |
| [specularTexture](${api}core/BlinnPhongMaterial#specularTexture) | With the `specularColor`, it is a multiplied relationship. |
| [normalTexture](${api}core/BlinnPhongMaterial#normalTexture) | Normal texture can visually create a sense of bump, and the `normalIntensity` can also be used to control the degree of bumps. |
| [normalIntensity ](${api}core/BlinnPhongMaterial#normalIntensity) | Control the degree of bumps. |
| [emissiveColor](${api}core/BlinnPhongMaterial#emissiveColor) | `emissiveColor` can make the color rendered even if there is no light. |
| [emissiveTexture](${api}core/BlinnPhongMaterial#emissiveTexture) | With the `emissiveColor`, it is a multiplied relationship. |
| [shininess](${api}core/BlinnPhongMaterial#shininess) | Specular reflection coefficient. The larger the value, the more convergent the specular reflection effect. |
| [tilingOffset](${api}core/BlinnPhongMaterial#tilingOffset) | The scaling and offset of texture coordinates, is a `Vector4` data, which respectively controls the scaling and offset of texture coordinates in the uv direction. Refer to [playground](${examples}tiling-offset) |

## How to use

<playground src="blinn-phong.ts"></playground>