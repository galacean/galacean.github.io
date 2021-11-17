---
order: 3
title: Spine
type: 二方库
---

Oasis Engine 通过 [BufferMesh](${docs}buffer-mesh-cn) 实现了 spine 动画的渲染。

> **注**：oasis spine 运行时目前指支持 spine 3.8 以上版本动画的播放。

<playground src="spine-animation.ts"></playground>

## 安装

_@oasis-engine/spine_ 是 Oasis Engine 的二方包，需要手动安装一下：

```bash
npm i @oasis-engine/spine --save
```

## 使用
### 资源加载

当引入了 _@oasis-engine/spine_ 后，会自动在 [engine](${api}core/Engine) 的 [resourceManager](${api}core/Engine#resourceManager) 上注册 spine 资源的loader。通过 resourceManager 的 [load](${api}core/ResourceManager/#load) 方法能够加载 spine 动画资源。

- 当传递参数为 url 时，默认 spine 动画的资源拥有同样的 baseUrl，仅需传递 json 文件cdn即可。
- 当传递参数为 urls 数组时，需要传递 json, atlas, image（png，jpg）三个资源的 cdn 地址。
- 资源的 type 必须指定为 spine。

加载完毕后，会同步返回一个 spine entity 对象，能够直接通过 addChild 方法，将 spine 动画添加到场景当中。

```typescript
const spineEntity = await engine.resourceManager.load(
  {
    url: 'Your spine animation file(.json or .bin).',
    type: 'spine',
  },
  // {
    // urls: [
      // 'Your spine animation file(.json or .bin).',
      // 'atlas file',
      // 'texture image'
    // ],
    // type: 'spine',
  // }
);

root.addChild(spineEntity);

```

### 动画播放

需要播放动画时，需要获取到 spine entity 的上的 SpineAnimation 组件。SpineAnimation 组件对外暴露 [AnimationState](http://zh.esotericsoftware.com/spine-api-reference#AnimationState) 以及 [Skeleton](http://zh.esotericsoftware.com/spine-api-reference#Skeleton) 接口，能够借助 spine-core 原生 API 来播放动画。

```typescript
import { SpineAnimation } from '@oasis-engine/spine';

const spineEntity = await engine.resourceManager.load(
  {
    url: 'Your spine animation file(.json or .bin).',
    type: 'spine',
  },
);
root.addChild(spineEntity);

const spineAnimation = spineEntity.getComponent(SpineAnimation);
spineAnimation.state.setAnimation(0, 'your_animation_name', true);

```

### 插槽拆分
spine 组件会合并 spine 动画的所有顶点生成一个 `Mesh`。使用 `addSeparateSlot` 方法能够将指定名称的插槽拆分成单独的 `SubMesh`，然后使用 `hackSeparateSlotTexture` 方法，能够替换拆分插槽的材质。

```
// hackTexture: another texture
const spineAnimation = spineEntity.getComponent(SpineAnimation);
spineAnimation.addSeparateSlot('slot_name');
spineAnimation.hackSeparateSlotTexture('slot_name', hackTexture);

```
通过以上方式能够实现皮肤混搭的效果:
<playground src="spine-hack-slot-texture.ts"></playground>


### 常见QA
- 如何获得 spine 资源？
通过 spine 编辑器的导出功能能够导出所需的 json, atlas, png 文件。
如果导出资源可以参考 spine 官方文档：http://zh.esotericsoftware.com/spine-export/
- 如何进行动画控制？
可以参考文档：http://zh.esotericsoftware.com/spine-api-reference#AnimationState
这里列举几个常见的例子：
```
// 单次播放
spineAnimation.state.setAnimation(0, 'your_animation_name', false);
// 循环动画
spineAnimation.state.setAnimation(0, 'your_animation_name', true);
// 暂停播放
spineAnimation.state.timeScale = 0;
// 动画A播放完毕后循环播放动画B
spineAnimation.state.setAnimation(0, 'animationA', false);
spineAnimation.state.addAnimation(0, 'animationA', true, 0);
```
spine 动画的事件与回调可以参考文档：
http://esotericsoftware.com/spine-unity-events



