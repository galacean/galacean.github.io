---
order: 3
title: glTF
type: 资源
label: Resource
---

## 什么是 glTF?

正如 [glTF 官网](https://www.khronos.org/gltf/) 所介绍，**glTF**（GL Transmission Format）是 [khronos ](https://www.khronos.org/)发布的一种能高效传输和加载 3D 场景的规范，是 3D 领域中的 "JPEG" 格式，其功能涵盖了 FBX、OBJ 等传统模型格式，基本支持 3D 场景中的所有特性，其[插件机制](https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos)也使用户可以灵活地自定义实现想要的功能。

glTF 的产物一般分为（.gltf + .bin + png）或者 (.glb)，前者适合图片体积大的场景，所以将图片和模型拆分开来，可以异步加载模型和纹理；后者适合模型文件较大的场景，会将所有数据进行二进制保存，需要等所有数据解析完毕才能展示模型。

glTF 是目前 Galacean 推荐的首选 3D 场景传输格式，Galacean 对 glTF 的核心功能和插件都做了很好的支持。

<playground src="gltf-loader.ts"></playground>

## 加载 glTF

首先，我们可以通过 [ResourceManager](${api}core/ResourceManager#load) 加载一个 glTF 文件，如下代码：

```typescript
import { GLTFResource } from "@galacean/engine";

const gltfResource = await this.engine.resourceManager.load<GLTFResource>("https://***.gltf");
```

加载完成后，我们拿到了 1 份 [GLTFResource](${api}loader/GLTFResource)，里面有很多解析产物，一般情况下，我们只需要把解析得到的 [defaultSceneRoot](${api}loader/GLTFResource#defaultSceneRoot) 添加到引擎中即可，如下代码：

```typescript
import { GLTFResource } from "@galacean/engine";

// 此处省略引擎初始化代码...
const rootEntity = engine.sceneManager.activeScene.createRootEntity();
const { defaultSceneRoot } = await this.engine.resourceManager.load<GLTFResource>("https://***.gltf");

rootEntity.addChild(defaultSceneRoot);
```

除了 `defaultSceneRoot`，`GLTFResource` 中还有许多常用的解析产物：

| 解析产物 | 功能 |
| :-- | :-- |
| [url](${api}loader/GLTFResource#gltf) | glTF 源文件请求地址 |
| [defaultSceneRoot](${api}loader/GLTFResource#defaultSceneRoot) | glTF 默认根节点 |
| [sceneRoots](${api}loader/GLTFResource#sceneRoots) | glTF 可能包含多个根节点，但是默认导出只能有一个根节点，开发者可以手动添加/切换根节点 |
| [animations](${api}loader/GLTFResource#animations) | 动画片段 |
| [cameras](${api}loader/GLTFResource#cameras) | glTF 可以导出相机，但是引擎默认使用之前用户创建的相机，开发者可以手动切换 glTF 相机 |
| [entities](${api}loader/GLTFResource#entities) | 解析后的所有实体 |
| [materials](${api}loader/GLTFResource#materials) | 解析后的所有材质 |
| [textures](${api}loader/GLTFResource#textures) | 解析后的所有纹理 |
| [lights](${api}loader/GLTFResource#lights) | 解析后的所有光源 |

## 更多使用

### 1. 播放动画

我们先从根节点上获取 [Animator](${api}core/Animator) 组件，然后可以选择播放哪一个动画片段。

```typescript
const { animations, defaultSceneRoot } = await this.engine.resourceManager.load<GLTFResource>("https://***.gltf");
const animation = defaultSceneRoot.getComponent(Animator);

rootEntity.addChild(defaultSceneRoot);
animation.playAnimationClip(animations[0].name);
```

### 2. 切换 glTF 相机

引擎默认不使用 glTF 导出的相机，如果需要，可以先禁用引擎的默认相机，然后启用 glTF 导出的某个相机。

```typescript
const { cameras, defaultSceneRoot } = await this.engine.resourceManager.load<GLTFResource>("https://***.gltf");

rootEntity.addChild(defaultSceneRoot);

if (cameras) {
  const replaceCamera = cameras[0];

  originalCamera.enabled = false;
  replaceCamera.enabled = true;
}
```

### 3. 选择场景根节点

glTF 中的场景(**Scene**)指的是根节点，即引擎的 [Entity](${api}core/Entity)。除了默认场景根节点 `defaultSceneRoot`，还可能包含多个场景根节点 `sceneRoots`，开发者可以手动选择/切换根节点。

```typescript
const { sceneRoots, defaultSceneRoot } = await this.engine.resourceManager.load<GLTFResource>("https://***.gltf");

if (sceneRoots.length > 1) {
  const replaceSceneRoot = sceneRoots[1];

  // 注意此处，使用的并不是 defaultSceneRoot
  rootEntity.addChild(replaceSceneRoot);
}
```

### 4. 多材质切换

glTF [多材质插件](https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_variants) 可以用来切换材质。

```typescript
const { extensionsData, defaultSceneRoot } = await this.engine.resourceManager.load<GLTFResource>("https://***.gltf");

rootEntity.addChild(defaultSceneRoot);

const variants: IGLTFExtensionVariants = extensionsData?.variants;
// variants?: Array({ renderer: Renderer; material: Material; variants: string[] });
if (variants) {
  const extensionData = extensionsData;
  const replaceVariant = variants[0];
  const { renderer, material } = replaceVariant;

  renderer.setMaterial(material);
}
```

## 插件支持

Galacean 目前支持以下 glTF 插件，若 glTF 文件中包含相应插件，则会自动加载相应功能：

| 插件 | 功能 |
| :-- | :-- |
| [KHR_draco_mesh_compression](https://github.com/oasis-engine/engine/blob/main/packages/loader/src/gltf/extensions/KHR_draco_mesh_compression.ts) | 支持 Draco 压缩模型，节省显存 |
| [KHR_lights_punctual](https://github.com/oasis-engine/engine/blob/main/packages/loader/src/gltf/extensions/KHR_lights_punctual.ts) | 支持多光源组合，会解析成引擎的光源，详见[光照教程](${docs}light-cn) |
| [KHR_materials_pbrSpecularGlossiness](https://github.com/oasis-engine/engine/blob/main/packages/loader/src/gltf/extensions/KHR_materials_pbrSpecularGlossiness.ts) | 支持 PBR [高光-光泽度工作流](${api}core/PBRSpecularMaterial) |
| [KHR_materials_unlit](https://github.com/oasis-engine/engine/blob/main/packages/loader/src/gltf/extensions/KHR_materials_unlit.ts) | 支持 [Unlit 材质](https://oasisengine.cn/0.4/docs/artist-unlit-cn) |
| [KHR_materials_variants](https://github.com/oasis-engine/engine/blob/main/packages/loader/src/gltf/extensions/KHR_materials_variants.ts) | 允许渲染器存在多个材质，然后通过 [setMaterial](${api}core/Renderer#setMaterial) 接口进行材质切换 |
| [KHR_mesh_quantization](https://github.com/oasis-engine/engine/blob/main/packages/loader/src/gltf/extensions/KHR_mesh_quantization.ts) | 支持[顶点数据压缩](https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_mesh_quantization#extending-mesh-attributes)，节省显存，如顶点数据一般都是浮点数，此插件可以保存为整型 |
| [KHR_texture_transform](https://github.com/oasis-engine/engine/blob/main/packages/loader/src/gltf/extensions/KHR_texture_transform.ts) | 支持纹理的缩放位移变换，可以参考 [TilingOffset](https://oasisengine.cn/#/examples/latest/tiling-offset) 案例 |
| [KHR_materials_clearcoat](https://github.com/ant-galaxy/oasis-engine/blob/main/packages/loader/src/gltf/extensions/KHR_materials_clearcoat.ts) | 支持材质的透明清漆度拓展，可以参考 [Clearcoat](https://oasisengine.cn/#/examples/latest/pbr-clearcoat) 案例 |
| [GALACEAN_materials_remap](https://github.com/ant-galaxy/oasis-engine/blob/main/packages/loader/src/gltf/extensions/GALACEAN_materials_remap.ts) | 支持编辑器材质映射 |

## 插件拓展

如果官方内置的插件不能满足您的需求，我们还提供了拓展插件的方法。

举个例子，如果 Unity 导出了以下 glTF 插件，希望能根据材质拓展 `Unity_Material_Plugin` 生成新的自定义材质，然后根据灯光插件 `Unity_Light_Plugin` 表示想在某个节点上面加一个灯光：

```json
{
  ...
  materials:[{
    extensions:{
      Unity_Material_Plugin:{
        color: [1,1,1],
        ...
      }
    }
  }],
  nodes:[{
    extensions:{
      Unity_Light_Plugin:{
        type:"point",
        ...
      }
    }
  }]

}
```

### 1. 自定义创建解析

按照上面的例子，我们注册一个材质插件，第二个参数 `GLTFExtensionMode.CreateAndParse` 表示这个插件是用来创建实例和解析的：

```ts
@registerGLTFExtension("Unity_Material_Plugin", GLTFExtensionMode.CreateAndParse)
class UnityMaterialPluginParser extends GLTFExtensionParser {
  createAndParse(context: GLTFParserContext, schema: {color,...other}}): Promise<Material> {
    const { engine } = context.glTFResource;
    const yourCustomMaterial = new Material(engine,customShader);
    ...
    return yourCustomMaterial;
  }
}
```

### 2. 增量解析

按照上面的例子，我们注册一个灯光插件，第二个参数 `GLTFExtensionMode.AdditiveParse` 表示这个插件是在原来实例的基础上进行一些增量解析的,比如在这个实体上添加一个光源：

```ts
@registerGLTFExtension("Unity_Light_Plugin", GLTFExtensionMode.AdditiveParse)
class UnityLightPlugin extends GLTFExtensionParser {
  additiveParse(context: GLTFParserContext, entity: Entity, extensionSchema: {type,...other}): void {
    entity.addComponent(type==="point"?PointLight:DirectLight);
    ...
  }
}
```

### 3. 自定义管线

如果上面的方法还不能满足您的需求，还可以完全自定义解析管线，用来重写解析的逻辑：

```ts
@registerGLTFParser(GLTFParserType.Material)
class CustomMaterialParser extends GLTFParser{
  parse(context: GLTFParserContext, index: number): Promise<Material> {
      const materialInfo = context.glTF.materials[index];
      ...
      return materialPromise;
   }
}

engine.resourceManager
    .load<GLTFResource>({
      type: AssetType.GLTF,
      url: "https://gw.alipayobjects.com/os/bmw-prod/150e44f6-7810-4c45-8029-3575d36aff30.gltf"
    })
    .then((gltf) => {
      const entity = rootEntity.createChild();
      entity.addChild(gltf.defaultSceneRoot);
    })
```
