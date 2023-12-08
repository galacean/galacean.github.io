---
order: 6
title: Lottie
type: 图形
group: 2D
label: Graphics/2D
---

[Lottie](https://airbnb.design/lottie/) 是广受设计师和前端开发者欢迎的动画格式，用户可以在 Galacean 中轻松完成 Lottie 资产的处理和组件添加。

## 编辑器使用

建议设计师在 AE 中导出 lottie 文件的时候，图片采用 base64 格式写入 lottie 的 json 文件中。

开发者拿到 `.json` 文件后，首先需要把 `.json` 文件上传到 Galacean Editor。通过资产面板的上传按钮选择 “lottie” 资产，选择本地一个 lottie json 文件，然后：

<img src="https://mdn.alipayobjects.com/huamei_w6ifet/afts/img/A*UQ1LTI_mYv4AAAAAAAAAAAAADjCHAQ/original"   />

选择一个节点，添加 Lottie 组件，选择 resource 为上一步上传的资产，通过修改 speed 改变播放速度：

![lottie](https://mdn.alipayobjects.com/huamei_w6ifet/afts/img/A*ehFMT7vBaCAAAAAAAAAAAAAADjCHAQ/original)

| 属性 | 功能说明 |
| :--- | :--- |
| `resource` | 选择 Lottie 资产 |
| `isLooping` | 是否循环播放，默认循环 |
| `speed` | 播放速度，`1` 为原速度播放，数值越大播放约快 |
| `priority` | 渲染优先级，值越小，渲染优先级越高，越优先被渲染 |

| 方法 |  描述 |
| :--- | :--- |
| `play` | 播放动画，传入动画片段名参数会播放特定的动画片段 |
| `pause` | 暂停动画 |

### 切片功能

编辑器提供了动画切片的功能，可以把设计师提供的整个片段切成多段，每个片段需要定义片段名、开始帧、结束帧三个字段。

<playground src="lottie-clips.ts"></playground>

<img src="https://mdn.alipayobjects.com/huamei_w6ifet/afts/img/A*skjbSZjSpYoAAAAAAAAAAAAADjCHAQ/original" style="zoom:100%;" />

该操作会在 Lottie 协议中添加 `lolitaAnimations` 字段实现动画的切片：

```json
"lolitaAnimations": [
  {
    "name": "clip1",
    "start": 0,
    "end": 30
  },
  {
    "name": "clip2",
    "start": 50,
    "end": 100
  },
]
```

## 脚本使用

### 安装包

<a href="https://www.npmjs.com/package/@galacean/engine-lottie" target="_blank">@galacean/engine-lottie</a> 是 Galacean Engine 的二方包，需要手动安装：

```bash
npm i @galacean/engine-lottie --save
```

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

### 3D 变换

业务场景中经常会出现 3D 变换的需求，比如一些弹窗的入场动画。以旋转为例，由于传统的 lottie-web 方案只能沿着 **Z轴** 旋转（也就是说垂直于屏幕法线方向旋转），即使我们在 AE 中实现了沿着 **X轴** 或 **Y轴** 的旋转效果，使用 lottie-web  播放时也会被忽略。

![3D rotation](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*qVYxTaEdVBgAAAAAAAAAAAAAARQnAQ)

得益于 Galacean Engine 2D/3D 引擎统一架构的优势，轻松地实现 3D 变换功能。

<playground src="lottie-3d-rotation.ts"></playground>
