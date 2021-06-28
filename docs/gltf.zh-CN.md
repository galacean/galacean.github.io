---
order: 5
title: glTF 资源
type: 资源系统
---

## 什么是 glTF?

正如[官网](https://www.khronos.org/gltf/)所介绍，**glTF**（GL Transmission Format）是 [khronos ](https://www.khronos.org/)发布的一种能高效传输和加载 3D 场景的规范，是 3D 领域中的 "JPEG" 格式，其功能涵盖了 FBX、OBJ 等传统模型格式，基本支持 3D 场景中的所有特性，其[插件机制](https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos)也使用户可以灵活地自定义实现想要的功能。

<playground src="gltf-loader.ts"></playground>

## Oasis 设计解析

### 管道设计

glTF 的解析流程其实是一套天然的**管道工作流**（Pipeline Workflow）。

**整个解析流程可以分为一个个子任务（管道），每个子任务的处理结果拼装成最后的解析结果**。Oasis 针对 glTF 文件拆分成了如下图几个核心解析模块，每个模块的输入、解析产物都是 [GLTFResource](https://oasisengine.cn/0.4/api/loader/GLTFResource#GLTFResource) ，即 `void parser(context: GLTFResource)`。比如 **Material Parser** 模块，负责**解析材质**， 即 GLTFResource 中的 [materials](https://oasisengine.cn/0.4/api/loader/GLTFResource#materials) 对象；因为材质需要绑定纹理，纹理又依赖于图片或者 Buffer，所以需要放在 **Buffer Parser** 、**Texture Parser** 管道的后面。

![image.png](https://gw.alipayobjects.com/zos/OasisHub/0a2de1eb-c556-43e8-b888-94f47d6e44c2/1624352655241-dfeecb8b-9192-4734-adf7-aa615ea3d613.png)

**管道可以增加、拆卸，可以自定义组装**。如图，在 Material 管道和 Mesh 管道中间增加一个自定义管道：

![image.png](https://gw.alipayobjects.com/zos/OasisHub/46c6c41d-b482-4c4f-92d5-308d24ba4665/1624357385559-c04dab59-34bc-4606-917a-c88c71c6fc42.png)

**管道可以是同步堵塞执行，也可以是异步执行**。即管道函数如果返回 `void`，则非堵塞运行；如果返回 `Promise<void>`，则堵塞运行。如下标红部分为实现此功能的代码。

![image.png](https://gw.alipayobjects.com/zos/OasisHub/b35ccba6-c8af-417f-b96f-3bc66e4eddab/1624420094580-03037fb5-633d-4a96-8852-37ab7662bf96.png)

### 插件拓展

Oasis 目前支持了以下插件：

| 插件 | 功能 |
| :-- | :-- |
| [KHR_draco_mesh_compression](https://github.com/oasis-engine/engine/blob/main/packages/loader/src/gltf/extensions/KHR_draco_mesh_compression.ts) | 支持 Draco 压缩模型，节省显存 |
| [KHR_lights_punctual](https://github.com/oasis-engine/engine/blob/main/packages/loader/src/gltf/extensions/KHR_lights_punctual.ts) | 支持多种光源组合 |
| [KHR_materials_pbrSpecularGlossiness](https://github.com/oasis-engine/engine/blob/main/packages/loader/src/gltf/extensions/KHR_materials_pbrSpecularGlossiness.ts) | 支持 PBR 高光-光泽度工作流 |
| [KHR_materials_unlit](https://github.com/oasis-engine/engine/blob/main/packages/loader/src/gltf/extensions/KHR_materials_unlit.ts) | 支持 [Unlit 材质](https://oasisengine.cn/0.4/docs/artist-unlit-cn) |
| [KHR_materials_variants](https://github.com/oasis-engine/engine/blob/main/packages/loader/src/gltf/extensions/KHR_materials_variants.ts) | 支持多材质切换 |
| [KHR_mesh_quantization](https://github.com/oasis-engine/engine/blob/main/packages/loader/src/gltf/extensions/KHR_mesh_quantization.ts) | 支持[顶点数据压缩](https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_mesh_quantization#extending-mesh-attributes)，节省显存 |
| [KHR_texture_transform](https://github.com/oasis-engine/engine/blob/main/packages/loader/src/gltf/extensions/KHR_texture_transform.ts) | 支持纹理 [TilingOffset](https://oasisengine.cn/0.4/examples#tiling-offset)， 缩放位移变换 |

从上方插件的源代码实现可以看到，要拓展一个插件，可以先写一个**插件解析器类（ExtensionParser）**，然后使用[装饰器](https://www.tslang.cn/docs/handbook/decorators.html)表明这个类是用来处理某个插件的，如：

```typescript
@registerExtension("KHR_materials_unlit")
class KHR_materials_unlit extends ExtensionParser {
  parseEngineResource(
    schema: ExtensionSchema,

    parseResource: EngineObject,

    context: GLTFResource,

    ...extra: any[]
  ): void | Promise<void>;

  createEngineResource(
    schema: ExtensionSchema,

    context: GLTFResource,

    ...extra: any[]
  ): EngineObject | Promise<EngineObject>;
}
```

插件解析器提供了 `parseEngineResource` 用来加工中间产物（如加工材质），`createEngineResource`用来生成新的产物（如生成新的材质类型）。当插件存在多个解析器时，会依次执行每个加工函数，但只返回第一个产物（因为产物只能使用一个）。

如图为解析材质插件的例子：

![image.png](https://gw.alipayobjects.com/zos/OasisHub/9b4c7396-4b99-4aa3-8257-45d6b6801a0a/1624430021841-39fe3807-9084-466a-8390-3365afa663e1.png)

> 目前只能基于[官方插件](https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos)进行拓展，尚未支持自定义拓展。可以关注 Oasis [glTF 项目](https://github.com/orgs/oasis-engine/projects/14)获取最新进展。

## glTF 简介

![image.png](https://gw.alipayobjects.com/zos/OasisHub/82f9d9ba-9690-4e1f-b483-da9e06ce0b2a/1624260476713-88f8e0e2-5f11-4baa-bd91-b98620db8405.png)

如图为 glTF 的核心功能，每个场景由一系列有层级关系的**节点**组成，每一个节点可以包含多个组件，主要包括**渲染器组件**（由 **骨骼**、**网格**、**材质**组成)，**动画组件**；这些功能组件的数据源会从文件的其他字段里面进行获取，比如渲染器的顶点数据会从 **Buffer**中进行获取，材质纹理会从图片 **Image**或者 Buffer 中进行读取。

### 场景/节点

在 glTF 中，3D 世界由场景组成，每个场景由不同的节点组成，节点作为场景中的基本单元，拥有**位置、旋转、缩放**等属性，并拥有层级关系，可以通过**切换场景**来管理这些节点。

### 功能组件

如果说节点是“骨架”，那么功能组件就是“血肉”。虽然 glTF 涉及到组件的字段有很多，但是核心功能组件只有**渲染器**和**动画**。

#### 渲染器组件

渲染器组件由 **Mesh**（网格）、**Skin**（骨骼）、**Material**（材质）组成，是节点中**最重要**的组件，因为它决定了 3D 模型的**形状**以及**外观**。

![image.png](https://gw.alipayobjects.com/zos/OasisHub/c5047353-f84a-4ffb-a9c2-48b51201f77b/1624262181929-3d098d96-bb51-4c25-8496-f4a3eeb60657.png)

如上图，**网格**加**材质**可以渲染出一个模型，如果有**骨骼数据**，那么还可以基于骨骼动画做出各种不同的姿势。三要素在 glTF 中都有体现：

[**网格**](https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#reference-mesh)。网格是由一个个顶点组成的，glTF 不仅可以保存**顶点位置、法线、纹理坐标、骨骼权重**等顶点相关数据，还可以保存**图元拓扑模式**、**morph** 数据等更多配置。

[**材质**](https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#reference-material)。默认情况下，glTF 解析的材质类型都是**金属-粗糙度**工作流的**PBR 材质**，当然也可以通过插件拓展更多的材质类型，比如不受光影响的 [UnlitMaterial](https://oasisengine.cn/0.4/docs/artist-unlit-cn)。

[**骨骼**](https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#reference-skin)。骨骼数据其实是由一组关节(joints)组成，关节的旋转位移缩放将会影响原模型的形状。

#### 动画组件

动画的意义在于能让模型动态变化。前面说到，网格+材质已经可以组成一个模型渲染器，那控制哪些元素才可以让模型动起来呢？

改变节点的旋转位移缩放。

![image.png](https://gw.alipayobjects.com/zos/OasisHub/2b2771fc-033d-4b8f-9e99-0ba52862d066/1624335022884-c0c9afae-27bb-43b2-8df0-41bd927edf40.png)

改变骨骼节点的旋转位移缩放。

![image.png](https://gw.alipayobjects.com/zos/OasisHub/f1dd5743-cd2e-4074-8971-168d070f5979/1624334838382-f531849a-64b9-463f-a301-71b1224ad447.png)

改变 [Morph](https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#morph-targets) 权重（顶点权重动画）。

![Anim_TheWave.gif](https://gw.alipayobjects.com/zos/OasisHub/fdb3ed56-cfc4-4ec1-849e-b8a6f35323c6/1624335186899-9c14f222-4a71-4c44-9c8f-03093f67bac8.gif)

### 数据源

为了实现 glTF 的核心功能，顶点数据、动画数据、图片数据、骨骼数据等都需要访问 [Accessor](https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#accessors) ，每一个 Accessor 包含了数据类型（如浮点数数组）、数据偏移、数据大小等信息，然后最终都会从二进制 Buffer 中进行数据读取。

![image.png](https://gw.alipayobjects.com/zos/OasisHub/f49ecf15-5d08-4042-8861-7df6014c36d0/1624344087040-1e66d473-acd3-48ed-9011-7edbddbd34a5.png)

## 插件机制

glTF 除了上述的核心功能，每个字段都还预留了插件接口，只要遵循接口规范，就可以在核心功能的基础上进行功能拓展，例如[官方插件](https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos)和一些[供应商插件](https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Vendor)。

接下来我们通过一个材质插件 [**KHR_materials_pbrSpecularGlossiness**](https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_pbrSpecularGlossiness)来了解下机制。默认情况下，glTF 解析的材质类型都是**金属-粗糙度**工作流的 [PBR 材质](https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#materials)，通过预留的 **extensions**接口，可以往里面增加插件配置：

```json

{

"name": "PBR Specular",

// ...... 原来的核心功能

// 插件功能

"extensions": {

​ // specular 插件

​ "KHR_materials_pbrSpecularGlossiness": {

​ // 高光颜色

​ "specularFactor": [1.0, 0.766, 0.336],

​ // 光泽度

​ "glossinessFactor": 0.5,

​ // 高光光泽度纹理

​ "specularGlossinessTexture": {

​ "index": 1

​ }

​ }

}

}

```

如上配置，extensions 里面有 KHR_materials_pbrSpecularGlossiness 字段，代表解析材质的时候需要同时考虑到这个插件的属性，比如材质的法线相关属性仍从核心字段中进行解析，但是高光光泽度等信息需要从插件字段中进行解析。

> 除了在需要解析的地方存在插件 extensions ，根路径的 **extensionsRequired **可以设置需要哪些插件， **extensionsUsed **可以设置用到了哪些插件。解析器在遇到上述配置后，会根据官方的插件规范，进行一定的规则处理。比如`extensionsUsed:["KHR_materials_pbrSpecularGlossiness"]`代表有这个插件，如果待会儿处理材质的时候遇到了该插件，需要解析它，即使引擎不支持该插件，也会有降级选择；但如果是 `**extensionsRequired **:["KHR_materials_pbrSpecularGlossiness"]`，则代表材质解析强制依赖这个插件，如果引擎不支持高光-光泽度工作流，则解析 glTF 直接失败。

## Reference

glTF 官网：[https://www.khronos.org/gltf/](https://www.khronos.org/gltf/)

glTF 2.0 规范：[https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md](https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md)

glTF 插件：[https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0](https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos)

glTF 示例：[https://github.com/KhronosGroup/glTF-Sample-Models/tree/master/2.0#gltf-20-sample-models](https://github.com/KhronosGroup/glTF-Sample-Models/tree/master/2.0#gltf-20-sample-models)

Oasis 官网教程：[https://oasisengine.cn/0.4/docs/model-cn](https://oasisengine.cn/0.4/docs/model-cn)

Oasis 编辑器教程：[https://oasisengine.cn/0.4/docs/editor-model-cn](https://oasisengine.cn/0.4/docs/editor-model-cn)

glTF Viewer： [https://oasisengine.cn/gltf-viewer](https://oasisengine.cn/gltf-viewer)
