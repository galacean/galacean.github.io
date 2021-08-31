---
order: 4
title: MeshRenderer
type: Component
---

[MeshRenderer](${api}core/MeshRenderer) is the mesh rendering component, and its data object is [Mesh](${api}core/Mesh). Developers generally use [ModelMesh](${api}core/ModelMesh) or [BufferMesh](${api}core/BufferMesh).

``` TypeScript
const meshRenderer = entity.addComponent(MeshRenderer);
meshRenderer.mesh = new ModelMesh(engine);
// or
meshRenderer.mesh = new BufferMesh(engine);
```

- `ModelMesh` encapsulates commonly used methods of setting vertex data and index data, which is very simple and easy to use. Developers can use this class if they want to quickly customize the geometry.

- `BufferMesh` can freely manipulate vertex buffer and index buffer data, as well as some commands related to geometry rendering. It has the characteristics of high efficiency, flexibility and simplicity. Developers can use this class if they want to implement custom geometry efficiently and flexibly.

Specific documents can be viewed:

- [ModelMesh](${docs}model-mesh)
- [BufferMesh](${docs}buffer-mesh)

