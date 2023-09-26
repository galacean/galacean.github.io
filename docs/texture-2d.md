---
order: 2
title: 2D Texture
type: Graphics
group: Texture
label: Graphics/Texture
---

2D texture ([Texture2D](${api}core/Texture2D)) is the most commonly used art resource, which uses two-dimensional UV coordinates for sampling, as shown below:

![image.png](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*tmTkSLi0XJ8AAAAAAAAAAAAAARQnAQ)

## Generate texture

### 1. Loading web images

We can use [ResourceManager](${docs}resource-manager) to load images, see [Resource loading tutorial](${docs}resource-manager) for details:

```typescript
const textureResource = {
  type: AssetType.Texture2D,
  url: `image url`
};

engine.resourceManager.load(textureResource, cubeTextureResource).then((resource) => {
  // 2D texture supported by the engine
  const texture = resource;
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

For scenarios such as videos that require frequent texture updates, you need to set mipmap off and set the texture usage to Dynamic when creating textures to achieve better performance. The sample code is as follows:

<playground src="benchmark-video.ts"></playground>

### 3. Load raw data

The bottom layer of the texture actually corresponds to the color value of each pixel, that is, the RGBA channel. We can manually fill in the color value of these color channels, and then pass it to the texture through the [setPixelBuffer](${api}core/Texture2D#setPixelBuffer) interface:

```typescript
// Assume that the texture has only one pixel, ie 1 * 1 wide.
// Set this pixel to red, that is, the R channel is 255.
const data = new Uint8Array([255, 0, 0, 255]);

texture.setPixelBuffer(data);
```

## How to use

Assigning textures to the corresponding properties of the material can enable different rendering features, such as adding a `baseTexture` to determine the basic tone of the model. In the script, you can set it like this:

```typescript
const material = new PBRMaterial(engine);

material.baseTexture = texture;
```

