---
order: 4
title: Ambient Light
label: Graphics/Light
---


**Ambient light** has been built into [Scene](${api}core/Scene), providing solid color mode and texture mode for **diffuse**.

#### Solid color mode

```typescript
const ambientLight = scene.ambientLight;
// Set ambient light color with red
ambientLight.diffuseSolidColor.set(1, 0, 0, 1);
// Set ambient light intensity
ambientLight.diffuseIntensity = 0.5;
```

#### IBL

Generally, the PBR workflow does not use the pure color mode, but uses an HDR texture as the environment reflection, which we call the [IBL](https://developer.nvidia.cn/gpugems/gpugems/part-iii-materials/chapter-19-image-based-lighting) mode here.

Galacean supports offline baking through [Galacean Editor](https://galacean.antgroup.com) or [glTF Viewer](https://galacean.com/#/gltf-viewer) to get IBL baked products `*.env` file.

![gltf viewer](https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*9mGbSpQ4HngAAAAAAAAAAAAAARQnAQ)

After getting the `*.env`, we can load the ambient light through resourceManager:

```typescript
engine.resourceManager
  .load<AmbientLight>({
    type: AssetType.Env,
    url: "***.env"
  })
  .then((ambientLight) => {
    scene.ambientLight = ambientLight;

    // If you want to add a skybox, you can easily get it from ambientLight
    skyMaterial.textureCubeMap = ambientLight.specularTexture;
    // Since the encoding method of the baked texture is RGBM, the corresponding decoding settings are required
    skyMaterial.textureDecodeRGBM = true;
  });
```

<playground src="ambient-light.ts"></playground>

