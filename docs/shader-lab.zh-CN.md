---
order: 2
title: Shader Lab
group: Material
label: Graphics/Material
---

`ShaderLab` 是一种特别设计用于 Galacean 引擎的 Shader 语言，它与 [GLSL 100](https://www.khronos.org/files/opengles_shading_language.pdf) 语法标准非常贴合。相比以往手动代码指定的方式，使用 `ShaderLab` 可以更方便、快捷地编写自定义材质的 Shader。它支持多个 Pass、渲染状态（如混合状态、模板状态、深度状态）以及渲染队列设置等功能。此外，`ShaderLab` 还整合了传统的顶点着色器和片元着色器的编码方式，以减少代码的冗余量。它能自动剔除未被引用的 uniform 和 attribute 变量的声明，提高代码的整洁度。

<playground src="shader-lab.ts"></playground>

## `ShaderLab` 初始化

```ts
import { ShaderLab } from "@galacean/engine-shaderlab";

// Create engine with shaderLab
const engine = await WebGLEngine.create({ canvas: "canvas", shaderLab });

......

// Create shader by galacean shader code directly!
const shader = Shader.create(galaceanShaderCode);
```

## ShaderLab 语法标准

#### Shader

ShaderLab 中的`Shader`是传统渲染管线中着色器程序和其他引擎渲染设置相关信息的集合封装，它允许在同一个`Shader`对象中定义多个着色器程序，并告诉 Galacean 在渲染过程中如何选择使用它们。

```
Shader "ShaderName" {
  ...
  // 全局变量区：变量声明，结构体声明，渲染状态声明
  ...
  SubShader "SubShaderName" {
    ...
  }
  ...
}
```

#### 全局变量

可以在 ShaderLab 中声明 4 类全局变量：渲染状态(RenderState)，结构体，函数，以及单变量。

- 渲染状态

  包含混合状态(BlendState)，深度状态(DepthState)，模板状态(StencilState)，光栅化状态(RasterState)

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

  > [n] 可省略，在使用 MRT 的情况下， [n] 为指定某个 MRT 渲染状态，省略为设置所有 MRT 状态，BlendOperation 和 BlendFactor 枚举等同引擎 API

  ```
  DepthState {
    Enabled: bool;
    WriteEnabled: bool;
    CompareFunction: CompareFunction;
  }
  ```

  > CompareFunction 枚举等同引擎 API

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

  > CompareFunction 和 StencilOperation 举等同引擎 API

  ```
  RasterState {
    CullMode: CullMode;
    DepthBias: float;
    SlopeScaledDepthBias: float;
  }
  ```

  > CullMode 举等同引擎 API

- 结构体

  语法等同于 GLSL 语言中的结构体

  ```
  struct a2v {
    vec4 POSITION;
    vec4 JOINTS_0;
    vec4 WEIGHTS_0;
  }
  ```

- 函数

  语法等同于 GLSL 语言中的函数

  ```
  returnType functionName (type0 arg0, type1 arg1, ..., typen argn)
  {
      // do some computation
      return returnValue;
  }
  ```

- 单变量

  ```
  variableType variableName;
  ```

与其他编程语言类似，ShaderLab 中的全局变量也有作用域和同名覆盖原则。简单来说，ShaderLab 中的全局变量的作用范围仅限于其声明的 SubShader 或 Pass 模块内部，而同名覆盖原则指的是如果存在与 Pass 内部同名的全局变量，则 Pass 内的全局变量会覆盖 SubShader 内的同名全局变量。

#### SubShader

一个`Shader`对象可以包含多个，但至少一个`SubShader`。当前`SubShader`可以通过自定义 Tag，如`ReplaceTag`，搭配 [`Camera.setReplacementShader`](${api}/core/Camera) 指定可能需要替换的着色器程序。

- `UsePass` 指令

  如果一个 `SubShader` 包含多个 `Pass`，可以通过 `UsePass` 指令复用其他 `Pass` 对象，比如引擎内置的 PBR Pass: `UsePass "pbr/Default/Forward"`

  |   内置 Shader   |            Pass 路径            |
  | :-------------: | :-----------------------------: |
  |       PBR       |       pbr/Default/Forward       |
  |      Unlit      |      unlit/Default/Forward      |
  |     Skybox      |     skybox/Default/Forward      |
  | Particle-shader | particle-shader/Default/Forward |
  |   SpriteMask    |   SpriteMask/Default/Forward    |
  |     Sprite      |     Sprite/Default/Forward      |

```
SubShader "SubShaderName" {
  ...
  // 全局变量区：变量声明，结构体声明，渲染状态声明
  ...
  Tags {ReplaceTag = "opaque"}

  UsePass "ShaderName/SubShaderName/PassName"

  Pass "PassName" {
    ...
  }
}
```

#### Pass

`Pass` 是 `Shader` 对象的基本元素。简单的着色器对象可能只包含一个 `Pass`，但更复杂的着色器可以包含多个 `Pass`。 它可以指定在 GPU 上运行的着色器程序，渲染状态，以及渲染管线相关设置。

```
Pass "PassName" {
  Tag {PipelineStage = "ShadowCaster"}

  ...
  // 全局变量区：公共变量声明，结构体声明，函数声明
  ...

  // 渲染状态指定
  // Pass中可以直接声明渲染状态进行指定
  BlendState blendState {
    Enabled[0] = true;
    SourceColorBlendFactor = BlendFactor.SourceAlpha;
  }
  // 或者显示赋值进行指定
  BlendState = blendState;

  // 使用单变量声明代替glsl中的uniform变量声明
  mediump vec4 u_color;
  float material_AlphaCutoff;
  mat4 renderer_ModelMat;
  vec3 u_lightDir;

  // 使用结构体声明attribute变量
  struct a2v {
    vec4 POSITION;
  }
  // 使用结构体声明varying变量
  struct v2f {
    vec3 color;
  }
  // 定义顶点着色器函数
  v2f vert(a2v v) {
    v2f o;

    o.color = v.POSITION;
    gl_Position = renderer_MVPMat * v.POSITION;
    return o;
  }
  // 定义片元着色器函数
  void frag(v2f i) {
    gl_FragColor = i.color;
  }
  // 使用VertexShader和FragmentShader显示指定顶点着色器和片元着色器
  VertexShader = vert;
  FragmentShader = frag;

  // 使用RenderQueueType指定渲染队列
  RenderQueueType = RenderQueueType.Transparent;
}
```

#### `include` 宏

为了方便代码片段复用，ShaderLab 提供了 shader 代码片段注册方法。

```ts
shaderLab.registerShaderFragment('common_shader', commonSource);
```

代码片段注册后同构`include`宏进行代码片段替换

```
#include <common_shader>
```
