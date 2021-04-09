Oasis Engine 通过BufferMesh API 实现了 spine 动画的渲染。


## 下载
```typescript
npm i @oasis-engine/engine-spine --save
```
## 
## 使用
### 资源加载
当引入了  @oasis-engine/engine-spine 后，会自动在 engine 的 resourceManager 上注册 spine 资源的loader。通过 resourceManager 的 load 方法能够加载 spine 动画资源。
当传递参数为 url 时，默认 spine 动画的资源拥有同样的 baseUrl，仅需传递 json 文件cdn即可。
当传递参数为 urls 数组时，需要传递 json, atlas, image（png，jpg）三个资源的 cdn 地址。
资源的 type 必须指定为 spine。
加载完毕后，会同步返回一个 spine entity 对象，能够直接通过 addChild 方法，将 spine 动画添加到场景当中。
```typescript
// import * as o3 from 'oasis-engine';
import '@oasis-engine/engine-spine';

init();

function init() {
	// oasis initial code: https://github.com/oasis-engine/engine#usage
  // root: Engine root entity.
  loadSpine(root);
  engine.run();
}

async function loadSpine(root) {
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
}

```


### 动画播放
需要播放动画时，需要获取到 spine entity 的上的 SpineAnimation 组件。
SpineAnimation 组件对外暴露 [AnimationState](http://zh.esotericsoftware.com/spine-api-reference#AnimationState) 以及 [Skeleton](http://zh.esotericsoftware.com/spine-api-reference#Skeleton) 接口，能够借助 spine-core 原生 API 来播放动画。
```typescript
import { SpineAnimation } from '@oasis-engine/engine-spine';

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


## Spine 版本
oasis spine 运行时目前指支持 spine 3.8 以上版本动画的播放。


oasis-engine 0.2 & engine-spine 0.1 - this branch, latest npm
