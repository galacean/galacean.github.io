---
order: 2
title: Unlit Material
type: Graphics
group: Material
---

In some simple scenes, you may not want to calculate lighting. Oasis engine provides [UnlitMaterial](${api}core/UnlitMaterial), which uses the most streamlined shader code, and only needs to provide colors or textures to render.

## General Parameter

| Parameter | Feature |
| :-- | :-- |
| [baseColor](${api}core/UnlitMaterial#baseColor) | **baseColor \* baseTexture = final color** |
| [baseTexture](${api}core/UnlitMaterial#baseTexture) | With the `baseColor`, it is a multiplied relationship. |
| [tilingOffset](${api}core/UnlitMaterial#tilingOffset) | The scaling and offset of texture coordinates, is a `Vector4` data, which respectively controls the scaling and offset of texture coordinates in the uv direction. Refer to [playground](${examples}tiling-offset) |

## How to use

<playground src="unlit-material.ts"></playground>