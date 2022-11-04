---
order: 2
title: keyboard
label: Interact
---

Oasis supports developers to query the current keyboard interaction at any time without introducing additional packages and the calling interface is very simple。

## Functions

| Function Name                                               | Interpretation                     |
| ------------------------------------------------------ | ---------------------------- |
| [isKeyHeldDown](${api}core/InputManager#isKeyHeldDown) |  Whether the key is being held down, if there is no parameter, return whether any key is being held down. |
| [isKeyDown](${api}core/InputManager#isKeyDown)         | Whether the key starts to be pressed down during the current frame, if there is no parameter, return whether any key starts to be pressed down during the current frame.   |
| [isKeyUp](${api}core/InputManager#isKeyUp)             | Whether the key is released during the current frame, if there is no parameter, return whether any key released during the current frame.   |

## Start

A simple example of detecting the state of a key press is enumerated below.

```typescript
class KeyScript extends Script {
  onUpdate() {
    if (this.engine.inputManager.isKeyHeldDown(Keys.Space)) {
      //
    }
    if (this.engine.inputManager.isKeyDown(Keys.Space)) {
      //
    }
    if (this.engine.inputManager.isKeyUp(Keys.Space)) {
      //
    }
  }
}
```

## Demo

This time use the `space` to control Angry Birds。

<playground src="flappy-bird.ts"></playground>

## Status Analysis

| status | isKeyHeldDown | isKeyDown ｜ isKeyUp ｜
| --------｜--------------｜-----------｜---------｜
| The key has been held down since the last frame｜true｜false | false | 
| The key is not released after the current frame is pressed｜true｜true | false | 
| The key is pressed again after the current frame is released｜true｜true | true | 
| The key is pressed and released after the current frame｜false｜true | true | 
| The key was lifted at the current frame｜false｜false | true  | 
| The key is not pressed and there is no interaction｜false｜false | false | 
| This won't happen｜true｜false | true | 
| This won't happen｜false｜true | false | 

## Keys

The keyboard Keys enumerated by Oasis correspond to the physical keyboard one by one, refer to the W3C standard, and are compatible with special keys of various hardware.

Keys：https://github.com/oasis-engine/engine/blob/main/packages/core/src/input/enums/Keys.ts
W3C standard：https://www.w3.org/TR/2017/CR-uievents-code-20170601/
You can refer to the design ideas：https://github.com/oasis-engine/engine/wiki/Keyboard-Input-design
