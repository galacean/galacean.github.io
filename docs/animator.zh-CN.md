---
order: 10
title: 动画控制
type: 组件
---

动画控制组件（[Animator](${api}core/animation/Animator)）可以通过状态机组织动画片段（[AnimationClip](${api}core/animation/AnimationClip)）实现更加灵活丰富的动画效果。

<playground src="skeleton-animation.ts"></playground>

## 基本使用
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

### 控制播放速度

你可以通过 [speed](${api}core/animation/Animator#speed)  属性来控制动画的播放速度。 `speed` 默认值为 `1.0` ，值越大播放的越快，越小播放的越慢。


```typescript
animator.speed = 2.0；
```

### 设置动画数据

你可以通过 [animatorController](${api}core/animation/Animator#animatorController)  属性来设置动画控制器的动画数据，加载完成的GLTF模型会自动添加一个默认的AnimatorController。


```typescript
animator.animatorController = new AnimatorController()；
```


### 播放指定动画状态

<playground src="skeleton-animation-play.ts"></playground>

你可以使用 [play](${api}core/animation/Animator#play) 方法来播放指定的AnimatorState。参数为AnimatorState的`name`，其他参数说明详见[API文档](${api}core/animation/Animator#play)

```typescript
  animator.play("run");
```

### 动画过渡

<playground src="skeleton-animation-crossfade.ts"></playground>

你可以使用 [crossFade](${api}core/animation/Animator#crossFade) 方法来使角色过渡到指定状态。第一个参数为要过渡到的动画状态的`name`，第二个参数为归一化的动画过渡时间，其他参数说明详见[API文档](${api}core/animation/Animator#crossFade)。


### 动画事件

<playground src="animation-event.ts"></playground>

你可以使用 [AnimationEvent](${api}core/animation/AnimationEvent) 来为AnimationClip添加事件，动画事件将在指定时间调用你在同一实体上绑定组件的指定回调函数。

```typescript
const event = new AnimationEvent();
event.functionName = "test";
event.time = 0.5;
clip.addEvent(event);
```

## 使用动画状态机控制动画

在进一步介绍使用方法之前，先简单介绍下动画系统的构成以便理解。动画系统的构成如下：


### 动画系统的构成

![image-20210830233452874](https://gw.alipayobjects.com/zos/OasisHub/b973418a-cca7-46c9-9298-a54e7d445f70/image-20210830233452874.png)

#### [Animator](${api}core/animation/Animator)
动画系统的控制器组件，用于控制动画的播放。

#### [AnimatorController](${api}core/animation/AnimatorController)
用于存储动画控制组件的动画数据。

#### AnimatorControllerParameter（0.6版本将会提供）
动画控制器中使用的变量，用于在动画状态机切换状态使用。

#### [AnimatorControllerLayer](${api}core/animation/AnimatorControllerLayer)
存储该层的动画状态机数据，混合模式以及混合的权重。

#### [AnimatorStateMachine](${api}core/animation/AnimatorStateMachine)
动画状态机，用于控制动画状态的播放逻辑，每个动画状态绑定一个AnimationClip

#### [BlendingMode](${api}core/animation/AnimatorControllerLayer#blendingMode)
动画层的混合模式

#### [AnimatorState](${api}core/animation/AnimatorState)
AnimatorState是动画状态机的基本构成。 每个状态都包含一个 AnimationClip，当角色处于该状态时，则会播放该AnimationClip。

#### [AnimatorTransition](${api}core/animation/AnimatorTransition)
AnimatorTransition定义了状态机何时以及如何从一个状态过渡到另一个状态。

#### [AnimationClip](${api}core/animation/AnimationClip)
动画片段，存储基于关键帧的动画。

#### [AnimationCurve](${api}core/animation/AnimationCurve)
存储在指定时间计算的关键帧集合。

#### [AnimationEvent](${api}core/animation/AnimationEvent)
AnimationEvent 可以让你在指定时间调用其同一实体绑定的脚本的回调函数.

#### [Keyframe](${api}core/animation/KeyFrame)
动画关键帧

#### [Interpolation](${api}core/animation/AnimationCurve#interpolation)
动画曲线中关键帧的插值方式。

### 使用AnimatorTransition做动画过渡
你可以通过为AnimatorState添加AnimatorTransition实现动画状态间的过渡。

```typescript
const walkState = animatorStateMachine.addState('walk');
walkState.clip = walkClip;
const runState = animatorStateMachine.addState('run');
walkState.clip = runClip;
const transition = new AnimatorStateTransition();
transition.duration = 1;
transition.offset = 0;
transition.exitTime = 0.5;
transition.destinationState = runState;
walkState.addTransition(runState);
animator.play("walk");
```
通过这样的方式你之后每次在该动画状态机所在的层播放 `walk` 动画时都会在播放一半时开始过渡到 `run` 动画。

### 动画叠加

<playground src="skeleton-animation-additive.ts"></playground>

动画叠加是通过AnimatorControllerLayer间的混合达到的效果。第一层是基础动画层，修改它的权重及混合模式将不会生效。将想要叠加的动画状态添加到其他层并将它的混合模式设置为 `AnimatorLayerBlendingMode.Additive` 即可实现动画叠加效果，Oasis引擎支持多层的动画叠加。
