---
order: 5
title: Model Mesh
type: Graphics
group: Mesh
label: Graphics/Mesh
---

[ModelMesh](${api}core/ModelMesh) is a mesh rendering data class used to describe the outline of a geometric body, which mainly contains data such as vertices (position, normal, UV, etc.), index, and mixed shape. Not only can you use modeling software to make and export glTF to analyze and restore in the engine, you can also use scripts to directly write data to create.

<playground src="obj-loader.ts"></playground>

## Create with script

### Code example

```typescript
const entity = rootEntity.createChild("mesh-example");
const meshRenderer = entity.addComponent(MeshRenderer);

const modelMesh = new ModelMesh(engine);

// Set vertices data
const positions = [
  new Vector3(-1.0, -1.0, 1.0),
  new Vector3(1.0, -1.0, 1.0),
  new Vector3(1.0, 1.0, 1.0),
  new Vector3(1.0, 1.0, 1.0),
  new Vector3(-1.0, 1.0, 1.0),
  new Vector3(-1.0, -1.0, 1.0),
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

The use of `ModelMesh` is divided into the following steps:

#### **Setup Data**

`ModelMesh` can set vertex data through **high-level data** or **low-level data**, or it can be set selectively according to needs, but it should be noted that the position is necessary data and needs to be set first.

##### Via advanced data settings

You can directly generate ModelMesh by setting **advanced data** such as `position`, `normal`, `uv`, etc., and then call the `uploadData` method to uniformly upload the data to the GPU to complete the application.

```typescript
const positions = new Array<Vector3>(4);
positions[0] = new Vector3(-1, 1, 1);
positions[1] = new Vector3(1, 1, 1);
positions[2] = new Vector3(1, -1, 1);
positions[3] = new Vector3(-1, -1, 1);
const uvs = new Array<Vector2>(4);
uvs[0] = new Vector2(0, 0);
uvs[1] = new Vector2(1, 0);
uvs[2] = new Vector2(1, 1);
uvs[3] = new Vector2(0, 1);

modelMesh.setPositions(positions);
modelMesh.setUVs(uvs);
modelMesh.uploadData(false);
```

The APIs for setting advanced data are:

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

##### Set via low-level data

Compared with high-level data, setting data through low-level interfaces allows free manipulation of vertex buffer data, which is not only flexible but may also bring performance improvements. But you need to understand the relationship between Vertex Buffer and Vertex Element, as shown below:

![image.png](https://mdn.alipayobjects.com/huamei_jvf0dp/afts/img/A*68IjSo2kwUAAAAAAAAAAAAAADleLAQ/original)

```typescript
const pos = new Float32Array([1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0]);
const posBuffer = new Buffer(
  engine,
  BufferBindFlag.VertexBuffer,
  pos,
  BufferUsage.Static,
  true
);
const mesh = new ModelMesh(engine);
mesh.setVertexBufferBinding(posBuffer, 12, 0);
const vertexElements = [
  newVertexElement(VertexAttribute.Position, 0, VertexElementFormat.Vector3, 0),
];
mesh.setVertexElements(vertexElements);
mesh.uploadData(false);
```

#### **Add SubMesh**

[SubMesh](${api}core/SubMesh) mainly contains information such as drawing range and drawing method. Call [addSubMesh](${api}core/ModelMesh#addSubMesh) to add.

```typescript
modelMesh.addSubMesh(0, 2, MeshTopology.Triangles);
```

#### **Upload data**

Call the [uploadData()](${api}core/ModelMesh#uploadData) method.

If you no longer need to modify the `ModelMesh` data, set the `releaseData` parameter to `true`:

```typescript
modelMesh.uploadData(true);
```

If you need to continuously modify the `ModelMesh` data, set the `releaseData` parameter to `false`:

```typescript
modelMesh.uploadData(false);
```

<playground src="model-mesh.ts"></playground>

#### **Read advanced data**

To make the vertex data in `ModelMesh` readable, please note:

- Set the `releaseData` parameter to `false` when uploading data
- If the vertex data is set through **low-level data**, the readable attribute of the low-level data ([readable](${api}core/Buffer#readable)) needs to be set to `true`

```typescript
const pos = new Float32Array([1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0]);
const posBuffer = new Buffer(
  engine,
  BufferBindFlag.VertexBuffer,
  pos,
  BufferUsage.Static,
  true
);
const mesh = new ModelMesh(engine);
mesh.setVertexBufferBinding(posBuffer, 12, 0);
const vertexElements = [
  newVertexElement(VertexAttribute.Position, 0, VertexElementFormat.Vector3, 0),
];
mesh.setVertexElements(vertexElements);
mesh.uploadData(false);
//Expected advanced data
const result = mesh.getPositions();
```

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
     new Vector3(0.0, 0.0, 0.0),
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
