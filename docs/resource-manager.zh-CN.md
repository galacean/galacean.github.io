---
order: 1
title: 资源管理与加载
type: 资源
label: Resource
---

3D 资源一般与 Engine 挂钩，我们使用挂载在 Engine 实例中的 [resourceManager](${api}core/Engine#resourceManager) 管理与加载资源。

## 功能

### 1. 资源加载

调用：

```typescript
engine.resourceManager.load(...)
```

### 2. 资源释放

`ResourceManager` 提供了一套基于引用计数的资源释放，需要开发者手动调用 [gc](${api}core/ResourceManager#gc)：

```typescript
engine.resourceManager.gc();
```

为了避免重复加载资源，当资源被加载完成之后，会被缓存在 *ResourceManager* 内。缓存本身会占用内存和显存，当开发者不再需要缓存的内容时，需要手动去释放缓存的内容。

> 注意：资源之间是相互依赖的。

例如下图展示的实体包含 [MeshRenderer](${api}core/MeshRenderer) 组件，依赖于 [Material](${api}core/Material)， *Material* 可能被多个 *MeshRenderer* 引用，如果释放 *Material* ，那么引用此的其他 *MeshRenderer* 则会找不到该 *Material* 而报错。

![image.png](https://gw.alipayobjects.com/mdn/mybank_yulibao/afts/img/A*wXmqRIwqI18AAAAAAAAAAAAAARQnAQ)

> 注意：JavaScript 无法追踪对象的引用。 一般在 JavaScript 等弱类型语言中，是没有提供给开发者内存管理的功能的，所有对象的内存都是通过垃圾回收机制来管理，你没有办法去判断对象什么时候会被释放，所以没有[析构函数(destructor)](https://zh.wikipedia.org/wiki/%E8%A7%A3%E6%A7%8B%E5%AD%90)去调用引用资源的释放。

### 3. 资源路径

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

### 4. 批量加载

加载队列可传入一组 [LoadItem](${api}core/LoadItem) 数组，或一组 url，返回结果是按顺序排列的加载好的资源队列。

```typescript
const [texture2D, glTFResource] = await this.engine.resourceManager.load([
  "a.png",
  "b.gltf",
]);
```

### 5. 加载进度

调用加载队列可以得到一个 [AssetPromise](${api}core/AssetPromise) 对象，可以使用 [onProgress](${api}core/AssetPromise#onProgress) 获取加载进度。

```typescript
this.engine.resourceManager
  .load(["a.png", "b.gltf"])
  .onProgress((progress: number) => {
    console.log(`当前加载进度为 ${progress}`);
  });
```

### 6. 取消加载

*ResourceManager* 对象中有 [cancelNotLoaded](${api}core/ResourceManager#cancelNotLoaded) 方法，可以通过调用此方法取消未加载完成的资源。传入 url 会取消特定的 url 的资源加载。

```typescript
// 取消所有未加载完的资源。
this.engine.resourceManager.cancelNotLoaded();
// 取消特定的 url 资源加载。
this.engine.resourceManager.cancelNotLoaded("test.gltf");
```

> 注意：目前取消加载未完成资源会抛出异常。

### 7. 获取加载过的资产

目前加载过的资产会缓存在 *ResourceManager* 中，如需获取加载过的资产，只需要再次调用 `load` 方法即可。

### 8. 资源释放

为了避免重复加载资源，当资源被加载完成之后，会被缓存在 *ResourceManager* 内。缓存本身会占用内存和显存，当开发者不再需要缓存的内容时，需要手动去释放缓存的内容。

> 注意：资源之间是相互依赖的。

例如下图展示的实体包含 [MeshRenderer](${api}core/MeshRenderer) 组件，依赖于 [Material](${api}core/Material)， *Material* 可能被多个 *MeshRenderer* 引用，如果释放 *Material* ，那么引用此的其他 *MeshRenderer* 则会找不到该 *Material* 而报错。

![image.png](https://gw.alipayobjects.com/mdn/mybank_yulibao/afts/img/A*wXmqRIwqI18AAAAAAAAAAAAAARQnAQ)

> 注意：JavaScript 无法追踪对象的引用。 一般在 JavaScript 等弱类型语言中，是没有提供给开发者内存管理的功能的，所有对象的内存都是通过垃圾回收机制来管理，你没有办法去判断对象什么时候会被释放，所以没有[析构函数(destructor)](https://zh.wikipedia.org/wiki/%E8%A7%A3%E6%A7%8B%E5%AD%90)去调用引用资源的释放。

`ResourceManager` 提供了一套基于引用计数的资源释放，需要开发者手动调用 [gc](${api}core/ResourceManager#gc)：

```typescript
engine.resourceManager.gc();
```

## 内置资源

| 资源        | 加载类型              | 参考                                                         |
| ----------- | --------------------- | ------------------------------------------------------------ |
| Texture2D   | AssetType.Texture2D   | [示例](https://galacean.antgroup.com/#/examples/latest/wrap-mode) |
| TextureCube | AssetType.HDR         | [示例](https://galacean.antgroup.com/#/examples/latest/hdr-loader) |
| glTF        | AssetType.GLTF        | [示例](https://galacean.antgroup.com/#/examples/latest/gltf-basic) |
| 压缩纹理    | AssetType.KTX2        | [示例](https://galacean.antgroup.com/#/examples/latest/compressed-texture) |
| 环境光      | AssetType.Env         | [示例](https://galacean.antgroup.com/#/examples/latest/ambient-light) |
| 图集        | AssetType.SpriteAtlas | [示例](https://galacean.antgroup.com/#/examples/latest/sprite-atlas) |
| 字体        | AssetType.Font        | [示例](https://galacean.antgroup.com/#/examples/latest/text-renderer-font) |
|             |                       |                                                              |

注意：环境光烘焙产物来自编辑器，或者使用 glTF Viewer，参考下图：

![gltf viewer](https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*9mGbSpQ4HngAAAAAAAAAAAAAARQnAQ)

## 自定义加载器

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


## 编辑器里的资源加载

编辑器导出的项目示例中使用的是项目加载器加载：

```typescript
await engine.resourceManager.load({
	type: AssetType.Project,
  url: 'xxx.json'
});
```

**注意：项目只会加载主场景中使用到的资源，编辑器里的其他资源不会被加载**。

项目加载器会默认切到主场景，如果要切换场景则应该使用场景加载器：

```typescript
const scene = await engine.resourceManager.load({
	type: AssetType.Scene,
  url: 'xxx.json'
});
engine.sceneManager.activeScene = scene;
```

**注意：场景加载器只会加载场景中使用到的资源，其他资源默认不会被加载**。
