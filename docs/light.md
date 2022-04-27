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

#### IBL

Generally, the PBR workflow does not use the pure color mode, but uses an HDR texture as the environment reflection, which we call the [IBL](https://developer.nvidia.cn/gpugems/gpugems/part-iii-materials/chapter-19-image-based-lighting) mode here.

Oasis supports offline baking through [Oasis Editor](https://oasis.alipay.com/editor) or [glTF Viewer](https://oasisengine.cn/gltf-viewer) to get IBL baked products `*.env` file.

![gltf viewer](https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*9mGbSpQ4HngAAAAAAAAAAAAAARQnAQ)

After getting the `*.env`, we can load the ambient light through resourceManager:

```typescript
engine.resourceManager
  .load<AmbientLight>({
    type: AssetType.Env,
    url: "***.env"
  })
  .then((ambientLight) => {
    scene.ambientLight = ambientLight;

    // If you want to add a skybox, you can easily get it from ambientLight
    skyMaterial.textureCubeMap = ambientLight.specularTexture;
    // Since the encoding method of the baked texture is RGBM, the corresponding decoding settings are required
    skyMaterial.textureDecodeRGBM = true;
  });
```

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

const pointLight = lightEntity.addComponent(PointLight);
pointLight.distance = 100;
pointLight.color.setValue(0.3, 0.3, 1, 1);
lightEntity.transform.setPosition(-10, 10, 10);
```

### Spot light

**Spot light** is a bit like the point light, but its light is not emitted in all directions, but in a certain direction, just like the light emitted by a flashlight in real life. Spotlight has several main characteristics: [color](${api}core/SpotLight#color), [intensity](${api}core/SpotLight#intensity), [distance](${api}core/SpotLight#distance), [angle](${api}core/SpotLight#angle), [penumbra](${api}core/SpotLight#penumbra). The `angle` indicates how much light is present when the angle between the direction of the light source and the light source is smaller. The `penumbra` angle indicates that within the effective angle range, the light intensity gradually attenuates to 0 as the angle increases.

```typescript
const lightEntity = rootEntity.createChild("light");

const spotLight = lightEntity.addComponent(SpotLight);

spotLight.angle = Math.PI / 6; // 散射角度
spotLight.penumbra = Math.PI / 12; // 半影衰减角度
spotLight.color.setValue(0.3, 0.3, 1, 1);

lightEntity.transform.setPosition(-10, 10, 10);
lightEntity.transform.setRotation(-45, -45, 0);
```

<playground src="light-type.ts"></playground>
