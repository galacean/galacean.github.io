---
order: 6
title: 纹理
type: 编辑器

---

通常来说渲染一个完整的三维模型需要网格和纹理两大基本元素，网格负责构建近似的几何体轮廓，而纹理负责提供细节表现。简单来说我们可以把纹理比喻是成附着在几何网格适当位置的一层贴纸。在推荐的工作流中，纹理如何附着在几何网格表面的工作由美术建模人员完成。纹理对于三维模型的渲染非常重要，除了作为表面纹理提供渲染细节外，还可以作为渲染数据源参与光照运算，如法线贴图等。

<img src="https://gw.alipayobjects.com/zos/OasisHub/1de98c9d-2999-40f5-bf07-bbf668cb00d6/image-20210720153058585.png" alt="image-20210720153058585" style="zoom:50%;" />



## 导入纹理

![TextureUpload](https://gw.alipayobjects.com/zos/OasisHub/c4aaec36-3781-42a9-8df6-58be14c659db/TextureUpload.gif)

## 纹理属性

<img src="https://gw.alipayobjects.com/zos/OasisHub/d22803eb-b9ea-454a-87dd-fdf1694bd6ac/image-20210720155138392.png" alt="image-20210720155138392" style="zoom:50%;" />

## 纹理使用

### 三维对象

在三维对象中使用纹理，需要将纹理应用于 [Material](https://oasisengine.cn/0.4/docs/material-cn) 对象，再将 Material 对象赋值给 [MeshRenderer](https://oasisengine.cn/0.4/docs/mesh-renderer-cn) 和 [ParticleRenderer](https://oasisengine.cn/0.4/docs/particle-renderer-cn) 等三维对象渲染器。一个 Material 对象可以包含多张纹理，多个 Material 也可以共享一张纹理。

![TextureToMaterial](https://gw.alipayobjects.com/zos/OasisHub/ba930f61-6ec7-49e8-814b-b6c24a078f0f/TextureToMaterial.gif)

### 二维对象 

在二维对象对象中使用纹理，需要将纹理应用于 [Sprite](https://oasisengine.cn/0.4/docs/sprite-cn) 对象，再将 Sprite 对象赋值给 [SpriterRenderer](https://oasisengine.cn/0.4/docs/sprite-renderer-cn) 。多个 Sprite 对象可以共享同一张纹理。

![TextureToSprite](https://gw.alipayobjects.com/zos/OasisHub/16109017-fe5e-45f8-bd66-51abfcedf60e/TextureToSprite.gif)

![image.png](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*RTmNSL8iDzcAAAAAAAAAAAAAARQnAQ