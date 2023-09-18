---
order: 2
title: Shader Lab
group: Material
label: Graphics/Material
---

`ShaderLab` is a shader language specifically designed for use with the Galacean engine, which closely conforms to the [GLSL 100](https://www.khronos.org/files/opengles_shading_language.pdf) syntax standard. Compared with the previous manual code specification, `ShaderLab` can be used to write custom material Shaders more conveniently and quickly. It supports multiple passes, rendering states (such as blending state, template state, depth state), and render queue settings. In addition, `ShaderLab` also integrates traditional vertex shader and fragment shader coding methods to reduce the amount of code redundancy. It can automatically eliminate the declaration of unreferenced uniform and attribute variables to improve the cleanliness of the code.

<playground src="shader-lab.ts"></playground>

## ShaderLab Initialization

```ts
import { ShaderLab } from "@galacean/engine-shaderlab";

// Create engine with shaderLab
const engine = await WebGLEngine.create({ canvas: "canvas", shaderLab });

......

// Create shader by galacean shader code directly!
const shader = Shader.create(galaceanShaderCode);
```
