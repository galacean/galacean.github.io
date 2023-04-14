---
order: 0
title: Mini Program
type: Adaptation
label: Adaptation
---

At present, Galacean has been adapted to Alipay and Taobao miniprogram. This tutorial defaults that the developer has a certain ability to develop miniprograms. If not, please read the following tutorial, download the miniprogram development tools and apply for AppId:

- [Alipay Mini Program](https://opendocs.alipay.com/mini/developer)
- [Taobao Mini Program](https://miniapp.open.taobao.com/docV3.htm?docId=119114&docType=1&tag=dev)

## Create Galacean Mini Program Project

> Requires Node.js version >=12.0.0.

Create with yarn

```bash
yarn create @galacean/galacean-app --template miniprogram
```

Created with npm **6.x** version

```bash
npm init @galacean/galacean-app --template miniprogram
```

Created with npm **7.x** version

```bash
npm init @galacean/galacean-app -- --template miniprogram
```

**Follow the prompts** After completing the next steps, you can use the miniprogram development tool to open the project:

![image-20210609164550721](https://gw.alipayobjects.com/zos/oasisHub/3e2df40f-6ccd-4442-85f8-69233d04b3b5/image-20210609164550721.png)

Just select the corresponding directory, if it goes well, you can see:

![image-20210609164816776](https://gw.alipayobjects.com/zos/oasisHub/04386e9c-b882-41f7-8aa6-a1bf990d578b/image-20210609164816776.png)

## Existing projects use Galacean

This tutorial assumes that you already have certain development capabilities. If you are not familiar with mini program development, please read [Mini Program Development Document](https://opendocs.alipay.com/mini/developer) in detail.

1. Open `Terminal` in the project directory and install dependencies:

```bash
# use npm
npm install @galacean/engine --save
npm install @galacean/miniprogram-adapter --save
# use yarn
yarn add @galacean/engine
yarn add @galacean/miniprogram-adapter
```

2. Add the following configuration items in the applet project configuration file `app.json`:

```json
{
  ...
  "window": {
    ...
    "v8WorkerPlugins": "gcanvas_runtime",
    "v8Worker": 1,
    "enableSkia": "true"
  }
}
```

3. Add the canvas tag to the `axml` page that needs to be interactive

```html
<canvas onReady="onCanvasReady" id="canvas" type="webgl" />
```

Use `onReady` to configure `canvas` initialization callback. Need to set the id of `canvas`, which will be used later.

4. Add a callback function to the `.js` code file of the page, use `my._createCanvas` to create the required canvas context, and then use galacean in the `success` callback.

Note:

1. Use `import * as GALACEAN from "galacean/dist/miniprogram"` to import the dependencies of miniprogram.
2. Use `registerCanvas` which imported from `@galacean/miniprogram-adapter` to register `canvas`.

For example:

```js
import * as GALACEAN from "galacean/dist/miniprogram";
import { registerCanvas } from "@galacean/miniprogram-adapter";

Page({
  onCanvasReady() {
		my._createCanvas({
			id: "canvas",
			success: (canvas) => {
        // register canvas
				registerCanvas(canvas);
        // adapt canvas size
        const info = my.getSystemInfoSync();
        const { windowWidth, windowHeight, pixelRatio, titleBarHeight } = info;
        canvas.width = windowWidth * pixelRatio;
        canvas.height = (windowHeight - titleBarHeight) * pixelRatio;

        // create engine
        const engine = new GALACEAN.WebGLEngine(canvas);
        // The remaining code is consistent with the Galacean Web version
        ...
			},
		});
	}
})
```

## Project release

- [Alipay Mini Program](https://opendocs.alipay.com/mini/introduce/release)
- [Taobao Mini Program](https://developer.alibaba.com/docs/doc.htm?spm=a219a.7629140.0.0.258775fexQgSFj&treeId=635&articleId=117321&docType=1)

## Use OrbitControl

1. Import library

```bash
npm install @galacean/engine-toolkit-controls -S
```

```typescript
import { OrbitControl } from "@galacean/engine-toolkit-controls/dist/miniprogram";
```

2. Add Component

`OrbitControl` should be added to camera entity.

```typescript
cameraEntity.addComponent(OrbitControl);
```

3. Mock event dispatch

Because miniprogram doesn't support `addEventListener` like dom, we have to mock event dispatch. We should add a view element whose size and position are the same to canvas to dispatch `touchstart`, `touchmove` and `touchend` events. For example:

```html
<view>
  <canvas onReady="onCanvasReady" style="width:{{cw}}px;height:{{ch}}px" type="webgl"> </canvas>
  <view
    style="width:{{cw}}px;height:{{ch}}px;top:0px;position:absolute;"
    onTouchCancel="onTouchCancel"
    onTouchStart="onTouchStart"
    onTouchMove="onTouchMove"
    onTouchEnd="onTouchEnd"
  >
  </view>
</view>
```

```typescript
import { dispatchPointerUp, dispatchPointerDown, dispatchPointerMove, dispatchPointerOut } from "@galacean/miniprogram-adapter";

Page({
  ...
  onTouchEnd(e) {
    dispatchPointerUp(e);
  },
  onTouchStart(e) {
    dispatchPointerDown(e);
  },
  onTouchMove(e) {
    dispatchPointerMove(e);
  },
  onTouchCancel(e) {
    dispatchPointerOut(e);
  }
})
```

## More Galacean Mini Program Cases

Coming soon...
