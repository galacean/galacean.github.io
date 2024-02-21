---
order: 3
title: 点光源
type: 光照
label: Light
---

**点光源**存在于空间中的一点，由该点向四面八方发射光线，比如生活中的灯泡就是点光源。

<img src="https://gw.alipayobjects.com/zos/OasisHub/f0d42119-4ebf-4214-a9c1-154e6c00be65/image-20231009113806918.png" alt="image-20231009113806918" style="zoom:50%;" />

点光源有 3 个主要特性：_颜色_（[color](${api}core/PointLight#color)）、_强度_（[intensity](${api}core/PointLight#intensity)）、_有效距离_（[distance](${api}core/PointLight#distance)））。超过有效距离的地方将无法接受到点光源的光线，并且离光源越远光照强度也会逐渐降低。

| 属性      | 作用                             |
| :-------- | :------------------------------- |
| Intensity | 控制点光源的强度，**值越高越亮** |
| Color     | 控制点光源的颜色，默认白色       |
| Distance  | 有效距离，光照强度随距离衰减     |

### 编辑器使用

<img src="https://gw.alipayobjects.com/zos/OasisHub/5d8e7211-aff1-4911-85ac-844915976ef0/image-20231009113830843.png" alt="image-20231009113830843" style="zoom:50%;" />

### 脚本使用

```typescript
const lightEntity = rootEntity.createChild("light");
const pointLight = lightEntity.addComponent(PointLight);

// 调整距离
pointLight.distance = 100;
// 调整颜色
pointLight.color.set(0.3, 0.3, 1, 1);
// 调整点光源位置
lightEntity.transform.setPosition(-10, 10, 10);
```
