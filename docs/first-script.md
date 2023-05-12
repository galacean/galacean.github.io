---
order: 4
title: The first script
type: Introduction
group: Basic
label: Introduction/Basic
---

In [Previous Tutorial](${docs}model), you have learned how to load a 3D model. At this time, you may ask: How to add a little animation to this duck? In Galacean Engine, functions are added to entities in the form of **components**, among which [script component](${docs}script) provides the most flexible extension capability. This tutorial will take you to develop a "uniform rotating duck" example:

<playground src="script-basic.ts"></playground>

## Create a rotating script component

[Script](${api}core/Script) is the script component base class provided by the engine. This class provides rich life cycle functions. As long as you extend this class, you can implement custom script functions. In this tutorial, we created a script component named `Rotate`, and used the [onUpdate](${api}core/Script#onUpdate) life cycle function inside the component, which allows us to make every frame before rendering Update the state of the entity. You can get the entity the current script be added through `this.entity` in the function:

```typescript
class Rotate extends Script {
  onUpdate() {
    console.log('update')'
  }
}
```

## Adding Script to entities

We add the created `Rotate` script component to the duck entity. At this time, as long as you open the Chrome console, you can see the constant printing of `update`:

```typescript
// Add rotation script component
duck.addComponent(Rotate);
```

## Add rotation

To achieve rotation, just keep changing the **Y** axis angle of the duck in the `onUpdate` function. Rotation, translation, and scaling are all classic transformation animations. Since [transform](${docs}transform) is the most commonly used component, Galacean Engine uses `transform` as an entity attribute, which can be done by `entity.transform` Obtain the transform component.

The transform component provides an incremental rotation method `rotate`, and its parameter is a variable of type [Vector3](${api}math/Vector3). We let the duck rotate 1 degree along the Y axis every frame:

```typescript
class Rotate extends Script {
  onUpdate() {
    this.entity.transform.rotate(new Vector3(0, 1, 0));
  }
}
```

## A little optimizations

So far, our little yellow duck has spun around cutely! However, there is still a small imperfection: `onUpdate` is a function that is executed every frame, and we keep creating `Vector3` instances in this high-frequency function, which will cause GC problems. Here we can cache the rotation angle through a private variable:

```typescript
class Rotate extends Script {
  private _tempVector = new Vector3(0, 1, 0);
  onUpdate() {
    this.entity.transform.rotate(this._tempVector);
  }
}
```

> This tip is very useful and is one of the common performance optimization methods.
