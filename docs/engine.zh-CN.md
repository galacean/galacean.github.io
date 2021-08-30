---
order: 1
title: 引擎
type: 核心
---

`Engine` 在 Oasis engine 中扮演着总控制器的角色，主要包含了**画布**、**渲染控制**和**引擎子系统管理**等三大功能：

- **画布**：主画布相关的操作，如修改画布宽高等。
- **渲染控制：** 控制渲染的执行/暂停/继续、垂直同步等功能。
- **引擎子系统管理：[场景管理](${docs}scene-cn)和[资源管理](${docs}resource-manager-cn)等。


## 初始化

初始化 Engine 需要提供 [画布](${docs}canvas-cn)（**Canvas**）和 硬件渲染层 （**HardwareRenderer**）。

Oasis 引擎封装了硬件渲染层，将不同平台的渲染能力统一管理，还可以通过 [HardwareRenderer](${api}core/IHardwareRenderer) 的构造函数，传入支持的配置来控制不同平台的渲染能力。


```typescript
const canvas = document.getElementById("canvas");
const webCanvas = new WebCanvas(canvas);
const webGLRenderer = new WebGLRenderer();
const engine = new Engine(webCanvas,webGLRenderer);
```


为了方便用户直接创建 web 端 engine，Oasis 提供了 [WebGLEngine](${api}rhi-webgl/WebGLEngine) ：

```typescript
const engine = new WebGLEngine("canvas")
```

## 属性
| 属性名称 | 属性释义 |
| --- | --- |
| [vSyncCount](${api}core/Engine#vSyncCount) | 引擎默认开启[垂直同步](https://baike.baidu.com/item/%E5%9E%82%E7%9B%B4%E5%90%8C%E6%AD%A5/7263524?fromtitle=V-Sync&fromid=691778)且刷新率 `vSyncCount`  为`1`，即与屏幕刷新率保持一致。如果 `vSyncCount` 设置为`2`，则每刷新 2 帧，引擎更新一次。 |
| [resourceManager](${api}core/Engine#resourceManager) | 资源管理 |
| [sceneManager](${api}core/Engine#sceneManager) | 场景管理。*Engine* 是总控制器，*Scene* 作为场景单元，可以方便大型场景的实体管理；*Camera* 作为组件挂载在 *Scene* 中的某一实体下，和现实中的摄像机一样，可以选择拍摄 *Scene* 中的任何实体 ，最后渲染到屏幕上的一块区域或者离屏渲染。|

如果用户使用 Oasis Engine 制作 FPS 等高速游戏，可能会遇到画面撕裂，碰撞检测不精确等结果，这是因为 *Engine* 的刷新速度跟不上屏幕刷新速度。用户可以关闭垂直同步，即将 [vSyncCount](${api}core/Engine#vSyncCount) 设置为 0，然后设置 [targetFrameRate](${api}core/Engine#targetFrameRate)  为期望的帧数值，如 120 表示 120 帧，即每秒刷新 120 次。

```typescript
// 垂直同步
engine.vSyncCount = 1;
engine.vSyncCount = 2;

// 非垂直同步
engine.vSyncCount = 0;
engine.targetFrameRate = 120;
```

## 方法

| 属性名称 | 属性释义 |
| --- | --- |
| [run](${api}core/Engine#run) | 执行 |
| [pause](${api}core/Engine#pause) | 暂停 |
| [resume](${api}core/Engine#resume) | 继续 |