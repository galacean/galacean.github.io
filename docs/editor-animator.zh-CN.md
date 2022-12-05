---
order: 3.4
title: 动画编辑
type: 编辑器
group: 组件
label: 编辑器/组件
---

通过 Animator 编辑器，你可以在上面方便的为动画添加过渡和混合：

## 基础使用

1. 将带动画的模型上传到编辑器上，编辑器会自动加载其上的动画片段到资源面板中

   ![4](https://gw.alipayobjects.com/zos/OasisHub/2ee85519-4f48-4e65-8dcc-b6afe9d1f7d9/4.jpg)


2. 当我们把模型拖入到场景中，模型以初始姿态展示出来，但是并不会播放任何动画，我们需要在模型实体上添加Animator组件，来控制动画的播放。
   ![image-20210902230821166](https://gw.alipayobjects.com/zos/OasisHub/405ebaa7-8c03-4fd0-816e-cbcb39562b68/1667457441830-207e0940-4a82-4bc2-8d9c-d12d44c3eb31.png)

3. Animator组件需要引入一个AnimatorController资产，我们创建并引入
   ![image](https://gw.alipayobjects.com/zos/OasisHub/35f5788a-7544-4231-b11e-373fcce31267/1667457702054-45c9d61a-1e9b-49b5-a719-36724471aaa2.png)
   ![image](https://gw.alipayobjects.com/zos/OasisHub/68de5813-be5f-4669-91bc-d8d3f4077c5a/1667457755170-565aaa77-ec4b-462a-9a38-dc7ad66e9c19.png)

4. 刚创建的AnimatorController中没有任何数据，我们需要对他进行编辑， 双击资产, 并为它添加一个AnimatorState
   ![3](https://gw.alipayobjects.com/zos/OasisHub/4f4139aa-eaaf-4b9d-b077-1570e783843d/3.jpg)

5. 点击AnimatorState为它绑定一个AnimationClip：
   ![image](https://gw.alipayobjects.com/zos/OasisHub/8e29b9fa-eeed-4e5c-84c1-ea68f9732a92/1667457999371-e0ed9c57-d44c-4f2a-abda-12eba6e3a934.png)

6. 至此你在导出的项目中就可以通过 `animator.play('New State')` 播放 `running` 动画了。如果你没有为实体添加Animator组件的话OasisEngine会为你默认创建一个并且AnimatorController中默认添加了模型的所有动画，拿上图的模型具体，你只需要直接调用 `animator.play('running')` 就可以了。以上内容是可以帮助你更清晰的了解Animator的运行机制，当然除此以外你可以通过AnimatorController的编辑器实现更多的功能。




### 参数说明

| 属性                 | 功能说明                       |
| :------------------- | :----------------------------- |
| animatorController | 绑定 `AnimatorController` 资产 |

## 默认播放

将AnimatorState连接到`entry`上你导出的项目运行时就会自动播放其上的动画，而不需再调用 `animator.play`。同时你也会看到编辑器的模型也开始播放动画了。
![2](https://gw.alipayobjects.com/zos/OasisHub/de60a906-0d3c-4578-8d50-aa2ce050e560/2.jpg)


## 动画过渡

将两个想要过渡的 `AnimatorState` 连接即可实现动画过渡的效果, 点击两个动画间的连线，可以修改动画过渡的参数调整效果：

![animationcrossfade](https://gw.alipayobjects.com/zos/OasisHub/cd8fa035-0c1c-493e-a0c7-54d301f96156/1667458692286-29d9f543-9b98-4911-8fa7-ac38b61b1668.gif)

### 动画过渡参数说明

| 属性       | 功能说明                                                     |
| :--------- | :----------------------------------------------------------- |
| duration | 过渡时长，时间为相对目标状态的归一化时间, 默认值为 1.0       |
| offset   | 目标状态向前的偏移时间，时间为相对目标状态的归一化时间, 默认值为 0 |
| exitTime | 起始状态过渡开始时间，时间为相对起始状态的归一化时间, 默认值为 0.3 |

## 动画混合

双击 `AnimatorController` 资源文件编辑动画，添加Layer，将混合的动作也连接`entry`：

![animationadditive](https://gw.alipayobjects.com/zos/OasisHub/7548a66b-a72f-4cad-9b27-c9f1a2824aff/1667459461151-4568a32a-07db-427b-922e-3bc6f844097b.gif)

有的时候你想要得到一个固定的姿势，需要裁减设计师给到的动画切片，可以向上图一样修改 `AnimatorState` 的`StartTime` 及 `EndTime`，点击 `AnimatorState` 即可对其进行编辑:

![1](https://gw.alipayobjects.com/zos/OasisHub/cc0db4c9-95f9-48d7-a3ac-48d69e94a31d/1.jpg)


### 动画状态参数说明

| 属性            | 功能说明                                                     |
| :-------------- | :----------------------------------------------------------- |
| Name          | 修改`AnimatorState`的名字，名字在所在的层要是**唯一**的。         |
| AnimationClip | 用于绑定 `AnimationClip` 资产，`AnimationClip` 存储了模型的动画数据。  |
| WrapMode      | 动画状态是循环播放还是播放一次，默认为 `Once` 即播放一次。   |
| Speed         | 动画状态的播放速度，默认值为 1.0 ，值越大动画速度越快        |
| StartTime     | `AnimatorState` 从 `AnimationClip` 的哪个时间开始播放，时间为相对 `AnimationClip` 时长的归一化时间。默认值为 0 ，即从头开始播放。 例如：值为 1.0 ，则是 `AnimationClip` 的最后一帧状态。 |
| EndTime       | `AnimatorState` 播放到 `AnimationClip` 的哪个时间结束播放，时间为相对 `AnimationClip` 时长的归一化时间。默认值为 1.0 ，即播放到最后。 |

你也可以通过修改 `Layer` 的 `Weight` 参数来调整 `Layer` 在混合中的权重，通过修改 `Blending` 来修改混合模式。

![animationadditive2](https://gw.alipayobjects.com/zos/OasisHub/acd80bdf-7c8d-41ac-8a2f-fe75cc6d2da4/1667459778293-be31b02b-7f6c-4c27-becc-2c0c8e80b538.gif)

### Layer参数说明

| 属性       | 功能说明                                                     |
| :--------- | :----------------------------------------------------------- |
| Name     | 该层的名字，仅用于备忘。                                     |
| Weight   | 该层的混合权重，默认值为 1.0 。                              |
| Blending | 该层的混合模式，`Additive` 为叠加模式， `Override` 为覆盖模式，默认值为 `Override` |

Oasis 支持多层的混合，你可以增加更多的层以达到你想要的效果。

![animationadditive3](https://gw.alipayobjects.com/zos/OasisHub/4485bf06-b783-4ff6-9dfd-cb05cc5adf84/1667459905978-f86e9051-7b62-44ad-aa43-87da0248a8f1.gif)
