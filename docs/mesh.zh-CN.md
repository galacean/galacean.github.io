---
order: 0
title: 网格总览
type: 图形
group: 网格
label: Graphics/Mesh
---

Mesh 是 MeshRenderer 的数据对象，它的职责可以类比为市面上较为流行的填色本，描述了顶点的各种信息（位置，拓扑，顶点颜色，UV 等），同样的，在 Oasis 中我们可以使用 [ModelMesh](${api}core/ModelMesh) 或 [BufferMesh](${api}core/BufferMesh) 来描述待渲染物体的几何信息。

## 分类

| 类型 | 描述 |
| :-- | :-- |
| [ModelMesh](${docs}model-mesh-cn) | 封装了常用的设置顶点数据和索引数据的方法，非常简单易用。开发者若想要快速地去自定义几何体可以使用该类 |
| [BufferMesh](${docs}buffer-mesh-cn) | 可以自由操作顶点缓冲和索引缓冲数据，以及一些与几何体绘制相关的指令。具备高效、灵活、简洁等特点。开发者如果想高效灵活的实现自定义几何体就可以使用该类 |

## 使用

```typescript
const meshRenderer = entity.addComponent(MeshRenderer);
meshRenderer.mesh = new ModelMesh(engine);
// or
meshRenderer.mesh = new BufferMesh(engine);
```

## 常用几何体

自己构造几何体网格数据是一个比较痛苦的过程，因此 Oasis 内置了一些较为实用的几何体。

- [PrimitiveMesh](${docs}primitive-mesh-cn)：包含常用的长方体，球体，平面，圆柱，圆环，圆柱与胶囊体。
