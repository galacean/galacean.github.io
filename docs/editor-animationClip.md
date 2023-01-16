---
order: 3.5
title: AnimationClip Editor
type: Editor
group: Component
label: Editor/Component
---

Each action in the animated model output by the designer will be parsed into an `AnimationClip` asset in our editor, and we can also create additional animations through the `AnimationClip` editor`.

## Basic usage

1. In the Assets panel Right Click/Click `+` Create an `AnimationClip` asset
   ![1](https://gw.alipayobjects.com/zos/OasisHub/52c428f1-6b5f-4486-93f9-f27ef468a9be/image-20230116150410999.png)

2. Double-click the `AnimationClip` asset, and select an entity as the editing object of the `AnimationClip`
   ![image-20230116150755284](https://gw.alipayobjects.com/zos/OasisHub/016a62dc-991f-4c67-9d00-0c3b09f438dc/image-20230116150755284.png)
   ![image-20230116151013992](https://gw.alipayobjects.com/zos/OasisHub/31d2f185-fb98-42c5-af98-46c0fe6a4feb/image-20230116151013992.png)

3. Add the properties to be animated (here I added two)
   ![image-20230116151140988](https://gw.alipayobjects.com/zos/OasisHub/443943a5-a586-42ae-badd-5117a33a0628/image-20230116151140988.png)
   ![image-20230116151307372](https://gw.alipayobjects.com/zos/OasisHub/59154743-fd64-4905-85c7-35cb315b625d/image-20230116151307372.png)
   ![image-20230116151429682](https://gw.alipayobjects.com/zos/OasisHub/6fee9c22-6e7e-4ab0-9457-d4f374f6c33e/image-20230116151429682.png)

4. Add keyframes to properties
   ![image-20230116151707943](https://gw.alipayobjects.com/zos/OasisHub/908d4ddb-ad3f-45e1-9164-4a55b520f205/image-20230116151707943.png)
   When we click the Add Keyframe button, the keyframe will store the value of the currently specified property, so when we haven't changed anything, the keyframe will store the `position` value of this entity at this moment. We want it to move to the position (3, 0, 0) after 60 frames, so first modify the cube to (3, 0, 0) through the property panel and then add the keyframe
   ![clip](https://gw.alipayobjects.com/zos/OasisHub/3379fb37-f3ed-44d7-8116-48667a2982ff/clip.gif)
   In the same way we also add keyframes for the `rotation` property
   ![clip2](https://gw.alipayobjects.com/zos/OasisHub/f0a0a28d-561e-4efb-b461-f0ae5f92efb9/clip2.gif)
   You can see that when the value of the property changes, `AnimationClipEditor` will automatically add keyframes for you, allowing you to edit more conveniently and quickly.

5. Preview `AnimationClip`
   You can directly move the timeline (you can drag the timeline, click on the blank position, and modify the value in the `current` input box) to observe its performance at a specified moment, for example, I moved the timeline to frame 30
   ![timeline](https://gw.alipayobjects.com/zos/OasisHub/d736229d-beeb-4657-be4b-85825c3de939/timeline.gif)
   You can also directly play the `AnimationClip` by click the play button
   ![timeline2](https://gw.alipayobjects.com/zos/OasisHub/138f524e-27f1-4db4-a7a4-90664a516e5f/timeline2.gif)
   The edited `AnimationClip` asset can be applied to any entity, and the effect can be previewed by switching the entity
   ![timeline3](https://gw.alipayobjects.com/zos/OasisHub/766a8566-c6ec-430a-b703-3895f85e7d94/timeline3.gif)

6. Apply `AnimationClip`
   The last step is just to allow us to preview the effect of `AnimationClip`. If we really want to use it in the project, we still need to use the `Animator` component and bind the `AnimatorController` asset. For details, see [Animator] (${docs}editor-animator). Here we add an `Animator` component to the cube

   ![image-20230116154953016](https://gw.alipayobjects.com/zos/OasisHub/cbf42a11-cfa7-4647-9a11-96dfd5e29a83/image-20230116154953016.png)
   Create an `AnimatorController` asset
   ![image-20230116155037824](https://gw.alipayobjects.com/zos/OasisHub/85c19674-6963-4fc2-8802-b2b7a4d3909b/image-20230116155037824.png)
   Double-click the `AnimatorController` asset, click the Add `AnimatorState` button
   ![image-20230116155128336](https://gw.alipayobjects.com/zos/OasisHub/bd96ad2e-e2ca-42e3-b1df-e0529c1b920e/image-20230116155128336.png)
   Click `AnimatorState` to select the `AnimationClip` we just created
   ![image-20230116155210777](https://gw.alipayobjects.com/zos/OasisHub/7cd13e14-ff1e-4027-8e0a-69b283bd6116/image-20230116155210777.png)
   Connect the `entry` node to the `New State` node you just created
   ![animatorController](https://gw.alipayobjects.com/zos/OasisHub/c513fb18-9a2a-4029-a43c-513ebc2d1973/animatorControl3ller.gif)
   Let the `Animator` component bind the `AnimatorController` asset just now
   ![animator](https://gw.alipayobjects.com/zos/OasisHub/a87bf618-93e9-4130-8f80-fd0a7ba24fa6/animator.gif)
   We can see that the `AnimationClip` we created has been applied to the cube through the `Animator` component.

## Edit other components

In the content demonstrated above, you found that only the `Transform` component is used when adding properties. The `AnimationClipEditor` currently supports the editing of all interpolable properties except physics-related components. If you need to edit other properties, you need to add the corresponding component to the entity. For example, I replace the cube with a text and animate it's font size
![image-20230116170015405](https://gw.alipayobjects.com/zos/OasisHub/10dfd915-f68d-4982-825f-ad191f58e22a/image-20230116170015405.png)
At this time, when we add properties, we can see that the properties that can add keyframes have added interpolable properties related to the `TextRenderer` component
![image-20230116170144892](https://gw.alipayobjects.com/zos/OasisHub/1061be4b-5d88-4ae8-af0f-3856affcc51a/image-20230116170144892.png)
We add fontSize and add keyframes as above
![image-20230116170144892](https://gw.alipayobjects.com/zos/OasisHub/d53ed8f7-3126-4001-a26b-8e037fe2b6d5/animatorText.gif)

## Manipulate keyframes

##### Modify keyframe time

Select a keyframe and drag
![animatorText2](https://gw.alipayobjects.com/zos/OasisHub/5fd37304-5b24-4219-b45a-7e29174484e3/animatorText2.gif)

##### Modify the value of the keyframe

Move the timeline to the specified keyframe, and then re-enter the value
![animatorText3](https://gw.alipayobjects.com/zos/OasisHub/d2fc1577-9765-44a1-99e0-88173f65c8c1/animatorText3.gif)

##### delete keyframe

Select the keyframe and press `backspace`
![animatorText4](https://gw.alipayobjects.com/zos/OasisHub/0e0abc32-beba-460f-9e25-286698816341/animatorText4.gif)

## Edit sub-entity

`AnimationClip` can act not only on the entity to which the `Animator` component is added, but also on its child entities.

1. We add a child entity to the text just now
   ![image-20230116173105694](https://gw.alipayobjects.com/zos/OasisHub/a59d5687-5f74-4fab-a457-42e3d07b38da/image-20230116173105694.png)
2. We click Add Properties again to see that the properties of the sub-entity can be added
   ![image-20230116180314221](https://gw.alipayobjects.com/zos/OasisHub/bd59b6df-a0f8-48d3-bd5d-23eeccba4816/image-20230116180314221.png)
3. After selecting the sub-entity, add keyframes
   ![child](https://gw.alipayobjects.com/zos/OasisHub/3e03fc0a-a346-4897-8607-3a36ccb11e22/child.gif)

## Edit animation curve

`AnimationClipEditor` supports animation curve editing, click `Curves` in the lower right corner to switch
![image-20230116183809640](https://gw.alipayobjects.com/zos/OasisHub/529e7716-d5c6-4857-9a81-966e0f371b6b/image-20230116183809640.png)
The color of the properties corresponding to the curve is the same as the color of the button
![image-20230116183933986](https://gw.alipayobjects.com/zos/OasisHub/1c96f6a9-d72c-4b1a-b1db-92e2ebf59ab0/image-20230116183933986.png)
Select a keyframe and two control points will appear, adjust the control points to adjust the curve
![curve](https://gw.alipayobjects.com/zos/OasisHub/f439881a-39a4-463d-a7fc-1551f88bcd7c/curve.gif)

## Adjust the sampling rate

The previous curve adjustment preview may not seem obvious, we can slow down the animation speed by lowering the sample rate
![image-20230116185226034](https://gw.alipayobjects.com/zos/OasisHub/c1526af2-337a-4abf-bfde-4c66b6114002/image-20230116185226034.png)
![curve2](https://gw.alipayobjects.com/zos/OasisHub/2ff245ef-2f7f-4e53-a5aa-e06ead091abf/curve2.gif)
