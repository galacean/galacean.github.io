# 资源管理与加载

3D 资源一般与 Engine 挂钩，我们使用挂载在 Engine 实例中的 [ResourceManager](${book.api}classes/core.engine.html#resourcemanager) 管理与加载资源。

推荐用[脚本组件](${book.manual}component/script)的方式加载资源。[load](${book.api}classes/core.resourcemanager.html#load) 方法即可传入 url，也可以传入 [loadItem](${book.api}modules/core.html#loaditem)，也可以传入数组表示批量加载。

```typescript
import type { GLTFResource } from '@oasis-engine/loader/types/gltf/glTF';

export class ResourceScript extends Script {
	async onAwake() {
  	const gltf = await this.engine.resourceManager.load<GLTFResource>("test.gltf");
    this.entity.addChild(gltf.defaultSceneRoot);
  }
}
```

## 功能

### 1. 批量加载
加载队列可传入一组 [LoadItem](${book.api}modules/core.html#loaditem) 数组，或一组 url，返回结果是按顺序排列的加载好的资源队列。

```typescript
const [texture2D, glTFResource] = await this.engine.resourceManager.load(["a.png", "b.gltf"]);
```

### 2. 加载进度
调用加载队列可以得到一个 [AssetPromise](${book.api}classes/core.assetpromise.html) 对象，可以使用 [onProgress](${book.api}interfaces/loader.options.html#onprogress) 获取加载进度。

```typescript
this.engine.resourceManager.load(["a.png", "b.gltf"]).onProgress((progress: number)=>{
	console.log(`当前加载进度为 ${progress}`);
})
```


### 3. 取消加载
`ResourceManager` 对象中有 [cancelNotLoaded](${book.api}classes/core.resourcemanager.html#cancelnotloaded) 方法，可以通过调用此方法取消未加载完成的资源。传入 url 会取消特定的 url 的资源加载。

```typescript
// 取消所有未加载完的资源。
this.engine.resourceManager.cancelNotLoaded();
// 取消特定的 url 资源加载。
this.engine.resourceManager.cancelNotLoaded("test.gltf");
```


> 注意：目前取消加载未完成资源会抛出异常。


### 4. 资源释放
为了避免重复加载资源，当资源被加载完成之后，会被缓存在 `ResourceManager` 内。缓存本身会占用内存和显存，当开发者不再需要缓存的内容时，需要手动去释放缓存的内容。

> 注意：资源之间是相互依赖的。

例如下图展示的实体包含 [MeshRenderer](${book.api}classes/core.meshrenderer.html) 组件，依赖于 [Material](${book.api}classes/core.material.html)， `Material` 可能被多个 `MeshRenderer` 引用，如果释放 `Material` ，那么引用此的其他 `MeshRenderer` 则会找不到该 `Material` 而报错。

![image.png](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*xgpHSIn9RYAAAAAAAAAAAAAAARQnAQ)


> 注意：JavaScript 无法追踪对象的引用。 一般在 JavaScript 等弱类型语言中，是没有提供给开发者内存管理的功能的，所有对象的内存都是通过垃圾回收机制来管理，你没有办法去判断对象什么时候会被释放，所以没有[析构函数(destructor)](https://zh.wikipedia.org/wiki/%E8%A7%A3%E6%A7%8B%E5%AD%90)去调用引用资源的释放。


`ResourceManager` 提供了一套基于引用计数的资源释放，需要开发者手动调用 [gc](${book.api}classes/core.resourcemanager.html#gc)：

```typescript
engine.resourceManager.gc();
```

## 内置资源类型

### 1. Texture2D

> 更多纹理相关文档可查阅[纹理资源](${book.manual}resource/texture)。

```typescript
import { Texture2D } from "oasis-engine";

const texture2D = await this.engine.resourceManager.load<Texture2D>("test.png");
```
加载器会使用 png、jpg 等后缀作为判断是 Texture2D 的依据，若使用 cdn 地址不带后缀，需要使用 type 去指定加载类型。例如
```typescript
this.engine.resourceManager.load({url: "test", type: AssetType.Texture2D});
```


### 2. TextureCube
> 更多纹理相关文档可查阅[纹理资源](${book.manual}resource/texture)。

```typescript
import { TextureCubeMap } from "oasis-engine";

const textureCube = await this.engine.resourceManager
  .load<TextureCubeMap>({
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

[TextureCubeMap](${book.api}classes/core.texturecubemap.html) 使用六张图片作为原始资源，用 urls 传递六张图片链接，type 使用 [AssetType.TextureCube](${book.api}enums/core.assettype.html#texturecube) 。


### 3. 压缩纹理
> 更多压缩纹理相关文档可查阅[压缩纹理](${book.api}resource/texture.html#压缩纹理)。

```typescript
import { Texture2D } from "oasis-engine";

const compressedTexture2D = await this.engine.resourceManager.load<Texture2D>("test.ktx");
```
压缩纹理后缀一般为 `ktx` ，使用时需注意平台支持的压缩纹理格式。压缩纹理加载后得到的也是 [Texture2D](${book.api}classes/core.texture2d.html) 。


### 4. 压缩立方体纹理
压缩的立方体纹理的加载和一般的立方体纹理加载不一样，是单独的一个二进制文件路径，而不需要 6 张图片的文件路径，但是需要指定为类型为 [AssetType.KTXCube](${book.api}enums/core.assettype.html#ktxcube)。因为 ResourceManager 无法根据后缀识别需要使用哪种特定类型的 Loader。

```typescript
import { TextureCubeMap } from "oasis-engine";

const compressedTextureCube = await this.engine.resourceManager.load<TextureCubeMap>({url: "test.ktx", type: AssetType.KTXCube});
```

### 5. glTF

[glTF](https://www.khronos.org/gltf/) 资源如上面例子，得到的是一个 [GLTFResource](${book.api}classes/loader.gltfresource.html) 资源。加载成功后，会得到 glTF 里包含的 [Scene](${book.api}classes/core.scene.html)、[Entity](${book.api}classes/core.entity.html)、[Texture](${book.api}classes/core.texture.html)、[Material](${book.api}classes/core.material.html) 和 [AnimationClip](${book.api}classes/core.animationclip.html)。

``` typescript
import type { GLTFResource } from '@oasis-engine/loader/types/gltf/glTF';

const gltf = await this.engine.resourceManager.load<GLTFResource>("test.gltf");
```

### 6. 自定义加载器
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

1. 通过 [@resourceLoader](${book.api}modules/core.html#resourceloader) 装饰器标注为 *ResourceLoader*，传入类型枚举和被解析的资源后缀名。上面的例子 `FBX` 是类型枚举， `["fbx"]` 是被解析资源的后缀名。
1. 重写 [load](${book.api}classes/core.resourcemanager.html#load) 方法， `load` 方法会传入 `loadItem` 和 `resourceManager` ， `loadItem` 包含了加载的基信息， `resourceManager` 可以帮助加载其他引用资源。
1. 返回 [AssetPromise](${book.api}classes/core.assetpromise.html) 对象， `resolve` 解析后的资源结果，例如 FBX 返回特定的 `FBXResource` 。
1. 若报错则 `reject` 错误。