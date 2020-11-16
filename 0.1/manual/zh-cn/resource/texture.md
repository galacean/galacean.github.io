# 纹理资源

纹理（[Texture](${book.api}classes/core.texture.html)）, 是在 3D 渲染中最常用到的资源。我们在给模型着色时，需要给每个片元设置一个颜色值，这个色值除了直接手动设置，我们还可以选择从纹理中读取纹素来进行着色，来达到更加丰富的美术效果。


值得注意的是，图片、canvas 画布、原始数据、视频等都可以用来当作纹理，Oasis 引擎目前支持所有 WebGL 标准的纹理。

## 纹理类型

### 1. 2D纹理
2D 纹理（[Texture2D](${book.api}sses/core.texture2d.html)）是最常用的美术资源，使用二维 UV  坐标进行采样，如下图：

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/204641/1594007441112-b94629f3-f8ac-47c2-b3b2-fb299158cc60.png#align=left&display=inline&height=136&margin=%5Bobject%20Object%5D&name=image.png&originHeight=210&originWidth=598&size=98914&status=done&style=none&width=388)


#### 2. 立方纹理

立方纹理（[TextureCubeMap](${book.api}classes/core.texturecubemap.html)）和 2D 纹理的区别是它有6个面，即用 6 张 2D 纹理组成了一个立方纹理。

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/204641/1593763468307-ccfaaa05-e41b-4872-8bbe-80d7a0753942.png#align=left&display=inline&height=163&margin=%5Bobject%20Object%5D&name=image.png&originHeight=342&originWidth=345&size=50808&status=done&style=none&width=164)

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/204641/1593763480438-03b68774-5dc8-4109-b8f1-90285858e448.png#align=left&display=inline&height=263&margin=%5Bobject%20Object%5D&name=image.png&originHeight=323&originWidth=345&size=81333&status=done&style=none&width=281)


立方纹理和 2D 纹理的底层采样方式略有不同，纹理使用二维坐标进行采样，而立方纹理使用三维坐标，即 *方向向量* 进行采样，如使用一个橘黄色的方向向量来从立方纹理上采样一个纹理值会像是这样：

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/204641/1593763385612-110879f2-221e-43e7-bb48-3889dd3304f3.png#align=left&display=inline&height=179&margin=%5Bobject%20Object%5D&name=image.png&originHeight=358&originWidth=400&size=25350&status=done&style=none&width=200)

正因为这种采样特性，所以立方纹理可以用来实现天空盒、环境反射等特效。


### 3. 离屏渲染纹理

离屏渲染纹理，顾名思义，该纹理可以通过离屏渲染得到。底层使用了 [FBO](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/framebufferTexture2D) 技术，将渲染操作不再输出到屏幕上，而是输出到纹理上，用户通过该纹理，可以用来实现后处理特效、折射、反射、动态环境贴图等一些艺术创作。


引擎提供了 [RenderTarget](${book.api}classes/core.rendertarget.html) 类来进行离屏渲染，并获取相应的离屏渲染纹理，目前引擎支持生成以下离屏渲染纹理：

|类型|应用|
|:--|:--|
|颜色纹理（[RenderColorTexture](${book.api}classes/core.rendercolortexture.html)）| 颜色纹理、颜色立方纹理、 多张颜色纹理 （MRT）|
|深度纹理（[RenderColorTexture](${book.api}classes/core.renderdepthtexture.html)）| 深度纹理、深度立方纹理 |
|纹理组合 | 颜色纹理 + 深度纹理、颜色立方体纹理 + 深度立方体纹理、多张颜色纹理 + 深度纹理 |


## 生成纹理

在脚本中，我们可以通过 [ResourceManager](${book.manual}resource/resource-manager) 来加载 2D 纹理和立方纹理：

```typescript
const textureResource = {
   type: AssetType.Texture2D,
   url: `图片url`
}

const cubeTextureResource ={
   type: AssetType.TextureCube,
   urls:[
      "px - right 图片 url",
      "nx - left 图片 url",
      "py - top 图片 url",
      "ny - bottom 图片 url",
      "pz - front 图片 url",
      "nz - back 图片 url",
   ]
}
  
engine.resourceManager
  .load([textureResource,cubeTextureResource]).then(resources => {
   // 引擎支持的2D纹理
   const texture =  resources[0];
   // 引擎支持的立方纹理
   const cubeTexture =  resources[1];
   // 接下来可以将纹理应用到材质上或者进行其他操作
})
```

## 纹理属性

上传完纹理之后，我们有必要了解下纹理的一些基本属性：

|属性|值|
|:--|:--|
|循环模式U（[wrapModeU](${book.api}classes/core.texture.html#wrapmodeu)）| 截取模式（[Clamp](${book.api}enums/core.texturewrapmode.html#clamp)）、 重复模式（[Repeat](${book.api}enums/core.texturewrapmode.html#repeat)）、镜像重复模式（[Mirror](${book.api}enums/core.texturewrapmode.html#mirror)）|
|循环模式V（[wrapModeV](${book.api}classes/core.texture.html#wrapmodev)）| 截取模式（[Clamp](${book.api}enums/core.texturewrapmode.html#clamp)）、重复模式（[Repeat](${book.api}enums/core.texturewrapmode.html#repeat)）、 镜像重复模式（[Mirror](${book.api}enums/core.texturewrapmode.html#mirror)）|
| 过滤模式（[filterMode](${book.api}classes/core.texture.html#filtermode)）| 点过滤（[Point](${book.api}enums/core.texturefiltermode.html#point)）、双线性过滤（[Bilinear](${book.api}enums/core.texturefiltermode.html#bilinear)）、 三线性过滤（[Trilinear](${book.api}enums/core.texturefiltermode.html#trilinear)）|
| 各向异性过滤等级（[anisoLevel](${book.api}classes/core.texture.html#anisolevel)）| 1 ~ 16|


### 1. 循环模式
纹理采样的范围为`[0,1]`，那么当纹理UV坐标超出这个范围时，我们可以通过设置循环模式来控制如何进行超出部分的采样。

```typescript
texture.wrapModeU = texture.wrapModeV = TextureWrapMode.Clamp; // Clamp、Repeat、Mirror
```

- 截取模式（Clamp）：超出范围采样边缘纹素。

    ![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/204641/1593768696379-5145cb50-f2e3-4f4d-922d-c07030657ce4.png#align=left&display=inline&height=164&margin=%5Bobject%20Object%5D&name=image.png&originHeight=328&originWidth=336&size=51338&status=done&style=shadow&width=168)

   

- 重复模式（Repeat）：超出范围从 [0,1] 开始重新采样

    ![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/204641/1593768761775-b39f851c-e74a-4d43-8165-41114a4194e4.png#align=left&display=inline&height=164&margin=%5Bobject%20Object%5D&name=image.png&originHeight=328&originWidth=336&size=162799&status=done&style=shadow&width=168)


- 镜像重复模式（Mirror）：超出范围从 [1,0] 开始镜像采样。

   ![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/204641/1593768785455-7973bad4-47b3-4756-afe4-fc52ec018919.png#align=left&display=inline&height=164&margin=%5Bobject%20Object%5D&name=image.png&originHeight=328&originWidth=336&size=195836&status=done&style=shadow&width=168)


### 2. 过滤模式

一般来说，纹素和屏幕像素不会刚好对应，我们可以通过设置过滤模式来控制放大（Mag）和缩小（Min）模式下分别的过滤模式。

```typescript
texture.filterMode = TextureFilterMode.Bilinear;
```

- 点过滤（Point）：使用距离采样点最近的纹素。

   ![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/204641/1593770442636-2b616531-bdba-4c56-8d8d-19202a51f10e.png#align=left&display=inline&height=152&margin=%5Bobject%20Object%5D&name=image.png&originHeight=304&originWidth=484&size=296409&status=done&style=none&width=242)


- 双线性过滤（Bilinear）：使用距离最近的2*2纹素矩阵的平均值。

   ![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/204641/1593770416087-c7fd5514-6f48-48bc-9d3e-8c83cc243b1c.png#align=left&display=inline&height=147&margin=%5Bobject%20Object%5D&name=image.png&originHeight=294&originWidth=482&size=281328&status=done&style=none&width=241)


- 三线性过滤（Trilinear）：在双线性过滤的基础上，对 mipmap 层级也进行了平均值过滤。

   ![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/204641/1593770374978-6d389237-db63-4695-913e-2a8c5e40e106.png#align=left&display=inline&height=154&margin=%5Bobject%20Object%5D&name=image.png&originHeight=308&originWidth=488&size=330217&status=done&style=none&width=244)



### 3. 各向异性过滤等级

各向异性过滤技术可以使纹理在倾斜角度下观看会更加清晰。如下图，纹理的尽头随着各向异性过滤等级的增加会愈加清晰。

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/204641/1593770944716-3b36089c-45ca-4534-8610-71c6786cd613.png#align=left&display=inline&height=152&margin=%5Bobject%20Object%5D&name=image.png&originHeight=304&originWidth=1474&size=867575&status=done&style=none&width=737)

```typescript
texture.anisoLevel = 4; // 1~16
```


#### 4. mipmap


**引擎默认开启 [mipmap](${book.api}classes/core.texture.html#generatemipmaps)**（多级纹理渐变），mipmap 用来解决从低分辨率屏幕中采样高分辨率纹理时的精度和性能问题，即能在合适的距离时选取不同分辨率的纹理，如下图：

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/204641/1593838642320-03ac8607-01bb-4930-97e5-eab145f92a43.png#align=left&display=inline&height=200&margin=%5Bobject%20Object%5D&name=image.png&originHeight=200&originWidth=300&size=137064&status=done&style=none&width=300)

需要注意的是，WebGL2.0 支持**任意分辨率**的纹理，会根据 [mipmap](http://download.nvidia.com/developer/Papers/2005/NP2_Mipmapping/NP2_Mipmap_Creation.pdf) 算法进行一层层的mip，但是如果您的环境是在 WebGL1.0 环境，那么请务必上传**2次幂纹理**，如 1024 * 512 这种分辨率的纹理,否则 Oasis 会检测到环境不可使用 mipmap，自动降级关闭 mipmap 功能，在视觉上带来一些意外情况。


如果需要改变 mipmap 的默认行为，可以通过脚本来实现，参数详见 [API](${book.api}classes/core.texture2d.html#constructor)：

```typescript
const texture = new Texture2D(engine, width, height, TextureFormat.R8G8B8A8, false); // 第 5 个参数
```

立方纹理脚本写法，详见 [API](${book.api}classes/core.texturecubemap.html#constructor)：

```typescript
const cubeTexture = new TextureCubeMap(engine, size, TextureFormat.R8G8B8A8, false); // 第 4 个参数
```

### 5. flipY

flipY 用来控制纹理是否翻转 Y 轴，即上下颠倒，**引擎和编辑器默认关闭**，如果需要改变 flipY 的默认行为，可以通过 [setImageSource](${book.api}classes/core.texture2d.html#setimagesource) 方法来实现：

```typescript
const texture = new Texture2D(engine, width, height);
texture.setImageSource(img, 0, true); // 第 3 个参数
```


### 6. premultiplyAlpha

premultiplyAlpha 用来控制纹理是否预乘 alpha(透明) 通道，**引擎和编辑器默认关闭**，如果需要改变 premultiplyAlpha 的默认行为，可以通过 [setImageSource](${book.api}classes/core.texture2d.html#setimagesource) 方法来实现：

```typescript
const texture = new Texture2D(engine, width, height);
texture.setImageSource(img,0,undefined,true); // 第 4 个参数
```


## 纹理的应用


当上传和设置好纹理后，我们就可以使用纹理了，纹理可以用于以下场景：


### 1. 材质

将纹理赋予材质球的相应属性，可以开启不同的渲染功能，如添加基础颜色纹理，可以决定模型的基本色调。
在脚本中，可以这样设置：

```typescript
const material = new PBRMaterial();
const texture = 生成纹理(); // 上文所示，不再赘述

material.baseColorTexture = texture;
```

#### 2. 天空盒

天空盒需要使用一张立方纹理,即将天空盒的6个面都赋予纹理，效果如下：

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/204641/1593845495289-f2aa8132-8c52-41f8-a811-f22af5310c21.png#align=left&display=inline&height=509&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1018&originWidth=1614&size=1921373&status=done&style=none&width=807)

```typescript
const skybox = skyNode.addComponent(ASkyBox);
skybox.skyBoxMap = cubeTexture;
```

#### 3. PBR 光

在 PBR 材质渲染中，如果想要获得逼真的环境反射现象，我们得往场景中添加 PBR光 组件，底层使用环境反射 IBL（基于图像的照明） 技术。PBR 光需要一张立方纹理当作镜面反射环境贴图，可以在不同的视角方向，渲染出周边环境的一些细节，如下效果：

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/204641/1593846150274-a271fa23-4645-48bf-bd83-dc03bf1eb6b6.png#align=left&display=inline&height=506&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1012&originWidth=1606&size=2042442&status=done&style=none&width=803)

PBR光 对应引擎的组件为 [EnvironmentMapLight](${book.api}classes/core.environmentmaplight.html)

```typescript
const envLight = node.addComponent(EnvironmentMapLight);

envLight.specularMap = cubeTexture1; // 镜面反射间接光
envLight.diffuseMap = cubeTexture2;  // 漫反射间接光
```

### 压缩纹理

Oasis 支持 **DXT/PVR/ETC/ASTC** 格式的压缩纹理，并且支持通过 **KTX**（[Khronos Texture](https://www.khronos.org/opengles/sdk/tools/KTX/file_format_spec/)）容器格式加载。 因为各个硬件支持的压缩格式不一样，所以在使用前请先查询是否支持某种格式：

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

确定支持某种格式后,使用 [ResourceManager](${book.manual}resource/resource-manager) 进行资源加载

```typescript
const resource = {
  type: AssetType.KTX,
  url: "https://gw.alipayobjects.com/os/bmw-prod/b38cb09e-154c-430e-98c8-81dc19d4fb8e.ktx"
};

engine.resourceManager.load(resource).then(res => {
   const compressedTexture = res;
   material.baseColorTexture = compressedTexture;
  // ...
});
```

## 常见 QA

### 1. 为什么无法上传立方纹理？

1.请确保您上传的立方纹理**至少包含 6 张纹理**，分别为：

   - `px`: Positive X face for a cube-mapped texture.
   - `nx`: Negative X face for a cube-mapped texture.
   - `py`: Positive Y face for a cube-mapped texture.
   - `ny`: Negative Y face for a cube-mapped texture.
   - `pz`: Positive Z face for a cube-mapped texture.
   - `nz`: Negative Z face for a cube-mapped texture.


2.立方纹理必须保证每张2D纹理的分辨率相等，即每张2D纹理的宽高必须一致。


### 2. 为什么设置了一些属性后在设备上没生效？

引擎不能保证每个配置在所有设备上都能支持，如以下配置：

- **各项异性过滤等级**： 每个设备 是否支持/支持的最大值 都不一样。
- **压缩纹理**：每个设备支持的压缩纹理格式不一样。

为了保证您的设置的兼容性，建议浏览以下步骤：

1. 通过 [canIUse](https://caniuse.com/) 、 [webglStats](https://webglstats.com/)、[webglReport](https://webglreport.com/?v=2) 等能力检测网站，知晓不同设备的兼容性差异。
2. 通过引擎提供的 RHI#canIUse 接口,检测能力是否可以使用。
3. 通过工程手段进行方案降级和强制降级。