---
order: 8
title: Sprite Resource
type: Editor
---

[Sprite](${api}core/Sprite) is a 2D graphic object used for characters, props, bullets and some other 2D game elements. These graphics are obtained from [Texture2D](${docs}texture-cn). The [Sprite](${api}core/Sprite) class mainly identifies the part of the image applied to a specific `Sprite`. Then the [SpriteRenderer](${docs}sprite-renderer-cn) component on [Entity](${docs}entity-cn) can use this information to actually display graphics, [Entity](${docs}entity-cn ) On the [SpriteMask](${docs}sprite-mask-cn) component can use this information to represent the mask area. See [Spirite Resources](${docs}sprite-cn) for details.

## Usage

### Create sprite resources

Create a default sprite resource in the editor as follows:

![sprite-create](https://gw.alipayobjects.com/zos/OasisHub/f6f58e3d-d9a9-43e1-9683-7e8eccb401e8/sprite-create.gif)

### Set texture

After creating the default sprite, we need to set a texture for the sprite resource to represent the display content, as follows:

![sprite-tex](https://gw.alipayobjects.com/zos/OasisHub/978267ca-a69f-4fff-aaee-c9454dee92c8/sprite-tex.gif)

### Set pivot

For pivot, the lower left corner of the texture is `(0, 0)`, the X axis goes from left to right, and the Y axis goes from bottom to top. In the editor, some commonly used pivot shortcuts are built in, as follows:

![sprite-pivot](https://gw.alipayobjects.com/zos/OasisHub/39fb7688-a2f6-41ed-978b-250a4466e85f/image-20210720202052097.png)

If the built-in pivot cannot meet your needs, you can customize your own pivot as follows:

![sprite-pivot](https://gw.alipayobjects.com/zos/OasisHub/7876d914-1873-4e19-87f8-5aa1c88dad2c/sprite-pivot.gif)

### Set region

You can control the area where the image is displayed by setting the region, as follows:

![sprite-region](https://gw.alipayobjects.com/zos/OasisHub/d3c8242f-681c-4bbb-b446-7aa7276f3190/image-20210720202831351.png)

## Set pixelsPerUnit

To set the number of pixels of the current sprite corresponding to a unit in the world space, we set the editor to 2D mode, which can be set through the following properties:

![image-20210804111802890](https://gw.alipayobjects.com/zos/OasisHub/19305365-9a36-4bd3-a193-2a5a82db4c84/image-20210804111802890.png)

Set the pixelsPerUnit of the 1024*1024 size sprite to 128, the effect is as follows:

![image-20210804111234363](https://gw.alipayobjects.com/zos/OasisHub/5a032f53-fa1a-446a-bcb7-f585603fc047/image-20210804111234363.png)

In the above figure, a square represents a unit in world space. We try to set `pixelsPerUnit` to 256, the effect is as follows:

![image-20210804111254309](https://gw.alipayobjects.com/zos/OasisHub/e54b65f6-04d7-41ab-98c4-dd3a94a8b93d/image-20210804111254309.png)
