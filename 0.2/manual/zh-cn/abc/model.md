# 绘制一个 3D 模型

## 基本使用

加载一个 3D 模型只要调用引擎 [ResourceManager](${book.manual}resource/resource-manager.md) 实例的 [load](${book.api}classes/core.resourcemanager.html#load) 方法即可，如下：

```typescript
const gltf = await this.engine.resourceManager.load(
  'https://gw.alipayobjects.com/os/OasisHub/c11f06c1-12b4-447f-a7c4-c75ba7f692f4/86/0.46107136414206873.gltf',
);
```

这时候会发现模型有形状，但是颜色是黑色的，因为 [glTF 2.0](https://www.khronos.org/gltf/) 的默认材质为 *PBR* 材质，*PBR* 材质默认是需要光照的运算模型，所以在没有光源的情况下，会得到黑色的反射结果。

这里添加一个环境光：

```typescript
// 环境光
let ambientLight = rootEntity.addComponent(AmbientLight);
```

## 完整代码

```typescript
import {
  AmbientLight,
  WebGLEngine,
  Script,
  Camera,
  Vector3
} from 'oasis-engine';

class ResourceScript extends Script {
  async onAwake() {
    const gltf = await this.engine.resourceManager.load(
      'https://gw.alipayobjects.com/os/OasisHub/c11f06c1-12b4-447f-a7c4-c75ba7f692f4/86/0.46107136414206873.gltf',
    );
    gltf.defaultSceneRoot.transform.setPosition(0, -10, 0);
    this.entity.addChild(gltf.defaultSceneRoot);
  }
}

const engine = new WebGLEngine('canvas');
engine.canvas.resizeByClientSize();

const rootEntity = engine.sceneManager.activeScene.createRootEntity();

const cameraEntity = rootEntity.createChild('camera');
cameraEntity.addComponent(Camera);
const pos = cameraEntity.transform.position;
pos.setValue(0, -5, 20);
cameraEntity.transform.position = pos;
cameraEntity.transform.lookAt(new Vector3(0, -5, 0));

rootEntity.addComponent(ResourceScript);
let ambientLight = rootEntity.addComponent(AmbientLight)
ambientLight.intensity = 1.2;

engine.run();
```