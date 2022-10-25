---
order: 3
title: glTF
type: 资源
label: Resource
---

## 什么是 glTF?

正如 [glTF 官网](https://www.khronos.org/gltf/) 所介绍，**glTF**（GL Transmission Format）是 [khronos ](https://www.khronos.org/)发布的一种能高效传输和加载 3D 场景的规范，是 3D 领域中的 "JPEG" 格式，其功能涵盖了 FBX、OBJ 等传统模型格式，基本支持 3D 场景中的所有特性，其[插件机制](https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos)也使用户可以灵活地自定义实现想要的功能。

glTF 的产物一般分为（.gltf + .bin + png）或者 (.glb)，前者适合图片体积大的场景，所以将图片和模型拆分开来，可以异步加载模型和纹理；后者适合模型文件较大的场景，会将所有数据进行二进制保存，需要等所有数据解析完毕才能展示模型。

glTF 是目前 Oasis 推荐的首选 3D 场景传输格式，Oasis 对 glTF 的核心功能和插件都做了很好的支持。

<playground src="gltf-loader.ts"></playground>

## 加载 glTF

首先，我们可以通过 [ResourceManager](${api}core/ResourceManager#load) 加载一个 glTF 文件，如下代码：

```typescript
import { GLTFResource } from "oasis-engine";

const gltfResource = await this.engine.resourceManager.load<GLTFResource>("https://***.gltf");
```

加载完成后，我们拿到了 1 份 [GLTFResource](${api}loader/GLTFResource)，里面有很多解析产物，一般情况下，我们只需要把解析得到的 [defaultSceneRoot](${api}loader/GLTFResource#defaultSceneRoot) 添加到引擎中即可，如下代码：

```typescript
import { GLTFResource } from "oasis-engine";

// 此处省略引擎初始化代码...
const rootEntity = engine.sceneManager.activeScene.createRootEntity();
const { defaultSceneRoot } = await this.engine.resourceManager.load<GLTFResource>("https://***.gltf");

rootEntity.addChild(defaultSceneRoot);
```

除了 `defaultSceneRoot`，`GLTFResource` 中还有许多常用的解析产物：

| 解析产物 | 功能 |
| :-- | :-- |
| [gltf](${api}loader/GLTFResource#gltf) | glTF 源文件 JSON 格式 |
| [defaultSceneRoot](${api}loader/GLTFResource#defaultSceneRoot) | glTF 默认根节点 |
| [sceneRoots](${api}loader/GLTFResource#sceneRoots) | glTF 可能包含多个根节点，但是默认导出只能有一个根节点，开发者可以手动添加/切换根节点 |
| [animations](${api}loader/GLTFResource#animations) | 动画片段 |
| [cameras](${api}loader/GLTFResource#cameras) | glTF 可以导出相机，但是引擎默认使用之前用户创建的相机，开发者可以手动切换 glTF 相机 |
| [entities](${api}loader/GLTFResource#entities) | 解析后的所有实体 |
| [materials](${api}loader/GLTFResource#materials) | 解析后的所有材质 |
| [textures](${api}loader/GLTFResource#textures) | 解析后的所有纹理 |
| [lights](${api}loader/GLTFResource#lights) | 解析后的所有光源 |

## 更多使用

### 播放动画

我们先从根节点上获取 [Animator](${api}core/Animator) 组件，然后可以选择播放哪一个动画片段。

```typescript
const { animations, defaultSceneRoot } = await this.engine.resourceManager.load<GLTFResource>("https://***.gltf");
const animation = defaultSceneRoot.getComponent(Animator);

rootEntity.addChild(defaultSceneRoot);
animation.playAnimationClip(animations[0].name);
```

### 切换 glTF 相机

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

### 选择场景根节点

glTF 中的场景(**Scene**)指的是根节点，即引擎的 [Entity](${api}core/Entity)。除了默认场景根节点 `defaultSceneRoot`，还可能包含多个场景根节点 `sceneRoots`，开发者可以手动选择/切换根节点。

```typescript
const { sceneRoots, defaultSceneRoot } = await this.engine.resourceManager.load<GLTFResource>("https://***.gltf");

if (sceneRoots.length > 1) {
  const replaceSceneRoot = sceneRoots[1];

  // 注意此处，使用的并不是 defaultSceneRoot
  rootEntity.addChild(replaceSceneRoot);
}
```

### 多材质切换

如果 glTF 文件包含[多材质插件](https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_variants)，则可以利用 [variants](<(${api}loader/GLTFResource#variants)>) 来切换材质。

```typescript
const { variants, defaultSceneRoot } = await this.engine.resourceManager.load<GLTFResource>("https://***.gltf");

rootEntity.addChild(defaultSceneRoot);

// variants?: { renderer: Renderer; material: Material; variants: string[] }[];
if (variants) {
  const replaceVariant = variants[0];
  const { renderer, material } = replaceVariant;

  renderer.setMaterial(material);
}
```

### 插件支持

Oasis 目前支持以下 glTF 插件，若 glTF 文件中包含相应插件，则会自动加载相应功能：

| 插件 | 功能 |
| :-- | :-- |
| [KHR_draco_mesh_compression](https://github.com/oasis-engine/engine/blob/main/packages/loader/src/gltf/extensions/KHR_draco_mesh_compression.ts) | 支持 Draco 压缩模型，节省显存 |
| [KHR_lights_punctual](https://github.com/oasis-engine/engine/blob/main/packages/loader/src/gltf/extensions/KHR_lights_punctual.ts) | 支持多光源组合，会解析成引擎的光源，详见[光照教程](${docs}light-cn) |
| [KHR_materials_pbrSpecularGlossiness](https://github.com/oasis-engine/engine/blob/main/packages/loader/src/gltf/extensions/KHR_materials_pbrSpecularGlossiness.ts) | 支持 PBR [高光-光泽度工作流](${api}core/PBRSpecularMaterial) |
| [KHR_materials_unlit](https://github.com/oasis-engine/engine/blob/main/packages/loader/src/gltf/extensions/KHR_materials_unlit.ts) | 支持 [Unlit 材质](https://oasisengine.cn/0.4/docs/artist-unlit-cn) |
| [KHR_materials_variants](https://github.com/oasis-engine/engine/blob/main/packages/loader/src/gltf/extensions/KHR_materials_variants.ts) | 允许渲染器存在多个材质，然后通过 [setMaterial](${api}core/Renderer#setMaterial) 接口进行材质切换 |
| [KHR_mesh_quantization](https://github.com/oasis-engine/engine/blob/main/packages/loader/src/gltf/extensions/KHR_mesh_quantization.ts) | 支持[顶点数据压缩](https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_mesh_quantization#extending-mesh-attributes)，节省显存，如顶点数据一般都是浮点数，此插件可以保存为整型 |
| [KHR_texture_transform](https://github.com/oasis-engine/engine/blob/main/packages/loader/src/gltf/extensions/KHR_texture_transform.ts) | 支持纹理的缩放位移变换，可以参考 [TilingOffset](https://oasisengine.cn/0.4/examples#tiling-offset) 案例 |
