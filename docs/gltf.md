---
order: 5
title: glTF Resource
type: Resource
---

## What is glTF?

As [glTF Official Website](https://www.khronos.org/gltf/) described, **glTF**（GL Transmission Format）It is a specification that can efficiently transmit and load 3D scenes in [khronos ](https://www.khronos.org/), which is a "JPEG" format in the 3D field, which features traditional models such as FBX, OBJ. Format, basically support all features in 3D scenes,Its [Plug-in mechanism](https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos) also enables users to flexibly customize the desired features. glTF is currently the preferred 3D scene transmission format recommended by Oasis. Oasis has made good support for the core functions and plugins of glTF.

<playground src="gltf-loader.ts"></playground>

## Load glTF

First, we can load a glTF file by [ResourceManager](${api}core/ResourceManager#load), as follows:

```typescript
import { GLTFResource } from "oasis-engine";

const gltfResource = await this.engine.resourceManager.load<GLTFResource>("https://***.gltf");
```

After loading, we got one [GLTFResource](${api}loader/GLTFResource), there are many analytical products inside, in general, we only need to get the parsing [defaultSceneRoot](${api}loader/GLTFResource#defaultSceneRoot) add to the engine, as follows:

```typescript
import { GLTFResource } from "oasis-engine";

// The engine initialization code is omitted here ...
const rootEntity = engine.sceneManager.activeScene.createRootEntity();
const { defaultSceneRoot } = await this.engine.resourceManager.load<GLTFResource>("https://***.gltf");

rootEntity.addChild(defaultSceneRoot);
```

In addition to `defaultSceneRoot`, there are many commonly used analytical products in` GLTFResource`

| analytical products | Features |
| :-- | :-- |
| [gltf](${api}loader/GLTFResource#gltf) | glTF source file, JSON format |
| [defaultSceneRoot](${api}loader/GLTFResource#defaultSceneRoot) | default root node |
| [sceneRoots](${api}loader/GLTFResource#sceneRoots) | glTF may contain multiple root nodes, but the default export can only have one root node, the developer can manually add / switch the root node. |
| [animations](${api}loader/GLTFResource#animations) | animation clip |
| [cameras](${api}loader/GLTFResource#cameras) | glTF can export the camera, but the engine uses the camera created by the user by default, the developer can switch the glTF camera manually |
| [entities](${api}loader/GLTFResource#entities) | All entities parsed |
| [materials](${api}loader/GLTFResource#materials) | All materials parsed |
| [textures](${api}loader/GLTFResource#textures) | All textures parsed |
| [lights](${api}loader/GLTFResource#lights) | All lights parsed |

## More usage

### Play animation

Let's get [Animation](${api}core/Animation) from the root node first, then you can choose which animation clip playing.

```typescript
const { animations, defaultSceneRoot } = await this.engine.resourceManager.load<GLTFResource>("https://***.gltf");
const animation = defaultSceneRoot.getComponent(Animation);

rootEntity.addChild(defaultSceneRoot);
animation.playAnimationClip(animations[0].name);
```

### Switch glTF camera

The engine does not use the camera exported by the glTF by default. If necessary, you can disable the engine's default camera, and then enable a camera exported from the glTF.

```typescript
const { cameras, defaultSceneRoot } = await this.engine.resourceManager.load<GLTFResource>("https://***.gltf");

rootEntity.addChild(defaultSceneRoot);

if (cameras) {
  const replaceCamera = cameras[0];

  originalCamera.enabled = false;
  replaceCamera.enabled = true;
}
```

### Choose root entity in scene

The **scene** in the glTF refers to the root node, that is, the engine's [Entity](${api}core/Entity). In addition to the default scene root node `defaultSceneRoot`, it is also possible to include multiple scene root nodes `sceneRoots`, developers can manually select / switch the root node.

```typescript
const { sceneRoots, defaultSceneRoot } = await this.engine.resourceManager.load<GLTFResource>("https://***.gltf");

if (sceneRoots.length > 1) {
  const replaceSceneRoot = sceneRoots[1];

  // Please note that this is not defaultSceneRoot
  rootEntity.addChild(replaceSceneRoot);
}
```

### Multi-material switch

If the glTF file contains [multi-material plugin](https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_variants), you can take advantage of [variants](<(${api}loader/GLTFResource#variants)>) from `GLTFResource` to switch the material.

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

### Plugins support

Oasis currently supports the following glTF plugins, if the corresponding plugin is included in the glTF file, the corresponding capability is automatically loaded:

| Plugin | Feature |
| :-- | :-- |
| [KHR_draco_mesh_compression](https://github.com/oasis-engine/engine/blob/main/packages/loader/src/gltf/extensions/KHR_draco_mesh_compression.ts) | Support DRACO compression model to save GPU memory |
| [KHR_lights_punctual](https://github.com/oasis-engine/engine/blob/main/packages/loader/src/gltf/extensions/KHR_lights_punctual.ts) | Support multi-light combination, it resolves the light source of the engine, see [Light tutorial](${docs}light) |
| [KHR_materials_pbrSpecularGlossiness](https://github.com/oasis-engine/engine/blob/main/packages/loader/src/gltf/extensions/KHR_materials_pbrSpecularGlossiness.ts) | Support PBR [specular-glossiness workflow](${api}core/PBRSpecularMaterial) |
| [KHR_materials_unlit](https://github.com/oasis-engine/engine/blob/main/packages/loader/src/gltf/extensions/KHR_materials_unlit.ts) | Support [Unlit Material](https://oasisengine.cn/0.4/docs/artist-unlit) |
| [KHR_materials_variants](https://github.com/oasis-engine/engine/blob/main/packages/loader/src/gltf/extensions/KHR_materials_variants.ts) | Allow the renderer to exist multiple materials, then make material switching via [setMaterial](${api}core/Renderer#setMaterial) API |
| [KHR_mesh_quantization](https://github.com/oasis-engine/engine/blob/main/packages/loader/src/gltf/extensions/KHR_mesh_quantization.ts) | Support [Vertical data compression](https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_mesh_quantization#extending-mesh-attributes) to save memory in CPU and GPU. for example, if the vertex data is generally floating point, this plugin can be saved as integer |
| [KHR_texture_transform](https://github.com/oasis-engine/engine/blob/main/packages/loader/src/gltf/extensions/KHR_texture_transform.ts) | Support for texture zoom and displacement, you can refer to [TilingOffset](https://oasisengine.cn/0.4/examples#tiling-offset) in playground |
