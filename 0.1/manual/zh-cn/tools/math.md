# 数学库

在一个渲染场景中，我们经常会对物体进行平移、旋转、缩放等操作（这些操作我们统一称为 [变换](${book.manual}component/transform) ），从而达到我们想要的互动效果。而这些变换的计算，我们一般都是通过向量、四元数、矩阵等来实现的，为此我们提供一个数学库来完成 *向量* 、*四元数* 、*矩阵* 等相关运算。

| 类型 | 解释 |
| :--- | :--- |
| [MathUtil](${book.api}classes/math.mathutil.html) | 工具类，提供比较、角度弧度转换等常用计算 |
| [Matrix](${book.api}classes/math.matrix.html) | 默认的4x4矩阵，提供矩阵基本运算，变换相关运算 |
| [Matrix3x3](${book.api}classes/math.matrix3x3.html) | 3x3矩阵，提供矩阵基本运算，变换相关运算 |
| [Quaternion](${book.api}classes/math.quaternion.html) | 四元数，包含x、y、z、w分量，负责旋转相关的运算 |
| [Vector2](${book.api}classes/math.vector2.html) | 二维向量，包含x、y分量 |
| [Vector3](${book.api}classes/math.vector3.html) | 三维向量，包含x、y、z分量 |
| [Vector4](${book.api}classes/math.vector4.html) | 四维向量，包含x、y、z、w分量 |

## 向量

向量最基本的定义就是一个方向。或者更正式的说，向量有一个方向（Direction）和大小（Magnitude，也叫做强度或长度）。你可以把向量想像成一个藏宝图上的指示：“向左走10步，向北走3步，然后向右走5步”；“左”就是方向，“10步”就是向量的长度。那么这个藏宝图的指示一共有3个向量。向量可以在任意维度（Dimension）上，但是我们通常只使用2至4维。如果一个向量有2个维度，它表示一个平面的方向（想象一下2D的图像），当它有3个维度的时候它可以表达一个3D世界的方向。

在 Oasis 引擎中，向量用来表示物体坐标（position）、旋转（rotation）、缩放（scale）、颜色（color）。

```typescript
import { Vector3 } from '@oasis-engine/math';

// 创建默认三维向量，即 x,y,z 分量均为0
const v1 = new Vector3(); 

// 创建三维向量，并用给定值初始化 x,y,z 分量
const v2 = new Vector3(1, 2, 3); 

// 设置指定值
v1.setValue(1, 2, 2); 

// 获取各个分量
const x = v1.x;
const y = v1.y;
const z = v1.z;

// 向量相加，静态方式
const out1 = new Vector3();
Vector3.add(v1, v2, out1);

// 向量相加，实例方式
const out2 = v1.add(v2);

// 向量的标量长度
const len: number = v1.length();

// 向量归一化
v1.normalize();

// 克隆一个向量
const c1 = v1.clone();

// 将向量的值克隆到另外一个向量
const c2 = new Vector3();
v1.cloneTo(c2);

```
## 四元数

四元数是简单的超复数，而在图形引擎中，四元数主要用于三维旋转([四元数于三维旋转的关系](https://krasjet.github.io/quaternion/quaternion.pdf))，能够表示旋转的不止四元数，还有欧拉角、轴角、矩阵等形式，之所以选择四元数，主要有以下几个优势：

- 解决了万向节死锁的问题
- 只需要存储4个浮点数，相比矩阵来说更轻量
- 无论是求逆、串联等操作，相比矩阵更为高效

在 Oasis 引擎中，也是使用四元数来进行旋转相关运算，并提供欧拉角、矩阵等到四元数的转换API。

```typescript
import { Vector3, Quaternion, MathUtil } from '@oasis-engine/math';

// 创建默认四元数，即 x,y,z 分量均为0，w 分量为1
const q1 = new Quaternion(); 

// 创建四元数，并用给定值初始化 x,y,z,w 分量
const q2 = new Quaternion(1, 2, 3, 4); 

// 设置指定值
q1.setValue(1, 2, 3, 4); 

// 判断两个四元数的值是否相等
const isEqual: boolean = Quaternion.equals(q1, q2);

const xRad = Math.PI * 0.2;
const yRad = Math.PI * 0.5;
const zRad = Math.PI * 0.3;

// 根据 yaw、pitch、roll 生成四元数
const out1 = new Quaternion();
Quaternion.rotationYawPitchRoll(yRad, xRad, zRad, out1);

// 根据 x,y,z 轴的旋转欧拉角(弧度)生成四元数
const out2 = new Quaternion();
// 等价于 Quaternion.rotationYawPitchRoll(yRad, xRad, zRad, out2)
Quaternion.rotationEuler(xRad, yRad, zRad, out2); 

// 绕 X、Y、Z 轴旋转生成四元数，我们以绕 X 轴为例
const out3 = new Quaternion();
Quaternion.rotationX(xRad, out3);

// 当前四元数依次绕 X、Y、Z 轴旋转
const q3 = new Quaternion();
q3.rotateX(xRad).rotateY(yRad).rotateZ(zRad);

// 获取当前四元数的欧拉角(弧度)
const eulerV = new Vector3();
q3.toEuler(eulerV);

// 弧度转角度
eulerV.scale(MathUtil.radToDegreeFactor); 
```

## 矩阵

在 3D 图形引擎中，计算可以在多个不同的笛卡尔坐标空间中执行，从一个坐标空间到另一个坐标空间需要使用变换矩阵，而我们数学库中的Matrix模块正是为提供这种能力而存在的。

在 Oasis 引擎中，有局部坐标、全局坐标、观察坐标、裁剪坐标等，而物体在这些坐标之间的转换，正是通过转换矩阵来完成的。

```typescript
import { Vector3, Matrix3x3, Matrix } from '@oasis-engine/math';

// 创建默认4x4矩阵，默认为单位矩阵
const m1 = new Matrix(); 

// 创建4x4矩阵，并按给定值初始化
const m2 = new Matrix(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);

// 将 m2 设置为单位矩阵
m2.identity(); 

// 判断两个矩阵的值是否相等 true
const isEqual1: boolean = Matrix.equals(m1, m2);

// 矩阵相乘 静态方式
const m3 = new Matrix(1, 2, 3.3, 4, 5, 6, 7, 8, 9, 10.9, 11, 12, 13, 14, 15, 16);
const m4 = new Matrix(16, 15, 14, 13, 12, 11, 10, 9, 8.88, 7, 6, 5, 4, 3, 2, 1);
const out1 = new Matrix();
Matrix.multiply(m3, m4, out1);

// 矩阵相乘，实例方式
const out2 = m3.multiply(m4);

// 判断两个矩阵的值是否相等 true
const isEqual2: boolean = Matrix.equals(out1, out2);

// 求矩阵行列式
const m5 = new Matrix(1, 2, 3, 4, 5, 6, 7, 8, 9, 10.9, 11, 12, 13, 14, 15, 16);
const det: number = m5.determinant();

// 4x4矩阵转3x3矩阵
const m6 = new Matrix3x3();
m6.setValueByMatrix(m5);

// 创建4x4矩阵，并按给定值初始化
const m7 = new Matrix(1, 2, 3, 4, 5, 6, 7, 8, 9, 10.9, 11, 12, 13, 14, 15, 16);

// 求矩阵的转置矩阵，静态方式
Matrix.transpose(m7, m7); 

// 求矩阵的转置矩阵。实例方式
m7.transpose(); 

// 绕 Y 轴旋转生成4x4矩阵
const axis = new Vector3(0, 1, 0); 
const out4 = new Matrix();
Matrix.rotationAxisAngle(axis, Math.PI * 0.25, out4);
```
