# 材质

![](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*cz-ESaYIiGsAAAAAAAAAAAAAARQnAQ)

## 如何使用材质
用户在 Unity、3ds Max、C4D、Blender 等建模软件调试后可以输出 [GLTF 文件](https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md)，GLTF文件里面包含了场景、模型实体、纹理、动画、材质等资源，Oasis 支持使用[资源管理器](${book.manual}resource/resource-manager.md?id=_5-gltf)或者[编辑器](https://oasistwa.alipay.com/3d/projects)加载解析这个 GLTF 文件，解析后模型已经自动赋予了对应的材质，我们也可以拿到模型的材质，进行一些后期加工，比如修改颜色。
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
material.diffuseColor.r = 0;

// 通过 `setMaterial` 设置当前 renderer 的第 i 个材质, 默认第 0 个。
const material = renderer.setMaterial(material);
```

\>> [How to use PBR material](${book.playground}#/pbr-base)

## 材质通用属性
以下属性都可以直接在 [UnlitMaterial](${book.api}classes/core.unlitmaterial.html)、[BlinnPhongMaterial](${book.api}classes/core.blinnphongmaterial.html)、[PBRMaterial](${book.api}classes/core.pbrmaterial.html)、[PBRSpecularMaterial](${book.api}classes/core.pbrspecularmaterial.html) 材质中使用。

| 参数 | 应用 |
| :--- | :--- |
| 是否透明 ([isTransparent](${book.api}classes/core.basematerial.html#istransparent))| 可以设置材质是否透明。如果设置为透明，可以通过[BlendMode](${book.api}classes/core.basematerial.html#blendmode) 来设置颜色混合模式。 |
| 透明度裁剪值 ([alphaCutoff](${book.api}classes/core.basematerial.html#alphacutoff))| 可以设置裁剪值，来指定在着色器中，裁剪透明度小于此数值的片元。 |
| 渲染面 ([renderFace](${book.api}classes/core.basematerial.html#renderface))| 可以决定渲染正面、背面、双面。 |
| 颜色混合模式 ([blendMode](${book.api}classes/core.basematerial.html#blendmode))| 当设置材质为透明后，可以设置此枚举来决定颜色混合模式。 |


## PBRMaterial
引擎和编辑器全面提倡使用 PBR 材质 [PBRMaterial](${book.api}classes/core.pbrmaterial.html) 。PBR 全称是 **Physically Based Rendering**，中文意思是**基于物理的渲染**，最早由迪士尼在 2012 年提出，后来被游戏界广泛使用。


跟传统的 **Blinn-Phong** 等渲染方法相比，PBR 遵循能量守恒，符合物理规则，美术们只需要调整几个简单的参数，即使在复杂的场景中也能保证正确的渲染效果。
引擎提供了 **金属-粗糙度/高光-光泽度** 两种工作流，分别对应 [PBRMaterial](${book.api}classes/core.pbrmaterial.html) 和 [PBRSpecularMaterial](${book.api}classes/core.pbrspecularmaterial.html)。


### 通用参数介绍
| 参数 | 应用 |
| :--- | :--- |
| 基础颜色（[baseColor](${book.api}classes/core.pbrbasematerial.html#basecolor) )| **基础颜色** * **基础颜色纹理** = **最后的基础颜色**。  基础颜色是物体的反照率值,与传统的漫反射颜色不同，它会同时贡献镜面反射和漫反射的颜色，我们可以通过上面提到过的金属度、粗糙度，来控制贡献比。 |
| 自发光颜色（[emissiveColor](${book.api}classes/core.pbrbasematerial.html#emissivecolor)） | 使得即使没有光照也能渲染出颜色。 |
| 透明度（[opacity](${book.api}classes/core.pbrbasematerial.html#opacity)） | 当设置为透明模式后，可以通过透明度来调整透明度。 |
| 基础颜色纹理（[baseTexture](${book.api}classes/core.pbrbasematerial.html#basecolortexture)） | 搭配基础颜色使用，是个相乘的关系。 |
| 透明度纹理（[opacityTexture](${book.api}classes/core.pbrbasematerial.html#opacitytexture)） | 搭配透明度使用，是相乘的关系，注意透明度模式的切换。 |
| 法线纹理（[normalTexture](${book.api}classes/core.pbrbasematerial.html#normaltexture)） | 可以设置法线纹理 ，在视觉上造成一种凹凸感，还可以通过法线强度来控制凹凸程度。 |
| 自发射光纹理（[emissiveTexture](${book.api}classes/core.pbrbasematerial.html#emissivetexture)） | 我们可以设置自发光纹理和自发光颜色（[emissiveFactor](${book.api}classes/core.pbrbasematerial.html#emissivefactor)）达到自发光的效果，即使没有光照也能渲染出颜色。 |
| 阴影遮蔽纹理（[occlusionTexture](${book.api}classes/core.pbrbasematerial.html#occlusiontexture)） | 我们可以设置阴影遮蔽纹理来提升物体的阴影细节。 |
| 纹理坐标的缩放与偏移（[tilingOffset](${book.api}classes/core.pbrbasematerial.html#tilingoffset)） | 是一个 Vector4 数据，分别控制纹理坐标在 uv 方向上的缩放和偏移。 |

### 金属-粗糙度模式 参数介绍
| 参数 | 应用 |
| :--- | :--- |
| 金属度（[metallicFactor](${book.api}classes/core.pbrmaterial.html#metallicfactor)） | 模拟材质的金属程度，金属值越大，镜面反射越强，即能反射更多周边环境。 |
| 粗糙度（[roughnessFactor](${book.api}classes/core.pbrmaterial.html#roughnessfactor)） | 模拟材质的粗糙程度，粗糙度越大，微表面越不平坦，镜面反射越模糊。 |
| 金属粗糙度纹理（[metallicRoughnessTexture](${book.api}classes/core.pbrmaterial.html#metallicroughnesstexture)） | 搭配金属粗糙度使用，是相乘的关系。 |
| 金属度纹理（[metallicTexture](${book.api}classes/core.pbrmaterial.html#metallictexture)） | 搭配金属度使用，是相乘的关系。 |
| 粗糙度纹理（[roughnessTexture](${book.api}classes/core.pbrmaterial.html#roughnesstexture)） | 搭配粗糙度使用，是相乘的关系。 |

### 高光-光泽度 参数介绍
| 参数 | 应用 |
| :--- | :--- |
| 高光度（[specularColor](${book.api}classes/core.pbrspecularmaterial.html#specularcolor)） | 不同于金属粗糙度工作流的根据金属度和基础颜色计算镜面反射，而是直接使用高光度来表示镜面反射颜色。(注，只有关闭金属粗糙工作流才生效) |
| 光泽度（[glossinessFactor](${book.api}classes/core.pbrspecularmaterial.html#glossinessfactor)） | 模拟光滑程度，与粗糙度相反。(注，只有关闭金属粗糙工作流才生效) |
| 高光光泽度纹理（[specularGlossinessTexture](${book.api}classes/core.pbrspecularmaterial.html#specularglossinesstexture)） | 搭配高光光泽度使用，是相乘的关系。 |



**注：如果您使用了 PBR 材质，千万别忘了往场景中添加一个[EnvironmentMapLight](${book.manual}component/light.md?id=environmentmaplight) ～只有添加了之后，属于 PBR 的金属粗糙度、镜面反射、物理守恒、全局光照才会展现出效果。**




## BlinnPhongMaterial
[BlinnPhongMaterial](${book.api}classes/core.blinnphongmaterial.html) 虽然不是基于物理渲染，但是其高效的渲染算法和基本齐全的光学部分，还是有很多的应用场景。


### 常用参数介绍
| 参数 | 应用 |
| :--- | :--- |
| 基础颜色（[baseColor](${book.api}classes/core.blinnphongmaterial.html#basecolor)） | **基础颜色 * 基础纹理 = 最后的基础颜色。** |
| 基础纹理（[baseTexture](${book.api}classes/core.blinnphongmaterial.html#basetexture)） | 搭配基础颜色使用，是个相乘的关系。 |
| 镜面反射颜色（[specularColor](${book.api}classes/core.blinnphongmaterial.html#specularcolor)） | **镜面反射颜色 * 镜面反射纹理 = 最后的镜面反射颜色。** |
| 镜面反射纹理（[specularTexture](${book.api}classes/core.blinnphongmaterial.html#speculartexture)） | 搭配镜面反射颜色使用，是个相乘的关系。 |
| 法线纹理（[normalTexture](${book.api}classes/core.blinnphongmaterial.html#normaltexture)） | 可以设置法线纹理 ，在视觉上造成一种凹凸感，还可以通过法线强度来控制凹凸程度。 |
| 法线强度（[normalIntensity ](${book.api}classes/core.blinnphongmaterial.html#normalintensity)） | 法线强度，用来控制凹凸程度。 |
| 自发光颜色（[emissiveColor](${book.api}classes/core.blinnphongmaterial.html#emissivecolor)） | **自发光颜色 * 自发光纹理 = 最后的自发光颜色。即使没有光照也能渲染出颜色。** |
| 自发光纹理（[emissiveTexture](${book.api}classes/core.blinnphongmaterial.html#emissivetexture)） | 搭配自发光颜色使用，是个相乘的关系。 |
| 镜面反射系数（[shininess](${book.api}classes/core.blinnphongmaterial.html#shininess)） | 值越大镜面反射效果越聚拢。 |
| 纹理坐标的缩放与偏移（[tilingOffset](${book.api}classes/core.blinnphongmaterial.html#tilingoffset)） | 是一个 Vector4 数据，分别控制纹理坐标在 uv 方向上的缩放和偏移。 |


##  UnlitMaterial
在一些简单的场景中，可能不希望计算光照，引擎提供了 [UnlitMaterial](${book.api}classes/core.unlitmaterial.html)，使用了最精简的 shader 代码，只需要提供颜色或者纹理即可渲染。

| 参数 | 应用 |
| :--- | :--- |
| 基础颜色（[baseColor](${book.api}classes/core.unlitmaterial.html#basecolor) )| **基础颜色 * 基础颜色纹理 = 最后的颜色。** |
| 基础纹理（[baseTexture](${book.api}classes/core.unlitmaterial.html#basetexture) )| 搭配基础颜色使用，是个相乘的关系。 |
| 纹理坐标的缩放与偏移（[tilingOffset](${book.api}classes/core.unlitmaterial.html#tilingoffset)） | 是一个 Vector4 数据，分别控制纹理坐标在 uv 方向上的缩放和偏移。 |


# 常见 QA
## 1. 透明渲染异常？
- 请先确保材质开启了透明度模式，即材质的 [isTransparent](${book.api}classes/core.basematerial.html#istransparent) 属性设置为了 `true`。
- 相应的材质的 [baseColor](${book.api}classes/core.blinnphongmaterial.html#basecolor) 需要设置正确的透明度。如 `material.baseColor.a = 0.5`。透明度范围为 【0～1】，数值越小，越透明。
- 如果还上传了透明度纹理，请先确保透明纹理是否含有透明通道，即是正常的 png 图片，如果不是的话，可以开启 `getOpacityFromRGB` 为 true 代表希望采样亮度值作为透明度。
- 如果透明度渲染仍有异常，请确保材质的颜色混合度模式（[blendMode](${book.api}classes/core.basematerial.html#blendmode)）为期望的组合。
- 有一些透明度渲染异常可能是因为没有关闭背面剔除，可以通过 [renderFace](${book.api}classes/core.basematerial.html#renderface) 来设置想要渲染的面。
- 如果是自定义材质，请确保设置了正确的混合模式，混合因子，关闭了深度写入，设置了正确的渲染队列。



## 2. 为什么材质是黑的？


- 场景中需要有光才能照亮物体，请确保您往场景中添加了全局光（[EnvironmentMapLight](${book.api}classes/core.environmentmaplight.html)）或者直接光如方向光（[DirectLight](${book.api}classes/core.directlight.html)）。



## 3. 为什么模型背面没有渲染？


- 请确保关闭背面了剔除，可以通过 [RasterState.cullMode](${book.api}classes/core.rasterstate.html#cullmode) 来设置，也可以通过材质内置的 [renderFace](${book.api}classes/core.basematerial.html#renderface) 来设置想要渲染的面。



## 4. 一般需要打几个光？


- 一般场景只需要添加一个全局光（[EnvironmentMapLight](${book.api}classes/core.environmentmaplight.html)）就可以了，它可以基于图片的照明实现直接光照和间接光照。
- 如果出于美术流程的困难度， 1 个 EnvironmentMapLight 无法满足需求，可以适当添加方向光（[DirectLight](${book.api}classes/core.directlight.html)）和点光源（[PointLight](${book.api}classes/core.pointlight.html)）来补充光照细节。
- 出于性能考虑，尽量不要超过 1 个 EnvironmentMapLight + 2 个直接光 。



## 5. 为什么渲染的不够立体？


- 合理搭配使用[纹理烘焙](${book.editor}bake) 、 法线纹理（[normalTexture](${book.api}classes/core.pbrmaterial.html#normaltexture)）、阴影遮蔽纹理（[occlusionTexture](${book.api}classes/core.pbrmaterial.html#occlusiontexture)）
