# 绘制一个立方体

这个教程将带你开发一个“旋转的方块”示例。


1.安装引擎：

```bash
npm install --save oasis-engine

## 阿里内部可以用 tnpm
tnpm install --save oasis-engine
```

2.输入以下代码：

```typescript
// 引入模块
import {
  Engine,
  Camera,
  Entity,
  WebCanvas,
  WebGLRenderer,
  GeometryRenderer,
  CuboidGeometry,
  BlinnPhongMaterial,
  DirectLight,
  Vector3,
  Vector4,
  Script,
} from 'oasis-engine';

// 创建画布
const canvas = document.getElementById('canvas');
const webcanvas = new WebCanvas(canvas);
webcanvas.width = window.innerWidth;
webcanvas.height = window.innerHeight;

// 创建引擎
let engine = new Engine(webcanvas, new WebGLRenderer());

// 获取场景根实体
const scene = engine.sceneManager.activeScene;
const rootEntity = scene.createRootEntity('root');

// 创建一个相机实体
let cameraEntity = rootEntity.createChild('camera_entity');
cameraEntity.transform.position = new Vector3(0, 10, 50);
cameraEntity.transform.lookAt(new Vector3(0, 0, 0));
let camera = cameraEntity.addComponent(Camera);
camera.backgroundColor = new Vector4(1,1,1,1)


// 创建一个实体用来挂载方向光
let lightEntity = rootEntity.createChild('light');

// 创建一个方向光组件
let directLight = lightEntity.addComponent(DirectLight)
directLight.color = new Vector3( 1.0, 1.0, 1.0 );
directLight.intensity = 0.5;

// 通过灯光实体的旋转角度控制光线方向
lightEntity.transform.rotation = new Vector3(45, 45, 45);

// 创建立方体实体
let cubeEntity = rootEntity.createChild('cube');
let cube = cubeEntity.addComponent(GeometryRenderer)
cube.geometry = new CuboidGeometry(engine, 4, 4, 4);
cube.material = new BlinnPhongMaterial(engine, 'blinn');

// 旋转脚本组件
class Rotate extends Script {
  private _tempVector = new Vector3(0, 1, 0);
  onUpdate() {
    this.entity.transform.rotate(this._tempVector);
  }
}

// 添加旋转脚本组件
cubeEntity.addComponent(Rotate);

// 启动引擎
engine.run();
```