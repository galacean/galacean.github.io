---
order: 4
title: Renderer
type: Graphics
group: Renderer
---

[MeshRenderer](${api}core/MeshRenderer) is a mesh renderer component，when an entity mounts this, it only needs to set its `mesh` and `material` properties to start rendering.

## How to use

``` TypeScript
let cubeEntity = rootEntity.createChild('cube');
let cube = cubeEntity.addComponent(MeshRenderer);
cube.mesh = PrimitiveMesh.createCuboid(engine, 2, 2, 2);
cube.setMaterial(new BlinnPhongMaterial(engine));
```
<playground src="scene-basic.ts"></playground>

## Data source

- [Mesh](${docs}mesh)
- [Material](${docs}material)
