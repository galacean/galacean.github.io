---
order: 2
title: 动画片段
type: 动画
label: Animation
---

**动画片段**是Galacean动画系统的核心元素之一，Galacean支持导入外部设计软件设计的模型动画，设计师输出的带动画的模型中的每个动画在Galacean中会被解析成一个个的**动画片段**资产，我们也可以通过动画片段编辑器创作额外的动画。


有两种常用的方式得到动画片段
1. 导入用第三方工具（例如 Autodesk® 3ds Max®， Autodesk® Maya®， Blender）创建的带动画的模型，详见[美术制作动画片段](${docs}animation-clip-for-artist)
   
![1](https://mdn.alipayobjects.com/huamei_3zduhr/afts/img/A*Qc8sQ6iJd8IAAAAAAAAAAAAADsJ_AQ/original)

2. 在Galacean中创建动画片段（下文会介绍编辑器和脚本这两种创建方式）


## 动画面板介绍
动画片段编辑器目前支持除物理相关组件的所有可插值属性的编辑，如果你需要编辑其他属性，要在实体上添加对应的组件。

![Alt text](https://mdn.alipayobjects.com/huamei_3zduhr/afts/img/A*NzstQooi6vMAAAAAAAAAAAAADsJ_AQ/original)

## 基础操作

### Transform 组件示例

1. 在资产面板中 右键/点击+ 创建 `动画片段` 资产

![1](https://mdn.alipayobjects.com/huamei_3zduhr/afts/img/A*Bs6UQ6Vwz1UAAAAAAAAAAAAADsJ_AQ/original)

2. 双击 `动画片段` 资产,并选择一个实体作为 `动画片段` 的编辑对象

![image-20230116150755284](https://mdn.alipayobjects.com/huamei_3zduhr/afts/img/A*lpghT5f2f8YAAAAAAAAAAAAADsJ_AQ/original)
![image-20230116151013992](https://mdn.alipayobjects.com/huamei_3zduhr/afts/img/A*puAUR61-qVQAAAAAAAAAAAAADsJ_AQ/original)

3. 添加要做动画的属性(这里我添加了两个)

![Alt text](https://mdn.alipayobjects.com/huamei_3zduhr/afts/img/A*0jmGQa_9oS0AAAAAAAAAAAAADsJ_AQ/original)
![image-20230116151429682](https://mdn.alipayobjects.com/huamei_3zduhr/afts/img/A*3oiwSrG8kQEAAAAAAAAAAAAADsJ_AQ/original)

4. 给属性添加关键帧

![image-20230116151707943](https://mdn.alipayobjects.com/huamei_3zduhr/afts/img/A*xZUrRqNu9yIAAAAAAAAAAAAADsJ_AQ/original)
当我们点击添加关键帧按钮时，关键帧会存入当前指定属性的值，所以当我们什么都未改变时，关键帧存入的是此刻这个实体的 `position` 值。我们希望他 60 帧后移动到 (3, 0, 0)的位置，所以先将这个正方体通过属性面板修改到(3, 0, 0) 再添加关键帧
![clip](https://mdn.alipayobjects.com/huamei_3zduhr/afts/img/A*tXYFT42fUQ4AAAAAAAAAAAAADsJ_AQ/original)
同理我们也为 `rotation` 属性添加关键帧
![clip2](https://mdn.alipayobjects.com/huamei_3zduhr/afts/img/A*LlLlQIeEfZEAAAAAAAAAAAAADsJ_AQ/original)
可以看到当属性的值改变时，`动画片段编辑器` 会自动为你添加关键帧，可以让你更方便快速的编辑。

##### 录制模式
我们提供了录制模式以方便开发者快速的添加关键帧。在添加属性之后开启录制模式，当对应的属性修改时就会自动添加关键帧
![record](https://mdn.alipayobjects.com/huamei_3zduhr/afts/img/A*a_vgR76aB7cAAAAAAAAAAAAADsJ_AQ/original)

5. 预览 `动画片段`

你可以直接移动时间线（可以拖动时间线，点击空白位置，在当前帧输入框中修改数值），来观察它在指定时刻的表现，比如我将时间轴移动到 30 帧
![timeline](https://mdn.alipayobjects.com/huamei_3zduhr/afts/img/A*-T6tT6OO_b4AAAAAAAAAAAAADsJ_AQ/original)
也可以直接播放 `动画片段`
![timeline2](https://mdn.alipayobjects.com/huamei_3zduhr/afts/img/A*RNRxS5GHSlEAAAAAAAAAAAAADsJ_AQ/original)
编辑好的 `动画片段`资产可以应用于任一实体，切换实体即可预览其效果
![timeline3](https://mdn.alipayobjects.com/huamei_3zduhr/afts/img/A*wVnySZCp9P0AAAAAAAAAAAAADsJ_AQ/original)

6. 应用 `动画片段`

上一步只是让我们可以预览 `动画片段` 的效果，真正要在项目中使用还是要使用[动画控制组件](${docs}animation-animator)，绑定 [动画控制器](${docs}animation-animatorController) 资产，详见[动画编辑](${docs}animation-animator)。这里我们为正方体添加[动画控制组件](${docs}animation-animator)，可以看到创建的 `动画片段` 已经通过[动画控制组件](${docs}animation-animator)作用到正方体上了。
![animator](https://mdn.alipayobjects.com/huamei_3zduhr/afts/img/A*Zn95TpfDbMkAAAAAAAAAAAAADsJ_AQ/original)

### 文字组件示例

#### 文字字号动画
首先要有一个具有TextRender组件的实体
![image-20230116170015405](https://mdn.alipayobjects.com/huamei_3zduhr/afts/img/A*S_9XSovxcEUAAAAAAAAAAAAADsJ_AQ/original)

此时我们再添加属性时可以看到，可添加关键帧的属性增加了 `TextRenderer` 组件相关的可插值的属性

![textAnim](https://mdn.alipayobjects.com/huamei_3zduhr/afts/img/A*97OvS6MBBywAAAAAAAAAAAAADsJ_AQ/original)

我们添加 fontSize，并按照上文的方式添加关键帧

![textAnim2](https://mdn.alipayobjects.com/huamei_3zduhr/afts/img/A*j2xFQ43GtrMAAAAAAAAAAAAADsJ_AQ/original)


### 帧动画示例
除了数值类型，Galacean还支持引用类型的动画曲线，可以阅读[帧动画](${docs}animation-sprite-sheet)来了解，如何制作帧动画。

## 更多操作

### 操作关键帧

#### 修改关键帧时间

选中关键帧并拖动即可

![Alt text](https://mdn.alipayobjects.com/huamei_3zduhr/afts/img/A*pvoKQYg5XJgAAAAAAAAAAAAADsJ_AQ/original)

#### 修改关键帧的值

开启录制模式，把时间线移动到指定关键帧上，然后重新输入值即可

![Alt text](https://mdn.alipayobjects.com/huamei_3zduhr/afts/img/A*TWuARqwaMtUAAAAAAAAAAAAADsJ_AQ/original)

#### 删除关键帧

选中关键帧右键选择删除

![Alt text](https://mdn.alipayobjects.com/huamei_3zduhr/afts/img/A*pIT1T7EgEg8AAAAAAAAAAAAADsJ_AQ/original)

### 编辑子实体

`动画片段` 不仅可以作用于添加`Animator`组件的实体上，还可以作用于它的子实体上。

1. 我们为刚才的立方体添加一个子实体

![Alt text](https://mdn.alipayobjects.com/huamei_3zduhr/afts/img/A*cRQ6RqDjJiQAAAAAAAAAAAAADsJ_AQ/original)

2. 我们再点击添加属性就可以看到子实体的属性可以添加了

![Alt text](https://mdn.alipayobjects.com/huamei_3zduhr/afts/img/A*F9pdRItUmK4AAAAAAAAAAAAADsJ_AQ/original)

3. 选择子实体之后，添加关键帧即可
   
![Alt text](https://mdn.alipayobjects.com/huamei_3zduhr/afts/img/A*Hb3wRI4_cocAAAAAAAAAAAAADsJ_AQ/original)

### 编辑动画曲线

`动画片段编辑器` 支持动画曲线编辑，点击右上角的 `Curves` 即可切换

![Alt text](https://mdn.alipayobjects.com/huamei_3zduhr/afts/img/A*Nb1OQLNOk1YAAAAAAAAAAAAADsJ_AQ/original)

曲线模式的纵轴为属性的数值
![Alt text](https://mdn.alipayobjects.com/huamei_3zduhr/afts/img/A*2nJNSKjivogAAAAAAAAAAAAADsJ_AQ/original)

你可以按 `shift+滚轮` 调整纵轴的比例
![Alt text](https://mdn.alipayobjects.com/huamei_3zduhr/afts/img/A*e--qQ644ENsAAAAAAAAAAAAADsJ_AQ/original)

属性对应曲线的颜色与按钮的颜色相同

![Alt text](https://mdn.alipayobjects.com/huamei_3zduhr/afts/img/A*EAJXSq_-I7QAAAAAAAAAAAAADsJ_AQ/original)

选择关键帧会出现两个控制点，调整控制点即可调整曲线

![Alt text](https://mdn.alipayobjects.com/huamei_3zduhr/afts/img/A*2XYOTaW6F2sAAAAAAAAAAAAADsJ_AQ/original)

也可以通过右键关键帧直接设置内置的预设值
![Alt text](https://mdn.alipayobjects.com/huamei_3zduhr/afts/img/A*ytdIQpv9eEkAAAAAAAAAAAAADsJ_AQ/original)

## 脚本使用
> 在使用脚本之前，最好阅读[动画系统构成](${docs}animation-system)文档，以帮助你更好的了解动画系统的运行逻辑

你可以自己创建一个 [AnimationClip](${api}core/AnimationClip) 并通过 [addCurveBinding](${api}core/AnimationClip#addCurveBinding) 为它绑定 [AnimationCurve](${api}core/AnimationCurve)。

```typescript
//custom rotate clip
const rotateClip = new AnimationClip('rotate');
const rotateState = animator.animatorController.layers[0].stateMachine.addState('rotate');
rotateState.clip = rotateClip;

const rotateCurve = new AnimationVector3Curve();
const key1 = new Keyframe<Vector3>();
key1.time = 0;
key1.value = new Vector3(0,0,0);
const key2 = new Keyframe<Vector3>();
key2.time = 10;
key2.value = new Vector3(0,360,0);
rotateCurve.addKey(key1);
rotateCurve.addKey(key2);
rotateClip.addCurveBinding('', Transform, "rotation", rotateCurve);

//custom color clip
const colorClip = new AnimationClip('color');
const colorState = animator.animatorController.layers[0].stateMachine.addState('color');
colorState.clip = colorClip;

const colorCurve = new AnimationFloatCurve();
const key1 = new Keyframe<number>();
key1.time = 0;
key1.value = 0;
const key2 = new Keyframe<number>();
key2.time = 10;
key2.value = 1;
colorCurve.addKey(key1);
colorCurve.addKey(key2);
colorClip.addCurveBinding('/light', DirectLight, "color.r", colorCurve);
```

你同样可以为你的子实体 `/light` 绑定 AnimationCurve，就像上面的代码示例，同时 `addCurveBinding` 的第三个参数并不局限于组件的属性，它是一个能索引到值的路径。

<playground src="animation-customAnimationClip.ts"></playground>

### 动画事件

你可以使用 [AnimationEvent](${api}core/AnimationEvent) 来为AnimationClip添加事件，动画事件将在指定时间调用你在同一实体上绑定组件的指定回调函数。

```typescript
const event = new AnimationEvent();
event.functionName = "test";
event.time = 0.5;
clip.addEvent(event);
```

<playground src="animation-event.ts"></playground>

