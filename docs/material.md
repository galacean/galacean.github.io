---
order: 3
title: Material
type: Graphics Rendering
group: Basic Rendering
---

## Material category

### 1. PBR general parameters

Engine and editor have fully advocated the use of PBR materials. **PBR means physically based rendering**, It was first proposed by Disney in 2012 and was later widely used in the game industry. Compared with traditional rendering methods such as **Blinn-Phong**, PBR follows the conservation of energy and conforms to the physical rules. Artists only need to adjust a few simple parameters to ensure the correct rendering effect even in complex scenes.

<playground src="pbr-helmet.ts"></playground>

**General parameter in PBR:**

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

### 2. PBRMaterial

| Parameter | Feature |
| :-- | :-- |
| [metallicFactor](${api}core/PBRMaterial#metallicFactor) | Metal degree. The degree of metal of the material, the larger the metal value, the stronger the specular reflection, which can reflect more environments. |
| [roughnessFactor](${api}core/PBRMaterial#roughnessFactor) | Roughness degree. The degree of roughness of the material, the larger the roughness, the more uneven the micro surface, the more blurred the mirror reflection. |
| [metallicRoughnessTexture](${api}core/PBRMaterial#metallicRoughnessTexture) | Metal roughness texture, used with `metallicFactor` and `roughnessFactor`, it is a multiplied relationship. |
| [metallicTexture](${api}core/PBRMaterial#metallicTexture) | Metallic texture, used with `metallicFactor`, it is a multiplied relationship. |
| [roughnessTexture](${api}core/PBRMaterial#roughnessTexture) | Roughness texture, used with `roughnessFactor`, it is a multiplied relationship. |

<playground src="pbr-base.ts"></playground>

### 3. PBRSpecularMaterial

| Parameter | Feature |
| :-- | :-- |
| [specularColor](${api}core/PBRSpecularMaterial#specularColor) | Different from the Metal-Roughness workflow, which calculates the specular reflection based on the `metallicFactor` and the `baseColor`, it directly uses the `specularColor` to express the specular reflection color. |
| [glossinessFactor](${api}core/PBRSpecularMaterial#glossinessFactor) | The degree of smoothness, opposite to roughness. |
| [specularGlossinessTexture](${api}core/PBRSpecularMaterial#specularGlossinessTexture) | Specular glossiness texture, used with `specularColor` and `glossinessFactor`, it is a multiplied relationship. |

> **Note**: If use PBR material, don't forget to turn on [IBL mode of ambient light](${docs}light#ibl) ~ Only after adding it, the roughness, metallic, specular reflection, physical conservation and global illumination belonging to PBR will show the effect.

### 4. BlinnPhongMaterial

Although [BlinnPhongMaterial](${api}core/BlinnPhongMaterial) is not based on physical rendering, its efficient rendering algorithm and basic complete optical part, there are still a lot of application scene.

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

<playground src="blinn-phong.ts"></playground>

### 5. UnlitMaterial

In some simple scenes, you may not want to calculate lighting. Oasis engine provides [UnlitMaterial](${api}core/UnlitMaterial), which uses the most streamlined shader code, and only needs to provide colors or textures to render.

| Parameter | Feature |
| :-- | :-- |
| [baseColor](${api}core/UnlitMaterial#baseColor) | **baseColor \* baseTexture = final color** |
| [baseTexture](${api}core/UnlitMaterial#baseTexture) | With the `baseColor`, it is a multiplied relationship. |
| [tilingOffset](${api}core/UnlitMaterial#tilingOffset) | The scaling and offset of texture coordinates, is a `Vector4` data, which respectively controls the scaling and offset of texture coordinates in the uv direction. Refer to [playground](${examples}tiling-offset) |

<playground src="unlit-material.ts"></playground>

## How to use material

Users can export [glTF file](https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md) by some software such as Unity, 3ds Max, C4D, Blender, etc. It contains resources such as scenes, entities, textures, animations, materials, etc. Oasis supports the use of [Resource Manager](${docs}resource-manager) to load and parse this glTF file. After parsing, the model has been automatically assigned the corresponding material. We can also get the material of the model and perform some post-processing, such as changing the color.

```typescript
// Get renderer
const renderer = entity.getComponent(MeshRenderer);
// Get the i-th material of the current renderer by `getMaterial`, the default is 0.
const material = renderer.getMaterial();
// change base color
material.baseColor.r = 0;
```

We can also directly replace the material type, for example, re-assign the model to a blinn-phong material:

```typescript
// Get renderer
const renderer = entity.getComponent(MeshRenderer);

// Create blinn-phong material
const material = new BlinnPhongMaterial(engine);
material.baseColor.r = 0;

// Set the i-th material of the current renderer by `setMaterial`, the default is 0.
const material = renderer.setMaterial(material);
```

## General parameter in material

The following parameters can be directly used in [UnlitMaterial](${api}core/UnlitMaterial), [BlinnPhongMaterial](${api}core/BlinnPhongMaterial), [PBRMaterial](${api}core/PBRMaterial), [PBRSpecularMaterial](${api}core/PBRSpecularMaterial).

| parameter | Feature |
| :-- | :-- |
| [isTransparent](${api}core/BaseMaterial#isTransparent) | You can set whether the material is transparent. If it is set to transparent, you can set the color blending mode by [BlendMode](${api}core/BaseMaterial#blendMode). |
| [alphaCutoff](${api}core/BaseMaterial#alphaCutoff) | You can set the transparency cutoff value to specify the value whose transparency is less than this value to be discarded in the fragment shader. |
| [renderFace](${api}core/BaseMaterial#renderFace) | Can decide to render the front, back or double side. |
| [blendMode](${api}core/BaseMaterial#blendMode) | After setting the material to be transparent, you can set this enumeration to determine the color blending mode, refer to [playground](${examples}blend-mode). |

## QA

### 1. Transparent rendering is abnormal?

- Please make sure that the transparency mode of the material is turned on, that is, the [isTransparent](${api}core/BaseMaterial#isTransparent) parameter of the material is set to `true`.
- The [baseColor](${api}core/BlinnPhongMaterial#baseColor) of the corresponding material needs to be set to the correct transparency. For example, `material.baseColor.a = 0.5`. The range of transparency is [0 ~ 1], the smaller the value, the more transparent.
- If you have uploaded a `opacityTexture`, please make sure that the `opacityTexture` contains the transparent channel, that is, a normal png image. If it is not, you can turn on `getOpacityFromRGB` to true, which means you want to sample the brightness value as the transparency.
- If the transparency rendering is still abnormal, please make sure that the color blending mode of the material ([blendMode](${api}core/BaseMaterial#blendMode)) is the desired combination.
- Some transparency rendering exceptions may be due to the fact that the back culling is not turned off. You can set the face you want to render by [renderFace](${api}core/BaseMaterial#renderFace).
- If it is a custom material, please make sure to set the correct blend mode, blend factor, turn off the depth writing, and set the correct render queue.

### 2. Why is the back side of the model not rendered?

- Please make sure to turn off the culling of the back side, which can be set by [RasterState.cullMode](${api}core/RasterState#cullMode), or by the built-in material parameter [renderFace](${api}core/BaseMaterial#renderFace).

### 3. How many lights usually need to add?

- Normal scenes only need to use the default ambient light ([AmbientLight](${api}core/AmbientLight)). It can support image-based lighting to achieve direct and indirect lighting, and it can also have ordinary color overlays.
- If the ambient light cannot meet the requirements, you can appropriately add directional light ([DirectLight](${api}core/DirectLight)) and point light ([PointLight](${api}core/PointLight)) to supplement the lighting details.
- For performance consideration, try not to exceed 4 direct lights.

### 4. Why the rendering is not three-dimensional enough?

- Use a reasonable combination of texture baking, normal texture ([normalTexture](${api}core/PBRMaterial#normalTexture)) and shadow masking texture ([occlusionTexture](${api}core/PBRMaterial#occlusionTexture))
