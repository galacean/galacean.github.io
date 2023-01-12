---
order: 2.1
title: glTF 模型
type: 编辑器
group: 组件
label: 编辑器/组件
---

## 介绍

我们在[ 模型资产](${docs}editor-resource-gltf-cn) 教程里面创建了 glTF 模型资产，但是这个时候它还仅仅是个资产，并没有在场景中渲染。 Oasis 通过 [网格渲染器](${docs}mesh-renderer-cn) 渲染模型，在编辑器的操作为给节点添加一个 **glTF 模型** 组件。

## 使用

1.**上传 glTF 资产。** 详细步骤见[ 模型资产教程](${docs}editor-resource-gltf-cn)。

2.**置入场景** 

直接将模型拖拽至场景窗口，或者节点树相应的层级下面：

![img](https://gw.alipayobjects.com/zos/OasisHub/e16be3d5-1e74-4a87-9cbf-1e64408de608/1673516227645-101c76d5-2d8f-4ebe-b299-c416bc082f6c.gif)


> 一般情况下，渲染的模型是有纹理细节的，即材质会自动绑定相应的纹理，如基础纹理；如果没有，则说明 glTF 文件本身没有绑定纹理，开发者需要根据需求手动进行绑定。材质调试详见 [材质资产](${docs}editor-material-cn) 教程。

3.**操作动画。** 模型置入场景后，可以基于模型做很多操作，比如可以通过绑定 `AnimatorController` 资源进行动画的控制，详见 [动画编辑](${docs}editor-animator-cn) 教程。
