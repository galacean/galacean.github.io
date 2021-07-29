---
order: 7

title: glTF resource

type: Editor
---

## Introduce

Oasis Editor currently supports importing `glTF` and `FBX` two model formats, but in the end they will all be converted to glTF format.

The glTF model is a 3D resource format standard for efficient transmission. It is actually a JSON file that contains data structures such as scenes, renderers, and animations. For details, please refer to [glTF resource tutorial](${docs}gltf).

## Use

1.**Prepare glTF resources.** The resources of glTF format are flexible, and there are usually several combinations as follows:

- `.gltf` + `images`
- `.glb`
- `.gltf` + `.bin` + `images`

If it is a single file, just drag and drop; if it is multiple files, you need to package it into `.zip` and then drag and drop.

> When zip packaging, you must select all resources, right-click and choose to "compress x items", do not select the outer folder for packaging.

![gltf](https://gw.alipayobjects.com/zos/OasisHub/28f36b3d-8463-4da3-b458-047a4155d3b3/gltf.gif)

2.**Upload the glTF model.** You can choose to upload in the following two ways:

- Simply drag the model file or **.zip** into the resource panel of the editor to complete the upload (**recommended**);

- Select upload **model** in the resource panel at the bottom of the editor.

![image-20210719120746843](https://gw.alipayobjects.com/zos/OasisHub/14d4a8ab-67fc-4671-9694-9bf797c444ca/image-20210719120746843.png)

3.**Preview thumbnails.** After the resource is uploaded, the 3D model, texture and other resources will be displayed in the resource panel.

![image-20210719162230883](https://gw.alipayobjects.com/zos/OasisHub/d5626811-f20e-4b84-aa28-7c6909dc607b/image-20210719162230883.png)

> In general, the material will automatically bind the corresponding texture, such as the `baseTexture`; if not, it means that the glTF file itself is not bound to the texture, and the developer needs to manually bind it according to the requirements. For details on material debugging, please refer to the [Material Assets](${docs}editor-material) tutorial.

If the model is complex and the number of resources is relatively large, you can use the **filter** function of the editor.

![image-20210719170606534](https://gw.alipayobjects.com/zos/OasisHub/f0cf8db3-d89a-4a35-96cc-4561626a86f4/image-20210719170606534.png)

4.**More configuration.** The editor supports secondary processing of uploaded model resources. For example, we can compress glTF resources:

![image-20210719181013426](https://gw.alipayobjects.com/zos/OasisHub/27e2419c-1d8b-4f7e-9d17-4390c7255bba/image-20210719181013426.png)

can also replace the material of the glTF model:

![image-20210719180514914](https://gw.alipayobjects.com/zos/OasisHub/c27f9f28-80cf-4167-bc57-0767d9e1b58e/image-20210719180514914.png)
