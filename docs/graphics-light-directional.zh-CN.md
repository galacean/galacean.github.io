---
order: 2
title: 方向光
type: 光照
label: Light
---

**方向光**表示的是光线从以某个方向均匀射出，光线之间是平行的，太阳照射在地球表面的光可以认为是方向光，因为太阳和地球距离的远大于地球半径，所以照射在地球的阳光可以看作是来自同一个方向的一组平行光，即方向光。

<img src="https://gw.alipayobjects.com/zos/OasisHub/93d8b5ba-6c3d-498d-a343-ec976ba39978/image-20231009113534494.png" alt="image-20231009113534494" style="zoom:50%;" />

方向光有 3 个主要个特性：_颜色_（[color](${api}core/DirectLight#color)）、_强度_（[intensity](${api}core/DirectLight#intensity)）、_方向_（[direction](${api}core/DirectLight#direction)）。_方向_ 则由方向光所在的节点的朝向表示。

| 属性      | 作用                             |
| :-------- | :------------------------------- |
| Intensity | 控制平行光的强度，**值越高越亮** |
| Color     | 控制平行光的颜色，默认白色       |

## 编辑器使用

<img src="https://gw.alipayobjects.com/zos/OasisHub/b554d6f8-c9a4-48a9-9dd3-475dbf63ae55/image-20231009113622354.png" alt="image-20231009113622354" style="zoom:50%;" />

## 脚本使用

```typescript
const lightEntity = rootEntity.createChild("light");
const directLight = lightEntity.addComponent(DirectLight);

// 调整颜色
directLight.color.set(0.3, 0.3, 1, 1);

// 调整强度
directLight.intensity = 2;

// 调整方向
lightEntity.transform.setRotation(-45, -45, 0);
```
