---
order: 7

title: glTF 模型

type: 编辑器
---

## 介绍

我们在[ 模型资产](${docs}editor-resource-gltf-cn) 教程里面创建了 glTF 模型资产，但是这个时候它还仅仅是个资产，并没有在场景中渲染。 Oasis 通过 [网格渲染器](${docs}mesh-renderer-cn) 渲染模型，在编辑器的操作为给节点添加一个 **GLTF 模型** 组件。

## 使用

1.**上传 glTF 资产。** 详细步骤见[ 模型资产教程](${docs}editor-resource-gltf-cn)。

2.**绑定 glTF 模型组件。** 在资源上传成功后，资源的模型、贴图等内容会被展示在资源面板当中。然后，我们创建一个节点，并在右侧节点检查器中 **添加能力** ，选择 **GLTF 模型**，在资源面板中选择绑定相应的 `.gltf` 资产，模型就渲染出来了。

![bind-gif](https://gw.alipayobjects.com/zos/OasisHub/8d8c2197-ad95-46c0-98b1-2beadba0535b/bind-gif.gif)

> 一般情况下，渲染的模型是有纹理细节的，即材质会自动绑定相应的纹理，如基础纹理；如果没有，则说明 glTF 文件本身没有绑定纹理，开发者需要根据需求手动进行绑定。材质调试详见 [材质资产](${docs}editor-material-cn) 教程。

3.**操作动画。** 如果绑定的 glTF 模型中包含动画，那么我们还可以在模型组件里面设置**动画播放片段**和**循环模式**。

![animation](https://gw.alipayobjects.com/zos/OasisHub/0105f8dd-3e24-4127-8075-e1df34c2ab71/animation.gif)
