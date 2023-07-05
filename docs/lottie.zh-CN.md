---
order: 4
title: Lottie
type: 动画
label: Animation
---

这是用 Galacean Engine 实现的 <a href="https://airbnb.design/lottie/" target="_blank">Lottie</a> 运行时。目前只支持 Lottie 节点树中的**精灵元素**（Sprite Elements）的绘制。

## 安装

<a href="https://www.npmjs.com/package/@galacean/engine-lottie" target="_blank">@galacean/engine-lottie</a> 是 Galacean Engine 的二方包，需要手动安装：

```bash
npm i @galacean/engine-lottie --save
```

## 使用

### 基础使用
在进行 `Pro Code` 开发的时候，需要一个 `json` 文件和一个 `atlas` 文件来实现 `lottie` 动画，通常美术同学通过 `AE` 导出的给到开发的只有 `json` 文件，此时需要使用 [tools-atlas-lottie](https://www.npmjs.com/package/@galacean/tools-atlas-lottie) `CLI` 工具生成 `atlas` 文件。

```typescript
import { LottieAnimation } from "@galacean/engine-lottie";

// Load lottie json、atlas file with engine's `resourceManager`
engine.resourceManager.load({
  urls: [
    "https://gw.alipayobjects.com/os/bmw-prod/b46be138-e48b-4957-8071-7229661aba53.json",
    "https://gw.alipayobjects.com/os/bmw-prod/6447fc36-db32-4834-9579-24fe33534f55.atlas"
  ],
  type: 'lottie'
}).then((lottieEntity) => {
  // Add lottie entity created to scene 
  root.addChild(lottieEntity);

  // Get `LottieAnimation` component and play the animation
  const lottie = lottieEntity.getComponent(LottieAnimation);
  lottie.isLooping = true;
  lottie.speed = 1;
  lottie.play();
});
```

<playground src="lottie.ts"></playground>

### 监听播放结束

很多时候我们有监听 Lottie 动画播放结束的需求，比如在动画结束的时候运行一些业务逻辑。`LottieAnimation` 的 `play` 方法会返回一个 `Promise`，所以可以很方便地监听动画结束的时机：

```typescript
  const lottie = lottieEntity.getComponent(LottieAnimation);
  await lottie.play();
  // do something next..
```

### 动画切片
设计师给的 Lottie 文件常常包含多个动画片段（一个动画片段从某帧开始到某帧结束），前端在播放时可以通过在 Lottie 协议中添加 `lolitaAnimations` 字段实现动画的切片：

```json
"lolitaAnimations": [
  {
    "name": "beforePlay",
    "start": 0,
    "end": 71
  },
  {
    "name": "onPlay",
    "start": 72,
    "end": 143
  },
  {
    "name": "afterPlay",
    "start": 144,
    "end": 203
  }
]
```

以上代码在协议中添加了 `beforePlay`（0-71帧）、`onPlay`（72-143帧）、`afterPlay`（114-203帧）三个片段。以下示例先播放 3 遍 `beforePlay`，再播放 2 遍 `onPlay`，最后播 1 遍 `afterPlay`：

<playground src="lottie-clips.ts"></playground>


### 3D 变换

业务场景中经常会出现 3D 变换的需求，比如一些弹窗的入场动画。以旋转为例，由于传统的 lottie-web 方案只能沿着 **Z轴** 旋转（也就是说垂直于屏幕法线方向旋转），即使我们在 AE 中实现了沿着 **X轴** 或 **Y轴** 的旋转效果，使用 lottie-web  播放时也会被忽略。

![3D rotation](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*qVYxTaEdVBgAAAAAAAAAAAAAARQnAQ)

得益于 Galacean Engine 2D/3D 引擎统一架构的优势，轻松地实现 3D 变换功能。

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
| `play` | 播放动画，传入动画片段名参数会播放特定的动画片段 |
| `pause` | 暂停动画 |