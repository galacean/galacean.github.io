---
order: 6
title: 纹理
type: 编辑器

---

通常来说渲染一个完整的三维模型需要 Mesh 和 [Texture](${docs}texture-cn) 两大基本元素，Mesh 负责构建近似的几何体网格轮廓，而 Texture 负责提供细节表现。简单来说我们可以把 Tetuxre 比喻是成附着在几何网格 Mesh 表面适当位置的一层贴纸。在推荐的工作流中， Texture 如何附着在几何网格 Mesh 表面的工作由美术建模人员完成。Texture 对于三维模型的渲染非常重要，除了作为表面纹理提供渲染细节外，还可以作为某种渲染数据源参与光照运算，如法线贴图等。

<img src="https://gw.alipayobjects.com/zos/OasisHub/1de98c9d-2999-40f5-bf07-bbf668cb00d6/image-20210720153058585.png" alt="image-20210720153058585" style="zoom:50%;" />



## 使用

### 如何导入

![TextureUpload](https://gw.alipayobjects.com/zos/OasisHub/c4aaec36-3781-42a9-8df6-58be14c659db/TextureUpload.gif)

### 属性面板

在**资产管理器**中点击导入的 Texture **检查器面板**会显示 Texture 的相关属性。

<img src="https://gw.alipayobjects.com/zos/OasisHub/d22803eb-b9ea-454a-87dd-fdf1694bd6ac/image-20210720155138392.png" alt="image-20210720155138392" style="zoom:50%;" />

| 属性                                                         | 值                                                           |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| 循环模式U（[wrapModeU](${api}core/Texture#wrapModeU)）       | 截取模式（[Clamp](${api}core/TextureWrapMode#Clamp)）、 重复模式（[Repeat](${api}core/TextureWrapMode#Repeat)）、镜像重复模式（[Mirror](${api}core/TextureWrapMode#Mirror)） |
| 循环模式V（[wrapModeV](${api}core/Texture#wrapModeV)）       | 截取模式（[Clamp](${api}core/TextureWrapMode#Clamp)）、重复模式（[Repeat](${api}core/TextureWrapMode#Repeat)）、 镜像重复模式（[Mirror](${api}core/TextureWrapMode#Mirror)） |
| 过滤模式（[filterMode](${api}core/Texture#filterMode)）      | 点过滤（[Point](${api}core/TextureFilterMode#Point)）、双线性过滤（[Bilinear](${api}core/TextureFilterMode#Bilinear)）、 三线性过滤（[Trilinear](${api}core/TextureFilterMode#Trilinear)） |
| 各向异性过滤等级（[anisoLevel](${api}core/Texture#anisoLevel)） | 向向异性等级，1 ~ 16                                         |

| 格式     | 值                                                           |
| :------- | :----------------------------------------------------------- |
| 转为WebP | 是否将文件存储格式转换为 WebP（非纹理压缩格式有效），WebP 格式将有效减少文件尺寸 |
| 纹理压缩 | 是否使用 GPU 纹理压缩格式，GPU 纹理压缩格式可有效减少显存    |

### 

### 给场景元素使用

#### 三维对象

在三维对象中使用纹理，需要将纹理应用于 [Material](${docs}material-cn) 对象，再将 Material 对象赋值给 [MeshRenderer](${docs}mesh-renderer-cn) 和 [ParticleRenderer](${docs}particle-renderer-cn) 等三维对象渲染器。一个 Material 对象可以包含多张 Texture，多个 Material 也可以共享一张 Texture。

![TextureToMaterial](https://gw.alipayobjects.com/zos/OasisHub/ba930f61-6ec7-49e8-814b-b6c24a078f0f/TextureToMaterial.gif)

#### 二维对象 

在二维对象对象中使用纹理，需要将纹理应用于 [Sprite](${docs}sprite-cn) 对象，再将 Sprite 对象赋值给 [SpriterRenderer](${docs}sprite-renderer-cn) 。多个 Sprite 对象可以共享同一张 Texture。

![TextureToSprite](https://gw.alipayobjects.com/zos/OasisHub/16109017-fe5e-45f8-bd66-51abfcedf60e/TextureToSprite.gif)



## 更多详情

更多功能详见[纹理引擎文档](${docs}texture-cn)。