---
order: 0 
title: 模型
type: 编辑器
group: 资产
---

## 介绍

编辑器目前支持导入 `glTF`、`FBX` 两种模型格式，但是最后其实都会转换成 glTF 格式。

glTF 模型是一种高效传输的 3D 资源格式标准，实际上是一个 JSON 文件，包含了场景、渲染器、动画等数据结构。详见[ glTF 资源教程](${docs}gltf-cn)

## 使用

1.**准备 glTF 资源。** glTF 格式的资源比较灵活，通常有如下几种组合方式：

- `.gltf` + `图片`
- `.glb`
- `.gltf` + `.bin` + `图片`

如果是单文件，直接拖拽即可；如果是多文件，需要先打包成 `.zip` 再进行拖拽。

> zip 打包的时候，要选中所有资源，右击选择压缩 x 个项目”，不要选择外层文件夹打包。

![gltf](https://gw.alipayobjects.com/zos/OasisHub/28f36b3d-8463-4da3-b458-047a4155d3b3/gltf.gif)

2.**上传 glTF 模型。** 可以选择以下两种方式上传：

- 直接把模型文件或者 **.zip** 拖进编辑器的资源面板即可完成上传（**推荐**）；

- 在编辑器下方的资源面板中选择上传 **模型**。

![image-20210719120746843](https://gw.alipayobjects.com/zos/OasisHub/14d4a8ab-67fc-4671-9694-9bf797c444ca/image-20210719120746843.png)

3.**预览缩略图。** 在资源上传成功后，资源的模型、贴图等内容会被展示在资源面板当中。

![image-20210719162230883](https://gw.alipayobjects.com/zos/OasisHub/d5626811-f20e-4b84-aa28-7c6909dc607b/image-20210719162230883.png)

> 一般情况下，材质会自动绑定相应的纹理，如基础纹理；如果没有，则说明 glTF 文件本身没有绑定纹理，开发者需要根据需求手动进行绑定。材质调试详见 [材质资产](${docs}editor-material-cn) 教程。

如果模型很复杂，资源数量比较多，可以使用编辑器的筛选功能。

![image-20210719170606534](https://gw.alipayobjects.com/zos/OasisHub/f0cf8db3-d89a-4a35-96cc-4561626a86f4/image-20210719170606534.png)

4.**更多配置。** 编辑器支持对上传的模型资源进行二次加工，比如我们可以对 glTF 资源进行压缩：

![image-20210719181013426](https://gw.alipayobjects.com/zos/OasisHub/27e2419c-1d8b-4f7e-9d17-4390c7255bba/image-20210719181013426.png)

也可以替换 glTF 模型的材质：

![image-20210719180514914](https://gw.alipayobjects.com/zos/OasisHub/c27f9f28-80cf-4167-bc57-0767d9e1b58e/image-20210719180514914.png)
