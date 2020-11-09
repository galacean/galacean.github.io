# 引擎

Engine 在 Oasis 引擎中扮演着总控制器的角色，他能够控制画布（支持跨平台）的一切行为，包括[资源管理]({{book.docs}}structure/resource-manager.html)、[场景管理]({{book.docs}}structure/scene.html)、执行/暂停/继续、垂直同步等功能。


## 初始化

初始化 Engine 需要提供 *Canvas* 和 *HardwareRenderer* :


### Canvas

Oasis 引擎包装了不同平台的画布，如 [WebCanvas]({{book.api}}classes/rhi_webgl.webcanvas.html) 支持用 [Engine]({{book.api}}classes/core.engine.html) 控制 [HTMLCanvasElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement) 或者 [OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas) 。如何进行 Canvas 的屏幕适配请看[这里]()TODO。


### HardwareRenderer

Oasis 引擎封装了硬件渲染层，将不同平台的渲染能力统一管理，还可以通过 [HardwareRenderer]({{book.api}}interfaces/core.hardwarerenderer.html) 的构造函数，传入支持的配置来控制不同平台的渲染能力。


```typescript
const canvas = document.getElementById("canvas");
const webCanvas = new WebCanvas(canvas);
const webGLRenderer = new WebGLRenderer();
const engine = new Engine(webCanvas,webGLRenderer);
```


为了方便用户直接创建 web 端 engine，Oasis 提供了 [WebGLEngine]({{book.api}}classes/rhi_webgl.webglengine.html) ：

```typescript
const engine = new WebGLEngine("canvas")
```

## 属性
| 属性名称 | 属性释义 |
| --- | --- |
| [vSyncCount]({{book.api}}classes/core.engine.html#vsynccount) | 引擎默认开启[垂直同步](https://baike.baidu.com/item/%E5%9E%82%E7%9B%B4%E5%90%8C%E6%AD%A5/7263524?fromtitle=V-Sync&fromid=691778)且刷新率 `vSyncCount`  为`1`，即与屏幕刷新率保持一致。如果 `vSyncCount` 设置为`2`，则每刷新 2 帧，引擎更新一次。 |
| [resourceManager]({{book.api}}classes/core.engine.html#resourcemanager) | 资源管理 |
| [sceneManager]({{booki.api}}classes/core.engine.html#scenemanager) | 场景管理。*Engine* 是总控制器，*Scene* 作为场景单元，可以方便大型场景的实体管理；*Camera* 作为组件挂载在 *Scene* 中的某一实体下，和现实中的摄像机一样，可以选择拍摄 *Scene* 中的任何实体 ，最后渲染到屏幕上的一块区域或者离屏渲染。|

如果用户使用 Oasis Engine 制作 FPS 等高速游戏，可能会遇到画面撕裂，碰撞检测不精确等结果，这是因为 *Engine* 的刷新速度跟不上屏幕刷新速度。用户可以关闭垂直同步，即将 [vSyncCount]({{book.api}}classes/core.engine.html#vsynccount) 设置为 0，然后设置 [targetFrameRate]({{book.api}}classes/core.engine.html#targetframerate)  为期望的帧数值，如 120 表示 120 帧，即每秒刷新 120 次。

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
| run | 执行 |
| pause | 暂停 |
| resume | 继续 |