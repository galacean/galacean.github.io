# BufferMesh

使用案例可以参考[Playground](${book.playground}#/buffer-mesh)。
## 原理图
我们先概览一下 `BufferMesh`  的原理图

![image.png](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*pYFLSIbNKZYAAAAAAAAAAAAAARQnAQ)

`BufferMesh` 有三大核心元素分别是：

|名称|解释|
|:--|:--|
|[VertexBufferBinding](${book.api}classes/core.vertexbufferbinding.html)|顶点缓冲绑定，用于将顶点缓冲和顶点跨度（字节）打包。|
|[VertexElement](${book.api}classes/core.vertexelement.html)|顶点元素，用于描述顶点语义、顶点偏移、顶点格式和顶点缓冲绑定索引等信息。|
|[IndexBufferBinding](${book.api}classes/core.indexbufferbinding.html)|索引缓冲绑定（可选），用于将索引缓冲和索引格式打包。|
  
其中  `IndexBufferBinding`  为可选，也就是说必要核心元素只有两个，分别通过 [`setVertexBufferBindings()`](${book.api}classes/core.primitive.html#setvertexbufferbindings) 接口和 [`setVertexElements()`](${book.api}classes/core.primitive.html#setvertexelements) 接口设置。 最后一项就是通过 [`addSubMesh`](${book.api}classes/core.buffermesh.html#addsubmesh) 添加子 *SubMesh* ，并设置顶点或索引绘制数量， *SubMesh* 包含三个属性分别是起始绘制偏移、绘制数量、图元拓扑，并且开发者可以自行添加多个 *SubMesh*，每个子几何体均可对应独立的材质。


## 常用案例
这里列举几个 [MeshRenderer](${book.api}classes/core.meshrenderer.html) 和 [BufferMesh](${book.api}classes/core.buffermesh.html) 的常用使用场景，因为这个类的功能偏底层和灵活，所以这里给出了比较详细的代码。

### 交错顶点缓冲
常用方式，比如自定义 Mesh、Particle 等实现，具有显存紧凑，每帧 CPU 数据上传至 GPU 次数少等优势。这个案例的主要特点是多个 [VertexElement](${book.api}classes/core.vertexelement.html) 对应一个 *VertexBuffer* （[Buffer](${book.api}classes/core.buffer.html)），仅使用一个 *VertexBuffer* 就可以将不同顶点元素与 Shader 关联。

```typescript
// add MeshRenderer component
const renderer = entity.addComponent(MeshRenderer);

// create mesh
const mesh = new BufferMesh(engine);

// create vertices.
const vertices = new ArrayBuffer(vertexByteCount);

// create vertexBuffer and upload vertices.
const vertexBuffer = new Buffer(engine, BufferBindFlag.VertexBuffer, vertices);

// bind vertexBuffer with stride, stride is every vertex byte length,so the value is 16.
mesh.setVertexBufferBindings(new VertexBufferBinding(vertexBuffer, 16));

// add vertexElement to tell GPU how to read vertex from vertexBuffer.
mesh.setVertexElements([new VertexElement("POSITION", 0, VertexElementFormat.Vector3, 0),
                            new VertexElement("COLOR", 12, VertexElementFormat.NormalizedUByte4, 0)]);

// add one subMesh and set how many vertex you want to render.
mesh.addSubMesh(0, vertexCount);

// set mesh
renderer.mesh = mesh;
```
### 独立顶点缓冲
动态顶点 buffer 和静态顶点 buffer 混用时具有优势，比如 *position* 为静态，但 *color* 为动态，独立顶点缓冲可以仅更新颜色数据至 GPU。这个案例的主要特点是一个 [VertexElement](${book.api}classes/core.vertexelement.html) 对应一个 *VertexBuffer* ，可以分别调用 [Buffer](${book.api}classes/core.buffer.html) 对象的 [setData](${book.api}classes/core.buffer.html#setdata) 方法独立更新数据。

```typescript
// add MeshRenderer component
const renderer = entity.addComponent(MeshRenderer);

// create mesh
const mesh = new BufferMesh(engine);

// create vertices.
const positions = new Float32Array(vertexCount);
const colors = new Uint8Array(vertexCount);

// create vertexBuffer and upload vertices.
const positionBuffer = new Buffer(engine, BufferBindFlag.VertexBuffer, positions);
const colorBuffer = new Buffer(engine, BufferBindFlag.VertexBuffer, colors);

// bind vertexBuffer with stride,stride is every vertex byte length,so the value is 12.
mesh.setVertexBufferBindings([new VertexBufferBinding(positionBuffer, 12),
                                 	new VertexBufferBinding(colorBuffer, 4)]);

// add vertexElement to tell GPU how to read vertex from vertexBuffer.
mesh.setVertexElements([new VertexElement("POSITION", 0, VertexElementFormat.Vector3, 0),
                            new VertexElement("COLOR", 0, VertexElementFormat.NormalizedUByte4, 1)]);

// add one subMesh and set how many vertex you want to render.
mesh.addSubMesh(0, vertexCount);

// set mesh
renderer.mesh = mesh;
```


### Instance 渲染
GPU Instance 渲染是三维引擎的常用技术，比如可以把相同几何体形状的物体一次性渲染到不同的位置，可以大幅提升渲染性能。这个案例的主要特点是使用了 [VertexElement](${book.api}classes/core.vertexelement.html) 的实例功能，其构造函数的最后一个参数表示实例步频（在缓冲中每前进一个顶点绘制的实例数量，非实例元素必须为 0），[BufferMesh](${book.api}classes/core.buffermesh.html) 的 [instanceCount](${book.api}classes/core.buffermesh.html#instancecount) 表示实例数量。

```typescript
// add MeshRenderer component
const renderer = entity.addComponent(MeshRenderer);

// create mesh
const mesh = new BufferMesh(engine);

// create vertices.
const vertices = new ArrayBuffer( vertexByteLength );

// create instance data.
const instances = new Float32Array( instanceDataLength );

// create vertexBuffer and upload vertex data.
const vertexBuffer = new Buffer( engine, BufferBindFlag.VertexBuffer, vertices );

// create instance buffer and upload instance data.
const instanceBuffer = new Buffer( engine, BufferBindFlag.VertexBuffer, instances );

// bind vertexBuffer with stride, stride is every vertex byte length,so the value is 16.
mesh.setVertexBufferBindings([new VertexBufferBinding( vertexBuffer, 16 ),
                                  new VertexBufferBinding( instanceBuffer, 12 )]);

// add vertexElement to tell GPU how to read vertex from vertexBuffer.
mesh.setVertexElements([new VertexElement( "POSITION", 0, VertexElementFormat.Vector3, 0 ),
                            new VertexElement( "COLOR", 12, VertexElementFormat.NormalizedUByte4, 0 ),
                            new VertexElement( "INSTANCE_OFFSET", 0, VertexElementFormat.Vector3, 1 , 1 ),
                            new VertexElement( "INSTANCE_ROTATION", 12, VertexElementFormat.Vector3, 1 , 1 )]]);

// add one sub mesh and set how many vertex you want to render, here is full vertexCount.
mesh.addSubMesh(0, vertexCount);

// set mesh
renderer.mesh = mesh;
```


## 索引缓冲
使用索引缓冲可以复用顶点缓冲内的顶点，从而达到节省显存的目的。其使用方式很简单，就是在原基础上增加了索引缓冲对象，以下代码是在第一个 **交错顶点缓冲** 案例的基础上修改而来的

```typescript
// add MeshRenderer component
const renderer = entity.addComponent(MeshRenderer);

// create mesh
const mesh = new BufferMesh(engine);

// create vertices.
const vertices = new ArrayBuffer(vertexByteCount);

// create indices.
const indices = new Uint16Array(indexCount);

// create vertexBuffer and upload vertices.
const vertexBuffer = new Buffer(engine, BufferBindFlag.VertexBuffer, vertices);

// create indexBuffer and upload indices.
const indexBuffer = new Buffer(engine, BufferBindFlag.IndexBuffer, indices);

// bind vertexBuffer with stride, stride is every vertex byte length,so the value is 16.
mesh.setVertexBufferBindings(new VertexBufferBinding(vertexBuffer, 16));

// bind vertexBuffer with format.
mesh.setIndexBufferBinding(indexBuffer, IndexFormat.UInt16);

// add vertexElement to tell GPU how to read vertex from vertexBuffer.
mesh.setVertexElements([new VertexElement("POSITION", 0, VertexElementFormat.Vector3, 0),
                            new VertexElement("COLOR", 12, VertexElementFormat.NormalizedUByte4, 0)]);

// add one subMesh and set how many vertex you want to render.
mesh.addSubMesh(0, vertexCount);

// set mesh
renderer.mesh = mesh;
```