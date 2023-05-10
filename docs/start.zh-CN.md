---
order: 0
title: 入门
type: 快速入门
group: 开始
label: Introduction/Start
---

## 总览

**Galacean** 是一套 Web 为先，移动优先，开源免费的实时互动解决方案，采用组件化架构与 [Typescript](https://www.typescriptlang.org/) 编写。他包含了[渲染](${docs}material-PBR)、[物理](${docs}physics-overall)、[动画](${docs}animator)和[交互](${docs}input)功能，并提供了具备完善工作流的可视化在线编辑器。你可以在浏览器上创作 2D & 3D 复杂的互动、绚丽的效果展示以及游戏等应用。

**Galacean** 主要由三部分组成：

- [Galacean Engine](https://github.com/galacean/engine)
- [Galacean Toolkit](https://github.com/galacean/engine-toolkit)
- [Galacean Editor](https://galacean.antgroup.com/editor)

通过以下信息源可以了解更多关于 **Galacean** 的能力：

- [引擎文档](${docs}install)：深入了解引擎的各项功能模块。
- [编辑器文档](${docs}editor)：了解如何使用编辑器，创建，制作并导出 2D 和 3D 项目。
- [示例](https://antg.antgroup.com/#/examples/latest/background)：浏览引擎各种功能示例，并支持在线调试。
- [美术文档](${docs}artist-scene-standard)：查看场景规范与美术教程。

## 运行环境

**Galacean Engine** 可在浏览器与小程序环境下运行，小程序适配可参照[小程序适配文档](${docs}miniprogram)。其余需要考虑兼容性的功能模块如下：

| 模块                            | 兼容考虑                                                 | 具体文档                                                                               |
| :------------------------------ | :------------------------------------------------------- | :------------------------------------------------------------------------------------- |
| [鼠标与触控](${docs}input)      | [PointerEvent](https://caniuse.com/?search=PointerEvent) | 兼容请参照 [polyfill-pointer-event](https://github.com/galacean/polyfill-pointer-event) |
| [PhysX](${docs}physics-overall) | [WebAssembly](https://caniuse.com/?search=wasm)          | 运行环境需支持 WebAssembly                                            |

## 工作流程

如果你希望以纯代码的形式启动一个小型项目，可以参照[安装 Galacean Engine](${docs}install) 进行快速搭建。但对于较为复杂的项目，我们**更推荐使用编辑器进行可视化开发**，因为**通过编辑器可以让技术与美术同学更好地进行协作**，你可以在[编辑器首页](https://galacean.antgroup.com/editor)创建一个项目模版快速开始第一个项目的开发，[更多编辑器的能力](${docs}editor)期待你的探索。

![npm-init](https://mdn.alipayobjects.com/huamei_jvf0dp/afts/img/A*sxnlS6r_q-0AAAAAAAAAAAAADleLAQ/original)

## 版本相关

### 版本管理：
以 `@galacean/engine` 为例，开发者可以在 [Github](https://github.com/galacean/engine/releases) 或 [NPM](https://www.npmjs.com/package/@galacean/engine?activeTab=versions) 上查看所有可用版本，其中：

- alpha：内部测试版，用于早期功能研发，有里程碑内的新功能但稳定性较差
- beta: 公开测试版，内部测试已基本完毕，稳定性较强，但可能仍有较少的问题与缺陷
- latest：正式稳定版，经过长期测试和验证，无重大缺陷，可投入生产的推荐版本

### npm 库之间的依赖关系：

在同一项目中，请保证[引擎核心架构逻辑子包](https://github.com/galacean/engine/tree/main/packages)的版本一致，[工具包](https://github.com/galacean/engine-toolkit)请务必与使用引擎的大版本保持一致。

### 版本升级

每个里程碑版本更新迭代时会同步发布[版本升级引导](https://github.com/galacean/engine/wiki/Migration-Guide)，其中包含了本次更新的内容以及 BreakChange，可依据此文档进行版本的更新迭代。

## 开源共建

**Galacean** 渴望与开发者共建互动引擎，所有的开发流程，包括[规划](https://github.com/galacean/engine/projects?query=is%3Aopen)，[里程碑](https://github.com/galacean/engine/milestones)，[架构设计](https://github.com/galacean/engine/wiki/Physical-system-design)在内的信息，全部都公开在 GitHub 的项目管理中，开发者可以通过[创建 issue](https://docs.github.com/zh/issues/tracking-your-work-with-issues/creating-an-issue)与[提交 PR](https://docs.github.com/zh/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork)参与到引擎的建设当中。

## 社区与讨论区

如果你有疑问或者需要帮助，可以加入钉钉群（群号：31065609）或[讨论区](https://github.com/orgs/galacean/discussions)寻求帮助。
