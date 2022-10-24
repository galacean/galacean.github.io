---
order: 1
title: Engine
type: Core
label: Core
---

`Engine` plays the role of the master controller in the Oasis engine, which mainly includes three functions: **canvas**, **rendering control**, and **engine subsystem management**:

- **Canvas**:Operations related to the main canvas, such as changing the width and height of the canvas.
- **Rendering control**: Control rendering execution/pause/continue, vertical synchronization and other functions.
- **Engine subsystem management**:[Scene Management](${docs}scene) and [Resource Management](${docs}resource-manager) etc.
- **Rendering context management**: Control rendering context such as alpha and so on.

## initialization

To initialize the Engine, you need to provide [Canvas](${docs}canvas)(**Canvas**) and the hardware rendering layer (**HardwareRenderer**).

The Oasis engine encapsulates the hardware rendering layer and manages the rendering capabilities of different platforms in a unified manner. You can also pass in the supported configurations to control the rendering capabilities of different platforms through the constructor of [HardwareRenderer](${api}core/IHardwareRenderer).

```typescript
const canvas = document.getElementById("canvas");
const webCanvas = new WebCanvas(canvas);
const webGLRenderer = new WebGLRenderer();
const engine = new Engine(webCanvas, webGLRenderer);
```

In order to facilitate users to directly create a web-side engine, Oasis provides [WebGLEngine](${api}rhi-webgl/WebGLEngine):

```typescript
const engine = new WebGLEngine("canvas");
```


## WebGL context
The context management of WebGL can be managed through the third parameter [WebGLRendererOptions](${api}rhi-webgl/WebGLRendererOptions) of [WebGLEngine](${api}rhi-webgl/WebGLEngine), take **canvas transparent** For example, the engine closes the transparent channel of the canvas by default, that is, the web page elements behind the canvas cannot be displayed, which helps to save GPU memory. If you need to open it, you can set it like this:

```typescript
const engine = new WebGLEngine("canvas", undefined, {
  alpha: true
});

/**
 * After opening the transparent channel, you also need to set the background color to decide how to blend with the web page background.
 * Set to 0, 0, 0, 0 to fully display the web page background.
 */
const scene = engine.sceneManager.activeScene;
scene.background.solidColor.set(0, 0, 0, 0);
```

Similarly, you can use `webGLMode` to control WebGL1/2, `antialias` to control antialiasing, etc.
## Properties

| Property name | Interpretation |
| --- | --- |
| [vSyncCount](${api}core/Engine#vSyncCount) | The engine is turned on by default [Vertical Sync](https://baike.baidu.com/item/%E5%9E%82%E7%9B%B4%E5%90%8C%E6%AD%A5/7263524?fromtitle=V-Sync&fromid=691778) and the refresh rate `vSyncCount` is `1`, which is consistent with the screen refresh rate. If `vSyncCount` is set to `2`, the engine will be updated every 2 frames. |
| [resourceManager](${api}core/Engine#resourceManager) | Resource management. |
| [sceneManager](${api}core/Engine#sceneManager) | Scene management. _Engine_ is the main controller, _Scene_ is a scene unit, which can facilitate the entity management of large scenes; _Camera_ is mounted as a component under an entity in _Scene_, and it can be selected as a camera in reality. Take any entity in the _Scene_, and finally render it to an area on the screen or off-screen rendering. |

### Frame rate

By default, the engine adopts the vertical synchronization mode and uses [vSyncCount](${api}core/Engine#vSyncCount)  to control the rendering refresh rate. Only in this mode can the rendered frame wait for the vertical synchronization signal of the screen, [vSyncCount](${api}core/Engine#vSyncCount)  represents the expected number of screen synchronization signals between rendered frames. The default value is 1, and the value of this attribute must be an integer, For example, if we want to render 30 frames per second on a device with a screen refresh rate of 60 frames, we can set this value to 2.
In addition, the user can also turn off vertical synchronization, that is, set [vsynccount] (${api}core/engine\vsynccount) to 0, and then set [targetFrameRate](${api}core/Engine#targetFrameRate) to the desired frame value. The rendering in this mode does not consider the vertical synchronization signal, but, for example, 120 indicates 120 frames, that is, it is expected to refresh 120 times per second.

```typescript
// Vertical sync
engine.vSyncCount = 1;
engine.vSyncCount = 2;

// Non-vertical sync
engine.vSyncCount = 0;
engine.targetFrameRate = 120;
```

## Functions

| Function Name                        | Interpretation     |
| ------------------------------------ | ------------------ |
| [run](${api}core/Engine#run)         | Start engine loop  |
| [pause](${api}core/Engine#pause)     | Pause  engine loop |
| [resume](${api}core/Engine#resume)   | Resume engine loop |
| [destroy](${api}core/Engine#destroy) | destroy the engine |
