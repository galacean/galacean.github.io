---
order: 6
title: Clone
type: Core
---

Entity cloning is a common function at runtime, and entity cloning will also clone its bound components. For example, in the initialization phase, a certain number of identical entities are dynamically created according to the configuration, and then placed in different positions in the scene according to logic rules. Here we will explain the details of the script clone in detail.

## Entity clone
It is very simple. You can directly call the entity's [clone()](${api}design/IClone#clone) method to complete the cloning of the entity and its attached components.
```typescript
const cloneEntity = entity.clone();
```

## Script clone
The essence of a script is also a component, so when we call the entity's [clone()](${api}design/IClone#clone) function, the engine will not only clone the engine's built-in components, but also clone the custom script. The cloning rules of the engine's built-in components have been officially customized, and we have also opened up the cloning capabilities and rule customization of scripts to developers. The default cloning method of the script field is shallow copy, for example, we modify the field value of the script and then clone, the cloned script will keep the modified value without adding any additional coding. The following is a clone case of a custom script:

```typescript
// define a custom script
class CustomScript extends Script{
  /** boolean type.*/
  a:boolean = false;
  
  /** number type.*/
  b:number = 1;
  
  /** class type.*/
  c:Vector3 = new Vector3(0,0,0);
}

// init entity and script.
const entity = engine.createEntity();
const script = entity.addComponent(CustomScript);
script.a = true;
script.b = 2;
script.c.setValue(1,1,1);

// clone logic.
const cloneEntity = entity.clone();
const cloneScript = cloneEntity.getComponent(CustomScript);
console.log(cloneScript.a);// output is true.
console.log(cloneScript.b);// output is 2.
console.log(cloneScript.c);// output is (1,1,1).
```
### Clone decorator
In addition to the default cloning method, the engine also provides a "cloning decorator" to customize the cloning method of script fields. The engine has four built-in clone decorations:

| Decorator name | Interpretation |
| :--- | :--- |
| [ignoreClone](${api}core/ignoreClone) | The field is ignored when cloning. |
| [assignmentClone](${api}core/assignmentClone) | (The default value is equivalent to not adding any cloning decorator) Assign values to the fields during cloning. If it is a basic type, the value will be copied, if it is a reference type, its reference address will be copied. |
| [shallowClone](${api}core/shallowClone) | Shallow cloning of fields when cloning. After cloning, it will maintain its own reference independence, and use the method of assignment to clone all its internal fields (if the internal field is a basic type, the value will be copied, if the internal field is a reference type, its reference address will be copied). |
| [deepClone](${api}core/deepClone) | Perform deep cloning of fields when cloning. After cloning, it will maintain its own reference independence, and all the deep fields within it will remain completely independent. |

We modified the above case slightly and added different "cloning decorators" to the four fields in `CustomScript`. Because `shallowClone` and `deepCone` are more complicated, we changed the fields `c` and `d` Added additional printouts for further explanation.
```typescript
// define a custom script
class CustomScript extends Script{
  /** boolean type.*/
  @ignoreClone
  a:boolean = false;
  
  /** number type.*/
  @assignmentClone
  b:number = 1;
  
  /** class type.*/
  @shallowClone
  c:Vector3[] = [new Vector3(0,0,0)];
  
  /** class type.*/
  @deepClone
  d:Vector3[] = [new Vector3(0,0,0)];
}

//init entity and script.
const entity = engine.createEntity();
const script = entity.addComponent(CustomScript);
script.a = true;
script.b = 2;
script.c[0].setValue(1,1,1);
script.d[0].setValue(1,1,1);

// clone logic.
const cloneEntity = entity.clone();
const cloneScript = cloneEntity.getComponent(CustomScript);
console.log(cloneScript.a);// output is false,ignoreClone will ignore the value.
console.log(cloneScript.b);// output is 2,assignmentClone is just assignment the origin value.
console.log(cloneScript.c[0]);// output is Vector3(1,1,1),shallowClone clone the array shell,but use the same element.
console.log(cloneScript.d[0]);// output is Vector3(1,1,1),deepClone clone the array shell and also clone the element.

cloneScript.c[0].setValue(2,2,2);// change the field c[0] value to (2,2,2).
cloneScript.d[0].setValue(2,2,2);// change the field d[0] value to (2,2,2).

console.log(script.c[0]);// output is (2,2,2). bacause shallowClone let c[0] use the same reference with cloneScript's c[0].
console.log(script.d[0]);// output is (1,1,1). bacause deepClone let d[0] use the different reference with cloneScript's d[0].
```
Note:

- `shallowClone` and `deepClone` are applicable to *Object*, *Array* and *Class* types.
- `shallowClone` will keep its own references independent after cloning, and clone all its internal fields by means of assignment (if the internal field is a basic type, the value will be copied, if the internal field is a reference type, its reference address will be copied).
- `deepClone` If *Class* is encountered in the deep cloning process, it will call the object's [cloneTo()](${api}design/IClone#cloneTo) to implement cloning, and the object needs to implement [IClone](${api}design /IClone) interface.
