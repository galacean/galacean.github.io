---
order: 7

title: Material resource

type: Editor
---

## Introduce

By the engine’s [Material Tutorial](${docs}material), you can learn that Oasis’ materials are divided into [PBR material](${api}core/PBRMaterial)(**recommended**), [PBR-Specular Material](${api}core/PBRSpecularMaterial), [BlinnPhong Material](${api}core/BlinnPhongMaterial), [Unlit Material](${api}core/UnlitMaterial) Four material types, the application of each material type are different. The PBR material is the default material standard of the glTF model, and the other types can also be imported through plug-ins.

- PBR material is suitable for application scenarios that require realistic rendering, because PBR is physically-based rendering, following energy conservation, and adopts a metal-roughness workflow. Developers can ensure the rendering effect by adjusting parameters such as metal, roughness, and lighting. All are physically correct.
- PBR-Specular material is another workflow relative to PBR: specular-glossiness workflow. The only difference is that the `metal` and `roughness` parameters of PBR are replaced by the `specular` and `glossiness` parameters.
- Blinn Phong material is suitable for scenes that do not have such high requirements for realism. Although it does not follow physics, its efficient rendering algorithm and basic optical parts can be applied to many scenes.
- The Unlit material is suitable for rendering the baked model. it only needs to set a `baseTexture` or `baseColor` to show the high-quality rendering results obtained by offline rendering, but the disadvantage is that it cannot display the light and shadow interaction in real time, because `UnlitMaterial` is rendered by the texture and is not affected by any lighting, please refer to [Baking Tutorial](${docs}artist-bake) and [Export Unlit Tutorial](${docs}artist-unlit) for details.

## Use

- If you import the glTF model, the corresponding type of resource will be automatically created, which contains the material, as shown below:

![image-20210719162230883](https://gw.alipayobjects.com/zos/OasisHub/d5626811-f20e-4b84-aa28-7c6909dc607b/image-20210719162230883.png)

- You can also manually create different types of materials in the resource panel:

![image-20210719175600845](https://gw.alipayobjects.com/zos/OasisHub/01f73e82-8be1-4568-baca-a7de3baf17fb/image-20210719175600845.png)

## Adjust the rendering effect

Generally, the materials imported by glTF have already bound the corresponding textures and parameters, and no operation is required. However, the editor supports secondary processing of materials, and the next step is to adjust the rendering effect for different material types.

### 1. Unlit material

As mentioned above, the Unlit material is not affected by light, you only need to set the baked texture:

![unlit](https://gw.alipayobjects.com/zos/OasisHub/e2639e60-a6ed-416d-9f53-064557261d14/unlit.gif)

Generally, the rendering effect of Unlit is very good, because it sets the high-quality texture obtained by the modeling software through offline rendering. If real-time changes in light are not required, this mode can be used in most scenes.

### 2. BlinnPhong material

BlinnPhong material is affected by the light, generally only need to set the **base color, specular, normal.**

- Base color control main tone:

![baseColor](https://gw.alipayobjects.com/zos/OasisHub/a3ac25e1-36fa-4994-bb24-37b837698478/baseColor.gif)

- The specular reflection controls the color and intensity of the highlight portion:

![specular](https://gw.alipayobjects.com/zos/OasisHub/cbda6aec-63e8-4665-b15e-28adaccd7f19/specular.gif)

- Normal controls the **bump sense** above the vision:

![normal](https://gw.alipayobjects.com/zos/OasisHub/9e48930a-a231-416d-9cb0-7bacc675be0a/normal.gif)

### 3. PBR material

The PBR material follows the conservation of energy and is based on physics. You can also set the basic color, normal and other parameters, but it does not support the control of the reflective color and intensity like the BlinnPhong material, because it does not comply with the conservation of energy, however, the rendering effect can be adjusted more conveniently through the `metallicFactor` and `roughness`, and it can also reflect the surrounding environment. Refer to [IBL mode of ambient light](${docs}light#IBL).

- According to the interaction between light and material in the real world, the insulator, that is, when the `metallicFactor` is 0, the material can also reflect about 4% of pure color light, thereby rendering the surrounding environment, such as the head of the model:

![env](https://gw.alipayobjects.com/zos/OasisHub/c40a665d-9d37-46f1-9206-a29859be75a3/env.gif)

- When we adjust the `metallicFactor` of the material, we can find that the greater the metal, the clearer the surrounding environment, and it starts to change from a pure white color to a colorful one. This is because the dielectric, that is, when the `metallicFactor` is 1, the light will be 100% reflected off the surface of the model, that is, the colorful surrounding environment will be reflected:

![metal](https://gw.alipayobjects.com/zos/OasisHub/95562cce-618f-4093-a775-c6a03831c580/metal.gif)

- Most materials in the real world have roughness. The explanation based on the theory of micro-surface means that light will be reflected from the surface of the model from all directions. In this case, even if the `metallicFactor` is 1, it cannot clearly reflect the surrounding environment:

![roughness](https://gw.alipayobjects.com/zos/OasisHub/a51d5eca-e0ae-4882-8941-2fd15c8e523a/roughness.gif)

All material types support configuration transparency related:

![opacity](https://gw.alipayobjects.com/zos/OasisHub/7f93cca8-0e2f-4549-b02a-199a9ed36bfc/opacity.gif)
