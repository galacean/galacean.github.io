---
order: 0
title: 材质总览
type: 图形
group: 材质
label: Graphics/Material
---

Galacean 创建的三维世界与真实的世界一样包含各式各样的物体，这些物体的颜色，色泽亮度，透明度都是由材质决定的，引擎中内置了多种经典材质并支持开发者实现自定义材质。

用户在 Unity、3ds Max、C4D、Blender 等建模软件调试后可以输出 [glTF 文件](https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md)，glTF 文件里面包含了场景、模型实体、纹理、动画、材质等资源，Galacean 支持使用[资源管理器](${docs}resource-manager)加载解析这个 glTF 文件，解析后模型已经自动赋予了对应的材质，我们也可以拿到模型的材质，进行一些后期加工，比如修改颜色。

| 类型 | 描述 |
| :-- | :-- |
| [Unlit 材质](${docs}graphics-material-Unlit) | Unlit 材质适用于烘焙好的模型渲染，她只需要设置一张基本纹理或者颜色，即可展现离线渲染得到的高质量渲染结果，但是缺点是无法实时展现光影交互，因为 Unlit 由纹理决定渲染，不受任何光照影响，可参考 [烘焙教程](${docs}graphics-bake-blender) 和 [导出 Unlit 教程](${docs}graphics-material-Unlit) |
| [Blinn-Phong 材质](${docs}graphics-material-BlinnPhong) | Blinn Phong 材质适用于那些对真实感没有那么高要求的场景，虽然没有遵循物理，但是其高效的渲染算法和基本齐全的光学部分，可以适用很多的场景。 |
| [PBR 材质](${docs}graphics-material-PBR) | PBR 材质适合需要真实感渲染的应用场景，因为 PBR 是基于物理的渲染，遵循能量守恒，开发者通过调整金属度、粗糙度、灯光等参数，能够保证渲染效果都是物理正确的。 |
| [自定义材质](${docs}graphics-custom-material) | 可定制特殊的渲染需求 |

以下属性都可以直接在 [UnlitMaterial](${api}core/UnlitMaterial)、[BlinnPhongMaterial](${api}core/BlinnPhongMaterial)、[PBRMaterial](${api}core/PBRMaterial)、[PBRSpecularMaterial](${api}core/PBRSpecularMaterial) 材质中使用。

| 参数 | 应用 |
| :-- | :-- |
| [isTransparent](${api}core/BaseMaterial#isTransparent) | 是否透明。可以设置材质是否透明。如果设置为透明，可以通过 [BlendMode](${api}core/BaseMaterial#blendMode) 来设置颜色混合模式。 |
| [alphaCutoff](${api}core/BaseMaterial#alphaCutoff) | 透明度裁剪值。可以设置裁剪值，来指定在着色器中，裁剪透明度小于此数值的片元。 |
| [renderFace](${api}core/BaseMaterial#renderFace) | 渲染面。可以决定渲染正面、背面、双面。 |
| [blendMode](${api}core/BaseMaterial#blendMode) | 颜色混合模式。当设置材质为透明后，可以设置此枚举来决定颜色混合模式，参考 [案例](${examples}blend-mode) |

## 编辑器使用

一般情况下，模型已经自动绑定好材质，用户可以不用做任何操作；如果想要修改材质，我们需要点击 `duplicate & remap` 按钮来生成一份该材质的副本，然后再编辑该材质副本。

<img src="https://gw.alipayobjects.com/zos/OasisHub/1f5caa3a-bc01-419f-83c0-dd0ef12692bf/remap.gif" alt="remap" style="zoom:100%;" />

切换 Shader 时会共用相同类型的属性，比如基础颜色为红色，那么即使切换 Shader，基础颜色仍为红色。

<img src="https://gw.alipayobjects.com/zos/OasisHub/b3724c3e-e8d9-43af-91c8-c6a80cd027f9/image-20231009112713870.png" alt="image-20231009112713870" style="zoom:50%;" />

| Shader         | 描述              |
| :------------- | :---------------- |
| PBR            | Galacean 标准材质 |
| PBR Specular   | Galacean 标准材质 |
| Unlit          | Galacean 标准材质 |
| Blinn Phong    | Galacean 标准材质 |
| Bake PBR       | lightmap 过渡方案 |
| Sky Box        | 天空盒            |
| Sky Procedural | 大气散射          |

## 脚本使用

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

我们也可以直接替换材质的贴图，比如给 blinn-phong 材质替换基础颜色贴图：

```typescript
// 获取想要修改的 renderer
const renderer = entity.getComponent(MeshRenderer);
// 获取材质
const material = renderer.getMaterial();
// 设置贴图
material.baseTexture = await engine.resourceManager.load<Texture2D>({
  url: "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*ApFPTZSqcMkAAAAAAAAAAAAAARQnAQ",
  type: AssetType.Texture2D
});
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
