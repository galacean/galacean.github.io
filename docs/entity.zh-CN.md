---
order: 4
title: 实体与组件
type: 核心
---

在 Oasis 引擎中，[Entity](${api}core/Entity) 不具备渲染模型等实际的功能，这些功能是通过加载 [Component](${api}core/Component) 组件类来实现的。例如，如果想让一个 *Entity* 变成一个相机，只需要在该 *Entity* 上添加相机组件 [Camera](${api}core/Camera)。这种基于组件的功能扩展方式注重将程序按照功能独立封装，在使用的时候按照需要组合添加，非常有利于降低程序耦合度并提升代码复用率。


我们使用 [addComponent(Component)](${api}core/Entity#addComponent) 添加组件，例如给 `Entity` 添加“平行光”组件（[DirectLight](${api}core/DirectLight)）：


```typescript
let lightEntity = rootEntity.createChild('light');

let directLight = lightEntity.addComponent(DirectLight);
directLight.color =  new Color(0.3, 0.3, 1);
directLight.intensity =  1;
```


### 常用组件
| 名称 |  描述 |
| :--- | :--- |
| [Camera](${api}core/Camera) | 相机 |
| [MeshRenderer](${api}core/MeshRenderer) |  静态模型渲染器 |
| [SkinnedMeshRenderer](${api}core/SkinnedMeshRenderer) | 骨骼模型渲染器 |
| [Animator](${api}core/animation/Animator) | 动画控制组件 |
| [DirectLight](${api}core/DirectLight) | 方向光 |
| [PointLight](${api}core/PointLight) | 点光源 |
| [SpotLight](${api}core/SpotLight) | 聚光灯 |
| [ParticleRenderer](${api}core/ParticleRenderer) | 粒子系统 |
| [BoxCollider](${api}core/BoxCollider) | 盒碰撞体 |
| [SphereCollider](${api}core/SphereCollider) | 球碰撞体 |
| [PlaneCollider](${api}core/PlaneCollider) | 平面碰撞体 |



### 访问实体和组件

[脚本](${docs}script-cn)能够响应玩家输入，能够修改、创建和销毁实体或组件，实现各种各样的游戏逻辑。要实现这些效果，你需要先在脚本中获得你要修改的实体或组件。这里我们将简单的介绍常用的实体操作:

#### 获得组件所在的实体
我们可以在脚本的任意生命周期内获得它所绑定的实体如：
```typescript
onAwake() {
	const entity = this.entity;
}
```
#### 获得其它组件

当我们需要获取同一实体上的其他组件，这时就要用到 [getComponent](${api}core/Entity#getComponent) 这个API, 它会帮你查找你要的组件。

```typescript
onAwake() {
	const component = this.entity.getComponent(Animation);
}
```

有些时候可能会有多个同一类型的组件，上面的方法只会返回第一个找到的组件，如果需要找到所有组件可以用 [getComponents](${api}core/Entity#getComponents)。

```typescript
onAwake() {
 	const components = []
	this.entity.getComponents(Animation, components);
}
```

#### 查找子实体
有时候，场景中会有很多个相同类型的对象，像多个粒子动画，多个金币，它们通常都有一个全局的脚本来统一管理。如果用一个一个将它们关联到这个脚本上，那工作就会很繁琐。为了更好地统一管理这些对象，我们可以把它们放到一个统一的父物体下，然后通过父物体来获得所有的子物体：

```typescript
onAwake() {
	const childrenEntity = this.entity.children;
}
```

如果明确知道子实体在父实体中的 *index* 可以直接使用 [getChild](${api}core/Entity#getChild)：          

```typescript
onAwake() {
	this.entity.getChild(0);
}
```

如果不清楚子实体的index，可以使用 [findByName](${api}core/Entity#findByName) 通过实体的名字找到它, `findByName` 不仅会查找子实体，还会查找孙子实体

```typescript
onAwake() {
	this.entity.findByName('model');
}
```

如果有同名的实体可以使用 [findByPath](${api}core/Entity#findByPath) 传入路径进行逐级查找，使用此API也会一定程度上提高查找效率。

```typescript
onAwake() {
	this.entity.findByPath('parent/child/grandson');
}
```

#### 全局实体查找

用户也可以通过 [Entity.findByName](${api}core/Entity#findByName) 和 [Entity.findByPath](${api}core/Entity#findByPath) 进行全局的实体查找，使用方法和之前的查找子实体类似:

```typescript
onAwake() {
	Entity.findByName('model');
}
```
```typescript
onAwake() {
	Entity.findByPath('container/model');
}
```


