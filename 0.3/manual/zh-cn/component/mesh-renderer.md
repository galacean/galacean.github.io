# 自定义几何体渲染器

[MeshRenderer](${book.api}classes/core.meshrenderer.html) 是几何体渲染组件，其数据对象是 [Mesh](${book.api}classes/core.mesh.html)。开发者一般使用 [ModelMesh](${book.api}classes/core.modelmesh.html) 或 [BufferMesh](${book.api}classes/core.buffermesh.html)。

``` TypeScript
const meshRenderer = entity.addComponent(MeshRenderer);
meshRenderer.mesh = new ModelMesh(engine);
// or
meshRenderer.mesh = new BufferMesh(engine);
```

- `ModelMesh` 封装了常用的设置顶点数据和索引数据的方法，非常简单易用。开发者若想要快速地去自定义几何体可以使用该类。

- `BufferMesh` 可以自由操作顶点缓冲和索引缓冲数据，以及一些与几何体绘制相关的指令。具备高效、灵活、简洁等特点。开发者如果想高效灵活的实现自定义几何体就可以使用该类。

具体文档可以查看

- [BufferMesh](${book.manual}component/buffer-mesh)
- [ModelMesh](${book.manual}/components/model-mesh)
