---
order: 4
title: Lottie
type: Second party packages 
---

This is the <a href="https://airbnb.design/lottie/" target="_blank">Lottie</a> runtime implemented with Oasis Engine. Currently, only the sprite elements in the lottie node tree can be rendered.

<playground src="lottie.ts"></playground>

## Install

<a href="https://www.npmjs.com/package/@oasis-engine/lottie" target="_blank">@oasis-engine/lottie</a> is a second party package of Oasis Engine, which need to install manually:

```bash
npm i @oasis-engine/lottie --save
```

## Usage

### Basic usage

An atlas is needed for batch rendering. Before you start using the following code, you need to preprocess lottie's JSON file and merge the **assets** (several base64-encoded images) into a sprite image with [tool-atlas-lottie](https://www.npmjs.com/package/@oasis-engine/tool-atlas-lottie). 

```typescript
import { LottieRenderer } from "@oasis-engine/lottie";

// Load lottie json、atlas file with engine's `resourceManager`
engine.resourceManager.load({
  urls: [
    'https://gw.alipayobjects.com/os/bmw-prod/9ad65a42-9171-47ab-9218-54cf175f6201.json',
    'https://gw.alipayobjects.com/os/bmw-prod/58cde292-8675-4299-b400-d98029b48ac7.atlas',
  ],
  type: 'lottie'
}).then((lottieEntity) => {
  // Add lottie entity created to scene 
  root.addChild(lottieEntity);

  // Get `LottieRenderer` component and play the animation
  const lottie = lottieEntity.getComponent(LottieRenderer);
  lottie.isLooping = true;
  lottie.speed = 1;
  lottie.play();
});
```

### 3D Rotation

3D flipping often occurs in business scenarios, such as the entrance animation of some pop-up windows. The traditional lottie-web solution can only rotate elements along the **Z axis** (that is to say perpendicular to the screen normal direction). That's to say, even if we've implemented 3D flipping in AE, the rotation effect will also be ignored when playing by lottie-web.

![3D rotation](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*qVYxTaEdVBgAAAAAAAAAAAAAARQnAQ)

Thanks to the advantages of the unified architecture of the Oasis Engine 2D/3D engine, the 3D rotation feature can be easily implemented with Oasis Engine.

<playground src="lottie-3d-rotation.ts"></playground>

## Properties

| Properties | Explanation |
| :--- | :--- |
| `isLooping` | Whether loop |
| `repeats` | Repeat times |
| `speed` | Playing speed of animation |

## Methods

| Methods | Explanation |
| :--- | :--- |
| `play` | play animation |
| `pause` | pause animation |