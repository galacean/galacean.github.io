---
order: 4
title: 4. 第一个游戏
type: 入门
---

> 相信大家对 flappy bird 都不陌生，今天简单描述下如何用 Oasis 复刻 2D 游戏，其中的流程其实和日常做需求相差无几。原游戏链接：[http://flappybird.io/](http://flappybird.io/)

# 总览

在着手敲代码前，需要先在脑海中规划一下如何实现与游戏的大概流程，因此我们会将本文分为以下几个环节：

- 需求分析
- UI 搭建
- 逻辑的设计与实现
- 后续优化
- 碰撞检测

# 需求分析

试玩之后，通过简单的需求分析可以总结出以下 tips ：

<img src="https://gw.alipayobjects.com/zos/OasisHub/81bb1385-4463-46b2-bc92-c42cb56332db/1623310879070-048cbc6d-2193-4672-9440-c9a13d31f4d8.png" alt="image.png" style="zoom:50%;" />

- 游戏为 2D 游戏，使用[正交相机](${docs}camera-cn#正交投影)会更加简单方便
- 整个游戏分为三个状态：
  - 待机
  - 对局中
  - 对局结束
- 整个游戏中的显示对象(由远到近)：
  - Background （背景）
  - Pipe （水管）
  - Ground （草地）
  - Bird （小鸟的帧动画）
  - GUI（分数与重新开始按钮）

需求分析后，可以基本理清对局的流程与全局的 UI 布局，接下来的步骤就是根据层级关系搭建好整个 UI 界面。 ​

# UI 搭建

经过上个步骤分析，可以确定整个游戏中的显示对象，此时可以开始实现一个简单的搭建，这里要提前说明的是，本次示例使用 [SpriteRender](${docs}sprite-renderer-cn) 实现，请重点关注其中的 [Sprite](${docs}sprite-cn) ，因为在搭建 UI 的时候，需要确定像素和坐标之间的关系，而其中的 [pixelsPerUnit](${api}core/Sprite#pixelsPerUnit) 确定了一个单位坐标包含的像素值。 ​

## 获取 UI 资源

| Bird | [https://gw.alipayobjects.com/zos/OasisHub/315000157/8356/bird.png](https://gw.alipayobjects.com/zos/OasisHub/315000157/8356/bird.png) |  |
| --- | --- | --- |
| Pipe | [https://gw.alipayobjects.com/zos/OasisHub/315000157/5987/pipe.png](https://gw.alipayobjects.com/zos/OasisHub/315000157/5987/pipe.png) |  |
| BackGround | [https://gw.alipayobjects.com/zos/OasisHub/315000157/5244/background.png](https://gw.alipayobjects.com/zos/OasisHub/315000157/5244/background.png) |  |
| Ground | [https://gw.alipayobjects.com/zos/OasisHub/315000157/5230/ground.png](https://gw.alipayobjects.com/zos/OasisHub/315000157/5230/ground.png) |  |
| Restart | [https://gw.alipayobjects.com/zos/OasisHub/315000157/6695/restart.png](https://gw.alipayobjects.com/zos/OasisHub/315000157/6695/restart.png) |  |
| Number | [https://gw.alipayobjects.com/zos/OasisHub/315000157/8709/527-number.png](https://gw.alipayobjects.com/zos/OasisHub/315000157/8709/527-number.png) |  |

## 加载 UI 资源

在获取 UI 资源后，可以参考[资源管理与加载](${docs}resource-manager-cn#1-texture2d)中加载 [Texture2D](${docs}texture-cn#1-2d纹理) 的方式。

## 界面搭建

### 分析移动策略

在搭建界面前要先确定场景移动与小鸟飞行表现的策略：

- 固定草地与水管位置，移动小鸟和相机
- 移动草地与水管，固定小鸟（上下可移动）和相机

基于简单原则，我们选择固定相机的方式。

### 分析显示层级

在之前进行需求分析时可以大概确定各个显示对象的前后遮挡关系，因此可以敲定大概的摆放位置：

<img src="https://gw.alipayobjects.com/zos/OasisHub/a4d9c966-a98a-4a90-9146-49f070196e7e/1623317231501-471c07f0-a263-49a2-b41c-542d163a38ee.png" alt="image.png" style="zoom:50%;" />

### 编辑器搭建 UI

可以使用编辑器的同学直接使用编辑器进行搭建。

<img src="https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*RACOTrZAYAwAAAAAAAAAAAAAARQnAQ" alt="图片.gif"  />

### 脚本搭建 UI

无法使用编辑器的同学可以直接拷贝下方代码。

```typescript
// Create engine object.
const engine = new WebGLEngine("canvas");
engine.canvas.resizeByClientSize();

const scene = engine.sceneManager.activeScene;
const rootEntity = scene.createRootEntity();

// Initialize each node （I usually go from far to near）
// background
const nodeBg = rootEntity.createChild("nodeBg");
nodeBg.transform.setPosition(0.3, 0, -5);
addSpriteRender(nodeBg, texture2DArr[2]);

// Pipe.
const nodePipe = rootEntity.createChild("nodePipe");
nodePipe.transform.setPosition(0, 0, -3);

// Bottom.
const nodeGround = rootEntity.createChild("nodeGround");
nodeGround.transform.setPosition(0.3, -4.125, 0);
nodeGround.addComponent(ScriptGround);

// Bird.
const nodeBird = rootEntity.createChild("nodeBird");
nodeBird.transform.setPosition(-1, 1.15, 0);
addSpriteRender(nodeBird, texture2DArr[0]);
// Death splash screen effect.
const renderer = nodeBird.addComponent(MeshRenderer);
renderer.mesh = PrimitiveMesh.createPlane(engine, 20, 20);
const material = new UnlitMaterial(engine);
// Can be transparent.
material.isTransparent = true;
renderer.setMaterial(material);

// GUI.
const nodeGui = rootEntity.createChild("nodeGui");
nodeGui.transform.setPosition(0.3, 0, 1);
const nodeRestart = nodeGui.createChild("nodeRestart");
addSpriteRender(nodeRestart, texture2DArr[4]);
const nodeScore = nodeGui.createChild("nodeScore");
nodeScore.transform.setPosition(0, 3.2, 0);
nodeScore.transform.setScale(0.3, 0.3, 0.3);

// GameCtrl controls the global game.
rootEntity.addComponent(GameCtrl);
```

其中 `addSpriteRender` 函数是为了方便给 `Entity` 增加 `SpriteRenderer` 组件而自定义的函数，其代码如下：

```typescript
/**
 * General method for adding SpriteRenderer to nodes.
 * @param node
 * @param texture2D
 */
function addSpriteRender(node: Entity, texture2D: Texture2D) {
  let renderer = node.addComponent(SpriteRenderer);
  renderer.sprite = new Sprite(engine, texture2D, null, null, 100);
}
```

# 逻辑的设计与实现

设计的第一原则是简单适用，切忌过早优化，开始的时候不需要计较内存与计算优化，也不需要在对象销毁与复用上做太多的设计，首先要先实现一套完整的流程，然后在此基础上做一些优化迭代，因此先考虑以下的实现：

- 全局控制器，监听人机交互（屏幕点击）与各个模块间的交互（ GUI 发出玩家点击了重新开始的事件）
- Bird
  - 结合帧动画与缓动，实现飞行，死亡，点击飞行与坠落
  - 处于不同游戏状态的表现
    - 待机
    - 对局时的交互（点击飞行时的爬升与之后的坠落）
    - 死亡
- Ground
  - 创建两块草地，以一个给定的速率向 X 轴负方向移动，在视野内消失后拼接到右边
  - 与小鸟的碰撞检测
  - 处于不同游戏状态的表现
- Pipe
  - 每经过固定的距离生成水管，水管的纵向位置随机
  - 与小鸟的碰撞检测
  - 处于不同游戏状态的表现
- GUI
  - 分数的显示
  - 射线检测点击重开
  - 处于不同游戏状态的表现

PS：每个显示对象在不同游戏状态时都会展示对应的表现

## 小鸟

### 帧动画

请参考示例 `sprite-sheetAnimation` 的实现，我们通过给 `Entity` 增加 `Script` 组件，并在 `Script` 组件中的 `onUpdate` 函数中控制精灵的渲染区域来实现帧动画，并可以根据当前小鸟的状态（ alive or dead ）展示不同的表现：

<playground src="sprite-sheetAnimation.ts"></playground>

### tweenjs

为了实现小鸟的抬头与低头，我们引入[缓动库](https://github.com/tweenjs/tween.js)，抬头的时候逆时针旋转小鸟至 20 度，低头的时候缓动小鸟的旋转角至 -90 度，翻阅缓动组件的源码可以发现，他是通过递归去更新值的，熟悉 [变换组件]（${docs}transform-cn）的同学会发现这种递归方式实现逐个改变坐标信息中的分量是无法让 `Entity` 实时改变位置的。

```typescript
private _updateProperties(
		_object: UnknownProps,
		_valuesStart: UnknownProps,
		_valuesEnd: UnknownProps,
		value: number,
	): void {
		for (const property in _valuesEnd) {
			// Don't update properties that do not exist in the source object
			if (_valuesStart[property] === undefined) {
				continue
			}

			const start = _valuesStart[property] || 0
			let end = _valuesEnd[property]
			const startIsArray = Array.isArray(_object[property])
			const endIsArray = Array.isArray(end)
			const isInterpolationList = !startIsArray && endIsArray

			if (isInterpolationList) {
				_object[property] = this._interpolationFunction(end as Array<number>, value)
			} else if (typeof end === 'object' && end) {
				// eslint-disable-next-line
				// @ts-ignore FIXME?
				this._updateProperties(_object[property], start, end, value)
			} else {
				// Parses relative end values with start as base (e.g.: +10, -3)
				end = this._handleRelativeValue(start as number, end as number | string)

				// Protect against non numeric properties.
				if (typeof end === 'number') {
					// eslint-disable-next-line
					// @ts-ignore FIXME?
					_object[property] = start + (end - start) * value
				}
			}
		}
	}
```

因此在代码中可以这样表示：

```typescript
this._dropTween = new TWEEN.Tween(rotation)
  .to({ z: -90 }, 380)
  .onUpdate((target) => {
    transform.rotation = target;
  })
  .delay(520);
```

### 运动轨迹

运动轨迹涉及到手感，可以看到原版代码实现得十分复杂，此处模拟现实中的体验，点击屏幕时先给小鸟一个向上的初速度，此时一直为抛物线的运动，当下落的速度达到一个峰值时阻力与重力抵消，此时小鸟以一个恒定的速度下落：

<img src="https://gw.alipayobjects.com/zos/OasisHub/dbfaa502-b178-4c09-9a9a-bb4f21e7f884/1623325606009-fe29a574-5b33-454a-92e1-d0f43b5107b8.png" alt="image.png" style="zoom:50%;" />

假设点击往上飞提供的速度为 `_startFlyV`，重力加速度为 `_gravity`，最大下落速度为 `_maxDropV`，点击屏幕的时刻为 `_flyStartTime`，通过计算可以得到任意时刻小鸟的纵坐标：

```typescript
// Free fall and uniform motion are superimposed to obtain the current position.
let endY;
const { _maxDropV, _startFlyV, _gravity } = this;
const transform = this.entity.transform;
const position = transform.position;
// How much time has passed.
const subTime = (engine.time.nowTime - this._flyStartTime) / 1000;
// How long has it been in free fall.
const addToMaxUseTime = (_maxDropV - _startFlyV) / _gravity;
if (subTime <= addToMaxUseTime) {
  // Free fall.
  endY = ((_startFlyV + (_startFlyV + subTime * _gravity)) * subTime) / 2 + this._startY;
} else {
  // Falling at a constant speed.
  endY = ((_maxDropV + _startFlyV) * addToMaxUseTime) / 2 + _maxDropV * (subTime - addToMaxUseTime) + this._startY;
}
```

## 草地

 熟悉材质的同学肯定都对材质中的 tilingOffset 参数印象深刻，这是一个只需要改变 Vector4 的值就可以控制纹理坐标缩放和偏移的功能：

<playground src="tiling-offset.ts"></playground>

已知草地资源宽度为 ”37“ ，背景大图宽度为 “768” ，为了底部衔接处宽度一致，可以设置草地的 tilingOffset 为：

```typescript
groundMaterial.tilingOffset.setValue(768 / 37, 1, 0, 0);
```

紧接着只需要在每次更新的时候去改变 tilingOffset 的偏移即可（为了保证水管与草地运行的速度一致，此处需要做一个简单的转换）：

```typescript
onUpdate(deltaTime: number) {
  // After deltaTime, the distance the ground has moved.
  this._groundMaterial.tilingOffset.z += deltaTime * this._groundHorizontalV;
}
```

## 水管

<img src="https://gw.alipayobjects.com/zos/OasisHub/d73197c1-fc07-4dce-ab91-816ebfbf76c1/1623331517136-c243f292-e44a-4386-9b83-72514d9df2f9.png" alt="image.png" style="zoom:50%;" />

依靠在水管层节点加入 `ScriptPipe` 管理和生成水管，为了更好地设置水管的生成时机与表现，我们将可配置的参数抽取出来：

```typescript
  /**  Hide when the x coordinate of the pipe is less than -4.6. */
  private _pipeHideX: number = 4.6;
  /**  Vertical distance of pipe. */
  private _pipeVerticalDis: number = 10.8;
  /**  Horizontal distance of pipe. */
  private _pipeHorizontalDis: number = 4;
  /**  Random location range generated by pipes. */
  private _pipeRandomPosY: number = 3.5;
  /**  Water pipe debut time(ms). */
  private _pipeDebutTime: number = 3000;
```

正如上方更新草地一般，更新水管也是同样的操作：

```typescript
  /**
   * Three things will be done here every frame：
   *    1.Adjust the generation of the pipe.
   *    2.Adjust the position of the pipe.
   *    3.Judge whether to get a point.
   * @param deltaTime - The deltaTime when the script update
   */
  onUpdate(deltaTime: number) {
    const debutTime = this._pipeDebutTime;
    // The water pipe will be displayed after the start of the game pipeDebutTime.
    if (engine.time.nowTime - this._curStartTimeStamp >= debutTime) {
      let bAddScore = false;
      // After deltaTime, the distance the pipe has moved.
      const changeVal = deltaTime * this._pipeHorizontalV;
      const pipeLen = this._nowPipeArr.length;
      const { _pipeHorizontalDis: horizontalDis, _pipeRandomPosY: randomPosY, _pipeHideX: hideX } = this;
      // Adjust the position of all pipes.
      if (pipeLen > 0) {
        for (let i = pipeLen - 1; i >= 0; i--) {
          const pipe = this._nowPipeArr[i];
          const pipeTrans = pipe.transform;
          const pipePos = pipeTrans.position;
          if (pipePos.x < -hideX) {
            // The invisible pipe can be destroyed.
            this._destroyPipe(i);
          } else {
            if (!bAddScore && pipePos.x > -1 && pipePos.x - changeVal <= -1) {
              // Get a point.
              engine.dispatch(GameEvent.addScore);
              bAddScore = true;
            }
            pipeTrans.setPosition(pipePos.x - changeVal, pipePos.y, pipePos.z);
          }
          // Judge whether the pipe needs to be regenerated according to the X coordinate.
          if (i == pipeLen - 1 && pipePos.x <= hideX - horizontalDis) {
            this._createPipe(hideX, randomPosY * Math.random() - randomPosY / 2 + 0.8, 0);
          }
        }
      } else {
        // Need to regenerate a pipe.
        this._createPipe(hideX, randomPosY * Math.random() - randomPosY / 2 + 0.8, 0);
      }
    }
  }
```

其中 `_createPipe` 函数使用了引擎自带的 [clone](${docs}entity-clone-cn) 功能，将水管克隆一份即可。

```typescript
  private _createPipe(posX: number, posY: number, posZ: number) {
    const pipePool = this._pipePool;
    const pipe = pipePool.length > 0 ? pipePool.pop() : this._originPipe.clone();
    pipe.transform.setPosition(posX, posY, posZ);
    this.entity.addChild(pipe);
    this._nowPipeArr.push(pipe);
  }
```

## GUI

### 分数

首先看下分数的资源长什么样。

<img src="https://gw.alipayobjects.com/zos/OasisHub/c768b576-140a-4550-9cd5-b9cdba57b15d/1625130444722-5c3eba5f-5543-456a-b78b-7b578339e199.png" alt="image.png" style="zoom:50%;" />

此处可参考 [Sprite-Region](${examples}sprite-region) 示例，我们可按照以下流程对数字进行截取与重组，每个数字都是一个 `Entity`，他们都有自己的 `SpriteRender`：

<img src="https://gw.alipayobjects.com/zos/OasisHub/8db5b759-0571-4fb4-83d9-4eae8005e238/1625131469833-847a18a0-460e-47ba-96a2-d0938a527b24.png" alt="image.png" style="zoom:50%;" />

### Restart

可以简单分析一下 Restart 要实现的内容并写出大概的流程。

<img src="https://gw.alipayobjects.com/zos/OasisHub/352dbced-36c6-4ed9-b5d0-b7f096f9aa0e/1625132333754-89ca4388-6af6-4ce7-b7c0-395e9abb48bf.png" alt="image.png" style="zoom:50%;" />

此处可以参考 [输入交互](${docs}input-cn) 文档

# 碰撞检测

## 碰撞检测的时机

在执行碰撞检测时有一个前提，就是此时已经是这一帧的最终位置了，之前学习过 [Oasis 脚本系统](${docs}script-cn#组件生命周期函数) 的同学应该会很熟悉，当在 `onUpdate` 中改变 `Entity` 的位置后，可以在 `onLateUpdate` 中做碰撞检测，这样可以保证时序不出问题。

<img src="https://gw.alipayobjects.com/zos/OasisHub/3b51a259-a9e9-4f82-bc92-fecbae21f3fc/1625142815122-1977aa4e-54c1-498c-baef-533d2e9be265.png" alt="image.png" style="zoom:50%;" />

## Ground & Bird

```typescript
// When checkHit is monitored, check the collision between the ground and the bird
engine.on(GameEvent.checkHit, (birdY) => {
  birdY < groundY && engine.dispatch(GameEvent.gameOver);
});
```

## Pipe & Bird

这里的碰撞检测可能会比较复杂，我们做一个简单的分析：

<img src="https://gw.alipayobjects.com/zos/OasisHub/7c715dc7-95ac-4005-9abf-99a2433644ef/1625141607948-cc36c6ce-d1d1-43de-ada9-4ca0c15b7118.png" alt="image.png" style="zoom:50%;" />

可以看到此时在局内的所有 pipe（红色和蓝色），已知 Bird 此刻的坐标，那么目前就有以下几个问题需要我们去解决：

- Bird 需要和所有的 Pipe 进行碰撞吗？如果不是，那么如何判断与哪根柱子进行碰撞检测呢？
- 如何确定 Bird 和 Pipe 是否发生了碰撞？

首先解答第一个问题，可以发现如果对上图中红色的 Pipe 做碰撞检测是有价值的，但是对蓝色的 Pipe 做则毫无价值，因此我们可以确定当 Pipe 的坐标处在屏幕中间某个位置时，这就是需要做碰撞检测的 Pipe 。

```typescript
Math.abs(pipePos.x) < 0.9;
```

然后解答第二个问题，回到之前创建 Pipe 的过程，我们将 Pipe 的锚点设置在了正中间，因此只需要判断 bird 的 Y 坐标即可：

```typescript
Math.abs(pipePos.y - birdY) > 1.2;
```

对场上所有的 Pipe 做上述操作则得到：

```typescript
// When checkHit is monitored, check the collision between the pipe and the bird.
engine.on(GameEvent.checkHit, (birdY: number) => {
  var len = this._nowPipeArr.length;
  for (var i = 0; i < len; i++) {
    var pipePos = this._nowPipeArr[i].transform.position;
    if (Math.abs(pipePos.x) < 0.9) {
      if (Math.abs(pipePos.y - birdY) > 1.2) {
        engine.dispatch(GameEvent.gameOver);
      }
      break;
    }
  }
});
```

# 收尾与优化

我们已经梳理了所有对象，并且让他们“各司其职”，现在只需要在上面加“亿点点”细节即可，当然完成了整套流程后，你也可以尝试对游戏进行更多的优化：

- 使用对象池，让对象复用
- 使用图集，减少 DrawCall

附上最终成果：

<playground src="flappy-bird.ts"></playground>
