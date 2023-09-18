---
order: 4
title: 环境光
type: 图形
group: 光照
label: Graphics/Light
---

**环境光**已经内置在了[场景](${api}core/Scene)中，主要使用了 IBL 技术，IBL 技术将 **周围环境** 视为一个大光源，保存在立方体纹理中，在渲染时，将立方体纹理的每个像素都视为光源，这种方式可以有效地捕捉环境的全局光照和氛围，使物体更好地融入其环境。

Galacean 支持通过 [编辑器](https://galacean.antgroup.com/editor) 进行离线烘焙得到 IBL 烘焙产物 `*.env` 文件，详情参考编辑器[光照教程](${docs}editor-3d-light-cn)。

我们在 [glTF Viewer](https://galacean.antgroup.com/#/gltf-viewer) 也提供了小工具，直接拖拽 HDR 贴图即可 ：![gltf viewer](https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*9mGbSpQ4HngAAAAAAAAAAAAAARQnAQ)

拿到 `*.env` 后，我们可以通过 resourceManager 加载环境光：

```typescript
engine.resourceManager
  .load<AmbientLight>({
    type: AssetType.Env,
    url: "*.env"
  })
  .then((ambientLight) => {
    scene.ambientLight = ambientLight;

    // 如果希望添加天空盒，也可以方便地从 ambientLight 中拿到
    skyMaterial.texture = ambientLight.specularTexture;
    // 由于烘焙贴图的编码方式是 RGBM，因此需要进行相应的解码设置
    skyMaterial.textureDecodeRGBM = true;
  });
```

<playground src="ambient-light.ts"></playground>
