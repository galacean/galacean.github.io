---
order: 5
title: 环境光
type: 光照
label: Light
---

除了实时计算的直接光源，我们一般还要提前离线烘焙光照作为环境光照来实时采样，这种方式可以有效地捕捉环境的全局光照和氛围，使物体更好地融入其环境。

![image-20231227151844040](https://gw.alipayobjects.com/zos/OasisHub/23397353-5434-4bde-ace7-72c8731d5581/image-20231227151844040.png)

## 编辑器使用

### 1. 环境漫反射

<img src="https://gw.alipayobjects.com/zos/OasisHub/7b2f79cc-7886-43da-b1cb-32bb7373dcb0/image-20231009114400810.png" alt="image-20231009114400810" style="zoom:50%;" />

| 属性 | 作用 |
| :-- | :-- |
| Mode | 支持 `Sky`和 `Solid Color` 两种模式，默认 `Sky` 模式，表示使用根据场景烘焙的球谐参数; `Solid Color` 模式时使用纯色作为漫反射颜色 |
| Intensity | 漫反射强度 |

### 2. 环境镜面反射

<img src="https://gw.alipayobjects.com/zos/OasisHub/635ba520-5b7c-4156-a617-445045ddf92d/image-20231009114427072.png" alt="image-20231009114427072" style="zoom:50%;" />

| 属性 | 作用 |
| :-- | :-- |
| Mode | 支持 `Sky`和 `Custom` 两种模式，默认 `Sky` 模式，表示使用根据场景烘焙的预滤波环境贴图; `Custom` 模式时可以单独上传一张 HDR 贴图作为环境反射 |
| Intensity | 镜面反射强度 |
| Baker Resolution | 表示烘焙后的预滤波环境贴图的分辨率，默认 128 分辨率，烘焙产物约为 500KB，64 分辨率的烘焙产物约为 125KB，可以根据场景选择合适的烘焙分辨率。详见[烘焙教程](${docs}graphics-light-bake)。 |

## 脚本使用

通过[烘焙教程](${docs}graphics-light-bake)拿到烘焙产物的 url 后，通过引擎的 EnvLoader 进行加载解析：

```typescript
engine.resourceManager
  .load<AmbientLight>({
    type: AssetType.Env,
    url: "https://gw.alipayobjects.com/os/bmw-prod/89c54544-1184-45a1-b0f5-c0b17e5c3e68.bin"
  })
  .then((ambientLight) => {
    scene.ambientLight = ambientLight;

    // 可以调节漫反射、镜面反射强度，默认为1
    // ambientLight.diffuseIntensity = 1;
    // ambientLight.specularIntensity = 1;

    // 预滤波环境贴图（ambientLight.specularTexture）还可以作为场景的背景
    // skyMaterial.texture = ambientLight.specularTexture;
    // 由于烘焙产物的颜色编码方式是 RGBM，因此作为背景时需要将解码设置为 textureDecodeRGBM
    // skyMaterial.textureDecodeRGBM = true;
  });
```
