---
order: 1
title: 组件
type: 核心
label: Core
---

在 Galacean 引擎中，[Entity](${api}core/Entity) 不具备渲染模型等实际的功能，这些功能是通过加载 [Component](${api}core/Component) 组件类来实现的。例如，如果想让一个 _Entity_ 变成一个相机，只需要在该 _Entity_ 上添加相机组件 [Camera](${api}core/Camera)。这种基于组件的功能扩展方式注重将程序按照功能独立封装，在使用的时候按照需要组合添加，非常有利于降低程序耦合度并提升代码复用率。

常用组件：

| 名称                                                  | 描述           |
| :---------------------------------------------------- | :------------- |
| [Camera](${api}core/Camera)                           | 相机           |
| [MeshRenderer](${api}core/MeshRenderer)               | 静态模型渲染器 |
| [SkinnedMeshRenderer](${api}core/SkinnedMeshRenderer) | 骨骼模型渲染器 |
| [Animator](${api}core/Animator)                       | 动画控制组件   |
| [DirectLight](${api}core/DirectLight)                 | 方向光         |
| [PointLight](${api}core/PointLight)                   | 点光源         |
| [SpotLight](${api}core/SpotLight)                     | 聚光灯         |
| [ParticleRenderer](${api}core/ParticleRenderer)       | 粒子系统       |
| [BoxCollider](${api}core/BoxCollider)                 | 盒碰撞体       |
| [SphereCollider](${api}core/SphereCollider)           | 球碰撞体       |
| [PlaneCollider](${api}core/PlaneCollider)             | 平面碰撞体     |
| [Script](${api}core/Script)                           | 脚本           |

## 编辑器使用

从层级面板或场景中选择一个实体后，检查器将显示出当前选中节点所可以调整的属性。在此情况下，你可以点击 `Add Component` 按钮来为当前实体添加新的组件。

<img src="https://gw.alipayobjects.com/zos/OasisHub/95d58dde-109f-44b2-89ef-2959ad8b4fe3/image-20230926112713126.png" alt="image-20230926112713126" style="zoom:50%;" />

## 脚本使用

### 添加组件

我们使用 [addComponent(Component)](${api}core/Entity#addComponent) 添加组件，例如给 `Entity`  添加“平行光”组件（[DirectLight](${api}core/DirectLight)）：

```typescript
const lightEntity = rootEntity.createChild("light");
const directLight = lightEntity.addComponent(DirectLight);
directLight.color = new Color(0.3, 0.3, 1);
directLight.intensity = 1;
```

### 查找实体上的组件

当我们需要获取某一实体上的组件， [getComponent](${api}core/Entity#getComponent) 这个 API 会帮你查找目标组件。

```typescript
const component = newEntity.getComponent(Animator);
```

有些时候可能会有多个同一类型的组件，而上面的方法只会返回第一个找到的组件。如果需要找到所有组件可以用 [getComponents](${api}core/Entity#getComponents)：

```typescript
const components = [];
newEntity.getComponents(Animator, components);
```

在 glTF 这种资产得到的实体里，我们可能不知道目标组件位于哪个实体，这时可以使用[getComponentsIncludeChildren](${api}core/Entity#getComponentsIncludeChildren)进行查找。

```typescript
const components = [];
newEntity.getComponentsIncludeChildren(Animator, components);
```

### 获得组件所在的实体

继续开头添加组件的例子。可以直接获得组件所在的实体：

```typescript
const entity = directLight.entity;
```

### 状态

暂时不使用某组件时，可以主动调用组件的 [enabled](${api}core/Component#enabled)

```typescript
directLight.enabled = false;
```