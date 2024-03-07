---
order: 3
title: 离屏渲染纹理
type: 图形
group: 纹理
label: Graphics/Texture
---

离屏渲染纹理，顾名思义，该纹理可以通过离屏渲染得到。底层使用了 [FBO](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/framebufferTexture2D) 技术，将渲染操作不再输出到屏幕上，而是输出到纹理上，用户通过该纹理，可以用来实现后处理特效、折射、反射、动态环境贴图等一些艺术创作。

引擎提供了 [RenderTarget](${api}core/RenderTarget) 类来进行离屏渲染，并获取相应的离屏渲染纹理，目前引擎支持生成以下离屏渲染纹理：

| 类型                                      | 应用                                                                          |
| :---------------------------------------- | :---------------------------------------------------------------------------- |
| 颜色纹理（[Texture](${api}core/Texture)） | 颜色纹理、颜色立方纹理、 多张颜色纹理 （MRT）                                 |
| 深度纹理（[Texture](${api}core/Texture)） | 深度纹理、深度立方纹理                                                        |
| 纹理组合                                  | 颜色纹理 + 深度纹理、颜色立方体纹理 + 深度立方体纹理、多张颜色纹理 + 深度纹理 |

## 使用

<playground src="mrt.ts"></playground>
