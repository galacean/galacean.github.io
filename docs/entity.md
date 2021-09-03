---
order: 4
title: Entities and components
type: Core
---

In the Oasis engine, [Entity](${api}core/Entity) does not have actual functions such as rendering models. These functions are implemented by loading the [Component](${api}core/Component) component class. For example, if you want an `Entity` to become a camera, you only need to add the [Camera](${api}core/Camera) component  to the`Entity`. This component-based function extension method focuses on encapsulating the program independently according to the function, and combining and adding as needed when using it, which is very helpful to reduce the degree of program coupling and improve the code reuse rate.

We use [addComponent(Component)](${api}core/Entity#addComponent) to add components, such as adding a "direct light" component to `Entity` ([DirectLight](${api}core/DirectLight)):

```typescript
let lightEntity = rootEntity.createChild('light');

let directLight = lightEntity.addComponent(DirectLight);
directLight.color =  new Color(0.3, 0.3, 1);
directLight.intensity =  1;
```


### Common components
| Name | Description |
| :--- | :--- |
| [Camera](${api}core/Camera) | Camera |
| [MeshRenderer](${api}core/MeshRenderer) | Static model renderer |
| [SkinnedMeshRenderer](${api}core/SkinnedMeshRenderer) | Skeleton Model Renderer |
| [Animator](${api}core/Animator) | Animator |
| [DirectLight](${api}core/DirectLight) | Directional Light |
| [PointLight](${api}core/PointLight) | Point Light |
| [SpotLight](${api}core/SpotLight) | Spotlight |
| [ParticleRenderer](${api}core/ParticleRenderer) | Particle System |
| [BoxCollider](${api}core/BoxCollider) | Box Collider |
| [SphereCollider](${api}core/SphereCollider) | Sphere Collider |
| [PlaneCollider](${api}core/PlaneCollider) | Plane Collider |


### Access entities and components

[Script](${docs}script) can respond to user input, modify, create and destroy entities or components, and implement a variety of game logic. To achieve these effects, you need to get the entity or component you want to modify in the script. Here we will briefly introduce the commonly used entity operations:

#### Get the entity which the component bind to
We can get the entities the script bind to  during any life cycle of the script, such as:
```typescript
onAwake() {
  const entity = this.entity;
}
```
#### Get other components
When we need to get other components on the same entity, we need to use the [getComponent](${api}core/Entity#getComponent) API, which will help you find the component you want.

```typescript
onAwake() {
  const component = this.entity.getComponent(Animation);
}
```

Sometimes there may be multiple components of the same type. The above method will only return the first found component. If you need to find all components, you can use [getComponents](${api}core/Entity#getComponents).

```typescript
onAwake() {
  const components = []
  this.entity.getComponents(Animation, components);
}
```

#### Find child entities
Sometimes, there are many objects of the same type in the scene, such as multiple particle animations, multiple gold coins, and they usually have a global script to manage them uniformly. If you associate them to this script one by one, the work will be tedious. In order to better manage these objects in a unified manner, we can put them under a parent entity, and then obtain all the child entity through the parent entity:

```typescript
onAwake() {
  const childrenEntity = this.entity.children;
}
```

If you know the *index* of the child entity in the parent entity, you can directly use [getChild](${api}core/Entity#getChild):

```typescript
onAwake() {
  this.entity.getChild(0);
}
```

If you don’t know the index of the child entity, you can use [findByName](${api}core/Entity#findByName) to find it by the name of the entity, `findByName` will not only find the child entity, but also the grandchildren.

```typescript
onAwake() {
  this.entity.findByName('model');
}
```

If there is an entity with the same name, you can use [findByPath](${api}core/Entity#findByPath) to find entity by path. Using this API will also improve the search efficiency.

```typescript
onAwake() {
  this.entity.findByPath('parent/child/grandson');
}
```

#### Global entity search

You can also use [Entity.findByName](${api}core/Entity#findByName) and [Entity.findByPath](${api}core/Entity#findByPath) for global entity search. The method of use is similar to the one mentioned above:

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


