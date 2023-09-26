---
order: 6
title: Texture Compression
type: Graphics
group: Texture
label: Graphics/Texture
---

[KTX2](https://www.khronos.org/ktx/) (Khronos Texture Container version 2.0) is the latest texture compression format introduced by Khronos. It is supported in Galacean starting from version 1.1. KTX2 provides runtime transcoding of compressed textures into the corresponding formats (BC/PVRTC/ETC/ASTC) supported by the device platform.

In the engine, you can load KTX2 files directly using the resourceManager:

```typescript
engine.resourceManager.load("xxx.ktx2");
// or
engine.resourceManager.load({
  type: AssetType.KTX2,
  url: "xxx.ktx2",
}).then(tex=>{
  material.baseTexture = tex;
});
```

<playground src="compressed-texture.ts"></playground>

To use KTX2 in glTF, you need to include the KHR_texture_basisu extension.

You can generate KTX2 files using:

- toktx
- basisu
- Packaging in the editor. You can refer to the "Project Publishing" documentation for more details.

Galacean supports compressed textures in **DXT/PVR/ETC/ASTC** format, and supports the use of **KTX**([Khronos Texture](https://www.khronos.org/opengles/sdk/tools/KTX/file_format_spec/)) container format loading.
