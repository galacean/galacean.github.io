---
order: 8
title: SpriteMask Component
type: Editor
---

The sprite mask component is used to mask the [sprite](${docs}editor-sprite-renderer-cn) in the 3D/2D scene. For details, please refer to the [sprite mask component](${docs}sprite-mask- cn).

## Add sprite mask component

When we need to mask a sprite, an new entity with the sprite mask component can be created as follows:

![mask-create](https://gw.alipayobjects.com/zos/OasisHub/cb173a1d-addd-4ad0-bf23-83a7817200cd/mask-create.gif)

## Set mask area

The sprite mask component uses a picture to represent the mask area. Here we set the sprite resource through the component's `sprite` parameter, as follows:

![mask-sprite](https://gw.alipayobjects.com/zos/OasisHub/cec92229-02a6-404c-a6fb-f95088bd40aa/mask-sprite.gif)

## Set the mask interaction of the sprite

Through the above two steps, you will find that the mask still has no effect. This is because the mask interaction of the current sprite is still the default (None). We set the `mask interaction` of the sprite in the scene as the inner mask type, and the effect is as follows :

![mask-interaction](https://gw.alipayobjects.com/zos/OasisHub/1d774f89-164f-46c8-9996-9cda918d074e/image-20210722105530953.png)

## Set alpha cutoff

This parameter represents the lower limit of the effective alpha value of the current mask (range: `0~1`), that is, the sprite texture whose alpha value is less than the alpha cutoff will be discarded (that is, it will not be used as a mask area). We can see the actual effect by dynamically adjusting the value of this attribute, as follows:

![mask-alpha](https://gw.alipayobjects.com/zos/OasisHub/43c857ba-bdc2-4e74-af6a-9bd5fd2fbec3/mask-alpha.gif)

