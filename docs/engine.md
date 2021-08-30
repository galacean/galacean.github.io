---
order: 1
title: Engine
type: Core
---

`Engine` plays the role of the master controller in the Oasis engine, which mainly includes three functions: **canvas**, **rendering control**, and **engine subsystem management**:

- **Canvas**:Operations related to the main canvas, such as changing the width and height of the canvas.
- **Rendering control**: Control rendering execution/pause/continue, vertical synchronization and other functions.
- **Engine subsystem management**:[Scene Management](${docs}scene-cn) and [Resource Management](${docs}resource-manager-cn) etc.

## initialization

To initialize the Engine, you need to provide [Canvas](${docs}canvas-cn)(**Canvas**) and the hardware rendering layer (**HardwareRenderer**).

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

## Properties

| Property name | Interpretation |
| --- | --- |
| [vSyncCount](${api}core/Engine#vSyncCount) | The engine is turned on by default [Vertical Sync](https://baike.baidu.com/item/%E5%9E%82%E7%9B%B4%E5%90%8C%E6%AD%A5/7263524?fromtitle=V-Sync&fromid=691778) and the refresh rate `vSyncCount` is `1`, which is consistent with the screen refresh rate. If `vSyncCount` is set to `2`, the engine will be updated every 2 frames. |
| [resourceManager](${api}core/Engine#resourceManager) | Resource management. |
| [sceneManager](${api}core/Engine#sceneManager) | Scene management. _Engine_ is the main controller, _Scene_ is a scene unit, which can facilitate the entity management of large scenes; _Camera_ is mounted as a component under an entity in _Scene_, and it can be selected as a camera in reality. Take any entity in the _Scene_, and finally render it to an area on the screen or off-screen rendering. |

If users use Oasis Engine to make high-speed games such as FPS, they may encounter screen tearing, inaccurate collision detection, etc. This is because the refresh rate of _Engine_ cannot keep up with the screen refresh rate. The user can turn off the vertical synchronization, that is, set [vSyncCount](${api}core/Engine#vSyncCount) to 0, and then set [targetFrameRate](${api}core/Engine#targetFrameRate) to the desired frame value, such as 120 120 frames, which means refreshing 120 times per second.

```typescript
// Vertical sync
engine.vSyncCount = 1;
engine.vSyncCount = 2;

// Non-vertical sync
engine.vSyncCount = 0;
engine.targetFrameRate = 120;
```

## Functions

| Function Name                      | Interpretation |
| ---------------------------------- | -------------- |
| [run](${api}core/Engine#run)       | Start loop     |
| [pause](${api}core/Engine#pause)   | Pause loop     |
| [resume](${api}core/Engine#resume) | Resume loop    |
