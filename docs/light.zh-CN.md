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

#### 球谐模式

现实世界中，漫反射肯定不是纯色的，一般是比较**低频**的颜色变化，针对这种低频滤波，Oasis 通过 9 个[球谐系数](https://graphics.stanford.edu/papers/envmap/envmap.pdf)保存环境颜色，然后切换 `diffuseMode` 为球谐模式：

```typescript
const ambientLight = scene.ambientLight;

// 球谐 漫反射
ambientLight.diffuseMode = DiffuseMode.SphericalHarmonics;
ambientLight.diffuseSphericalHarmonics = sh; // 通过烘焙等方式获取球谐系数
```

Oasis 提供了球谐烘焙的[工具库](https://github.com/oasis-engine/engine-baker)。可以先通过烘焙工具离线烘焙得到球谐系数，然后在运行时直接设置即可：

```typescript
// -----------离线烘焙-----------
import { SphericalHarmonics3Baker } from "@oasis-engine/baker";

const sh = new SphericalHarmonics3();

// 离线烘焙 cubeTexture 到 sh
SphericalHarmonics3Baker.fromTextureCubeMap(cubeTexture, sh);

<playground src="ambient-light.ts"></playground>

// 导出数组
const arr = [];
sh.toArray(arr);

// -----------运行时-----------

// 运行时可以直接使用，不用再进行上述烘焙过程
ambientLight.diffuseMode = DiffuseMode.SphericalHarmonics;
const sh = new SphericalHarmonics3();
sh.setValueByArray(arr); // 通过上文导出的数组设置球谐
ambientLight.diffuseSphericalHarmonics = sh;
```

#### IBL 镜面反射

为了模拟真实世界环境，引擎提供了 [IBL](https://www.wikiwand.com/en/Image-based_lighting) 技术，即加载一张能够体现周边环境的[立方体纹理](${docs}resouce-manager-cn#2-texturecube)。

```typescript
const ambientLight = scene.ambientLight;

// IBL 镜面反射
ambientLight.specularTexture = cubeTexture; // 加载相应立方体纹理
```

如果您使用了 PBR 材质，记得开启环境光的 IBL 模式～只有添加了之后，属于 PBR 的金属粗糙度、镜面反射、物理守恒、全局光照才会展现出效果。

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

lightEntity.addComponent(PointLight);
lightEntity.distance = 100;
lightEntity.color.setValue(0.3, 0.3, 1, 1);
lightEntity.transform.setPosition(-10, 10, 10);
```

### 聚光灯

**聚光灯**和点光源有点像，但是它的光线不是朝四面八方发射，而是朝某个方向范围，就像现实生活中的手电筒发出的光。聚光灯有几个主要特性：_颜色_（[color](${api}core/SpotLight#color)）、_强度_（[intensity](${api}core/SpotLight#intensity)）、_有效距离_（[distance](${api}core/SpotLight#distance)）、_散射角度_（[angle](${api}core/SpotLight#angle)）、_半影衰减角度_（[penumbra](${api}core/SpotLight#penumbra)）。散射角度表示与光源朝向夹角小于多少时有光线，半影衰减角度表示在有效的夹角范围内，随着夹角增大光照强度逐渐衰减至 0 。

```typescript
const lightEntity = rootEntity.createChild("light");

lightEntity.addComponent(SpotLight);

lightEntity.angle = Math.PI / 6; // 散射角度
lightEntity.penumbra = Math.PI / 12; // 半影衰减角度
lightEntity.color.setValue(0.3, 0.3, 1, 1);

lightEntity.transform.setPosition(-10, 10, 10);
lightEntity.transform.setRotation(-45, -45, 0);
```


<playground src="light-type.ts"></playground>