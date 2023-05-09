---
order: 0
title: 入门
type: 快速入门
group: 开始
label: Introduction/Start
---

## 总览

**Galacean** 是一套 Web 为先，移动优先的互动解决方案，他使用 [Typescript](https://www.typescriptlang.org/) 编写，并且严格遵循开源规范。**Galacean** 由以下部分组成：

- [Galacean Engine](https://github.com/galacean/engine)：高性能开源互动引擎。
- [Galacean Editor](https://galacean.antgroup.com/editor)：云端 Web 互动创作平台。
- [Galacean Toolkit](https://github.com/galacean/engine-toolkit)：开箱即用的开源工具包。

通过官网你可以了解更多 **Galacean** 的能力：

- 在[引擎文档](${docs}install)部分可以深入了解引擎的各项功能模块以及能力展现。
- 在[编辑器文档](${docs}editor)部分可以了解如何使用编辑器，创建，制作并导出 2D 和 3D 项目。
- 在[示例](https://antg.antgroup.com/#/examples/latest/background)部分可以浏览引擎各种功能的示例，并且在线调试查看效果。
- 在[美术文档](${docs}artist-scene-standard)部分可以查看场景规格与若干美术教程。

## 兼容性

**Galacean Engine** 可以在所有支持 WebGL 的环境下运行，在小程序上可参照[小程序](${docs}miniprogram)进行适配。此外，部分功能模块的兼容性需要额外考虑：

| 模块                            | 兼容考虑                                                 | 具体文档                                                                               |
| :------------------------------ | :------------------------------------------------------- | :------------------------------------------------------------------------------------- |
| [鼠标与触控](${docs}input)      | [PointerEvent](https://caniuse.com/?search=PointerEvent) | 兼容请参照[polyfill-pointer-event](https://github.com/galacean/polyfill-pointer-event) |
| [PhysX](${docs}physics-overall) | [WebAssembly](https://caniuse.com/?search=wasm)          | 使用 PhysX 的前提是运行环境支持 WebAssembly                                            |

## 快速搭建

如果你想用纯代码搭建第一个项目，可以通过[安装 Galacean Engine](${docs}install)快速搭建一个本地可运行的脚手架，当然，你也可以在编辑器起始页通过模版快速创建一个完整项目，导出并在本地运行。

## 版本相关

**Galacean**采用严格的版本控制，我们依据以下规则进行 npm 包的版本管理。

### 里程碑的开发阶段：

- alpha：内部测试版，用于早期功能研发，有里程碑内的新功能但稳定性较差
- beta: 公开测试版，内部测试已基本完毕，稳定性较强，但可能仍有较少的问题与缺陷
- latest：正式稳定版，经过长期测试和验证，无重大缺陷，可投入生产的推荐版本

### npm 库之间的依赖关系：

[引擎核心架构逻辑的子包](https://github.com/galacean/engine/tree/main/packages)请保证在同一项目中版本一致，[工具包](https://github.com/galacean/engine-toolkit)请务必与引擎的大版本保持一致。

### 版本升级

每个里程碑版本更新迭代时会同步发布[版本升级引导](https://github.com/galacean/engine/wiki/Migration-Guide)，其中包含了本次更新的内容以及 BreakChange，可依据此文档进行版本的更新迭代。

## 开源共建

**Galacean** 渴望与开发者共建互动引擎，所有的开发流程，包括[规划](https://github.com/galacean/engine/projects?query=is%3Aopen)，[里程碑](https://github.com/galacean/engine/milestones)，优先级，[架构设计](https://github.com/galacean/engine/wiki/Physical-system-design)在内的信息，全部都公开在 GitHub 的项目管理中，开发者可以通过[创建 issue](https://docs.github.com/zh/issues/tracking-your-work-with-issues/creating-an-issue)与[提交 PR](https://docs.github.com/zh/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork)参与到引擎的建设之中。

## 社区与讨论区

如果你有疑问或者需要帮助，可以加入钉钉群（群号：31065609）或[讨论区](https://github.com/orgs/galacean/discussions)寻求帮助。
