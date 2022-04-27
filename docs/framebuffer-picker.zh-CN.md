---
order: 3
title: 帧缓冲拾取
type: 功能模块
group: 交互
---

在三维应用中时常需要拾取场景中的物体，[射线包围盒](${docs}physics-manager-cn#raycast)是一种常用的方法，在 CPU 中进行拾取，**性能较好，但是精度较差**，因为包围盒比较简单，不能拾取复杂的模型。

当拾取频率不高时，可以考虑使用**像素级精度**的 [FramebufferPicker 组件](${api}framebuffer-picker/FramebufferPicker)；当拾取频率过高时，需要开发者评估好性能开销是否适合业务场景，因为该组件底层会进行 CPU-GPU 通信，即调用 `gl.readPixels` 。

<playground src="framebuffer-picker.ts"></playground>

## 创建帧缓冲拾取

```typescript
import { FramebufferPicker } from "@oasis-engine/framebuffer-picker";

const framebufferPicker = rootEntity.addComponent(FramebufferPicker);
framebufferPicker.camera = camera;
```

## 注册拾取事件

```typescript
framebufferPicker.onPick = (obj) => {
  if (obj) {
    const { mesh, component } = obj;
    // do something...
  }
};

// 鼠标点击触发拾取
document.getElementById("canvas").addEventListener("mousedown", (e) => {
  framebufferPicker.pick(e.offsetX, e.offsetY);
});
```
