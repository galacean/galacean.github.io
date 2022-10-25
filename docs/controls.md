---
order: 2
title: Camera Control
type: Graphics
group: Camera
label: Graphics/Camera
---

The camera control, as the name implies, is a component that is used with the camera to display the 3D scene. This type of component customizes the corresponding parameters according to different functions, and controls the display of the 3D scene by affecting the properties of the camera.

## Fundamental

The camera control inherits a powerful script and is mounted on the `Entity` containing the `Camera` component, so you can get the `Camera` naturally, respond to external input and perform corresponding operations in the life cycle function.

## Control type

### OrbitControl

`OrbitControl` is used to simulate orbital interaction, suitable for 360 rotation interaction around a target object:

<playground src="gltf-basic.ts"></playground>

|Attributes|Meaning|
|:--|:--|
|`target`|Observation point|
|`autoRotate`|Whether to rotate automatically, the default is `false`, the rotation speed can be adjusted by autoRotateSpeed|
|`autoRotateSpeed`|Speed ​​of automatic rotation|
|`enableDamping`| Whether to enable camera damping, the default is `true`|
|`dampingFactor`| Rotation damping parameter, default is `0.1`|
|`enableKeys` | Whether to support keyboard operation (up, down, left, and right keys)|
|`enablePan` | Whether to support camera translation, the default is `true`| 
|`keyPanSpeed` | The amplitude of the operation when the keyboard is continuously pressed| 
|`enableRotate` | Whether to support camera rotation, the default is `true`| 
|`rotateSpeed` | Camera rotation speed, the default is `1.0`| 
|`enableZoom` | Whether to support camera zoom, the default is `true`| 
|`minAzimuthAngle` | When `onUpdate`, the minimum radian of a reasonable range for horizontal operation, the default is negative infinity| 
|`maxAzimuthAngle` | When `onUpdate`, the maximum radian of the reasonable range of horizontal operation, the default is positive infinity| 
|`minDistance` | When `onUpdate`, the minimum value of the reasonable range of distance operation is judged| 
|`maxDistance` | When `onUpdate`, the maximum value of the reasonable range of distance operation judged| 
|`minPolarAngle` | When `onUpdate`, the minimum arc within a reasonable range of vertical operation| 
|`maxPolarAngle` | When `onUpdate`, the maximum arc within a reasonable range of vertical operation|

### FreeControl

`FreeControl` are generally used for roaming control, often in game scenes:

<playground src="controls-free.ts"></playground>

|Attributes|Meaning|
|:--|:--|
|`floorMock`| Whether to simulate the ground, the default is `true` |
|`floorY`| Use with `floorMock` to declare the location information of the ground |
|`movementSpeed` | Speed ​​of movement |
|`rotateSpeed`| Speed ​​of rotation |

### OrthoControl

`OrthoControl` are generally used to control zoom and displacement in 2D scenes:

<playground src="ortho-control.ts"></playground>

|Attributes|Meaning|
|:--|:--|
|`zoomSpeed`| Zoom Speed |