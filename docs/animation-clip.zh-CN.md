---
order: 3
title: 动画片段
type: 动画
label: Animation
---

**动画片段**是Galacean动画系统的核心元素之一，Galacean支持导入外部设计软件设计的模型动画，设计师输出的带动画的模型中的每个动画在Galacean中会被解析成一个个的**动画片段**资产，我们也可以通过动画片段编辑器创作额外的动画。

动画片段编辑器目前支持除物理相关组件的所有可插值属性的编辑，如果你需要编辑其他属性，要在实体上添加对应的组件。

## 基础操作

### Transform 组件示例

1. 在资产面板中 右键/点击+ 创建 `动画片段` 资产

![1](https://gw.alipayobjects.com/zos/OasisHub/52c428f1-6b5f-4486-93f9-f27ef468a9be/image-20230116150410999.png)

2. 双击 `动画片段` 资产,并选择一个实体作为 `动画片段` 的编辑对象

![image-20230116150755284](https://gw.alipayobjects.com/zos/OasisHub/016a62dc-991f-4c67-9d00-0c3b09f438dc/image-20230116150755284.png)
![image-20230116151013992](https://gw.alipayobjects.com/zos/OasisHub/31d2f185-fb98-42c5-af98-46c0fe6a4feb/image-20230116151013992.png)

3. 添加要做动画的属性(这里我添加了两个)

![image-20230116151140988](https://gw.alipayobjects.com/zos/OasisHub/443943a5-a586-42ae-badd-5117a33a0628/image-20230116151140988.png)
![image-20230116151307372](https://gw.alipayobjects.com/zos/OasisHub/59154743-fd64-4905-85c7-35cb315b625d/image-20230116151307372.png)
![image-20230116151429682](https://gw.alipayobjects.com/zos/OasisHub/6fee9c22-6e7e-4ab0-9457-d4f374f6c33e/image-20230116151429682.png)

4. 给属性添加关键帧

![image-20230116151707943](https://gw.alipayobjects.com/zos/OasisHub/908d4ddb-ad3f-45e1-9164-4a55b520f205/image-20230116151707943.png)

当我们点击添加关键帧按钮时，关键帧会存入当前指定属性的值，所以当我们什么都未改变时，关键帧存入的是此刻这个实体的 `position` 值。我们希望他 60 帧后移动到 (3, 0, 0)的位置，所以先将这个正方体通过属性面板修改到(3, 0, 0) 再添加关键帧

![clip](https://gw.alipayobjects.com/zos/OasisHub/3379fb37-f3ed-44d7-8116-48667a2982ff/clip.gif)

同理我们也为 `rotation` 属性添加关键帧

![clip2](https://gw.alipayobjects.com/zos/OasisHub/f0a0a28d-561e-4efb-b461-f0ae5f92efb9/clip2.gif)

可以看到当属性的值改变时，`动画片段编辑器` 会自动为你添加关键帧，可以让你更方便快速的编辑。

5. 预览 `动画片段`

你可以直接移动时间线（可以拖动时间线，点击空白位置，在当前帧输入框中修改数值），来观察它在指定时刻的表现，比如我将时间轴移动到 30 帧

![timeline](https://gw.alipayobjects.com/zos/OasisHub/d736229d-beeb-4657-be4b-85825c3de939/timeline.gif)

也可以直接播放 `动画片段`

![timeline2](https://gw.alipayobjects.com/zos/OasisHub/138f524e-27f1-4db4-a7a4-90664a516e5f/timeline2.gif)

编辑好的 `动画片段`资产可以应用于任一实体，切换实体即可预览其效果

![timeline3](https://gw.alipayobjects.com/zos/OasisHub/766a8566-c6ec-430a-b703-3895f85e7d94/timeline3.gif)

6. 应用 `动画片段`

上一步只是让我们可以预览 `动画片段`的效果，真正要在项目中使用还是要使用 `动画`组件，绑定 `动画控制器` 资产，详见[动画编辑](${docs}animation-animator)。这里我们为正方体添加 `动画` 组件，可以看到创建的 `动画片段` 已经通过 `动画组件` 作用到正方体上了。

![animator](https://gw.alipayobjects.com/zos/OasisHub/a87bf618-93e9-4130-8f80-fd0a7ba24fa6/animator.gif)

### 文字组件示例

文字字号动画

![image-20230116170015405](https://gw.alipayobjects.com/zos/OasisHub/10dfd915-f68d-4982-825f-ad191f58e22a/image-20230116170015405.png)

此时我们再添加属性时可以看到，可添加关键帧的属性增加了 `TextRenderer` 组件相关的可插值的属性

![image-20230116170144892](https://gw.alipayobjects.com/zos/OasisHub/1061be4b-5d88-4ae8-af0f-3856affcc51a/image-20230116170144892.png)

我们添加 fontSize，并按照上文的方式添加关键帧

![image-20230116170144892](https://gw.alipayobjects.com/zos/OasisHub/d53ed8f7-3126-4001-a26b-8e037fe2b6d5/animatorText.gif)

### 帧动画示例
除了数值类型，Galacean还支持引用类型的动画曲线，可以阅读[帧动画](${docs}animation-sprite-sheet)来了解，如何制作帧动画。

## 更多操作

### 操作关键帧

#### 修改关键帧时间

选中关键帧并拖动即可

![animatorText2](https://gw.alipayobjects.com/zos/OasisHub/5fd37304-5b24-4219-b45a-7e29174484e3/animatorText2.gif)

#### 修改关键帧的值

把时间线移动到指定关键帧上，然后重新输入值即可

![animatorText3](https://gw.alipayobjects.com/zos/OasisHub/d2fc1577-9765-44a1-99e0-88173f65c8c1/animatorText3.gif)

#### 删除关键帧

选中关键帧并按退格键即可

![animatorText4](https://gw.alipayobjects.com/zos/OasisHub/0e0abc32-beba-460f-9e25-286698816341/animatorText4.gif)

### 编辑子实体

`动画片段` 不仅可以作用于添加`Animator`组件的实体上，还可以作用于它的子实体上。

1. 我们为刚才的文字添加一个子实体

![image-20230116173105694](https://gw.alipayobjects.com/zos/OasisHub/a59d5687-5f74-4fab-a457-42e3d07b38da/image-20230116173105694.png)

2. 我们再点击添加属性就可以看到子实体的属性可以添加了

![image-20230116180314221](https://gw.alipayobjects.com/zos/OasisHub/bd59b6df-a0f8-48d3-bd5d-23eeccba4816/image-20230116180314221.png)

3. 选择子实体之后，添加关键帧即可

![child](https://gw.alipayobjects.com/zos/OasisHub/3e03fc0a-a346-4897-8607-3a36ccb11e22/child.gif)

### 编辑动画曲线

`动画片段编辑器` 支持动画曲线编辑，点击右下角的 `Curves` 即可切换

![image-20230116183809640](https://gw.alipayobjects.com/zos/OasisHub/529e7716-d5c6-4857-9a81-966e0f371b6b/image-20230116183809640.png)

属性对应曲线的颜色与按钮的颜色相同

![image-20230116183933986](https://gw.alipayobjects.com/zos/OasisHub/1c96f6a9-d72c-4b1a-b1db-92e2ebf59ab0/image-20230116183933986.png)

选择关键帧会出现两个控制点，调整控制点即可调整曲线

![curve](https://gw.alipayobjects.com/zos/OasisHub/f439881a-39a4-463d-a7fc-1551f88bcd7c/curve.gif)

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

