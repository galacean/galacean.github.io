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

## 渲染顺序

渲染器的渲染顺序从前到后依次受 3 个因素的影响：所在渲染队列、渲染优先级、到相机距离。需要注意的是渲染器的渲染顺序不会受场景节点树顺序的影响。

### 渲染队列

引擎共划分了 3 个渲染队列，按渲染顺序从前到后依次是：非透明渲染队列、透明裁剪对象的渲染队列、透明渲染队列。渲染器可以通过材质调整所在的渲染队列，示例如下：
```typescript
const material = renderer.getMaterial();
material.renderState.renderQueueType = RenderQueueType.Opaque;
```

### 渲染优先级

引擎为所有渲染器提供了 priority 属性用于手动设置在同一个渲染队列中渲染器的渲染顺序，默认值为 0 ，priority 值越小，渲染顺序越前。示例如下：
```typescript
renderer.priority = 10;
```

### 到相机距离

当同一个渲染队列中的渲染器的渲染优先级也一样的时候，将通过渲染器到相机距离来决定渲染顺序。

相机类型不同，到相机距离的计算方式也有差异。在正交相机中，距离是渲染器包围盒中心点与摄像机沿着摄像机视图方向的距离，在透视相机中，距离是渲染器包围盒中心点与摄像机位置的直接距离。

![到相机距离示意图](https://mdn.alipayobjects.com/huamei_w6ifet/afts/img/A*gYvyQp6qD3YAAAAAAAAAAAAADjCHAQ/original)

在非透明渲染队列和透明裁剪对象的渲染队列中，到相机距离越小，渲染顺序越前，透明渲染队列中，到相机距离越大，渲染顺序越前。

## 数据源

- [网格](${docs}mesh-cn)
- [材质](${docs}material-cn)
