---
order: 2
title: Shader Lab
group: Material
label: Graphics/Material
---

`ShaderLab` 是专为 Galacean 引擎设计的一种 Shader 语言。相较于以往的引擎 Shader，使用 `ShaderLab` 提供了更多便利。例如，它可以通过特定指令来指定渲染管线和设置渲染状态。通过 `SubShader` 和 `Pass` 模块，编写多 Pass Shader 也更加便捷。在 `ShaderLab` 中使用 [GLSL](https://www.khronos.org/files/opengles_shading_language.pdf) 语言编写渲染管线中的顶点(Vertex)和片元(Fragment)着色器程序。值得一提的是，只需声明一次 uniform、attribute 和 varying 变量，未被着色器程序使用的变量会被引擎自动剔除，帮助开发者更加便捷、快速地编写自定义材质的 Shader。

以下是一个简单的 ShaderLab 使用示例，其中包含了两个 Shader。"normal" Shader 定义了一个只实现 MVP 转换的顶点着色器，并且通过 Uniform 变量指定了像素颜色的片元着色器。另外，"lines" Shader 是一个使用 ShaderLab 进行改造的 [shadertoy](https://www.shadertoy.com/view/DtXfDr) 示例。
<playground src="shader-lab-triangle.ts"></playground>

`ShaderLab`语法骨架如下，每个模块语法和使用会在下文详细展开。

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

## `ShaderLab` 初始化

```ts
import { ShaderLab } from "@galacean/engine-shaderlab";

const shaderLab = new ShaderLab();
// 使用ShaderLab初始化Engine
const engine = await WebGLEngine.create({ canvas: "canvas", shaderLab });

......

// 直接使用ShaderLab创建Shader
const shader = Shader.create(galaceanShaderCode);
```

## ShaderLab 语法标准

### Shader

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

ShaderLab 中的`Shader`是传统渲染管线中着色器程序和其他引擎渲染设置相关信息的集合封装，它允许在同一个`Shader`对象中定义多个着色器程序，并告诉 Galacean 在渲染过程中如何选择使用它们。`Shader` 对象具有嵌套的结构，包含 `SubShader` 和 `Pass` 子结构。

### 全局变量

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

- 结构体、函数

  等同 glsl 中的语法

- 单变量

  ```
  [lowp/mediump/highp] variableType variableName;
  ```

与其他编程语言类似，ShaderLab 中的全局变量也有作用域和同名覆盖原则。简单来说，ShaderLab 中的全局变量的作用范围仅限于其声明的 SubShader 或 Pass 模块内部，而同名覆盖原则指的是如果存在与 Pass 内部同名的全局变量，则 Pass 内的全局变量会覆盖 SubShader 内的同名全局变量。

### SubShader

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

一个`Shader`对象可以包含多个，但至少一个`SubShader`。它表示一组渲染管线的具体实现，定义了一种渲染效果的多个实现步骤(Pass),当前`SubShader`可以通过自定义 Tag，如`ReplaceTag`，搭配 [`Camera.setReplacementShader`](${api}/core/Camera) 指定可能需要替换的着色器程序。

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

### Pass

```
Pass "PassName" {
  Tag {PipelineStage = "ShadowCaster"}

  ...
  // 全局变量区：公共变量声明，结构体声明，函数声明
  ...

  // 渲染管线和渲染状态设置

  // 指定顶点着色器和片元着色器  强调glsl语言
  VertexShader = vert;

  // 指定渲染队列
  RenderQueueType = RenderQueueType.Transparent;
}
```

`Pass` 是 `Shader` 对象的基本元素。简单的着色器对象可能只包含一个 `Pass`，但更复杂的着色器可以包含多个 `Pass`。 它定义了渲染管线特定阶段执行的操作，例如在 GPU 上运行的着色器程序，渲染状态，以及渲染管线相关设置。

- 渲染状态指定

  可以通过以下两种方式指定

  1. 显示赋值

     ```
     BlendState = blendState;
     ```

  2. Pass 全局变量域中声明指定

     ```
     BlendState blendState {
       渲染状态属性 = 属性值;
     }
     ```

- uniform 变量指定

  直接声明成全局变量

  ```
  mediump vec4 u_color;
  float material_AlphaCutoff;
  mat4 renderer_ModelMat;
  vec3 u_lightDir;
  ```

- attribute 变量声明

  通过定义顶点着色器函数入参结构体指定

  ```
  struct a2v {
    vec4 POSITION;
  }

  v2f vert(a2v o) {
    ...
  }
  ```

- varying 变量声明

  通过定义顶点着色器出参结构体和片元着色器入参结构体指定

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

- 顶点、片元着色器指定

  通过`VertexShader`和`FragmentShader`指定显示指定着色器入口函数

  ```
  VertexShader = vert;
  FragmentShader = frag;
  ```

- 渲染队列设置

  通过`RenderQueueType`指令指定，`RenderQueueType`等同与引擎 API。

  ```
  RenderQueueType = RenderQueueType.Transparent;
  ```

### `include` 宏

为了方便代码片段复用，ShaderLab 提供了 shader 代码片段注册方法。

```ts
shaderLab.registerShaderFragment('common_shader', commonSource);
```

代码片段注册后通过`include`宏进行代码片段替换

```
#include <common_shader>
```

## 一个利用多 Pass 技术实现平面阴影的示例

<playground src="shader-lab.ts"></playground>
