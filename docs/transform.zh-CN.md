---
order: 1
title: 变换
type: 组件
---

在创建一个新的节点时，会自动为该节点添加变换组件。变换组件能够对节点的位移，旋转，缩放，矩阵等进行操作，完成节点的几何变换。

<playground src="transform-basic.ts"></playground>

## 基本用法
```typescript
// 创建节点
const scene = engine.sceneManager.activeScene;
const root = scene.createRootEntity('root');
const cubeEntity = root.createChild('cube');

// entity 在创建后会默认自带变换组件
// 通过变换组件能够对实体进行几何变换

// 修改节点位移，旋转，缩放
transform.position = new Vector3();
// 也可以 transform.setPosition(0, 0, 0);

transform.rotation = new Vector3(90, 0, 0);
// 也可以 transform.setRotation(90, 0, 0);

// 也可以通过实体的属性获取到 transform 组件
cubeEntity.transform.scale = new Vector3(2, 1, 1);
// 也可以 cubeEntity.transform.setScale(2, 1, 1);

// 局部位移 cube 实体
cubeEntity.transform.translate(new Vector3(10, 0, 0), true);

// 局部旋转 cube 实体
cubeEntity.transform.rotate(new Vector3(45, 0, 0), true);

```


## 组件属性
| 属性名称 | 属性释义 |
| :--- | :--- |
| [position](${api}core/Transform#position) | 局部位移 |
| [rotation](${api}core/Transform#rotation) | 局部旋转 - 欧拉角 |
| [rotationQuaternion](${api}core/Transform#rotationquaternion) | 局部旋转 - 四元数 |
| [scale](${api}core/Transform#scale) | 局部缩放 |
| [worldPosition](${api}core/Transform#worldPosition) | 世界位移 |
| [worldRotation](${api}core/Transform#worldRotation) | 世界旋转 - 欧拉角 |
| [worldRotationQuaternion](${api}core/Transform#worldRotationQuaternion) | 世界旋转 - 四元数 |
| [lossyWorldScale](${api}core/Transform#lossyWorldScale) | 世界有损缩放 - 当父节点有缩放，子节点有旋转时，缩放会倾斜，无法使用Vector3正确表示,必须使用Matrix3x3矩阵才能正确表示 |
| [localMatrix](${api}core/Transform#localMatrix) | 局部矩阵 |
| [worldMatrix](${api}core/Transform#worldMatrix) | 世界矩阵 |



## 组件方法
| 方法名称 | 方法释义 |
| --- | --- |
| [getWorldUp](${api}core/Transform#getWorldUp) | 获取世界矩阵上向量 |
| [getWorldRight](${api}core/Transform#getWorldRight) | 获取世界矩阵右向量 |
| [getWorldForward](${api}core/Transform#getWorldForward) | 获取世界矩阵前向量 |
| [lookAt](${api}core/Transform#lookAt) | 旋转并且保证世界前向量指向目标世界位置 |
| [registerWorldChangeFlag](${api}core/Transform#registerWorldChangeFlag) | 注册世界变换改变标记 |
| [rotate](${api}core/Transform#rotate) | 根据指定欧拉角旋转 |
| [rotateByAxis](${api}core/Transform#rotateByAxis) | 根据指定角度绕着指定轴旋转 |
| [translate](${api}core/Transform#translate) | 根据指定的方向和距离进行位移 |



## 常见QA

- 为什么要添加 `transform` 组件？



3D 场景中，物体的几何变换应该统一进行管理，而不是把变换相关的数据杂糅到节点类中。
同时，新的 `transform` 组件内部用脏标记作了大量优化，优化计算，提升性能。
​


- 为什么修改 `transform.position.x` 没有作用？

transform 组件内部使用脏标记进行了大量优化，位移，旋转，缩放，世界矩阵等属性的更新都会受到脏标记的影响。仅通过修改 `position` 对象的属性值，是无法使物体位移的。所以，使用 tweenjs 修改属性也无法实现插值动画。
若需要修改物体的位移，通过为 `position` 重新赋值，或者调用`setPosition` 方法即可。


- `registerWorldChangeFlag` 有什么作用？

由于 `transform` 的 `worldMatrix` 属性也用脏标记进行了优化～ 
所以，若组件外部需要关注当前 `transform` 的 `worldMatrix` 是否发生了变化，需要获取到其脏标记的状态。
`transform` 组件提供了 `registerWorldChangeFlag` 方法：这个方法会返回一个更新标记，当前 `transform` 的 `worldMatrix` 被修改时会触发标记的更改。具体用法可以参考相机组件：

```typescript
class Camera {
	onAwake() {
  	this._transform = this.entity.transform;
    // 注册更新标记
    this._isViewMatrixDirty = this._transform.registerWorldChangeFlag();
  }
  get viewMatrix() {
    // 当标记更新时，根据 worldMatrix 得到viewMatrix～
  	if (this._isViewMatrixDirty.flag) {
      this._isViewMatrixDirty.flag = false;
      Matrix.invert(this._transform.worldMatrix, this._viewMatrix);
    }
    return this._viewMatrix;
  }
}
```
