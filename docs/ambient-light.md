---
order: 4
title: Ambient Light
label: Graphics/Light
---

**Ambient light** has been built into [Scene](${api}core/Scene), mainly using IBL technology. IBL technology treats the **surrounding environment** as a large light source and saves it in the cube texture, when rendering, each pixel of the cube texture is regarded as a light source. This method can effectively capture the global illumination and atmosphere of the environment, making the object better integrate into its environment.

Galacean supports offline baking through [Editor](https://galacean.antgroup.com/editor) to obtain IBL baked product `*.env` files. For details, please refer to the editor [Lighting Tutorial](${docs}editor-3d-light-cn).

We also provide a small tool in [glTF Viewer](https://galacean.antgroup.com/#/gltf-viewer), just drag and drop the HDR texture:

![gltf viewer](https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*9mGbSpQ4HngAAAAAAAAAAAAAARQnAQ)

After getting `*.env`, we can load the ambient light through resourceManager:

```typescript
engine.resourceManager
  .load<AmbientLight>({
    type: AssetType.Env,
    url: "*.env"
  })
  .then((ambientLight) => {
    scene.ambientLight = ambientLight;

    // If you want to add a skybox, you can easily get it from ambientLight
    skyMaterial.texture = ambientLight.specularTexture;
    // Since the encoding method of the baked texture is RGBM, the corresponding decoding settings are required
    skyMaterial.textureDecodeRGBM = true;
  });
```

<playground src="ambient-light.ts"></playground>
