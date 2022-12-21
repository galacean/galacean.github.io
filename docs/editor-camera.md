---
order: 1.2
title: Camera
type: Editor
group: Component
label: Editor/Component
---

[Camera](${docs}camera-cn) is the entry point for scene rendering. Usually, all elements in the scene are rendered with the camera as the starting point. We can understand the camera as the human eye or the camera for shooting movies. A scene can contain multiple cameras, and they can display the rendering results of the scene on the entire screen or a part of the screen. Camera is a component in the engine. After adding the component, Entity can have the camera function. The camera has two projection methods, one is **perspective projection**, which is usually used for the rendering of 3D elements, and has the effect of near big and far small. One is **orthogonal projection**, there is no near big and far small, and it is generally used for rendering of 2D elements. The Oasis Engine's camera implements automatic frustum culling, rendering only objects within the frustum. For detailed attribute descriptions, please refer to the engine [documentation] (https://oasisengine.cn/#/docs/latest/zh/camera.zh-CN).

## Add camera component

![image-20221212170918740](https://mdn.alipayobjects.com/rms/afts/img/A*ezoYSoV7hhUAAAAAAAAAAAAAAARQnAQ/original/image-20221212170918740.png) Select the camera component entity you want to add on the node tree, and click on the right In the inspector's "Add Component" button, select the camera, and you can see the added camera component properties in the inspector:

<img src="https://mdn.alipayobjects.com/rms/afts/img/A*KAfnSrWFK24AAAAAAAAAAAAAARQnAQ" alt="image-20221212171017016" style="zoom:50%;" />

**Panel properties are only valid for Runtime**

## Description of camera components

### Toggle Orthographic/Perspective

Regarding whether it is Orthographic (isOrthographic), near clipping plane (nearClipPlane), far clipping plane (farClipPlane), viewing angle (fieldOfView), orthographic size (orthographicSize), you can check the engine [documentation](https://oasisengine.cn/#/ docs/latest/zh/camera.zh-CN).

In the editor, it can be easily adjusted through the panel properties.

Perspective mode:

<img src="https://mdn.alipayobjects.com/rms/afts/img/A*8u8LSZJ_HoUAAAAAAAAAAAAAARQnAQ/original/image-20221213170001536.png" alt="image-20221213170001536" style="zoom:50%;" />

Ortho mode:

<img src="https://mdn.alipayobjects.com/rms/afts/img/A*giycTJdSQS8AAAAAAAAAAAAAARQnAQ/original/image-20221213161110593.png" alt="image-20221213161110593" style="zoom:50%;" />

### Render Priority

The camera will render the objects in the scene, and the camera with higher rendering priority will call the rendering method first in the frame cycle.

### View frustum clipping

Enabling frustum clipping will cause the camera to clip renderers outside the camera frustum. The default is enabled, which can improve rendering performance.

### Viewport

Set the rendering area of ​​the camera on the Canvas, the default is full screen (0, 0, 1, 1), and the setting values ​​are all normalized.

<img src="https://mdn.alipayobjects.com/rms/afts/img/A*uVoKRKmg6V8AAAAAAAAAAAAAAARQnAQ/original/image-20221213171203458.png" alt="image-20221213171203458" style="zoom:50%;" / >

- `x` starting horizontal position
- The vertical position where `y` starts
- `z` output screen height
- `w` output screen width

### Clear Flags

<img src="https://mdn.alipayobjects.com/rms/afts/img/A*tBOkTbZS30AAAAAAAAAAAAAAARQnAQ/original/image-20221214194310258.png" alt="image-20221214194310258" style="zoom:50%;" / >

- All: clear color, depth, stencil buffer
- color: only clear the color buffer
- Depth: Only clear the depth buffer
- stencil: only clear the stencil buffer
- Color Depth: Clear Color, Depth Buffer
- Color stencil: clear color, stencil buffer
- Depth Stencil: clear depth, stencil buffer
- none: do not clear any buffers

