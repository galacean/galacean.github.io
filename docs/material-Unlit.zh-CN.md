---
order: 2
title: Unlit 材质
type: 图形
group: 材质
---

在一些简单的场景中，可能不希望计算光照，引擎提供了 [UnlitMaterial](${api}core/UnlitMaterial)，使用了最精简的 shader 代码，只需要提供颜色或者纹理即可渲染。

## 常用参数介绍

| 参数 | 应用 |
| :-- | :-- |
| [baseColor](${api}core/UnlitMaterial#baseColor) | 基础颜色。**基础颜色 \* 基础颜色纹理 = 最后的颜色。** |
| [baseTexture](${api}core/UnlitMaterial#baseTexture) | 基础纹理。搭配基础颜色使用，是个相乘的关系。 |
| [tilingOffset](${api}core/UnlitMaterial#tilingOffset) | 纹理坐标的缩放与偏移。是一个 Vector4 数据，分别控制纹理坐标在 uv 方向上的缩放和偏移，参考 [案例](${examples}tiling-offset) |

## 使用

<playground src="unlit-material.ts"></playground>