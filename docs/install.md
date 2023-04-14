---
order: 0
title: 0. Install Galacean Engine
type: Introduction
group: Basic
label: Introduction/Basic
---

## How to Install

### NPM

**Galacean Engine** is a set of web first and mobile first interactive engine, using [Typescript](https://www.typescriptlang.org/) Written.The core functions are provided by [Galacean Engine](https://www.npmjs.com/package/@galacean/engine), and the advanced functions of non core and partial business logic customization are provided by [Galacean Toolkit](https://github.com/galacean/engine-toolkit). It is recommended to install them through [NPM](https://docs.npmjs.com/):

1. Install 

   Engine

```bash
npm install --save @galacean/engine
```

Engine toolkit

```bash
npm install --save @galacean/engine-toolkit-controls
```



2. import 

   Engine

```typescript
import { WebGLEngine, Camera } from "@galacean/engine";
```

Engine toolkit

```typescript
import { OrbitControl } from "@galacean/engine-toolkit-controls";

```



### Create Galacean App

If you just want to quickly create a project, it is recommended that you use [create-galacean-app](https://github.com/galacean/create-galacean-app), which provides some commonly used frameworks such as [ React](https://reactjs.org/), [Vue](https://vuejs.org/) and other templates. Examples of usage are as follows:

![npm-init](https://gw.alipayobjects.com/zos/OasisHub/b5bdc167-1d83-48a1-b826-bee43c2f1264/npm-init.gif)


## Package structure

The core architecture logic and core functions of the engine are provided by Galacean Engine, including the following sub packages:

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

### Engine package
Engine core architecture logic and core functions ([Galacean Engine](https://www.npmjs.com/package/@galacean/engine)), including the following sub-packages:

|Main Package|Explanation|API|
|:--|:--|--|
|[@galacean/core](https://www.npmjs.com/package/@galacean/core)| Engine core, such as component system |[API](${api}core/index)|
|[@galacean/loader](https://www.npmjs.com/package/@galacean/loader)| Resource loading |[API](${api}loader/index)|
|[@galacean/rhi-webgl](https://www.npmjs.com/package/@galacean/rhi-webgl)| WebGL Rendering Hardware Interface|[API](${api}rhi-webgl/index)|
|[@galacean/math](https://www.npmjs.com/package/@galacean/math)| Math Library |[API](${api}math/index)|
|[@galacean/design](https://www.npmjs.com/package/@galacean/design)| Engine basic design specifications, such as cloning specifications, destruction specifications, RHI specifications|[API](${api}design/index)|
|[@galacean/physics-lite](https://www.npmjs.com/package/@galacean/physics-lite)| Lightweight physics engine |[API](${api}physics-lite/index)|
|[@galacean/physics-physx](https://www.npmjs.com/package/@galacean/physics-physx)| Full-featured physics engine |[API](${api}physics-physx/index)|
|[@galacean/draco](https://www.npmjs.com/package/@galacean/draco)| Draco model compression |[API](${api}draco/index)|



### Engine tookit package

Non core functions and partial business logic customization functions are provided by Galacean Engine toolkit package:

Please check the list of completed functions https://github.com/galacean/engine-toolkit/tree/main

|Expansion Pack|Explanation|API|
|:--|:--|:--|
|[@galacean/engine-toolkit-controls](https://www.npmjs.com/package/@galacean/engine-toolkit-controls)| Controller |[Doc](${docs}controls)|
|[@galacean/engine-toolkit-framebuffer-picker](https://www.npmjs.com/package/@galacean/engine-toolkit-framebuffer-picker)| Framebuffer Picking|[Doc](${docs}framebuffer-picker)|
|[@galacean/engine-toolkit-stats](https://www.npmjs.com/package/@galacean/engine-toolkit-stats)| Engine Statistics Panel |[Doc](${docs}stats)|
|......|  ||



### Else

| Expansion Pack                                               | Explanation      | API                  |
| :----------------------------------------------------------- | :--------------- | :------------------- |
| [@galacean/engine-spine](https://www.npmjs.com/package/@galacean/engine-spine) | Spine Animation  | [Doc](${docs}spine)  |
| [@galacean/lottie](https://www.npmjs.com/package/@galacean/lottie) | Lottie Animation | [Doc](${docs}lottie) |