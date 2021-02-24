# 材质

![](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*cz-ESaYIiGsAAAAAAAAAAAAAARQnAQ)

## 如何使用材质
用户在 Unity、3ds Max、C4D、Blender 等建模软件调试后可以输出 [GLTF 文件](https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md)，GLTF文件里面包含了场景、模型实体、纹理、动画、材质等资源，Oasis 支持使用[资源管理器](${book.manual}resource/resource-manager.md?id=_5-gltf)或者[编辑器](https://oasistwa.alipay.com/3d/projects)加载解析这个 GLTF 文件，解析后模型已经自动赋予了对应的材质，我们也可以拿到模型的材质，进行一些后期加工，比如修改颜色。
```typescript
// 获取想要修改的 renderer
const renderer = entity.getComponent(MeshRenderer);
// 获取 PBRMaterial
const material = renderer.getSharedMaterial(0);
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

// 替换 PBRMaterial，赋予 blinn-phong 材质
const material = renderer.setSharedMaterial(0, material);
```


## PBRMaterial
引擎和编辑器全面提倡使用 PBR 材质 [PBRMaterial](${book.api}classes/core.pbrmaterial.html) 。PBR 全称是 **Physically Based Rendering**，中文意思是**基于物理的渲染**，最早由迪士尼在 2012 年提出，后来被游戏界广泛使用。


跟传统的 **Blinn-Phong** 等渲染方法相比，PBR 遵循能量守恒，符合物理规则，美术们只需要调整几个简单的参数，即使在复杂的场景中也能保证正确的渲染效果。
引擎提供了 **金属-粗糙度/高光-光泽度** 两种工作流，分别对应 [PBRMaterial](${book.api}classes/core.pbrmaterial.html) 和 [PBRSpecularMaterial](${book.api}classes/core.pbrspecularmaterial.html)。


### 通用参数介绍
| 参数 | 应用 |
| :--- | :--- |
| 基础颜色（[baseColor](${book.api}classes/core.pbrmaterial.html#basecolor) )| **基础颜色** * **基础颜色纹理** = **最后的基础颜色**。  基础颜色是物体的反照率值,与传统的漫反射颜色不同，它会同时贡献镜面反射和漫反射的颜色，我们可以通过上面提到过的金属度、粗糙度，来控制贡献比。 |
| 自发光颜色（[emissiveColor](${book.api}classes/core.pbrmaterial.html#emissivecolor)） | 使得即使没有光照也能渲染出颜色。 |
| 透明度模式（[alphaMode](${book.api}classes/core.pbrmaterial.html#alphamode)） | "AlphaMode.Opaque"：不透明(默认)、"AlphaMode.Blend"：透明、"AlphaMode.CutOff"：透明度裁剪 |
| 渲染双面（[doublesided](${book.api}classes/core.pbrmaterial.html#doublesided)） | true：渲染双面，不进行裁剪、false：背面裁剪，只渲染正面 |
| 透明度（[opacity](${book.api}classes/core.pbrmaterial.html#opacity)） | 当设置为透明模式后，可以通过透明度来调整透明度。 |
| 透明度裁剪值（[alphaCutoff](${book.api}classes/core.pbrmaterial.html#alphacutoff)） | 当设置为透明度裁剪模式后，可以设置裁剪值来指定裁剪小于此数值的片元。 |
| 基础颜色纹理（[baseColorTexture](${book.api}classes/core.pbrmaterial.html#basecolortexture)） | 搭配基础颜色使用，是个相乘的关系。 |
| 透明度纹理（[opacityTexture](${book.api}classes/core.pbrmaterial.html#opacitytexture)） | 搭配透明度使用，是相乘的关系，注意透明度模式的切换。 |
| 法线纹理（[normalTexture](${book.api}classes/core.pbrmaterial.html#normaltexture)） | 可以设置法线纹理 ，在视觉上造成一种凹凸感，还可以通过法线强度来控制凹凸程度。 |
| 自发射光纹理（[emissiveTexture](${book.api}classes/core.pbrmaterial.html#emissivetexture)） | 我们可以设置自发光纹理和自发光颜色（[emissiveFactor](${book.api}classes/core.pbrmaterial.html#emissivefactor)）达到自发光的效果，即使没有光照也能渲染出颜色。 |
| 阴影遮蔽纹理（[occlusionTexture](${book.api}classes/core.pbrmaterial.html#occlusiontexture)） | 我们可以设置阴影遮蔽纹理来提升物体的阴影细节。 |


### 金属-粗糙度 参数介绍
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
| 自发光颜色（[emissiveColor](${book.api}classes/core.blinnphongmaterial.html#emissivecolor)） | **自发光颜色 * 自发光纹理 = 最后的自发光颜色。即使没有光照也能渲染出颜色。** |
| 自发光纹理（[emissiveTexture](${book.api}classes/core.blinnphongmaterial.html#emissivetexture)） | 搭配自发光颜色使用，是个相乘的关系。 |
| 漫反射颜色（[diffuseColor](${book.api}classes/core.blinnphongmaterial.html#diffusecolor)） | **漫反射颜色 * 漫反射纹理 = 最后的漫反射颜色。** |
| 漫反射纹理（[diffuseTexture](${book.api}classes/core.blinnphongmaterial.html#diffusetexture)） | 搭配漫反射颜色使用，是个相乘的关系。 |
| 镜面反射颜色（[specularColor](${book.api}classes/core.blinnphongmaterial.html#specularcolor)） | **镜面反射颜色 * 镜面反射纹理 = 最后的镜面反射颜色。** |
| 镜面反射纹理（[specularTexture](${book.api}classes/core.blinnphongmaterial.html#speculartexture)） | 搭配镜面反射颜色使用，是个相乘的关系。 |
| 镜面反射系数（[shininess](${book.api}classes/core.blinnphongmaterial.html#shininess)） | 值越大镜面反射效果越聚拢。 |
| 透明度模式（[alphaMode](${book.api}classes/core.blinnphongmaterial.html#alphamode)） | "AlphaMode.Opaque"：不透明(默认)、"AlphaMode.Blend"：透明 |
| 渲染双面（[doublesided](${book.api}classes/core.blinnphongmaterial.html#doublesided)） | true：渲染双面，不进行裁剪、false：背面裁剪，只渲染正面 |


##  UnlitMaterial
在一些简单的场景中，可能不希望计算光照，引擎提供了 [UnlitMaterial](${book.api}classes/core.unlitmaterial.html)，使用了最精简的 shader 代码，只需要提供颜色或者纹理即可渲染。

| 参数 | 应用 |
| :--- | :--- |
| 基础颜色（[baseColor](${book.api}classes/core.unlitmaterial.html#basecolor) )| **基础颜色 * 基础颜色纹理 = 最后的颜色。** |
| 基础纹理（[baseColorTexture](${book.api}classes/core.unlitmaterial.html#basecolortexture) )| 搭配基础颜色使用，是个相乘的关系 |



# 常见 QA
## 1. 透明贴图怎么没有生效？

- 请先确保透明纹理是否含有透明通道，即是正常的 png 图片，如果不是的话，请确定开启了 getOpacityFromRGB 为 true 代表希望采样亮度值作为透明度。
- 确保材质的透明度模式（[alphaMode](${book.api}classes/core.pbrmaterial.html#alphamode)）设置为了 "AlphaMode.Blend"，代表希望透明度混合渲染。
- 有一些透明度渲染异常可能是因为没有关闭背面剔除，可以通过 [RasterState.cullMode](${book.api}classes/core.rasterstate.html#cullmode) 来设置。
- 如果是自定义材质，请确保设置了正确的混合模式，混合因子，关闭了深度写入，设置了正确的渲染队列。



## 2. 为什么材质是黑的？


- 请确保您往场景中添加了全局光（[EnvironmentMapLight](${book.api}classes/core.environmentmaplight.html)）或者其他直接光，如方向光（[DirectLight](${book.api}classes/core.directlight.html)）。



## 3. 为什么模型背面没有渲染？


- 请确保关闭背面了剔除，可以通过 [RasterState.cullMode](${book.api}classes/core.rasterstate.html#cullmode) 来设置。



## 4. 一般需要打几个光？


- 一般场景只需要添加一个全局光（[EnvironmentMapLight](${book.api}classes/core.environmentmaplight.html)）就可以了，它可以基于图片的照明实现直接光照和间接光照。
- 如果出于美术流程的困难度， 1 个 EnvironmentMapLight 无法满足需求，可以适当添加方向光（[DirectLight](${book.api}classes/core.directlight.html)）和点光源（[PointLight](${book.api}classes/core.pointlight.html)）来补充光照细节。
- 出于性能考虑，尽量不要超过 1 个 EnvironmentMapLight + 2 个直接光 。



## 5. 为什么渲染的不够立体？


- 合理搭配使用[纹理烘焙](${book.editor}bake) 、 法线纹理（[normalTexture](${book.api}classes/core.pbrmaterial.html#normaltexture)）、阴影遮蔽纹理（[occlusionTexture](${book.api}classes/core.pbrmaterial.html#occlusiontexture)）
