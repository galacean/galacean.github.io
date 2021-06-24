---
order: 4
title: Lottie
type: 二方库
---

这是用 Oasis Engine 实现的 <a href="https://airbnb.design/lottie/" target="_blank">Lottie</a> 运行时。目前只支持 Lottie 节点树中的**精灵元素**（Sprite Elements）的绘制。它不同于 <a href="https://github.com/airbnb/lottie-web" target="_blank">lottie-web</a> 的 SVG 或 Canvas 渲染方案，而是借助 Oasis Engine 的 [BufferMesh](${docs}buffer-mesh-cn) 功能实现了高性能的合批绘制能力。

<playground src="lottie.ts"></playground>

## 安装

<a href="https://www.npmjs.com/package/@oasis-engine/lottie" target="_blank">@oasis-engine/lottie</a> 是 Oasis Engine 的二方包，需要手动安装：

```bash
npm i @oasis-engine/lottie --save
```

## 使用

### 基础使用
合批绘制的前提是有一张公共的图集。在开始使用下面的代码之前，你需要预处理一下 Lottie 的 JSON 文件，把其中的 **assets**（有可能是 base64 编码的图片集）合并成一张精灵图。你可以使用 <a href="https://www.codeandweb.com/texturepacker" target="_blank">TexturePacker</a> 软件很方便地完成图片的合并，它会产生一个图集文件（atlas）和一张精灵图，你可以删除 Lottie JSON 中的 **assets** 字段以减少文件体积。

> 未来我们会提供工具来帮助开发者完成以上操作。

```typescript
import { LottieRenderer } from "@oasis-engine/lottie";

// Load lottie json、atlas and image file with engine's `resourceManager`
engine.resourceManager.load({
  urls: [
    'https://gw.alipayobjects.com/os/bmw-prod/bf9346a5-8c25-48e2-b2c6-8a504707c8c7.json',
    'https://gw.alipayobjects.com/os/bmw-prod/083ff1ac-15d9-42cb-8d7a-5b7c39b81f5f.json',
    'https://gw.alipayobjects.com/mdn/rms_e54b79/afts/img/A*Ax4DSrekVhEAAAAAAAAAAAAAARQnAQ'
  ],
  type: 'lottie'
}).then((lottieEntity) => {
  // Add lottie entity created to scene 
  root.addChild(lottieEntity);

  // Get `LottieRenderer` component and play the animation
  const lottie = lottieEntity.getComponent(LottieRenderer);
  lottie.infinite = true;
  lottie.timeScale = 1;
  lottie.play();
});
```

### 3D 旋转功能

业务场景中经常会出现 3D 翻转的需求，比如一些弹窗的入场动画。由于传统的 lottie-web 方案只能沿着 **Z轴** 旋转（也就是说垂直于屏幕法线方向旋转），即使我们在 AE 中实现了沿着 **X轴** 或 **Y轴** 的旋转效果，使用 lotte-web  播放时也会被忽略：

![3D rotation](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*qVYxTaEdVBgAAAAAAAAAAAAAARQnAQ)

得益于 Oasis Engine 2D/3D 引擎统一架构的优势，轻松地实现 3D 旋转功能，为 lottie 补充了这项重要特性。

<playground src="lottie-3d-rotation.ts"></playground>

## 属性

| 名称 |  描述 |
| :--- | :--- |
| `infinite` | 是否无限循环播放 |
| `repeats` | 重复播放次数 |
| `timeScale` | 播放倍速 |

## 属性

| 名称 |  描述 |
| :--- | :--- |
| `play` | 播放 |
| `pause` | 暂停 |