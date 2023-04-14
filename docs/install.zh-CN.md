---
order: 0
title: 0. 安装 Galacean Engine
type: 快速入门
group: 基础
label: Introduction/Basic
---

## 安装方式

### NPM

**Galacean Engine** 是一套 Web 为先，移动优先的互动引擎，使用 [Typescript](https://www.typescriptlang.org/) 编写。核心功能由 [Galacean Engine](https://www.npmjs.com/package/@galacean/engine) 提供，非核心和偏业务逻辑定制的高级功能由 [Galacean Toolkit](https://github.com/galacean/engine-toolkit) 提供，推荐通过 [NPM](https://docs.npmjs.com/) 的方式进行安装：

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

![npm-init](https://gw.alipayobjects.com/zos/OasisHub/b5bdc167-1d83-48a1-b826-bee43c2f1264/npm-init.gif)


## 包结构

为了保证引擎的轻量化，我们将引擎包通过 monorepo 的形式划分为：


```mermaid
flowchart LR
   Engine(<a href='https://github.com/galacean/engine'>galacean-engine</a>) --- Core("@galacean/core")
   Engine --- Loader("@galacean/loader")
   Engine --- Math("@galacean/math")
   Engine --- RHI("@galacean/rhi-webgl")
   Engine --- Design("@galacean/design")
   Engine --- PhysicsPhysx("@galacean/physics-physx")
   Engine --- PhysicsLite("@galacean/physics-lite")

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
| [@galacean/core](https://www.npmjs.com/package/@galacean/core)                   | 引擎核心，如组件系统                               | [API](${api}core/index)          |
| [@galacean/loader](https://www.npmjs.com/package/@galacean/loader)               | 资源加载                                           | [API](${api}loader/index)        |
| [@galacean/rhi-webgl](https://www.npmjs.com/package/@galacean/rhi-webgl)         | WebGL 渲染硬件接口（Rendering Hardware Interface） | [API](${api}rhi-webgl/index)     |
| [@galacean/math](https://www.npmjs.com/package/@galacean/math)                   | 数学库                                             | [API](${api}math/index)          |
| [@galacean/design](https://www.npmjs.com/package/@galacean/design)               | 引擎基础设计规范，如克隆规范、销毁规范、RHI规范    | [API](${api}design/index)        |
| [@galacean/physics-lite](https://www.npmjs.com/package/@galacean/physics-lite)   | 轻量级物理引擎                                     | [API](${api}physics-lite/index)  |
| [@galacean/physics-physx](https://www.npmjs.com/package/@galacean/physics-physx) | 全功能物理引擎                                     | [API](${api}physics-physx/index) |
| [@galacean/draco](https://www.npmjs.com/package/@galacean/draco)                 | Draco 模型压缩                                     | [API](${api}draco/index)         |



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
| [@galacean/lottie](https://www.npmjs.com/package/@galacean/lottie)             | Lottie 动画 | [Doc](${docs}lottie-cn) |