---
order: 5
title: 粒子动画
type: 动画
label: Animation
---

Galacean Engine 的粒子渲染器 [ParticleRenderer](${api}core/ParticleRenderer) 是常用的渲染组件，具备丰富的属性，通过调节各个属性值达到绚丽多彩的粒子效果。

<playground src="particle-renderer.ts"></playground>
## 代码示例

```typescript
let particles: ParticleRenderer = particleEntity.addComponent(ParticleRenderer);

particles.maxCount = 100;
particles.velocity = new Vector3(1, 1, 1);
particles.acceleration = new Vector3(-1, -1, -1);
particles.accelerationRandomness = new Vector3(-3, -3, -3);
particles.velocityRandomness = new Vector3(-1, -1, -1);
particles.rotateVelocity = 1;
particles.rotateVelocityRandomness = 1;
particles.size = 1;
particles.is2d = true;

// Start play
particleComp.start();

// Stop
particleComp.stop();
```

## 属性

粒子渲染器包含生命周期、材质、变换等属性。

### 基础属性 
- [maxCount](${api}core/ParticleRenderer#maxCount)：最大粒子数，决定所占内存的大小，需要合理分配。

### 生命周期
- [lifetime](${api}core/ParticleRenderer#lifetime)：粒子的生命周期，单位秒。
- [startTimeRandomness](${api}core/ParticleRenderer#startTimeRandomness)：开始时间随机因子。
- [isOnce](${api}core/ParticleRenderer#isOnce) ：是否只发射一次，默认 `false` （循环发射）。
- [playOnEnable](${api}core/ParticleRenderer#playOnEnable) ：是否自动播放，默认`true`。

### 材质
- [texture](${api}core/ParticleRenderer#texture) ： 粒子形状贴图。
- [color](${api}core/ParticleRenderer#color)：粒子颜色。
- [colorRandomness](${api}core/ParticleRenderer#colorRandomness)：颜色随机因子，取值在 `0~1` 之间，颜色的 R、G、B通道的色值会分别在随机因子范围内取一个随机值。
- [isUseOriginColor](${api}core/ParticleRenderer#isUseOriginColor) ：是否使用图片原色，为 `true` (默认) 时使用图片原色，为 `false`  时，图片原色混合用户配置的颜色。
- [spriteSheet](${api}core/ParticleRenderer#spriteSheet)：精灵图表，每个粒子可以渲染精灵图中某块区域：

<playground src="particle-sprite-sheet.ts"></playground>

- [alpha](${api}core/ParticleRenderer#alpha)：透明度。
- [alphaRandomness](${api}core/ParticleRenderer#alphaRandomness)：透明度随机因子。
- [isFadeIn](${api}core/ParticleRenderer#isFadeIn) ：是否添加淡入效果。
- [isFadeOut](${api}core/ParticleRenderer#isFadeOut) ：是否添加淡出效果。
- [blendMode](${api}core/ParticleRenderer#blendMode)：混合模式，目前支持 [Transparent](${api}core/ParticleRendererBlendMode#Transparent) 和 [Additive](${api}core/ParticleRendererBlendMode#Additive) 模式，默认`Transparent`。

### 变换
- [position](${api}core/ParticleRenderer#position) ：初始位置。
- [positionRandomness](${api}core/ParticleRenderer#positionRandomness)：位置随机因子。
- [velocity](${api}core/ParticleRenderer#velocity) ：移动速度。
- [velocityRandomness](${api}core/ParticleRenderer#velocityRandomness)：移动速度随机因子。
- [acceleration`](${api}core/ParticleRenderer#acceleration)：加速度。
- [accelerationRandomness](${api}core/ParticleRenderer#accelerationRandomness)：加速度随机因子。
- [angle](${api}core/ParticleRenderer#angle): 初始旋转角度。
- [angleRandomness](${api}core/ParticleRenderer#angleRandomness): 初始旋转角度随机因子，取值在 `0~1` 之间，例如：若随机因子为 1，则生成的角度在 `-PI~PI` 之间随机。
- [rotateVelocity](${api}core/ParticleRenderer#rotateVelocity): 旋转速度。
- [rotateVelocityRandomness](${api}core/ParticleRenderer#rotateVelocityRandomness): 旋转速度随机因子。
- [isRotateToVelocity](${api}core/ParticleRenderer#isRotateToVelocity)：是否跟随粒子运动速度的方向，默认 `false`，为 `true`  时，将粒子贴图的单位向量旋转至粒子运动速度的方向，例如烟花。为 `false` 时，无旋转，适用于方向一致的场景，例如孔明灯。
- [is2d](${api}core/ParticleRenderer#is2d)：是否是 2D 粒子，默认 `true`。
- [size](${api}core/ParticleRenderer#size)：粒子大小。
- [sizeRandomness](${api}core/ParticleRenderer#sizeRandomness)：粒子大小随机因子。
- [scale](${api}core/ParticleRenderer#scale)：粒子缩放。
- [isScaleByLifetime](${api}core/ParticleRenderer#isScaleByLifetime)：是否随生命周期缩小至消失。为 `true` 时粒子会越来越小。

  ## 方法
- [start()](${api}core/ParticleRenderer#start)：开始播放。
- [stop()](${api}core/ParticleRenderer#stop)：停止播放。