---
order: 5
title: Shadow
type: Graphics
group: Light

label: Graphics/Light
---

Shadows can effectively enhance the three-dimensionality and realism of rendered images. In real-time rendering, the
so-called ShadowMap technology is generally used to draw shadows. Simply, the light source is used as a virtual
camera to render the depth of the scene.
Then when rendering the picture from the scene camera, compare the relationship between the rendered object and the
depth information. If the depth of the object is deeper than that in the depth information, so it is occluded by other
objects, thereby rendering the shadow.

## Lighting and shadow

Based on this principle, it is better to understand the property settings related to shadows in the `Light` component:

| Parameters                                            | Application                         |
| :---------------------------------------------------- | :---------------------------------- |
| [shadowType](${api}core/Light#shadowType)             | How this light casts shadows        |
| [shadowBias](${api}core/Light#shadowBias)             | shadow bias                         |
| [shadowNormalBias](${api}core/Light#shadowNormalBias) | normal bias of shadow               |
| [shadowNearPlane](${api}core/Light#shadowNearPlane)   | Near plane when rendering depth map |
| [shadowStrength](${api}core/Light#shadowStrength)     | shadow strength                     |

A special note about shadow bias is required here:
![shadow-bias](https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*8q5MTbrlC7QAAAAAAAAAAAAAARQnAQ)
Because of the accuracy of depth, artifacts will be generated when sampling from the camera, so it is often necessary to
set the bias of the shadow to sample a relatively clean shadow like the right image.
But if the bias is too large, the shadow will deviate from the projection, as shown in the picture on the right, the
shadow and the heel are separated. Therefore, this parameter is the parameter that needs to be carefully adjusted when
using shadows.

In addition to the shadow configuration above in the `Light` component, there are some global shadow configurations in
`Scene`:

| Parameters                                                   | Application                                             |
| :----------------------------------------------------------- | :------------------------------------------------------ |
| [castShadows](${api}core/Scene#castShadows)                  | If cast shadows                                         |
| [shadowResolution](${api}core/Scene#shadowResolution)        | The resolution of the shadow maps                       |
| [shadowCascades](${api}core/Scene#shadowCascades)            | Number of cascades to use for directional light shadows |
| [shadowTwoCascadeSplits](${api}core/Scene#shadowTwoCascadeSplits) | The splits of two cascade distribution                  |
| [shadowFourCascadeSplits](${api}core/Scene#shadowFourCascadeSplits) | The splits of four cascade distribution                 |
| [shadowDistance](${api}core/Scene#shadowDistance)            | Max Shadow distance                                     |

The above parameters can be understood by debugging in the Playground example:  

<playground src="cascaded-shadow.ts"></playground>

Currently, the engine only supports opening shadows for single `DirectLight`. This is mainly because the rendering of shadows
doubles the DrawCall, which will seriously affect the rendering performance.
In general, DirectLight is used to simulate sunlight, so only one is supported. There are two things to note about
directional light shadows.

### Cascaded Stable Shadow

The first is cascading shadows. Since a directional light is just the direction of light, the position of the light
source doesn't make much sense. So it's hard to figure out how to set the frustum used to draw the depth map from the
light source.
And if the depth map is only rendered once in the whole scene, then the distant objects are small, which will seriously
waste the depth map, resulting in a lot of blank space. So the engine uses Cascaded Stable ShadowsMap (CSSM):

![shadow-cascade](https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*R_ESQpQuP3wAAAAAAAAAAAAAARQnAQ)

This technique divides the camera's view frustum into two or four blocks, and then renders the scene twice or four times
along the direction of the light, and determines the size of each block through the division parameters, thereby
improving the depth map as much as possible. utilization.
The engine uses four-level cascaded shadows by default when shadows are turned on, so you can control the size of each
level by adjusting shadowFourCascadeSplits.

### Shadow selection

It is mentioned above that shadows are only supported for single `DirectLight`, but what happens if shadows are enabled for
two DirectLights in the scene? In the absence of a sun light,
The engine will by default choose the light with the strongest light intensity to cast shadows. The light intensity is
determined by the Intensity of the light and the brightness of the light color. The light color is converted into a
brightness value using the `Hue-Saturation-Brightness` formula.

## Shadow casters and receivers

Configuring enableShadow in lighting can only control whether the depth map is rendered, and you also need the
corresponding options in the Renderer to control whether the object casts shadows, or whether it accepts shadows from
other objects.

| Parameters                                           | Application                          |
| :--------------------------------------------------- | :----------------------------------- |
| [receiveShadows](${api}core/Renderer#receiveShadows) | Whether the object accepts shadows   |
| [castShadows](${api}core/Renderer#castShadows)       | Whether the object will cast shadows |

Open the Renderer of receiveShadows, if it is occluded by other objects, it will render shadows. Turn on the Renderer of
castShadows to cast shadows to other objects.

## Transparent shadow

For most scenes that require shadows, the above control parameters are basically sufficient. But sometimes we want to
cast shadows on a transparent object. For example, there is no ground in the scene (such as AR scene), but we also
want the object to have a shadow to enhance the three-dimensionality of the rendering.
If you set a standard render material for the ground, and set the alpha to 0, you won't see any shadows on the ground.
Because in the real world, light goes directly through transparent objects.
Therefore, for scenes such as transparent ground, a special material is required for rendering. You can refer to:

<playground src="transparent-shadow.ts"></playground>

In this case, the background is really just a texture, but by adding a transparent shadow, the 3D
objects can be blended into the scene more naturally.