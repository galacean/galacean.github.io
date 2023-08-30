---
order: 3
title: Entities and components
type: Core
label: Core
---

In Galacean Engine, [Entity](${api}core/Entity) does not have actual functions such as rendering. These functions are implemented by loading [Component](${api}core/Component) component class. For example, if you want an `Entity` to become a camera, you only need to add the [Camera](${api}core/Camera) component to the `Entity`. This component-based extension method focuses on encapsulating the program independently according to the function, and could be combined and added freely, which is very helpful to reduce coupling and improve reuse.

We use [addComponent(Component)](${api}core/Entity#addComponent) to add components. Take adding a "direct light" component to `Entity` ([DirectLight](${api}core/DirectLight)) as an example:

```typescript
const lightEntity = rootEntity.createChild("light");
const directLight = lightEntity.addComponent(DirectLight);
directLight.color = new Color(0.3, 0.3, 1);
directLight.intensity = 1;
```

### Common components

| Name                                                  | Description             |
| :---------------------------------------------------- | :---------------------- |
| [Camera](${api}core/Camera)                           | Camera                  |
| [MeshRenderer](${api}core/MeshRenderer)               | Static model renderer   |
| [SkinnedMeshRenderer](${api}core/SkinnedMeshRenderer) | Skeleton Model Renderer |
| [Animator](${api}core/Animator)                       | Animator                |
| [DirectLight](${api}core/DirectLight)                 | Directional Light       |
| [PointLight](${api}core/PointLight)                   | Point Light             |
| [SpotLight](${api}core/SpotLight)                     | Spotlight               |
| [ParticleRenderer](${api}core/ParticleRenderer)       | Particle System         |
| [BoxCollider](${api}core/BoxCollider)                 | Box Collider            |
| [SphereCollider](${api}core/SphereCollider)           | Sphere Collider         |
| [PlaneCollider](${api}core/PlaneCollider)             | Plane Collider          |
| [Script](${api}core/Script)                           | Script                  |

### Entity

#### Create New Entity

We've already learned how to get the active scene in [Script](${docs}script). In a new scene, we usually add root entity first.

```typescript
const scene = engine.sceneManager.activeScene;
const rootEntity = scene.createRootEntity();
```

Add child entity to its partent is the most common way for creating new entity:

```typescript
const newEntity = rootEntity.createChild("firstEntity");
```

Of course we can create new entity directly. But entity created this way is isolated, it won't be showed in the scene before added to the hierarchy tree.

```typescript
const newEntity = new Entity(engine, "firstEntity");

rootEntity.addChild(newEntity);
```

#### Remove Entity

We could remove entity when no longer needed:

```typescript
rootEntity.removeChild(newEntity);
```

Notably, [removeChild](${api}core/Entity#removeChild) only frees the entity out of hirearchy tree so it won't be showed in the scene. To destroy this entity completely we still need:

```typescript
newEntity.destroy();
```

#### Get Child Entity

We could obtain all the child entities through its parent:

```typescript
const childrenEntity = newEntity.children;
```

With the knowledge of child entity's index in its parent, it could be directly get by [getChild](${api}core/Entity#getChild):

```typescript
newEntity.getChild(0);
```

If the index of the child entity is unknown, [findByName](${api}core/Entity#findByName) could be used to find it by name. `findByName` will both search its children entity and the grandchildren.

```typescript
newEntity.findByName("model");
```

If duplicate name, use [findByPath](${api}core/Entity#findByPath) to find the entity by path. This API will also improve the search efficiency.

```typescript
newEntity.findByPath("parent/child/grandson");
```

### Component

#### Get Component of an Entity

Use [getComponent](${api}core/Entity#getComponent) API to get components of an entity,

```typescript
const component = newEntity.getComponent(Animator);
```

There could be multiple components of the same type. The above method will only return the first component found. Use [getComponents](${api}core/Entity#getComponents) to find all the components of a certain entity.

```typescript
const components = [];
newEntity.getComponents(Animator, components);
```

Sometimes it's hard to locate the entity that component belongs to, e.g. entity generated from glTF. Use [getComponentsIncludeChildren](${api}core/Entity#getComponentsIncludeChildren).

```typescript
const components = [];
newEntity.getComponentsIncludeChildren(Animator, components);
```

#### Get Entity of a Component

Continue the example at the beginning. We could get the entity of this component directly.

```typescript
const entity = directLight.entity;
```

### Status

We could use [isActive](${api}core/Entity#isActive) to inactive the entity not in use. At the same time components of this entity will be disabled `component.enabled = false` automatically.

```typescript
newEntity.isActive = false;
```

We could active call [enabled](${api}core/Component#enabled) to control the component status.

```typescript
directLight.enabled = false;
```
