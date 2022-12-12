---
order: 4
title: 环境光
type: 图形
group: 光照
label: Graphics/Light
---

**环境光**已经内置在了[场景](${api}core/Scene)中，提供了纯色模式和 IBL 模式

## 纯色模式

```typescript
const ambientLight = scene.ambientLight;
// 设置环境光颜色
ambientLight.diffuseSolidColor.set(1, 0, 0, 1);
// 设置环境光强度
ambientLight.diffuseIntensity = 0.5;
```

## IBL 模式

一般 PBR 工作流不会使用纯色模式，而是使用一张 HDR 贴图用作环境反射，我们在这里称之为 [IBL](https://developer.nvidia.cn/gpugems/gpugems/part-iii-materials/chapter-19-image-based-lighting) 模式。

Oasis 支持通过[编辑器](https://oasis.alipay.com/editor)或者 [glTF Viewer](https://oasisengine.cn/gltf-viewer) 进行离线烘焙得到 IBL 烘焙产物 `*.env` 文件。

![gltf viewer](https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*9mGbSpQ4HngAAAAAAAAAAAAAARQnAQ)

拿到 `*.env` 后，我们可以通过 resourceManager 加载环境光：

```typescript
engine.resourceManager
  .load<AmbientLight>({
    type: AssetType.Env,
    url: '*.env',
  })
  .then((ambientLight) => {
    scene.ambientLight = ambientLight;

    // 如果希望添加天空盒，也可以方便地从 ambientLight 中拿到
    skyMaterial.textureCubeMap = ambientLight.specularTexture;
    // 由于烘焙贴图的编码方式是 RGBM，因此需要进行相应的解码设置
    skyMaterial.textureDecodeRGBM = true;
  });
```

<playground src="ambient-light.ts"></playground>
