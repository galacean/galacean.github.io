---
order: 6
title: 纹理压缩
type: 图形渲染
group: 纹理
---

Oasis 支持 **DXT/PVR/ETC/ASTC** 格式的压缩纹理，并且支持通过 **KTX**（[Khronos Texture](https://www.khronos.org/opengles/sdk/tools/KTX/file_format_spec/)）容器格式加载。

## 使用
因为各个硬件支持的压缩格式不一样，所以在使用前请先查询是否支持某种格式：

```typescript
const engine = new Engine();
const cameraEntity = rootEntity.createChild("camera");
cameraEntity.addComponent(Camera);
const rhi = engine.renderhardware;

// GLCapabilityType.s3tc
// GLCapabilityType.etc1
// GLCapabilityType.etc
// GLCapabilityType.astc
// GLCapabilityType.pvrtc
if (rhi.canIUse(GLCapabilityType.s3tc)) {
  // ...
}
```

确定支持某种格式后,使用 [ResourceManager](${docs}resource-manager-cn) 进行资源加载

```typescript
const resource = {
  type: AssetType.KTX,
  url: "https://gw.alipayobjects.com/os/bmw-prod/b38cb09e-154c-430e-98c8-81dc19d4fb8e.ktx"
};

engine.resourceManager.load(resource).then((res) => {
  const compressedTexture = res;
  material.baseTexture = compressedTexture;
  // ...
});
```

## 机型适配

引擎不能保证压缩纹理在所有设备上都能支持，为了保证兼容性，建议尝试以下步骤：

1. 通过 [canIUse](https://caniuse.com/) 、 [webglStats](https://webglstats.com/)、[webglReport](https://webglreport.com/?v=2) 等能力检测网站，知晓不同设备的兼容性差异。
2. 通过引擎提供的 RHI#canIUse 接口,检测能力是否可以使用。
3. 通过工程手段进行方案降级和强制降级。


