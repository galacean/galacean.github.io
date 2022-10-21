---
order: 4
title: 立方纹理
type: 图形
group: 纹理
label: Graphics/Texture
---

立方纹理（[TextureCube](${api}core/TextureCube)）和 2D 纹理的区别是它有 6 个面，即用 6 张 2D 纹理组成了一个立方纹理。

![image.png](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*Omw8Qo0WzfYAAAAAAAAAAAAAARQnAQ)

![image.png](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*r-XPSaUTEnEAAAAAAAAAAAAAARQnAQ)

立方纹理和 2D 纹理的底层采样方式略有不同，纹理使用二维坐标进行采样，而立方纹理使用三维坐标，即 _方向向量_ 进行采样，如使用一个橘黄色的方向向量来从立方纹理上采样一个纹理值会像是这样：

![image.png](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*X752S5pQSB0AAAAAAAAAAAAAARQnAQ)

正因为这种采样特性，所以立方纹理可以用来实现天空盒、环境反射等特效。

## 创建

```
const cubeTextureResource = {
  type: AssetType.TextureCube,
  urls: [
    "px - right 图片 url",
    "nx - left 图片 url",
    "py - top 图片 url",
    "ny - bottom 图片 url",
    "pz - front 图片 url",
    "nz - back 图片 url"
  ]
};

engine.resourceManager.load(cubeTextureResource).then((resource) => {
  // 引擎支持的立方纹理
  const cubeTexture = resource;
  // 接下来可以将纹理应用到材质上或者进行其他操作
});
```

## 使用

### 天空盒

天空盒需要使用一张立方纹理,即将天空盒的 6 个面都赋予纹理，效果如下：

<playground src="background.ts"></playground>

### IBL

在 PBR 材质渲染中，如果想要获得逼真的环境反射现象，我们得开启[环境光的 IBL 模式](${docs}ambient-light-cn#ibl)。而 IBL 需要立方纹理作为漫反射和镜面反射纹理，可以在不同的视角方向，渲染出周边环境的一些细节。

<playground src="ambient-light.ts"></playground>

### HDR

<playground src="hdr-loader.ts"></playground>

## 常见 QA

### 1. 为什么无法上传立方纹理？

1.请确保您上传的立方纹理**至少包含 6 张纹理**，分别为：

- `px`: Positive X face for a cube-mapped texture.
- `nx`: Negative X face for a cube-mapped texture.
- `py`: Positive Y face for a cube-mapped texture.
- `ny`: Negative Y face for a cube-mapped texture.
- `pz`: Positive Z face for a cube-mapped texture.
- `nz`: Negative Z face for a cube-mapped texture.

2.立方纹理必须保证每张 2D 纹理的分辨率相等，即每张 2D 纹理的宽高必须一致。
