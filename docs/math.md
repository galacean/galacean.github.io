---
order: 1
title: Math
type: Transform
---

In a rendering scene, we often perform operations such as translation, rotation, scale, etc. (these operations are collectively referred to as [transform](${docs}transform)) to achieve the interactive effects we want. The calculation of these transformations is generally realized by vectors, quaternions, matrices, etc. For this reason, we provide a mathematical library to complete related operations such as *vector*, *quaternion*, and *matrix*. In addition, the mathematics library also provides richer classes to help us describe *points* *lines* *surfaces* *geometry* in space, as well as judge their intersection and positional relationship in three-dimensional space.


| type | description |
| :--- | :--- |
| [BoundingBox](${api}math/BoundingBox) | AABB Bounding box |
| [BoundingFrustum](${api}math/BoundingFrustum) | Frustum |
| [BoundingSphere](${api}math/BoundingSphere) | Bounding sphere |
| [CollisionUtil](${api}math/CollisionUtil) | Provides many static methods for judging the intersection, positional relationship, etc. between various objects in space |
| [Color](${api}math/Color) | Color class, using RGBA description |
| [MathUtil](${api}math/MathUtil) | Tools, providing common calculations such as comparison and angle-radian conversion |
| [Matrix](${api}math/Matrix) | The default 4x4 matrix provides basic matrix operations and transformation related operations |
| [Matrix3x3](${api}math/Matrix3x3) | The default 3x3 matrix, providing basic matrix operations and transformation related operations |
| [Plane](${api}math/Plane) | Plane class, used to describe the plane in the three-dimensional space |
| [Quaternion](${api}math/Quaternion) | Quaternion, including x, y, z, w components, responsible for rotation-related operations |
| [Ray](${api}math/Ray) | Ray class, used to describe rays in three-dimensional space |
| [Vector2](${api}math/Vector2) | Two-dimensional vector, including x and y components |
| [Vector3](${api}math/Vector3) | Three-dimensional vector, including x, y, z components|
| [Vector4](${api}math/Vector4) | Four-dimensional vector, including x, y, z, w components |

## Vector

The most basic definition of a vector is a direction. Or more formally, a vector has a direction (Direction) and a magnitude (Magnitude, also called intensity or length). You can think of a vector as an instruction on a treasure map: "Go 10 steps to the left, 3 steps to the north, and 5 steps to the right"; "Left" is the direction, and "10 steps" is the length of the vector. Then there are 3 vectors for the instructions of this treasure map. Vectors can be in any dimension (Dimension), but we usually only use 2 to 4 dimensions. If a vector has 2 dimensions, it represents the direction of a plane (imagine a 2D image). When it has 3 dimensions, it can express the direction of a 3D world.

In the Oasis engine, vectors are used to represent object coordinates (position), rotation (rotation), scale (scale), and color (color).

```typescript
import { Vector3 } from '@oasis-engine/math';

// Create a default three-dimensional vector, that is, the x, y, and z components are all 0.
const v1 = new Vector3(); 

// Create a three-dimensional vector and initialize the x, y, z components with the given values.
const v2 = new Vector3(1, 2, 3); 

// Set the specified value.
v1.setValue(1, 2, 2); 

// Get each component.
const x = v1.x;
const y = v1.y;
const z = v1.z;

// Vector addition with static mothod.
const out1 = new Vector3();
Vector3.add(v1, v2, out1);

// Vector addition with instance method.
const out2 = v1.add(v2);

// Scalar length of the vector.
const len: number = v1.length();

// Vector normalization.
v1.normalize();

// Clone a vector.
const c1 = v1.clone();

// Clone the value of a vector to another vector.
const c2 = new Vector3();
v1.cloneTo(c2);

```
## Quaternion

Quaternion is a simple super complex number, and in the graphics engine, quaternion is mainly used for three-dimensional rotation ([The relationship between quaternion and three-dimensional rotation](https://krasjet.github.io/quaternion/quaternion.pdf )), which can represent rotation not only quaternions, but also Euler angles, axis angles, matrices and other forms. The reason for choosing quaternions is mainly due to the following advantages:

- Solved the problem of gimbal deadlock
- Only need to store 4 floating-point numbers, which is lighter than a matrix
- Whether it is inversion, concatenation, etc., it is more efficient than a matrix

In the Oasis engine, quaternions are also used to perform rotation-related operations, and APIs for converting Euler angles, matrices, etc. to quaternions are provided.

```typescript
import { Vector3, Quaternion, MathUtil } from '@oasis-engine/math';

// Create a default quaternion, that is, the x, y, and z components are all 0, and the w component is 1.
const q1 = new Quaternion(); 

// Create a quaternion and initialize the x,y,z,w components with the given values.
const q2 = new Quaternion(1, 2, 3, 4); 

// Set the specified value.
q1.setValue(1, 2, 3, 4); 

// Determine whether the values ​​of two quaternions are equal.
const isEqual: boolean = Quaternion.equals(q1, q2);

const xRad = Math.PI * 0.2;
const yRad = Math.PI * 0.5;
const zRad = Math.PI * 0.3;

// Generate quaternion according to yaw, pitch, roll.
const out1 = new Quaternion();
Quaternion.rotationYawPitchRoll(yRad, xRad, zRad, out1);

// Generate a quaternion based on the rotating Euler angles (radians) of the x, y, and z axes.
const out2 = new Quaternion();
// Equivalent to Quaternion.rotationYawPitchRoll(yRad, xRad, zRad, out2)
Quaternion.rotationEuler(xRad, yRad, zRad, out2); 

// Rotate around the X, Y, Z axis to generate a quaternion, we take the X axis as an example.
const out3 = new Quaternion();
Quaternion.rotationX(xRad, out3);

// The current quaternion rotates around the X, Y, and Z axes in turn.
const q3 = new Quaternion();
q3.rotateX(xRad).rotateY(yRad).rotateZ(zRad);

// Get the Euler angle (radians) of the current quaternion.
const eulerV = new Vector3();
q3.toEuler(eulerV);

// Radian to angle.
eulerV.scale(MathUtil.radToDegreeFactor); 
```

## Matrix

In the 3D graphics engine, calculations can be performed in multiple different Cartesian coordinate spaces. From one coordinate space to another, a transformation matrix is ​​required. The Matrix module in our math library is designed to provide this ability.

In the Oasis engine, there are local coordinates, global coordinates, observation coordinates, clipping coordinates, etc., and the conversion of objects between these coordinates is done through the conversion matrix.

```typescript
import { Vector3, Matrix3x3, Matrix } from '@oasis-engine/math';

// Create a default 4x4 matrix, the default is the identity matrix.
const m1 = new Matrix(); 

// Create a 4x4 matrix and initialize it with a given value.
const m2 = new Matrix(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);

// Set m2 as the identity matrix.
m2.identity(); 

// Determine whether the values ​​of two matrices are equal.
const isEqual1: boolean = Matrix.equals(m1, m2);

// Matrix multiplication with static method.
const m3 = new Matrix(1, 2, 3.3, 4, 5, 6, 7, 8, 9, 10.9, 11, 12, 13, 14, 15, 16);
const m4 = new Matrix(16, 15, 14, 13, 12, 11, 10, 9, 8.88, 7, 6, 5, 4, 3, 2, 1);
const out1 = new Matrix();
Matrix.multiply(m3, m4, out1);

// Matrix multiplication with instance method.
const out2 = m3.multiply(m4);

// Determine whether the values ​​of two matrices are equal.
const isEqual2: boolean = Matrix.equals(out1, out2);

// Calculate the matrix determinant.
const m5 = new Matrix(1, 2, 3, 4, 5, 6, 7, 8, 9, 10.9, 11, 12, 13, 14, 15, 16);
const det: number = m5.determinant();

// 4x4 matrix to 3x3 matrix.
const m6 = new Matrix3x3();
m6.setValueByMatrix(m5);

// Create a 4x4 matrix and initialize it with a given value.
const m7 = new Matrix(1, 2, 3, 4, 5, 6, 7, 8, 9, 10.9, 11, 12, 13, 14, 15, 16);

// Calculate the transpose matrix of the matrix with static method.
Matrix.transpose(m7, m7); 

// Calculate the transposed matrix of the matrix with instance method.
m7.transpose(); 

// Rotate around Y axis to generate 4x4 matrix.
const axis = new Vector3(0, 1, 0); 
const out4 = new Matrix();
Matrix.rotationAxisAngle(axis, Math.PI * 0.25, out4);
```

## Color

```typescript
import { Color } from "@oasis-engine/math";

// Create a Color object.
const color1 = new Color(1, 0.5, 0.5, 1);
const color2 = new Color();
color2.r = 1;
color2.g = 0.5;
color2.b = 0.5;
color2.a = 1;

// linear space to gamma space.
const gammaColor = new Color();
color1.toGamma(gammaColor);

// gamma space to linear space.
const linearColor = new Color();
color2.toLinear(linearColor);
```

## Plane
```typescript
import { Plane, Vector3 } from "@oasis-engine/math";

// Create a plane from the three vertices of the triangle.
const point1 = new Vector3(0, 1, 0);
const point2 = new Vector3(0, 1, 1);
const point3 = new Vector3(1, 1, 0);
const plane1 = new Plane();
Plane.fromPoints(point1, point2, point3, plane1);
// Create a plane by the normal of the plane and the distance from the normal to the origin.
const plane2 = new Plane(new Vector3(0, 1, 0), -1);
```

## BoundingBox

```typescript
import { BoundingBox, BoundingSphere, Matrix, Vector3 } from "@oasis-engine/math";

// Create the same bounding box in different ways.
const box1 = new BoundingBox();
const box2 = new BoundingBox();
const box3 = new BoundingBox();

// Created by center point and box range.
BoundingBox.fromCenterAndExtent(new Vector3(0, 0, 0), new Vector3(1, 1, 1), box1);

// Created by many points.
const points = [
  new Vector3(0, 0, 0),
  new Vector3(-1, 0, 0),
  new Vector3(1, 0, 0),
  new Vector3(0, 1, 0),
  new Vector3(0, 1, 1),
  new Vector3(1, 0, 1),
  new Vector3(0, 0.5, 0.5),
  new Vector3(0, -0.5, 0.5),
  new Vector3(0, -1, 0.5),
  new Vector3(0, 0, -1),
];
BoundingBox.fromPoints(points, box2);

// Created by bounding sphere.
const sphere = new BoundingSphere(new Vector3(0, 0, 0), 1);
BoundingBox.fromSphere(sphere, box3);

// Transform the bounding box through a matrix.
const box = new BoundingBox(new Vector3(-1, -1, -1), new Vector3(1, 1, 1));
const matrix = new Matrix(
  2, 0, 0, 0,
  0, 2, 0, 0,
  0, 0, 2, 0,
  1, 0.5, -1, 1
);
const newBox = new BoundingBox();
BoundingBox.transform(box, matrix, newBox);

// Merge two bounding boxes box1, box2 into a new bounding box box.
BoundingBox.merge(box1, box2, box);

// Get the center point and range of the bounding box.
const center = new Vector3();
box.getCenter(center);
const extent = new Vector3();
box.getExtent(extent);

// Get the 8 vertices of the bounding box.
const corners = [
  new Vector3(), new Vector3(), new Vector3(), new Vector3(),
  new Vector3(), new Vector3(), new Vector3(), new Vector3()
];
box.getCorners(corners);
```

## BoundingSphere
```typescript
import { BoundingBox, BoundingSphere, Vector3 } from "@oasis-engine/math";

// Different ways to create a bounding sphere.
const sphere1 = new BoundingSphere();
const sphere2 = new BoundingSphere();

// Created by many points.
const points = [
  new Vector3(0, 0, 0),
  new Vector3(-1, 0, 0),
  new Vector3(0, 0, 0),
  new Vector3(0, 1, 0),
  new Vector3(1, 1, 1),
  new Vector3(0, 0, 1),
  new Vector3(-1, -0.5, -0.5),
  new Vector3(0, -0.5, -0.5),
  new Vector3(1, 0, -1),
  new Vector3(0, -1, 0),
];
BoundingSphere.fromPoints(points, sphere1);

// Created by bounding box.
const box = new BoundingBox(new Vector3(-1, -1, -1), new Vector3(1, 1, 1));
BoundingSphere.fromBox(box, sphere2);
```

## BoundingFrustum
```typescript
import { BoundingBox, BoundingSphere, BoundingFrustum,Matrix, Vector3 } from "@oasis-engine/math";

// Create the frustum according to the VP matrix. In actual projects, the view matrix and projection matrix are generally obtained from the camera.
const viewMatrix = new Matrix(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, -20, 1);
const projectionMatrix = new Matrix(0.03954802080988884, 0, 0, 0, 0, 0.10000000149011612, 0, 0, 0, 0, -0.0200200192630291, 0, -0, -0, -1.0020020008087158, 1);
const vpMatrix = new Matrix();
Matrix.multiply(projectionMatrix, viewMatrix, vpMatrix);
const frustum = new BoundingFrustum(vpMatrix);

// Determine whether to intersect the AABB bounding box.
const box1 = new BoundingBox(new Vector3(-2, -2, -2), new Vector3(2, 2, 2));
const isIntersect1 = frustum.intersectsBox(box1);
const box2 = new BoundingBox(new Vector3(-32, -2, -2), new Vector3(-28, 2, 2));
const isIntersect2 = frustum.intersectsBox(box2);

// Determine whether to intersect with the bounding sphere.
const sphere1 = new BoundingSphere();
BoundingSphere.fromBox(box1, sphere1);
const isIntersect3 = frustum.intersectsSphere(sphere1);
const sphere2 = new BoundingSphere();
BoundingSphere.fromBox(box2, sphere2);
const isIntersect4 = frustum.intersectsSphere(sphere2);
```
## Ray

```typescript
import { BoundingBox, BoundingSphere, Plane, Ray, Vector3 } from "@oasis-engine/math";

// Create ray.
const ray = new Ray(new Vector3(0, 0, 0), new Vector3(0, 1, 0));
const plane = new Plane(new Vector3(0, 1, 0), -3);
// Determine whether the ray intersects the plane, if they intersect, the distance is the distance from the ray to the plane, if they do not intersect, the distance is -1.
let distance = ray.intersectPlane(plane);

const sphere = new BoundingSphere(new Vector3(0, 5, 0), 1);
// Determine whether the ray intersects the bounding sphere, if they intersect, the distance is the distance from the ray to the plane, if they do not intersect, the distance is -1.
distance = ray.intersectSphere(sphere);

const box = new BoundingBox();
BoundingBox.fromCenterAndExtent(new Vector3(0, 20, 0), new Vector3(5, 5, 5), box);
// Determine whether the ray intersects the bounding box (AABB), if it intersects, the distance is the distance from the ray to the plane, if it does not intersect, the distance is -1.
distance = ray.intersectBox(box);

// A point at a specified distance from the beginning of the ray.
const out = new Vector3();
ray.getPoint(10, out);
```

## CollisionUtil

```typescript
import { 
  BoundingBox,
  BoundingSphere,
  BoundingFrustum,
  Matrix,
  Plane,
  Ray,
  Vector3,
  CollisionUtil
} from "@oasis-engine/math";

const plane = new Plane(new Vector3(0, 1, 0), -5);
const viewMatrix = new Matrix(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, -20, 1);
const projectionMatrix = new Matrix(0.03954802080988884, 0, 0, 0, 0, 0.10000000149011612, 0, 0, 0, 0, -0.0200200192630291, 0, -0, -0, -1.0020020008087158, 1);
const vpMatrix = new Matrix();
Matrix.multiply(projectionMatrix, viewMatrix, vpMatrix);
const frustum = new BoundingFrustum(vpMatrix);

// Distance between point and surface.
const point = new Vector3(0, 10, 0);
let distance = CollisionUtil.distancePlaneAndPoint(plane, point);

// Determine the spatial relationship between points and planes.
const point1 = new Vector3(0, 10, 0);
const point2 = new Vector3(2, 5, -9);
const point3 = new Vector3(0, 3, 0);
const intersection1 = CollisionUtil.intersectsPlaneAndPoint(plane, point1);
const intersection2 = CollisionUtil.intersectsPlaneAndPoint(plane, point2);
const intersection3 = CollisionUtil.intersectsPlaneAndPoint(plane, point3);

// Determine the spatial relationship between the plane and the bounding box.
const box1 = new BoundingBox(new Vector3(-1, 6, -2), new Vector3(1, 10, 3));
const box2 = new BoundingBox(new Vector3(-1, 5, -2), new Vector3(1, 10, 3));
const box3 = new BoundingBox(new Vector3(-1, 4, -2), new Vector3(1, 5, 3));
const box4 = new BoundingBox(new Vector3(-1, -5, -2), new Vector3(1, 4.9, 3));
const intersection11 = CollisionUtil.intersectsPlaneAndBox(plane, box1);
const intersection22 = CollisionUtil.intersectsPlaneAndBox(plane, box2);
const intersection33 = CollisionUtil.intersectsPlaneAndBox(plane, box3);
const intersection44 = CollisionUtil.intersectsPlaneAndBox(plane, box4);

// Determine the spatial relationship between ray and plane.
const ray1 = new Ray(new Vector3(0, 0, 0), new Vector3(0, 1, 0));
const ray2 = new Ray(new Vector3(0, 0, 0), new Vector3(0, -1, 0));
const distance1 = CollisionUtil.intersectsRayAndPlane(ray1, plane);
const distance2 = CollisionUtil.intersectsRayAndPlane(ray2, plane);

// Determine the spatial relationship between the frustum and the bounding box.
const contain1 = CollisionUtil.frustumContainsBox(frustum, box1);
const contain2 = CollisionUtil.frustumContainsBox(frustum, box2);
const contain3 = CollisionUtil.frustumContainsBox(frustum, box3);
```
