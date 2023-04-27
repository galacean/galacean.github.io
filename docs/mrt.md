---
order: 5
title: Off-screen rendering texture
type: Graphics
group: Texture
label: Graphics/Texture
---

Off-screen rendering texture, as the name suggests, the texture can be obtained by off-screen rendering. The bottom layer uses the [FBO](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/framebufferTexture2D) technology to output the rendering operation to the texture instead of the screen. The user can use this texture to realize post-processing special effects, refraction, reflection, dynamic environment mapping and other artistic creations.

Galacean provides the [RenderTarget](${api}core/RenderTarget) class to perform off-screen rendering and obtain the corresponding off-screen rendering textures. Currently, the engine supports the generation of the following off-screen rendering textures:

| Type | Usage |
| :-- | :-- |
| Color texture（[Texture](${api}core/Texture)） | Color texture, <br> color cubic texture, <br> multiple color texture (MRT) |
| Depth texture（[Texture](${api}core/Texture)） | Depth texture, <br> depth cubic texture |
| Texture combination | Color Texture + Depth Texture, <br> Color Cube Texture + Depth Cube Texture, <br> Multi Color Texture + Depth Texture |

## How to use

<playground src="render-target.ts"></playground>