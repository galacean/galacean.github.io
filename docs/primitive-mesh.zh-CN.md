---
order: 7
title: 基础几何体
type: 图形
group: 网格
label: Graphics/Mesh
---

常用几何体统一在 [PrimitiveMesh](${api}core/PrimitiveMesh) 中提供。

<playground src="primitive-mesh.ts"></playground>

目前提供的几何体如下：

- [createCuboid](${api}core/PrimitiveMesh#createCuboid) **立方体**

```typescript
const entity = rootEntity.createChild('cuboid');
entity.transform.setPosition(0, 1, 0);
const renderer = entity.addComponent(MeshRenderer);
renderer.mesh = PrimitiveMesh.createCuboid(engine);
// Create material
const material = new BlinnPhongMaterial(engine);
material.emissiveColor.set(1, 1, 1, 1);
renderer.setMaterial(material);
```

- [createSphere](${api}core/PrimitiveMesh#createSphere) **球体**

```typescript
const entity = rootEntity.createChild('sphere');
entity.transform.setPosition(0, 1, 0);
const renderer = entity.addComponent(MeshRenderer);
renderer.mesh = PrimitiveMesh.createSphere(engine);
// Create material
const material = new BlinnPhongMaterial(engine);
material.emissiveColor.set(1, 1, 1, 1);
renderer.setMaterial(material);
```

- [createPlane](${api}core/PrimitiveMesh#createPlane) **平面**

```typescript
const entity = rootEntity.createChild('plane');
entity.transform.setPosition(0, 1, 0);
const renderer = entity.addComponent(MeshRenderer);
renderer.mesh = PrimitiveMesh.createPlane(engine);
// Create material
const material = new BlinnPhongMaterial(engine);
material.emissiveColor.set(1, 1, 1, 1);
renderer.setMaterial(material);
```

- [createCylinder](${api}core/PrimitiveMesh#createCylinder) **圆柱**

```typescript
const entity = rootEntity.createChild('cylinder');
entity.transform.setPosition(0, 1, 0);
const renderer = entity.addComponent(MeshRenderer);
renderer.mesh = PrimitiveMesh.createCylinder(engine);
// Create material
const material = new BlinnPhongMaterial(engine);
material.emissiveColor.set(1, 1, 1, 1);
renderer.setMaterial(material);
```

- [createTorus](${api}core/PrimitiveMesh#createTorus) **圆环**

```typescript
const entity = rootEntity.createChild('torus');
entity.transform.setPosition(0, 1, 0);
const renderer = entity.addComponent(MeshRenderer);
renderer.mesh = PrimitiveMesh.createTorus(engine);
// Create material
const material = new BlinnPhongMaterial(engine);
material.emissiveColor.set(1, 1, 1, 1);
renderer.setMaterial(material);
```

- [createCone](${api}core/PrimitiveMesh#createCone) **圆锥**

```typescript
const entity = rootEntity.createChild('cone');
entity.transform.setPosition(0, 1, 0);
const renderer = entity.addComponent(MeshRenderer);
renderer.mesh = PrimitiveMesh.createCone(engine);
// Create material
const material = new BlinnPhongMaterial(engine);
material.emissiveColor.set(1, 1, 1, 1);
renderer.setMaterial(material);
```

- [createCapsule](${api}core/PrimitiveMesh#createCapsule) **胶囊体**

```typescript
const entity = rootEntity.createChild('capsule');
entity.transform.setPosition(0, 1, 0);
const renderer = entity.addComponent(MeshRenderer);
renderer.mesh = PrimitiveMesh.createCapsule(engine);
// Create material
const material = new BlinnPhongMaterial(engine);
material.emissiveColor.set(1, 1, 1, 1);
renderer.setMaterial(material);
```
