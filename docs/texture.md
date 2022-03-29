---
order: 2
title: Texture Resource
type: Resource
---

Texture ([Texture](${api}core/Texture)), is the most commonly used resource in 3D rendering. When we color the model, we need to set a color value for each fragment. In addition to setting this color value directly, we can also choose to read texels from the texture for coloring to achieve a richer art effect.

It is worth noting that pictures, Canvas, raw data, videos, etc. can be used as textures, and the Oasis engine currently supports all WebGL standard textures.

## Texture type

### 1. 2D texture

2D texture ([Texture2D](${api}core/Texture2D)) is the most commonly used art resource, which uses two-dimensional UV coordinates for sampling, as shown below:

![image.png](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*tmTkSLi0XJ8AAAAAAAAAAAAAARQnAQ)

#### 2. Cube texture

The difference between a cube texture ([TextureCube](${api}core/TextureCube)) and a 2D texture is that it has 6 faces, that is, a cube texture is composed of 6 2D textures.

![image.png](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*Omw8Qo0WzfYAAAAAAAAAAAAAARQnAQ)

![image.png](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*r-XPSaUTEnEAAAAAAAAAAAAAARQnAQ)

The sampling method of cube texture and 2D texture is slightly different. Texture uses two-dimensional coordinates for sampling, while cubic texture uses three-dimensional coordinates, namely _direction vector_ for sampling. If you use an orange direction vector to sample a texture value from a cube texture, it will look like this:

![image.png](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*X752S5pQSB0AAAAAAAAAAAAAARQnAQ)

Because of this sampling feature, cube texture can be used to achieve special effects such as skybox, environmental reflection and so on.

### 3. Off-screen rendering texture

Off-screen rendering texture, as the name suggests, the texture can be obtained by off-screen rendering. The bottom layer uses the [FBO](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/framebufferTexture2D) technology to output the rendering operation to the texture instead of the screen. The user can use this texture to realize post-processing special effects, refraction, reflection, dynamic environment mapping and other artistic creations.

Oasis provides the [RenderTarget](${api}core/RenderTarget) class to perform off-screen rendering and obtain the corresponding off-screen rendering textures. Currently, the engine supports the generation of the following off-screen rendering textures:

| Type | Usage |
| :-- | :-- |
| Color texture（[RenderColorTexture](${api}core/RenderColorTexture)） | Color texture, <br> color cubic texture, <br> multiple color texture (MRT) |
| Depth texture（[RenderDepthTexture](${api}core/RenderDepthTexture)） | Depth texture, <br> depth cubic texture |
| Texture combination | Color Texture + Depth Texture, <br> Color Cube Texture + Depth Cube Texture, <br> Multi Color Texture + Depth Texture  |

## Generate texture

### 1. Loading web images

We can use [ResourceManager](${docs}resource-manager) to load images, see [Resource loading tutorial](${docs}resource-manager) for details:

```typescript
const textureResource = {
  type: AssetType.Texture2D,
  url: `image url`
};

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

engine.resourceManager.load([textureResource, cubeTextureResource]).then((resources) => {
  // 2D texture supported by the engine
  const texture = resources[0];
  // Cube texture supported by the engine
  const cubeTexture = resources[1];
  // Next, you can apply the texture to the material or other operations.
});
```

### 2. Load any image data source

As mentioned above, image, canvas, video and other image-related data sources can all be used as textures. For example, the video can be uploaded to the texture through the [setImageSource](${api}core/Texture2D#setImageSource) interface:

```typescript
// Get the HTMLVideoElement
const video = document.getElementsByTagName("video")[0];

// Set to texture
texture.setImageSource(video);
```

> `setImageSource` only sync the data of the frame, but each frame is changing, if you need to change synchronous changes, you can perform in the script `onUpdate` hook.

### 3. Load raw data

The bottom layer of the texture actually corresponds to the color value of each pixel, that is, the RGBA channel. We can manually fill in the color value of these color channels, and then pass it to the texture through the [setPixelBuffer](${api}core/Texture2D#setPixelBuffer) interface:

```typescript
// Assume that the texture has only one pixel, ie 1 * 1 wide.
// Set this pixel to red, that is, the R channel is 255.
const data = new Uint8Array([255, 0, 0, 255]);

texture.setPixelBuffer(data);
```

## Texture properties

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

![image-20210720153811910](https://gw.alipayobjects.com/zos/OasisHub/6a713c1b-e1cc-4dca-b4f0-135ea769dd83/image-20210720153811910.png)

- Repeat: Resample from [0,1] when out of range

![repeat.png](https://gw.alipayobjects.com/zos/OasisHub/76c5d42b-5889-401e-b286-d30cec99d5bd/image-20210720153717932.png)

- Mirror: Mirror sampling from [1,0] when out of range

![image-20210720153841976](https://gw.alipayobjects.com/zos/OasisHub/c9e302ad-44c5-4e55-a4d8-a807861d266e/image-20210720153841976.png)

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

#### 4. mipmap

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

### 5. flipY

`flipY` is used to control whether the texture flips the Y axis, that is, upside down, **engine and editor are closed by default**, if you need to open the `flipY`, you can use the [setImageSource](${api}core/Texture2D#setImageSource) API:

```typescript
const texture = new Texture2D(engine, width, height);
texture.setImageSource(img, 0, true); // 3th parameters
```

### 6. premultiplyAlpha

`premultiplyAlpha` is used to control whether the texture is premultiplied by the alpha (transparency) channel. **The engine and editor are turned off by default**. If you need to open the `premultiplyAlpha`, you can use the [setImageSource](${api}core/Texture2D#setImageSource) API:

```typescript
const texture = new Texture2D(engine, width, height);
texture.setImageSource(img, 0, undefined, true); // 4th parameters
```

## Use of texture

After uploading and setting the texture, we can use the texture. The texture can be used in the following scene:

### 1. Material

Assigning textures to the corresponding properties of the material can enable different rendering features, such as adding a `baseTexture` to determine the basic tone of the model. In the script, you can set it like this:

```typescript
const material = new PBRMaterial(engine);

material.baseTexture = texture;
```

#### 2. Skybox

The sky box needs a cube texture, the effect is as follows:

![image.png](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*K0fcT5IMQ9gAAAAAAAAAAAAAARQnAQ)

```typescript
const { background } = scene;
const skyMaterial = (background.sky.material = new SkyBoxMaterial(engine));

background.mode = BackgroundMode.Sky;
skyMaterial.textureCubeMap = cubeTexture;
```

#### 3. IBL

In PBR rendering, if we want to get realistic environment reflection phenomenon, we have to turn on [IBL in ambientLight](${docs}light#ibl). IBL needs cube textures as diffuse and specular textures, which can reflect the surrounding environment, with the following effects:

![image.png](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*uOdnTZ9R2j4AAAAAAAAAAAAAARQnAQ)

```typescript
const ambientLight = scene.ambientLight;

// Diffuse
ambientLight.diffuseMode = DiffuseMode.Texture;
ambientLight.diffuseTexture = cubeTexture;

// IBL
ambientLight.specularTexture = cubeTexture;
```

### Compressed texture

Oasis supports compressed textures in **DXT/PVR/ETC/ASTC** format, and supports the use of **KTX**([Khronos Texture](https://www.khronos.org/opengles/sdk/tools/KTX/file_format_spec/)) container format loading. Because each hardware supports different compression formats, please check whether a certain format is supported before use:

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

engine.resourceManager.load(resource).then((compressedTexture) => {
  material.baseTexture = compressedTexture;
  // ...
});
```

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

### 2. Why did you have some attributes that have not taken effect on the device?

The engine cannot guarantee that each configuration can be supported on all devices, such as the following configuration:

- **Anisotropic level**: The maximum value supported by each device is different.
- **Compressed texture**: The compressed texture format supported by each device is different.

In order to ensure the compatibility of your settings, you can refer to the following steps:

1. Check the website through [canIUse](https://caniuse.com/) 、 [webglStats](https://webglstats.com/)、[webglReport](https://webglreport.com/?v=2) and other capabilities to know the compatibility differences of different devices.
2. Through the [RHI#canIUse](${api}rhi-webgl/WebGLRenderer#canIUse) interface provided by the engine, check whether the capability can be used.
3. Project downgrades and forced downgrades are carried out through engineering means.
