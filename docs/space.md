---
order: 8
title: Coordinate Systems
type: Core
label: Core
---

The coordinate system plays a very important role in the rendering engine. It ensures the accuracy of rendering results and interactions. After reading this document, you can gain an in-depth understanding of most of the coordinate systems involved in `Galacean`. Note that different rendering engines The definitions of various spaces are different, and this article only discusses the space standards in `Galacean`.

## Preface

This article will horizontally compare various coordinate spaces according to `space definition`, `coordinate system type`, etc., where `coordinate system type` specifically refers to `left-handed coordinate system` and `right-handed coordinate system`, as shown in the following figure:

<img src="https://mdn.alipayobjects.com/huamei_jvf0dp/afts/img/A*YBAmSamxy_0AAAAAAAAAAAAADleLAQ/original" width="100%" height="100%">

The main difference between `left-handed coordinate system` and `right-handed coordinate system` is the direction of `forward`. No matter in the left-handed or right-handed coordinate system, imagine that your right hand coincides with `+X`, and the direction of the top of your head coincides with` +Y` coincides, and the direction facing the face at this time is `forward`. You can get the camera orientation difference between Galacean and Unity:

- Unity's local coordinate system and world coordinate system are `left-handed coordinate system`, and the `forward` direction corresponding to `left-handed coordinate system` is `+Z`, so the orientation of the camera (viewfinder direction) is `+Z` direction
- Galacean's local coordinates and the world coordinate system are `right-handed coordinate system`, and the `forward` direction corresponding to `right-handed coordinate system` is `-Z`, so the orientation of the camera (viewing direction) is `-Z` direction

## Local Space

The local space is relative, it takes the object's own position as the reference coordinate system, so it is usually expressed as: "a point in the local space of node A", the local space is the `right-handed coordinate system`, `Transform` The component will automatically calculate the position of each point in the world space according to the following formula.

<img src="https://mdn.alipayobjects.com/huamei_jvf0dp/afts/img/A*4ZLrSLEJPigAAAAAAAAAAAAADleLAQ/original" width="100%" height="100%">

## World Space

The world space is absolute, the root node is placed in the `world space`, and its child nodes will inherit its spatial relationship, which is the same as `local space`, `world space` is also a `right-handed coordinate system`, when two nodes are not in When they are in the same `local space`, they can be converted to the world space to compare the relative positional relationship.

## View Space

`Observation space` is the local space of the camera, taking the perspective camera as an example:

<img src="https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*isMHSpe21ZMAAAAAAAAAAAAAARQnAQ" width="100%" height="100%">

## Clip Space

After MVP transformation, the coordinates will be normalized to the interval from -1.0 to 1.0. As the name suggests, the part beyond the range will not be displayed on the screen. It is a `left-handed coordinate system` whose origin is at the center of the canvas.

<img src="https://mdn.alipayobjects.com/huamei_jvf0dp/afts/img/A*_4RIQIC2O-UAAAAAAAAAAAAADleLAQ/original" width="100%" height="100%">

## Screen Space

The definition of screen space is consistent with the front-end specification. It is a two-dimensional space coordinate system with the upper left corner of the canvas as the coordinate origin. The value range in the space is consistent with the size of the canvas. It is often used in interaction and screen space conversion.

<img src="https://mdn.alipayobjects.com/huamei_jvf0dp/afts/img/A*qG0eTrkP4MUAAAAAAAAAAAAADleLAQ/original" width="100%" height="100%">

## ViewPort Space

The definition of the viewport space is consistent with the front-end specification. By setting the viewport of the camera, the target area for rendering can be controlled.

<img src="https://mdn.alipayobjects.com/huamei_jvf0dp/afts/img/A*ZxwVQYgXLooAAAAAAAAAAAAADleLAQ/original" width="100%" height="100%">

## 2D

When rendering 2D elements such as sprites or masks, this patch is placed by default on the XoY plane in the local coordinate system:

![avatar](https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*_5fjTp0r2KEAAAAAAAAAAAAAARQnAQ)
