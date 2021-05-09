---
order: 2
title: 加载一个 3D 模型
type: 入门
---

<playground src="gltf.ts"></playground>

## 基本使用

加载一个 3D 模型只要调用引擎 [ResourceManager](${book.manual}resource/resource-manager.md) 实例的 [load](${book.api}classes/core.resourcemanager.html#load) 方法即可，如下：

```typescript
engine.resourceManager.load('{gltf source}').then(gltf => {
  entity.addChild(gltf.defaultSceneRoot);
});
```

如果在一个异步函数体中使用，可以采用 `async/await` 语法：

```typescript
const gltf = await this.engine.resourceManager.load('{gltf source}');

entity.addChild(gltf.defaultSceneRoot);
```

> **注意**：由于 [glTF 2.0](https://www.khronos.org/gltf/) 的默认材质为 [PBR 材质]()，PBR 材质默认是需要光照的运算模型，所以场景中必须要添加[灯光]()，否则会得到黑色的反射结果。