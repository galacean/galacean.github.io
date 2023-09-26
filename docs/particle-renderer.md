---
order: 5
title: Particle Renderer
type: Animation
label: Animation

---

The particle renderer ParticleRenderer of Galacean Engine is a commonly used rendering component with rich properties. It allows for the creation of vibrant and colorful particle effects by adjusting various property values.

Flame Effect:

<playground src="particle-fire.ts"></playground>

Ambient Effect:

<playground src="particle-dream.ts"></playground>

## Code Example

```typescript
let particleRenderer = particleEntity.addComponent(ParticleRenderer);

//Set Material
const material = new ParticleMaterial(particleEntity.engine);
material.blendMode = BlendMode.Additive;
material.baseTexture = texture;
particleRenderer.setMaterial(material);

const generator = particleRenderer.generator;

//Config main params
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

## Particle generator

The [generator](${api}core/ParticleGenerator) property of ParticleRenderer is mainly responsible for the generation and playback functions of particles. The functions related to generating particles are composed of multiple modules, namely the main module, the emitter module, and the life cycle size. Module, life cycle color module, life cycle speed module, life cycle rotation module, texture table animation module.

### Main module

[`MainModule`](${api}core/MainModule) is the main module of `ParticleGeneratorModule`, which contains the most basic particle generation parameters.

#### Properties

| Property | Definition                                               |
| --------------------------------------------------------------- | -------------------------------------------------------- |
| [duration](${api}core/MainModule#duration)                       | Duration of the particle emitter in seconds              |
| [isLoop](${api}core/MainModule#isLoop)                           | Specifies whether the particle emitter loops             |
| [startDelay](${api}core/MainModule#startDelay)                   | Delay before particles are emitted in seconds            |
| [startLifetime](${api}core/MainModule#startLifetime)             | Initial lifetime of particles when emitted               |
| [startSpeed](${api}core/MainModule#startSpeed)                   | Initial speed of particles when first emitted            |
| [startSize3D](${api}core/MainModule#startSize3D)                 | Specifies whether particle size is specified per axis    |
| [startSize](${api}core/MainModule#startSize)                     | Initial size of particles when first emitted             |
| [startSizeX](${api}core/MainModule#startSizeX)                   | Initial size of particles along the x-axis               |
| [startSizeY](${api}core/MainModule#startSizeY)                   | Initial size of particles along the y-axis               |
| [startSizeZ](${api}core/MainModule#startSizeZ)                   | Initial size of particles along the z-axis               |
| [startRotation3D](${api}core/MainModule#startRotation3D)         | Enables 3D rotation of particles                         |
| [startRotation](${api}core/MainModule#startRotation)             | Initial rotation of particles when first emitted         |
| [startRotationX](${api}core/MainModule#startRotationX)           | Initial rotation of particles along the x-axis            |
| [startRotationY](${api}core/MainModule#startRotationY)           | Initial rotation of particles along the y-axis            |
| [startRotationZ](${api}core/MainModule#startRotationZ)           | Initial rotation of particles along the z-axis            |
| [flipRotation](${api}core/MainModule#flipRotation)               | Causes some particles to rotate in the opposite direction |
| [startColor](${api}core/MainModule#startColor)                   | Initial color mode of particles                          |
| [gravityModifier](${api}core/MainModule#gravityModifier)         | Proportional gravity applied to particles defined by Physics.gravity |
| [simulationSpace](${api}core/MainModule#simulationSpace)         | Space in which particles are simulated, either World or Local |
| [simulationSpeed](${api}core/MainModule#simulationSpeed)         | Overrides the default playback speed of the particle emitter |
| [scalingMode](${api}core/MainModule#scalingMode)                 | Controls how the particle emitter applies its Transform component to emitted particles |
| [playOnEnabled](${api}core/MainModule#playOnEnabled)             | If set to true, the particle emitter automatically starts playing on startup |
| [maxParticles](${api}core/MainModule#maxParticles)               | Maximum number of particles                               |

### Launch module module

[`EmissionModule`](${api}core/EmissionModule) is the emission module of `ParticleGeneratorModule`. This module is used to process the emission behavior of particle systems, including particle emission rate, emission shape, and burst behavior.

| Property                                                       | Definition                                                       |
| --------------------------------------------------------------- | ---------------------------------------------------------------- |
| [rateOverTime](${api}core/EmissionModule#rateOverTime)           | This is a [ParticleCompositeCurve](${api}core/ParticleCompositeCurve) object that represents the emission rate of particles over time. The default value is `10`. |
| [rateOverDistance](${api}core/EmissionModule#rateOverDistance)   | This is a [ParticleCompositeCurve](${api}core/ParticleCompositeCurve) object that represents the emission rate of particles over distance. The default value is `0`. |
| [shape](${api}core/EmissionModule#shape)                         | This is a `BaseShape` object that represents the shape of the emitter. |

| Method                                                          | Definition                                                      |
| --------------------------------------------------------------- | --------------------------------------------------------------- |
| [addBurst(burst: Burst)](${api}core/EmissionModule#addBurst)     | Adds a burst behavior.                                          |
| [removeBurst(burst: Burst)](${api}core/EmissionModule#removeBurst) | Removes a burst behavior.                                       |
| [removeBurstByIndex(index: number)](${api}core/EmissionModule#removeBurstByIndex) | Removes a burst behavior by index.                              |
| [clearBurst()](${api}core/EmissionModule#clearBurst)             | Clears all burst behaviors.                                     |

### Life cycle size module

[`SizeOverLifetimeModule`](${api}core/SizeOverLifetimeModule) is a subclass of `ParticleGeneratorModule`, used to handle size changes during the life cycle of the particle system.

#### Properties

| Property                                                    |  Definition                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [separateAxes](${api}core/SizeOverLifetimeModule#separateAxes) | A boolean value that specifies whether the size changes independently for each axis. |
| [sizeX](${api}core/SizeOverLifetimeModule#sizeX)             | A [ParticleCompositeCurve](${api}core/ParticleCompositeCurve) object that represents the size variation curve of particles along the x-axis. |
| [sizeY](${api}core/SizeOverLifetimeModule#sizeY)             | A [ParticleCompositeCurve](${api}core/ParticleCompositeCurve) object that represents the size variation curve of particles along the y-axis. |
| [sizeZ](${api}core/SizeOverLifetimeModule#sizeZ)             | A [ParticleCompositeCurve](${api}core/ParticleCompositeCurve) object that represents the size variation curve of particles along the z-axis. |
| [size](${api}core/SizeOverLifetimeModule#size)               | A [ParticleCompositeCurve](${api}core/ParticleCompositeCurve) object that retrieves or sets the size variation curve of particles. |

### Life cycle color module

[`ColorOverLifetimeModule`](${api}core/ColorOverLifetimeModule) inherited from `ParticleGeneratorModule`, used to handle color changes during the life cycle of the particle system.

| Property                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [color](${api}core/ColorOverLifetimeModule#color)             | A [ParticleCompositeGradient](${api}core/ParticleCompositeGradient) object that represents the color gradient of particles during their lifetime. |

### Life cycle rotation module

[`RotationOverLifetimeModule`](${api}core/RotationOverLifetimeModule) Inherits from `ParticleGeneratorModule` and is used to control rotation changes during the life cycle of the particle system.

| Property                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [separateAxes](${api}core/RotationOverLifetimeModule#separateAxes) | A boolean value that indicates whether the rotation is separate for each axis. If disabled, only the z-axis will be used. |
| [rotationX](${api}core/RotationOverLifetimeModule#rotationX) | A [ParticleCompositeCurve](${api}core/ParticleCompositeCurve) object that represents the rotation variation along the x-axis during the lifetime of particles. |
| [rotationY](${api}core/RotationOverLifetimeModule#rotationY) | A [ParticleCompositeCurve](${api}core/ParticleCompositeCurve) object that represents the rotation variation along the y-axis during the lifetime of particles. |
| [rotationZ](${api}core/RotationOverLifetimeModule#rotationZ) | A [ParticleCompositeCurve](${api}core/ParticleCompositeCurve) object that represents the rotation variation along the z-axis during the lifetime of particles. |

### Texture table animation module

[`TextureSheetAnimationModule`](${api}core/TextureSheetAnimationModule) Inherits from `ParticleGeneratorModule` and is used to control the texture sheet animation of the particle system.

| Property                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [startFrame](${api}core/TextureSheetAnimationModule#startFrame) | A [ParticleCompositeCurve](${api}core/ParticleCompositeCurve) object that represents the starting frame of the texture sheet animation. |
| [frameOverTime](${api}core/TextureSheetAnimationModule#frameOverTime) | A [ParticleCompositeCurve](${api}core/ParticleCompositeCurve) object that represents the curve of frame changes over time in the texture sheet animation. |
| [type](${api}core/TextureSheetAnimationModule#type)           | A `TextureSheetAnimationType` enumeration that represents the type of texture sheet animation. |
| [cycleCount](${api}core/TextureSheetAnimationModule#cycleCount) | A `number` value that represents the cycle count of the texture sheet animation. |
| [tiling](${api}core/TextureSheetAnimationModule#tiling)       | A `Vector2` object that represents the tiling of the texture sheet. It can be accessed and modified using the `get` and `set` methods. |

## Other parameters

| Property                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [velocityScale](${api}core/ParticleRenderer#velocityScale)   | Specifies how much the particles stretch based on their velocity. |
| [lengthScale](${api}core/ParticleRenderer#lengthScale)       | Defines the extent to which particles stretch along their motion direction, defined as the ratio of particle length to width. |
| [pivot](${api}core/ParticleRenderer#pivot)                   | The pivot point of the particles.                            |
| [renderMode](${api}core/ParticleRenderer#renderMode)         | The rendering mode of the particles.                         |
| [mesh](${api}core/ParticleRenderer#mesh)                     | The mesh used for particles. Only valid when `renderMode` is set to `Mesh`. |

## Rendering material

[ParticleMaterial](${api}core/ParticleMaterial) is the default material of particles and contains some basic common material properties of particles.

| Property                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [baseColor](${api}core/ParticleMaterial#baseColor)           | The base color of the particles.                             |
| [baseTexture](${api}core/ParticleMaterial#baseColor)         | The base texture of the particles.                           |