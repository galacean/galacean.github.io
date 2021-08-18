---
order: 3
title: 光照
type: 组件
---

光照使场景更有层次感，使用光照，能建立更真实的三维场景。Oasis Engine 支持以下几种光源：

|类型|解释|
|:--|:--|
|[AmbientLight](${api}core/AmbientLight)|**环境光**，默认从各个角度照射物体，其强度都是一致的，如果开启了漫反射纹理模式，则采样纹理作为环境颜色；如果设置了镜面反射纹理，则开启IBL，用来实现全局光照|
|[DirectLight](${api}core/DirectLight)|**方向光**，光线相互平行，几何属性只有方向|
|[PointLight](${api}core/PointLight) | **点光源**，一个点向周围所有方向发出的光，光照强度随光源距离衰减|
|[SpotLight](${api}core/SpotLight) |**聚光灯**，由一个特定位置发出，向特定方向延伸的光，光照强度随光源距离衰减，光照区域为锥形，锥形边缘随张开角度衰减|



### 环境光

**环境光**已经内置在了[场景](${api}core/Scene)中，提供了普通模式和IBL模式。默认普通模式下，*颜色* 表示光的颜色，*强度* 即表示光线的亮度，最亮为 `1` ，最暗为 `0` 。

```typescript
const ambientLight = scene.ambientLight;
// 设置环境光颜色
ambientLight.diffuseSolidColor.setValue(1, 0, 0, 1);
// 设置环境光强度
ambientLight.diffuseIntensity = 0.5;
```

#### IBL模式
“点光源”、“方向光”，都属于“直接光”，即光线经过物体表面后直接进入我们眼睛，而我们现实世界中并不是这样的，光线其实会经过周围物体、空气尘埃的各种碰撞，最终才进入我们眼睛，这也正是为什么我们能看到不被光线直接照射到的地方，如图所示，左图是直接光照，我们只能看到球的右边是亮的，而右图是**全局光照**，光线经过各种碰撞进入我们眼睛，所以打亮了整个场景。仔细观察的话我们还能看到球的左下角还透出了红色墙壁的颜色，这正是因为光线的各种碰撞，产生的“颜色渗透”现象。

![image.png](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*j6_uQq2oqtEAAAAAAAAAAAAAARQnAQ)

为了模拟这种全局光照，引擎提供了[IBL](https://www.wikiwand.com/en/Image-based_lighting) 技术。
```typescript
const ambientLight = scene.ambientLight;
// IBL 漫反射
ambientLight.diffuseMode = DiffuseMode.Texture;
ambientLight.diffuseTexture = cubeTexture; // 加载相应立方体纹理
// IBL 镜面反射
ambientLight.specularTexture = cubeTexture; // 加载相应立方体纹理
```
如果您使用了 PBR 材质，千万记得开启环境光的 IBL 模式～只有添加了之后，属于 PBR 的金属粗糙度、镜面反射、物理守恒、全局光照才会展现出效果。


<playground src="ambient-light.ts"></playground>

### 方向光

**方向光**表示的是光线从以某个方向均匀射出，光线之间是平行的，太阳照射在地球表面的光可以认为是方向光，因为太阳和地球距离的远大于地球半径，所以照射在地球的阳光可以看作是来自同一个方向的一组平行光，即方向光。方向光有 3 个主要个特性：*颜色*（[color](${api}core/DirectLight#color)）、*强度*（[intensity](${api}core/DirectLight#intensity)）、*方向*（[direction](${api}core/DirectLight#direction)）。*方向* 则由方向光所在的节点的朝向表示。


```typescript
let lightEntity = rootEntity.createChild('light');

let directLight = lightEntity.addComponent(DirectLight);
directLight.color =  new Color(0.3, 0.3, 1);
directLight.intensity =  1;

// 方向
lightEntity.transform.rotation = new Vector3(-45, -45, 0);
```


### 点光源


**点光源**存在于空间中的一点，由该点向四面八方发射光线，比如生活中的灯泡就是点光源。点光源有 4 个主要特性：*颜色*（[color](${api}core/PointLight#color)）、*强度*（[intensity](${api}core/PointLight#intensity)）、*有效距离*（[distance](${api}core/PointLight#distance)）、*衰减系数*（[decay](${api}core/PointLight#decay)）。距离光源超过有效距离的地方将无法接受到电光源的光线，并且离光源越远光照强度也降低，衰减系数控制光照强度降低的速率。


```typescript
let lightEntity = rootEntity.createChild('light');

lightEntity.addComponent(PointLight)
lightEntity.intensity = 1;
lightEntity.distance = 100;
lightEntity.color = new Color(0.3, 0.3, 1);
lightEntity.transform.position = new Vector3(-10, 10, 10);
```
### 聚光灯


**聚光灯**和点光源有点像，但是它的光线不是朝四面八方发射，而是朝某个方向范围，就像现实生活中的手电筒发出的光。聚光灯有几个主要特性：*颜色*（[color](${api}core/SpotLight#color)）、*强度*（[intensity](${api}core/SpotLight#intensity)）、*有效距离*（[distance](${api}core/SpotLight#distance)）、*衰减系数*（[decay](${api}core/SpotLight#decay)）、*散射角度*（[angle](${api}core/SpotLight#angle)）、*半影衰减系数*（[penumbra](${api}core/SpotLight#penumbra)）。散射角度表示与光源朝向夹角小于多少时有光线，半影衰减系数表示在有效的夹角范围内，随着夹角增大光照强度衰减的速度。

<playground src="spotlight-shadow.ts"></playground>

```typescript
let lightEntity = rootEntity.createChild('light');

lightEntity.addComponent(SpotLight);

lightEntity.angle = Math.PI / 12; // 散射角度
lightEntity.penumbra = 0.2;       // 半影衰减系数
lightEntity.color = new Color(0.3, 0.3, 1);

lightEntity.transform.position = new Vector3(-10, 10, 10);
lightEntity.transform.rotation = new Vector3(-45, -45, 0);
```
