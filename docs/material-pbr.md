---
order: 4
title: PBR Material
type: Graphics
group: Material
label: Graphics/Material
---

Engine and editor have fully advocated the use of PBR materials. **PBR means physically based rendering**, It was first proposed by Disney in 2012 and was later widely used in the game industry. Compared with traditional rendering methods such as **Blinn-Phong**, PBR follows the conservation of energy and conforms to the physical rules. Artists only need to adjust a few simple parameters to ensure the correct rendering effect even in complex scenes.

<playground src="pbr-helmet.ts"></playground>

## General Parameter

| Parameter | Feature |
| :-- | :-- |
| [baseColor](${api}core/PBRBaseMaterial#baseColor) | **baseColor** \* **baseTexture** = **final color**. base color is the albedo color of the material, different from traditional diffuse color, it will contribute to the color of the specular reflection and diffuse reflection, we can control the contribution ratio by the `metallicFactor` and `roughnessFactor`. |
| [emissiveColor](${api}core/PBRBaseMaterial#emissiveColor) | `emissiveColor` can make the color rendered even if there is no light. |
| [opacity](${api}core/PBRBaseMaterial#opacity) | When set to transparent mode, the transparency can be adjusted by `opacity`. |
| [baseTexture](${api}core/PBRBaseMaterial#baseTexture) | With the `baseColor`, it is a multiplied relationship. |
| [opacityTexture](${api}core/PBRBaseMaterial#opacityTexture) | With the `opacity`, it is a multiplied relationship. |
| [emissiveTexture](${api}core/PBRBaseMaterial#emissiveTexture) | With the `emissiveColor`, it is a multiplied relationship. |
| [normalTexture](${api}core/PBRBaseMaterial#normalTexture) | Normal texture can visually create a sense of bump, and the `normalIntensity` can also be used to control the degree of bumps. |
| [occlusionTexture](${api}core/PBRBaseMaterial#occlusionTexture) | `occlusionTexture` can enhance the shadow details of the object. |
| [tilingOffset](${api}core/PBRBaseMaterial#tilingOffset) | The scaling and offset of texture coordinates, is a `Vector4` data, which respectively controls the scaling and offset of texture coordinates in the uv direction. Refer to [Playground](${examples}tiling-offset).|
| [clearCoat](${api}core/PBRBaseMaterial#clearCoat) | The clear coat layer intensity, default 0, that is, do not turn on the clear coat effect. Refer to [Playground](${examples}pbr-clearcoat).|
| [clearCoatTexture](${api}core/PBRBaseMaterial#clearCoatTexture) | The clear coat layer intensity texture, With the `clearCoat`, it is a multiplied relationship. |
| [clearCoatRoughness](${api}core/PBRBaseMaterial#clearCoatRoughness) | The clear coat layer roughness.|
| [clearCoatRoughnessTexture](${api}core/PBRBaseMaterial#clearCoatRoughnessTexture) | The clear coat layer roughness texture. With the `clearCoatRoughness`, it is a multiplied relationship. |
| [clearCoatNormalTexture](${api}core/PBRBaseMaterial#clearCoatNormalTexture) | The clear coat normal texture, if not set it will share the normal of the original material. |

In addition to the above general parameters, PBR provides two workflows: **Metal-Roughness** and **Specular-Glossiness**, corresponding to [PBRMaterial](${api}core/PBRMaterial) and [PBRSpecularMaterial](${api}core/PBRSpecularMaterial).

## PBRMaterial

| Parameter | Feature |
| :-- | :-- |
| [metallicFactor](${api}core/PBRMaterial#metallicFactor) | Metal degree. The degree of metal of the material, the larger the metal value, the stronger the specular reflection, which can reflect more environments. |
| [roughnessFactor](${api}core/PBRMaterial#roughnessFactor) | Roughness degree. The degree of roughness of the material, the larger the roughness, the more uneven the micro surface, the more blurred the mirror reflection. |
| [metallicRoughnessTexture](${api}core/PBRMaterial#metallicRoughnessTexture) | Metal roughness texture, used with `metallicFactor` and `roughnessFactor`, it is a multiplied relationship. |
| [metallicTexture](${api}core/PBRMaterial#metallicTexture) | Metallic texture, used with `metallicFactor`, it is a multiplied relationship. |
| [roughnessTexture](${api}core/PBRMaterial#roughnessTexture) | Roughness texture, used with `roughnessFactor`, it is a multiplied relationship. |

<playground src="pbr-base.ts"></playground>

## PBRSpecularMaterial

| Parameter | Feature |
| :-- | :-- |
| [specularColor](${api}core/PBRSpecularMaterial#specularColor) | Different from the Metal-Roughness workflow, which calculates the specular reflection based on the `metallicFactor` and the `baseColor`, it directly uses the `specularColor` to express the specular reflection color. |
| [glossinessFactor](${api}core/PBRSpecularMaterial#glossinessFactor) | The degree of smoothness, opposite to roughness. |
| [specularGlossinessTexture](${api}core/PBRSpecularMaterial#specularGlossinessTexture) | Specular glossiness texture, used with `specularColor` and `glossinessFactor`, it is a multiplied relationship. |

> **Note**: If use PBR material, don't forget to turn on [IBL mode of ambient light](${docs}ambient-light#ibl) ~ Only after adding it, the roughness, metallic, specular reflection, physical conservation and global illumination belonging to PBR will show the effect