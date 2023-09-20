---
order: 5
title: Particle Renderer
type: Animation
label: Animation

---

Galacean Engine's particle renderer [ParticleRenderer](${api}core/ParticleRenderer) is a commonly used rendering component with rich properties. Colorful particle effects can be achieved by adjusting each property value.

<playground src="particle-fire.ts"></playground>

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
const generator = particleRenderer.generator;
const emission = generator.emission;
.......

// Config sizeOverLifetime params
const generator = particleRenderer.generator;
const sizeOverLifetime = generator.sizeOverLifetime;
.......

// Config colorOverLifetime params
const generator = particleRenderer.generator;
const colorOverLifetime = generator.colorOverLifetime;
.......

// Config velocityOverLifetime params
const generator = particleRenderer.generator;
const velocityOverLifetime = generator.velocityOverLifetime;
.......

// Config rotationOverLifetime params
const generator = particleRenderer.generator;
const rotationOverLifetime = generator.rotationOverLifetime;
.......

// Play
generator.play();

// Stop
generator.stop();
```

## Particle generator

The [generator](<](${api}core/ParticleGenerator)>) property of ParticleRenderer is mainly responsible for the generation and playback functions of particles. The functions related to generating particles are composed of multiple modules, namely the main module, the emitter module, and the life cycle size. Module, life cycle color module, life cycle speed module, life cycle rotation module, texture table animation module.

### Main module

[`MainModule`](${api}core/MainModule) is the main module of `ParticleGeneratorModule`, which contains the most basic particle generation parameters.

#### Properties

- [`duration`](${api}core/MainModule#duration): The duration of the particle generator (unit: seconds).

- [`isLoop`](${api}core/MainModule#isLoop): Specifies whether the particle generator loops.

- [`startDelay`](#${api}core/MainModule#startDelay): The start delay of particle emission (unit: seconds).

- [`startLifetime`](#${api}core/MainModule#startLifetime): The initial life cycle when particles are emitted.

- [`startSpeed`](#${api}core/MainModule#startSpeed): The initial speed when the particle generator first generates particles.

- [`startSize3D`](#${api}core/MainModule#startSize3D): Whether to specify the particle size of each axis separately.

- [`startSize`](#${api}core/MainModule#startSize): The initial size of the particle generator when it first generates particles.

- [`startSizeX`](#${api}core/MainModule#startSizeX): The initial size along the x-axis when the particle generator first generates particles.

- [`startSizeY`](#${api}core/MainModule#startSizeY): The initial size along the y-axis when the particle generator first generates particles.

- [`startSizeZ`](#${api}core/MainModule#startSizeZ): The initial size along the z-axis when the particle generator first generates particles.

- [`startRotation3D`](#${api}core/MainModule#startRotation3D): Whether to enable 3D particle rotation.

- [`startRotation`](#${api}core/MainModule#startRotation): The initial rotation when the particle generator first generates particles.

- [`startRotationX`](#${api}core/MainModule#startRotationX): The initial rotation along the x-axis when the particle is emitted.

- [`startRotationY`](#${api}core/MainModule#startRotationY): The initial rotation along the y-axis when the particle is emitted.

- [`startRotationZ`](#${api}core/MainModule#startRotationZ): The initial rotation along the z-axis when the particle is emitted.

- [`flipRotation`](#${api}core/MainModule#flipRotation): Make some particles rotate in the opposite direction.

- [`startColor`](#${api}core/MainModule#startColor): The initial color mode of particles.

- [`gravityModifier`](#${api}core/MainModule#gravityModifier): This particle generator applies the scale of gravity defined by Physics.gravity.

- [`simulationSpace`](#${api}core/MainModule#simulationSpace): Select the space to simulate particles, which can be world space or local space.

- [`simulationSpeed`](#${api}core/MainModule#simulationSpeed): Overrides the default playback speed of the particle generator.

- [`scalingMode`](#${api}core/MainModule#scalingMode): Controls how the particle generator applies its Transform component to the particles it emits.

- [`playOnEnabled`](#${api}core/MainModule#playOnEnabled): If set to true, the particle generator will automatically start playing on startup.

- [`maxParticles`](#${api}core/MainModule#maxParticles): Maximum number of particles.

### Launch module module

[`EmissionModule`](${api}core/EmissionModule) is the emission module of `ParticleGeneratorModule`. This module is used to process the emission behavior of particle systems, including particle emission rate, emission shape, and burst behavior.

#### Properties

- [rateOverTime](${api}core/EmissionModule#rateOverTime): This is a `ParticleCompositeCurve` object representing the emission rate of particles. The default value is `10`.
- [rateOverDistance](${api}core/EmissionModule#rateOverDistance): This is a `ParticleCompositeCurve` object that represents the distance emission rate of particles. The default value is `0`.
- [shape](${api}core/EmissionModule#shape): This is a `BaseShape` object that represents the shape of the emitter.

#### method

- [addBurst(burst: Burst)](${api}core/EmissionModule#addBurst): Add a burst behavior.

- [removeBurst(burst: Burst)](${api}core/EmissionModule#removeBurst): Remove a burst behavior.

- [removeBurstByIndex(index: number)](${api}core/EmissionModule#removeBurstByIndex): Remove a bursting behavior by index.

- [clearBurst()](${api}core/EmissionModule#clearBurst): Clear all blasting behaviors.

### Life cycle size module

[`SizeOverLifetimeModule`](${api}core/SizeOverLifetimeModule) is a subclass of `ParticleGeneratorModule`, used to handle size changes during the life cycle of the particle system.

#### Properties

- [separateAxes](#${api}core/SizeOverLifetimeModule#separateAxes): Boolean value, specifying whether the size of each axis changes independently.
- [sizeX](#${api}core/SizeOverLifetimeModule#sizeX): `ParticleCompositeCurve` object, representing the size change curve of particles in the x-axis direction.
- [sizeY](#${api}core/SizeOverLifetimeModule#sizeY): `ParticleCompositeCurve` object, representing the size change curve of particles in the y-axis direction.
- [sizeZ](#${api}core/SizeOverLifetimeModule#sizeZ): `ParticleCompositeCurve` object, representing the size change curve of particles in the z-axis direction.
- [size](#${api}core/SizeOverLifetimeModule#size): `ParticleCompositeCurve` object, gets or sets the particle size change curve.

### Life cycle color module

[`ColorOverLifetimeModule`](${api}core/ColorOverLifetimeModule) inherited from `ParticleGeneratorModule`, used to handle color changes during the life cycle of the particle system.

#### Properties

- [color](#${api}core/ColorOverLifetimeModule#color): `ParticleCompositeGradient` object, representing the color gradient of particles during their life cycle.

### Life cycle rotation module

[`RotationOverLifetimeModule`](${api}core/RotationOverLifetimeModule) Inherits from `ParticleGeneratorModule` and is used to control rotation changes during the life cycle of the particle system.

#### Properties

- [separateAxes](#${api}core/RotationOverLifetimeModule#separateAxes): `boolean` type, indicating whether to rotate on each axis separately. If disabled, only the z-axis will be used.

- [rotationX](#${api}core/RotationOverLifetimeModule#rotationX): `ParticleCompositeCurve` object, representing the x-axis rotation of the particle during its lifetime.

- [rotationY](#${api}core/RotationOverLifetimeModule#rotationY): `ParticleCompositeCurve` object, representing the y-axis rotation of the particle during its life cycle.

- [rotationZ](#${api}core/RotationOverLifetimeModule#rotationZ): `ParticleCompositeCurve` object, representing the z-axis rotation of the particle during its lifetime.

### Texture table animation module

[`TextureSheetAnimationModule`](${api}core/TextureSheetAnimationModule) Inherits from `ParticleGeneratorModule` and is used to control the texture sheet animation of the particle system.

#### Properties

- [startFrame](${api}core/TextureSheetAnimationModule#startFrame): `ParticleCompositeCurve` object, representing the starting frame of the texture table.

- [frameOverTime](${api}core/TextureSheetAnimationModule#frameOverTime): `ParticleCompositeCurve` object, representing the curve of the frame of the texture table changing over time.

- [type](${api}core/TextureSheetAnimationModule#type): `TextureSheetAnimationType` enumeration, indicating the type of texture sheet animation.

- [cycleCount](${api}core/TextureSheetAnimationModule#cycleCount): `number` type, indicating the cycle count of texture sheet animation.

- [tiling](${api}core/TextureSheetAnimationModule#tiling): `Vector2` object, representing the tiling of the texture table. Can be accessed and modified through the `get` and `set` methods.

## Other parameters

- [velocityScale](${api}core/ParticleRenderer#velocityScale): Specifies the extent to which particles stretch based on their speed, type.
- [lengthScale](${api}core/ParticleRenderer#lengthScale): Defines the extent to which the particle stretches in the direction of its motion, defined as the ratio of the particle's length to its width.
- [pivot](${api}core/ParticleRenderer#pivot): The pivot of the particle.
- [renderMode](${api}core/ParticleRenderer#renderMode): The rendering mode of particles.
- [mesh](${api}core/ParticleRenderer#mesh): The mesh of particles, valid when `renderMode` is `Mesh`.

## Rendering material

[ParticleMaterial](${api}core/ParticleMaterial) is the default material of particles and contains some basic common material properties of particles.

### Properties

- [baseColor](${api}core/ParticleMaterial#baseColor): Base color.
- [baseTexture](${api}core/ParticleMaterial#baseColor): Base texture.
