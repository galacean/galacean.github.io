# 控制器

## 轨道控制器
[OrbitControl]({{book.api}}classes/controls.orbitcontrol.html) 用来模拟轨道交互，适用于围绕一个目标对象进行 360旋转交互：

```typescript
import { Camera } from 'oasis-engine';
import { OrbitControl } from '@oasis-engine/controls';

// 在场景中创建相机节点、配置位置和目标方向
const cameraEntity = rootEntity.createChild('camera');
let camera = cameraEntity.addComponent(Camera)

let controler = cameraEntity.addComponent(OrbitControl);
controler.autoRotate = true;
controler.autoRotateSpeed = 10.0;
controler.minDistance = 4;
controler.maxDistance = 50;
```

## 自由控制器

[FreeControl]({{book.api}}classes/controls.freecontrol.html) 一般用于漫游控制，常见于游戏场景：

```typescript
import { Camera } from 'oasis-engine';
import { FreeControl } from '@oasis-engine/controls';

// 在场景中创建相机节点、配置位置和目标方向
const cameraEntity = rootEntity.createChild('camera');
let camera = cameraEntity.addComponent(Camera)

let controler = cameraEntity.createAbility(FreeControl);
controler.movementSpeed = 100;
controler.rotateSpeed = 1;
controler.jumpY = 50;
```






