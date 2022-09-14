---
order: 3
title: FrameBuffer Picker
type: Interact
---

In 3D applications, you often need to pick up the object in the scene, [RayCast-Collision](${docs}physics-manager#raycast) is a common method, it will pick up in the CPU, **it's performance better, but the accuracy is poor** , because the bounding is relatively simple, the complex model cannot be picked up.

When the pick-up frequency is not high, you can consider `FramebufferPicker`; when the picked frequency is too high, it is necessary to assess the performance overhead the business scene, because the underlying layer will be CPU-GPU communication, that is, calls `gl.readpixels`.

<playground src="framebuffer-picker.ts"></playground>

## Create FrameBufferPicker

```typescript
import { FramebufferPicker } from "@oasis-engine-toolkit/framebuffer-picker";

const framebufferPicker = rootEntity.addComponent(FramebufferPicker);
framebufferPicker.camera = camera;
```

## Register picking events

```typescript
class ClickScript extends Script {
  onUpdate(): void {
    const inputManager = this.engine.inputManager;
    if (inputManager.isPointerDown(PointerButton.Primary)) {
      const pointerPosition = inputManager.pointerPosition;
      framebufferPicker.pick(pointerPosition.x, pointerPosition.y).then((renderElement) => {
        if (renderElement) {
          // ...
        } else {
          // ...
        }
      });
    }
  }
}

cameraEntity.addComponent(ClickScript);
```
