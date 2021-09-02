---
order: 3.4
title: 动画编辑
type: 编辑器
group: 组件
---

通过 Animator 编辑器，你可以在上面方便的为动画添加过渡和混合：

## 基础使用

1. 将带动画的模型上传到编辑器上，编辑器会自动加载其上的动画片段到资源面板中，并且创建一个动画控制器给你编辑动画使用。

![image-20210902230821166](https://gw.alipayobjects.com/zos/OasisHub/6f28e2a1-a062-49ff-bf6e-34eff1495183/image-20210902230821166.png)


2. 为节点增加一个`GLTF模型`组件，并绑定上传的`.gltf` 资产，编辑器会自动帮你把  `AnimatorController` 资产也绑定上,这时一个默认的动画就开始播放了：
   
![animationbindgltf](https://gw.alipayobjects.com/zos/OasisHub/b338d50c-5525-4967-a5cf-1d85497e3cae/animationbindgltf.gif)

3. 如果需要预览其他动画可以切换GLTF模型组件的动画预览选项。通过修改 `speed` 可以调整动画的速度：

![animationpreview](https://gw.alipayobjects.com/zos/OasisHub/68092020-2638-418d-8283-ef410a305038/animationpreview.gif)



### 参数说明
| 属性 | 功能说明 |
| :--- | :--- |
| `asset` | 绑定gLTF模型资产 |
| `animatorController` | 绑定 `AnimatorController` 资产 |
| `speed` | 动画的播放速度。默认值为1.0，值越大动画速度越快 |
| `动画预览` | 快速预览AnimatorController中 `Base Layer` 的 `动画状态` ，`default` 为连接到 `entry` 的 `动画状态`  |


## 动画过渡
双击 `AnimatorController` 资源文件编辑动画，将两个想要过渡的 `动画状态` 连接即可实现动画过渡的效果, 点击两个动画间的连线，可以修改动画过渡的参数调整效果：

![animationcrossfade](https://gw.alipayobjects.com/zos/OasisHub/86b2dae6-8926-40ab-9cba-4b4a2e613b0d/animationcrossfade.gif)

### 动画过渡参数说明
| 属性 | 功能说明 |
| :--- | :--- |
| `duration` | 过渡时长，时间为相对目标状态的归一化时间, 默认值为1.0 |
| `offset` | 目标状态向前的偏移时间，时间为相对目标状态的归一化时间, 默认值为0 |
| `exitTime` | 起始状态过渡开始时间，时间为相对起始状态的归一化时间, 默认值为0.3 |

## 动画混合
双击 `AnimatorController` 资源文件编辑动画，添加Layer，将想要混合的状态连接 `entry` 及 `exit`：

![animationadditive](https://gw.alipayobjects.com/zos/OasisHub/8b0f5252-9a23-492f-b950-d929f341aba6/animationadditive.gif)

有的时候你想要得到一个固定的姿势，需要裁减设计师给到的动画切片，可以向上图一样修改 `动画状态` 的`开始时间` 及 `结束时间`，点击 `动画状态` 即可对其进行编辑:

![image-20210903000900986](https://gw.alipayobjects.com/zos/OasisHub/8295a935-b77d-4f58-aca4-50eeecedec9f/image-20210903000900986.png)


### 动画状态参数说明
| 属性 | 功能说明 |
| :--- | :--- |
| `状态名` | 修改`动画状态`的名字，名字在所在的层要是**唯一**的。 |
| `动画片段` | 用于绑定 `动画片段` 资产，`动画片段` 存储了模型的动画数据。 |
| `WrapMode` | 动画状态是循环播放还是播放一次，默认为 `Once` 即播放一次。|
| `播放速度` | 动画状态的播放速度，默认值为1.0，值越大动画速度越快 |
| `开始时间` | `动画状态` 从 `动画片段` 的哪个时间开始播放，时间为相对 `动画片段` 时长的归一化时间。默认值为0，即从头开始播放。 例如：值为1，则是 `动画片段` 的最后一帧状态。 |
| `结束时间` | `动画状态` 播放到 `动画片段` 的哪个时间结束播放，时间为相对 `动画片段` 时长的归一化时间。默认值为1，即播放到最后。 |

你也可以通过修改 `Layer` 的 `Weight` 参数来调整 `Layer` 在混合中的权重，通过修改 `Blending` 来修改混合模式。

![animationadditive2](https://gw.alipayobjects.com/zos/OasisHub/61861cc0-fe38-476f-8ed8-820fa06824c2/animationadditive2.gif)

### Layer参数说明
| 属性 | 功能说明 |
| :--- | :--- |
| `Name` | 该层的名字，仅用于备忘。 |
| `Weight` | 该层的混合权重，默认值为1。 |
| `Blending` | 该层的混合模式，`Additive` 为叠加模式， `Override` 为覆盖模式，默认值为 `Override` |

Oasis 支持多层的混合，你可以增加更多的层以达到你想要的效果。

![animationadditive3](https://gw.alipayobjects.com/zos/OasisHub/33bf0839-590a-4708-a7de-a1a546f16e49/animationadditive3.gif)
