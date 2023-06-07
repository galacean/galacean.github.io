---
order: 4
title: Renderer
type: Graphics
group: Renderer
label: Graphics/Renderer
---

[MeshRenderer](${api}core/MeshRenderer) is a mesh renderer component，when an entity mounts this, it only needs to set its `mesh` and `material` properties to start rendering.

## How to use

```typescript
let cubeEntity = rootEntity.createChild('cube');
let cube = cubeEntity.addComponent(MeshRenderer);
cube.mesh = PrimitiveMesh.createCuboid(engine, 2, 2, 2);
cube.setMaterial(new BlinnPhongMaterial(engine));
```
<playground src="scene-basic.ts"></playground>

## Render Order

The render order of the renderer is affected by 3 factors from front to back: render queue, render priority, and distance to the camera.

### Render Queue Type

The engine is divided into 3 render queue types, which are from front to back in the render order: Opaque/AlphaTest/Transparent. The renderer can adjust the render queue where it is located through the material, examples are as follows:

```typescript
const material = renderer.getMaterial();
material.renderState.renderQueueType = RenderQueueType.Opaque;
```

### Render Priority

The engine provides a priority attribute for all renderers to manually set the render order of the renderers in the same render queue. The default value is 0, and the smaller the priority value, the higher the render order. Examples are as follows:

```typescript
renderer.priority = 10;
```

### Camera Distance

When the render priority of the renderers in the same render queue is the same, the render order will be determined by the distance from the renderer to the camera.

Depending on the type of camera, the calculation method of the distance to the camera is also different. In an orthographic camera, the distance is the distance between the center point of the renderer's bounding box and the camera along the view direction of the camera, and in a perspective camera, the distance is the direct distance between the center point of the renderer's bounding box and the camera position.

![到相机距离示意图](https://mdn.alipayobjects.com/huamei_w6ifet/afts/img/A*gYvyQp6qD3YAAAAAAAAAAAAADjCHAQ/original)

In the opaque render queue and the alpha test render queue, the smaller the distance to the camera, the higher the render order. In the transparent render queue, the larger the distance to the camera, the higher the rendering order.

## Data source

- [Mesh](${docs}mesh)
- [Material](${docs}material)
