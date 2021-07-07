---
order: 5
title: glTF 资源
type: 资源系统
---

## 什么是 glTF?

正如[官网](https://www.khronos.org/gltf/)所介绍，**glTF**（GL Transmission Format）是 [khronos ](https://www.khronos.org/)发布的一种能高效传输和加载 3D 场景的规范，是 3D 领域中的 "JPEG" 格式，其功能涵盖了 FBX、OBJ 等传统模型格式，基本支持 3D 场景中的所有特性，其[插件机制](https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos)也使用户可以灵活地自定义实现想要的功能。

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
| [sceneRoots](${api}loader/GLTFResource#sceneRoots) | glTF 可能包含多个场景，即多个根节点，但是默认导出只能有一个场景，开发者可以手动添加/切换场景 |
| [animations](${api}loader/GLTFResource#animations) | 动画片段 |
| [cameras](${api}loader/GLTFResource#cameras) | glTF 可以导出相机，但是引擎默认使用之前用户创建的相机，开发者可以手动切换 glTF 相机 |
| [entities](${api}loader/GLTFResource#entities) | 解析后的所有实体 |
| [materials](${api}loader/GLTFResource#materials) | 解析后的所有材质 |
| [textures](${api}loader/GLTFResource#textures) | 解析后的所有纹理 |
| [lights](${api}loader/GLTFResource#lights) | 解析后的所有光源 |

## 更多使用

### 播放动画

```typescript
const { animations, defaultSceneRoot } = await this.engine.resourceManager.load<GLTFResource>("https://***.gltf");
const animator = defaultSceneRoot.getComponent(Animation);

rootEntity.addChild(defaultSceneRoot);
animator.playAnimationClip(animations[0].name);
```

### 切换 glTF 相机

```typescript
const { cameras, defaultSceneRoot } = await this.engine.resourceManager.load<GLTFResource>("https://***.gltf");

rootEntity.addChild(defaultSceneRoot);

if (cameras) {
  const replaceCamera = cameras[0];

  originalCamera.enabled = false;
  replaceCamera.enabled = true;
}
```

### 切换场景

```typescript
const { sceneRoots } = await this.engine.resourceManager.load<GLTFResource>("https://***.gltf");

if (sceneRoots.length > 1) {
  const replaceSceneRoot = sceneRoots[1];

  rootEntity.addChild(replaceSceneRoot);
}
```

### 多材质切换

如果 glTF 文件包含[多材质插件](https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_variants),则可以利用 [variants](<(${api}loader/GLTFResource#variants)>) 来切换材质。

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
