---
order: 0
title: 开始
type: 快速入门
group: 开始
label: Introduction/Start
---

## 总览

**Galacean** 是一套 Web 为先，移动优先，开源共建的实时互动解决方案，采用组件化架构与 [Typescript](https://www.typescriptlang.org/) 编写。它包含了[渲染](${docs}material-PBR)、[物理](${docs}physics-overall)、[动画](${docs}animator)和[交互](${docs}input)功能，并提供了具备完善工作流的可视化在线编辑器，帮助你在浏览器上创作绚丽的 2D/3D 互动应用。

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

**Galacean Engine** 可以在支持 WebGL 的环境下运行，到目前为止，所有主流的移动端浏览器与桌面浏览器都支持这一标准。可以在 [CanIUse](https://caniuse.com/?search=webgl) 上检测运行环境的兼容性。

![npm-init](https://mdn.alipayobjects.com/huamei_jvf0dp/afts/img/A*6L31Qa7bpXkAAAAAAAAAAAAADleLAQ/original)

此外，**Galacean Engine** 还支持在[支付宝/淘宝小程序](${docs}miniprogram)中运行，同时也有开发者在社区贡献了[微信小程序/游戏的适配方案](https://github.com/deepkolos/platformize)。

对于一些需要额外考虑兼容性的功能模块，当前的适配方案如下：

| 模块                            | 兼容考虑                                                 | 具体文档                                                                                |
| :------------------------------ | :------------------------------------------------------- | :-------------------------------------------------------------------------------------- |
| [鼠标与触控](${docs}input)      | [PointerEvent](https://caniuse.com/?search=PointerEvent) | 兼容请参照 [polyfill-pointer-event](https://github.com/galacean/polyfill-pointer-event) |
| [PhysX](${docs}physics-overall) | [WebAssembly](https://caniuse.com/?search=wasm)          | 运行环境需支持 WebAssembly                                                              |

## 工作流程

如果你希望以纯代码的形式启动一个小型项目，可以参照[安装 Galacean Engine](${docs}install) 进行快速搭建。但对于较为复杂的项目，我们**更推荐使用编辑器可视化开发**，因为**通过编辑器可以让技术与美术同学更好地进行协作**，你可以在[编辑器首页](https://galacean.antgroup.com/editor)通过项目模板快速开始第一个项目的开发，[更多编辑器的能力](${docs}editor)期待你的探索。

![npm-init](https://mdn.alipayobjects.com/huamei_jvf0dp/afts/img/A*sxnlS6r_q-0AAAAAAAAAAAAADleLAQ/original)

## 版本相关

### 版本管理

以 `@galacean/engine` 为例，开发者可以在 [Github](https://github.com/galacean/engine/releases) 或 [NPM](https://www.npmjs.com/package/@galacean/engine?activeTab=versions) 上查看所有可用版本，其中：

- alpha：内部测试版，用于早期功能研发，有里程碑内的新功能但稳定性较差，例如 [1.0.0-alpha.6](https://www.npmjs.com/package/@galacean/engine/v/1.0.0-alpha.6)
- beta: 公开测试版，内部测试已基本完毕，稳定性较强，但可能仍有较少的问题与缺陷，例如 [1.0.0-beta.8](https://www.npmjs.com/package/@galacean/engine/v/1.0.0-beta.8)
- stable：正式稳定版，经过长期测试和验证，无重大缺陷，可投入生产的推荐版本，例如 [0.9.8](https://www.npmjs.com/package/@galacean/engine/v/0.9.8)

### NPM 库之间的依赖关系

在同一项目中，请保证[引擎核心架构逻辑子包](https://github.com/galacean/engine/tree/main/packages)的版本一致，[工具包](https://github.com/galacean/engine-toolkit)请务必与使用引擎的大版本保持一致。

### 版本升级

每个里程碑版本更新迭代时会同步发布[版本升级引导](https://github.com/galacean/engine/wiki/Migration-Guide)，其中包含了本次更新的内容以及 BreakChange，可依据此文档进行版本的更新迭代。

## 开源共建

**Galacean** 渴望与开发者共建互动引擎，所有的开发流程，包括[规划](https://github.com/galacean/engine/projects?query=is%3Aopen)，[里程碑](https://github.com/galacean/engine/milestones)，[架构设计](https://github.com/galacean/engine/wiki/Physical-system-design)在内的信息，全部都公开在 GitHub 的项目管理中，开发者可以通过[创建 issue](https://docs.github.com/zh/issues/tracking-your-work-with-issues/creating-an-issue) 与[提交 PR](https://docs.github.com/zh/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork) 参与到引擎的建设当中。

## 社区与讨论区

如果你有疑问或者需要帮助，可以加入钉钉群（群号：31065609）或[讨论区](https://github.com/orgs/galacean/discussions)寻求帮助。
