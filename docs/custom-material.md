---
order: 4
title: Custom material
type: Resource System
---

There may be some special rendering requirements, such as water flow, and this time you need **custom material** to achieve. By using [Material](${api}core/Material) and [Shader](${api}core/Shader), you can integrate your own shader code into the engine rendering process.

<playground src="shader-water.ts"></playground>

## Create shader

[Shader](${api}core/Shader) encapsulates vertex shaders, fragment shaders, shader pre-compilation, platform precision, and platform differences. It is very convenient to create and use. Users only need to pay attention to the shader algorithm itself, and don't have to worry about what precision is used, or which version of GLSL is written. Here is a simple demo:

```javascript
import { Material, Shader, Color } from "oasis-engine";

//-- Shader
const vertexSource = `
  uniform mat4 u_MVPMat;

  attribute vec3 POSITION; 

  void main() {
    gl_Position = u_MVPMat * vec4(POSITION, 1.0);
  }
  `;

const fragmentSource = `
  uniform vec4 u_color;

  void main() {
    gl_FragColor = u_color;
  }
  `;

// create shader (only needs to be created once in the whole runtime )
Shader.create("demo", vertexSource, fragmentSource);

// create custom material
const material = new Material(engine, Shader.find("demo"));
```

`Shader.create()` is used to add the shader to the cache pool of the engine, so the entire runtime only needs to be created once, and then you can pass [Shader.find(name)](${api}core/Shader#find) to use repeatedly. **Note: The engine has pre-created blinn-phong, pbr, shadow-map, shadow, skybox, framebuffer-picker-color, and trail. Users can directly use these built-in shaders, but cannot create them with the same name.**

Because we don't have uploaded `u_color` variable, the fragment output is still black (uniform has default value), let's introduce the built-in shader variable in the engine and how to upload a custom variable.

## Built-in shader variables

In the above, we gave the material a shader, this time the program can start rendering. It should be noted that there are two kinds of variables in the shader, one is the `attribute` variable which is **per vertex**, and the other is the `uniform` variable which is **per shader** (After GLSL300, they are unified as `in` variables). The engine has automatically uploaded some commonly used variables, and users can directly use them in the shader code, such as vertex data and `mvp` data. The following are the variables uploaded by the engine by default.

| attribute data        | attribute name | type of data |
| :-------------------- | :------------- | :----------- |
| vertex data           | POSITION       | vec3         |
| normal data           | NORMAL         | vec3         |
| tangent data          | TANGENT        | vec4         |
| vertex color          | COLOR_0        | vec4         |
| skeleton index        | JOINTS_0       | vec4         |
| skeleton weight       | WEIGHTS_0      | vec4         |
| fist uv coordinates   | TEXCOORD_0     | vec2         |
| Second uv coordinates | TEXCOORD_1     | vec2         |

| uniform data                         | uniform name | type of data |
| :----------------------------------- | :----------- | :----------- |
| canvas resolution                    | u_resolution | vec2         |
| viewport matrix                      | u_viewMat    | mat4         |
| projection matrix                    | u_projMat    | mat4         |
| viewport projection matrix           | u_VPMat      | mat4         |
| viewport inverse matrix              | u_viewInvMat | mat4         |
| projection inverse matrix            | u_projInvMat | mat4         |
| camera position                      | u_cameraPos  | vec3         |
| model local coordinate system matrix | u_localMat   | mat4         |
| model world Coordinate System Matrix | u_modelMat   | mat4         |
| model viewport matrix                | u_MVMat      | mat4         |
| model viewport projection matrix     | u_MVPMat     | mat4         |
| model viewport inverse matrix        | u_MVInvMat   | mat4         |
| normal inverse transpose matrix      | u_normalMat  | mat4         |

## Upload shader variables

> Please refer to [Mesh Renderer](${docs}mesh-renderer) for uploading attribute data, won’t repeat it here.

In addition to the built-in variables, we can upload any variable with a custom name in the shader (it is recommended to use u\_\*\*, v\_\*\* to represent uniform and varying variables respectively), the only thing we have to do is using the correct interface according to the shader variable type. The upload interface is all in [ShaderData](${api}core/ShaderData), and the shaderData instance objects are saved in the four categories [Scene](${api}core/Scene), [Camera](${api}core/Camera), [Renderer](${api}core/Renderer), [Material](${api}core/Material) of the engine , we only need to call the interface in these shaderData, upload variables, and engine will automatically help us assemble these data at the bottom layer and optimize performance such as judging duplication.

![image-20210722153638785](https://gw.alipayobjects.com/zos/OasisHub/fc605510-5b14-476f-8c91-03205c623b4b/image-20210722153638785.png)

### ShaderData separate benefits

The shaderData are saved in the four categories [Scene](${api}core/Scene), [Camera](${api}core/Camera), [Renderer](${api}core/Renderer), [Material ](${api}core/Material) of the engine, one of the benefits is that the bottom layer can upload a block of uniform according to the upload timing to improve performance; in addition, the material-independent shaderData can be stripped out to achieve shared materials, i.e. two renderer shares one material, although the same shader must be controlled, but the upload of this part of the shader data comes from the shaderData of the two renderers, it will not affect each other's rendering results.

i.e.

```typescript
const renderer1ShaderData = renderer1.shaderData;
const renderer2ShaderData = renderer2.shaderData;
const materialShaderData = material.shaderData;

materialShaderData.setColor("u_color", new Color(1, 0, 0, 1));
renderer1ShaderData.setFloat("u_progross", 0.5);
renderer2ShaderData.setFloat("u_progross", 0.8);
```

### Interface in shaderData

| Shader type | ShaderData API |
| :-- | :-- |
| `bool` 、 `int` | setInt( value: number ) |
| `float` | setFloat( value: number )` |
| `bvec2`、`ivec2`、`vec2` | setVector2( value:Vector2 ) |
| `bvec3`、`ivec3`、`vec3` | setVector3( value:Vector3 ) |
| `bvec4`、`ivec4`、`vec4` | setVector4( value:Vector4 ) |
| `mat4` | setMatrix( value:Matrix ) |
| `float[]` 、`vec2[]` 、`vec3[]`、 `vec4[]` 、`mat4[]` | setFloatArray( value:Float32Array ) |
| `bool[]`、 `int[]` 、`bvec2[]`、 `bvec3[]` 、`bvec4[]`、 `ivec2[]`、 `ivec3[]` 、`ivec4[]` | setIntArray( value:Int32Array ) |
| `sampler2D` 、 `samplerCube` | setTexture( value:Texture ) |
| `sampler2D[]` 、 `samplerCube[]` | setTextureArray( value:Texture[] ) |

The code demo is as follows:

```
// shader

uniform float u_float;
uniform int u_int;
uniform bool u_bool;
uniform vec2 u_vec2;
uniform vec3 u_vec3;
uniform vec4 u_vec4;
uniform mat4 u_matrix;
uniform int u_intArray[10];
uniform float u_floatArray[10];
uniform sampler2D u_sampler2D;
uniform samplerCube u_samplerCube;
uniform sampler2D u_samplerArray[2];

// GLSL 300:
// in float u_float;
// ...
```

```typescript
// ShaderData can be saved separately in Scene, Camera, Renderer, Material.
const shaderData = material.shaderData;

shaderData.setFloat("u_float", 1.5);
shaderData.setInt("u_int", 1);
shaderData.setInt("u_bool", 1);
shaderData.setVector2("u_vec2", new Vector2(1, 1));
shaderData.setVector3("u_vec3", new Vector3(1, 1, 1));
shaderData.setVector4("u_vec4", new Vector4(1, 1, 1, 1));
shaderData.setMatrix("u_matrix", new Matrix());
shaderData.setIntArray("u_intArray", new Int32Array(10));
shaderData.setFloatArray("u_floatArray", new Float32Array(10));
shaderData.setTexture("u_sampler2D", texture2D);
shaderData.setTexture("u_samplerCube", textureCube);
shaderData.setTextureArray("u_samplerArray", [texture2D, textureCube]);
```

> **Note**: For performance, the engine does not support struct arrays or upload a single element of the array

### Macro switch

In addition to uniform variables, the engine also regards [macro definition](https://www.wikiwand.com/en/OpenGL_Shading_Language) in the shader as a variable, because the enable/disable of the macro definition will generate different shaders variations, it will also affect the rendering results.

For example, these macros have been related to Shader:

```
#ifdef DISCARD
	discard;
#endif

#ifdef LIGHT_COUNT
	uniform vec4 u_color[ LIGHT_COUNT ];
#endif
```

Then use `enableMacro` and `disableMacro` in [ShaderData](${api}core/Shader#enableMacro) to control marco:

```typescript
// Open macro switch
shaderData.enableMacro("DISCARD");
// Close macro switch
shaderData.disableMacro("DISCARD");

// Open variable macro
shaderData.enableMacro("LIGHT_COUNT", "3");

// Switch variable macro. Here, the bottom layer will automatically disable "Light_Count 3" above.
shaderData.enableMacro("LIGHT_COUNT", "2");

// Close variable macro
shaderData.disableMacro("LIGHT_COUNT");
```

## Rendering state

We determine the rendering result by the four block of shaderData of the material. However, in addition to the operation of the shader, the rendering pipeline also provides some rendering states to enable us to perform some additional configuration and processing of programmable input and output. Therefore, the engine provides [RenderState](${api}core/RenderState), which can be used for [BlendState](${api}core/RenderState#BlendState), [DepthState](${api}core/RenderState#DepthState), [StencilState](${api}core/RenderState#StencilState), [RasterState](${api}core/RenderState#RasterState) for configuration. Let's take a standard rendering process of a transparent model as an example. We want to turn on the blending mode and set the blending factor, because the transparent object is rendered by overlay, we also need to disable the depth writing;

```typescript
const renderState = material.renderState;

// 1. Set color mixing factor.
const blendState = renderState.blendState;
const target = blendState.targetBlendState;

// src factor:（As，As，As，As）.
target.sourceColorBlendFactor = target.sourceAlphaBlendFactor = BlendFactor.SourceAlpha;
// dst factor: (As，1 - As，1 - As，1 - As）.
target.destinationColorBlendFactor = target.destinationAlphaBlendFactor = BlendFactor.OneMinusSourceAlpha;
// operation: src + dst  */
target.colorBlendOperation = target.alphaBlendOperation = BlendOperation.Add;

// 2. Open color mix
target.enabled = true;

// 3. Disable depth wirting
const depthState = renderState.depthState;
depthState.writeEnabled = false;

// 4. Set the rendering queue as transparent
material.renderQueueType = RenderQueueType.Transparent;
```

For more options about the rendering state, please refer to the corresponding [API document](${api}core/RenderState)

## Rendering queue

So far, the custom material has been very perfect, but maybe we need to do some processing on the rendering order of the objects. For example, the transparent objects is generally rendered behind the opaque queue. Therefore, the engine provides [RenderQueueType](${api}core/RenderQueueType), the rendering queue of the material can determine the rendering order of this material in the current scene, and the bottom layer of the engine will perform some special processing on the rendering queue of different ranges, such as [RenderQueueType.Transparent](${api}core/RenderQueueType#transparent) will render **from far to near**. It is worth noting that the value of the render queue can be an enumerated value plus any custom number.

i.e.

```typescript
material.renderQueueType = RenderQueueType.Opaque + 1;
```

## Package custom material

This part of the content is a combination of all the above content, to give users a simple packaging example, hope it will be helpful to you:

```typescript
import { Material, Shader, Color, Texture2D, BlendFactor, RenderQueueType } from "oasis-engine";

//-- Shader
const vertexSource = `
  uniform mat4 u_MVPMat;

  attribute vec3 POSITION; 
  attribute vec2 TEXCOORD_0;
  varying vec2 v_uv;

  void main() {
    gl_Position = u_MVPMat * vec4(POSITION, 1.0);
    v_uv = TEXCOORD_0;
  }
  `;

const fragmentSource = `
  uniform vec4 u_color;
  varying vec2 v_uv;

  #ifdef TEXTURE
    uniform sampler2D u_texture;
  #endif

  void main() {
    vec4 color = u_color;

    #ifdef TEXTURE
      color *= texture2D(u_texture, v_uv);
    #endif

    gl_FragColor = color;

  }
  `;

Shader.create("demo", vertexSource, fragmentSource);

export class CustomMaterial extends Material {
  set texture(value: Texture2D) {
    if (value) {
      this.shaderData.enableMacro("TEXTURE");
      this.shaderData.setTexture("u_texture", value);
    } else {
      this.shaderData.disableMacro("TEXTURE");
    }
  }

  set color(val: Color) {
    this.shaderData.setColor("u_color", val);
  }

  // make it transparent
  set transparent() {
    const target = this.renderState.blendState.targetBlendState;
    const depthState = this.renderState.depthState;

    target.enabled = true;
    target.sourceColorBlendFactor = target.sourceAlphaBlendFactor = BlendFactor.SourceAlpha;
    target.destinationColorBlendFactor = target.destinationAlphaBlendFactor = BlendFactor.OneMinusSourceAlpha;
    depthState.writeEnabled = false;
    this.renderQueueType = RenderQueueType.Transparent;
  }

  constructor(engine: Engine) {
    super(engine, Shader.find("demo"));
  }
}
```
