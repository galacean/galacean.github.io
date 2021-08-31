---
 order: 12 
 title: Collision Detection 
 type: Component
 ---

 Collision detection is used to reflect the intersection between two objects in 3D space. The **Collision** module
 provides commonly used collision detection functions.

 ## Collision detection component

 [CollisionDetection](${api}core/CollisionDetection) is used to detect the current collider
 on [Entity](${api}core/Entity) with other colliders in the scene. The collision detection between the following
 colliders is currently supported:

 | Name | Details |
 | :--- | :--- |
 | [BoxCollider](${api}core/BoxCollider) | Collider with box shape |
 | [SphereCollider](${api}core/SphereCollider) | Collider with sphere shape |
 | [PlaneCollider](${api}core/PlaneCollider) | Collider with plane shape |

 Please refer to [Ray Casting](${docs}ray-cn) for the method of adding collision bodies to object.

 ## Usage of collision detection

 To use collision detection, you first need to add *Collider* to the *Entity* in the scene; then
 add [CollisionDetection](${api}core/CollisionDetection) to the *Entity* that needs collision detection Components. This
 component will automatically trigger three functions in the script component:

 1. onTriggerEnter：Called when a collision is triggered
 2. onTriggerStay：*Loop* call during collision
 3. onTriggerExit：Called when the collision ends

 For example：

 ```typescript
 // Load collider and raycast modules
 import {SphereCollider, BoxCollider, CollisionDetection, Vector3} from 'oasis-engine';
 // create sphere test entity
 let sphereEntity = rootEntity.createChild('SphereEntity');
 sphereEntity.transform.setPosition(-2, 0, 0);
 let radius = 1.25;
 let sphereCollider = sphereEntity.addComponent(SphereCollider);
 sphereCollider.setSphere(new Vector3(), radius);
 // create box test entity
 let boxEntity = rootEntity.createChild('BoxEntity');
 let boxCollider = boxEntity.addComponent(BoxCollider);
 let cubeSize = 2.0;
 boxCollider.setBoxCenterSize(new Vector3(), new Vector3(cubeSize, cubeSize, cubeSize));
 // add CollisionDetection
 let cd = sphereEntity.addComponent(CollisionDetection);
 class CollisionScript extends Script {
   onTriggerExit(other: ACollider) {
     console.log('collision' + other.entity.name);
   }
 }
 // add Script
 sphereEntity.addComponent(CollisionScript);
 ```
