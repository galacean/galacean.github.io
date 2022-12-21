---
order: 3.4
title: Animation
type: Editor
group: Component
label: Editor/Component
---

With the animator editor, you can easily add transitions and blends to your animations

## Basic use

1. Upload the model to the editor, and the editor will automatically load it's AnimationClip into the assets panel

   ![4](https://gw.alipayobjects.com/zos/OasisHub/2ee85519-4f48-4e65-8dcc-b6afe9d1f7d9/4.jpg)

2. When we drag the model into the scene, the model is displayed in its initial pose, but no animation is played. We need to add an Animator component to the model entity to control the animation playing.

   ![image-20210902230821166](https://gw.alipayobjects.com/zos/OasisHub/405ebaa7-8c03-4fd0-816e-cbcb39562b68/1667457441830-207e0940-4a82-4bc2-8d9c-d12d44c3eb31.png)

3. The Animator component needs to import an AnimatorController asset, which we create and import
   ![image](https://gw.alipayobjects.com/zos/OasisHub/35f5788a-7544-4231-b11e-373fcce31267/1667457702054-45c9d61a-1e9b-49b5-a719-36724471aaa2.png)
   ![image](https://gw.alipayobjects.com/zos/OasisHub/68de5813-be5f-4669-91bc-d8d3f4077c5a/1667457755170-565aaa77-ec4b-462a-9a38-dc7ad66e9c19.png)

4. The AnimatorController we just created does not have any data in it. We need to edit it, double-click the asset, and add an AnimatorState to it

   ![3](https://gw.alipayobjects.com/zos/OasisHub/4f4139aa-eaaf-4b9d-b077-1570e783843d/3.jpg)

5. Click the AnimatorState to bind an AnimationClip to it
   ![image](https://gw.alipayobjects.com/zos/OasisHub/8e29b9fa-eeed-4e5c-84c1-ea68f9732a92/1667457999371-e0ed9c57-d44c-4f2a-abda-12eba6e3a934.png)

6. Now you can play the `running` animation in the exported project through `animator.play("New State")`. If you don't add an Animator component to the entity, the oasis engine will create one for you by default and all animations of the model will be added to the AnimatorController by default. You can just call `animator.play("running")` directly. The above is to help you understand more clearly about how the Animator component works, but there is much more you can do through the AnimatorController editor.

### Parameter Description

| Attribute | Description |
| :-------- | :-----------|
| animatorController | Bind the `AnimatorController` asset |

## Default Play

Connecting an animator state to the `entry`  will automatically play the animation on your exported project when it runs, without calling animator.play. You will also see the editor's model begin to play animation.
![2](https://gw.alipayobjects.com/zos/OasisHub/de60a906-0d3c-4578-8d50-aa2ce050e560/2.jpg)

## CrossFade

The animation cross fade can be realized by connecting two `AnimatorState` that you want to transition. Click the line between the two `AnimatorState` to modify the parameter adjustment effect of animation cross fade

![animationcrossfade](https://gw.alipayobjects.com/zos/OasisHub/cd8fa035-0c1c-493e-a0c7-54d301f96156/1667458692286-29d9f543-9b98-4911-8fa7-ac38b61b1668.gif)

### Parameter Description

| Attribute | Description |
| :-------- | :-----------|
| duration  | Transition's duration, which is the normalized time relative to the target state. The default value is 1.0.                        |
| offset    | The offset time forward of the target state. The time is the normalized time relative to the target state. The default value is 0 |
| exitTime  | The time the transition can take effect, which is the normalized time relative to the start state. The default value is 0.3      |

## Animation Blending

Double-click on the `AnimatorController` asset to edit the animation, add a layer, and connect the AnimatorState you want to blend to the `entry`

![animationadditive](https://gw.alipayobjects.com/zos/OasisHub/7548a66b-a72f-4cad-9b27-c9f1a2824aff/1667459461151-4568a32a-07db-427b-922e-3bc6f844097b.gif)

Sometimes you want to get a fixed pose and need to trim the animation clip given by the designer. You can modify the `StartTime` and `EndTime` of `AnimatorState` as the upward image and click `AnimatorState` to edit it

![1](https://gw.alipayobjects.com/zos/OasisHub/cc0db4c9-95f9-48d7-a3ac-48d69e94a31d/1.jpg)

### Parameter Description

| Attribute | Description |
| :-------- | :-----------|
| Name          | Change the name of `AnimatorState`, the name must be ** unique ** in the layer. |
| AnimationClip | Binds an `AnimationClip` asset, which stores the animation data for the model. |
| WrapMode      | Whether the animation state plays in a loop or just once, with the default being `Once` (i.e. play once).  |
| Speed         | The playback speed of the `AnimatorState`, with the default value being 1.0. A higher value means the animation plays faster. |
| StartTime     | The time in the `AnimationClip` at which `AnimatorState` begins to play, in normalized time relative to the duration of the `AnimationClip`. The default value is 0, which means the animation starts from the beginning. For example, a value of 1.0 means the `AnimatorState` will start at the last frame of the `AnimationClip`.|
| EndTime       | The time in the `AnimationClip` at which `AnimatorState` ends playback, in normalized time relative to the duration of the `AnimationClip`. The default value is 1.0, which means the animation plays until the end.  |


You can also adjust the weight of a layer in the blend by modifying its weight parameter, and change the blending mode by modifying the blending.

![animationadditive2](https://gw.alipayobjects.com/zos/OasisHub/acd80bdf-7c8d-41ac-8a2f-fe75cc6d2da4/1667459778293-be31b02b-7f6c-4c27-becc-2c0c8e80b538.gif)

### Parameter Description

| Attribute | Description |
| :-------- | :-----------|
| Name      | The name of the layer. |
| Weight    | The blending weight of the layer, with a default value of 1.0. |
| Blending  | The blending mode of the layer, with `Additive` as the additive mode and `Override` as the override mode, and a default value of `Override`.

Oasis supports multi-layer blending, so you can add more layers to achieve the effect you want.

![animationadditive3](https://gw.alipayobjects.com/zos/OasisHub/4485bf06-b783-4ff6-9dfd-cb05cc5adf84/1667459905978-f86e9051-7b62-44ad-aa43-87da0248a8f1.gif)
