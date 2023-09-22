---
order: 2
title: 层级面板
type: 界面
label: Editor-Interface
---

<figure style="float: right;position: relative; z-index: 2;display:flex;flex-direction:column;width:380px;align-items:center;">
  <img alt="Hierarchy Pane" src="https://mdn.alipayobjects.com/huamei_fvsq9p/afts/img/A*5MalSpvfv7kAAAAAAAAAAAAADqiTAQ/original" >
  <figcaption style="text-align:center; color: #889096;font-size:12px">Hiearchy Pane</figcaption>
</figure>

层级面板位于编辑器的最左侧，它以树状结构显示当前场景中的所有节点，场景节点是所有其他节点的父节点，包括相机、灯光、网格等等。在节点面板上方有一个搜索框，可以模糊搜索场景中的节点，来快速定位。通过节点面板，你可以添加或删除节点，通过拖拽的方式来排序从而更好的组织节点。

## 节点的新增和删除

### 新增节点

要新增节点，你可以点击节点面板上的添加按钮，或右键某个节点后选择添加子节点。添加完成后，你可以在检查器面板中对新节点的属性进行编辑。

> 如果使用新增节点按钮, 你还可以快速创建立方体/球体等基本模型

### 删除节点

选中一个节点后，可以点击节点面板上的删除按钮或通过右键菜单中的删除选项来删除节点。删除节点会删除节点及其所有的子节点。所以在删除节点时，你需要注意所删除的节点是否会影响场景中其他节点。

## 节点排序

为了更好的组织节点，你可以通过拖拽的方式来排序节点。选中一个节点后，可以通过鼠标左键拖拽来改变节点在层级树中的位置。

> glTF 模型节点不能够调整 scale 属性, 所以通常情况下, 你需要把 glTF 节点拖拽到一个 entity 节点下, 然后调整 entity 节点的 scale 属性。有关 glTF 详细的介绍可参见后续章节。

## 节点搜索

节点面板上方有一个搜索框，用户可以输入节点的名称来搜索场景中的节点。搜索框支持模糊搜索，你可以输入节点名称的部分字符来查找节点。

## 节点隐藏

每个实体节点右侧都有一个眼睛按钮，点击可以切换节点在场景中的显示/隐藏状态。

> 需要注意的是, 此处对节点显示状态的调整仅是工作区的修改, 而非在检查器面板中的 `isActive` 的属性。