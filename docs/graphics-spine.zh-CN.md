---
order: 7
title: Spine
type: 图形
group: 2D
label: Graphics/2D
---

Spine 动画是一款针对游戏开发的 `2D 骨骼动画`，它通过将图片绑定到骨骼上，然后再控制骨骼实现动画，它可以满足程序对动画的`控制`与`自由度`，同时也为美术与设计提供了更`高效`和`简洁`的工作流。

|        | 表现效果 | 性能 | 文件体积 | 灵活程度 | 上手难度 | 是否免费 |
| ------ | -------- | ---- | -------- | -------- | -------- | -------- |
| Spine  | 最优     | 次之 | 最优     | 最优     | 最复杂   | 工具收费 |
| Lottie | 次之     | 最差 | 次之     | 次之     | 次之     | 免费     |
| 帧动画 | 最差     | 最优 | 最差     | 最差     | 最简单   | 免费     |

Spine 动画支持换皮换肤，动画混合以及使用代码控制骨骼。

## 资源导出

下载 Spine 编辑器，并选择 3.8 以上版本制作动画。通过 spine 编辑器的导出功能能够导出所需的资源文件。导出后，在目标文件夹内会看到 .json（或者.bin）, atlas, png 三种格式的资源文件。Galacean Spine 运行时能够加载这些文件，播放 spine 动画。

> 需要注意的是，Galacean Spine 运行时目前只支持加载单张纹理，所以当贴图尺寸过大时，需要对图片资源进行缩放处理，把贴图的张数控制在一张。
文件导出的详细配置见 spine 官方文档：[http://zh.esotericsoftware.com/spine-export](http://zh.esotericsoftware.com/spine-export/)

## 编辑器使用

首先，需要设计师在 spine 编辑器中[导出](http://zh.esotericsoftware.com/spine-export#JSON) spine 素材。素材包含 json，atlas，png 三个文件。

开发者需要同时把三个文件上传到 Galacean Editor。通过资产面板的上传按钮选择 “spine” 资产，选择本地的这三个文件，上传成功后能够在资产面板看到上传的 spine 资产：

<img src="https://mdn.alipayobjects.com/huamei_w6ifet/afts/img/A*zLoHRL_Zk8wAAAAAAAAAAAAADjCHAQ/original"  style="zoom:50%;" />

选择一个节点，添加 Spine 渲染组件，选择 resource 为上一步上传的资产，选择动画名称即播放 spine 动画（如果不选择，默认第一个）：

![spine](https://mdn.alipayobjects.com/huamei_w6ifet/afts/img/A*tqm4R51gYxEAAAAAAAAAAAAADjCHAQ/original)

| 属性 | 功能说明 |
| :--- | :--- |
| `resource` | 选择 Spine 资产 |
| `autoPlay` | 是否自动播放 |
| `loop` | 是否循环播放 |
| `animation` | 动画名称 |
| `Scale` | 动画缩放 |


## 脚本使用

开发者使用 Spine 需手动添加 [@galacean/engine-spine](https://github.com/galacean/engine-spine)  二方包。

```bash
npm i @galacean/engine-spine --save
```

### 资源加载

如果你在编辑器中使用，请参考[文档](${docs}editor-spine)。如果在纯代码项目中，当引入了 _@galacean/engine-spine_ 后，会自动在 [engine]($%7Bapi%7Dcore/Engine) 的 [resourceManager]($%7Bapi%7Dcore/Engine#resourceManager) 上注册 spine 资源的资源加载器。通过 resourceManager 的 [load]($%7Bapi%7Dcore/ResourceManager/#load) 方法能够加载 spine 动画资源。

- 当传递参数为 url 时，默认 spine 动画的资源拥有同样的 baseUrl，仅需传递  json（或者 bin） 文件的 cdn 即可。
- 当传递参数为 urls 数组时，需要传递 json（或者 bin），atlas， image（png，jpg）三个资源的 cdn 地址。
- 资源的 type 必须指定为 spine。

加载完毕后，会同步返回一个 spine entity 对象，能够直接通过 addChild 方法，将 spine 动画添加到场景当中。

<playground src="spine-animation.ts"></playground>

### 动画播放

需要播放动画时，需要获取到 spine entity 的上的 SpineAnimation 组件。SpineAnimation 组件对外暴露 [AnimationState](http://zh.esotericsoftware.com/spine-api-reference#AnimationState) 以及 [Skeleton](http://zh.esotericsoftware.com/spine-api-reference#Skeleton) 接口，能够借助 spine-core 原生 API 来播放动画。

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





