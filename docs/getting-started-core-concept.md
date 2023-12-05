---
order: 1
title: 核心概念
type: 基础知识
group: 快速上手
label: Basics/GettingStarted
---

## Scene

## Entity

## 坐标系统与变换

## 灯光

## 相机

## 图层


### 创建立方体

首先，我们在 **层级面板** 中创建一个新的实体（[什么是实体？](https://galacean.antgroup.com/#/docs/latest/cn/entity)）。

<img src="https://gw.alipayobjects.com/zos/OasisHub/21284e97-8e62-4453-be70-a21047ae7351/image-20230921161422138.png" alt="image-20230921161422138" style="zoom:50%;" />

我们用鼠标左键选中新建的实体节点，此时右侧的检查器面板会显示出当前实体的一些可配置属性。因为我们的实体现在没有绑定任何组件（[什么是组件？](https://galacean.antgroup.com/#/docs/latest/cn/entity)），所以我们暂时只能调整实体的坐标信息这类的基础属性。

接下来，我们点击检查器面板中的 `Add Component` 按钮唤起组件选单，然后选择添加 `Mesh Renderer` 组件（什么是 [Mesh Renderer?](https://galacean.antgroup.com/#/docs/latest/cn/mesh-renderer)）。

<img src="https://gw.alipayobjects.com/zos/OasisHub/c9cc9c6d-07e9-41ba-a01f-2cd9d3c610ff/image-20230921161622497.png" alt="image-20230921161622497" style="zoom:50%;" />

这样，我们就给当前的实体新增了一个 `Mesh Renderer` 组件。但我们在主编辑区还看不到这个物体。需要为该组件添加 Mesh 和 Material 才行。编辑器会默认为 `Mesh Renderer` 组件添加一个不可编辑的默认材质，我们只需要为组件的 Mesh 属性添加一个 Cuboid Mesh 就可以在场景中看到它了。

<img src="https://gw.alipayobjects.com/zos/OasisHub/b63b8bbd-048e-4dbb-8c91-02421a364b3b/image-20230921161758541.png" alt="image-20230921161758541" style="zoom:50%;" />

默认的材质比较简单，所以接下来，我们来创建一个自定义的材质。

你也可以通过添加实体按钮中的 `3D Object` → `Cuboid` 来快速添加一个立方体模型，它会自动帮你添加一个 `Mesh Renderer` 组件：

<img src="https://gw.alipayobjects.com/zos/OasisHub/d213fa73-e29a-4808-9753-d5977d19ab9b/image-20230921164949519.png" alt="image-20230921164949519" style="zoom:50%;" />

### 创建材质

首先，我们来上传纹理。我们可以把这些纹理文件直接拖动到 **资产管理面板，** 既可批量上传这些文件。

上传后，我们可以在面板中看到这些文件，依次是粗糙度纹理、法线纹理、基础颜色纹理。

<img src="https://gw.alipayobjects.com/zos/OasisHub/81ad7299-158b-4347-8e67-86b835980a04/image-20230921172453377.png" alt="image-20230921172453377" style="zoom:50%;" />

我们首先在 **资产管理面板** 中依次选择 `右键` → `Create` → `Material` 让编辑器会创建出一个默认的 PBR 材质。我们选中这个材质，此时检查器面板会显示当前材质的配置选项。默认的材质比较简单，我们可以为这个材质增加一些纹理贴图，如基础纹理、粗糙度纹理、法线贴图。

<img src="https://gw.alipayobjects.com/zos/OasisHub/65bf4b63-3f09-4ad6-abc9-a9d26e173783/image-20230921173056885.png" alt="image-20230921173056885" style="zoom:50%;" />

接下来，我们把这些贴图配置到材质的对应属性当中。配置后我们再次选择上一步创建的实体节点，将 `Mesh Renderer` 组件的 `Material` 属性修改为我们刚刚创建的自定义材质。一个拥有金属质感的立方体就创建成功了。

<img src="https://mdn.alipayobjects.com/huamei_fvsq9p/afts/img/A*ni3KQ7jGK-0AAAAAAAAAAAAADqiTAQ/original" alt="Untitled" style="zoom:50%;" />

只不过，立方体现在看上去有点暗，需要把场景中的 [灯光](https://galacean.antgroup.com/#/docs/latest/cn/light) 调亮一点。我们在节点树中选择 `DirectLight` 节点，然后在检查器中调高 `Intensity`（光强度）属性。

现在看上去就比较正常了。
<img src="https://mdn.alipayobjects.com/huamei_fvsq9p/afts/img/A*n151R6vZ59oAAAAAAAAAAAAADqiTAQ/original" alt="Untitled" style="zoom:50%;" />

