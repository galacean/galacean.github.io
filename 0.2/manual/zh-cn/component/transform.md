# 变换组件

在创建一个新的节点时，会自动为该节点添加变换组件。变换组件能够对节点的位移，旋转，缩放，矩阵等进行操作，完成节点的几何变换。


## 基本用法
```typescript
// 创建节点
const scene = engine.sceneManager.activeScene;
const root = scene.createRootEntity('root');
const cubeEntity = root.createChild('cube');

// entity在创建后会默认自带变换组件
// 通过变换组件能够对实体进行几何变换

// 修改节点位移，旋转，缩放
transform.position = new Vector3();
// 也可以 transform.setPosition(0, 0, 0);

transform.rotation = new Vector3(90, 0, 0);
// 也可以 transform.setRotation(90, 0, 0);

 // 也可以通过实体的属性获取到transform组件
cubeEntity.transform.scale = new Vector3(2, 1, 1);
// 也可以 cubeEntity.transform.setScale(2, 1, 1);

// 局部位移cube实体
cubeEntity.transform.translate(new Vector3(10, 0, 0), true);

// 局部旋转cube实体
cubeEntity.transform.rotate(new Vector3(45, 0, 0), true);

```


## 组件属性
| 属性名称 | 属性释义 |
| :--- | :--- |
| [position](${book.api}classes/core.transform.html#position) | 局部位移 |
| [rotation](${book.api}classes/core.transform.html#rotation) | 局部旋转 - 欧拉角 |
| [rotationQuaternion](${book.api}classes/core.transform.html#rotationquaternion) | 局部旋转 - 四元数 |
| [scale](${book.api}classes/core.transform.html#scale) | 局部缩放 |
| [worldPosition](${book.api}classes/core.transform.html#worldposition) | 世界位移 |
| [worldRotation](${book.api}classes/core.transform.html#worldrotation) | 世界旋转 - 欧拉角 |
| [worldRotationQuaternion](${book.api}classes/core.transform.html#worldrotationquaternion) | 世界旋转 - 四元数 |
| [lossyWorldScale](${book.api}classes/core.transform.html#lossyworldscale) | 世界有损缩放 - 当父节点有缩放，子节点有旋转时，缩放会倾斜，无法使用Vector3正确表示,必须使用Matrix3x3矩阵才能正确表示 |
| [localMatrix](${book.api}classes/core.transform.html#localmatrix) | 局部矩阵 |
| [worldMatrix](${book.api}classes/core.transform.html#worldmatrix) | 世界矩阵 |



## 组件方法
| 方法名称 | 方法释义 |
| --- | --- |
| [getWorldUp](${book.api}classes/core.transform.html#getworldup) | 获取世界矩阵上向量 |
| [getWorldRight](${book.api}classes/core.transform.html#getworldright) | 获取世界矩阵友向量 |
| [getWorldForward](${book.api}classes/core.transform.html#getworldforward) | 获取世界矩阵前向量 |
| [lookAt](${book.api}classes/core.transform.html#lookat) | 旋转并且保证世界前向量指向目标世界位置 |
| [registerWorldChangeFlag](${book.api}classes/core.transform.html#registerworldchangeflag) | 注册世界变换改变标记 |
| [rotate](${book.api}classes/core.transform.html#rotate) | 根据指定欧拉角旋转 |
| [rotateByAxis](${book.api}classes/core.transform.html#rotatebyaxis) | 根据指定角度绕着指定轴旋转 |
| [translate](${book.api}classes/core.transform.html#translate) | 根据指定的方向和距离进行位移 |



## 常见QA

- 为什么要添加 transform 组件？

3D 场景中，物体的几何变换应该统一进行管理，而不是把变换相关的数据杂糅到节点类中。
同时，新的 transform 组件内部用脏标记作了大量优化，优化计算，提升性能。


- `registerWorldChangeFlag` 有什么作用？

当外部需要关注当前 transform 的 `worldMatrix` 变化时，则可以调用这个方法，这个方法会返回一个更新标记，当前 transform 的 `worldMatrix` 被修改时会触发标记的更改。具体用法可以参考：
```typescript
class Camera {
	onAwake() {
  	this._transform = this.entity.transform;
    this._isViewMatrixDirty = this._transform.registerWorldChangeFlag();
  }
  get viewMatrix() {
  	if (this._isViewMatrixDirty.flag) {
      this._isViewMatrixDirty.flag = false;
      Matrix.invert(this._transform.worldMatrix, this._viewMatrix);
    }
    return this._viewMatrix;
  }
}
```
