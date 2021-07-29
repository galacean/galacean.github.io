---
order: 7

title: glTF Model

type: Editor
---

## Introduce

We created the glTF model resource in the [glTF resource tutorial](${docs}editor-resource-gltf) tutorial, but at this time it is only an resource and is not rendered in the scene. Oasis renders the model through [Mesh Renderer](${docs}mesh-renderer), and the operation in the editor is to add a **GLTF model** component to the node.

## Use

1.**Upload glTF resource.** For detailed steps, see [glTF resource tutorial](${docs}editor-resource-gltf).

2.**Bind to glTF model component.** After the resource is successfully uploaded, the glTF model, texture and other resources will be displayed in the resource panel. Then, we create a node, and **add component** in the node inspector on the right, select **GLTF model**, then bind the corresponding `.gltf` resource in the resource panel, then the model is rendered .

![bind-gif](https://gw.alipayobjects.com/zos/OasisHub/8d8c2197-ad95-46c0-98b1-2beadba0535b/bind-gif.gif)

> Generally, the rendered model has texture details, that is, the material will automatically bind the corresponding texture, such as the `baseTexture`; if not, it means that the glTF file itself does not bind the texture, and the developer needs to manually bind it according to the requirements. For details on material debugging, please refer to the [Material tutorial](${docs}editor-material).

3.**Control animation.** If the bound glTF model contains animation, then we can also set **animation clip** and **loop mode** in the model component.

![animation](https://gw.alipayobjects.com/zos/OasisHub/0105f8dd-3e24-4127-8075-e1df34c2ab71/animation.gif)
