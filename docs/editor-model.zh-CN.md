---
order: 7
title: 上传 3D 模型
type: 编辑器
---

编辑器支持导入 **glTF**、**FBX** 两种模型格式：

- **FBX 格式：**在游戏引擎 Unity3D 或 UE4 中，我们经常会使用到这种模型格式，这种格式的解析需要使用 Autodesk 的 SDK。FBX 格式内包含了骨骼动画等信息。

- **glTF 格式：**[glTF](https://www.khronos.org/gltf/) (GL Transmission Format) 是一种面向高效传输的 3D 资源格式标准，目标是成为 3D 领域内的 JPEG，从 2015 年发布 1.0 版本以来，已经得到了业界的广泛认可。 `.gltf` 实际上是一个 JSON 文件，它主要描述了节点结构和 PBR 材质纹理等内容，而模型顶点和动画等信息则在相应的 `.bin` 文件中。从 glTF 的描述中，你就已经能看出它就是为 Web 而生的格式，所以 glTF 也正是我们推荐的模型格式。虽然编辑器支持 `.gltf` 、 `.glb` ( `.gltf` 的压缩格式)、 `.fbx` 等多格式模型导入，但实际上这些模型资源最终都会被转换为 glTF 格式，并保存在云端。

## 使用

1. glTF 格式的资源实际上包括了 `.gltf` 文件、 `.bin` 文件以及模型贴图等文件，所以我们需要将其先压缩成一个 `zip`包再上传。

>️ zip 打包的时候，要选中所有资源（`.gltf` 文件、 `.bin` 文件以及模型贴图），右击选择压缩x个项目”，不要选择外层文件夹打包。

可以选择以下两种方式上传：

  1. 直接把 *.zip* 拖进编辑器的资源面板即可完成上传（推荐）；
  2. 在编辑器下方的资源面板中选择上传 *模型*。

![image.png](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*a0RWSqragr4AAAAAAAAAAAAAARQnAQ)

2. 在资源上传成功后，资源的模型、贴图等内容会被展示在资源面板当中。然后，我们创建一个节点，并在右侧节点检查器中 *添加能力* ，选择 *GLTF模型*：

![image.png](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*4MwCR7zcnZsAAAAAAAAAAAAAARQnAQ)

3. 在资源面板中选择相应的 `.gltf` 文件，模型就渲染出来了。

![image.png](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*IlPxQpLKzd8AAAAAAAAAAAAAARQnAQ)

> 一般情况下，如果模型绑定的纹理路径正确，纹理也会自动赋到材质上。如果路径不正确则需要开发者自己绑定纹理。
