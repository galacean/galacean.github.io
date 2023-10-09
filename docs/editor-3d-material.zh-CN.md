---
order: 2
title: 材质
type: 功能
group: 3D 渲染
label: Editor-Feature/Rendering-3d
---

## 修改材质

一般情况下，模型已经自动绑定好材质，用户可以不用做任何操作；如果想要修改材质，我们需要点击 `duplicate & remap` 按钮来生成一份该材质的副本，然后再编辑该材质副本。

<img src="https://gw.alipayobjects.com/zos/OasisHub/1f5caa3a-bc01-419f-83c0-dd0ef12692bf/remap.gif" alt="remap" style="zoom:100%;" />

## 材质类型（切换 Shader）

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

### PBR

PBR 遵循能量守恒，是基于物理的渲染，并且引入了 [IBL](${docs}light-cn#ibl-镜面反射) 模拟全局光照，通过金属度、粗糙度等参数，更加方便地调节渲染效果。

- 根据真实世界中光线与材质的交互，绝缘体（即当金属度为 0 时）材质也能反射大约 4% 纯色光线，从而渲染出周边环境，如下模型金属度为 0 但是还能隐约看到反射的周边环境：

<img src="https://gw.alipayobjects.com/zos/OasisHub/1017d75b-03a3-4c06-8971-524544373429/image-20231007153753006.png" alt="image-20231007153753006" style="zoom:50%;" />

- 我们调节材质的金属度，可以发现，金属度越大，周围的环境越清晰，并且开始从白色纯色变成彩色。这是因为电介质（即金属度为 1 时）材质会将光线 100% 全部反射出物体表面，即反射出彩色的周边环境：

<img src="https://gw.alipayobjects.com/zos/OasisHub/711f8b97-247c-465e-8cf2-4896b0c78534/metal.gif" alt="metal" style="zoom:100%;" />

除此之外，还有很多通用属性可以配置，比如粗糙度、环境遮蔽、自发射光、透明度等等：

<img src="https://gw.alipayobjects.com/zos/OasisHub/4806589e-386f-404a-82e5-d273e98b707d/other.gif" alt="other" style="zoom:100%;" />

### Unlit

Unlit 材质适用于烘焙好的模型渲染，她只需要设置一张基本纹理或者颜色，即可展现离线渲染得到的高质量渲染结果，但是缺点是无法实时展现光影交互，因为 Unlit 由纹理决定渲染，不受任何光照影响，可参考 [烘焙教程](${docs}artist-bake-cn) 和 [导出 Unlit 教程](${docs}artist-unlit-cn)。

<img src="https://gw.alipayobjects.com/zos/OasisHub/6be78a08-3075-4cd1-8cad-9757fc34f695/unlit.gif" alt="unlit" style="zoom:100%;" />

### Blinn Phong

Blinn Phong 材质适用于那些对真实感没有那么高要求的场景，虽然没有遵循物理，但是其高效的渲染算法和基本齐全的光学部分，可以适用很多的场景。

<img src="https://gw.alipayobjects.com/zos/OasisHub/eaa93827-29a4-46ad-b9d3-f179fa200c57/blinn.gif" alt="blinn" style="zoom:100%;" />

### Bake PBR( lightmap 过渡方案 )

<img src="https://gw.alipayobjects.com/zos/OasisHub/c539743b-d96a-4081-b959-7ddd5a0db217/image-20231009113312944.png" alt="image-20231009113312944" style="zoom:50%;" />

### Sky Box

天空盒背景，需要绑定一张 HDR 贴图

<img src="https://gw.alipayobjects.com/zos/OasisHub/3e7d376f-c8a4-4200-b859-d1a8db1859fe/skybox.gif" alt="skybox" style="zoom:100%;" />

| 属性       | 功能       |
| :--------- | :--------- |
| Tint Color | 颜色，相乘 |
| Exposure   | 曝光度     |
| Rotation   | 旋转       |
| HDR        | HDR 贴图   |

### Sky Procedural

程序化大气散射天空

<img src="https://gw.alipayobjects.com/zos/OasisHub/cee919e3-07dc-4dec-9d7a-4dafd0a2cb90/skyProcedural.gif" alt="skyProcedural" style="zoom:100%;" />

| 属性                 | 功能         |
| :------------------- | :----------- |
| Exposure             | 曝光度       |
| Sun Mode             | 太阳光晕     |
| Sun Size             | 太阳大小     |
| Atmosphere Thickness | 大气散射厚度 |
| Sky Tint             | 天空颜色     |
| Ground Tint          | 地面颜色     |
