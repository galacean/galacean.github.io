---
order: 3
title: FrameBuffer Picker
type: Function Modules
group: Interact
---

In 3D applications, you often need to pick up the object in the scene, [RayCast-Collision](${docs}physics-manager#raycast) is a common method, it will pick up in the CPU, **it's performance better, but the accuracy is poor** , because the bounding is relatively simple, the complex model cannot be picked up.

When the pick-up frequency is not high, you can consider [FramebufferPicker](${api}framebuffer-picker/FramebufferPicker); when the picked frequency is too high, it is necessary to assess the performance overhead the business scene, because the underlying layer will be CPU-GPU communication, that is, calls `gl.readpixels`.

<playground src="framebuffer-picker.ts"></playground>

## Create FrameBufferPicker

```typescript
import { FramebufferPicker } from "@oasis-engine/framebuffer-picker";

const framebufferPicker = rootEntity.addComponent(FramebufferPicker);
framebufferPicker.camera = camera;
```

## Register picking events

```typescript
framebufferPicker.onPick = (obj) => {
  if (obj) {
    const { mesh, component } = obj;
    // do something...
  }
};

// Mouse click trigger pick
document.getElementById("canvas").addEventListener("mousedown", (e) => {
  framebufferPicker.pick(e.offsetX, e.offsetY);
});
```
