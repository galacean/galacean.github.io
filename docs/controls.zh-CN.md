---
order: 1
title: 控制器
type: 二方库
---

## 轨道控制器
[OrbitControl](${api}controls/OrbitControl) 用来模拟轨道交互，适用于围绕一个目标对象进行 360旋转交互：

<playground src="gltf.ts"></playground>

```typescript
import { Camera } from 'oasis-engine';
import { OrbitControl } from '@oasis-engine/controls';

// 在场景中创建相机节点、配置位置和目标方向
const cameraEntity = rootEntity.createChild('camera');
let camera = cameraEntity.addComponent(Camera)

let controler = cameraEntity.addComponent(OrbitControl);
controler.autoRotate = true;
controler.autoRotateSpeed = Math.PI / 5;
controler.minDistance = 4;
controler.maxDistance = 50;
```


## 自由控制器

[FreeControl](${api}controls/FreeControl) 一般用于漫游控制，常见于游戏场景：

<playground src="controls-free.ts"></playground>

```typescript
import { Camera } from 'oasis-engine';
import { FreeControl } from '@oasis-engine/controls';

// 在场景中创建相机节点、配置位置和目标方向
const cameraEntity = rootEntity.createChild('camera');
let camera = cameraEntity.addComponent(Camera)

let controler = cameraEntity.createAbility(FreeControl);
controler.movementSpeed = 100;
controler.rotateSpeed = 1;
```




