# 灯光

光照使场景更有层次感，使用灯光，能建立更真实的三维场景。Oasis Engine 支持以下几种光源：

|类型|解释|
|:--|:--|
|[AmbientLight](${book.api}classes/core.ambientlight.html)|**环境光**，从各个角度照射物体，其强度都是一致的|
|[DirectLight](${book.api}classes/core.directlight.html)|**方向光**，光线相互平行，几何属性只有方向|
|[PointLight](${book.api}classes/core.pointlight.html) | **点光源**，一个点向周围所有方向发出的光，光照强度随光源距离衰减|
|[SpotLight](${book.api}classes/core.spotlight.html) |**聚光灯**，由一个特定位置发出，向特定方向延伸的光，光照强度随光源距离衰减，光照区域为锥形，锥形边缘随张开角度衰减|
|[EnvironmentMapLight](${book.api}classes/core.environmentmaplight.html) |**IBL**，基于图像的照明，用来实现全局光照。|


### 环境光

**环境光**表示模型四周的光照，有两个特性，一个是*颜色*（[color](${book.api}classes/core.ambientlight.html#color)），一个是*强度*（[intensity](${book.api}classes/core.ambientlight.html#intensity)）。*颜色* 表示光的颜色，*强度* 即表示光线的亮度，最亮为 `1` ，最暗即无光为 `0` 。


```typescript
// 创建一个实体用来挂载方向光
let lightEntity = rootEntity.createChild('ambient_light');

// 创建一个环境光组件
let ambientLight = lightEntity.addComponent(AmbientLight);
ambientLight.color = new Color(1, 0, 0);
ambientLight.intensity = 0.5;
```


### 方向光

**方向光**表示的是光线从以某个方向均匀射出，光线之间是平行的，太阳照射在地球表面的光可以认为是方向光，因为太阳和地球距离的远大于地球半径，所以照射在地球的阳光可以看作是来自同一个方向的一组平行光，即方向光。方向光有 3 个主要个特性：*颜色*（[color](${book.api}classes/core.directlight.html#color)）、*强度*（[intensity](${book.api}classes/core.directlight.html#intensity)）、*方向*（[direction](${book.api}classes/core.directlight.html#direction)）。*方向* 则由方向光所在的节点的朝向表示。


```typescript
let lightEntity = rootEntity.createChild('light');

let directLight = lightEntity.addComponent(DirectLight);
directLight.color =  new Color(0.3, 0.3, 1);
directLight.intensity =  1;

// 方向
lightEntity.transform.rotation = new Vector3(-45, -45, 0);
```


### 点光源


**点光源**存在于空间中的一点，由该点向四面八方发射光线，比如生活中的灯泡就是点光源。点光源有 4 个主要特性：*颜色*（[color](${book.api}classes/core.pointlight.html#color)）、*强度*（[intensity](${book.api}classes/core.pointlight.html#intensity)）、*有效距离*（[distance](${book.api}classes/core.pointlight.html#distance)）、*衰减系数*（[decay](${book.api}classes/core.pointlight.html#decay)）。距离光源超过有效距离的地方将无法接受到电光源的光线，并且离光源越远光照强度也降低，衰减系数控制光照强度降低的速率。


```typescript
let lightEntity = rootEntity.createChild('light');

lightEntity.addComponent(PointLight)
lightEntity.intensity = 1;
lightEntity.distance = 100;
lightEntity.color = new Color(0.3, 0.3, 1);
lightEntity.transform.position = new Vector3(-10, 10, 10);
```
### 聚光灯


**聚光灯**和点光源有点像，但是它的光线不是朝四面八方发射，而是朝某个方向范围，就像现实生活中的手电筒发出的光。聚光灯有几个主要特性：*颜色*（[color](${book.api}classes/core.spotlight.html#color)）、*强度*（[intensity](${book.api}classes/core.spotlight.html#intensity)）、*有效距离*（[distance](${book.api}classes/core.spotlight.html#distance)）、*衰减系数*（[decay](${book.api}classes/core.spotlight.html#decay)）、*散射角度*（[angle](${book.api}classes/core.spotlight.html#angle)）、*半影衰减系数*（[penumbra](${book.api}classes/core.spotlight.html#penumbra)）。散射角度表示与光源朝向夹角小于多少时有光线，半影衰减系数表示在有效的夹角范围内，随着夹角增大光照强度衰减的速度。

使用案例可以参考[Playground](${book.playground}#/spotLighting-shadow)。

```typescript
let lightEntity = rootEntity.createChild('light');

lightEntity.addComponent(SpotLight);

lightEntity.angle = Math.PI / 12; // 散射角度
lightEntity.penumbra = 0.2;       // 半影衰减系数
lightEntity.color = new Color(0.3, 0.3, 1);

lightEntity.transform.position = new Vector3(-10, 10, 10);
lightEntity.transform.rotation = new Vector3(-45, -45, 0);
```

### EnvironmentMapLight
“点光源”、“方向光”，都属于“直接光”，即光线经过物体表面后直接进入我们眼睛，而我们现实世界中并不是这样的，光线其实会经过周围物体、空气尘埃的各种碰撞，最终才进入我们眼睛，这也正是为什么我们能看到不被光线直接照射到的地方，如图所示，左图是直接光照，我们只能看到球的右边是亮的，而右图是**全局光照**，光线经过各种碰撞进入我们眼睛，所以打亮了整个场景。仔细观察的话我们还能看到球的左下角还透出了红色墙壁的颜色，这正是因为光线的各种碰撞，产生的“颜色渗透”现象。
![image.png](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*j6_uQq2oqtEAAAAAAAAAAAAAARQnAQ)
为了模拟这种全局光照，引擎提供了 [EnvironmentMapLight](${book.api}classes/core.environmentmaplight.html)。 EnvironmentMapLight 是基于 [IBL](https://www.wikiwand.com/en/Image-based_lighting) 技术实现的，需要用户上传一张[立方体纹理](${book.manual}resource/texture?id=_2-%e7%ab%8b%e6%96%b9%e7%ba%b9%e7%90%86)来模拟周边环境。代码实现见 [纹理的应用 - EnvironmentMapLight](${book.manual}resource/texture)。
如果您使用了 PBR 材质，千万别忘了往场景中添加一个 [EnvironmentMapLight](${book.api}classes/core.environmentmaplight.html) ～只有添加了之后，属于 PBR 的金属粗糙度、镜面反射、物理守恒、全局光照才会展现出效果。

