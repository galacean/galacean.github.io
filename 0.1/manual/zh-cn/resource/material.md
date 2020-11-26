# 材质资源

引擎和编辑器全面提倡使用 PBR 材质（[PBRMaterial](${book.api}classes/core.pbrmaterial.html)）。PBR 全称是 **Physically Based Rendering**，中文意思是**基于物理的渲染**，最早由迪士尼在 2012 年提出，后来被游戏界广泛使用。

跟传统的 Blinn-Phong 等渲染方法相比，PBR 遵循能量守恒，符合物理规则，美术们只需要调整几个简单的参数，即使在复杂的场景中也能保证正确的渲染效果。

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/204641/1578983052725-b7a50b9c-cf8c-4f84-b451-085efdbd83de.png?x-oss-process=image%2Fresize%2Cw_1492)

# 常用参数介绍

|参数|应用 |
|:--|:--|
| 基础颜色（[baseColorFactor](${book.api}classes/core.pbrmaterial.html#basecolorfactor)） | **基础颜色** \* **基础颜色纹理** = **最后的基础颜色**。  基础颜色是物体的反照率值,与传统的漫反射颜色不同，它会同时贡献镜面反射和漫反射的颜色，我们可以通过上面提到过的金属度、粗糙度，来控制贡献比。 |
| 透明度模式（[alphaMode](${book.api}classes/core.pbrmaterial.html#alphamode)） | "OPAQUE"：不透明(默认)、"BLEND"：透明、"MASK"：透明度裁剪（注，如果开启了透明模式，一般需要设置渲染双面）。 |
| 透明度（[opacity](${book.api}classes/core.pbrmaterial.html#opacity)） | 当设置为透明模式后，可以通过透明度来调整透明度。 |
| 透明度裁剪值（[alphaCutoff](${book.api}classes/core.pbrmaterial.html#alphacutoff)） | 当设置为透明度裁剪模式后，可以设置裁剪值来指定裁剪小于此数值的片元。 |
| 不受光（[unlit](${book.api}classes/core.pbrmaterial.html#unlit)） | 当设置为不受光后，材质的表现将和光照无关，只受基础颜色和透明度以及他们的纹理影响。 |
| 双面渲染（[doubleSided](${book.api}classes/core.pbrmaterial.html#doublesided)） | 默认只渲染正面，如果想背面也渲染,可以开启这个参数。 |
| 金属度（[metallicFactor](${book.api}classes/core.pbrmaterial.html#metallicfactor)） | 模拟材质的金属程度，金属值越大，镜面反射越强，即能反射更多周边环境。 |
| 粗糙度（[roughnessFactor](${book.api}classes/core.pbrmaterial.html#roughnessfactor)） | 模拟材质的粗糙程度，粗糙度越大，微表面越不平坦，镜面反射越模糊。 |
| 高光度（[specularFactor](${book.api}classes/core.pbrmaterial.html#specularfactor)） | 不同于金属粗糙度工作流的根据金属度和基础颜色计算镜面反射，而是直接使用高光度来表示镜面反射颜色。(注，只有关闭金属粗糙工作流才生效) |
| 光泽度（[glossinessFactor](${book.api}classes/core.pbrmaterial.html#glossinessfactor)） | 模拟光滑程度，与粗糙度相反。(注，只有关闭金属粗糙工作流才生效) |
| 基础颜色纹理（[baseColorTexture](${book.api}classes/core.pbrmaterial.html#basecolortexture)） | 搭配基础颜色使用，是个相乘的关系。 |
| 透明度纹理（[opacityTexture](${book.api}classes/core.pbrmaterial.html#opacitytexture)） | 搭配透明度使用，是相乘的关系，注意透明度模式的切换。 |
| 金属粗糙度纹理（[metallicRoughnessTexture](${book.api}classes/core.pbrmaterial.html#metallicroughnesstexture)） | 搭配金属粗糙度使用，是相乘的关系。 |
| 金属度纹理（[metallicTexture](${book.api}classes/core.pbrmaterial.html#metallictexture)） | 搭配金属度使用，是相乘的关系。 |
| 粗糙度纹理（[roughnessTexture](${book.api}classes/core.pbrmaterial.html#roughnesstexture)） | 搭配粗糙度使用，是相乘的关系。 |
| 高光光泽度纹理（[specularGlossinessTexture](${book.api}classes/core.pbrmaterial.html#specularglossinesstexture)） | 搭配高光光泽度使用，是相乘的关系。 |
| 法线纹理（[normalTexture](${book.api}classes/core.pbrmaterial.html#normaltexture)） | 可以设置法线纹理 ，在视觉上造成一种凹凸感，还可以通过法线强度来控制凹凸程度。 |
| 自发射光纹理（[emissiveTexture](${book.api}classes/core.pbrmaterial.html#emissivetexture)） | 我们可以设置自发光纹理和自发光颜色（[emissiveFactor](${book.api}classes/core.pbrmaterial.html#emissivefactor)）达到自发光的效果，即使没有光照也能渲染出颜色。 |
| 阴影遮蔽纹理（[occlusionTexture](${book.api}classes/core.pbrmaterial.html#occlusiontexture)） | 我们可以设置阴影遮蔽纹理来提升物体的阴影细节。 |
| 是否金属粗糙度工作流（[isMetallicWorkflow](${book.api}classes/core.pbrmaterial.html#ismetallicworkflow)） | 可以切换金属工作流和高光工作流。 |

# PBR 光

> 环境光（[EnvironmentMapLight](${book.api}classes/core.environmentmaplight.html)），因为中文翻译和 环境光（[AmbientLight](${book.api}classes/core.ambientlight.html)）重名，所以在本文和[编辑器](https://oasistwa.alipay.com/3d/projects)中，统一称之 **PBR 光。**

“点光源”、“方向光”，都属于“直接光”，即光线经过物体表面后直接进入我们眼睛，而我们现实世界中并不是这样的，光线其实会经过周围物体、空气尘埃的各种碰撞，最终才进入我们眼睛，这也正是为什么我们能看到不被光线直接照射到的地方，如图所示，左图是直接光照，我们只能看到球的右边是亮的，而右图是**全局光照**，光线经过各种碰撞进入我们眼睛，所以打亮了整个场景。仔细观察的话我们还能看到球的左下角还透出了红色墙壁的颜色，这正是因为光线的各种碰撞，产生的“颜色渗透”现象。
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/204641/1606301096780-0e941563-fbb3-473f-b75d-01b32c28a03e.png#align=left&display=inline&height=181&margin=%5Bobject%20Object%5D&name=image.png&originHeight=361&originWidth=720&size=176833&status=done&style=none&width=360)
为了模拟这种全局光照，引擎提供了 PBR 光，即 [EnvironmentMapLight](${book.api}classes/core.environmentmaplight.html)。PBR 光是基于 [IBL](https://www.wikiwand.com/en/Image-based_lighting) 技术实现的，需要用户上传一张[**立方体纹理**](${book.manual}resource/texture?id=_2-%e7%ab%8b%e6%96%b9%e7%ba%b9%e7%90%86)来模拟周边环境。代码实现见 [纹理的应用-PBR 光](${book.manual}resource/texture?id=_3-pbr-%e5%85%89)。
如果您已经使用了 PBR 材质，千万别忘了往场景中添加一个 [EnvironmentMapLight](${book.api}classes/core.environmentmaplight.html) 光～只有添加了之后，属于 PBR 的金属粗糙度、镜面反射、物理守恒、全局光照才会展现出效果。


# 常见 QA

## 1. 透明贴图怎么没有生效？

- 请先确保透明纹理或者基础颜色纹理含有透明通道，即是正常的 png 图片。
- 确保材质的 透明度模式（[alphaMode](${book.api}classes/core.pbrmaterial.html#alphamode)）设置为了 "BLEND"。
- 有一些透明度渲染异常可能是因为没有开启 双面渲染（[doubleSided](${book.api}classes/core.pbrmaterial.html#doublesided)）。
- 如果您使用的是[自定义材质](${book.manual}resource/shader)，请保证开启了透明度测试，以及正确的透明度混合模式。

## 2. 为什么材质是黑的？

- 请确保您往场景中添加了 PBR 光（[EnvironmentMapLight](${book.api}classes/core.environmentmaplight.html)）或者其他直接光，如方向光（[DirectLight](${book.api}classes/core.directlight.html)）。

## 3. 为什么模型背面没有渲染？

- 请确保开启了 双面渲染（[doubleSided](${book.api}classes/core.pbrmaterial.html#doublesided)）。

## 4. 一般需要打几个光？

- 一般场景只需要添加一个 PBR 光（[EnvironmentMapLight](${book.api}classes/core.environmentmaplight.html)）就可以了，它可以基于图片的照明实现直接光照和间接光照。
- 如果出于美术流程的困难度， 1 个 PBR 光无法满足需求，可以适当添加方向光（[DirectLight](${book.api}classes/core.directlight.html)）和点光源（[PointLight](${book.api}classes/core.pointlight.html)）来补充光照细节。
- 出于性能考虑，尽量不要超过 1 个 PBR 光 + 2 个直接光 。

## 5. 为什么渲染的不够立体？

- 合理搭配使用[纹理烘焙](${book.editor}bake) 、 法线纹理（[normalTexture](${book.api}classes/core.pbrmaterial.html#normaltexture)）、阴影遮蔽纹理（[occlusionTexture](${book.api}classes/core.pbrmaterial.html#occlusiontexture)）
