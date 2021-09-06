---
order: 3
title: Light
type: Component
---

Lighting makes the scene more layered, and using lighting can create a more realistic 3D scene. Oasis Engine supports the following light type:

| Type | Feature |
| :-- | :-- |
| [AmbientLight](${api}core/AmbientLight) | By default, the model is illuminated from various angles, and the diffuse reflection can be pure color or texture sampling. If the specular reflection texture is set, IBL is turned on to achieve global illumination |
| [DirectLight](${api}core/DirectLight) | Light is emitted in one direction  |
| [PointLight](${api}core/PointLight) | From one point to all directions around, the light intensity attenuates with the distance of the light source |
| [SpotLight](${api}core/SpotLight) | Light emitted from a specific position in a specific direction, the intensity of the light attenuates with the distance of the light source, the illuminated area is cone-shaped, and the edge of the cone attenuates with the opening angle |

### Ambient light

#### Solid color mode

**Ambient light** has been built into [Scene](${api}core/Scene), providing solid color mode and texture mode for **diffuse**. The default is `solidColor` mode:

```typescript
const ambientLight = scene.ambientLight;
// Set ambient light color with red
ambientLight.diffuseSolidColor.setValue(1, 0, 0, 1);
// Set ambient light intensity
ambientLight.diffuseIntensity = 0.5;
```

#### Spherical Harmonics mode

In the real world, diffuse reflection is definitely not a solid color. It is generally a relatively low-frequency color change. For this kind of low-frequency filtering, Oasis passes 9 [spherical harmonic coefficients](https://graphics.stanford.edu/papers/envmap/envmap.pdf) to save the environment color, and then switch `diffuseMode` to spherical harmonic mode:

```typescript
const ambientLight = scene.ambientLight;

// SH diffuse
ambientLight.diffuseMode = DiffuseMode.SphericalHarmonics;
ambientLight.diffuseSphericalHarmonics = sh; // get the spherical harmonic coefficients by baking and other methods
```

Oasis provides [baking tool](https://github.com/oasis-engine/engine-baker) for baking. You can first use the baking tool to bake off-line to get the spherical harmonic coefficient, and then set it directly at runtime:

```typescript
// -----------Baking off-line-----------
import { SphericalHarmonics3Baker } from "@oasis-engine/baker";

const sh = new SphericalHarmonics3();

// bake sh
SphericalHarmonics3Baker.fromTextureCubeMap(cubeTexture, sh);

// export to array
const arr = [];
sh.toArray(arr);

// -----------Runtime-----------

// Can be used directly when running, no need to bake.
ambientLight.diffuseMode = DiffuseMode.SphericalHarmonics;
const sh = new SphericalHarmonics3();
sh.setValueByArray(arr); // Set the spherical harmonic through the array derived above
ambientLight.diffuseSphericalHarmonics = sh;
```

#### IBL

In order to simulate the real world environment, Oasis engine provides [IBL](https://www.wikiwand.com/en/Image-based_lighting) technology, which loads a [cube texture](${docs}resource-manager#2-texturecube) resouce that can reflect the surrounding environment.

```typescript
const ambientLight = scene.ambientLight;

// IBL
ambientLight.specularTexture = cubeTexture;
```

If use PBR material, don't forget to turn on [IBL mode of ambient light](${docs}light#ibl) ~ Only after adding it, the roughness, metallic, specular reflection, physical conservation and global illumination belonging to PBR will show the effect.

<playground src="ambient-light.ts"></playground>

### Directional light

**Directional light** means that the light is emitted from a certain direction, and the light is parallel. The light from the sun can be regarded as directional light, because the distance between the sun and the earth is much greater than the radius of the earth, so The sunlight shining on the earth can be regarded as a group of parallel lights coming from the same direction, that is, directional light. Directional light has 3 main characteristics: [color](${api}core/DirectLight#color), [intensity](${api}core/DirectLight#intensity), [direction](${api}core/DirectLight#direction). `direction` is represented by the direction of the entity where the directional light is located.

```typescript
const lightEntity = rootEntity.createChild("light");
const directLight = lightEntity.addComponent(DirectLight);

directLight.color.setValue(0.3, 0.3, 1, 1);

// Adjust direction
lightEntity.transform.setRotation(-45, -45, 0);
```

### Point light

**Point light** emits light in all directions from a certain position. For example, a light bulb in life is a point light. Point light sources have 3 main characteristics: [color](${api}core/PointLight#color), [intensity](${api}core/PointLight#intensity), [distance](${api}core/PointLight#distance). The place beyond the effective distance will not be able to receive the light of the point light source, and the light intensity will gradually decrease as the farther away from the light source.

```typescript
const lightEntity = rootEntity.createChild("light");

lightEntity.addComponent(PointLight);
lightEntity.distance = 100;
lightEntity.color.setValue(0.3, 0.3, 1, 1);
lightEntity.transform.setPosition(-10, 10, 10);
```

### Spot light

**Spot light** is a bit like the point light, but its light is not emitted in all directions, but in a certain direction, just like the light emitted by a flashlight in real life. Spotlight has several main characteristics: [color](${api}core/SpotLight#color), [intensity](${api}core/SpotLight#intensity), [distance](${api}core/SpotLight#distance), [angle](${api}core/SpotLight#angle), [penumbra](${api}core/SpotLight#penumbra). The `angle` indicates how much light is present when the angle between the direction of the light source and the light source is smaller. The `penumbra` angle indicates that within the effective angle range, the light intensity gradually attenuates to 0 as the angle increases.

```typescript
const lightEntity = rootEntity.createChild("light");

lightEntity.addComponent(SpotLight);

lightEntity.angle = Math.PI / 6;
lightEntity.penumbra = Math.PI / 12;
lightEntity.color.setValue(0.3, 0.3, 1, 1);

lightEntity.transform.setPosition(-10, 10, 10);
lightEntity.transform.setRotation(-45, -45, 0);
```

<playground src="light-type.ts"></playground>
