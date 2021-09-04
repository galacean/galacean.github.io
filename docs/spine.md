---
order: 3
title: Spine
type: Second party packages 
---

Oasis Engine implements spine animation rendering through [BufferMesh](${docs}buffer-mesh).

> **PS**: The oasis spine runtime currently only supports spine 3.8 version and above.

<playground src="spine-animation.ts"></playground>

## Install

_@oasis-engine/engine-spine_ is the second party package of Oasis Engine, you need to install it manually:

```bash
npm i @oasis-engine/engine-spine --save
```

## Usage
### Resource loading

When _@oasis-engine/engine-spine_ is imported, the loader of the spine resource will be automatically registered on the [resourceManager](${api}core/Engine#resourceManager) of [engine](${api}core/Engine) . The spine animation resource can be loaded through the [load](${api}core/ResourceManager/#load) method of resourceManager.

- When the passed parameter is url, the spine animation resource has the same baseUrl by default, and only the json file cdn needs to be passed.
- When the passed parameter is the urls array, you need to pass the cdn addresses of the three resources json, atlas, image (png, jpg).
- The resource type must be specified as spine.

After loading, a spine entity object will be returned synchronously, and the spine animation can be added to the scene directly through the `addChild` method.

```typescript
const spineEntity = await engine.resourceManager.load(
  {
    url: 'Your spine animation file(.json or .bin).',
    type: 'spine',
  },
  // {
    // urls: [
      // 'Your spine animation file(.json or .bin).',
      // 'atlas file',
      // 'texture image'
    // ],
    // type: 'spine',
  // }
);

root.addChild(spineEntity);

```

### animation play

When you need to play the animation, you need to get the SpineAnimation component on the spine entity. The SpineAnimation component exposes [AnimationState](http://zh.esotericsoftware.com/spine-api-reference#AnimationState) and [Skeleton](http://zh.esotericsoftware.com/spine-api-reference#Skeleton) interfaces , you can use spine-core native API to play animation.For example:

```typescript
import { SpineAnimation } from '@oasis-engine/engine-spine';

const spineEntity = await engine.resourceManager.load(
  {
    url: 'Your spine animation file(.json or .bin).',
    type: 'spine',
  },
);
root.addChild(spineEntity);

const spineAnimation = spineEntity.getComponent(SpineAnimation);
spineAnimation.state.setAnimation(0, 'your_animation_name', true);

```

### Slot split
The spine component merges all the vertices of the spine animation to generate a single `Mesh`. Use the `addSeparateSlot` method to split a slot by slot name into separate `SubMesh`, and then use the `hackSeparateSlotTexture` method to replace the texture of the submesh material.

```
// hackTexture: another texture
const spineAnimation = spineEntity.getComponent(SpineAnimation);
spineAnimation.addSeparateSlot('slot_name');
spineAnimation.hackSeparateSlotTexture('slot_name', hackTexture);

```
The effect of skin mashup can be achieved through the above methods:
<playground src="spine-hack-slot-texture.ts"></playground>

### Common QA
- How to obtain spine resources?
The required json, atlas, png files can be exported through the export function of the spine editor.
You can refer to the official spine document for export function: http://zh.esotericsoftware.com/spine-export/
- How to perform animation control?
You can refer to the document: http://zh.esotericsoftware.com/spine-api-reference#AnimationState
Here are a few common examples:
```
// play animation once
spineAnimation.state.setAnimation(0, 'your_animation_name', false);
// looping animation
spineAnimation.state.setAnimation(0, 'your_animation_name', true);
// pause animation
spineAnimation.state.timeScale = 0;
// Looping Animation B after Animation A end
spineAnimation.state.setAnimation(0, 'animationA', false);
spineAnimation.state.addAnimation(0, 'animationA', true, 0);
```
The events and callbacks of spine animation can refer to the document:
http://esotericsoftware.com/spine-unity-events



