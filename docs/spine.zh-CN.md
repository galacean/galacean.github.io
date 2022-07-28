---
order: 3
title: Spine
type: 二方库
---

Spine 动画是一款针对游戏开发的 `2D 骨骼动画`，它通过将图片绑定到骨骼上，然后再控制骨骼实现动画，它可以满足程序对动画的`控制`与`自由度`，同时也为美术与设计提供了更`高效`和`简洁`的工作流。

|  | 表现效果 | 性能 | 文件体积 | 灵活程度 | 上手难度 | 是否免费 |
| --- | --- | --- | --- | --- | --- | --- |
| Spine | 最优 | 次之 | 最优 | 最优 | 最复杂 | 工具收费 |
| Lottie | 次之 | 最差 | 次之 | 次之 | 次之 | 免费 |
| 帧动画 | 最差 | 最优 | 最差 | 最差 | 最简单 | 免费 |

Spine 动画支持换皮换肤，动画混合以及使用代码控制骨骼。

Oasis Engine 通过 [BufferMesh](${docs}buffer-mesh-cn) 实现了 spine 动画的渲染。


## 准备

- 下载 Spine 编辑器，并选择 3.8 以上版本制作动画。
- 开发者使用 Spine 需手动添加 [@oasis-engine/spine](https://github.com/oasis-engine/engine-spine)  二方包。

```bash
npm i @oasis-engine/spine --save
```

## 使用

### 资源导出
通过 spine 编辑器的导出功能能够导出所需的资源文件。导出方法如下：
![](https://gw.alipayobjects.com/mdn/mybank_yul/afts/img/A*jh0UTYlkKrIAAAAAAAAAAAAAARQnAQ#crop=0&crop=0&crop=1&crop=1&id=xGebk&originHeight=1232&originWidth=1754&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

oasis spine 运行时需要使用 .json（或者.bin）, atlas, png 这几种格式的资源文件。导出时，能够选择文件导出的格式：

#### 导出 JSON

![](https://gw.alipayobjects.com/mdn/mybank_yul/afts/img/A*VWQEQoiALSwAAAAAAAAAAAAAARQnAQ#crop=0&crop=0&crop=1&crop=1&id=sIw42&originHeight=1342&originWidth=1726&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

#### 导出二进制

![](https://gw.alipayobjects.com/mdn/mybank_yul/afts/img/A*gs1HRId9wPcAAAAAAAAAAAAAARQnAQ#crop=0&crop=0&crop=1&crop=1&id=q3yyW&originHeight=1180&originWidth=1710&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

导出后，在目标文件夹内会看到 .json（或者.bin）, atlas, png 三种格式的资源文件。oasis spine 运行时能够加载这些文件，播放 spine 动画。
需要注意的是，oasis spine 运行时目前只支持加载单张纹理，所以当贴图尺寸过大时，需要对图片资源进行缩放处理，把贴图的张数控制在一张。
文件导出的详细配置见 spine 官方文档：[http://zh.esotericsoftware.com/spine-export](http://zh.esotericsoftware.com/spine-export/)

### 资源加载
当引入了 _@oasis-engine/spine_ 后，会自动在 [engine]($%7Bapi%7Dcore/Engine) 的 [resourceManager]($%7Bapi%7Dcore/Engine#resourceManager) 上注册 spine 资源的资源加载器。通过 resourceManager 的 [load]($%7Bapi%7Dcore/ResourceManager/#load) 方法能够加载 spine 动画资源。

- 当传递参数为 url 时，默认 spine 动画的资源拥有同样的 baseUrl，仅需传递  json（或者 bin） 文件的 cdn 即可。
- 当传递参数为 urls 数组时，需要传递 json（或者 bin），atlas， image（png，jpg）三个资源的 cdn 地址。
- 资源的 type 必须指定为 spine。

加载完毕后，会同步返回一个 spine entity 对象，能够直接通过 addChild 方法，将 spine 动画添加到场景当中。

<playground src="spine-animation.ts"></playground>


### 动画播放

需要播放动画时，需要获取到 spine entity 的上的 SpineAnimation 组件。SpineAnimation 组件对外暴露 [AnimationState](http://zh.esotericsoftware.com/spine-api-reference#AnimationState) 以及 [Skeleton](http://zh.esotericsoftware.com/spine-api-reference#Skeleton) 接口，能够借助 spine-core 原生 API 来播放动画。

#### 
#### 动画控制
通过 SpineAnimation 暴露的 AnimationState 对象，能够实现动画的控制，比如循环播放动画，暂停动画播放等。这里可以参考下面的示例。
详细的 API 可以参考 AnimationState 的官方文档：[http://zh.esotericsoftware.com/spine-api-reference#AnimationState](http://zh.esotericsoftware.com/spine-api-reference#AnimationState)


#### 动画事件机制
spine 还提供了一些事件方便用户进行开发。动画事件的机制如下图所示：
![](https://gw.alipayobjects.com/mdn/mybank_yul/afts/img/A*fC1NT5tTET8AAAAAAAAAAAAAARQnAQ#crop=0&crop=0&crop=1&crop=1&id=JUZeZ&originHeight=280&originWidth=640&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
详细文档：
[http://esotericsoftware.com/spine-unity-events](http://esotericsoftware.com/spine-unity-events)
通过 AnimationState 的 addListener 方法，能够在不同的事件触发时，添加回调方法。


### 插槽拆分

spine 组件会合并 spine 动画的所有顶点生成一个 `Mesh`。使用 `addSeparateSlot` 方法能够将指定名称的插槽拆分成单独的 `SubMesh`，然后使用 `hackSeparateSlotTexture` 方法，能够替换拆分插槽的材质。

<playground src="spine-hack-slot-texture.ts"></playground>





