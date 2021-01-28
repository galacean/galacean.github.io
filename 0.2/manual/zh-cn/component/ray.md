# 射线投射

射线可以理解成 3D 世界中一个点向一个方向发射的一条无终点的线。射线投射在 3D 应用中非常广泛。通过射线投射，可以在用户点击屏幕时，拾取 3D 场景中的物体；也可以在射击游戏中，判断子弹能否射中目标。

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2019/png/161276/1566567969808-796f776a-96eb-4be1-bd50-5bfda698329d.png#align=left&display=inline&height=247&margin=%5Bobject%20Object%5D&name=image.png&originHeight=294&originWidth=554&size=43365&status=done&style=none&width=465)
（_图片来源于网络_）

**Ray** 模块提供了方便好用的射线检测功能。

## 使用射线投射

在使用射线投射，首先要在代码中引入 [Ray](${book.api}classes/math.ray.html) 模块；然后生成射线，射线可以自定义生成，也可以通过相机（[camera](${book.api}classes/core.camera.html#viewportpointtoray)）将屏幕输入转化成射线；最后调用 `scene.raycast`  方法即可检测射线投射命中的碰撞体。代码如下：


```typescript
// 加载 Raycast 模块
import { Ray } from 'oasis-engine';

// 自定义 Ray
let ray = new Ray([0, 0, 0], [0, 0, 1]);
let collider = scene.raycast(ray);
if (collider) {
  console.log(collider);
}

// 将屏幕输入转换成Ray
document.getElementById('canvas').addEventListener('click', (e) => {
  ray = camera.screenPointToRay(e.offsetX, e.offsetY);
  collider = scene.raycast(ray);
  if (collider) {
    console.log(collider);
  }
});
```
