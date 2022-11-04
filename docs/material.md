---
order: 1
title: Material
type: Graphics
group: Material
label: Graphics/Material
---

## Material category

| type                                              | description                      |
| :------------------------------------------------ | :------------------------------- |
| [UnlitMaterial](${docs}material-unlit)            | Rendering with color and texture only, no brightness calculation |
| [BlinnPhongMaterial](${docs}material-blinn-phong) | The optics are basically complete, and the rendering algorithm is efficient       |
| [PBRMaterial](${docs}material-pbr)              | Follow the conservation of energy and comply with the laws of physics       |
| [Custom Material](${docs}custom-material)          | Customizable for special rendering needs             |

## General parameter

The following parameters can be directly used in [UnlitMaterial](${api}core/UnlitMaterial), [BlinnPhongMaterial](${api}core/BlinnPhongMaterial), [PBRMaterial](${api}core/PBRMaterial), [PBRSpecularMaterial](${api}core/PBRSpecularMaterial).

| parameter | Feature |
| :-- | :-- |
| [isTransparent](${api}core/BaseMaterial#isTransparent) | You can set whether the material is transparent. If it is set to transparent, you can set the color blending mode by [BlendMode](${api}core/BaseMaterial#blendMode). |
| [alphaCutoff](${api}core/BaseMaterial#alphaCutoff) | You can set the transparency cutoff value to specify the value whose transparency is less than this value to be discarded in the fragment shader. |
| [renderFace](${api}core/BaseMaterial#renderFace) | Can decide to render the front, back or double side. |
| [blendMode](${api}core/BaseMaterial#blendMode) | After setting the material to be transparent, you can set this enumeration to determine the color blending mode, refer to [playground](${examples}blend-mode). |

## How to use

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

We can also directly replace the texture of the material, such as replacing the base color map for the blinn-phong material:

```typescript
// Get renderer
const renderer = entity.getComponent(MeshRenderer);
// Get material
const material = renderer.getMaterial();
// Set base texture
material.baseTexture = await engine.resourceManager
  .load<Texture2D>({
    url: "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*ApFPTZSqcMkAAAAAAAAAAAAAARQnAQ",
    type: AssetType.Texture2D
  });
```

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
