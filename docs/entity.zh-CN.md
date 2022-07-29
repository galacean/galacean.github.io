---
order: 3
title: 实体与组件
type: 核心
---

在 Oasis 引擎中，[Entity](${api}core/Entity) 不具备渲染模型等实际的功能，这些功能是通过加载 [Component](${api}core/Component) 组件类来实现的。例如，如果想让一个 _Entity_ 变成一个相机，只需要在该 _Entity_ 上添加相机组件 [Camera](${api}core/Camera)。这种基于组件的功能扩展方式注重将程序按照功能独立封装，在使用的时候按照需要组合添加，非常有利于降低程序耦合度并提升代码复用率。

我们使用 [addComponent(Component)](${api}core/Entity#addComponent) 添加组件，例如给 `Entity`  添加“平行光”组件（[DirectLight](${api}core/DirectLight)）：

```typescript
const lightEntity = rootEntity.createChild("light");
const directLight = lightEntity.addComponent(DirectLight);
directLight.color = new Color(0.3, 0.3, 1);
directLight.intensity = 1;
```

### 常用组件

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

### 实体

#### 创建新实体

在[场景](${docs}script-cn)中已经介绍了如何获取激活场景。在新场景中，我们通常会先添加根节点：

```typescript
const scene = engine.sceneManager.activeScene;
const rootEntity = scene.createRootEntity();
```

一般以添加子实体的方式创建新实体：

```typescript
const newEntity = rootEntity.createChild("firstEntity");
```

当然，也可以直接创建实体。但这种实体是游离的，在关联层级树上的实体之前不显示在场景中。

```typescript
const newEntity = new Entity(engine, "firstEntity");
rootEntity.addChild(newEntity);
```

#### 删除实体

某个实体在场景中不再需要时，我们可以删除它:

```typescript
rootEntity.removeChild(newEntity);
```

值得注意的是，这种方式仅仅是将物体从层级树上释放出来，不在场景中显示。如果彻底销毁还需要：

```typescript
newEntity.destroy();
```

#### 查找子实体

在已知父实体的情况下，通常我们通过父实体来获得子实体：

```typescript
const childrenEntity = newEntity.children;
```

如果明确知道子实体在父实体中的 _index_ 可以直接使用 [getChild](${api}core/Entity#getChild)：

```typescript
newEntity.getChild(0);
```

如果不清楚子实体的 index，可以使用 [findByName](${api}core/Entity#findByName) 通过名字查找。`findByName` 不仅会查找子实体，还会查找孙子实体。

```typescript
newEntity.findByName("model");
```

如果有同名的实体可以使用 [findByPath](${api}core/Entity#findByPath) 传入路径进行逐级查找，使用此 API 也会一定程度上提高查找效率。

```typescript
newEntity.findByPath("parent/child/grandson");
```

#### 全局实体查找

用户也可以通过 [Entity.findByName](${api}core/Entity#findByName) 和 [Entity.findByPath](${api}core/Entity#findByPath) 进行全局的实体查找，使用方法和之前的查找子实体类似:

```typescript
Entity.findByName("model");
```

```typescript
Entity.findByPath("container/model");
```

### 组件

#### 查找实体上的组件

当我们需要获取某一实体上的组件， [getComponent](${api}core/Entity#getComponent) 这个 API 会帮你查找目标组件。

```typescript
const component = newEntity.getComponent(Animation);
```

有些时候可能会有多个同一类型的组件，而上面的方法只会返回第一个找到的组件。如果需要找到所有组件可以用 [getComponents](${api}core/Entity#getComponents)：

```typescript
const components = [];
newEntity.getComponents(Animation, components);
```

在 glTF 这种资产得到的实体里，我们可能不知道目标组件位于哪个实体，这时可以使用[getComponentsIncludeChildren](${api}core/Entity#getComponentsIncludeChildren)进行查找。

```typescript
const components = [];
newEntity.getComponentsIncludeChildren(Animation, components);
```

#### 获得组件所在的实体

继续开头添加组件的例子。可以直接获得组件所在的实体：

```typescript
const entity = directLight.entity;
```

### 状态

暂时不使用某实体时，可以通过调用实体的 [isActive](${api}core/Entity#isActive) 停止激活。同时该实体下的组件被动`component.enabled = false`

```typescript
newEntity.isActive = false;
```

暂时不使用某组件时，可以主动调用组件的 [enabled](${api}core/Component#enabled)

```typescript
directLight.enabled = false;
```
