---
order: 1
title: 动画控制组件
type: 动画
label: Animation
---

动画控制组件（[Animator](${api}core/Animator)）可以通过状态机组织动画片段（[AnimationClip](${api}core/AnimationClip)）实现更加灵活丰富的动画效果。

### 参数说明

| 属性               | 功能说明                       |
| :----------------- | :----------------------------- |
| animatorController | 绑定 `AnimatorController` 资产 |

## 编辑器使用

通过 `AnimatorController` 编辑器，用户可以很方便的添加过渡和混合等动画效果。

1. 将带动画的模型上传到编辑器上，编辑器会自动加载其上的动画片段到资源面板中

![1](https://mdn.alipayobjects.com/huamei_3zduhr/afts/img/A*Qc8sQ6iJd8IAAAAAAAAAAAAADsJ_AQ/original)

2. 当我们把模型拖入到场景中，模型以初始姿态展示出来，但是并不会播放任何动画，我们需要在模型实体上添加 Animator 组件，来控制动画的播放

![2](https://mdn.alipayobjects.com/huamei_3zduhr/afts/img/A*kuSLTaxomrUAAAAAAAAAAAAADsJ_AQ/original)

3. Animator 组件需要引入一个 AnimatorController 资产，我们创建并引入

![3](https://mdn.alipayobjects.com/huamei_3zduhr/afts/img/A*irT7SZvw4N8AAAAAAAAAAAAADsJ_AQ/original)

![4](https://mdn.alipayobjects.com/huamei_3zduhr/afts/img/A*VtX3RJR8kdMAAAAAAAAAAAAADsJ_AQ/original)

4. 刚创建的 AnimatorController 中没有任何数据，我们需要对他进行编辑， 双击资产, 并为它添加一个 AnimatorState

![5](https://mdn.alipayobjects.com/huamei_3zduhr/afts/img/A*BcYXSI6OTyoAAAAAAAAAAAAADsJ_AQ/original)

5. 点击 AnimatorState 为它绑定一个 AnimationClip

![6](https://mdn.alipayobjects.com/huamei_3zduhr/afts/img/A*KwFzRZCmbxoAAAAAAAAAAAAADsJ_AQ/original)

6. 至此你在导出的项目中就可以通过 `animator.play("New State")` 播放 `run` 动画了。如果你没有为实体添加 Animator 组件的话 Galacean Engine 会为你默认创建一个并且 AnimatorController 中默认添加了模型的所有动画，拿上图的模型举例，你只需要直接调用 `animator.play("run")` 就可以了。以上内容是可以帮助你更清晰的了解 Animator 的运行机制，当然除此以外你可以通过 AnimatorController 的编辑器实现更多的功能。



## 脚本使用

### 播放动画

在加载GLTF模型后引擎会自动为模型添加一个Animator组件，并将模型中的动画片段加入其中。可以直接在模型的根实体上获取Animator组件，并播放指定动画。

```typescript
engine.resourceManager
  .load<GLTFResource>("https://gw.alipayobjects.com/os/bmw-prod/5e3c1e4e-496e-45f8-8e05-f89f2bd5e4a4.glb")
  .then((asset) => {
    const { defaultSceneRoot } = asset;
    rootEntity.addChild(defaultSceneRoot);
    const animator = defaultSceneRoot.getComponent(Animator);
    animator.play("run");
});
```

#### 控制播放速度

你可以通过 [speed](${api}core/Animator#speed)  属性来控制动画的播放速度。 `speed` 默认值为 `1.0` ，值越大播放的越快，越小播放的越慢。当值为负数时，进行倒播。


```typescript
animator.speed = 2.0；
```

#### 暂停/恢复播放

你可以通过设置 Animator 的 [enabled](${api}core/Animator#enabled) 来控制动画的暂停和播放.

```typescript
// 暂停
animator.enabled = false;
// 恢复
animator.enabled = true;
```

如果你只想针对某一个动画状态进行暂停，可以通过将它的速度设置为0来实现。

```typescript
const state = animator.findAnimatorState('xxx');
state.speed = 0;
```

#### 播放指定动画状态

<playground src="skeleton-animation-play.ts"></playground>

你可以使用 [play](${api}core/Animator#play) 方法来播放指定的AnimatorState。参数为AnimatorState的`name`，其他参数说明详见[API文档](${api}core/Animator#play)。

```typescript
animator.play("run");
```

如果需要在动画中的某一时刻开始播放可以通过以下方式

```typescript
const layerIndex = 0;
const normalizedTimeOffset = 0.5; // 归一化的时间
animator.play("run", layerIndex, normalizedTimeOffset);
```

### 动画数据

#### 设置动画数据

你可以通过 [animatorController](${api}core/Animator#animatorController)  属性来设置动画控制器的动画数据，加载完成的GLTF模型会自动添加一个默认的AnimatorController。


```typescript
animator.animatorController = new AnimatorController()；
```

#### 复用动画数据

有的时候模型的动画数据存储在其他模型中，可以用如下的方式引入使用：

<playground src="skeleton-animation-reuse.ts"></playground>

除此以外还有一种方式，Animator的 [AnimatorController](${api}core/AnimatorController) 就是一个数据存储的类，它不会包含运行时的数据，基于这种设计只要绑定Animator组件的模型的**骨骼节点的层级结构和命名相同**，我们就可以对动画数据进行复用。

```typescript
const animator = model1.getComponent(Animator);
animator.animatorController = model2.getComponent(Animator).animatorController;
```
