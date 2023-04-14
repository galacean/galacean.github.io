---
order: 5
title: 5. First game
type: Introduction
group: Advanced
label: Introduction/Advanced
---

> I believe everyone is familiar with **Flappy Bird**. Today we briefly describe how to use Galacean to replicate 2D games. The process is actually the same as the daily requirements. Original game link:[http://flappybird.io/](http://flappybird.io/)

# Overview

Before coding, we need to plan in our minds the general flow of how to achieve and the game, so we will divide this article into the following sections:

- Demand analysis.
- Build UI interface.
- Design and implementation.
- Collision detection.
- Optimization.

# Demand analysis

After the trial, we can summarize the following points through a simple analysis:

<img src="https://gw.alipayobjects.com/zos/OasisHub/27a9f1e5-7b2c-450d-bde5-dd127d498108/image-20210901174005015.png" alt="image.png" />

- The game is a 2D game, using [Orthogonal Camera](${docs}camera#orthogonal-projection) will be easier and more convenient.
- The game is divided into three states:
  - Idel
  - In the game
  - Game over
- Display objects throughout the game (from far to near):
  - Background
  - Pipe
  - Ground
  - Bird
  - GUI

After the requirement analysis, we can basically sort out the game process and the overall UI layout. The next step is to build the entire UI interface according to the hierarchical relationship.

# Build UI interface

After the analysis of the previous step, we have determined the display objects in the entire game. At this point, we can start to implement a simple construction. It should be noted in advance that this example uses [SpriteRender](${docs}sprite-renderer) implementation, please pay attention to the [Sprite](${docs}sprite), because when building the UI, we need to determine the relationship between pixels and coordinates, and the [pixelsPerUnit](${api}core/Sprite#pixelsPerUnit) determines the pixel value contained in a unit coordinate.

## UI resources

| Bird | [https://gw.alipayobjects.com/zos/OasisHub/315000157/8356/bird.png](https://gw.alipayobjects.com/zos/OasisHub/315000157/8356/bird.png) |  |
| --- | --- | --- |
| Pipe | [https://gw.alipayobjects.com/zos/OasisHub/315000157/5987/pipe.png](https://gw.alipayobjects.com/zos/OasisHub/315000157/5987/pipe.png) |  |
| BackGround | [https://gw.alipayobjects.com/zos/OasisHub/315000157/5244/background.png](https://gw.alipayobjects.com/zos/OasisHub/315000157/5244/background.png) |  |
| Ground | [https://gw.alipayobjects.com/zos/OasisHub/315000157/5230/ground.png](https://gw.alipayobjects.com/zos/OasisHub/315000157/5230/ground.png) |  |
| Restart | [https://gw.alipayobjects.com/zos/OasisHub/315000157/6695/restart.png](https://gw.alipayobjects.com/zos/OasisHub/315000157/6695/restart.png) |  |
| Number | [https://gw.alipayobjects.com/zos/OasisHub/315000157/8709/527-number.png](https://gw.alipayobjects.com/zos/OasisHub/315000157/8709/527-number.png) |  |

## Load resources

After obtaining UI resources, you can refer to [Resource Management and Loading](${docs}resource-manager#1-texture2d) to load [Texture2D](${docs}texture-2d).

## Interface construction

### Analyze the move

Before building the interface, determine the strategy of scene movement and bird flight performance:

- Fix the position of the grass and the water pipe, move the bird and the camera.
- Move grass and water pipes, fix bird and camera.

For simplicity, we choose the way of fixing the camera.

### Analysis shows priority

In the previous demand analysis, we can roughly determine the front and rear occlusion relationship of each display object, so we can finalize the approximate placement position:

<img src="https://gw.alipayobjects.com/zos/OasisHub/a9454792-763d-459d-a2ec-9cdcbdf67dae/1623317231501-471c07f0-a263-49a2-b41c-542d163a38ee-20210913105510153.png" alt="image.png" style="zoom:50%;" />

### Build with editor

![图片.gif](https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*RACOTrZAYAwAAAAAAAAAAAAAARQnAQ)

### Build with Script

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

The `addSpriteRender` function is a custom function for the convenience of adding a `SpriteRenderer` component to the `Entity`. The code is as follows:

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

# Design and implementation

The most important point of the design is simple and applicable. Avoid premature optimization. At the beginning, we don’t need to worry about memory and calculation optimization, nor do we need to do too much design on object destruction and reuse. First, we must first implement a complete set of Process, and then do some optimization iterations on this basis, so we first consider the following implementation:

- The global controller monitors the human-computer interaction (screen click) and the interaction between each module (for example, the player clicks on the restart event)
- Bird
  - Combine frame animation and easing to achieve flight, death, click to fly and fall
  - Performance in different game states
    - Idel
    - Interaction during the game
    - Die
- Ground
  - Endless movement
  - Collision detection with the bird
  - Performance in different game states
- Pipe
  - Generate pipe
  - Collision detection with the bird
  - Performance in different game states
- GUI
  - Show score
  - Detect click
  - Performance in different game states

## Bird

### Frame animation

Refer to the implementation of the example `sprite-sheetAnimation`, we add a `Script` component to the `Entity`, and control the rendering area of ​​the sprite in the `onUpdate` function of the `Script` The status of the bird (alive or dead) shows different behaviors:

<playground src="sprite-sheetAnimation.ts"></playground>

### tweenjs

In order to realize the flying and falling of the bird, we introduce [tweenjs](https://github.com/tweenjs/tween.js), when the bird is flying, rotate the bird counterclockwise to 20 degrees, and the bird falls At that time, the rotation angle of the easing bird is -90 degrees. Looking through the source code of the easing component, you can find that he updates the value through recursion. Developers who are familiar with [transform component] (${docs}transform) will find this A recursive way to change the components in the coordinate information one by one cannot make the `Entity` change the position in real time.

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

So in our code it can be expressed like this:

```typescript
this._dropTween = new TWEEN.Tween(rotation)
  .to({ z: -90 }, 380)
  .onUpdate((target) => {
    transform.rotation = target;
  })
  .delay(520);
```

### Motion trajectory

The motion trajectory affects the feel. You can see that the original code is very complicated. Here we simulate the experience in reality. When you click on the screen, first give the bird an upward initial speed. At this time, it is always a parabolic motion. When the falling speed reaches At a peak, the resistance is offset by gravity, and the bird is falling at a constant speed:

<img src="https://gw.alipayobjects.com/zos/OasisHub/5ed29897-5094-48be-bffc-3acbeb7f3e9a/image-20210901174457088.png" alt="image.png"/>

Assuming that the speed provided by clicking to fly up is `_startFlyV`, the acceleration of gravity is `_gravity`, the maximum falling speed is `_maxDropV`, and the moment of clicking on the screen is `_flyStartTime`, we can get the ordinate of the bird at any moment by calculation::

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

## Ground

Developers who are familiar with materials must be impressed by the tilingOffset parameter in the material. This is a function that only needs to change the value of Vector4 to control the scaling and offset of texture coordinates:

<playground src="tiling-offset.ts"></playground>

It is known that the width of the grass resource is `37` and the width of the large background image is `768`. In order to have the same width at the bottom of the joint, we can set the tilingOffset of the grass to: offset

```typescript
groundMaterial.tilingOffset.set(768 / 37, 1, 0, 0);
```

Then only need to change the offset of tilingOffset every time it is updated (in order to ensure that the running speed of the water pipe and the grass are consistent, a simple conversion is required here):

```typescript
onUpdate(deltaTime: number) {
  // After deltaTime, the distance the ground has moved.
  this._groundMaterial.tilingOffset.z += deltaTime * this._groundHorizontalV;
}
```

## Pipe

<img src="https://gw.alipayobjects.com/zos/OasisHub/76e350ff-6b14-46b0-99ad-3bf7150be551/image-20210901174713640.png" alt="image.png"/>

We add `ScriptPipe` to the water pipe layer node to manage and generate water pipes. In order to better set the timing and performance of water pipe generation, we extract the configurable parameters:

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

Just like updating the grass above, updating the water pipe is the same operation:

```typescript
  /**
   * Three things will be done here every frame:
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

Among them, the `_createPipe` function uses the [clone](${docs}entity-clone) function that comes with the engine, just clone the water pipe.

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

### Score

First look at what the score resource looks like:

<img src="https://gw.alipayobjects.com/zos/OasisHub/b7c4c65e-9a14-4f7b-8c0e-f4aa0acba85c/1625130444722-5c3eba5f-5543-456a-b78b-7b578339e199-20210913105806999.png" alt="image.png" style="zoom:50%;" />

Here you can refer to the [Sprite-Region](${examples}sprite-region) example, we can intercept and reorganize the numbers according to the following process, each number is an `Entity`, They all have their own `SpriteRender`:

<img src="https://gw.alipayobjects.com/zos/OasisHub/3dd7137b-8fff-40ca-a18f-d9a4be91bccd/1625131469833-847a18a0-460e-47ba-96a2-d0938a527b24-20210913105810424.png" alt="image.png" style="zoom:50%;" />

### Restart

We can simply analyze the content of Restart and write a general process.

<img src="https://gw.alipayobjects.com/zos/OasisHub/7c1c09ac-b801-428d-b67d-8f246bb0843b/image-20210901175201126.png" alt="image.png" style="zoom:50%;" />

Here you can refer to the [Input](${docs}input) document.

# Collision detection

## Timing of collision detection

There is a premise when performing collision detection, that is, it is already the final position of this frame. Developers who have studied [Galacean scripting system](${docs}script#component-life-cycle-function) should be familiar with it. After we change the position of `Entity` in `onUpdate`, we can do collision detection in `onLateUpdate`, which can ensure that there is no problem with the timing.

<img src="https://gw.alipayobjects.com/zos/OasisHub/49d73e14-842d-4909-8612-be2209bb0afe/1625142815122-1977aa4e-54c1-498c-baef-533d2e9be265-20210913105819642.png" alt="image.png" style="zoom:50%;" />

## Ground & Bird

```typescript
// When checkHit is monitored, check the collision between the ground and the bird
engine.on(GameEvent.checkHit, (birdY) => {
  birdY < groundY && engine.dispatch(GameEvent.gameOver);
});
```

## Pipe & Bird

<img src="https://gw.alipayobjects.com/zos/OasisHub/cb8797ba-9ef9-4a20-9148-6e7f7b0001c1/1625141607948-cc36c6ce-d1d1-43de-ada9-4ca0c15b7118-20210913105825037.png" alt="image.png" style="zoom:50%;" />

You can see all the pipes (red and blue) in the game at this time. Knowing the coordinates of Bird at the moment, there are currently the following issues that we need to solve:

- Does Bird need to collide with all pipes? If not, how to determine which column to collide with?
- How to determine whether Bird and Pipe collide?

First answer the first question. You can find that if collision detection is performed on the red Pipe in the above picture, it is valuable, but it is worthless to do it on the blue Pipe. Therefore, we can determine when the coordinates of the Pipe are in the middle of the screen. In this case, this is the Pipe that needs to do collision detection.

```typescript
Math.abs(pipePos.x) < 0.9;
```

Immediately after answering the second question, returning to our previous process of creating Pipe, we set the anchor point of Pipe in the middle, so we only need to determine the Y coordinate of bird:

```typescript
Math.abs(pipePos.y - birdY) > 1.2;
```

Doing the above operations on all Pipes on the field will get:

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

# Optimization

We have sorted out all the objects and asked them to "perform their duties". Now we only need to add "a billion points" details on it. Of course, after completing the entire process, you can also try to optimize the game more:

- Use object pools to reuse objects
- Use atlas to reduce DrawCall

<playground src="flappy-bird.ts"></playground>
