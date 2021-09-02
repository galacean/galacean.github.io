---
order: 1
title: Controls
type: Second party packages
---

The camera control, as the name implies, is a component that is used with the camera to display the 3D scene. This type of component customizes the corresponding parameters according to different functions, and controls the display of the 3D scene by affecting the properties of the camera.

## Fundamental

The camera control inherits a powerful script and is mounted on the `Entity` containing the `Camera` component, so you can get the `Camera` naturally, respond to external input and perform corresponding operations in the life cycle function.

## Control type

### OrbitControl

[OrbitControl](${api}controls/OrbitControl) is used to simulate orbital interaction, suitable for 360 rotation interaction around a target object:

<playground src="gltf-basic.ts"></playground>

|Attributes|Meaning|
|:--|:--|
|[target](${api}controls/OrbitControl#target)|Observation point|
|[autoRotate](${api}controls/OrbitControl#autoRotate)|Whether to rotate automatically, the default is `false`, the rotation speed can be adjusted by autoRotateSpeed|
|[autoRotateSpeed](${api}controls/OrbitControl#autoRotateSpeed)|Speed ​​of automatic rotation|
|[enableDamping](${api}controls/OrbitControl#enableDamping) | Whether to enable camera damping, the default is `true`|
|[dampingFactor](${api}controls/OrbitControl#dampingFactor) | Rotation damping parameter, default is `0.1`|
|[enableKeys](${api}controls/OrbitControl#enableKeys) | Whether to support keyboard operation (up, down, left, and right keys)|
|[enablePan](${api}controls/OrbitControl#enablePan) | Whether to support camera translation, the default is `true`| 
|[keyPanSpeed](${api}controls/OrbitControl#keyPanSpeed) | The amplitude of the operation when the keyboard is continuously pressed| 
|[enableRotate](${api}controls/OrbitControl#enableRotate) | Whether to support camera rotation, the default is `true`| 
|[rotateSpeed](${api}controls/OrbitControl#rotateSpeed) | Camera rotation speed, the default is `1.0`| 
|[enableZoom](${api}controls/OrbitControl#enableZoom) | Whether to support camera zoom, the default is `true`| 
|[minAzimuthAngle](${api}controls/OrbitControl#minAzimuthAngle) | When `onUpdate`, the minimum radian of a reasonable range for horizontal operation, the default is negative infinity| 
|[maxAzimuthAngle](${api}controls/OrbitControl#maxAzimuthAngle) | When `onUpdate`, the maximum radian of the reasonable range of horizontal operation, the default is positive infinity| 
|[minDistance](${api}controls/OrbitControl#minDistance) | When `onUpdate`, the minimum value of the reasonable range of distance operation is judged| 
|[maxDistance](${api}controls/OrbitControl#maxDistance) | When `onUpdate`, the maximum value of the reasonable range of distance operation judged| 
|[minPolarAngle](${api}controls/OrbitControl#minPolarAngle) | When `onUpdate`, the minimum arc within a reasonable range of vertical operation| 
|[maxPolarAngle](${api}controls/OrbitControl#maxPolarAngle) | When `onUpdate`, the maximum arc within a reasonable range of vertical operation|

### FreeControl

[FreeControl](${api}controls/FreeControl) are generally used for roaming control, often in game scenes:

<playground src="controls-free.ts"></playground>

|Attributes|Meaning|
|:--|:--|
|[floorMock](${api}controls/FreeControl#floorMock)| Whether to simulate the ground, the default is `true` |
|[floorY](${api}controls/FreeControl#floorY)| Use with `floorMock` to declare the location information of the ground |
|[movementSpeed](${api}controls/FreeControl#movementSpeed) | Speed ​​of movement |
|[rotateSpeed](${api}controls/FreeControl#rotateSpeed) | Speed ​​of rotation |

### OrthoControl

[OrthoControl](${api}controls/OrthoControl) are generally used to control zoom and displacement in 2D scenes:

<playground src="ortho-control.ts"></playground>

|Attributes|Meaning|
|:--|:--|
|[zoomSpeed](${api}controls/OrthoControl#zoomSpeed)| Zoom Speed |