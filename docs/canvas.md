---
order: 1
title: Init canvas
type: Introduction
group: Basic
label: Introduction/Basic
---

Galacean Engine packs canvases of different platforms, such as [WebCanvas](${api}rhi-webgl/WebCanvas). We can control [HTMLCanvasElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement) or [OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas) through [Engine](${api}core/Engine) instance.

## Basic Usage

### Create canvas

Insert a `<canvas>` tag in HTML and specify an id:

```html
<canvas id="canvas" style="width: 500px; height: 500px"/>
```

> Developers should check the height and width of the canvas to avoid the value of **0**, which will cause the rendering to fail.

When creating a WebGLEngine instance, a WebCanvas instance is automatically created:

```typescript
const engine = new WebGLEngine("canvas");

console.log(engine.canvas) // => WebCanvas instance
```

If you want to manually create a canvas, you need to write a few more lines of code, which is equivalent to the code above:

```typescript
const canvas = document.getElementById("canvas");
const webCanvas = new WebCanvas(canvas);
const webGLRenderer = new WebGLRenderer();
const engine = new Engine(webCanvas,webGLRenderer);
```

### Basic adaptation

The following code will resize the canvas according to the css style of the canvas element. When the display size of the canvas changes(for example, when the browser window changes), the rendering may be stretched or compressed, `resizeByClientSize` can be called to return to normal.

```typescript
engine.canvas.resizeByClientSize();
```

> This line of code can already meet the adaptation requirements. If you have more complex adaptation requirements, please read the "Advanced Usage" section.

## Advanced Usage

Regarding adaptation, the core thing to pay attention to is **device pixel ratio**. Taking iPhoneX as an example, the device pixel ratio `window.devicePixelRatio` is *3*, the window width `window.innerWidth` is *375*, and the screen physical The pixel width is: 375 * 3 = *1125*

The rendering pressure is proportional to the area size of the screen. The larger the physical pixels, the greater the rendering pressure, and the more power it consumes. It is recommended to set the height and width of the canvas through the API exposed by [WebCanvas](${api}rhi-webgl/WebCanvas). It is not recommended using the native canvas API, such as `canvas.width` or `canvas.style.width`.

>️ **Note**: Some front-end scaffolding will insert the following tags to modify the zoom ratio of the page:
>
> `<meta name="viewport" content="width=device-width, initial-scale=0.333333333">`
>
> This line of code will change the value of `window.innerWidth` from 375 to 1125.

The following two modes are recommended for Galacean screen adaptation:

### Energy saving mode

Taking into account that although the mobile device has a high-definition screen (with high pixel ratio), the actual graphics performance does not meet the performance requirements of high-definition real-time rendering (**The ratio of 3x screen and 2x screen rendering area is 9: 4, 3x is more likely to cause the phone to become hot**). In this mode, the engine achieves the purpose of adaptation by zooming and stretching the canvas:

```typescript
const canvas = document.getElementById('canvas');
const webcanvas = new WebCanvas(canvas);
const pixelRatio = window.devicePixelRatio; // If the meta scale has been set, please set it to 1
const scale = 3 / 2; // 3x HD screen, calculate the canvas size by 2x screen

/**
 * Set energy saving mode, full screen by default, or you can set any height and width by yourself
 */
webcanvas.width = window.innerWidth * pixelRatio / scale;
webcanvas.height = window.innerHeight * pixelRatio / scale;
webcanvas.setScale(scale, scale); // Stretch the canvas
```

If the canvas height and width have been set through CSS (for example: `width: 100vw; height: 100vh;`), you can pass a parameter to `resizeByClientSize` to stretch the canvas：

```typescript
const canvas = document.getElementById('canvas');
const webcanvas = new WebCanvas(canvas);
const scale = 2 / 3; // 3x HD screen, calculate the canvas size by 2x screen

webcanvas.resizeByClientSize(scale); // Stretch the canvas
```

### Fixed width mode

In some cases, such as when the design layout has a fixed width of 750, developers can hard code the canvas width to reduce the cost of adaptation.

```typescript
import { WebCanvas } from "@galacean/engine";

const canvas = document.getElementById('canvas');
const webcanvas = new WebCanvas(canvas);
const fixedWidth = 750; // Fixed width of 750

/**
 * Set fixed width mode
 */
const scale =  window.innerWidth / fixedWidth;
webcanvas.width = fixedWidth;
webcanvas.height = window.innerHeight / scale;
webcanvas.setScale(scale, scale); // Stretch the canvas
```
