---
order: 1
title: 常用实体操作
type: 编辑器
group: 脚本
label: 编辑器/脚本
---

[实体](${docs}entity-cn)是脚本的主要操作对象，以下展示一些常用操作：

## 变换

以旋转为例，在 [onUpdate](${api}core/Script#onUpdate) 中通过 [setRotation](${api}core/Transform#setRotation) 方法来旋转实体：

```typescript
this.entity.transform.setRotation(0, 5, 0);
```

## 访问实体和其他组件

你可以在编辑器场景检查器里修改节点和组件，也能在脚本中动态修改。脚本能够响应玩家输入，能够修改、创建和销毁节点或组件，实现各种各样的游戏逻辑。要实现这些效果，你需要先在脚本中获得你要修改的节点或组件。这里我们简单地介绍如何在脚本内:

### 获得组件所在的实体

我们可以在脚本的任意生命周期内获得它所绑定的实体，如：

```typescript
onAwake() {
	const entity = this.entity;
}
```

### 获得其它组件

当我们需要获取同一节点上的其他组件，这时就要用到 [getComponent](${api}core/Entity#getComponent) 这个API, 它会帮你查找你要的组件。

```typescript
onAwake() {
	const component = this.entity.getComponent(o3.Model);
}
```

有些时候可能会有多个同一类型的组件，上面的方法只会返回第一个找到的组件，如果需要找到所有组件可以用 [getComponents](${api}core/Entity#getComponents) ：

```typescript
onAwake() {
 	const components = []
	this.entity.getComponents(o3.Model, components);
}
```

### 查找子节点

有时候，场景中会有很多个相同类型的对象，像多个粒子动画，多个金币，它们通常都有一个全局的脚本来统一管理。如果用一个一个将它们关联到这个脚本上，那工作就会很繁琐。为了更好地统一管理这些对象，我们可以把它们放到一个统一的父物体下，然后通过父物体来获得所有的子物体：

如果明确知道子节点在父节点中的index可以直接使用 [getChild](${api}core/Entity#getChild) ：          

```typescript
onAwake() {
	this.entity.getChild(0);
}
```

如果不清楚子节点的index，可以使用 [findByName](${api}core/Entity#findByName) 通过节点的名字找到它, [findByName](${api}core/Entity#findByName) 不仅会查找子节点，还会查找孙子节点

```typescript
onAwake() {
	this.entity.findByName('model');
}
```

如果有同名的节点可以使用 [findByPath](${api}core/Entity#findByPath) 传入路径进行逐级查找，使用此API也会一定程度上提高查找效率。

```typescript
onAwake() {
	this.entity.findByPath('parent/child/grandson');
}
```
### 全局节点查找

用户也可以通过 [Entity.findByName](${api}core/Entity#findByName) 和 [Entity.findByPath](${api}core/Entity#findByPath) 进行全局的节点查找，使用方法和之前的查找子节点类似:

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