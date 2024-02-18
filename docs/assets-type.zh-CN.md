---
order: 1
title: 内置资产类型
type: 资产工作流
label: Resource
---

# 内置资源类型

## Texture2D

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

### 额外参数

- format([TextureFormat](${api}core/TextureFormat)): 纹理格式, 默认为 [TextureFormat.RGBA](${api}core/TextureFormat#RGBA).
- mipmap(boolean): 是否生成 mipmap, 默认是 `true`.

## TextureCube

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

## AmbientLight

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

## 压缩纹理

> 更多压缩纹理相关文档可查阅[压缩纹理](${docs}graphics-texture-compression)。

```typescript
import { Texture2D } from "@galacean/engine";

const compressedTexture2D = await this.engine.resourceManager.load<Texture2D>(
  "test.ktx"
);
```

压缩纹理后缀一般为 `ktx` ，使用时需注意平台支持的压缩纹理格式。压缩纹理加载后得到的也是 [Texture2D](${api}core/Texture2D) 。

## 压缩立方体纹理

压缩的立方体纹理的加载和一般的立方体纹理加载不一样，是单独的一个二进制文件路径，而不需要 6 张图片的文件路径，但是需要指定为类型为 [AssetType.KTXCube](${api}core/AssetType#KTXCube)。因为 ResourceManager 无法根据后缀识别需要使用哪种特定类型的 Loader。

```typescript
import { TextureCube } from "@galacean/engine";

const compressedTextureCube =
  await this.engine.resourceManager.load<TextureCube>({
    url: "test.ktx",
    type: AssetType.KTXCube,
  });
```

## glTF

资源加载后得到的是一个 [GLTFResource](${api}loader/GLTFResource) 资源，包含 [Scene](${api}core/Scene)、[Entity](${api}core/Entity)、[Texture](${api}core/Texture)、[Material](${api}core/Material) 和 [AnimationClip](${api}core/AnimationClip) 等对象。

```typescript
import { GLTFResource } from "@galacean/engine";

const gltf = await this.engine.resourceManager.load<GLTFResource>("test.gltf");
```

<playground src="gltf-basic.ts"></playground>

前往[ glTF 资源](${docs}graphics-model-glTF) 了解更多 glTF 相关设计。