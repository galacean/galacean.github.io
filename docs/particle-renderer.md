---
order: 11
title: Particle System
type: Component
---

Oasis Engine's particle renderer [ParticleRenderer](${api}core/ParticleRenderer) is a commonly used rendering component with rich properties. By adjusting each property value, it can achieve brilliant and colorful particle effects.

<playground src="particle-renderer.ts"></playground>

## Code example

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

## Properties

The particle renderer contains properties such as life cycle, material, transformation and so on.

### Basic properties
- [maxCount](${api}core/ParticleRenderer#maxCount): The maximum number of particles determines the size of the memory occupied, which needs to be allocated reasonably.

### Life cycle
- [lifetime](${api}core/ParticleRenderer#lifetime): The life cycle of the particle, in seconds.
- [startTimeRandomness](${api}core/ParticleRenderer#startTimeRandomness): Start time random factor.
- [isOnce](${api}core/ParticleRenderer#isOnce): Whether to emit only once, the default is `false` (loop).
- [playOnEnable](${api}core/ParticleRenderer#playOnEnable): Whether to play automatically, the default is `true`.

### Material
- [texture](${api}core/ParticleRenderer#texture): Texture of every particle.
- [color](${api}core/ParticleRenderer#color):Color of Particle.
- [colorRandomness](${api}core/ParticleRenderer#colorRandomness): The color random factor, the value is between `0~1`, the color value of the R, G, and B channels of the color will take a random value within the range of the random factor.
- [isUseOriginColor](${api}core/ParticleRenderer#isUseOriginColor): Whether to use the original color of the image. When it is `true` (default), the original color of the image is used. Otherwise, the original color of the image is mixed with the color configured by the user.
- [spriteSheet](${api}core/ParticleRenderer#spriteSheet):Sprite atlas, each particle renders certain area in the sprite atlas:

<playground src="particle-sprite-sheet.ts"></playground>

- [alpha](${api}core/ParticleRenderer#alpha): transparency value.
- [alphaRandomness](${api}core/ParticleRenderer#alphaRandomness): Transparency random factor.
- [isFadeIn](${api}core/ParticleRenderer#isFadeIn): Is fade-in.
- [isFadeOut](${api}core/ParticleRenderer#isFadeOut): Is fade-out.
- [blendMode](${api}core/ParticleRenderer#blendMode): Blend mode, currently supports [Transparent](${api}core/ParticleRendererBlendMode#Transparent)(default) and [Additive](${api}core/ParticleRendererBlendMode#Additive). 

### Transform
- [position](${api}core/ParticleRenderer#position): Initial position.
- [positionRandomness](${api}core/ParticleRenderer#positionRandomness): Position random factor.
- [velocity](${api}core/ParticleRenderer#velocity): Moving velocity.
- [velocityRandomness](${api}core/ParticleRenderer#velocityRandomness): Moving velocity random factor.
- [acceleration`](${api}core/ParticleRenderer#acceleration): Moving acceleration.
- [accelerationRandomness](${api}core/ParticleRenderer#accelerationRandomness): Moving acceleration factor.
- [angle](${api}core/ParticleRenderer#angle): Initial rotation angle.
- [angleRandomness](${api}core/ParticleRenderer#angleRandomness): The initial rotation angle random factor. The value is between `0~1`, for example: if the random factor is 1, the generated angle is random between `-PI~PI`.
- [rotateVelocity](${api}core/ParticleRenderer#rotateVelocity): Rotation velocity.
- [rotateVelocityRandomness](${api}core/ParticleRenderer#rotateVelocityRandomness): Rotation velocity factor.
- [isRotateToVelocity](${api}core/ParticleRenderer#isRotateToVelocity): Whether to follow the direction of the particle moving. The default is `false`. When it is `true`, the unit vector of the particle map texture rotated to the direction of the particle moving, such as fireworks. When it is `false`, there is no rotation, which is suitable for the same direction scenes, such as Kong Ming Lantern.
- [is2d](${api}core/ParticleRenderer#is2d): Whether it is a 2D particle, the default is `true`.
- [size](${api}core/ParticleRenderer#size): Particle size.
- [sizeRandomness](${api}core/ParticleRenderer#sizeRandomness): Particle size random factor.
- [scale](${api}core/ParticleRenderer#scale): The size of particle.
.
- [isScaleByLifetime](${api}core/ParticleRenderer#isScaleByLifetime): Whether to shrink to disappear with the life cycle. When it is `true`, the particles will become smaller and smaller.

  ## Methods
- [start()](${api}core/ParticleRenderer#start): Start playing.
- [stop()](${api}core/ParticleRenderer#stop): Stop playing.