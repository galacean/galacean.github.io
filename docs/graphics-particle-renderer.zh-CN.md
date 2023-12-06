---
order: 5
title: 粒子渲染器
type: 图形
label: Graphics

---

Galacean Engine 的粒子渲染器 [ParticleRenderer](${api}core/ParticleRenderer) 是常用的渲染组件，具备丰富的属性，通过调节各个属性值达到绚丽多彩的粒子效果。

火焰效果：

<playground src="particle-fire.ts"></playground>

氛围效果：

<playground src="particle-dream.ts"></playground>

## 代码示例

```typescript
let particleRenderer = particleEntity.addComponent(ParticleRenderer);

// Set Material
const material = new ParticleMaterial(particleEntity.engine);
material.blendMode = BlendMode.Additive;
material.baseTexture = texture;
particleRenderer.setMaterial(material);

const generator = particleRenderer.generator;

// Config main params
const main = generator.main;
.......

// Config emission params
const emission = generator.emission;
.......

// Config sizeOverLifetime params
const sizeOverLifetime = generator.sizeOverLifetime;
.......

// Config colorOverLifetime params
const colorOverLifetime = generator.colorOverLifetime;
.......

// Config velocityOverLifetime params
const velocityOverLifetime = generator.velocityOverLifetime;
.......

// Config rotationOverLifetime params
const rotationOverLifetime = generator.rotationOverLifetime;
.......

// Play 
generator.play();

// Stop
generator.stop();
```

## 粒子生成器

`ParticleRenderer` 的 [generator](${api}core/ParticleGenerator) 属性主要负责粒子的生成和播放功能，生成粒子相关的功能由多个模块组成，分别是主模块、发射器模块、生命周期尺寸模块、生命周期颜色模块、生命周期速度模块、生命周期旋转模块、纹理表格动画模块。

### 主模块

[MainModule](${api}core/MainModule) 是 `ParticleGeneratorModule` 的主模块，包含了最基本的粒子生成参数。

| 属性                                                       | 释义                                                    |
| ---------------------------------------------------------- | ------------------------------------------------------- |
| [duration](${api}core/MainModule#duration)                 | 粒子生成器的持续时间（单位：秒）                        |
| [isLoop](${api}core/MainModule#isLoop)                     | 指定粒子生成器是否循环                                  |
| [startDelay](${api}core/MainModule#startDelay)           | 粒子发射的开始延迟（单位：秒）                          |
| [startLifetime](${api}core/MainModule#startLifetime)     | 粒子发射时的初始生命周期                                |
| [startSpeed](${api}core/MainModule#startSpeed)           | 粒子生成器首次生成粒子时的初始速度                      |
| [startSize3D](${api}core/MainModule#startSize3D)         | 是否以每个轴的粒子大小分别指定                          |
| [startSize](${api}core/MainModule#startSize)             | 粒子生成器首次生成粒子时的初始大小                      |
| [startSizeX](${api}core/MainModule#startSizeX)           | 粒子生成器首次生成粒子时沿 x 轴的初始大小               |
| [startSizeY](${api}core/MainModule#startSizeY)           | 粒子生成器首次生成粒子时沿 y 轴的初始大小               |
| [startSizeZ](${api}core/MainModule#startSizeZ)           | 粒子生成器首次生成粒子时沿 z 轴的初始大小               |
| [startRotation3D](${api}core/MainModule#startRotation3D) | 是否启用 3D 粒子旋转                                    |
| [startRotation](${api}core/MainModule#startRotation)     | 粒子生成器首次生成粒子时的初始旋转                      |
| [startRotationX](${api}core/MainModule#startRotationX)   | 粒子发射时沿 x 轴的初始旋转                             |
| [startRotationY](${api}core/MainModule#startRotationY)   | 粒子发射时沿 y 轴的初始旋转                             |
| [startRotationZ](${api}core/MainModule#startRotationZ)   | 粒子发射时沿 z 轴的初始旋转                             |
| [flipRotation](${api}core/MainModule#flipRotation)       | 使部分粒子以相反方向旋转                                |
| [startColor](${api}core/MainModule#startColor)           | 粒子的初始颜色模式                                      |
| [gravityModifier](${api}core/MainModule#gravityModifier) | 此粒子生成器应用于由 Physics.gravity 定义的重力的比例   |
| [simulationSpace](${api}core/MainModule#simulationSpace) | 选择模拟粒子的空间，它可以是世界空间或本地空间          |
| [simulationSpeed](${api}core/MainModule#simulationSpeed) | 覆盖粒子生成器的默认播放速度                            |
| [scalingMode](${api}core/MainModule#scalingMode)         | 控制粒子生成器如何将其 Transform 组件应用到它发射的粒子 |
| [playOnEnabled](${api}core/MainModule#playOnEnabled)     | 如果设置为 true，粒子生成器将在启动时自动开始播放       |
| [maxParticles](${api}core/MainModule#maxParticles)       | 最大粒子数                                              |

### 发射模块模块

[EmissionModule](${api}core/EmissionModule) 是 `ParticleGeneratorModule` 的发射模块。该模块用于处理粒子系统的发射行为，包括粒子发射速率、发射形状以及爆破（burst）行为等。

| 属性                                                         | 释义                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [rateOverTime](${api}core/EmissionModule#rateOverTime)       | 这是一个 [ParticleCompositeCurve](${api}core/ParticleCompositeCurve) 对象，表示粒子的发射速率。默认值为 `10` |
| [rateOverDistance](${api}core/EmissionModule#rateOverDistance) | 这是一个 [ParticleCompositeCurve](${api}core/ParticleCompositeCurve) 对象，表示粒子的距离发射速率。默认值为 `0` |
| [shape](${api}core/EmissionModule#shape)                     | 这是一个 `BaseShape` 对象，表示发射器的形状                  |

| 方法                                                         | 释义                     |
| ------------------------------------------------------------ | ------------------------ |
| [addBurst(burst: Burst)](${api}core/EmissionModule#addBurst) | 添加一个爆破行为         |
| [removeBurst(burst: Burst)](${api}core/EmissionModule#removeBurst) | 移除一个爆破行为         |
| [removeBurstByIndex(index: number)](${api}core/EmissionModule#removeBurstByIndex) | 通过索引移除一个爆破行为 |
| [clearBurst()](${api}core/EmissionModule#clearBurst)         | 清除所有的爆破行为       |

### 生命周期尺寸模块

[`SizeOverLifetimeModule`](${api}core/SizeOverLifetimeModule) 是 `ParticleGeneratorModule` 的子类，用于处理粒子系统的生命周期内的大小变化。

| 属性                                                         | 释义                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [separateAxes](${api}core/SizeOverLifetimeModule#separateAxes) | 布尔值，指定每个轴的大小是否独立变化                         |
| [sizeX](${api}core/SizeOverLifetimeModule#sizeX)             | [ParticleCompositeCurve](${api}core/ParticleCompositeCurve) 对象，表示 x 轴方向上粒子的大小变化曲线 |
| [sizeY](${api}core/SizeOverLifetimeModule#sizeY)             | [ParticleCompositeCurve](${api}core/ParticleCompositeCurve) 对象，表示 y 轴方向上粒子的大小变化曲线 |
| [sizeZ](${api}core/SizeOverLifetimeModule#sizeZ)             | [ParticleCompositeCurve](${api}core/ParticleCompositeCurve) 对象，表示 z 轴方向上粒子的大小变化曲线 |
| [size](${api}core/SizeOverLifetimeModule#size)               | [ParticleCompositeCurve](${api}core/ParticleCompositeCurve) 对象，获取或设置粒子的大小变化曲线  |

### 生命周期颜色模块

[`ColorOverLifetimeModule`](${api}core/ColorOverLifetimeModule) 继承自 `ParticleGeneratorModule`，用于处理粒子系统的生命周期内的颜色变化。

| 属性                                              | 释义                                                         |
| ------------------------------------------------- | ------------------------------------------------------------ |
| [color](${api}core/ColorOverLifetimeModule#color) | [ParticleCompositeGradient](${api}core/ParticleCompositeGradient) 对象，表示粒子在其生命周期内的颜色渐变 |

### 生命周期旋转模块

[`RotationOverLifetimeModule`](${api}core/RotationOverLifetimeModule) 继承自 `ParticleGeneratorModule`，用于控制粒子系统的生命周期内的旋转变化。

| 属性                                                         | 释义                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [separateAxes](${api}core/RotationOverLifetimeModule#separateAxes) | `boolean` 类型，表示是否在每个轴上分别进行旋转。如果禁用，将只使用 z 轴 |
| [rotationX](${api}core/RotationOverLifetimeModule#rotationX) | [ParticleCompositeCurve](${api}core/ParticleCompositeCurve) 对象，表示粒子在其生命周期内的 x 轴旋转 |
| [rotationY](${api}core/RotationOverLifetimeModule#rotationY) | [ParticleCompositeCurve](${api}core/ParticleCompositeCurve) 对象，表示粒子在其生命周期内的 y 轴旋转 |
| [rotationZ](${api}core/RotationOverLifetimeModule#rotationZ) | [ParticleCompositeCurve](${api}core/ParticleCompositeCurve) 对象，表示粒子在其生命周期内的 z 轴旋转 |

### 纹理表格动画模块

[`TextureSheetAnimationModule`](${api}core/TextureSheetAnimationModule) 继承自 `ParticleGeneratorModule`，用于控制粒子系统的纹理表动画。

| 属性                                                         | 释义                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [startFrame](${api}core/TextureSheetAnimationModule#startFrame) | [ParticleCompositeCurve](${api}core/ParticleCompositeCurve) 对象，表示纹理表的起始帧            |
| [frameOverTime](${api}core/TextureSheetAnimationModule#frameOverTime) | [ParticleCompositeCurve](${api}core/ParticleCompositeCurve) 对象，表示纹理表的帧随时间变化的曲线 |
| [type](${api}core/TextureSheetAnimationModule#type)          | `TextureSheetAnimationType` 枚举，表示纹理表动画的类型       |
| [cycleCount](${api}core/TextureSheetAnimationModule#cycleCount) | `number` 类型，表示纹理表动画的周期计数                      |
| [tiling](${api}core/TextureSheetAnimationModule#tiling)      | `Vector2` 对象，表示纹理表的平铺。可以通过 `get` 和 `set` 方法访问和修改 |

## 其他参数

| 属性                                                       | 释义                                                         |
| ---------------------------------------------------------- | ------------------------------------------------------------ |
| [velocityScale](${api}core/ParticleRenderer#velocityScale) | 指定粒子根据其速度伸展的程度                                 |
| [lengthScale](${api}core/ParticleRenderer#lengthScale)     | 定义粒子在其运动方向上伸展的程度，定义为粒子的长度与其宽度的比例 |
| [pivot](${api}core/ParticleRenderer#pivot)                 | 粒子的枢轴                                                   |
| [renderMode](${api}core/ParticleRenderer#renderMode)       | 粒子的渲染模式                                               |
| [mesh](${api}core/ParticleRenderer#mesh)                   | 粒子的网格，当 `renderMode` 为 `Mesh` 时有效                 |

## 渲染材质

[ParticleMaterial](${api}core/ParticleMaterial) 是粒子的默认材质，包含了一些粒子基本的常用材质属性。

| 属性                                                 | 释义     |
| ---------------------------------------------------- | -------- |
| [baseColor](${api}core/ParticleMaterial#baseColor)   | 基础颜色 |
| [baseTexture](${api}core/ParticleMaterial#baseColor) | 基础纹理 |
