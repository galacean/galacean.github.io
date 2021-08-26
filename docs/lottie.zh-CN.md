---
order: 4
title: Lottie
type: 二方库
---

这是用 Oasis Engine 实现的 <a href="https://airbnb.design/lottie/" target="_blank">Lottie</a> 运行时。目前只支持 Lottie 节点树中的**精灵元素**（Sprite Elements）的绘制。

<playground src="lottie.ts"></playground>

## 安装

<a href="https://www.npmjs.com/package/@oasis-engine/lottie" target="_blank">@oasis-engine/lottie</a> 是 Oasis Engine 的二方包，需要手动安装：

```bash
npm i @oasis-engine/lottie --save
```

## 使用

### 基础使用
合批绘制的前提是有一张公共的图集。在开始使用下面的代码之前，你需要预处理一下 Lottie 的 JSON 文件，把其中的 **assets**（有可能是 base64 编码的图片集）合并成一张精灵图。

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

业务场景中经常会出现 3D 翻转的需求，比如一些弹窗的入场动画。由于传统的 lottie-web 方案只能沿着 **Z轴** 旋转（也就是说垂直于屏幕法线方向旋转），即使我们在 AE 中实现了沿着 **X轴** 或 **Y轴** 的旋转效果，使用 lottie-web  播放时也会被忽略。

![3D rotation](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*qVYxTaEdVBgAAAAAAAAAAAAAARQnAQ)

得益于 Oasis Engine 2D/3D 引擎统一架构的优势，轻松地实现 3D 旋转功能。

<playground src="lottie-3d-rotation.ts"></playground>

## 属性

| 名称 |  描述 |
| :--- | :--- |
| `isLooping` | 是否无限循环播放 |
| `repeats` | 重复播放次数 |
| `speed` | 播放倍速 |

## 方法

| 名称 |  描述 |
| :--- | :--- |
| `play` | 播放动画 |
| `pause` | 暂停动画 |