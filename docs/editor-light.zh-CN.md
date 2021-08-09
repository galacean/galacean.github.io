---
order: 30
title: 光照
type: 编辑器
author: 阿霑
---

## 介绍
在三维世界中，合理地搭配光照和材质可以让整个场景更加真实。

<playground src="pbr-base.ts"></playground>

## 光照类型
|类型|释义|支持情况|
|:--|:--|:--|
|[AmbientLight](${api}core/AmbientLight)|**环境光**，默认从各个角度照射物体，其强度都是一致的，如果开启了漫反射纹理模式，则采样纹理作为环境颜色；如果设置了镜面反射纹理，则开启IBL，用来实现全局光照| runtime 支持，编辑器支持|
|[DirectLight](${api}core/DirectLight)|**平行光**，光线相互平行，几何属性只有方向，如太阳光| runtime 支持，编辑器支持|
|[PointLight](${api}core/PointLight) | **点光源**，一个点向周围所有方向发出的光，光照强度随光源距离衰减，如蜡烛| runtime 支持，编辑器支持|
|[SpotLight](${api}core/SpotLight) |**聚光灯**，由一个特定位置发出，向特定方向延伸的光，光照强度随光源距离衰减，光照区域为锥形，锥形边缘随张开角度衰减，如手电筒| runtime 支持，编辑器暂不支持|

## 选择
我们需要根据期望的效果对材质和光照进行合理搭配，因此在对光源进行选型时，应当充分考虑不同材质的特性。

|类型|特性|性能|
|:--|:--|:--|
|[Unlit](${api}core/AmbientLight)|不受光照影响|性能最佳|
|[BlinnPhong](${api}core/DirectLight)|在材质属性和光源的共同作用下可以展显出略为真实的效果|性能中等|
|[PBR](${api}core/PointLight) |在材质属性和光源的共同作用下可以展显出更加真实的效果|性能较差|

![buildBox](https://gw.alipayobjects.com/zos/OasisHub/ab6d0e81-f542-4dc3-a857-7453fca7a08d/buildBox.gif)

上图依次为 Unlit ， BlinnPhong 和 PBR 材质（详见 [材质](${docs}material-cn) 章节），可以看到，不同的材质在不同的光照情况下，会呈现出不同的表现，因此在**满足预期表现**的情况下，选择合适的材质与光源进行搭配可以达到**性能与表现**的相对平衡。

## 使用
在确定使用的光源类型后，接下来就可以为场景添加光了。
1.**环境光**
选中左侧层级管理界面中的 Scene 节点，此时观察右边的属性检查界面，在**环境光栏**的**漫反射模式**中选择**颜色**，此时调整下方的**漫反射颜色**和**漫反射强度**可以分别控制**环境光的颜色和强度**。

![buildBox](https://gw.alipayobjects.com/zos/OasisHub/2fb0fd0f-6727-415f-a241-84c80b415040/buildBox.gif)

|属性|释义|
|:--|:--|
|漫反射模式|环境光请选择**颜色**|
|漫反射颜色|控制环境光的颜色|
|漫反射强度|控制环境光的强度，**值越高越亮**|

2.**平行光** 
和相机有很多共同点，平行光也是一个组件，平行光也有**方向**，并且方向也指向 **—Z** 轴。我们通常用一个独立的 Entity 去搭载平行光，首先先创建一个节点并调整好位置与旋转。

![buildBox](https://gw.alipayobjects.com/zos/OasisHub/a65624ab-8d9f-4aef-940a-a3654a78611b/buildBox.gif)

然后为这个节点增加一个平行光组件，并设置颜色和强度。

![buildBox](https://gw.alipayobjects.com/zos/OasisHub/4327de3b-194d-4f01-badb-25aca070bc6f/buildBox.gif)

|属性|释义|
|:--|:--|
|color|控制平行光的颜色|
|intensity|控制平行光的强度，**值越高越亮**|

3.**点光源**
点光源也是组件，与平行光不同的是它没有特定的方向，而是向周围所有方向发出光并随着距离衰减。

![buildBox](https://gw.alipayobjects.com/zos/OasisHub/df17ed44-ea7a-4804-aa41-5f7fc0c8c94e/buildBox.gif)

|属性|释义|
|:--|:--|
|color|控制点光源的颜色|
|intensity|控制点光源的强度，**值越高越亮**|
|distance|有效距离，**距离光源超过有效距离的地方将无法接受到点光源的光线**|