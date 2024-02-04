---
order: 1
title: 资源管理与加载
type: 资源
label: Resource
---

3D 资源一般与 Engine 挂钩，我们使用挂载在 Engine 实例中的 [resourceManager](${api}core/Engine#resourceManager) 管理与加载资源。

推荐用[脚本组件](${docs}script)的方式加载资源。[load](${api}core/ResourceManager#load) 方法即可传入 url，也可以传入 [loadItem](${api}core/LoadItem)，也可以传入数组表示批量加载。

```typescript
import { GLTFResource } from "@galacean/engine";

export class ResourceScript extends Script {
  async onAwake() {
    const gltf = await this.engine.resourceManager.load<GLTFResource>(
      "test.gltf"
    );
    this.entity.addChild(gltf.defaultSceneRoot);
  }
}
```

## 功能

### 1. 资源路径

资源的 url 路径支持**相对路径**，**绝对路径**与**虚拟路径**：

- 相对路径是针对运行时根路径而言的，若路径有误，可在开发者工具中根据加载报错信息进行调整
- 绝对路径是完整指定文件位置的路径，如 `https://xxxx.png`，也包含 `blob` 与 `base64`
- 虚拟路径是在编辑器的资产文件中的路径，一般为 `Assets/sprite.png`

```typescript
// 加载相对路径下的资源
this.engine.resourceManager.load("a.png");

// 加载绝对路径下的资源
this.engine.resourceManager.load("https://a.png");

// 加载 base64
this.engine.resourceManager.load<GLTFResource>({
  url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==",
  type: AssetType.Texture2D,
});

// 加载编辑器虚拟路径下的资源
this.engine.resourceManager.load<GLTFResource>("Assets/texture.png");
```

### 2. 批量加载

加载队列可传入一组 [LoadItem](${api}core/LoadItem) 数组，或一组 url，返回结果是按顺序排列的加载好的资源队列。

```typescript
const [texture2D, glTFResource] = await this.engine.resourceManager.load([
  "a.png",
  "b.gltf",
]);
```

### 3. 加载进度

调用加载队列可以得到一个 [AssetPromise](${api}core/AssetPromise) 对象，可以使用 [onProgress](${api}core/AssetPromise#onProgress) 获取加载进度。

```typescript
this.engine.resourceManager
  .load(["a.png", "b.gltf"])
  .onProgress((progress: number) => {
    console.log(`当前加载进度为 ${progress}`);
  });
```

### 4. 取消加载

*ResourceManager* 对象中有 [cancelNotLoaded](${api}core/ResourceManager#cancelNotLoaded) 方法，可以通过调用此方法取消未加载完成的资源。传入 url 会取消特定的 url 的资源加载。

```typescript
// 取消所有未加载完的资源。
this.engine.resourceManager.cancelNotLoaded();
// 取消特定的 url 资源加载。
this.engine.resourceManager.cancelNotLoaded("test.gltf");
```

> 注意：目前取消加载未完成资源会抛出异常。

### 5. 获取加载过的资产

目前加载过的资产会缓存在 *ResourceManager* 中，如需获取加载过的资产，只需要再次调用 `load` 方法即可。

### 6. 资源释放

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

> 更多纹理相关文档可查阅[2D 纹理](${docs}graphics-texture-2d)。

```typescript
import { Texture2D } from "@galacean/engine";

const texture2D = await this.engine.resourceManager.load<Texture2D>("test.png");
```

加载器会使用 png、jpg 等后缀作为判断是 Texture2D 的依据，若使用 cdn 地址不带后缀，需要使用 type 去指定加载类型。例如

```typescript
this.engine.resourceManager.load({
  url: "test",
  type: AssetType.Texture2D,
  params: { format, mipmap },
});
```

#### 额外参数

- format([TextureFormat](${api}core/TextureFormat)): 纹理格式, 默认为 [TextureFormat.RGBA](${api}core/TextureFormat#RGBA).
- mipmap(boolean): 是否生成 mipmap, 默认是 `true`.

### 2. TextureCube

> 更多纹理相关文档可查阅[立方纹理](${docs}graphics-texture-cube)。

```typescript
import { TextureCube } from "@galacean/engine";

const textureCube = await this.engine.resourceManager.load<TextureCube>({
  urls: [
    "/static/env/papermill/specular/specular_right_0.jpg",
    "/static/env/papermill/specular/specular_left_0.jpg",
    "/static/env/papermill/specular/specular_top_0.jpg",
    "/static/env/papermill/specular/specular_bottom_0.jpg",
    "/static/env/papermill/specular/specular_front_0.jpg",
    "/static/env/papermill/specular/specular_back_0.jpg",
  ],
  type: AssetType.TextureCube,
});
```

[TextureCube](${api}core/TextureCube) 使用六张图片作为原始资源，用 urls 传递六张图片链接，type 使用 [AssetType.TextureCube](${api}core/AssetType#TextureCube) 。

当然，如果你觉得传递 6 张图片有点麻烦，也可以使用 HDR 解析器，他的优点是仅需要一张 RGBE 格式的 .hdr 贴图就可以作为天空盒的背景；缺点是 HDR 解析器一般用来烘焙颜色范围超出【0-1】的环境贴图，所以文件体积会比较大，如果仅仅用来当作天空盒展示，超出【0-1】范围的颜色是无效的，性价比会比较低。
因此 HDR Loader 适用于那些对浮点颜色还有别的用途的场景。

```typescript
import { TextureCube } from "@galacean/engine";

engine.resourceManager
  .load<TextureCube>({
    type: AssetType.HDR,
    url: "https://gw.alipayobjects.com/os/bmw-prod/b578946a-8a25-4543-8161-fa92f92ae1ac.bin",
  })
  .then((texture) => {
    skyMaterial.texture = texture;
    // HDR output is in RGBM format.
    skyMaterial.textureDecodeRGBM = true;
  });
```

### 3. AmbientLight

Galacean 支持通过[编辑器](https://galacean.antgroup.com/editor)或者 [glTF Viewer](https://galacean.antgroup.com/#/gltf-viewer) 进行离线烘焙得到 IBL 烘焙产物 `*.env` 文件。

![gltf viewer](https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*9mGbSpQ4HngAAAAAAAAAAAAAARQnAQ)

拿到 `*.env` 后，我们可以直接通过 resourceManager 加载环境光：

```typescript
engine.resourceManager
  .load<AmbientLight>({
    type: AssetType.Env,
    url: "*.env",
  })
  .then((ambientLight) => {
    scene.ambientLight = ambientLight;
  });
```

### 4. 压缩纹理

> 更多压缩纹理相关文档可查阅[压缩纹理](${docs}graphics-texture-compression)。

```typescript
import { Texture2D } from "@galacean/engine";

const compressedTexture2D = await this.engine.resourceManager.load<Texture2D>(
  "test.ktx"
);
```

压缩纹理后缀一般为 `ktx` ，使用时需注意平台支持的压缩纹理格式。压缩纹理加载后得到的也是 [Texture2D](${api}core/Texture2D) 。

### 5. 压缩立方体纹理

压缩的立方体纹理的加载和一般的立方体纹理加载不一样，是单独的一个二进制文件路径，而不需要 6 张图片的文件路径，但是需要指定为类型为 [AssetType.KTXCube](${api}core/AssetType#KTXCube)。因为 ResourceManager 无法根据后缀识别需要使用哪种特定类型的 Loader。

```typescript
import { TextureCube } from "@galacean/engine";

const compressedTextureCube =
  await this.engine.resourceManager.load<TextureCube>({
    url: "test.ktx",
    type: AssetType.KTXCube,
  });
```

### 6. glTF

资源加载后得到的是一个 [GLTFResource](${api}loader/GLTFResource) 资源，包含 [Scene](${api}core/Scene)、[Entity](${api}core/Entity)、[Texture](${api}core/Texture)、[Material](${api}core/Material) 和 [AnimationClip](${api}core/AnimationClip) 等对象。

```typescript
import { GLTFResource } from "@galacean/engine";

const gltf = await this.engine.resourceManager.load<GLTFResource>("test.gltf");
```

<playground src="gltf-basic.ts"></playground>

前往[ glTF 资源](${docs}graphics-model-glTF) 了解更多 glTF 相关设计。

### 7. 自定义加载器

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

1. 通过 [@resourceLoader](${api}core/resourceLoader) 装饰器标注为 *ResourceLoader*，传入类型枚举和被解析的资源后缀名。上面的例子 `FBX` 是类型枚举， `["fbx"]`  是被解析资源的后缀名。
1. 重写 [load](${api}core/ResourceManager#load) 方法， `load`  方法会传入 `loadItem` 和 `resourceManager` ， `loadItem`  包含了加载的基信息， `resourceManager`  可以帮助加载其他引用资源。
1. 返回 [AssetPromise](${api}core/AssetPromise)  对象， `resolve`  解析后的资源结果，例如 FBX 返回特定的 `FBXResource` 。
1. 若报错则 `reject`  错误。
