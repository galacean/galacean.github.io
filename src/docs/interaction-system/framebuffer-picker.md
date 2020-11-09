# 帧缓冲拾取

在三维应用中时常需要拾取场景中的物体，射线包围盒是一种常用的方法，在 CPU 中进行拾取，性能较好，但是精度较差，因为包围盒比较简单，拾取边缘误差较大。当拾取频率不高时，可以考虑使用像素级精度的帧缓冲拾取。[framebuffer-picker]({{book.api}}classes/framebuffer_picker.framebufferpicker.html) 组件提供了帧缓冲拾取支持。

## 创建帧缓冲拾取

```typescript
import { FramebufferPicker } from '@oasis-engine/framebuffer-picker';

const framebufferPicker = rootEntity.addComponent(FramebufferPicker)
framebufferPicker.camera = camera;
framebufferPicker.onPick = (obj) => {
  if (lastMaterial) lastMaterial.baseColorFactor = laseBaseColor;

  if (obj) {
    const { primitive, component } = obj;
    const idx = component.mesh.primitives.indexOf(primitive);
    let material = component.getInstanceMaterial(idx);
    if (!material) {
      material = primitive.material.clone();
      component.setMaterial(idx, material);
    }

    lastMaterial = material;
    laseBaseColor = material.baseColorFactor;
    material.baseColorFactor = new Vector4(1, 0, 0, 1);
  }
}


// 鼠标点击触发拾取
document.getElementById('canvas').addEventListener('mousedown', (e)=>{
    framebufferPicker.pick( e.offsetX, e.offsetY );
});
```