# 屏幕适配

关于屏幕适配，核心要注意的点是**设备像素比**，以 iPhoneX 为例，设备像素比 `window.devicePixelRatio` 为 *3*， 窗口宽度 `window.innerWidth` 为 *375*，屏幕物理像素宽度则为：375 * 3 = *1125*。

渲染压力和屏幕物理像素高宽成正比，物理像素越大，渲染压力越大，也就越耗电。画布的高宽建议通过 [WebCanvas](${book.api}classes/rhi_webgl.webcanvas.html) 暴露的 API 设置，不建议使用原生 canvas 的 API ，如 `canvas.width` 或 `canvas.style.width` 这些方法修改。

>️ 注意：Sherry 等脚手架工具会修改页面的缩放比：
>
> `<meta name="viewport" content="width=device-width, initial-scale=0.333333333">`
>
> 此时 `window.innerWidth` 的值是 1125，这种情况下设置画布高宽，可以认为 pixelRatio 为 1。


## 使用

Oasis 的屏幕适配推荐使用以下四种模式：

### 高清模式

此模式下，画布像素 1:1 填充到屏幕物理像素，通俗地说就是设备能渲染多高清，画布就渲染多高清。高清模式的代码如下：

```typescript
import { WebCanvas } from "oasis-engine";

const canvas = document.getElementById('canvas');
const webcanvas = new WebCanvas(canvas);
const pixelRatio = window.devicePixelRatio; // 如果已经设置 meta scale，请设置为 1

/**
 * 设置高清模式，默认全屏，也可以自己设置任意高宽
 */
webcanvas.width = window.innerWidth * pixelRatio;
webcanvas.height =  window.innerHeight * pixelRatio;
```

### 自动模式

如果希望画布能够自适应样式高宽，即用 css 设置了 canvas 的样式高宽，这种模式只要在高清模式基础上做少量修改：

```typescript
const canvas = document.getElementById('canvas');
const webcanvas = new WebCanvas(canvas);
const pixelRatio = window.devicePixelRatio; // 如果已经设置 meta scale，请设置为 1

/**
 * 设置自动模式
 */
webcanvas.width = canvas.clientWidth * pixelRatio;
webcanvas.height = canvas.clientHeight * pixelRatio;
```

### 节能模式

考虑到移动端设备虽然是高清屏幕（设别像素比高）但实际显卡性能并不能很好地满足高清实时渲染的性能要求的情况（**3倍屏和2倍屏渲染面积比是 9:4，3倍屏较容易造成手机发烫**），此模式下引擎通过对画布缩放拉伸来达到适配的目的。代码如下：

```typescript
const canvas = document.getElementById('canvas');
const webcanvas = new WebCanvas(canvas);
const pixelRatio = window.devicePixelRatio; // 如果已经设置 meta scale，请设置为 1
const scale = 3 / 2; // 3 倍高清屏按 2 倍屏来计算画布尺寸

/**
 * 设置节能模式，默认全屏，也可以自己设置任意高宽
 */
webcanvas.width = window.innerWidth * pixelRatio / scale;
webcanvas.height = window.innerHeight * pixelRatio / scale;
webcanvas.setScale(scale, scale); // 拉伸画布
```

### 固定宽度模式

某些情况下，比如设计稿固定 750 宽度的情况，开发者有可能会写死画布宽度来降低适配成本。代码如下：

```typescript
import { WebCanvas } from "oasis-engine";

const canvas = document.getElementById('canvas');
const webcanvas = new WebCanvas(canvas);
const fixedWidth = 750; // 固定 750 宽度

/**
 * 设置固定宽度模式
 */
const scale =  window.innerWidth / fixedWidth;
webcanvas.width = fixedWidth;
webcanvas.height = window.innerHeight / scale;
webcanvas.setScale(scale, scale); // 拉伸画布
```
