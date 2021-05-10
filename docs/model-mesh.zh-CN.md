---
order: 5
title: Model Mesh
type: 组件
---

`ModelMesh` 是为开发者快速自定义网格设计的类，简单易用。可以方便地定义顶点、顶点索引、颜色、UV、法线等信息。

<playground src="model-mesh.ts"></playground>

## 代码示例

```TypeScript
const entity = rootEntity.createChild('mesh-example');
const meshRenderer = entity.addComponent(MeshRenderer);

const modelMesh = new ModelMesh(engine);
modelMesh.addSubMesh(0, 6);

// 设置顶点数据
const positions = modelMesh.getPositions();
positions.push(
  new Vector3(-1.0, -1.0,  1.0),
  new Vector3( 1.0, -1.0,  1.0),
  new Vector3( 1.0,  1.0,  1.0),
  new Vector3( 1.0,  1.0,  1.0),
  new Vector3(-1.0,  1.0,  1.0),
  new Vector3(-1.0, -1.0,  1.0)
);
modelMesh.setPositions(positions);
// 上传数据
modelMesh.uploadData(false);

meshRenderer.mesh = modelMesh;
meshRenderer.setMaterial(new UnlitMaterial(engine));
```

## 详细介绍

`ModelMesh` 的使用分有三步：

1. 添加 SubMesh

[SubMesh](${api}core/SubMesh) 包含了主要的绘制信息。调用 [addSubMesh](${api}core/ModelMesh#addSubMesh) 添加。

```TypeScript
modelMesh.addSubMesh(new SubMesh(0, 2, MeshTopology.Triangles));
```

2. 设置数据

**注意要调用 `set` 方法**

```TypeScript
const positions = modelMesh.getPositions();
positions.push(
  new Vector3(-1.0, -1.0,  1.0),
  new Vector3( 1.0, -1.0,  1.0),
  new Vector3( 1.0,  1.0,  1.0),
  new Vector3( 1.0,  1.0,  1.0),
  new Vector3(-1.0,  1.0,  1.0),
  new Vector3(-1.0, -1.0,  1.0)
);
modelMesh.setPositions(positions);

modelMesh.setColors(
  [
    new Color(1, 0, 0),
    new Color(1, 1, 0),
    new Color(0, 1, 1),
    new Color(0, 1, 0),
    new Color(0, 1, 1),
    new Color(1, 0, 1),
  ]
);
```

设置数据的 API 有：

| API            | 说明                   |
| -------------- | ---------------------- |
| [setPositions](${api}core/ModelMesh#setPositions)   | 设置顶点坐标           |
| [setIndices](${api}core/ModelMesh#setIndices)     | 设置索引数据           |
| [setNormals](${api}core/ModelMesh#setNormals)     | 设置逐顶点法线数据     |
| [setColors](${api}core/ModelMesh#setColors)      | 设置逐顶点颜色数据     |
| [setTangents](${api}core/ModelMesh#setTangents)    | 设置逐顶点切线         |
| [setBoneWeights](${api}core/ModelMesh#setBoneWeights) | 设置逐顶点骨骼权重     |
| [setBoneIndices](${api}core/ModelMesh#setBoneIndices) | 设置逐顶点骨骼索引数据 |
| [setUVs](${api}core/ModelMesh#setUVs)         | 设置逐顶点 uv 数据     |

可以根据所需数据设置。

3. 上传数据

调用 [uploadData](${api}core/ModelMesh#uploadData) 方法。

如果不再需要修改 `ModelMesh` 数据：

``` TypeScript
modelMesh.uploadData(false);
```

如果需要持续修改 `ModelMesh` 数据：

``` TypeScript
modelMesh.uploadData(true);
```


