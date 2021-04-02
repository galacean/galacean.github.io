# 骨骼动画

Oasis Engine 中的骨骼动画通过 glTF 模型（相关教程请参考[资源加载](${book.manual}resource/resource-manager)）的动画组件（[Animation](${book.api}classes/core.animationclip.html)）获得，动画组件中包含多个动画片段（[AnimationClip](${book.api}classes/core.animation.html)），动画组件可以控制动画片段的播放。

```typescript
// 在脚本组件中使用
class ResourceScript extends Script {
  async onAwake() {
    const {defaultSceneRoot, animations} = await this.engine.resourceManager.load(
      'https://gw.alipayobjects.com/os/basement_prod/aa318303-d7c9-4cb8-8c5a-9cf3855fd1e6.gltf',
    );

    this.entity.addChild(defaultSceneRoot);

    const animator = defaultSceneRoot.getComponent(o3.Animation);

    animator.playAnimationClip(animations[0].name);
  }
}

rootEntity.addComponent(ResourceScript);
```

### 播放速度

通过 `Animation`  组件的 [`timeScale`](${book.api}classes/core.animation.html#timescale)  属性来控制动画的播放速度。 `timeScale` 默认值为 `1.0` ，值越大播放的越快，越小播放的越慢。


```javascript
animator.timeScale = 2.0；
```


### 播放次数

通过设置 [`WrapMode`](${book.api}enums/core.wrapmode.html)  来控制动画播放的模式，默认 [`WrapMode.LOOP`](${book.api}enums/core.wrapmode.html#loop) 。

```typescript
animator.playAnimationClip('walk', {
   wrapMode: WrapMode.LOOP // or WrapMode.ONCE
})；
```


### 动画融合

实现两个动画之间的平滑切换。例如一个角色从步行动画切换到待机动画，直接切换会有明显的跳帧，使用动画混合可以平滑地从上一个动作切换到下一个动作。 通过 `Animation`  组件的 [`crossFade`](${book.api}classes/core.animation.html#crossfade)  接口实现动画融合切换。

```typescript
// 先让角色播放步行（‘walk’）动画
animator.playAnimationClip('walk');  

// 在需要切换的时间点，执行下面的函数。角色将从步行（'walk'）动画 平滑切换到待机（'idle'）动画。
animator.crossFade('idle', 600)；
```


### 动画混合

实现角色的一部分播放一个动画，别的部分播放另外一个动画。例如，一个角色可以上半身播放射击、砍杀等动作，下半身播放站立、走动、跑动等动作。使用这种融合方式可以实现不同动作的自由组合，极大减少美术的工作量。通过 `Animation`  组件的 [`mix`](${book.api}classes/core.animation.html#mix)  接口实现动画组合功能。


```javascript
animator.playAnimationClip('walk');  //先让角色播放步行（'walk'）动画
animator.mix('wave', 'upper_body');  //设置角色的上半身的根骨骼（'upper_body'）播放挥手（'wave'）动画。
```

为了实现动画融合功能，需要对导出的动画资源做一些一致性限制。


### 动画事件


经常需要在动画播放到特定时间的时候触发事件。目前的骨骼动画支持以下事件:

|事件名称|解释|
|:--|:--|
|[`AnimationEvent.FINISHED`](${book.api}enums/core.animationevent.html#finished)|动画播放结束后触发事件，仅在 `WrapMode.ONCE` 时生效 |
| [`AnimationEvent.FRAME_EVENT`](${book.api}enums/core.animationevent.html#frame_event) | 动画播放到特定时间触发事件，需要配置触发时间 |
| [`AnimationEvent.LOOP_END`](${book.api}enums/core.animationevent.html#loop_end) | 循环播放的动画在一轮结束后触发事件，仅在 `WrapMode.LOOP` 是生效|


```typescript
//-- 回调函数
let cb = ()=>{
  console.log('FRAME_EVENT')
};

let cb2 = ()=>{
  console.log('LOOP_END')
};

animator.playAnimationClip('walk', {
  wrapMode: WrapMode.LOOP,  // 使用循环播放模式
  events: [
    { type: AnimationEvent.FRAME_EVENT, triggerTime: 0.5, callback: cb }, // 添加FRAME_EVENT事件
    { type: AnimationEvent.LOOP_END, callback: cb2 }                      // 添加LOOP_END事件
  ]
})；
```




