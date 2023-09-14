---
order: 1
title: 鼠标与触控
type: 交互
label: Interact
---

引擎中提供了基本的输入系统，正因为 Galacean 跨端跨平台的特性，我们的输入系统也需要兼容 PC 端与移动端，并且包含键盘，鼠标与触屏等操作，当前版本已支持不同端不同设备的点击输入：

- **统一事件**：抹平了 [MouseEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent) 与 [TouchEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/TouchEvent) 的差异，统一使用 **PointerEvent**，使得点击事件在概念上和接口上都得到统一。
- **多触控点**：当开启多触控点开关 [multiPointerEnabled](${api}core/InputManager#multiPointerEnabled) 时，一帧内可同时存在多个 Pointer ，每个 Pointer 互相独立，响应对应的事件并回调相应的钩子函数。
- **多相机**：当出现多相机时，会依次检查渲染范围包含了点击点的所有相机，并根据相机的渲染顺序进行排序（后渲染优先），如果当前比较的相机渲染场景内没有命中 Entity 且相机的背景透明，我们会把点击事件继续传递至上一个渲染的相机，直到命中 Entity 或者遍历完相机。

  <img src="https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*Y2DIRb1yJEEAAAAAAAAAAAAAARQnAQ" alt="image.png" style="zoom:50%;" />

## 如何使用

### 生命周期回调

输入系统的接口已经整合到引擎的[脚本组件生命周期](${docs}script-cn#组件生命周期函数)中，用户可以很方便地添加以下事件，同时钩子函数中会携带触发此回调的 Pointer 实例。

| 接口 | 触发时机与频率 |
| :-- | :-- |
| [onPointerEnter](${api}core/Script#onPointerEnter) | 当触控点进入 Entity 的碰撞体范围时触发一次 |
| [onPointerExit](${api}core/Script#onPointerExit) | 当触控点离开 Entity 的碰撞体范围时触发一次 |
| [onPointerDown](${api}core/Script#onPointerDown) | 当触控点在 Entity 的碰撞体范围内按下时触发一次 |
| [onPointerUp](${api}core/Script#onPointerUp) | 当触控点在 Entity 的碰撞体范围内松开时触发一次 |
| [onPointerClick](${api}core/Script#onPointerClick) | 当触控点在 Entity 的碰撞体范围内按下并松开，在松开时触发一次 |
| [onPointerDrag](${api}core/Script#onPointerDrag) | 当触控点在 Entity 的碰撞体范围内按下时**持续**触发，直至触控点解除按下状态 |

触发时序如下： <img src="https://gw.alipayobjects.com/zos/OasisHub/33174f90-104d-44cf-8905-8af54e6c19a7/image-20211001164136273.png" alt="image-20211001164136273" style="zoom:67%;" />

### 光标按键检测

#### InputManager

InputManager 管理全局的 Pointer，通过调用相关的方法可以获取当前全局的光标信息以及键位操作记录。

| 方法名称                                               | 方法释义                     |
| ------------------------------------------------------ | ---------------------------- |
| [pointers](${api}core/InputManager#pointers) | 返回当前活跃的光标 |
| [isPointerHeldDown](${api}core/InputManager#isPointerHeldDown) | 返回这个光标按键是否被持续按住 |
| [isPointerDown](${api}core/InputManager#isPointerDown)         | 返回当前帧是否按下过此光标按键   |
| [isPointerUp](${api}core/InputManager#isPointerUp)             | 返回当前帧是否抬起过此光标按键   |

#### Pointer

Pointer 则表示每个独立的光标实例，通过调用相关的方法可以精确地拿到此光标在此刻的状态，位姿，键位以及本帧的移动差值。

| 方法名称                                               | 方法释义                     |
| ------------------------------------------------------ | ---------------------------- |
| [phase](${api}core/Pointer#phase)         | 返回此刻光标的状态，如抬起，按下，静止或移动等  |
| [button](${api}core/Pointer#button)             | 返回触发此状态的光标按键，如鼠标左，中，右键等   |
| [pressedButtons](${api}core/Pointer#pressedButtons) | 返回此刻光标持续按住的键位 |
| [deltaPosition](${api}core/Pointer#deltaPosition)         | 返回本帧光标移动的差值   |
| [position](${api}core/Pointer#position)             | 返回本帧光标的位置   |

如下示例：

- 最左边的立方体添加了对 Enter 与 Exit 的响应，当鼠标移动到上方和鼠标移出时便会触发它颜色的改变。
- 中间的立方体添加了对 Drag 的响应，你可以用鼠标拖拽这个立方体在空间内任意移动。
- 最右边的立方体添加了对 Click 的响应（先 down 后 up ），当鼠标点击时会触发它颜色的改变。

<playground src="input-pointer.ts"></playground>

### Q & A

#### 0. 为什么触控在 PC 端正常，但是在移动端异常

在移动端，触控会触发 HTML 元素的默认行为，一旦触发默认行为，触控就会从元素上被移除（pointercancel），可以通过设置画布的 `touchAction` 解决：

```typescript
(engine.canvas._webCanvas as HTMLCanvasElement).style.touchAction = "none";
```

#### 1. 如何排查为何 Entity 没被触控点检测到？

- **物理引擎**：请保证初始化引擎的同时初始化物理引擎。
- **碰撞组件**：请保证 Entity 内包含 Collision 组件，且碰撞体形状契合碰撞发生的范围区间。
- **Entity 活跃**：Entity 被正确添加到三维空间的指定位置，且 isActive 为 True 。
- **不被遮挡**：请保证期望被命中的 Entity 在正常渲染的相机中且面向相机的方向无其他遮挡物。

#### 2. 如何实现三维场景中的点击命中？

三维空间中的点击命中主要依靠射线检测的方式，整个流程大致可以分为三步：

- Entity 添加碰撞体组件，且设置好合适的碰撞体形状。（请确定 Entity 被添加在三维空间中）
- 画布监听 **PointerEvent** ，获取屏幕接收到点击事件携带的坐标信息并转换为三维空间中的一条射线，此处简单可理解为此点同时穿过 NDC 矩阵的远平面与近平面，因此只需要以近平面交点的三维空间坐标为起始点，远平面的三维空间左边为射线途经的点，即可得到这条射线，详细可见 Camera 中的 [viewportPointToRay](${api}core/Camera#viewportPointToRay) 函数。
- 接下来只需要调用物理引擎的射线检测接口，便可以获取与射线发生碰撞的 Entity 实例，然后执行实例内相应的接口方法即可。

#### 3. 兼容性

截止 2022 年 7 月，不同平台对 PointerEvent 的兼容性已经达到了接近 95% 。

<img src="https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*9_pmR6kKancAAAAAAAAAAAAAARQnAQ" alt="image-20211001164136273" style="zoom:67%;" />

如果遇到不同平台的兼容性问题，可以在 https://github.com/galacean/polyfill-pointer-event 为我们提 issue 。

设计思路可参考：https://github.com/galacean/engine/wiki/Input-system-design.
