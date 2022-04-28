---
order: 6
title: Texture Compression
type: Graphics
group: Texture
---

Oasis supports compressed textures in **DXT/PVR/ETC/ASTC** format, and supports the use of **KTX**([Khronos Texture](https://www.khronos.org/opengles/sdk/tools/KTX/file_format_spec/)) container format loading. 

## How to use

Because each hardware supports different compression formats, please check whether a certain format is supported before use:

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

After confirming that a certain format is supported, use [ResourceManager](${docs}resource-manager) to load resources:

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

## Compatibility

In order to ensure the compatibility of your settings, you can refer to the following steps:

1. Check the website through [canIUse](https://caniuse.com/) 、 [webglStats](https://webglstats.com/)、[webglReport](https://webglreport.com/?v=2) and other capabilities to know the compatibility differences of different devices.
2. Through the [RHI#canIUse](${api}rhi-webgl/WebGLRenderer#canIUse) interface provided by the engine, check whether the capability can be used.
3. Project downgrades and forced downgrades are carried out through engineering means.


