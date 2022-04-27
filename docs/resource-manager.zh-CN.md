---
order: 1
title: 资源管理与加载
type: 功能模块
group: 资源管理
---

3D 资源一般与 Engine 挂钩，我们使用挂载在 Engine 实例中的 [resourceManager](${api}core/Engine#resourceManager) 管理与加载资源。

推荐用[脚本组件](${docs}script-cn)的方式加载资源。[load](${api}core/ResourceManager#load) 方法即可传入 url，也可以传入 [loadItem](${api}core/LoadItem)，也可以传入数组表示批量加载。

```typescript
import { GLTFResource } from 'oasis-engine';

export class ResourceScript extends Script {
	async onAwake() {
  	const gltf = await this.engine.resourceManager.load<GLTFResource>("test.gltf");
    this.entity.addChild(gltf.defaultSceneRoot);
  }
}
```

## 功能

### 1. 批量加载
加载队列可传入一组 [LoadItem](${api}core/LoadItem) 数组，或一组 url，返回结果是按顺序排列的加载好的资源队列。

```typescript
const [texture2D, glTFResource] = await this.engine.resourceManager.load(["a.png", "b.gltf"]);
```

### 2. 加载进度
调用加载队列可以得到一个 [AssetPromise](${api}core/AssetPromise) 对象，可以使用 [onProgress](${api}core/AssetPromise#onProgress) 获取加载进度。

```typescript
this.engine.resourceManager.load(["a.png", "b.gltf"]).onProgress((progress: number)=>{
	console.log(`当前加载进度为 ${progress}`);
})
```


### 3. 取消加载
*ResourceManager* 对象中有 [cancelNotLoaded](${api}core/ResourceManager#cancelNotLoaded) 方法，可以通过调用此方法取消未加载完成的资源。传入 url 会取消特定的 url 的资源加载。

```typescript
// 取消所有未加载完的资源。
this.engine.resourceManager.cancelNotLoaded();
// 取消特定的 url 资源加载。
this.engine.resourceManager.cancelNotLoaded("test.gltf");
```


> 注意：目前取消加载未完成资源会抛出异常。


### 4. 资源释放
为了避免重复加载资源，当资源被加载完成之后，会被缓存在 *ResourceManager* 内。缓存本身会占用内存和显存，当开发者不再需要缓存的内容时，需要手动去释放缓存的内容。

> 注意：资源之间是相互依赖的。

例如下图展示的实体包含 [MeshRenderer](${api}core/MeshRenderer) 组件，依赖于 [Material](${api}core/Material)， *Material* 可能被多个 *MeshRenderer* 引用，如果释放 *Material* ，那么引用此的其他 *MeshRenderer* 则会找不到该 *Material* 而报错。

![image.png](https://gw.alipayobjects.com/mdn/mybank_yulibao/afts/img/A*wXmqRIwqI18AAAAAAAAAAAAAARQnAQ)


> 注意：JavaScript 无法追踪对象的引用。 一般在 JavaScript 等弱类型语言中，是没有提供给开发者内存管理的功能的，所有对象的内存都是通过垃圾回收机制来管理，你没有办法去判断对象什么时候会被释放，所以没有[析构函数(destructor)](https://zh.wikipedia.org/wiki/%E8%A7%A3%E6%A7%8B%E5%AD%90)去调用引用资源的释放。


`ResourceManager` 提供了一套基于引用计数的资源释放，需要开发者手动调用 [gc](${api}core/ResourceManager#gc)：

```typescript
engine.resourceManager.gc();
```

## 内置资源类型

### 1. Texture2D

> 更多纹理相关文档可查阅[纹理资源](${docs}texture-cn)。

```typescript
import { Texture2D } from "oasis-engine";

const texture2D = await this.engine.resourceManager.load<Texture2D>("test.png");
```
加载器会使用 png、jpg 等后缀作为判断是 Texture2D 的依据，若使用 cdn 地址不带后缀，需要使用 type 去指定加载类型。例如
```typescript
this.engine.resourceManager.load({url: "test", type: AssetType.Texture2D});
```


### 2. TextureCube
> 更多纹理相关文档可查阅[纹理资源](${docs}texture-cn)。

```typescript
import { TextureCube } from "oasis-engine";

const textureCube = await this.engine.resourceManager
  .load<TextureCube>({
  urls: [
    "/static/env/papermill/specular/specular_right_0.jpg",
    "/static/env/papermill/specular/specular_left_0.jpg",
    "/static/env/papermill/specular/specular_top_0.jpg",
    "/static/env/papermill/specular/specular_bottom_0.jpg",
    "/static/env/papermill/specular/specular_front_0.jpg",
    "/static/env/papermill/specular/specular_back_0.jpg"
  ],
  type: AssetType.TextureCube
})
```

[TextureCube](${api}core/TextureCube) 使用六张图片作为原始资源，用 urls 传递六张图片链接，type 使用 [AssetType.TextureCube](${api}core/AssetType#TextureCube) 。

### 3. HDR
```typescript
import { TextureCube } from "oasis-engine";

engine.resourceManager
  .load<TextureCube>({
    type: AssetType.HDR,
    url: "https://gw.alipayobjects.com/os/bmw-prod/b578946a-8a25-4543-8161-fa92f92ae1ac.bin"
  })
  .then((texture) => {
    skyMaterial.textureCubeMap = texture;
    // HDR output is in RGBM format.
    skyMaterial.textureDecodeRGBM = true;
  });
```

HDR Loader 使用 [AssetType.HDR](${api}core/AssetType#HDR) 加载 .HDR 格式的贴图，得到的产物也是立方体纹理。


### 4. Environment
Oasis 支持通过[编辑器](https://oasis.alipay.com/editor)或者 [glTF Viewer](https://oasisengine.cn/gltf-viewer) 进行离线烘焙得到 IBL 烘焙产物 `*.env` 文件。

![gltf viewer](https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*9mGbSpQ4HngAAAAAAAAAAAAAARQnAQ)

拿到 `*.env` 后，我们可以通过 resourceManager 加载环境光：

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

### 5. 压缩纹理
> 更多压缩纹理相关文档可查阅[压缩纹理](${docs}texture-compression-cn)。

```typescript
import { Texture2D } from "oasis-engine";

const compressedTexture2D = await this.engine.resourceManager.load<Texture2D>("test.ktx");
```
压缩纹理后缀一般为 `ktx` ，使用时需注意平台支持的压缩纹理格式。压缩纹理加载后得到的也是 [Texture2D](${api}core/Texture2D) 。


### 6. 压缩立方体纹理
压缩的立方体纹理的加载和一般的立方体纹理加载不一样，是单独的一个二进制文件路径，而不需要 6 张图片的文件路径，但是需要指定为类型为 [AssetType.KTXCube](${api}core/AssetType#KTXCube)。因为 ResourceManager 无法根据后缀识别需要使用哪种特定类型的 Loader。

```typescript
import { TextureCube } from "oasis-engine";

const compressedTextureCube = await this.engine.resourceManager.load<TextureCube>({url: "test.ktx", type: AssetType.KTXCube});
```

### 7. glTF

资源加载后得到的是一个 [GLTFResource](${api}loader/GLTFResource) 资源，包含 [Scene](${api}core/Scene)、[Entity](${api}core/Entity)、[Texture](${api}core/Texture)、[Material](${api}core/Material) 和 [AnimationClip](${api}core/AnimationClip) 等对象。

``` typescript
import { GLTFResource } from 'oasis-engine';

const gltf = await this.engine.resourceManager.load<GLTFResource>("test.gltf");
```

<playground src="gltf-basic.ts"></playground>

前往[ glTF 资源](${docs}gltf-cn) 了解更多 glTF 相关设计。

### 8. 自定义加载器
用户也可以自定义加载器来加载自定义的资源：

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

1. 通过 [@resourceLoader](${api}core/resourceLoader) 装饰器标注为 *ResourceLoader*，传入类型枚举和被解析的资源后缀名。上面的例子 `FBX` 是类型枚举， `["fbx"]` 是被解析资源的后缀名。
1. 重写 [load](${api}core/ResourceManager#load) 方法， `load` 方法会传入 `loadItem` 和 `resourceManager` ， `loadItem` 包含了加载的基信息， `resourceManager` 可以帮助加载其他引用资源。
1. 返回 [AssetPromise](${api}core/AssetPromise) 对象， `resolve` 解析后的资源结果，例如 FBX 返回特定的 `FBXResource` 。
1. 若报错则 `reject` 错误。