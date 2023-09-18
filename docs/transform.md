---
order: 5
title: Transform
type: Core
label: Core
---

<playground src="transform-basic.ts"></playground>

## Transform

`Transform` is a basic component that comes with `Entity`, through which developers can manage the position, rotation and scaling of `Entity` in **local space** and **world space**.

<playground src="transform-basic.ts"></playground>

## Usage

```typescript
// create entity
const scene = engine.sceneManager.activeScene;
const root = scene.createRootEntity("root");
const cubeEntity = root.createChild("cube");

// The entity will have its own transform component by default after it is created
// You can do geometrical transformation through the transform component api

// Modify displacement, rotation, scaling
transform.position = new Vector3();
// or transform.setPosition(0, 0, 0);

transform.rotation = new Vector3(90, 0, 0);
// or transform.setRotation(90, 0, 0);

// You can alose get transform component from entity object directly.
cubeEntity.transform.scale = new Vector3(2, 1, 1);
// or cubeEntity.transform.setScale(2, 1, 1);

// translate cube entity in local space
cubeEntity.transform.translate(new Vector3(10, 0, 0), true);

// rotate cube entity in local space
cubeEntity.transform.rotate(new Vector3(45, 0, 0), true);
```

## Component properties

| property name                                                               | interpretation                                                                                                                                                                                           |
| --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [position]($%7Bapi%7Dcore/Transform#position)                               | local position                                                                                                                                                                                           |
| [rotation]($%7Bapi%7Dcore/Transform#rotation)                               | local rotation - in euler                                                                                                                                                                                |
| [rotationQuaternion]($%7Bapi%7Dcore/Transform#rotationquaternion)           | local rotation - in quaternion                                                                                                                                                                           |
| [scale]($%7Bapi%7Dcore/Transform#scale)                                     | local scaling                                                                                                                                                                                            |
| [worldPosition]($%7Bapi%7Dcore/Transform#worldPosition)                     | world position                                                                                                                                                                                           |
| [worldRotation]($%7Bapi%7Dcore/Transform#worldRotation)                     | world rotation - in euler                                                                                                                                                                                |
| [worldRotationQuaternion]($%7Bapi%7Dcore/Transform#worldRotationQuaternion) | world rotation - in quaternion                                                                                                                                                                           |
| [lossyWorldScale]($%7Bapi%7Dcore/Transform#lossyWorldScale)                 | world lossy scaling - When the parent node is zoomed and the child node is rotated, the zoom will be tilted and cannot be represented correctly by Vector3, and must be represented by Matrix3x3 matrix. |
| [localMatrix]($%7Bapi%7Dcore/Transform#localMatrix)                         | local matrix                                                                                                                                                                                             |
| [worldMatrix]($%7Bapi%7Dcore/Transform#worldMatrix)                         | world matrix                                                                                                                                                                                             |
| [worldForward](${api}core/Transform#worldMatrix)                            | forward vector (identity matrix in world space)                                                                                                                                                          |
| [worldRight](${api}core/Transform#worldMatrix)                              | right vector (identity matrix in world space)                                                                                                                                                            |
| [worldUp](${api}core/Transform#worldMatrix)                                 | up vector (identity matrix in world space)                                                                                                                                                               |

## Component methods

| method name                                                                 | interpretation                                                                    |
| --------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| [getWorldUp]($%7Bapi%7Dcore/Transform#getWorldUp)                           | get world up vector                                                               |
| [getWorldRight]($%7Bapi%7Dcore/Transform#getWorldRight)                     | get world right vector                                                            |
| [getWorldForward]($%7Bapi%7Dcore/Transform#getWorldForward)                 | get world forward vector                                                          |
| [lookAt]($%7Bapi%7Dcore/Transform#lookAt)                                   | Rotate and ensure that the world front vector points to the target world position |
| [registerWorldChangeFlag]($%7Bapi%7Dcore/Transform#registerWorldChangeFlag) | Register the world change change mark                                             |
| [rotate]($%7Bapi%7Dcore/Transform#rotate)                                   | Rotate according to the specified Euler angle                                     |
| [rotateByAxis]($%7Bapi%7Dcore/Transform#rotateByAxis)                       | Rotate around the specified axis according to the specified angle                 |
| [translate]($%7Bapi%7Dcore/Transform#translate)                             | Translate according to the specified direction and distance                       |

## Common QA

- What is the role of the `transform` component?

In a 3D scene, the `transform` component is automatically added when an object is created. Its function is mainly divided into two parts:

- Structurally, the `transform` component can uniformly manage the geometric transformation of objects,
- In terms of performance, the `transform` component has made a lot of calculation optimizations using dirty markers internally.​

- What is the function of `registerWorldChangeFlag`?

Since the `worldMatrix` attribute of `transform` has also been optimized with the dirty mark, if the outside of the component needs to pay attention to whether the `worldMatrix` of the current `transform` has changed, it needs to obtain the status of its dirty mark. The `transform` component provides the `registerWorldChangeFlag` method: this method will return an update flag, which will trigger the change of the flag when the `worldMatrix` of the current `transform` is modified. For specific usage, please refer to the camera component:

```typescript
class Camera {
  onAwake() {
    this._transform = this.entity.transform;
    // Register change flag
    this._isViewMatrixDirty = this._transform.registerWorldChangeFlag();
  }
  get viewMatrix() {
    // When the mark is updated, the viewMatrix is ​​obtained according to the worldMatrix~
    if (this._isViewMatrixDirty.flag) {
      this._isViewMatrixDirty.flag = false;
      Matrix.invert(this._transform.worldMatrix, this._viewMatrix);
    }
    return this._viewMatrix;
  }
}
```
