---
order: 0
title: 界面总览
type: 基础知识
group: 界面
label: Basics/Interface
---

## 编辑器首页

![Untitled](https://mdn.alipayobjects.com/huamei_fvsq9p/afts/img/A*zRqTSIcsY74AAAAAAAAAAAAADqiTAQ/original)

| 序号 | 区域         | 说明                                                   |
| ---- | ------------ | ------------------------------------------------------ |
| 1    | **创建项目** | 可以新建一个 3D 项目或者 2D 项目                       |
| 2    | **项目**     | 可以查看所有的项目，双击可以进入项目                   |
| 3    | **侧边栏**   | 除了项目页，你还可以获取到项目模板，文档和编辑器讨论区 |

## 场景编辑页

<img src="https://mdn.alipayobjects.com/huamei_fvsq9p/afts/img/A*-txWQZkYIjgAAAAAAAAAAAAADqiTAQ/original" alt="SCR-20230223-klw.png" style="zoom: 50%;" />

| 序号 | 区域 | 说明 |
| --- | --- | --- |
| 1 | 侧边栏 | 包含了编辑器的主菜单，面板切换按钮以及个性化设置 |
| 2 | 层级面板 | 位于编辑器左侧，在这里会显示整个场景中的所有节点 |
| 3 | [资产面板](${docs}interface-assets) | 位于编辑器底部，其中会显示当前项目所包含的所有资产，如 HDR 贴图、各种纹理文件、脚本、字体文件等 |
| 4 | [检查器面板](${docs}interface-inspector) | 位于编辑器右侧，会根据你的当前选择二显示不同编辑选项 |
| 5 | [主编辑区](${docs}interface-viewport) | 位于编辑器中间，是编辑器的主要操作区域，可以通过鼠标和键盘来编辑场景 |
| 6 | 工具栏 | 位于编辑器顶部，这里提供了一些快速的操作如切换 Gizmo 的模式、切换场景视角，相机配置等 |
| 7 | 相机预览区 | 位于主编辑区域的左下角，在这里可以以当前选中的相机为视角来预览场景 |

对于各个面板详细的介绍可以点击上方链接查看。

## 代码编辑页

![Untitled](https://mdn.alipayobjects.com/huamei_fvsq9p/afts/img/A*3crSToI-RdAAAAAAAAAAAAAADqiTAQ/**original**)

| 序号 | 区域 | 说明 |
| --- | --- | --- |
| 1 | 文件列表 | 在这里可以查看项目中的所有脚本文件 |
| 2 | 代码编辑区 | 在这里可以编辑脚本文件，支持代码高亮，代码提示，代码格式化等功能 |
| 3 | 预览区 | 在这里可以预览当前脚本的运行效果。保存代码后会实时刷新此区域的渲染状态 |
| 4 | 事件调试区 | 代码编辑器会自动检索所有绑定到引擎中的事件并显示在这里，你可以在这里触发事件，也可以配置事件的参数 |
| 5 | 控制台 | 你可以在这里查看代码运行时的日志信息 |

想要了解更多关于代码编辑器的信息，请查看[代码编辑器](${docs}script-edit)。
