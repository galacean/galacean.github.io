---
order: 0
title: Mesh
type: Graphics
group: Mesh
label: Graphics/Mesh
---

Mesh is the data object of MeshRenderer, which describes various information of vertices (position, topology, vertex color, UV, etc.). Similarly, in Galacean we can use [ModelMesh](${api}core/ModelMesh) or [BufferMesh](${api}core/BufferMesh) to describe the geometric information of the object to be rendered

## Mesh category

| type                   | description                      |
| :--------------------- | :------------------------------- |
| [ModelMesh](${docs}model-mesh) | Which mainly contains data such as vertices (position, normal, UV, etc.), index, and mixed shape. Not only can you use modeling software to make and export glTF to analyze and restore in the engine, you can also use scripts to directly write data to create |
| [BufferMesh](${docs}buffer-mesh) | Can freely manipulate vertex buffer and index buffer data, as well as some commands related to geometry rendering. It has the characteristics of high efficiency, flexibility and simplicity. Developers can use this class if they want to implement custom geometry efficiently and flexibly |

## How to use

```typescript
const meshRenderer = entity.addComponent(MeshRenderer);
meshRenderer.mesh = new ModelMesh(engine);
// or
meshRenderer.mesh = new BufferMesh(engine);
```

## Common Geometry

Constructing the geometry mesh data yourself can be a pain, so Galacean has built in some useful geometry.

- [PrimitiveMesh](${docs}primitive-mesh-cn)：Contains cuboid, sphere, plane, cylinder, torus, cylinder and capsule.
