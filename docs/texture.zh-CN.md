---
order: 1
title: 纹理总览
type: 图形
group: 纹理
---

纹理（[Texture](${api}core/Texture)）, 是在 3D 渲染中最常用到的资源。我们在给模型着色时，需要给每个片元设置一个颜色值，这个色值除了直接手动设置，我们还可以选择从纹理中读取纹素来进行着色，来达到更加丰富的美术效果。

值得注意的是，图片、canvas 画布、原始数据、视频等都可以用来当作纹理，Oasis 引擎目前支持所有 WebGL 标准的纹理。
## 纹理类型

| 类型 | 描述 |
| :-- | :-- |
| [2D 纹理](${docs}texture-2d-cn) | 最常用的美术资源，使用二维 UV 坐标进行采样 |
| [立方纹理](${docs}texture-cube-cn) | 6 张 2D 纹理组成了一个立方纹理，可以用来实现天空盒、环境反射等特效 |
| 2D 纹理数组| 只占用一个纹理单元，非常适合用来实现需要切换纹理图集的需求 |

## 通用属性

> 虽然纹理类型多样，但他们都有一些相似的基本属性与设置：

| 属性 | 值 |
| :-- | :-- |
| 循环模式 U（[wrapModeU](${api}core/Texture#wrapModeU)） | 截取模式（[Clamp](${api}core/TextureWrapMode#Clamp)）、 重复模式（[Repeat](${api}core/TextureWrapMode#Repeat)）、镜像重复模式（[Mirror](${api}core/TextureWrapMode#Mirror)） |
| 循环模式 V（[wrapModeV](${api}core/Texture#wrapModeV)） | 截取模式（[Clamp](${api}core/TextureWrapMode#Clamp)）、重复模式（[Repeat](${api}core/TextureWrapMode#Repeat)）、 镜像重复模式（[Mirror](${api}core/TextureWrapMode#Mirror)） |
| 过滤模式（[filterMode](${api}core/Texture#filterMode)） | 点过滤（[Point](${api}core/TextureFilterMode#Point)）、双线性过滤（[Bilinear](${api}core/TextureFilterMode#Bilinear)）、 三线性过滤（[Trilinear](${api}core/TextureFilterMode#Trilinear)） |
| 各向异性过滤等级（[anisoLevel](${api}core/Texture#anisoLevel)） | 1 ~ 16 ,具体要看设备支持情况 |

### 1. 循环模式

纹理采样的范围为`[0,1]`，那么当纹理 UV 坐标超出这个范围时，我们可以通过设置循环模式来控制如何进行超出部分的采样。

```typescript
texture.wrapModeU = texture.wrapModeV = TextureWrapMode.Clamp; // Clamp、Repeat、Mirror
```

- 截取模式（Clamp）：超出范围采样边缘纹素。

  <img src="https://gw.alipayobjects.com/zos/OasisHub/6a713c1b-e1cc-4dca-b4f0-135ea769dd83/image-20210720153811910.png" width="20%" height="20%">

- 重复模式（Repeat）：超出范围从 [0,1] 开始重新采样

  <img src="https://gw.alipayobjects.com/zos/OasisHub/76c5d42b-5889-401e-b286-d30cec99d5bd/image-20210720153717932.png" width="20%" height="20%">

- 镜像重复模式（Mirror）：超出范围从 [1,0] 开始镜像采样。

  <img src="https://gw.alipayobjects.com/zos/OasisHub/c9e302ad-44c5-4e55-a4d8-a807861d266e/image-20210720153841976.png" width="20%" height="20%">

<playground src="wrap-mode.ts"></playground>

### 2. 过滤模式

一般来说，纹素和屏幕像素不会刚好对应，我们可以通过设置过滤模式来控制放大（Mag）和缩小（Min）模式下分别的过滤模式。

```typescript
texture.filterMode = TextureFilterMode.Bilinear;
```

- 点过滤（Point）：使用距离采样点最近的纹素。

  ![image.png](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*n_Z3Tq5uBH8AAAAAAAAAAAAAARQnAQ)

- 双线性过滤（Bilinear）：使用距离最近的 2\*2 纹素矩阵的平均值。

  ![image.png](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*5W-wT6OHhqMAAAAAAAAAAAAAARQnAQ)

- 三线性过滤（Trilinear）：在双线性过滤的基础上，对 mipmap 层级也进行了平均值过滤。

  ![image.png](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*lVd1QqdzDhMAAAAAAAAAAAAAARQnAQ)

<playground src="filter-mode.ts"></playground>

### 3. 各向异性过滤等级

各向异性过滤技术可以使纹理在倾斜角度下观看会更加清晰。如下图，纹理的尽头随着各向异性过滤等级的增加会愈加清晰。

![image.png](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*oqkqSJMAe7cAAAAAAAAAAAAAARQnAQ)

```typescript
texture.anisoLevel = 4; // 1~16
```

<playground src="texture-aniso.ts"></playground>

## 通用设置
| 设置 | 值 |
| :-- | :-- |
| mipmap | 多级纹理渐变（默认开启） |
| flipY | 翻转 Y 轴（默认关闭） |
| premultiplyAlpha| 预乘透明通道（默认关闭） |
### 1. mipmap

**引擎默认开启 [mipmap](${api}core/Texture#generateMipmaps)**（多级纹理渐变），mipmap 用来解决从低分辨率屏幕中采样高分辨率纹理时的精度和性能问题，即能在合适的距离时选取不同分辨率的纹理，如下图：

![image.png](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*mTBvTJ7Czt4AAAAAAAAAAAAAARQnAQ)

需要注意的是，WebGL2.0 支持**任意分辨率**的纹理，会根据 [mipmap](http://download.nvidia.com/developer/Papers/2005/NP2_Mipmapping/NP2_Mipmap_Creation.pdf) 算法进行一层层的 mip，但是如果您的环境是在 WebGL1.0 环境，那么请务必上传**2 次幂纹理**，如 1024 \* 512 这种分辨率的纹理,否则 Oasis 会检测到环境不可使用 mipmap，自动降级关闭 mipmap 功能，在视觉上带来一些意外情况。

如果需要改变 mipmap 的默认行为，可以通过脚本来实现，参数详见 [API](${api}core/Texture2D#constructor)：

```typescript
const texture = new Texture2D(engine, width, height, TextureFormat.R8G8B8A8, false); // 第 5 个参数
```

立方纹理脚本写法，详见 [API](${api}core/TextureCube#constructor)：

```typescript
const cubeTexture = new TextureCube(engine, size, TextureFormat.R8G8B8A8, false); // 第 4 个参数
```

<playground src="texture-mipmap.ts"></playground>

### 2. flipY

flipY 用来控制纹理是否翻转 Y 轴，即上下颠倒，**引擎和编辑器默认关闭**，如果需要改变 flipY 的默认行为，可以通过 [setImageSource](${api}core/Texture2D#setImageSource) 方法来实现：

```typescript
const texture = new Texture2D(engine, width, height);
texture.setImageSource(img, 0, true); // 第 3 个参数
```

### 3. premultiplyAlpha

premultiplyAlpha 用来控制纹理是否预乘 alpha(透明) 通道，**引擎和编辑器默认关闭**，如果需要改变 premultiplyAlpha 的默认行为，可以通过 [setImageSource](${api}core/Texture2D#setImageSource) 方法来实现：

```typescript
const texture = new Texture2D(engine, width, height);
texture.setImageSource(img, 0, undefined, true); // 第 4 个参数
```
