---
order: 4

title: Export Unlit Material

type: Art
label: Art
---

Such as [Baking Tutorial](${docs}artist-bake) described, if we have already made a baking texture, I hope there is a **convenient material**, the color is only affected by baking texture, do not have to add lights, do not debug the normal, don't have to debug metal roughness and other high-order properties, then you can try [UnlitMaterial](${api}core/UnlitMaterial) of Galacean, glTF has special [KHR_materials_unlit ](https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_unlit) Plugin, Galacean will resolve the plugin to generate Unlit material.

![image.png](https://gw.alipayobjects.com/zos/OasisHub/39965fc2-3fc2-44b9-a294-a04eb4441120/1623652741734-090284d5-9b1a-4db8-9231-dc3f4d188a38-20210614150743080.png)

**Test Model:**[TREX.zip](https://www.yuque.com/attachments/yuque/0/2021/zip/381718/1623651429048-7f6a3610-d5cb-4a73-97f5-0d37d0c63b2c.zip?_lake_card=%7B%22src%22%3A%22https%3A%2F%2Fwww.yuque.com%2Fattachments%2Fyuque%2F0%2F2021%2Fzip%2F381718%2F1623651429048-7f6a3610-d5cb-4a73-97f5-0d37d0c63b2c.zip%22%2C%22name%22%3A%22TREX.zip%22%2C%22size%22%3A499161%2C%22type%22%3A%22application%2Fx-zip-compressed%22%2C%22ext%22%3A%22zip%22%2C%22status%22%3A%22done%22%2C%22taskId%22%3A%22u458bcbec-d647-4328-8036-3d5eb12860f%22%2C%22taskType%22%3A%22upload%22%2C%22id%22%3A%22ua8a5baad%22%2C%22card%22%3A%22file%22%7D)

Next, explain how to use the **Blender** to export the glTF file with **Unlit** plugins.

1. Import Model

![image.png](https://gw.alipayobjects.com/zos/OasisHub/e5dbfb61-5c0c-4ca5-8c7f-bde353d4c211/1623651809057-138f49cf-6fe7-4f54-8161-c7e157ec85fd-20210614150752343.png)

2. Change Shader

The default shader type is **BSDF**, we need to modify the shader type in the material property bar **Surface** to **background**.

![image.png](https://gw.alipayobjects.com/zos/OasisHub/abf1e279-1f78-4d21-8c1f-d58d7f74992c/1623652169374-7f39e5f0-6639-4795-8565-b8f0b09420ed-20210614150804567.png)

![image.png](https://gw.alipayobjects.com/zos/OasisHub/c8c51e5f-c7c6-44a3-87e2-dc649e13fddb/1623652230768-69cd6f7e-175d-4f9f-9042-b3629d422b8e.png)

3. Add baking texture

Add baked texture to connect the Color and Shader together

![image.png](https://gw.alipayobjects.com/zos/OasisHub/50c69e7b-c099-4a2d-b546-8a55ff4f9309/1623652264008-7ae4c13c-6430-44b0-995e-2c23c9f117a7-20210614150846797.png)

![image.png](https://gw.alipayobjects.com/zos/OasisHub/6ed13e19-a9e5-4454-a0d5-ad27b3cabe14/1623652368637-6dda44be-4cde-4f65-a72f-d39b5d3f60ce.png)

![image.png](https://gw.alipayobjects.com/zos/OasisHub/e9a99c9c-f661-4666-86bc-d8e91030c0f7/1623652380351-501dd929-7f96-4578-b49a-11724a0782a7.png)

4. Export glTF

If the preview is correct, export the glTF file.

![image.png](https://gw.alipayobjects.com/zos/OasisHub/4b6b5f8f-ebd2-46af-85c7-9a26b5f66a2e/1623652403568-450291a8-1a0b-4cf4-8e71-c183a05632b0-20210614150902221.png)

![image.png](https://gw.alipayobjects.com/zos/OasisHub/1fe38185-399e-4f56-bff4-c39ba4ae3a2a/1623652462007-85b065a3-69fa-4d80-9dfd-834ef66da12a.png)

Drag the glTF file you just exported from Blender to the [glTF viewer](https://galacean.antgroup.com/#/gltf-viewer), if the material type is **UnlitMaterial**, note [KHR_materials_unlit](https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_unlit) plugin has been exported, and has been parsed into Unlit material by Galacean.

![image.png](https://gw.alipayobjects.com/zos/OasisHub/fbb6ba43-f7d7-4757-a1d3-590083d30573/1623652636074-d8bb8437-f885-43fd-8957-8e14ae9fd8c0-20210614150914493.png)
