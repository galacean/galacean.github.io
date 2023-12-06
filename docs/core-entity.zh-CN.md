---
order: 1
title: 实体与组件
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

### 实体操作

层级面板位于编辑器的最左侧，它以树状结构显示当前场景中的所有节点，场景节点是所有其他节点的父节点，包括相机、灯光、网格等等。在节点面板上方有一个搜索框，可以模糊搜索场景中的节点，来快速定位。通过节点面板，你可以添加或删除节点，通过拖拽的方式来排序从而更好的组织节点。

<img src="https://gw.alipayobjects.com/zos/OasisHub/e85a8a9b-decd-4a80-a7b2-9eccaeed1e2c/image-20230925173904478.png" alt="image-20230925173904478" style="zoom:50%;" />

#### 新增节点

要新增节点，你可以点击节点面板上的添加按钮，或右键某个节点后选择添加子节点。添加完成后，你可以在检查器面板中对新节点的属性进行编辑。如果使用新增节点按钮, 你还可以快速创建立方体/球体等基本模型

#### 删除节点

选中一个节点后，可以点击节点面板上的删除按钮或通过右键菜单中的删除选项来删除节点。删除节点会删除节点及其所有的子节点。所以在删除节点时，你需要注意所删除的节点是否会影响场景中其他节点。

#### 节点排序

为了更好的组织节点，你可以通过拖拽的方式来排序节点。选中一个节点后，可以通过鼠标左键拖拽来改变节点在层级树中的位置。glTF 模型节点不能够调整 scale 属性, 所以通常情况下，你需要把 glTF 节点拖拽到一个 entity 节点下, 然后调整 entity 节点的 scale 属性。有关 glTF 详细的介绍可参见后续章节。

#### 节点搜索

节点面板上方有一个搜索框，用户可以输入节点的名称来搜索场景中的节点。搜索框支持模糊搜索，你可以输入节点名称的部分字符来查找节点。

#### 节点隐藏

每个实体节点右侧都有一个眼睛按钮，点击可以切换节点在场景中的显示/隐藏状态。需要注意的是, 此处对节点显示状态的调整仅是工作区的修改，而非在检查器面板中的 `isActive` 的属性。

### 组件操作

从层级面板或场景中选择一个实体后，检查器将显示出当前选中节点所可以调整的属性。在此情况下，你可以点击 `Add Component` 按钮来为当前实体添加新的组件。

<img src="https://gw.alipayobjects.com/zos/OasisHub/95d58dde-109f-44b2-89ef-2959ad8b4fe3/image-20230926112713126.png" alt="image-20230926112713126" style="zoom:50%;" />

## 脚本使用

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

### 组件

#### 添加组件

我们使用 [addComponent(Component)](${api}core/Entity#addComponent) 添加组件，例如给 `Entity`  添加“平行光”组件（[DirectLight](${api}core/DirectLight)）：

```typescript
const lightEntity = rootEntity.createChild("light");
const directLight = lightEntity.addComponent(DirectLight);
directLight.color = new Color(0.3, 0.3, 1);
directLight.intensity = 1;
```

#### 查找实体上的组件

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