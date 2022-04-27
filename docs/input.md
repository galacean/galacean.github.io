---
order: 1
title: Pointer
type: Function Modules
group: Interact
---

The engine provides a basic input system. Because of the cross-terminal and cross-platform characteristics of Oasis, our input system also needs the characteristics of the PC and mobile terminals, and includes keyboard, mouse and touch screen operations. The current version supports different devices on different terminals:

- **Unify events**: The difference between [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) and [TouchEvent](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent) is smoothed out, and **PointerEvent** is used uniformly, so that the click event is unified in concept and interface.
- **Multi-touch**: In order not to perform too many ray detections in one frame, if there are multiple Pointers in one frame in time, we will also average them and integrate them into a virtual [Pointer](${api}core/Pointer), and use this as the input source of ray detection.
- **Multiple cameras**: When there are multiple cameras, all cameras whose rendering range contains the clicked point will be checked in turn, and sorted according to the camera's rendering order (post-rendering priority). If the currently compared camera rendering scene does not hit the Entity and the camera's background is transparent , We will continue to pass the click event to the last rendered camera until the Entity is hit or the camera is traversed.

<img src="https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*Y2DIRb1yJEEAAAAAAAAAAAAAARQnAQ" alt="image.png" style="zoom:50%;" />

## How to use
The interfaces of the input system have been integrated into [the life cycle of the script component](${docs}script#component-life-cycle-function) of the engine, and users can easily add the following events:

|Interface|Trigger timing and frequency|
|:--|:--|
|[onPointerEnter](${api}core/Script#onPointerEnter)|Triggered once when the touch point enters the scope of the Entity's collider|
|[onPointerExit](${api}core/Script#onPointerExit) |Triggered once when the touch point leaves the scope of the Entity's collider|
|[onPointerDown](${api}core/Script#onPointerDown) |Triggered once when the touch point is pressed within the scope of the Entity's collider|
|[onPointerUp](${api}core/Script#onPointerUp)   |Triggered once when the touch point is released within the scope of the Entity's collider|
|[onPointerClick](${api}core/Script#onPointerClick)|When the touch point is pressed and released within the collision body of Entity, it will trigger once when released|
|[onPointerDrag](${api}core/Script#onPointerDrag) |When the touch point is pressed within the scope of the Entity's collision body **continuous** triggers until the touch point is released from the pressed state|

This is represented in the schematic diagram below:

<img src="https://gw.alipayobjects.com/zos/OasisHub/33174f90-104d-44cf-8905-8af54e6c19a7/image-20211001164136273.png" alt="image-20211001164136273" style="zoom:50%;" />


The following example:
- The leftmost cube adds responses to Enter and Exit, and when the mouse moves to the top, it will trigger its color change.
- The cube in the middle adds a response to Drag. You can use the mouse to drag this cube to move arbitrarily in the space.
- The rightmost cube adds a response to Click (down first and then up), which will trigger its color change when the mouse is clicked.

<playground src="input-pointer.ts"></playground>

### Q & A

#### 1. How to troubleshoot why the Entity is not detected by the touch point
- **Physics engine**: Please ensure that the physics engine is initialized at the same time as the engine is initialized.
- **Collision component**: Please ensure that the Entity contains the Collision component, and the shape of the collision body fits the range of the collision.
- **Entity is active**: Entity is correctly added to the specified position in the three-dimensional space, and isActive is True.
- **Not occluded**: Please ensure that the Entity that is expected to be hit is in the normally rendered camera and there is no other occlusion in the direction facing the camera.

#### 2. How to implement click hits in three-dimensional space?
Click hits in three-dimensional space mainly rely on radiographic detection. The entire process can be roughly divided into three steps:
- Entity adds the collider component and sets the appropriate collider shape. (Please make sure the Entity is added in the three-dimensional space)
- The canvas listens to **PointerEvent**, obtains the coordinate information carried by the click event received by the screen, and converts it into a ray in the three-dimensional space. Here, it can be simply understood that the point passes through the far plane and the near plane of the NDC matrix at the same time, so only the near plane intersects the point The three-dimensional space coordinates of is the starting point, and the left side of the three-dimensional space of the far plane is the point that the ray passes through, you can get this ray, see the [viewportPointToRay](${api}core/Camera#viewportPointToRay) function in Camera for details.
- Next, you only need to call the ray detection interface of the physics engine to get the Entity instance that collided with the ray, and then execute the corresponding interface method in the instance.

You can refer to the design ideas：https://github.com/oasis-engine/engine/wiki/Input-system-design.