---
order: 3
title: glTF
type: Resource
label: Resource
---

## What is glTF?

As [glTF Official Website](https://www.khronos.org/gltf/) described, **glTF**（GL Transmission Format）It is a specification that can efficiently transmit and load 3D scenes in [khronos ](https://www.khronos.org/), which is a "JPEG" format in the 3D field, which features traditional models such as FBX, OBJ. Format, basically support all features in 3D scenes,Its [Plug-in mechanism](https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos) also enables users to flexibly customize the desired features.

The products of glTF are generally divided into (.gltf + .bin + png) or (.glb), the former is suitable for scenes with large pictures, so the pictures and models are separated, and models and textures can be loaded asynchronously; the latter is suitable for models For scenarios with large files, all data will be stored in binary, and the model needs to be parsed after all data is parsed.

glTF is currently the preferred 3D scene transmission format recommended by Oasis. Oasis has made good support for the core functions and plugins of glTF.

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
| [url](${api}loader/GLTFResource#gltf) | glTF source url |
| [defaultSceneRoot](${api}loader/GLTFResource#defaultSceneRoot) | default root node |
| [sceneRoots](${api}loader/GLTFResource#sceneRoots) | glTF may contain multiple root nodes, but the default export can only have one root node, the developer can manually add / switch the root node. |
| [animations](${api}loader/GLTFResource#animations) | animation clip |
| [cameras](${api}loader/GLTFResource#cameras) | glTF can export the camera, but the engine uses the camera created by the user by default, the developer can switch the glTF camera manually |
| [entities](${api}loader/GLTFResource#entities) | All entities parsed |
| [materials](${api}loader/GLTFResource#materials) | All materials parsed |
| [textures](${api}loader/GLTFResource#textures) | All textures parsed |
| [lights](${api}loader/GLTFResource#lights) | All lights parsed |

## More usage

### 1. Play animation

Let's get [Animator](${api}core/Animator) from the root node first, then you can choose which animation clip playing.

```typescript
const { animations, defaultSceneRoot } = await this.engine.resourceManager.load<GLTFResource>("https://***.gltf");
const animation = defaultSceneRoot.getComponent(Animator);

rootEntity.addChild(defaultSceneRoot);
animation.playAnimationClip(animations[0].name);
```

### 2. Switch glTF camera

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

### 3. Choose root entity in scene

The **scene** in the glTF refers to the root node, that is, the engine's [Entity](${api}core/Entity). In addition to the default scene root node `defaultSceneRoot`, it is also possible to include multiple scene root nodes `sceneRoots`, developers can manually select / switch the root node.

```typescript
const { sceneRoots, defaultSceneRoot } = await this.engine.resourceManager.load<GLTFResource>("https://***.gltf");

if (sceneRoots.length > 1) {
  const replaceSceneRoot = sceneRoots[1];

  // Please note that this is not defaultSceneRoot
  rootEntity.addChild(replaceSceneRoot);
}
```

### 4. Multi-material switch

you can use [multi-material plugin](https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_variants) to switch the material.

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

## Plugins support

Oasis currently supports the following glTF plugins, if the corresponding plugin is included in the glTF file, the corresponding capability is automatically loaded:

| Plugin | Feature |
| :-- | :-- |
| [KHR_draco_mesh_compression](https://github.com/oasis-engine/engine/blob/main/packages/loader/src/gltf/extensions/KHR_draco_mesh_compression.ts) | Support DRACO compression model to save GPU memory |
| [KHR_lights_punctual](https://github.com/oasis-engine/engine/blob/main/packages/loader/src/gltf/extensions/KHR_lights_punctual.ts) | Support multi-light combination, it resolves the light source of the engine, see [Light tutorial](${docs}light) |
| [KHR_materials_pbrSpecularGlossiness](https://github.com/oasis-engine/engine/blob/main/packages/loader/src/gltf/extensions/KHR_materials_pbrSpecularGlossiness.ts) | Support PBR [specular-glossiness workflow](${api}core/PBRSpecularMaterial) |
| [KHR_materials_unlit](https://github.com/oasis-engine/engine/blob/main/packages/loader/src/gltf/extensions/KHR_materials_unlit.ts) | Support [Unlit Material](https://oasisengine.cn/0.4/docs/artist-unlit) |
| [KHR_materials_variants](https://github.com/oasis-engine/engine/blob/main/packages/loader/src/gltf/extensions/KHR_materials_variants.ts) | Allow the renderer to exist multiple materials, then make material switching via [setMaterial](${api}core/Renderer#setMaterial) API |
| [KHR_mesh_quantization](https://github.com/oasis-engine/engine/blob/main/packages/loader/src/gltf/extensions/KHR_mesh_quantization.ts) | Support [Vertical data compression](https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_mesh_quantization#extending-mesh-attributes) to save memory in CPU and GPU. for example, if the vertex data is generally floating point, this plugin can be saved as integer |
| [KHR_texture_transform](https://github.com/oasis-engine/engine/blob/main/packages/loader/src/gltf/extensions/KHR_texture_transform.ts) | Support for texture zoom and displacement, you can refer to [TilingOffset](https://oasisengine.cn/#/examples/latest/tiling-offset) demo |
| [KHR_materials_clearcoat](https://github.com/ant-galaxy/oasis-engine/blob/main/packages/loader/src/gltf/extensions/KHR_materials_clearcoat.ts) | Support PBR Clearcoat, you can refer to [Clearcoat](https://oasisengine.cn/#/examples/latest/pbr-clearcoat) demo |
| [OASIS_materials_remap](https://github.com/ant-galaxy/oasis-engine/blob/main/packages/loader/src/gltf/extensions/OASIS_materials_remap.ts) | Oasis Editor remap material plugin. |

## Plugin Extension

If the official built-in plugins cannot meet your needs, we also provide a way to expand the plugins.

For example, if Unity exports the following glTF plugins, it is hoped that a new custom material can be created according to the material extension `Unity_Material_Plugin`, and then according to the light plugin `Unity_Light_Plugin`, it is desired to add a light to a certain entity:

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

### 1. Custom creation and parse

According to the above example, we register a material plugin, and the second parameter `GLTFExtensionMode.CreateAndParse` indicates that this plugin is used to create instances and parse:

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

### 2. Additive Parse

According to the above example, we register a lighting plugin, and the second parameter `GLTFExtensionMode.AdditiveParse` indicates that this plugin performs some incremental parsing on the basis of the original instance, such as adding a light source to this entity:

```ts
@registerGLTFExtension("Unity_Light_Plugin", GLTFExtensionMode.AdditiveParse)
class UnityLightPlugin extends GLTFExtensionParser {
  additiveParse(context: GLTFParserContext, entity: Entity, extensionSchema: {type,...other}): void {
    entity.addComponent(type==="point"?PointLight:DirectLight);
    ...
  }
}
```

### 3. Custom pipeline

If the above methods do not meet your needs, you can also completely customize the glTF pipeline to rewrite the parsing logic:

```ts

class CustomMaterialParser extends GLTFParser{
   parse(context: GLTFParserContext): AssetPromise<Material[]> {
      const { glTF, glTFResource, materialsPromiseInfo } = context;
      glTFResource.materials = materials;
      for (let i = 0; i < glTF.materials.length; i++) {
        const materialInfo = glTF.materials[i];
        ...
      }
      materialsPromiseInfo.resolve(materials);
      return materialsPromiseInfo.promise;
   }
}

engine.resourceManager
    .load<GLTFResource>({
      type: AssetType.Prefab,
      url: "https://gw.alipayobjects.com/os/bmw-prod/150e44f6-7810-4c45-8029-3575d36aff30.gltf"
      params: {
        pipeline: new GLTFPipeline(
          ...
          CustomMaterialParser,
          ...
        )
      }
    })
    .then((gltf) => {
      const entity = rootEntity.createChild();
      entity.addChild(gltf.defaultSceneRoot);
    })
```
