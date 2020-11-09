# 基础几何体渲染器

目前提供了以下几种形状的几何体：

- [CuboidGeometry]({{book.api}}classes/core.cuboidgeometry.html) **立方体**

```typescript
let sphere = rootEntity.createChild('sphere');
let sphereRenderer = sphere.addComponent(GeometryRenderer);
sphereRenderer.geometry = new CuboidGeometry(2, 2, 2);

// 创建材质
let mtl = new BlinnPhongMaterial('test_mtl2', false);
mtl.ambient = new Vector4(0.75, 0.25, 0.25, 1);
mtl.shininess = 100;
sphereRenderer.setMaterial(mtl);
```

- [SphereGeometry]({{book.api}}classes/core.spheregeometry.html) **球体**

```typescript
let sphere = rootEntity.createChild('sphere');
let sphereRenderer = sphere.addComponent(GeometryRenderer);
sphereRenderer.geometry = new SphereGeometry(3, 32, 32);

// 创建材质
let mtl = new BlinnPhongMaterial('test_mtl2', false);
mtl.ambient = new Vector4(0.75, 0.25, 0.25, 1);
mtl.shininess = 100;
sphereRenderer.setMaterial(mtl);
```

- [PlaneGeometry]({{book.api}}classes/core.spheregeometry.html) **平面**

```typescript
// 创建材质
let mtl = new BlinnPhongMaterial('test_mtl2', false);
mtl.ambient = new Vector4(0.75, 0.25, 0.25, 1);
mtl.shininess = 100;

let sphere = rootEntity.createChild('sphere');
let sphereRenderer = sphere.addComponent(GeometryRenderer);
sphereRenderer.geometry = new SphereGeometry(3, 32, 32);
sphereRenderer.setMaterial(mtl);
```

- [CircleGeometry]({{book.api}}classes/core.circlegeometry.html) **圆形**

```typescript
let sphere = rootEntity.createChild('sphere');
let sphereRenderer = sphere.addComponent(GeometryRenderer);
sphereRenderer.geometry = new CircleGeometry(3, 3, 3);

// 创建材质
let mtl = new BlinnPhongMaterial('test_mtl2', false);
mtl.ambient = new Vector4(0.75, 0.25, 0.25, 1);
mtl.shininess = 100;
sphereRenderer.setMaterial(mtl);
```

- [CylinderGeometry]({{book.api}}classes/core.cylindergeometry.html) **圆柱**

```typescript
let sphere = rootEntity.createChild('sphere');
let sphereRenderer = sphere.addComponent(GeometryRenderer);
sphereRenderer.geometry = new CylinderGeometry(2, 3, 5, 32);

// 创建材质
let mtl = new BlinnPhongMaterial('test_mtl2', false);
mtl.ambient = new Vector4(0.75, 0.25, 0.25, 1);
mtl.shininess = 100;
sphereRenderer.setMaterial(mtl);
```