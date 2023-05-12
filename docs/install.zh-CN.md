---
order: 0
title: 安装 Galacean Engine
type: 快速入门
group: 基础
label: Introduction/Basic
---

**Galacean Engine** 是一套 Web 为先，移动优先的互动引擎，使用 [Typescript](https://www.typescriptlang.org/) 编写。核心功能由 [Galacean Engine](https://www.npmjs.com/package/@galacean/engine) 提供，非核心和偏业务逻辑定制的高级功能由 [Galacean Toolkit](https://github.com/galacean/engine-toolkit) 提供。

<a href="https://github.com/ant-galaxy/oasis-engine/stargazers" target='_blank'>
   <img src="https://img.shields.io/github/stars/ant-galaxy/oasis-engine?style=social" alt="github stars" />
</a>
<a href="https://www.npmjs.com/package/oasis-engine" target='_blank'>
   <img src="https://img.shields.io/npm/dm/oasis-engine.svg" alt="npm download" />
</a>

## 安装方式

### NPM

推荐通过 [NPM](https://docs.npmjs.com/) 的方式进行安装：

1. 安装

   Engine 

```bash
npm install --save @galacean/engine
```

​	  Engine toolkit 

```bash
npm install --save @galacean/engine-toolkit-controls
```



2. 引入

   Engine

```typescript
import { WebGLEngine, Camera } from "@galacean/engine";
```

​       Engine toolkit 

```typescript
import { OrbitControl } from " @galacean/engine-toolkit-controls";
```



### Create Galacean App

如果你只是想在本地快速完成一个 Demo， 推荐你使用 [create-galacean-app](https://github.com/galacean/create-galacean-app)， 它提供了一些常用的框架如 [React](https://reactjs.org/)、[Vue](https://vuejs.org/) 等模板。使用示例如下：

![npm-init](https://mdn.alipayobjects.com/huamei_jvf0dp/afts/img/A*qjIXR6Epk-AAAAAAAAAAAAAADleLAQ/original)


## 包结构

为了保证引擎的轻量化，我们将引擎包通过 monorepo 的形式划分为：


```mermaid
flowchart LR
   Engine(<a href='https://github.com/galacean/engine'>galacean-engine</a>) --- Core("@galacean/engine-core")
   Engine --- Loader("@galacean/engine-loader")
   Engine --- Math("@galacean/engine-math")
   Engine --- RHI("@galacean/engine-rhi-webgl")
   Engine --- Design("@galacean/engine-design")
   Engine --- PhysicsPhysx("@galacean/engine-physics-physx")
   Engine --- PhysicsLite("@galacean/engine-physics-lite")

   Toolkit(<a href='https://github.com/galacean/engine-toolkit'>galacean-toolkit</a>) --- Controls("@galacean/engine-toolkit-controls")
   Toolkit --- Stats("@galacean/engine-toolkit-stats")
   Toolkit --- FramebufferPicker("@galacean/engine-toolkit-framebuffer-picker")
   Toolkit --- AuxiliaryLines("@galacean/engine-toolkit-auxiliary-lines")
   Toolkit --- Outline("@galacean/engine-toolkit-outline")
   Toolkit --- PlanarShadowMaterial("@galacean/engine-toolkit-planar-shadow-material")
```

### 引擎包
引擎核心架构逻辑和核心功能由 galacean-engine 提供，包含以下子包：

| 功能                                                                                     | 解释                                               | API                              |
| :--------------------------------------------------------------------------------------- | :------------------------------------------------- | -------------------------------- |
| [@galacean/engine-core](https://www.npmjs.com/package/@galacean/engine-core)                   | 引擎核心，如组件系统                               | [API](${api}core/index)          |
| [@galacean/engine-loader](https://www.npmjs.com/package/@galacean/engine-loader)               | 资源加载                                           | [API](${api}loader/index)        |
| [@galacean/engine-rhi-webgl](https://www.npmjs.com/package/@galacean/engine-rhi-webgl)         | WebGL 渲染硬件接口（Rendering Hardware Interface） | [API](${api}rhi-webgl/index)     |
| [@galacean/engine-math](https://www.npmjs.com/package/@galacean/engine-math)                   | 数学库                                             | [API](${api}math/index)          |
| [@galacean/engine-design](https://www.npmjs.com/package/@galacean/engine-design)               | 引擎基础设计规范，如克隆规范、销毁规范、RHI规范    | [API](${api}design/index)        |
| [@galacean/engine-physics-lite](https://www.npmjs.com/package/@galacean/engine-physics-lite)   | 轻量级物理引擎                                     | [API](${api}physics-lite/index)  |
| [@galacean/engine-physics-physx](https://www.npmjs.com/package/@galacean/engine-physics-physx) | 全功能物理引擎                                     | [API](${api}physics-physx/index) |
| [@galacean/engine-draco](https://www.npmjs.com/package/@galacean/engine-draco)                 | Draco 模型压缩                                     | [API](${api}draco/index)         |



### 引擎工具包

非核心功能和偏业务逻辑定制功能由 galacean-toolkit 包提供：

完成功能列表请查看 https://github.com/galacean/engine-toolkit/tree/main

| 功能                                                                                                               | 解释         | API                              |
| :----------------------------------------------------------------------------------------------------------------- | :----------- | :------------------------------- |
| [@galacean/engine-toolkit-controls](https://www.npmjs.com/package/@galacean/engine-toolkit-controls)                     | 控制器       | [Doc](${docs}controls)           |
| [@galacean/engine-toolkit-framebuffer-picker](https://www.npmjs.com/package/@galacean/engine-toolkit-framebuffer-picker) | 帧缓冲拾取   | [Doc](${docs}framebuffer-picker) |
| [@galacean/engine-toolkit-stats](https://www.npmjs.com/package/@galacean/engine-toolkit-stats)                           | 引擎统计面板 | [Doc](${docs}stats)              |
| ......                                                                                                             |              |                                  |



### 其他

| 功能                                                                                   | 解释        | API                     |
| :------------------------------------------------------------------------------------- | :---------- | :---------------------- |
| [@galacean/engine-spine](https://www.npmjs.com/package/@galacean/engine-spine) | Spine 动画  | [Doc](${docs}spine-cn)  |
| [@galacean/engine-lottie](https://www.npmjs.com/package/@galacean/engine-lottie)             | Lottie 动画 | [Doc](${docs}lottie-cn) |

## Oasis 替换为 Galacean

如果您的项目正在使用 Oasis 进行开发，并且希望升级为 Galacean，可以参考以下步骤：

### 安装

```bash
// 由 @crazylxr 提供
npx galacean-codemod
```

### 更新依赖

```bash
rm -rf ./node_modules  && npm install
```

注：执行 `galacean-codemod` 指令会依据 [`packageReplacements`](https://github.com/crazylxr/galacean-codemod/blob/main/src/packageReplacements.json) 配置:
- 遍历同目录下 `src` 文件夹内的脚本文件替换 `import` 引用
- 更新同目录下 `package.json` 文件更新依赖关系
- 自动替换后还需开发者自行检查项目是否正确运行
- 若有遗漏或优化，欢迎提 [ISSUE](https://github.com/crazylxr/galacean-codemod/issues) 或 [PR](https://github.com/crazylxr/galacean-codemod/pulls) 