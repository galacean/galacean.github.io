---
order: 1
title: 2D 纹理
type: 图形
group: 纹理
label: Graphics/Texture
---

2D 纹理（[Texture2D](${api}core/Texture2D)）是最常用的美术资源，使用二维 UV 坐标进行采样，如下图：

![image.png](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*tmTkSLi0XJ8AAAAAAAAAAAAAARQnAQ)

## 创建

### 1. 加载网络图片

我们可以通过 [ResourceManager](${docs}resource-manager) 加载图片，详见 [资源加载教程](${docs}resource-manager#内置资源类型)：

```typescript
const textureResource = {
  type: AssetType.Texture2D,
  url: `图片url`
};

engine.resourceManager.load(textureResource, cubeTextureResource).then((resource) => {
  // 引擎支持的2D纹理
  const texture = resource;
  // 接下来可以将纹理应用到材质上或者进行其他操作
});
```

### 2. 加载任何图像数据源

前面提到过，图片、canvas 画布、视频等跟图像相关的数据源都可以用来当作纹理。比如视频就可以通过 [setImageSource](${api}core/Texture2D#setImageSource) 接口上传到纹理：

```typescript
// 拿到视频标签，即 HTMLVideoElement
const video = document.getElementsByTagName("video")[0];

// 加载到纹理
texture.setImageSource(video);
```

> `setImageSource` 只能同步那一帧的数据，但是视频每一帧都在变化，如果需要纹理同步变化，则要在脚本 onUpdate 钩子里面执行

对于视频这类需要频繁更新纹理内容的使用场景，创建纹理的时候需要设置关闭 mipmap 以及设置纹理使用方式为 Dynamic，以获得更好的性能，示例代码如下：

<playground src="benchmark-video.ts"></playground>

### 3. 加载原始数据

纹理底层其实对应着每个像素的颜色值，即 RGBA 通道，我们可以手动填写这些颜色通道的颜色数值，然后通过 [setPixelBuffer](${api}core/Texture2D#setPixelBuffer) 接口传到纹理中：

```typescript
// 假设纹理只有一个像素，即 1 * 1 宽高。
// 将该像素设置为红色，即 R 通道为 255。
const data = new Uint8Array([255, 0, 0, 255]);

texture.setPixelBuffer(data);
```

## 使用

将纹理赋予材质球的相应属性，可以开启不同的渲染功能，如添加基础颜色纹理，可以决定模型的基本色调。在脚本中，可以这样设置：

```typescript
const material = new PBRMaterial(engine);
const texture = 生成纹理(); // 上文所示，不再赘述

material.baseTexture = texture;
```
