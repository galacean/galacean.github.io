---
order: 5
title: 粒子渲染器
type: 动画
label: Animation
---

Galacean Engine 的粒子渲染器 [ParticleRenderer](${api}core/ParticleRenderer) 是常用的渲染组件，具备丰富的属性，通过调节各个属性值达到绚丽多彩的粒子效果。

![avatar](https://mdn.alipayobjects.com/huamei_qbugvr/afts/img/A*CObVSaCKF_4AAAAAAAAAAAAADtKFAQ/original)

## 粒子组件

粒子组件可以通过层级树面板上方的快捷方式，或检查器面板的添加组件挂载于场景中已激活的 Entity 上。

![avatar](https://mdn.alipayobjects.com/huamei_qbugvr/afts/img/A*fD8iTZUbiI4AAAAAAAAAAAAADtKFAQ/original)

添加完毕后，可以在检查器面板查看粒子属性。视图窗口的左下角的粒子面板可以控制粒子效果的在视图窗口的播放。

![avatar](https://mdn.alipayobjects.com/huamei_qbugvr/afts/img/A*rwF_RLlHNt0AAAAAAAAAAAAADtKFAQ/original)

您也可以在脚本中挂载粒子组件。

```ts
// 创建实体
const entity = root.createChild("particleEntity");
// 创建粒子组件
let particleRenderer = particleEntity.addComponent(ParticleRenderer);
```

## 渲染材质

[ParticleMaterial](${api}core/ParticleMaterial) 是粒子的默认材质。

编辑器中通过 添加材质 - 选择粒子材质 创建。编辑完成后回到粒子观察器面板中选择该材质进行使用。

![avatar](https://mdn.alipayobjects.com/huamei_qbugvr/afts/img/A*l8WoQbbd6lMAAAAAAAAAAAAADtKFAQ/original)

或者在脚本中:

```ts
// 添加粒子材质
const material = new ParticleMaterial(engine);
particleRenderer.setMaterial(material);
```

| 属性                                                 | 释义     |
| ---------------------------------------------------- | -------- |
| [baseColor](${api}core/ParticleMaterial#baseColor)   | 基础颜色 |
| [baseTexture](${api}core/ParticleMaterial#baseColor) | 基础纹理 |

## 播放控制

选中带有粒子组件的实体时出现的粒子面板允许您控制粒子效果在视图窗口的播放。

需要注意的是，在该面板上对粒子播放的调整，仅为视图窗口的预览服务，并不改变该粒子组件的属性。如果需要改变粒子的播放相关属性，需要在观察器面板调整。

![avatar](https://mdn.alipayobjects.com/huamei_qbugvr/afts/img/A*2ZnqSqCymCUAAAAAAAAAAAAADtKFAQ/original)

| 预览播放选项    | 释义                                                               |
| --------------- | ------------------------------------------------------------------ |
| 重播（Restart） | 停止当前的粒子效果播放，并立即从头开始播放                         |
| 停止（Stop）    | 停止粒子效果的播放，并重置回初识状态                               |
| 暂停（Pause）   | 暂停选中实体及其子节点上的粒子效果                                 |
| 播放（Play）    | 开始播放选中实体及其子节点上的粒子效果                             |
| 速度（Speed）   | 调整当前播放速度                                                   |
| 预览（Preview） | 选择播放选中实体及其子节点上的粒子效果，或者播放场景中所有粒子效果 |

或者在代码中，

```ts
// 播放
particleRenderer.generator.play();
// 停止
particleRenderer.generator.stop();
// 调整播放速度
particleRenderer.generator.main.simulationSpeed = 2;
```

## 粒子生成器

`ParticleRenderer` 的 [generator](${api}core/ParticleGenerator) 属性主要负责粒子的生成和播放功能，生成粒子相关的功能由多个模块组成，分别是主模块、发射器模块、生命周期尺寸模块、生命周期颜色模块、生命周期速度模块、生命周期旋转模块、纹理表格动画模块。在编辑器粒子观察器面板可以直观看到各个模块及分选项。

### 主模块

[MainModule](${api}core/MainModule) 是 `ParticleGeneratorModule` 的主模块，包含了最基本的粒子生成参数。

![avatar](https://mdn.alipayobjects.com/huamei_qbugvr/afts/img/A*JUjgTLfiz7kAAAAAAAAAAAAADtKFAQ/original)

| 属性                                                     | 释义                                                    |
| -------------------------------------------------------- | ------------------------------------------------------- |
| [duration](${api}core/MainModule#duration)               | 粒子生成器的持续时间（单位：秒）                        |
| [isLoop](${api}core/MainModule#isLoop)                   | 指定粒子生成器是否循环                                  |
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

![avatar](https://mdn.alipayobjects.com/huamei_qbugvr/afts/img/A*G7_zS5_A3pMAAAAAAAAAAAAADtKFAQ/original)

| 属性                                                           | 释义                                                                                                            |
| -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| [rateOverTime](${api}core/EmissionModule#rateOverTime)         | 这是一个 [ParticleCompositeCurve](${api}core/ParticleCompositeCurve) 对象，表示粒子的发射速率。默认值为 `10`    |
| [rateOverDistance](${api}core/EmissionModule#rateOverDistance) | 这是一个 [ParticleCompositeCurve](${api}core/ParticleCompositeCurve) 对象，表示粒子的距离发射速率。默认值为 `0` |
| [shape](${api}core/EmissionModule#shape)                       | 这是一个 `BaseShape` 对象，表示发射器的形状                                                                     |

| 方法                                                                              | 释义                     |
| --------------------------------------------------------------------------------- | ------------------------ |
| [addBurst(burst: Burst)](${api}core/EmissionModule#addBurst)                      | 添加一个爆破行为         |
| [removeBurst(burst: Burst)](${api}core/EmissionModule#removeBurst)                | 移除一个爆破行为         |
| [removeBurstByIndex(index: number)](${api}core/EmissionModule#removeBurstByIndex) | 通过索引移除一个爆破行为 |
| [clearBurst()](${api}core/EmissionModule#clearBurst)                              | 清除所有的爆破行为       |

### 生命周期尺寸模块

[`SizeOverLifetimeModule`](${api}core/SizeOverLifetimeModule) 是 `ParticleGeneratorModule` 的子类，用于处理粒子系统的生命周期内的大小变化。

![avatar](https://mdn.alipayobjects.com/huamei_qbugvr/afts/img/A*e0FeQqj-HvAAAAAAAAAAAAAADtKFAQ/original)

| 属性                                                           | 释义                                                                                                |
| -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| [separateAxes](${api}core/SizeOverLifetimeModule#separateAxes) | 布尔值，指定每个轴的大小是否独立变化                                                                |
| [sizeX](${api}core/SizeOverLifetimeModule#sizeX)               | [ParticleCompositeCurve](${api}core/ParticleCompositeCurve) 对象，表示 x 轴方向上粒子的大小变化曲线 |
| [sizeY](${api}core/SizeOverLifetimeModule#sizeY)               | [ParticleCompositeCurve](${api}core/ParticleCompositeCurve) 对象，表示 y 轴方向上粒子的大小变化曲线 |
| [sizeZ](${api}core/SizeOverLifetimeModule#sizeZ)               | [ParticleCompositeCurve](${api}core/ParticleCompositeCurve) 对象，表示 z 轴方向上粒子的大小变化曲线 |
| [size](${api}core/SizeOverLifetimeModule#size)                 | [ParticleCompositeCurve](${api}core/ParticleCompositeCurve) 对象，获取或设置粒子的大小变化曲线      |

![avatar](https://mdn.alipayobjects.com/huamei_qbugvr/afts/img/A*70KGQpOg85oAAAAAAAAAAAAADtKFAQ/original)

### 生命周期旋转模块

[`RotationOverLifetimeModule`](${api}core/RotationOverLifetimeModule) 继承自 `ParticleGeneratorModule`，用于控制粒子系统的生命周期内的旋转变化。

![avatar](https://mdn.alipayobjects.com/huamei_qbugvr/afts/img/A*mEUfRa3o7V8AAAAAAAAAAAAADtKFAQ/original)

| 属性                                                               | 释义                                                                                                |
| ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| [separateAxes](${api}core/RotationOverLifetimeModule#separateAxes) | `boolean` 类型，表示是否在每个轴上分别进行旋转。如果禁用，将只使用 z 轴                             |
| [rotationX](${api}core/RotationOverLifetimeModule#rotationX)       | [ParticleCompositeCurve](${api}core/ParticleCompositeCurve) 对象，表示粒子在其生命周期内的 x 轴旋转 |
| [rotationY](${api}core/RotationOverLifetimeModule#rotationY)       | [ParticleCompositeCurve](${api}core/ParticleCompositeCurve) 对象，表示粒子在其生命周期内的 y 轴旋转 |
| [rotationZ](${api}core/RotationOverLifetimeModule#rotationZ)       | [ParticleCompositeCurve](${api}core/ParticleCompositeCurve) 对象，表示粒子在其生命周期内的 z 轴旋转 |

### 生命周期速度模块

[`VelocityOverLifetimeModule`](${api}core/VelocityOverLifetimeModule) 继承自 `ParticleGeneratorModule`，用于控制粒子系统的生命周期内的速度变化。

![avatar](https://mdn.alipayobjects.com/huamei_qbugvr/afts/img/A*cJWxR6XQ2VwAAAAAAAAAAAAADtKFAQ/original)

| 属性                                                         | 释义                                                                                                |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| [space](${api}core/VelocityOverLifetimeModule#velocityZ)     | 选择速度变化的空间，可以是世界空间或本地空间                                                        |
| [velocityX](${api}core/VelocityOverLifetimeModule#velocityX) | [ParticleCompositeCurve](${api}core/ParticleCompositeCurve) 对象，表示粒子在其生命周期内的 x 轴旋转 |
| [velocityY](${api}core/VelocityOverLifetimeModule#velocityY) | [ParticleCompositeCurve](${api}core/ParticleCompositeCurve) 对象，表示粒子在其生命周期内的 y 轴旋转 |
| [velocityZ](${api}core/VelocityOverLifetimeModule#velocityZ) | [ParticleCompositeCurve](${api}core/ParticleCompositeCurve) 对象，表示粒子在其生命周期内的 z 轴旋转 |

### 纹理表格动画模块

[`TextureSheetAnimationModule`](${api}core/TextureSheetAnimationModule) 继承自 `ParticleGeneratorModule`，用于控制粒子系统的纹理表动画。

![avatar](https://mdn.alipayobjects.com/huamei_qbugvr/afts/img/A*XhXmQadW8ToAAAAAAAAAAAAADtKFAQ/original)

| 属性                                                                  | 释义                                                                                             |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| [startFrame](${api}core/TextureSheetAnimationModule#startFrame)       | [ParticleCompositeCurve](${api}core/ParticleCompositeCurve) 对象，表示纹理表的起始帧             |
| [frameOverTime](${api}core/TextureSheetAnimationModule#frameOverTime) | [ParticleCompositeCurve](${api}core/ParticleCompositeCurve) 对象，表示纹理表的帧随时间变化的曲线 |
| [type](${api}core/TextureSheetAnimationModule#type)                   | `TextureSheetAnimationType` 枚举，表示纹理表动画的类型                                           |
| [cycleCount](${api}core/TextureSheetAnimationModule#cycleCount)       | `number` 类型，表示纹理表动画的周期计数                                                          |
| [tiling](${api}core/TextureSheetAnimationModule#tiling)               | `Vector2` 对象，表示纹理表的平铺。可以通过 `get` 和 `set` 方法访问和修改                         |

### 生命周期颜色模块

[`ColorOverLifetimeModule`](${api}core/ColorOverLifetimeModule) 继承自 `ParticleGeneratorModule`，用于处理粒子系统的生命周期内的颜色变化。

![avatar](https://mdn.alipayobjects.com/huamei_qbugvr/afts/img/A*8jjgTK0-EWMAAAAAAAAAAAAADtKFAQ/original)

| 属性                                              | 释义                                                                                                     |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| [color](${api}core/ColorOverLifetimeModule#color) | [ParticleCompositeGradient](${api}core/ParticleCompositeGradient) 对象，表示粒子在其生命周期内的颜色渐变 |

![avatar](https://mdn.alipayobjects.com/huamei_qbugvr/afts/img/A*BW3dQb--WXAAAAAAAAAAAAAADtKFAQ/original) ![avatar](https://mdn.alipayobjects.com/huamei_qbugvr/afts/img/A*NHL9RKwOFTIAAAAAAAAAAAAADtKFAQ/original)

## 其他参数

![avatar](https://mdn.alipayobjects.com/huamei_qbugvr/afts/img/A*MiCESpgK-LwAAAAAAAAAAAAADtKFAQ/original)

| 属性                                                       | 释义                                                             |
| ---------------------------------------------------------- | ---------------------------------------------------------------- |
| [velocityScale](${api}core/ParticleRenderer#velocityScale) | 指定粒子根据其速度伸展的程度                                     |
| [lengthScale](${api}core/ParticleRenderer#lengthScale)     | 定义粒子在其运动方向上伸展的程度，定义为粒子的长度与其宽度的比例 |
| [pivot](${api}core/ParticleRenderer#pivot)                 | 粒子的枢轴                                                       |
| [renderMode](${api}core/ParticleRenderer#renderMode)       | 粒子的渲染模式                                                   |
| [mesh](${api}core/ParticleRenderer#mesh)                   | 粒子的网格，当 `renderMode` 为 `Mesh` 时有效                     |
