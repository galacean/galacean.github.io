---
Order: 1
title: Resource Management and Loading
type: Resource
label: Resource
---

3D resources are generally linked to Engine. We use [resourceManager](${api}core/Engine#resourceManager) mounted in the Engine instance to manage and load resources.

Use [Script component](${docs}script) to load resources. [load](${api}core/ResourceManager#load) method can pass URL, [loadItem](${api}core/LoadItem), and an array which indicate batch loading.


```Typescript
import { GLTFResource } from "@galacean/engine";

export class ResourceScript extension script {
  async onAwake() {
  const gltf = await this.engine.resourceManager.load<GLTFResource>("test.gltf");
    this.entity.addChild(gltf.defaultSceneRoot);
  }
}
```
## Features

### 1. Batch Loading
The load queue can be passed in a set of [LoadItem](${api}core/LoadItem) arrays, or a set of URLs, and the returned result is a sequence of loaded resource queues.

```typescript
const [texture2D, glTFResource] = await this.engine.resourceManager.load(["a.png", "b.gltf"]);
````

### 2. Loading progress

You can get a [AssetPromise](${api}core/AssetPromise) object by calling the loading queue, and you can use [onProgress](${api}core/AssetPromise#onProgress) to get the loading progress.

```typescript
this.engine.resourceManager.load(["a.png", "b.gltf"]).onProgress((progress: number) => {
  console.log(`current progress is ${progress}`);
});
```

### 3. Cancel loading

There is a [cancelNotLoaded](${api}core/ResourceManager#cancelNotLoaded) method in the _ResourceManager_ object. You can call this method to cancel unloaded resources. Passing in the url will cancel the resource loading of the specific url.

```typescript
// cancel all unloaded resources.
this.engine.resourceManager.cancelNotLoaded();
// cancel the specific url resource loading.
this.engine.resourceManager.cancelNotLoaded("test.gltf");
```

> Note: Currently, unloading unfinished resources will throw an exception.


### 4. Get loaded resource

Loaded resources will be cached in *ResourceManager*, to get the loaded assets, you should call the `load` method again.

### 5. Resource Release

In order to avoid reloading resources, when the resources are loaded, they will be cached in _ResourceManager_. The cache itself takes up memory and video memory. When developers no longer need the cached content, they need to manually release the cached content.

> Note: Resources are interdependent.

For example, the entity shown in the figure below contains the [MeshRenderer](${api}core/MeshRenderer) component, which depends on [Material](${api}core/Material). _Material_ may be referenced by multiple _MeshRenderer_. If _Material_ is released, Then other _MeshRenderer_ referencing this will not find the _Material_ and report an error.

![image.png](https://gw.alipayobjects.com/mdn/mybank_yulibao/afts/img/A*wXmqRIwqI18AAAAAAAAAAAAAARQnAQ)

> Note: JavaScript cannot track object references. Generally, in weakly typed languages ​​such as JavaScript, there is no memory management function provided to developers. The memory of all objects is managed through the garbage collection mechanism. You have no way to determine when the object will be released, so there is no [Analysis Destructor](https://zh.wikipedia.org/wiki/%E8%A7%A3%E6%A7%8B%E5%AD%90) to call the release of referenced resources.

`ResourceManager` provides a set of resource release based on reference counting, which requires developers to manually call [gc](${api}core/ResourceManager#gc):

```typescript
engine.resourceManager.gc();
```

## Built-in Resource Types

### 1. Texture2D

> For more texture related documents, please refer to [Texture Resources](${docs}texture).

```typescript
import { Texture2D } from "@galacean/engine";

const texture2D = await this.engine.resourceManager.load<Texture2D>("test.png");
```

The loader will use suffixes such as png and jpg as the basis for judging Texture2D. If you use the CDN address without the suffix, you need to use type to specify the loading type. For example:

```typescript
this.engine.resourceManager.load({ url: "test", type: AssetType.Texture2D, params: { format, mipmap } });
```

#### Additional Params
- format([TextureFormat](${api}core/TextureFormat)): Texture format, default is [TextureFormat.RGBA](${api}core/TextureFormat#RGBA).
- mipmap(boolean): Whether to generate mipmap, default is true.

### 2. TextureCube

> For more texture related documents, please refer to [Texture Resources](${docs}texture).

```typescript
import { TextureCube } from "@galacean/engine";

const textureCube = await this.engine.resourceManager.load<TextureCube>({
  urls: [
    "/static/env/papermill/specular/specular_right_0.jpg",
    "/static/env/papermill/specular/specular_left_0.jpg",
    "/static/env/papermill/specular/specular_top_0.jpg",
    "/static/env/papermill/specular/specular_bottom_0.jpg",
    "/static/env/papermill/specular/specular_front_0.jpg",
    "/static/env/papermill/specular/specular_back_0.jpg"
  ],
  type: AssetType.TextureCube
});
```

[TextureCube](${api}core/TextureCube) uses six pictures as original resources, uses urls to pass the links of six pictures, and uses [AssetType.TextureCube](${api}core/AssetType#TextureCube) for type.

Of course, if you feel that it is a bit troublesome to pass 6 images, you can also use an HDR loader. The advantage is that only one .hdr texture in RGBE format can be used as the background of the skybox; the disadvantage is that the HDR loader is generally used for baking. The color range exceeds the [0-1] environment map, so the file size will be relatively large. If it is only used as a skybox display, the color beyond the [0-1] range is invalid, and the cost performance will be relatively low.
So HDR Loader is suitable for scenarios where there are other uses for floating point color.

```typescript
import { TextureCube } from "@galacean/engine";

engine.resourceManager
  .load<TextureCube>({
    type: AssetType.HDR,
    url: "https://gw.alipayobjects.com/os/bmw-prod/b578946a-8a25-4543-8161-fa92f92ae1ac.bin"
  })
  .then((texture) => {
    skyMaterial.texture = texture;
    // HDR output is in RGBM format.
    skyMaterial.textureDecodeRGBM = true;
  });
```


### 3. Environment
Galacean supports offline baking through [Galacean Editor](https://galacean.antgroup.com/editor) or [glTF Viewer](https://galacean.antgroup.com/#/gltf-viewer) to get IBL baked products `*.env` file.

![gltf viewer](https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*9mGbSpQ4HngAAAAAAAAAAAAAARQnAQ)

After getting the `*.env`, we can load the ambient light through resourceManager:

```typescript
engine.resourceManager
  .load<AmbientLight>({
    type: AssetType.Env,
    url: "*.env"
  })
  .then((ambientLight) => {
    scene.ambientLight = ambientLight;
  });
```
### 4. Compressed texture

> For more compressed texture related documents, please refer to [Compressed Texture](${docs}texture-compression).

```typescript
import { Texture2D } from "@galacean/engine";

const compressedTexture2D = await this.engine.resourceManager.load<Texture2D>("test.ktx");
```

The suffix of compressed texture is generally `ktx`, and you need to pay attention to the compressed texture format supported by the platform when using it. After the compressed texture is loaded, the result is also [Texture2D](${api}core/Texture2D).

### 5. Compressed Cube Texture

The loading of the compressed cube texture is different from the general cube texture. It is a separate binary file path, instead of the file path of 6 images, but it needs to be specified as [AssetType.KTXCube](${api}core/AssetType#KTXCube), because ResourceManager cannot identify which specific type of Loader needs to be used based on the suffix.

```typescript
import { TextureCube } from "@galacean/engine";

const compressedTextureCube = await this.engine.resourceManager.load<TextureCube>({
  url: "test.ktx",
  type: AssetType.KTXCube
});
```

### 6. glTF

What you get after the resource is loaded is a [GLTFResource](${api}loader/GLTFResource) resource, including [Scene](${api}core/Scene), [Entity](${api}core/Entity), [Texture ](${api}core/Texture), [Material](${api}core/Material) and [AnimationClip](${api}core/AnimationClip) and other objects.

```typescript
import { GLTFResource } from "@galacean/engine";

const gltf = await this.engine.resourceManager.load<GLTFResource>("test.gltf");
```

<playground src="gltf-basic.ts"></playground>

Go to [glTF resources](${docs}gltf) to learn more about glTF related designs.

### 7. Custom Loader

Users can also customize the loader to load custom resources:

```typescript
@resourceLoader(FBX, ["fbx"])
export class FBXLoader extends Loader<FBXResource> {
	load(item: LoadItem, resourceManager: ResourceManager): AssetPromise<FBXResource> {
  	return new AssetPromise((resolve, reject)=> {
    	...
    })
  }
}
```

1. Use the [@resourceLoader](${api}core/resourceLoader) decorator to mark it as _ResourceLoader_, and pass in the type enumeration and the parsed resource suffix name. The above example `FBX` is a type enumeration, `["fbx"]` is the suffix name of the resource being parsed.
1. Override the [load](${api}core/ResourceManager#load) method, the `load` method will pass in `loadItem` and `resourceManager`, `loadItem` contains the basic information of loading, `resourceManager` can help Load other reference resources.
1. Return the [AssetPromise](${api}core/AssetPromise) object, `resolve` the resolved resource result, for example, FBX returns a specific `FBXResource`.
1. If an error is reported, it will be `reject` error.
