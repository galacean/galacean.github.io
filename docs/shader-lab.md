---
order: 2
title: Shader Lab
group: Material
label: Graphics/Material
---

`ShaderLab` is a shader language designed specifically for the Galacean engine. Compared with previous engine version, using `ShaderLab` provides more convenience. For example, it can specify the rendering pipeline and set the rendering state through specific instructions. Through the SubShader and Pass modules, it is also more convenient to write multiple Pass Shaders. Use [GLSL](https://www.khronos.org/files/opengles_shading_language.pdf) language in ShaderLab to write vertex and fragment shader programs in the rendering pipeline. It is worth mentioning that you only need to declare uniform, attribute and varying variables once, and variables not used by the shader program will be automatically eliminated by the engine, helping developers to write custom material Shaders more conveniently and quickly.

The following is the "simplest" example of using ShaderLab, which defines a vertex shader that only implements MVP transformation and a fragment shader that specifies the pixel color through a Uniform.

<playground src="shader-lab-triangle.ts"></playground>

The syntax skeleton of `ShaderLab` is as follows, and the syntax and usage of each module will be expanded in detail below.

```
Shader "ShaderName" {
  ...
  SubShader "SubShaderName" {
    ...
    Pass "PassName" {
      ...
    }
    ...
  }
  ...
}
```

## ShaderLab Initialization

```ts
import { ShaderLab } from "@galacean/engine-shaderlab";

const shaderLab = new ShaderLab();
// Create engine with shaderLab
const engine = await WebGLEngine.create({ canvas: "canvas", shaderLab });

......

// Create shader by galacean shader code directly!
const shader = Shader.create(galaceanShaderCode);
```

## `ShaderLab` syntax standard

### Shader

```
Shader "ShaderName" {
  ...
  // Global variable area: variable declaration, structure declaration, rendering state declaration
  ...
  SubShader "SubShaderName" {
    ...
  }
  ...
}
```

`Shader` in `ShaderLab` is a collection of information related to shader programs and other engine rendering settings in the traditional rendering pipeline. It allows multiple shader programs to be defined in the same Shader object and tells Galacean how to choose to use them during the rendering process. Shader objects have a nested structure, containing SubShader and Pass substructures.

### Global variables

Four types of global variables can be declared in ShaderLab: rendering state, structures, functions, and single variables.

- Render state

  Include `BlendState`, `DepthState`, `StencilState`, `RasterState`.

  ```
  BlendState {
    Enabled[n]: bool;
    ColorBlendOperation[n]: BlendOperation;
    AlphaBlendOperation[n]: BlendOperation;
    SrcColorBlendFactor[n]: BlendFactor;
    SrcAlphaBlendFactor[n]: BlendFactor;
    DestColorBlendFactor[n]: BlendFactor;
    DestAlphaBlendFactor[n]: BlendFactor;
    ColorWriteMask[n]: float // 0xffffffff
    BlendColor: vec4;
    AlphaToCoverage: bool;
  }
  ```

  > [n] can be omitted. When using MRT, [n] is to specify a certain MRT rendering state. If omitted, it is to set all MRT states. BlendOperation and BlendFactor enumerations are equivalent to the engine API.

  ```
  DepthState {
    Enabled: bool;
    WriteEnabled: bool;
    CompareFunction: CompareFunction;
  }
  ```

  > CompareFunction enumeration equivalent engine API

  ```
  StencilState {
    Enabled: bool;
    ReferenceValue: int;
    Mask: float; // 0xffffffff
    WriteMask: float; // 0xffffffff
    CompareFunctionFront: CompareFunction;
    CompareFunctionBack: CompareFunction;
    PassOperationFront: StencilOperation;
    PassOperationBack: StencilOperation;
    FailOperationFront: StencilOperation;
    FailOperationBack: StencilOperation;
    ZFailOperationFront: StencilOperation;
    ZFailOperationBack: StencilOperation;
  }
  ```

  > CompareFunction and StencilOperation are equivalent engine APIs

  ```
  RasterState {
    CullMode: CullMode;
    DepthBias: float;
    SlopeScaledDepthBias: float;
  }
  ```

  > CullMode Cull Equivalent Engine API

- Structure, Function

  Equivalent to the syntax in glsl

- Variable

  ```
  [lowp/mediump/highp] variableType variableName;
  ```

Similar to other programming languages, global variables in ShaderLab also have scope and same-name coverage principles. Simply put, the scope of global variables in ShaderLab is limited to the SubShader or Pass module in which it is declared, and the same-name coverage principle means that if there is a global variable with the same name as the one in Pass, the global variable in Pass will overwrite the one in SubShader. global variable with the same name.

### SubShader

```
SubShader "SubShaderName" {
  ...
  // Global variable area: variable declaration, structure declaration, rendering state declaration
  ...
  Tags {ReplaceTag = "opaque"}

  UsePass "ShaderName/SubShaderName/PassName"

  Pass "PassName" {
    ...
  }
}
```

A `Shader` object can contain multiple, but at least one `SubShader`. It represents the specific implementation of a set of rendering pipelines and defines multiple implementation steps (Pass) of a rendering effect. The current `SubShader` can use a custom Tag, such as `ReplaceTag`, in conjunction with `Camera.setReplacementShader` to specify the shader program that may need to be replaced.

- `UsePass` directive

  If a SubShader contains multiple Passes, you can reuse other Pass objects through the `UsePass` directive, such as the engine's built-in PBR Pass: `UsePass "pbr/Default/Forward"`

  | builtin Shader  |            Pass path            |
  | :-------------: | :-----------------------------: |
  |       PBR       |       pbr/Default/Forward       |
  |      Unlit      |      unlit/Default/Forward      |
  |     Skybox      |     skybox/Default/Forward      |
  | Particle-shader | particle-shader/Default/Forward |
  |   SpriteMask    |   SpriteMask/Default/Forward    |
  |     Sprite      |     Sprite/Default/Forward      |

### Pass

```
Pass "PassName" {
  Tag {PipelineStage = "ShadowCaster"}

  ...
  // Global variable area: variable declaration, structure declaration, rendering state declaration
  ...

  // Render pipeline and render state settings

  // Specify vertex shader and fragment shader
  VertexShader = vert;

  // Specify render queue
  RenderQueueType = RenderQueueType.Transparent;
}
```

`Pass` is the basic element of the `Shader` object. A simple shader object might contain just one `Pass`, but a more complex shader can contain multiple Passes. It defines the operations performed at specific stages of the rendering pipeline, such as shader programs running on the GPU, rendering states, and rendering pipeline related settings.

- RenderState settings

  Specified in the following two ways

  1. Explicitly assignment

     ```
     BlendState = blendState;
     ```

  2. Specified in the global variable of Pass scope.

     ```
     BlendState blendState {
        renderstateproperty =propertyvalue;
     }
     ```

- Uniform variable declaration

  Directly declare it as a global variable

  ```
  mediump vec4 u_color;
  float material_AlphaCutoff;
  mat4 renderer_ModelMat;
  vec3 u_lightDir;
  ```

- attribute variable declaration

  Specify by defining the input parameter structure of the vertex main function

  ```
  struct a2v {
    vec4 POSITION;
  }

  v2f vert(a2v o) {
    ...
  }
  ```

- varying variable declaration

  Specify by defining the vertex shader output parameter structure and the fragment shader input parameter structure.

  ```
  struct v2f {
    vec3 color;
  }

  v2f vert(a2v o) {
    ...
  }
  void frag(v2f i) {
    ...
  }
  ```

- Specify vertex and fragment shader

  Specify the specified shader entry function through `VertexShader` and `FragmentShader`

  ```
  VertexShader = vert;
  FragmentShader = frag;
  ```

- Render queue settings

  Specified via the `RenderQueueType` directive, which is equivalent to the engine API.

  ```
  RenderQueueType = RenderQueueType.Transparent;
  ```

### `include` Macro

In order to facilitate the reuse of code snippets, ShaderLab provides a shader code snippet registration method.

```ts
shaderLab.registerShaderFragment('common_shader', commonSource);
```

After the code fragment is registered, the code fragment is replaced through the `include` macro

```
#include <common_shader>
```

## Currently unsupported GLSL syntax formats

1. The `0` bit before and after the decimal point of floating point numbers cannot be omitted.

   - ❌ `float n = 1. + .9;`
   - ✅ `float n = 1.0 + 0.9;`

2. In a variable assignment statement, when assigning a property that is the return value of a function call, the function call needs to be enclosed in parentheses

   - ❌ `float a3 = texture2D(u_texture, (p.xy  * 0.4 + um) * u_water_scale).x;`
   - ✅ `float a3 = (texture2D(u_texture, (p.xy  * 0.4 + um) * u_water_scale)).x;`

3. If there is only one line of code after the `if` / `for` conditional statement, "{}" cannot be omitted

   - ❌

     ```
     if(dis < EPS || dis > MAX_DIS)
       break;
     ```

   - ✅
     ```
     if(dis < EPS || dis > MAX_DIS) {
       break;
     }
     ```

## A demo using multi-pass technology to implement planar shadows

<playground src="shader-lab.ts"></playground>
