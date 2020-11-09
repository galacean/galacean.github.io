# 绘制一个 3D 模型

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
    gltf.defaultSceneRoot.transform.setPosition(0, -10, 0)
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