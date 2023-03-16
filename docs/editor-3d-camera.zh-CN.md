---
order: 4
title: 相机
type: 功能
group: 3D 渲染
label: Editor-Feature/Rendering-3d
---

至此，3D 场景已经搭建完毕，但是别忘了一件事，我们刚才的操作都是基于**编辑器相机**进行操作的，我们还得配置**项目实际运行时的相机**。

相机是场景渲染的入口，通常场景中所有的元素都是以相机为出发点进行渲染，我们可以把相机理解为人眼或者拍摄电影的摄像机。一个场景可以包含多个相机，他们可以将场景的渲染结果呈现在整个屏幕或屏幕的部分区域。Camera 在引擎里是组件，添加组件后可以让 Entity 具备相机功能。相机有两种投影方式，一种是**透视投影**，通常用于 3D 元素的渲染，有近大远小的效果。一种是**正交投影**，没有近大远小，一般做 2D 元素的渲染。Oasis Engine 的相机实现了自动视锥剔除，只渲染视锥体内的物体。详细属性说明可以查看[相机文档](${docs}camera-cn)。

## 添加相机组件

在节点树上选中想要添加相机组件实体，点击右侧检查器的『添加组件』按钮，选择相机即可：

<img src="https://gw.alipayobjects.com/zos/OasisHub/6990fe5d-20d2-45ee-968f-0338014c3325/image-20230314191805682.png" alt="image-20230314191805682" style="zoom:50%;" />

在检查器里可以看到被添加的相机组件属性，并且左下角的相机预览可以方便地查看项目实际运行时的相机效果：

![image-20230314192758922](https://gw.alipayobjects.com/zos/OasisHub/78d126c5-1a07-4be7-b034-881ddd788d78/image-20230314192758922.png)

## 相机组件说明

<img src="https://gw.alipayobjects.com/zos/OasisHub/490bf4d8-ba90-4c67-8e6c-6e063fd94e1b/image-20230314194131458.png" alt="image-20230314194131458" style="zoom:50%;" />

| 属性 | 引擎接口 | 解释 |
| :-- | :-- | :-- |
| 是否正交 | [isOrthographic](${api}core/Camera#isOrthographic) | 是否正交投影，默认是 `false` |
| 正交尺寸 | [orthographicSize](${api}core/Camera#orthographicSize) | 正交模式下相机的一半尺寸 |
| 广角 | [fieldOfView](${api}core/Camera#fieldOfView) | 透视模式下的视角 |
| 近裁剪面 | [nearClipPlane](${api}core/Camera#nearClipPlane) | 近裁剪平面 |
| 远裁剪面 | [farClipPlane](${api}core/Camera#farClipPlane) | 远裁剪平面 |
| 渲染优先级 | [priority](${api}core/Camera#priority) | 渲染优先级，用来确定在多相机的情况下按照什么顺序去渲染相机包含的内容。 |
| 视口 | [viewport](${api}core/Camera#viewport) | 视口，确定内容最后被渲染到目标设备里的范围，默认是全屏（0，0，1，1），设置值都是归一化的。 |
| 清除标志 | [clearFlags](${api}core/Camera#clearFlags) | 在渲染这个相机前清理画布缓冲的标记 |

- 清除标志

<img src="https://gw.alipayobjects.com/zos/OasisHub/bd30f5bf-0dc2-4626-b06a-4c15c13f7b38/image-20230314192211356.png" alt="image-20230314192211356" style="zoom:50%;" />

- 所有：清除颜色，深度，模板缓冲
- 颜色：只清除颜色缓冲
- 深度：只清除深度缓冲
- 模板：只清除模板缓冲
- 颜色深度：清除颜色、深度缓冲
- 颜色模板：清除颜色、模板缓冲
- 深度模板：清除深度、模板缓冲
- 无：不清除任何缓冲

## 编辑器相机

编辑器也暴露了几个编辑时相机配置选项，主要用来解决搭建场景时，裁剪面太远或者太近导致看不到物体的问题：

<img src="https://gw.alipayobjects.com/zos/OasisHub/8cf08b2a-f3d7-4156-b88f-2982f21f24d2/image-20230314191512259.png" alt="image-20230314191512259" style="zoom:50%;" />
