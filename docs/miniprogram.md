---
order: 0
title: Mini Program
type: miniprogram
---

At present, Oasis has been adapted to Alipay and Taobao miniprogram. This tutorial defaults that the developer has a certain ability to develop miniprograms. If not, please read the following tutorial, download the miniprogram development tools and apply for AppId:

-[Alipay Mini Program](https://opendocs.alipay.com/mini/developer) -[Taobao Mini Program](https://miniapp.open.taobao.com/docV3.htm?docId=119114&docType=1&tag=dev)

## Create Oasis Mini Program Project

> Requires Node.js version >=12.0.0.

Create with yarn

```shell
yarn create @oasis-engine/oasis-app --template miniprogram
```

Created with npm **6.x** version

```
npm init @oasis-engine/oasis-app --template miniprogram
```

Created with npm **7.x** version

```shell
npm init @oasis-engine/oasis-app -- --template miniprogram
```

**Follow the prompts** After completing the next steps, you can use the miniprogram development tool to open the project:

![image-20210609164550721](https://gw.alipayobjects.com/zos/OasisHub/3e2df40f-6ccd-4442-85f8-69233d04b3b5/image-20210609164550721.png)

Just select the corresponding directory, if it goes well, you can see:

![image-20210609164816776](https://gw.alipayobjects.com/zos/OasisHub/04386e9c-b882-41f7-8aa6-a1bf990d578b/image-20210609164816776.png)

## Existing projects use Oasis

This tutorial assumes that you already have certain development capabilities. If you are not familiar with mini program development, please read [Mini Program Development Document](https://opendocs.alipay.com/mini/developer) in detail.

1. Open `Terminal` in the project directory and install dependencies:

```shell
# use npm
npm install oasis-engine --save
npm install @oasis-engine/miniprogram-adapter --save
# use yarn
yarn add oasis-engine
yarn add @oasis-engine/miniprogram-adapter
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

4. Add a callback function to the `.js` code file of the page, use `my._createCanvas` to create the required canvas context, and then use oasis in the `success` callback.

Note:

1. Use `import * as OASIS from "oasis-engine/dist/miniprogram"` to import the dependencies of miniprogram.
2. Use `registerCanvas` which imported from `@oasis-engine/miniprogram-adapter` to register `canvas`.

For example:

```js
import * as OASIS from "oasis-engine/dist/miniprogram";
import { registerCanvas } from "@oasis-engine/miniprogram-adapter";

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
        const engine = new OASIS.WebGLEngine(canvas);
        // The remaining code is consistent with the Oasis Web version
        ...
			},
		});
	}
})
```

## Project release

-[Alipay Mini Program](https://opendocs.alipay.com/mini/introduce/release) -[Taobao Mini Program](https://developer.alibaba.com/docs/doc.htm?spm=a219a.7629140.0.0.258775fexQgSFj&treeId=635&articleId=117321&docType=1)

## More Oasis Mini Program Cases

Coming soon...
