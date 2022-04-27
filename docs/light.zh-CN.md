---
order: 3
title: 光照
type: 组件
---

光照使场景更有层次感，使用光照，能建立更真实的三维场景。Oasis Engine 支持以下几种光源：

| 类型 | 解释 |
| :-- | :-- |
| [AmbientLight](${api}core/AmbientLight) | **环境光**，默认从各个角度照射物体，其强度都是一致的，如果开启了漫反射纹理模式，则采样纹理作为环境颜色；如果设置了镜面反射纹理，则开启 IBL，用来实现全局光照 |
| [DirectLight](${api}core/DirectLight) | **方向光**，光线相互平行，几何属性只有方向  |
| [PointLight](${api}core/PointLight) | **点光源**，一个点向周围所有方向发出的光，光照强度随光源距离衰减 |
| [SpotLight](${api}core/SpotLight) | **聚光灯**，由一个特定位置发出，向特定方向延伸的光，光照强度随光源距离衰减，光照区域为锥形，锥形边缘随张开角度衰减 |

### 环境光

#### 纯色模式

**环境光**已经内置在了[场景](${api}core/Scene)中，提供了纯色模式和 IBL 模式。默认为 **纯色模式**，_颜色_ 表示光的颜色，_强度_ 表示光线的亮度，最亮为 `1` ，最暗为 `0` 。

```typescript
const ambientLight = scene.ambientLight;
// 设置环境光颜色
ambientLight.diffuseSolidColor.setValue(1, 0, 0, 1);
// 设置环境光强度
ambientLight.diffuseIntensity = 0.5;
```

#### IBL 模式

一般 PBR 工作流不会使用纯色模式，而是使用一张 HDR 贴图用作环境反射，我们在这里称之为 [IBL](https://developer.nvidia.cn/gpugems/gpugems/part-iii-materials/chapter-19-image-based-lighting) 模式。

Oasis 支持通过[编辑器](https://oasis.alipay.com/editor)或者 [glTF Viewer](https://oasisengine.cn/gltf-viewer) 进行离线烘焙得到 IBL 烘焙产物 `*.env` 文件。

![gltf viewer](https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*9mGbSpQ4HngAAAAAAAAAAAAAARQnAQ)

拿到 `*.env` 后，我们可以通过 resourceManager 加载环境光：

```typescript
engine.resourceManager
  .load<AmbientLight>({
    type: AssetType.Env,
    url: "*.env"
  })
  .then((ambientLight) => {
    scene.ambientLight = ambientLight;

    // 如果希望添加天空盒，也可以方便地从 ambientLight 中拿到
    skyMaterial.textureCubeMap = ambientLight.specularTexture;
    // 由于烘焙贴图的编码方式是 RGBM，因此需要进行相应的解码设置
    skyMaterial.textureDecodeRGBM = true;
  });
```

<playground src="ambient-light.ts"></playground>

### 方向光

**方向光**表示的是光线从以某个方向均匀射出，光线之间是平行的，太阳照射在地球表面的光可以认为是方向光，因为太阳和地球距离的远大于地球半径，所以照射在地球的阳光可以看作是来自同一个方向的一组平行光，即方向光。方向光有 3 个主要个特性：_颜色_（[color](${api}core/DirectLight#color)）、_强度_（[intensity](${api}core/DirectLight#intensity)）、_方向_（[direction](${api}core/DirectLight#direction)）。_方向_ 则由方向光所在的节点的朝向表示。

```typescript
const lightEntity = rootEntity.createChild("light");
const directLight = lightEntity.addComponent(DirectLight);

directLight.color.setValue(0.3, 0.3, 1, 1);

// 调整方向
lightEntity.transform.setRotation(-45, -45, 0);
```

### 点光源

**点光源**存在于空间中的一点，由该点向四面八方发射光线，比如生活中的灯泡就是点光源。点光源有 3 个主要特性：_颜色_（[color](${api}core/PointLight#color)）、_强度_（[intensity](${api}core/PointLight#intensity)）、_有效距离_（[distance](${api}core/PointLight#distance)））。超过有效距离的地方将无法接受到点光源的光线，并且离光源越远光照强度也会逐渐降低。

```typescript
const lightEntity = rootEntity.createChild("light");

const pointLight = lightEntity.addComponent(PointLight);
pointLight.distance = 100;
pointLight.color.setValue(0.3, 0.3, 1, 1);
lightEntity.transform.setPosition(-10, 10, 10);
```

### 聚光灯

**聚光灯**和点光源有点像，但是它的光线不是朝四面八方发射，而是朝某个方向范围，就像现实生活中的手电筒发出的光。聚光灯有几个主要特性：_颜色_（[color](${api}core/SpotLight#color)）、_强度_（[intensity](${api}core/SpotLight#intensity)）、_有效距离_（[distance](${api}core/SpotLight#distance)）、_散射角度_（[angle](${api}core/SpotLight#angle)）、_半影衰减角度_（[penumbra](${api}core/SpotLight#penumbra)）。散射角度表示与光源朝向夹角小于多少时有光线，半影衰减角度表示在有效的夹角范围内，随着夹角增大光照强度逐渐衰减至 0 。

```typescript
const lightEntity = rootEntity.createChild("light");

const spotLight = lightEntity.addComponent(SpotLight);

spotLight.angle = Math.PI / 6; // 散射角度
spotLight.penumbra = Math.PI / 12; // 半影衰减角度
spotLight.color.setValue(0.3, 0.3, 1, 1);

lightEntity.transform.setPosition(-10, 10, 10);
lightEntity.transform.setRotation(-45, -45, 0);
```

<playground src="light-type.ts"></playground>
