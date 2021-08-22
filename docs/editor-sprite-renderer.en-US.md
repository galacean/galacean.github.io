---
order: 8
title: SpriteRenderer Component
type: Editor
---

The sprite renderer component is used to display images in a 3D/2D scene, see [Sprite component](${docs}sprite-renderer-cn) for details.

## Add SpriteRenderer component

When you need to display an image, a sprite renderer component should be added to an entity first, as follows:

![sprite-renderer-create](https://gw.alipayobjects.com/zos/OasisHub/93905eee-26ff-4479-b620-aa524729c213/tttttt.gif)

## Set Sprite resources

![sprite-renderer-add](https://gw.alipayobjects.com/zos/OasisHub/d832a9f7-ccd5-423d-972b-450ff97b6c79/sprite-renderer-add.gif)

## Flip image

In addition to basic image display, `SpriteRenderer` also supports image flipping. You only need to set the property `flipX/flipY` to complete the flip, as follows:

![sprite-renderer-flip](https://gw.alipayobjects.com/zos/OasisHub/748b5ac1-802e-4cae-aa8b-3d6b867f8560/sprite-renderer-flip.gif)

## Set color

You can adjust the color by setting the `color` property to achieve some fade-in and fade-out effects, as follows:

![sprite-renderer-color](https://gw.alipayobjects.com/zos/OasisHub/c99c7559-297f-414a-8053-0b94b3149398/sprite-renderer-color.gif)

## Use mask

Starting from version 0.4, the engine has added the [SpriteMask](${docs}sprite-mask-cn) component, `SpriteRenderer` and `SpriteMask` can be used together to achieve various occlusion effects of sprites. For the use of the `SpriteMask` component in the editor, see [How to use SpriteMask in the editor](${docs}editor-sprite-mask-cn).

To use a mask, two fields need to be set, as follows:

![sprite-renderer-mask-prop](https://gw.alipayobjects.com/zos/OasisHub/d5a96b03-db3c-4d16-82ef-d62b3cef0073/image-20210721114208887.png)

mask interaction：Mask type    
mask layer：The mask layer the sprite belongs to

In the editor, you can see the specific effects by setting the above two fields, as follows:

![sprite-renderer-mask](https://gw.alipayobjects.com/zos/OasisHub/a4e98994-b279-4802-8925-9ac8dd29bd3d/sprite-renderer-mask.gif)

