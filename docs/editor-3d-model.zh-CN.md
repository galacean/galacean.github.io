---
order: 1
title: 模型
type: 功能
group: 3D 渲染
label: Editor-Feature/Rendering-3d
---

## 简介

模型是场景搭建中的第一步，只有置入了模型，我们才能在场景中看到 3D 物体。编辑器提供了两种方式置入模型：

## 1. 网格渲染器（MeshRenderer）

- 添加"网格渲染器"组件

![image-20230314165306913](https://gw.alipayobjects.com/zos/OasisHub/31a34ce1-af64-43e4-ad2a-cee31244ac1f/image-20230314165306913.png)

- 通过选取当前场景的**网格**和**材质**，可以将模型渲染到场景中。

![image-20230314165520164](https://gw.alipayobjects.com/zos/OasisHub/0da50e72-1a3a-4b67-939d-ac48d8220a07/image-20230314165520164.png)

- 属性

| 属性     | 说明                                                          |
| -------- | ------------------------------------------------------------- |
| 网格     | 选取项目中的网格，描述顶点信息（位置，拓扑，顶点颜色，UV 等） |
| 材质     | 选取项目中的材质，描述材质信息                                |
| 接受阴影 | 当前渲染器是否接受阴影（默认接受）                            |
| 投射阴影 | 当前渲染器是否投射阴影（默认投射）                            |

## 2. 建模软件导出（FBX、glTF）

编辑器目前支持导入 **glTF** 或者 **FBX** 格式的模型，但是最后编辑器都会转换成运行时也可以解析的[ glTF 格式](${docs}gltf-cn)。

### 上传模型

1.**准备模型资源。**

- 建模软件导出，比如 [Blender 导出](https://docs.blender.org/manual/en/2.80/addons/io_scene_gltf2.html)
- 模型网站下载，比如 [Sketchfab](https://sketchfab.com/)

2.**上传模型。** 可以选择以下两种方式上传：

- 直接把模型文件或者 **.zip** 拖进编辑器的资源面板即可完成上传（**推荐**）；

- 在编辑器下方的资源面板中选择上传 **模型**。

![image-20230314172050117](https://gw.alipayobjects.com/zos/OasisHub/b290f1b9-b37d-42f5-9e23-9379477c7715/image-20230314172050117.png)

3.**预览模型相关资产。** 在资源上传成功后，模型资源的网格、贴图、动画、材质等内容都会被展示在资源面板当中：

![image-20230314172429370](https://gw.alipayobjects.com/zos/OasisHub/fb349d82-8426-41ea-a08d-f17c81a1415a/image-20230314172429370.png)

如果素材很多，还可以使用编辑器的筛选/查找功能。

<img src="https://gw.alipayobjects.com/zos/OasisHub/05e8160f-dfd0-4934-897e-8b02b62e3e16/image-20230314172609709.png" alt="image-20230314172609709" style="zoom:50%;" />

4.**更多信息。** 检查器面板还支持预览模型+动画，查看 url 地址，面数，drawcall 等信息，绑定材质等功能。

<img src="https://gw.alipayobjects.com/zos/OasisHub/259de860-4235-4b30-9019-afff5c97f92c/image-20230314172832874.png" alt="image-20230314172832874" style="zoom:50%;" />

### 置入场景

上传完模型之后，场景并不会自动渲染该模型，我们可以将模型拖拽至场景窗口，或者节点树相应的层级下面：

![gltf](https://gw.alipayobjects.com/zos/OasisHub/31409c35-a87d-4fa9-8adb-eb2631aef579/gltf.gif)

模型置入场景后，可以基于模型做很多操作，比如可以通过绑定 `AnimatorController` 资源进行动画的控制，详见 [动画编辑](${docs}editor-animator-cn) 教程。

### 修改材质

一般情况下，模型已经自动绑定好材质和相应的纹理，用户可以不用做任何操作；但是在一定场景下，开发者可能想要手动微调材质，比如修改颜色，那么我们可以将原材质进行复制，即点击 `duplicate & remap`，然后就可以在原材质参数的基础上进行修改：

![image-20230314173444590](https://gw.alipayobjects.com/zos/OasisHub/cc2a5ed7-9e0f-4102-b4dc-576bb33794e4/image-20230314173444590.png)

当然，您也可以手动创建新的材质球进行绑定:

![material](https://gw.alipayobjects.com/zos/OasisHub/d30331a5-0247-4501-820c-66fe27606678/material.gif)

> 更多材质调试详见下一节 [材质](${docs}editor-3d-material-cn) 教程。
