---
order: 4
title: Cube Texture
type: Graphics
group: Texture
label: Graphics/Texture
---

The difference between a cube texture ([TextureCube](${api}core/TextureCube)) and a 2D texture is that it has 6 faces, that is, a cube texture is composed of 6 2D textures.

![image.png](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*Omw8Qo0WzfYAAAAAAAAAAAAAARQnAQ)

![image.png](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*r-XPSaUTEnEAAAAAAAAAAAAAARQnAQ)

The sampling method of cube texture and 2D texture is slightly different. Texture uses two-dimensional coordinates for sampling, while cubic texture uses three-dimensional coordinates, namely _direction vector_ for sampling. If you use an orange direction vector to sample a texture value from a cube texture, it will look like this:

![image.png](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*X752S5pQSB0AAAAAAAAAAAAAARQnAQ)

Because of this sampling feature, cube texture can be used to achieve special effects such as skyBox, environmental reflection and so on.

## Create

```
const cubeTextureResource = {
  type: AssetType.TextureCube,
  urls: [
    "px - right image url",
    "nx - left image url",
    "py - top image url",
    "ny - bottom image url",
    "pz - front image url",
    "nz - back image url"
  ]
};

engine.resourceManager.load(cubeTextureResource).then((resource) => {
  // Cube texture supported by the engine
  const cubeTexture = resource;
  // Next, you can apply the texture to the material or other operations.
});
```

## How to use

### SkyBox

The sky box needs a cube texture, the effect is as follows:

<playground src="background.ts"></playground>

### IBL

In PBR rendering, if we want to get realistic environment reflection phenomenon, we have to turn on [IBL in ambientLight](${docs}ambient-light#ibl). IBL needs cube textures as diffuse and specular textures, which can reflect the surrounding environment, with the following effects:

<playground src="ambient-light.ts"></playground>

### HDR

<playground src="hdr-loader.ts"></playground>

## QA

### 1. Why can't upload cube texture?

Make sure the uploaded cube texture **contains at least 6 textures**, respectively:

- `px`: Positive X face for a cube-mapped texture.
- `nx`: Negative X face for a cube-mapped texture.
- `py`: Positive Y face for a cube-mapped texture.
- `ny`: Negative Y face for a cube-mapped texture.
- `pz`: Positive Z face for a cube-mapped texture.
- `nz`: Negative Z face for a cube-mapped texture.

The cube texture must ensure that the resolution of each 2D texture is equal, that is, the width and height of each 2D texture must be the same.
