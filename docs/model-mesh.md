---
order: 5
title: Model Mesh
type: Graphics Rendering
group: Basic Rendering
---

`ModelMesh` is a mesh rendering data class used to describe the outline of a geometric body, which mainly contains data such as vertices (position, normal, UV, etc.), index, and mixed shape. Not only can you use modeling software to make and export glTF to analyze and restore in the engine, you can also use scripts to directly write data to create.

<playground src="obj-loader.ts"></playground>

## Create with script

### Code example

```TypeScript
const entity = rootEntity.createChild('mesh-example');
const meshRenderer = entity.addComponent(MeshRenderer);

const modelMesh = new ModelMesh(engine);

// Set vertices data
const positions = [
  new Vector3(-1.0, -1.0,  1.0),
  new Vector3( 1.0, -1.0,  1.0),
  new Vector3( 1.0,  1.0,  1.0),
  new Vector3( 1.0,  1.0,  1.0),
  new Vector3(-1.0,  1.0,  1.0),
  new Vector3(-1.0, -1.0,  1.0)
];
modelMesh.setPositions(positions);

// Add SubMesh
modelMesh.addSubMesh(0, 6);

// Upload data
modelMesh.uploadData(false);

meshRenderer.mesh = modelMesh;
meshRenderer.setMaterial(new UnlitMaterial(engine));
```

### Detailed introduction

The use of `ModelMesh` is divided into three steps:

1. **Setup Data**

Set vertex data by `setPositions()`, `setColors()` and other methods

```TypeScript
modelMesh.setPositions([
  new Vector3(-1.0, -1.0,  1.0),
  new Vector3( 1.0, -1.0,  1.0),
  new Vector3( 1.0,  1.0,  1.0),
  new Vector3( 1.0,  1.0,  1.0),
  new Vector3(-1.0,  1.0,  1.0),
  new Vector3(-1.0, -1.0,  1.0)
]);

modelMesh.setColors([
    new Color(1, 0, 0),
    new Color(1, 1, 0),
    new Color(0, 1, 1),
    new Color(0, 1, 0),
    new Color(0, 1, 1),
    new Color(1, 0, 1)
]);
```

The APIs for setting data are:

| API                                                   | 说明                           |
| ----------------------------------------------------- | ------------------------------ |
| [setPositions](${api}core/ModelMesh#setPositions)     | Set vertex position data       |
| [setIndices](${api}core/ModelMesh#setIndices)         | Set index data                 |
| [setNormals](${api}core/ModelMesh#setNormals)         | Set per-vertex normal data     |
| [setColors](${api}core/ModelMesh#setColors)           | Set per-vertex color data      |
| [setTangents](${api}core/ModelMesh#setTangents)       | Set per-vertex tangent         |
| [setBoneWeights](${api}core/ModelMesh#setBoneWeights) | Set per-vertex bone weight     |
| [setBoneIndices](${api}core/ModelMesh#setBoneIndices) | Set per-vertex bone index data |
| [setUVs](${api}core/ModelMesh#setUVs)                 | Set per-vertex uv data         |

It can be set selectively according to needs (note that location is necessary data and needs to be set first).

2. **Add SubMesh**

[SubMesh](${api}core/SubMesh) mainly contains information such as drawing range and drawing method. Call [addSubMesh](${api}core/ModelMesh#addSubMesh) to add.

```TypeScript
modelMesh.addSubMesh(0, 2, MeshTopology.Triangles);
```

3. **Upload data**

Call the [uploadData()](${api}core/ModelMesh#uploadData) method.

If you no longer need to modify the `ModelMesh` data, set the `noLongerAccessible` parameter to `true`:

```TypeScript
modelMesh.uploadData(true);
```

If you need to continuously modify the `ModelMesh` data, set the `noLongerAccessible` parameter to `false`:

```TypeScript
modelMesh.uploadData(false);
```

<playground src="model-mesh.ts"></playground>

## Script to add BlendShape animation

`BlendShape` is usually used to make very detailed animations, such as expression animations. The principle is also relatively simple, mainly by weighting the mesh data of the basic shape and the target shape to express the excessive animation effect between the shapes.

Example of glTF import BlendShape animation:
<playground src="skeleton-animation-blendShape.ts"></playground>

**Script custom BlendShape animation example:**
<playground src="skeleton-animation-customBlendShape.ts"></playground>

### Detailed steps

1. **Organize `BlendShape` data**

   First, we first create a `BlendShape` object, and then call [addFrame()](${api}core/ModelMesh#addFrame) to add the frame data of the mixed shape. A `BlendShape` can add multiple key frames, and each frame is determined by **Weight** and **geometric offset data** are composed of **offset position** is necessary data, **offset normal** and **offset tangent** are optional data.

   Then we add the created `BlendShape` through the `addBlendShape()` method of `Mesh`.

   ```typescript
   // Add BlendShape
   const deltaPositions = [
      new Vector3(0.0, 0.0, 0.0),
      new Vector3(0.0, 0.0, 0.0),
      new Vector3(-1.0, 0.0, 0.0),
      new Vector3(-1.0, 0.0, 0.0),
      new Vector3(1.0, 0.0, 0.0),
      new Vector3(0.0, 0.0, 0.0)
    ];
    const blendShape = new BlendShape("BlendShapeA");
    blendShape.addFrame(1.0, deltaPositions);
    modelMesh.addBlendShape(blendShape);
   ```

   

2. **Adjust to the target `BlendShape` by weighting**

   Now we want to completely adjust the shape of the grid to the added `BlendShape`, we need to set up a weight array, because we only added a `BlendShape`, so the length of the weight array is 1, and the first element The value of is set to 1.0.

   ```typescript
   // Use `blendShapeWeights` property to adjust the mesh to the target BlendShape
   skinnedMeshRenderer.blendShapeWeights = new Float32Array([1.0]);
   ```

   
