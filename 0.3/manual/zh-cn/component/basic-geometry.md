# 基础几何体

常用几何体统一在 [PrimitiveMesh](${book.api}classes/core.primitivemesh.html) 中提供，目前提供的几何体如下，完整使用示例见 [playgournd](${book.playground}#/primitive-mesh)

- [createCuboid](${book.api}classes/core.primitivemesh.html) **立方体**

```typescript
const entity = rootEntity.createChild('cuboid');
entity.transform.setPosition(0, 1, 0);
const renderer = entity.addComponent(MeshRenderer);
renderer.mesh = PrimitiveMesh.createCuboid(engine);
// Create material
const material = new BlinnPhongMaterial(engine);
material.emissiveColor.setValue(1, 1, 1, 1);
renderer.setMaterial(material);
```

- [createSphere](${book.api}classes/core.primitivemesh.html) **球体**

```typescript
const entity = rootEntity.createChild('sphere');
entity.transform.setPosition(0, 1, 0);
const renderer = entity.addComponent(MeshRenderer);
renderer.mesh = PrimitiveMesh.createSphere(engine);
// Create material
const material = new BlinnPhongMaterial(engine);
material.emissiveColor.setValue(1, 1, 1, 1);
renderer.setMaterial(material);
```

- [createPlane](${book.api}classes/core.primitivemesh.html) **平面**

```typescript
const entity = rootEntity.createChild('plane');
entity.transform.setPosition(0, 1, 0);
const renderer = entity.addComponent(MeshRenderer);
renderer.mesh = PrimitiveMesh.createPlane(engine);
// Create material
const material = new BlinnPhongMaterial(engine);
material.emissiveColor.setValue(1, 1, 1, 1);
renderer.setMaterial(material);
```

- [createCylinder](${book.api}classes/core.primitivemesh.html) **圆柱**

```typescript
const entity = rootEntity.createChild('cylinder');
entity.transform.setPosition(0, 1, 0);
const renderer = entity.addComponent(MeshRenderer);
renderer.mesh = PrimitiveMesh.createCylinder(engine);
// Create material
const material = new BlinnPhongMaterial(engine);
material.emissiveColor.setValue(1, 1, 1, 1);
renderer.setMaterial(material);
```

- [createTorus](${book.api}classes/core.primitivemesh.html) **圆环**

```typescript
const entity = rootEntity.createChild('torus');
entity.transform.setPosition(0, 1, 0);
const renderer = entity.addComponent(MeshRenderer);
renderer.mesh = PrimitiveMesh.createTorus(engine);
// Create material
const material = new BlinnPhongMaterial(engine);
material.emissiveColor.setValue(1, 1, 1, 1);
renderer.setMaterial(material);
```

- [createCone](${book.api}classes/core.primitivemesh.html) **圆锥**

```typescript
const entity = rootEntity.createChild('cone');
entity.transform.setPosition(0, 1, 0);
const renderer = entity.addComponent(MeshRenderer);
renderer.mesh = PrimitiveMesh.createCone(engine);
// Create material
const material = new BlinnPhongMaterial(engine);
material.emissiveColor.setValue(1, 1, 1, 1);
renderer.setMaterial(material);
```
