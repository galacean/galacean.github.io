---
order: 0
title: 支付宝/淘宝小程序
type: 平台适配
label: Adaptation
---

目前 Galacean 已经适配到支付宝和淘宝小程序。本教程默认开发者已经具备一定的小程序开发能力，如果没有，请阅读下面教程，下载小程序开发工具及申请 AppId：

- [支付宝小程序](https://opendocs.alipay.com/mini/developer)
- [淘宝小程序](https://miniapp.open.taobao.com/docV3.htm?docId=119114&docType=1&tag=dev)

## 创建 Galacean 小程序项目

> 需要 Node.js 版本 >=12.0.0.

使用 yarn 创建

```bash
yarn create @galacean/galacean-app --template miniprogram
```

使用 npm **6.x** 版本创建

```
npm init @galacean/galacean-app --template miniprogram
```

使用 npm **7.x** 版本创建

```she
npm init @galacean/galacean-app -- --template miniprogram
```

**根据提示**完成后续步骤后，可以使用小程序开发工具打开项目：

![image-20210609164550721](https://gw.alipayobjects.com/zos/OasisHub/3e2df40f-6ccd-4442-85f8-69233d04b3b5/image-20210609164550721.png)

选择对应目录即可，顺利的话可以看到：

![image-20210609164816776](https://gw.alipayobjects.com/zos/OasisHub/04386e9c-b882-41f7-8aa6-a1bf990d578b/image-20210609164816776.png)

## 已有项目使用 Galacean

本教程假设你已经有一定开发能力，若不熟悉小程序开发，请详细阅读[小程序开发文档](https://opendocs.alipay.com/mini/developer)。

1. 在项目目录中打开 `Terminal`，安装依赖：

```bash
# 使用 npm
npm install @galacean/engine --save
npm install @galacean/engine-miniprogram-adapter --save
# 使用 yarn
yarn add @galacean/engine
yarn add @galacean/engine-miniprogram-adapter
```

2. 在小程序项目配置文件 `app.json` 里添加下面配置项：

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

3. 在需要添加互动的 axml 页面里加入 canvas 标签

```html
<canvas onReady="onCanvasReady" id="canvas" type="webgl" />
```

使用 `onReady` 配置 `canvas` 初始化回调。需要设置 `canvas` 的 id，后面会用到。

4. 在页面的 `.js` 代码文件里添加回调函数，使用 `my._createCanvas` 创建所需的 canvas 上下文，之后在 `success` 回调里使用 galacean 即可.

注意：

1. 使用 `import * as GALACEAN from "galacean/dist/miniprogram"` 引入小程序依赖。
2. 需要使用『@galacean/engine-miniprogram-adapter』里的 `registerCanvas` 注册 `canvas`。

详情可以参考下面代码：

```js
import * as GALACEAN from "galacean/dist/miniprogram";
import { registerCanvas } from "@galacean/engine-miniprogram-adapter";

Page({
  onCanvasReady() {
		my._createCanvas({
			id: "canvas",
			success: (canvas) => {
        // 注册 canvas
				registerCanvas(canvas);
        // 适配 canvas 大小
        const info = my.getSystemInfoSync();
        const { windowWidth, windowHeight, pixelRatio, titleBarHeight } = info;
        canvas.width = windowWidth * pixelRatio;
        canvas.height = (windowHeight - titleBarHeight) * pixelRatio;

        // 创建引擎
        const engine = new GALACEAN.WebGLEngine(canvas);
        // 剩余代码和 Galacean Web 版本一致
        ...
			},
		});
	}
})
```

## 项目发布

- [支付宝小程序](https://opendocs.alipay.com/mini/introduce/release)
- [淘宝小程序](https://developer.alibaba.com/docs/doc.htm?spm=a219a.7629140.0.0.258775fexQgSFj&treeId=635&articleId=117321&docType=1)

## 小程序项目使用 OrbitControl

1. 引入二方库

```bash
npm install @galacean/engine-toolkit-controls -S
```

```typescript
import { OrbitControl } from "@galacean/engine-toolkit-controls/dist/miniprogram";
```

2. 添加组件

`OrbitControl` 组件需要添加到相机节点上。

```typescript
cameraEntity.addComponent(OrbitControl);
```

3. 事件模拟派发

因为小程序不支持 `addEventListener` 添加监听事件，得手动添加事件的模拟，并且小程序的 canvas 的多指触控存在 bug，所以添加一个和 canvas 大小和位置一样的 view 层去派发触摸事件：

```html
<view>
  <canvas
    onReady="onCanvasReady"
    style="width:{{cw}}px;height:{{ch}}px"
    type="webgl">
  </canvas>
  <view
    style="width:{{cw}}px;height:{{ch}}px;top:0px;position:absolute;"
    onTouchCancel="onTouchCancel"
    onTouchStart="onTouchStart"
    onTouchMove="onTouchMove"
    onTouchEnd="onTouchEnd"
  </view>
</view>
```

```typescript
import { dispatchPointerUp, dispatchPointerDown, dispatchPointerMove, dispatchPointerLeave, dispatchPointerCancel } from "@galacean/engine-miniprogram-adapter";

Page({
  ...
  onTouchEnd(e) {
    dispatchPointerUp(e);
    dispatchPointerLeave(e);
  },
  onTouchStart(e) {
    dispatchPointerDown(e);
  },
  onTouchMove(e) {
    dispatchPointerMove(e);
  },
  onTouchCancel(e) {
    dispatchPointerCancel(e);
  }
})
```

## 更多 Galacean 小程序案例

正在建设中...
