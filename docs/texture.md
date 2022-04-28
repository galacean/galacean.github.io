---
order: 1
title: Texture
type: Graphics
group: Texture
---

Texture ([Texture](${api}core/Texture)), is the most commonly used resource in 3D rendering. When we color the model, we need to set a color value for each fragment. In addition to setting this color value directly, we can also choose to read texels from the texture for coloring to achieve a richer art effect.

It is worth noting that pictures, Canvas, raw data, videos, etc. can be used as textures, and the Oasis engine currently supports all WebGL standard textures.

## Texture category

| type                   | description                      |
| :--------------------- | :------------------------------- |
| [2D Texture](${docs}texture-2d) | The most commonly used art resource, which uses two-dimensional UV coordinates for sampling |
| [Cube Texture](${docs}texture-cube) | A cube texture is composed of 6 2D textures |
| 2D Texture Arrays | Occupies only one texture unit, which is very suitable for the need to switch texture atlases |
## General properties

After uploading the texture, we need to understand some basic properties of the texture:

| properties | value |
| :-- | :-- |
| Wrap mode U（[wrapModeU](${api}core/Texture#wrapModeU)） | [Clamp](${api}core/TextureWrapMode#Clamp)、 [Repeat](${api}core/TextureWrapMode#Repeat)、[Mirror](${api}core/TextureWrapMode#Mirror) |
| Wrap mode V（[wrapModeV](${api}core/Texture#wrapModeV)） | [Clamp](${api}core/TextureWrapMode#Clamp)、 [Repeat](${api}core/TextureWrapMode#Repeat)、[Mirror](${api}core/TextureWrapMode#Mirror) |
| Filter mode（[filterMode](${api}core/Texture#filterMode)） | [Point](${api}core/TextureFilterMode#Point)、[Bilinear](${api}core/TextureFilterMode#Bilinear)、[Trilinear](${api}core/TextureFilterMode#Trilinear) |
| Anisotropic level（[anisoLevel](${api}core/Texture#anisoLevel)） | 1 ~ 16, depends on the equipment support |

### 1. Wrap mode

The range of texture sampling is `[0,1]`, then when the texture UV coordinates exceed this range, we can control how to sample the excess part by setting the wrap mode.

```typescript
texture.wrapModeU = texture.wrapModeV = TextureWrapMode.Clamp; // Clamp、Repeat、Mirror
```

- Clamp: Sampling edge texels when out of range

  <img src="https://gw.alipayobjects.com/zos/OasisHub/6a713c1b-e1cc-4dca-b4f0-135ea769dd83/image-20210720153811910.png" width="20%" height="20%">

- Repeat: Resample from [0,1] when out of range

  <img src="https://gw.alipayobjects.com/zos/OasisHub/76c5d42b-5889-401e-b286-d30cec99d5bd/image-20210720153717932.png" width="20%" height="20%">

- Mirror: Mirror sampling from [1,0] when out of range

  <img src="https://gw.alipayobjects.com/zos/OasisHub/c9e302ad-44c5-4e55-a4d8-a807861d266e/image-20210720153841976.png" width="20%" height="20%">

<playground src="wrap-mode.ts"></playground>

### 2. Filter mode

Generally, texels and screen pixels do not correspond exactly. We can control the respective filter modes in magnification (Mag) and reduction (Min) modes by setting the `filterMode`

```typescript
texture.filterMode = TextureFilterMode.Bilinear;
```

- Point: Use the texel closest to the sampling point

  ![image.png](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*n_Z3Tq5uBH8AAAAAAAAAAAAAARQnAQ)

- Bilinear: Use the average of the nearest 2\*2 texels

  ![image.png](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*5W-wT6OHhqMAAAAAAAAAAAAAARQnAQ)

- Trilinear: On the basis of Bilinear , average filtering is also performed on the mipmap level

  ![image.png](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*lVd1QqdzDhMAAAAAAAAAAAAAARQnAQ)

<playground src="filter-mode.ts"></playground>

### 3. Anisotropic level

Anisotropic filtering technology can make the texture clearer when viewed at an oblique angle. As shown in the figure below, the end of the texture will become clearer as the anisotropic filtering level increases.

![image.png](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*oqkqSJMAe7cAAAAAAAAAAAAAARQnAQ)

```typescript
texture.anisoLevel = 4; // 1~16
```

## General setting

### 1. mipmap

**Oasis enable [mipmap](${api}core/Texture#generateMipmaps) by default**, mipmap is used to solve the accuracy and performance problems when sampling high-resolution textures from low-resolution screens. That is, textures of different resolutions can be selected at a suitable distance, as shown in the following figure:

![image.png](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*mTBvTJ7Czt4AAAAAAAAAAAAAARQnAQ)

It should be noted that WebGL2.0 supports textures of **any resolution**, which will be processed according to the algorithm of [mipmap](http://download.nvidia.com/developer/Papers/2005/NP2_Mipmapping/NP2_Mipmap_Creation.pdf) Layers of mip, but if your environment is in WebGL1.0 , then please be sure to upload a **2 power texture**, such as a texture with a resolution of 1024 \* 512, otherwise Oasis will detect that the environment is unavailable mipmap, automatically downgrades to turn off the mipmap, which brings some visual surprises.

If you need to close mipmap, you can do it through a script. For the parameters, see [API](${api}core/Texture2D#constructor):

```typescript
const texture = new Texture2D(engine, width, height, TextureFormat.R8G8B8A8, false); // 5th parameters
```

For the cube texture, please refer to [API](${api}core/TextureCube#constructor):

```typescript
const cubeTexture = new TextureCube(engine, size, TextureFormat.R8G8B8A8, false); // 4th parameters
```

<playground src="texture-mipmap.ts"></playground>

### 2. flipY

`flipY` is used to control whether the texture flips the Y axis, that is, upside down, **engine and editor are closed by default**, if you need to open the `flipY`, you can use the [setImageSource](${api}core/Texture2D#setImageSource) API:

```typescript
const texture = new Texture2D(engine, width, height);
texture.setImageSource(img, 0, true); // 3th parameters
```

### 3. premultiplyAlpha

`premultiplyAlpha` is used to control whether the texture is premultiplied by the alpha (transparency) channel. **The engine and editor are turned off by default**. If you need to open the `premultiplyAlpha`, you can use the [setImageSource](${api}core/Texture2D#setImageSource) API:

```typescript
const texture = new Texture2D(engine, width, height);
texture.setImageSource(img, 0, undefined, true); // 4th parameters
```