---
title: WebGL 中的图片解码优化
type: Blog
time: 2021-04-23
---

> 作者：[月木](https://github.com/gz65555)

虽然 WebGL 支持 [压缩纹理](https://zh.wikipedia.org/wiki/%E7%BA%B9%E7%90%86%E5%8E%8B%E7%BC%A9)，上传 GPU 不存在解码耗时的问题，但日常应用中还是会用到 png/jpg/webp 等压缩过的图片格式。这些格式在 WebGL 中渲染需要转换成位图，即每个像素使用 RGB 或 RGBA 表示。这个过程称为**图片解码**。图片解码在渲染中是非常重要的一环，若直接使用 Image 对象上传([texImage2D](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/texImage2D))至 GPU，往往耗时较长，阻塞主线程，比如说会导致动画播放卡顿，影响用户体验。所以，在这里我们对浏览器中的一些 WebGL 中图片解码的方案做了一些研究和测试。

![左.gif](https://gw.alipayobjects.com/zos/OasisHub/8524aac7-70c7-4ab1-b907-0a2522f1e301/1619169474197-0d204baf-d9de-40b7-a368-6401724aee8f.gif)

![右.gif](https://gw.alipayobjects.com/zos/OasisHub/122ff3ad-6774-41c1-b27e-a1142b9fcb95/1619169493323-04f264c2-56a7-4860-b7c8-9a265df78343.gif)

> 第一幅图是同步解码，第二幅图是异步解码，可以看到明显缓解动画的卡顿

本文重点测试的是 [Image.decode](https://developer.mozilla.org/zh-cn/docs/Web/API/HTMLImageElement/decode) 方法和 [createImageBitmap](https://developer.mozilla.org/zh-CN/docs/Web/API/WindowOrWorkerGlobalScope/createImageBitmap) 方法。
## Image.decode
`Image.decode` 可以异步对 `Image` 进行解码，异步的解码不会阻塞主线程动画和交互。使用方法如下：
```javascript
const img = new Image();
img.src = '...';
img.decode().then(function() {
  document.body.appendChild(img);
});
```
## createImageBitmap
[ImageBitmap](https://developer.mozilla.org/zh-CN/docs/Web/API/ImageBitmap) 是专门为 Canvas 和 WebGL 渲染使用的一种数据格式。`createImageBitmap` 会异步返回一个含 [ImageBitmap](https://developer.mozilla.org/zh-CN/docs/Web/API/ImageBitmap) 对象的 Promise。`createImageBitmap` 可以在 worker 中使用，ImageBitmap 也可以在 worker 之间传输。createImageBitmap 接受多种数据源，本文重点测试 Blob 和 HTMLImageElement，这两种对象在渲染引擎中最常使用。


```javascript
// 使用 image 作为源
createImageBitmap(image).then((imageBitmap)=>{
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imageBitmap);
})

// 使用 blob 作为源
createImageBitmap(blob).then((imageBitmap)=>{
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imageBitmap);
})
```



---

## 性能测试
上面介绍完了两个异步解码 API 的基本使用，接下去我用 5 种方式对 100 张**不同**的 1024 * 1024 图（图片由[脚本](https://github.com/gz65555/image-decode-test/blob/main/process.js)随机生成）进行解码测试，对比图片的解码时间和纹理上传时间。五种方式如下：


1. 使用 Image 作为源用 createImageBitmap 方法。（[示例](https://github.com/gz65555/image-decode-test/blob/main/image-bitmap-upload.html)）
1. 使用 Blob 作为源使用 createImageBitmap 。（[示例](https://github.com/gz65555/image-decode-test/blob/main/bitmap-blob.html)）
1. 开启 5 个 worker 使用 createImageBitmap 方法。（[示例](https://github.com/gz65555/image-decode-test/blob/main/bitmap-decode-worker.html)）
1. 使用 image.decode 进行解码。（[示例](https://github.com/gz65555/image-decode-test/blob/main/image-upload-decode.html)）
1. 使用 image 直接上传纹理。（[示例](https://github.com/gz65555/image-decode-test/blob/main/image-upload.html)）





进过上面几项测试得出结果（上下浮动 100ms 左右）：
#### 1. MacOS（2.6 GHz i7 chrome 87 降低 6 倍性能)
| 使用方法 | 解码时间(毫秒) | 纹理上传时间(毫秒) | 总时间 | 备注 |
| --- | --- | --- | --- | --- |
| createImageBitmap(Image) | 2625 | 2967 | 5592 | 异步解码 |
| createImageBitmap(Blob) | 559 | 2180 | 2739 | 异步解码 |
| createImageBitmap(Blob) + worker | 210 | 2000 | 2210 | 异步 + 多线程解码 |
| image 直接上传 |  | 3020 | 3020 | 同步解码 |
| image.decode 后上传 | 210 | 4978 | 5188 | 异步解码 |

#### 2. Android U4（Mi 10 Pro U4 3.21.0.172）
| 使用方法 | 解码时间(毫秒) | 纹理上传时间(毫秒) | 总时间 | 备注 |
| --- | --- | --- | --- | --- |
| createImageBitmap(Image) | 1540 | 878 | 2418 | 异步解码 |
| createImageBitmap(Blob) | 1096 | 129 | 1225 | 异步解码 |
| createImageBitmap(Blob) + worker | 715 | 142 | 857 | 异步 + 多线程解码 |
| image 直接上传 |  | 905 | 905 | 同步解码 |
| ~~image.decode 后上传~~ |  |  | decode 报错，The source image cannot be decoded. | 异步解码 |

#### 3. Android Chrome（Mi 10 Pro Android Chrome 87）
| 使用方法 | 解码时间(毫秒) | 纹理上传时间(毫秒) | 总时间 | 备注 |
| --- | --- | --- | --- | --- |
| createImageBitmap(Image) | 522 | 504 | 1026 | 异步解码 |
| createImageBitmap(Blob) | 310 | 135 | 445 | 异步解码 |
| createImageBitmap(Blob) + worker | 249 | 145 | 394 | 异步 + 多线程解码 |
| image 直接上传 |  | 510 | 510 | 同步解码 |
| ~~image.decode 后上传~~ |  |  | decode 报错，The source image cannot be decoded. | 异步解码 |

#### 4. iOS safari（iPhone7 iOS 14.2）
| 使用方法 | 解码时间(毫秒) | 纹理上传时间(毫秒) | 总时间 | 备注 |
| --- | --- | --- | --- | --- |
| ~~createImageBitmap(Image)~~ |  |  | 不支持 |  |
| ~~createImageBitmap(Blob)~~ |  |  | 不支持 |  |
| ~~createImageBitmap(Blob) + worker~~ |  |  | 不支持 |  |
| image 直接上传 |  | 1076 | 1076 | 同步解码 |
| image.decode 后上传 | 2076 | 300 | 2376 | 异步解码 |



## 结论
通过以上测试，可以得出以下结论：

1. Android 和 Mac Chrome 推荐用 `createImageBitmap`，数据源务必使用 `Blob`，解码可以提升 10% 左右的性能：
   1. 若数据源使用 `Blob`，无解码时间；若数据源使用 `Image`，有两次时间消耗，首先创建 bitmap 耗时很长，其次在 performance 里查看仍有解码时间（预期不该有解码时间，这是 Chrome 的 Bug，已经给 chromium 提了一个 [issue](https://bugs.chromium.org/p/chromium/issues/detail?id=1164969)，chrome 官方已经确认问题存在）。
   1. 在 worker 中调用 `createImageBitmap` 可以利用多线程能力，能进一步提升 15% 左右的性能。因为 worker 线程还不算特别稳定，是否开启 worker 解码交由用户配置决定，用户根据当前 cpu 负载及所需解码数量和业务场景去决定是否使用 worker 解码。
2. iOS  不要用任何异步解码方案：
   1. 不支持 `createImageBitmap`；
   1. 使用 `Image.decode` 的总时间是同步解码的两倍；



根据上面测试的结果以及推导的结论，在 WebGL 中采取的图片请求最佳解码方案是：

![](https://gw.alipayobjects.com/zos/OasisHub/983bea3d-909e-4acc-b81e-f5808f60f73f/3ea78572041822b115811b2ed58d5c9a.svg)

以上方案即将应用到 oasis-engine 中，欢迎大家在 [PR](https://github.com/oasis-engine/engine/pull/249) 中讨论。