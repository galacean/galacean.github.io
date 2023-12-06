---
order: 1
title: Unlit 材质
type: 图形
group: 材质
label: Graphics/Material
---

在一些简单的场景中，可能不希望计算光照，引擎提供了 [UnlitMaterial](${api}core/UnlitMaterial)，使用了最精简的 shader 代码，只需要提供颜色或者纹理即可渲染。Unlit 材质适用于烘焙好的模型渲染，它只需要设置一张基本纹理或者颜色，即可展现离线渲染得到的高质量渲染结果，但是缺点是无法实时展现光影交互，因为 Unlit 由纹理决定渲染，不受任何光照影响，可参考 [烘焙教程](${docs}artist-bake-cn) 和 [导出 Unlit 教程](${docs}artist-unlit-cn)。

## 编辑器使用
<img src="https://gw.alipayobjects.com/zos/OasisHub/6be78a08-3075-4cd1-8cad-9757fc34f695/unlit.gif" alt="unlit" style="zoom:100%;" />

## 脚本使用

<playground src="unlit-material.ts"></playground>

## 参数

| 参数 | 应用 |
| :-- | :-- |
| [baseColor](${api}core/UnlitMaterial#baseColor) | 基础颜色。**基础颜色 \* 基础颜色纹理 = 最后的颜色。** |
| [baseTexture](${api}core/UnlitMaterial#baseTexture) | 基础纹理。搭配基础颜色使用，是个相乘的关系。 |
| [tilingOffset](${api}core/UnlitMaterial#tilingOffset) | 纹理坐标的缩放与偏移。是一个 Vector4 数据，分别控制纹理坐标在 uv 方向上的缩放和偏移，参考 [案例](${examples}tiling-offset) |
