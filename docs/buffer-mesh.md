---
order: 6
title: Buffer Mesh
type: 组件
---

[BufferMesh]() can freely manipulate vertex buffer and index buffer data, as well as some commands related to geometry rendering. It has the characteristics of high efficiency, flexibility and simplicity. Developers can use this class if they want to implement custom geometry efficiently and flexibly.

<playground src="buffer-mesh.ts"></playground>

## Schematic diagram
Let's take a look at the schematic diagram of `BufferMesh`

![image.png](https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*piB3Q4501loAAAAAAAAAAAAAARQnAQ)

The three core elements of `BufferMesh` are:

| Property name | Interpretation |
|:--|:--|
|[VertexBufferBinding](${api}core/VertexBufferBinding)|Vertex buffer binding, used to pack the vertex buffer and the vertex span (byte).|
|[VertexElement](${api}core/VertexElement)|Vertex elements are used to describe information such as vertex semantics, vertex offset, vertex format, and vertex buffer binding index.|
|[IndexBufferBinding](${api}core/IndexBufferBinding)|Index buffer binding (optional), used to pack the index buffer and index format.|

Among them, [IndexBufferBinding](${api}core/IndexBufferBinding) is optional, which means that there are only two necessary core elements, through the [setVertexBufferBindings()](${api}core/BufferMesh#setVertexBufferBindings) interface and [setVertexElements( )](${api}core/BufferMesh#setVertexElements) Interface settings. The last item is to add sub[SubMesh](${api}core/SubMesh) through [addSubMesh](${api}core/BufferMesh#addSubMesh), and set the number of vertices or indexes to draw, [SubMesh](${api} core/SubMesh) contains three attributes: initial drawing offset, drawing quantity, and primitive topology, and developers can add multiple [SubMesh](${api}core/SubMesh) by themselves, and each sub-geometry can correspond Independent material.


## Common cases
Here are a few common usage scenarios of [MeshRenderer](${api}core/MeshRenderer) and [BufferMesh](${api}core/BufferMesh), because the function of this class is low-level and flexible, so here is a comparison Detailed code.

### Interleaved VertexBuffer
Common methods, such as custom Mesh, Particle, etc., have the advantages of compact video memory and fewer CPU data uploads per frame to the GPU. The main feature of this case is that multiple [VertexElement](${api}core/VertexElement) correspond to one *VertexBuffer* ([Buffer](${api}core/Buffer)), only one *VertexBuffer* can be used Vertex elements are associated with Shader.

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
mesh.setVertexBufferBinding(vertexBuffer, 16);

// add vertexElement to tell GPU how to read vertex from vertexBuffer.
mesh.setVertexElements([new VertexElement("POSITION", 0, VertexElementFormat.Vector3, 0),
                            new VertexElement("COLOR", 12, VertexElementFormat.NormalizedUByte4, 0)]);

// add one subMesh and set how many vertex you want to render.
mesh.addSubMesh(0, vertexCount);

// set mesh
renderer.mesh = mesh;
```
### Independent VertexBuffer
Dynamic vertex buffer and static vertex buffer have advantages when mixed. For example, *position* is static, but *color* is dynamic. Independent vertex buffer can only update the color data to the GPU. The main feature of this case is that a [VertexElement](${api}core/VertexElement) corresponds to a *VertexBuffer*, and you can call [setData](${api} of the [Buffer](${api}core/Buffer) object respectively core/Buffer#setData) method to update data independently.

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


### Instance VertexBuffer
GPU Instance rendering is a common technology for 3D engines. For example, objects of the same geometric shape can be rendered to different positions at one time, which can greatly improve rendering performance. The main feature of this case is the use of the instance function of [VertexElement](${api}core/VertexElement). The last parameter of the constructor represents the instance step frequency (the number of instances drawn for each vertex in the buffer, non-instance The element must be 0), [instanceCount](${api}core/BufferMesh#instanceCount) in [BufferMesh](${api}core/BufferMesh) represents the number of instances.

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


## IndexBuffer
To achieve the purpose of saving video memory, the vertices in the vertex buffer can be reused by using the index buffer. Its usage is very simple, that is, an index buffer object is added on the original basis. The following code is modified on the basis of the first **interleaved vertex buffer** case.

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
mesh.setVertexBufferBinding(vertexBuffer, 16);

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