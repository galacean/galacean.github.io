---
order: 4
title: 网格渲染器
type: 图形
group: 渲染器组件
label: Graphics/Renderer
---

[MeshRenderer](${api}core/MeshRenderer) 是网格渲染组件，当一个实体挂载了网格渲染组件，只需设置它的 `mesh` 与 `material`即可渲染物体。

## 使用

```typescript
let cubeEntity = rootEntity.createChild('cube');
let cube = cubeEntity.addComponent(MeshRenderer);
cube.mesh = PrimitiveMesh.createCuboid(engine, 2, 2, 2);
cube.setMaterial(new BlinnPhongMaterial(engine));
```
<playground src="scene-basic.ts"></playground>

## 数据源

- [网格](${docs}mesh-cn)
- [材质](${docs}material-cn)
