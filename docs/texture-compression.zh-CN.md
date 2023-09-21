---
order: 6
title: 纹理压缩
type: 图形
group: 纹理
label: Graphics/Texture
---

## KTX2

**KTX2**(Khronos Texture Container version 2.0) 是 Khronos 推出最新的纹理压缩方案，Galacean 在 1.1 版本中已经支持。KTX2 会根据设备平台支持运行时转码到对应格式的压缩纹理（BC/PVRTC/ETC/ASTC)。

在引擎中，直接使用 `resourceManager` 加载即可：

```typescript
engine.resourceManager.load("xxx.ktx2");
// 或
engine.resourceManager.load({
  type: AssetType.KTX2,
  url: "xxx.ktx2",
});
```

glTF 中使用 ktx2 需要包含 [KHR_texture_basisu](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_texture_basisu/README.md) 扩展。

KTX2 的生成可以使用：

- toktx
- basisu
- 编辑器打包，可以参考『[项目发布](<(${docs}editor-publish-cn)>)』文档。

### Compatibility

KTX2 transcoding utilizes WebAssembly technology and requires Chrome 57+ and iOS 11.3+ (WebAssembly in versions 11.0 to 11.2 has a bug, as mentioned in this link).

## KTX1（不推荐）

Galacean 支持 **DXT/PVR/ETC/ASTC** 格式的压缩纹理，并且支持通过 [KTX1.0](https://registry.khronos.org/KTX/specs/1.0/ktxspec_v1.html) 容器格式加载。

### 使用

因为各个硬件支持的压缩格式不一样，所以在使用前请先查询是否支持某种格式：

```typescript
const rhi = engine._hardwareRenderer as WebGLRenderer;

if (rhi.canIUse(GLCompressedTextureInternalFormat.RGBA_S3TC_DXT5_EXT)) {
  // ...
}
```

确定支持某种格式后,使用 [ResourceManager](${docs}resource-manager-cn) 进行资源加载

```typescript
engine.resourceManager
  .load<Texture2D>({
    type: AssetType.KTX,
    url: "https://gw.alipayobjects.com/os/bmw-prod/b38cb09e-154c-430e-98c8-81dc19d4fb8e.ktx",
  })
  .then((res) => {
    const compressedTexture = res;
    material.baseTexture = compressedTexture;
    // ...
  });
```

<playground src="compressed-texture.ts"></playground>

### 机型适配

引擎不能保证压缩纹理在所有设备上都能支持，为了保证兼容性，建议尝试以下步骤：

1. 通过 [canIUse](https://caniuse.com/) 、 [webglStats](https://webglstats.com/)、[webglReport](https://webglreport.com/?v=2) 等能力检测网站，知晓不同设备的兼容性差异。
2. 通过引擎提供的 RHI#canIUse 接口,检测能力是否可以使用。
3. 通过工程手段进行方案降级和强制降级。
