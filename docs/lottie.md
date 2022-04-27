---
order: 4
title: Lottie
type: Function Modules
group: Animation
---

This is the <a href="https://airbnb.design/lottie/" target="_blank">Lottie</a> runtime implemented with Oasis Engine. Currently, only the sprite elements in the lottie node tree can be rendered.


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
    "https://gw.alipayobjects.com/os/bmw-prod/b46be138-e48b-4957-8071-7229661aba53.json",
    "https://gw.alipayobjects.com/os/bmw-prod/6447fc36-db32-4834-9579-24fe33534f55.atlas"
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

<playground src="lottie.ts"></playground>

### Listen to the end of animation

We often have the need to listen to the end of animation, for example, running some business logic at the end of animation. The `play` method of `LottieAnimation` returns a `Promise`, so you can easily monitor the timing of the end of the animation:

```typescript
  const lottie = lottieEntity.getComponent(LottieAnimation);
  await lottie.play();
  // do something next..
```

### Animation clips

The Lottie file given by designer often contains multiple animation clips (an animation clip starts from a certain frame to the end of a certain frame), and the front end can slice the whole animation to some clips by adding the field `lolitaAnimations` to the Lottie protocol:

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

The above code adds three clips to the protocol: `beforePlay` (0-71 frames), `onPlay` (72-143 frames), and `afterPlay` (114-203 frames). The following example plays `beforePlay` 3 times, then `onPlay` 2 times, and finally plays `afterPlay` once:

<playground src="lottie-clips.ts"></playground>


### 3D Transform

3D flipping often occurs in business scenarios, such as the entrance animation of some pop-up windows. Take rotation as an example, the traditional lottie-web solution can only rotate elements along the **Z axis** (that is to say perpendicular to the screen normal direction). That's to say, even if we've implemented 3D flipping in AE, the rotation effect will also be ignored when playing by lottie-web.

![3D rotation](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*qVYxTaEdVBgAAAAAAAAAAAAAARQnAQ)

Thanks to the advantages of the 2D/3D-unified architecture of the Oasis Engine, the 3D transform feature can be easily implemented with Oasis Engine.

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
| `play` | play animation. Passing a clip name parameter will play the certain animation clip. |
| `pause` | pause animation |