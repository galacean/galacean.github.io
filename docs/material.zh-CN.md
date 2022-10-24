---
order: 1
title: 材质总览
type: 图形
group: 材质
label: Graphics/Material
---

Oasis 创建的三维世界与真实的世界一样包含各式各样的物体，这些物体的颜色，色泽亮度，透明度都是由材质决定的，引擎中内置了多种经典材质并支持开发者实现自定义材质。

## 分类

| 类型                 | 描述                             |
| :------------------- | :------------------------------- |
| [Unlit 材质](${docs}material-unlit-cn)       | 仅使用颜色与纹理渲染，不计算光照 |
| [Blinn-Phong 材质](${docs}material-blinn-phong-cn) | 光学基本齐全，渲染算法高效       |
| [PBR 材质](${docs}material-pbr-cn)         | 遵循能量守恒，符合物理规则       |
| [自定义材质](${docs}custom-material-cn)       | 可定制特殊的渲染需求             |

## 通用属性

以下属性都可以直接在 [UnlitMaterial](${api}core/UnlitMaterial)、[BlinnPhongMaterial](${api}core/BlinnPhongMaterial)、[PBRMaterial](${api}core/PBRMaterial)、[PBRSpecularMaterial](${api}core/PBRSpecularMaterial) 材质中使用。

| 参数 | 应用 |
| :-- | :-- |
| [isTransparent](${api}core/BaseMaterial#isTransparent) | 是否透明。可以设置材质是否透明。如果设置为透明，可以通过 [BlendMode](${api}core/BaseMaterial#blendMode) 来设置颜色混合模式。 |
| [alphaCutoff](${api}core/BaseMaterial#alphaCutoff) | 透明度裁剪值。可以设置裁剪值，来指定在着色器中，裁剪透明度小于此数值的片元。 |
| [renderFace](${api}core/BaseMaterial#renderFace) | 渲染面。可以决定渲染正面、背面、双面。 |
| [blendMode](${api}core/BaseMaterial#blendMode) | 颜色混合模式。当设置材质为透明后，可以设置此枚举来决定颜色混合模式，参考 [案例](${examples}blend-mode) |

## 使用

用户在 Unity、3ds Max、C4D、Blender 等建模软件调试后可以输出 [glTF 文件](https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md)，glTF 文件里面包含了场景、模型实体、纹理、动画、材质等资源，Oasis 支持使用[资源管理器](${docs}resource-manager-cn)加载解析这个 glTF 文件，解析后模型已经自动赋予了对应的材质，我们也可以拿到模型的材质，进行一些后期加工，比如修改颜色。

```typescript
// 获取想要修改的 renderer
const renderer = entity.getComponent(MeshRenderer);
// 通过 `getMaterial` 获取当前 renderer 的第 i 个材质, 默认第 0 个。
const material = renderer.getMaterial();
// 修改材质颜色
material.baseColor.r = 0;
```

我们也可以直接替换材质类型，比如将模型重新赋予一个 blinn-phong 材质：

```typescript
// 获取想要修改的 renderer
const renderer = entity.getComponent(MeshRenderer);

// 创建 blinn-phong 材质
const material = new BlinnPhongMaterial(engine);
material.baseColor.r = 0;

// 通过 `setMaterial` 设置当前 renderer 的第 i 个材质, 默认第 0 个。
const material = renderer.setMaterial(material);
```

## 常见 QA

### 1. 透明渲染异常？

- 请先确保材质开启了透明度模式，即材质的 [isTransparent](${api}core/BaseMaterial#isTransparent) 属性设置为了 `true`。
- 相应的材质的 [baseColor](${api}core/BlinnPhongMaterial#baseColor) 需要设置正确的透明度。如 `material.baseColor.a = 0.5`。透明度范围为 【0 ～ 1】，数值越小，越透明。
- 如果透明度渲染仍有异常，请确保材质的颜色混合度模式（[blendMode](${api}core/BaseMaterial#blendMode)）为期望的组合。
- 有一些透明度渲染异常可能是因为没有关闭背面剔除，可以通过 [renderFace](${api}core/BaseMaterial#renderFace) 来设置想要渲染的面。
- 如果是自定义材质，请确保设置了正确的混合模式，混合因子，关闭了深度写入，设置了正确的渲染队列。

### 2. 为什么模型背面没有渲染？

- 请确保关闭背面了剔除，可以通过 [RasterState.cullMode](${api}core/RasterState#cullMode) 来设置，也可以通过材质内置的 [renderFace](${api}core/BaseMaterial#renderFace) 来设置想要渲染的面。

### 3. 一般需要打几个光？

- 一般场景只需要使用默认的环境光（[AmbientLight](${api}core/AmbientLight)）就可以了，它可以支持基于图片的照明实现直接光照和间接光照,也可以拥有普通的颜色叠加。
- 如果 环境光 无法满足需求，可以适当添加方向光（[DirectLight](${api}core/DirectLight)）和点光源（[PointLight](${api}core/PointLight)）来补充光照细节。
- 出于性能考虑，尽量不要超过 4 个直接光 。

### 4. 为什么渲染的不够立体？

- 合理搭配使用纹理烘焙、 法线纹理（[normalTexture](${api}core/PBRMaterial#normalTexture)）、阴影遮蔽纹理（[occlusionTexture](${api}core/PBRMaterial#occlusionTexture)）
