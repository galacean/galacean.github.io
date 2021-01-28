# 自定义材质

业务中可能有一些特殊的渲染需求，例如毛发效果，这时候就需要“自定义材质”去实现。通过使用 _material_ 这个模块中的 [Material](${book.api}classes/core.material.html) 和 [Shader](${book.api}classes/core.shader.html) 这两个类，就可以将自己定义的 Shader 代码整合进入引擎的渲染流程。

![](https://www.techpowerup.com/img/nRXJmG76dIL7Krlg.jpg)

## 创建 shader
[Shader](${book.api}classes/core.shader.html) 封装了顶点着色器、片元着色器、着色器预编译、平台精度、平台差异性。他的创建和使用非常方便，用户只需要关注 shader 算法本身，而不用纠结于使用什么精度，亦或是使用 GLSL 哪个版本的写法。
下面是一个简单的demo:
```javascript
import { Material, Shader, Color } from "oasis-engine";

//-- Shader 代码
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

// 创建 shader（整个 runtime 只需要创建一次）
Shader.create("demo", vertexSource, fragmentSource);

// 创建自定义材质
const material = new Material(engine, Shader.find("demo"));

```
`Shader.create()`用来将 shader 添加到引擎的缓存池子中，因此整个 runtime 只需要创建一次,接下来就可以通过 [Shader.find(name)](${book.api}classes/core.shader.html#find) 来反复使用.
**注：引擎已经预先 create 了 blinn-phong、pbr、shadow-map、shadow、skybox、framebuffer-picker-color、trail。用户可以直接使用这些内置 shader，但是不能重名创建。**

因为我们没有上传 `u_color`  变量，所以片元输出还是黑色的(uniform 默认值)，接下来我们来介绍下引擎内置的 shader 变量以及如何上传自定义变量。



## 内置 shader 变量
在上面，我们给 material 赋予了 shader，这个时候程序已经可以开始渲染了。需要注意的是，shader 代码中有两种变量，一种是**逐顶点**的 `attribute` 变量，另一种是**逐 shader** 的 `uniform` 变量。(在 GLSL300 后，统一为 in 变量)
引擎已经自动上传了一些常用变量，用户可以直接在 shader 代码中使用，如顶点数据和 mvp 数据，下面是引擎默认上传的变量。

| 逐顶点数据 |  attribute name | 数据类型 |
| :--- | :--- | :--- |
| 顶点 | POSITION | vec3  |
| 法线 | NORMAL | vec3  |
| 切线 | TANGENT |  vec4 |
| 顶点颜色 | COLOR_0 |  vec4 |
| 骨骼索引 | JOINTS_0 | vec4  |
| 骨骼权重 | WEIGHTS_0 | vec4  |
| 第一套纹理坐标 | TEXCOORD_0 | vec2  |
| 第二套纹理坐标 | TEXCOORD_1 | vec2  |


| 逐 shader 数据 |  uniform name | 数据类型 |
| :--- | :--- | :--- |
| canvas 分辨率 | u_resolution | vec2 |
| 视口矩阵 | u_viewMat | mat4 |
| 投影矩阵 | u_projMat | mat4 |
| 视口投影矩阵 | u_VPMat | mat4 |
| 视口逆矩阵 | u_viewInvMat | mat4 |
| 投影逆矩阵 | u_projInvMat | mat4 |
| 相机位置 | u_cameraPos | vec3 |
| 模型本地坐标系矩阵 | u_localMat | mat4 |
| 模型世界坐标系矩阵 | u_modelMat | mat4 |
| 模型视口矩阵 | u_MVMat | mat4 |
| 模型视口投影矩阵 | u_MVPMat | mat4 |
| 模型视口逆矩阵 | u_MVInvMat | mat4 |
| 法线逆转置矩阵 | u_normalMat | mat4 |


## 上传 shader 变量
> *attribute 逐顶点数据的上传请参考 [几何体渲染器](${book.manual}component/geometry-renderer.md),这里不再赘述。*

除了内置的变量，我们可以在 shader 中上传任何自定义名字的变量(建议使用 u_** 、 v_** 分别表示 uniform、varying变量)，我们唯一要做的就是根据 shader 的变量类型，使用正确的接口。
上传接口全部保存在 [ShaderData](${book.api}classes/core.shaderdata.html) 中，而 shaderData 实例对象又分别保存在引擎的四大类 [Scene](${book.api}classes/core.scene.html)、[Camera](${book.api}classes/core.camera.html)、[Renderer](${book.api}classes/core.renderer.html)、[Material](${book.api}classes/core.material.html) 中，我们只需要分别往这些 shaderData 中调用接口，上传变量，引擎便会在底层自动帮我们组装这些数据，并进行判重等性能的优化。

![](https://intranetproxy.alipay.com/skylark/lark/0/2021/png/204641/1611543397728-4ca7ea51-97ca-481f-95c2-3e867b726fcb.png?x-oss-process=image%2Fresize%2Cw_1492)

### shaderData 分开的好处
shaderData 分别保存在引擎的四大类 [Scene](${book.api}classes/core.scene.html)、[Camera](${book.api}classes/core.camera.html)、[Renderer](${book.api}classes/core.renderer.html)、[Material](${book.api}classes/core.material.html) 中，这样做的好处之一就是底层可以根据上传时机上传某一块 uniform，提升性能；另外，将材质无关的 shaderData 剥离出来，可以实现共享材质，比如两个 renderer ，共享了一个材质，虽然都要操控同一个 shader，但是因为这一部分 shader 数据的上传来源于两个 renderer 的 shaderData，所以是不会影响彼此的渲染结果的。

如：
```typescript
const renderer1ShaderData = renderer1.shaderData;
const renderer2ShaderData = renderer2.shaderData;
const materialShaderData = material.shaderData;

materialShaderData.setColor("u_color", new Color(1,0,0,1));
renderer1ShaderData.setFloat("u_progross",0.5);
renderer2ShaderData.setFloat("u_progross",0.8);
```

### 调用接口
shader 中变量的类型和调用的接口对应关系如下：
| shader 类型 |   ShaderData API |
| :--- | :--- | :--- |
| bool 、 int  | setInt( value: number ) |
| float | setFloat( value: number ) |
| bvec2、ivec2、vec2 | setVector2( value:Vector2 ) |
| bvec3、ivec3、vec3 | setVector3( value:Vector3 ) |
| bvec4、ivec4、vec4 | setVector4( value:Vector4 ) |
| mat4 | setMatrix( value:Matrix ) |
| float[] 、vec2[] 、vec3[]、 vec4[] 、mat4[] | setFloatArray( value:Float32Array ) |
| bool[]、 int[] 、bvec2[]、 bvec3[] 、bvec4[]、 ivec2[]、 ivec3[] 、ivec4[] | setIntArray( value:Int32Array ) |
| sampler2D 、 samplerCube | setTexture( value:Texture ) |
| sampler2D[] 、 samplerCube[] | setTextureArray( value:Texture[] ) |

代码演示如下：
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
// shaderData 可以分别保存在 scene 、camera 、renderer、 material 中。
const shaderData = material.shaderData;

shaderData.setFloat("u_float", 1.5);
shaderData.setInt("u_int", 1);
shaderData.setInt("u_bool", 1);
shaderData.setVector2("u_vec2", new Vector2(1,1));
shaderData.setVector3("u_vec3", new Vector3(1,1,1));
shaderData.setVector4("u_vec4", new Vector4(1,1,1,1));
shaderData.setMatrix("u_matrix", new Matrix());
shaderData.setIntArray("u_intArray", new Int32Array(10));
shaderData.setFloatArray("u_floatArray", new Float32Array(10));
shaderData.setTexture("u_sampler2D", texture2D);
shaderData.setTexture("u_samplerCube",textureCube);
shaderData.setTextureArray("u_samplerArray",[texture2D,textureCube]);
```
**注：为了性能考虑，引擎暂不支持 结构体数组上传、数组单个元素上传。**


### 宏开关
除了uniform 变量之外，引擎将 shader 中的[宏定义](https://www.wikiwand.com/en/OpenGL_Shading_Language)也视为一种变量，因为宏定义的开启/关闭 将生成不同的着色器变种，也会影响渲染结果。

如 shader 中有这些宏相关的操作：
```
#ifdef DISCARD
	discard;
#endif

#ifdef LIGHT_COUNT
	uniform vec4 u_color[ LIGHT_COUNT ];
#endif
```
也是通过 [ShaderData](${book.api}classes/core.shader.html#enableMacro) 来操控宏变量：
```typescript
// 开启宏开关
shaderData.enableMacro("DISCARD");
// 关闭宏开关
shaderData.disableMacro("DISCARD");

// 开启变量宏
shaderData.enableMacro("LIGHT_COUNT", "3");

// 切换变量宏。这里底层会自动 disable 上一个宏，即 “LIGHT_COUNT 3”
shaderData.enableMacro("LIGHT_COUNT", "2");

// 关闭变量宏
shaderData.disableMacro("LIGHT_COUNT");
```

## 渲染状态
我们通过材质的 shader，四块 shaderData 决定了材质的渲染表现。但是渲染管线除了着色器的操作，还提供了一些渲染状态来使我们对可编程的输入输出进行一些额外配置和处理。
因此，引擎提供了[RenderState](${book.api}classes/core.renderstate.html) ，可以分别对[混合状态（BlendState）](${book.api}classes/core.renderstate.html#blendstate)、[深度状态（DepthState）](${book.api}classes/core.renderstate.html#depthstate)、[模版状态（StencilState）](${book.api}classes/core.renderstate.html#stencilstate)、[光栅状态（RasterState）](${book.api}classes/core.renderstate.html#rasterstate)进行配置。
我们拿一个透明物体的标准渲染流程来举例，我们希望开启混合模式并设置混合因子，并且因为透明物体是叠加渲染的，所以我们还要关闭深度写入;
```typescript
const renderState = material.renderState;

// 1. 设置颜色混合因子。
const blendState = renderState.blendState;
const target = blendState.targetBlendState;

// src 混合因子为（As，As，As，As）
target.sourceColorBlendFactor = target.sourceAlphaBlendFactor =BlendFactor.SourceColor;
// dst 混合因子为（1 - As，1 - As，1 - As，1 - As）。
target.destinationColorBlendFactor = target.destinationAlphaBlendFactor = BlendFactor.OneMinusSourceAlpha;
// 操作方式为 src + dst  */
target.colorBlendOperation = target.alphaBlendOperation = BlendOperation.Add;

// 2. 关闭深度写入。
const depthState = renderState.depthState;
depthState.writeEnabled = false;

// 3. 设置透明渲染队列 （后面会讲为什么）
material.renderQueueType = RenderQueueType.Transparent;
```
有关渲染状态的更多选项可以分别查看相应的[API 文档](${book.api}classes/core.renderstate.html) 




## 渲染队列
至此，自定义材质已经非常完善了，但是也许我们还需要对物体的渲染顺序做一些处理，比如透明物体的渲染一般都是放在非透明队列后面的，因此，引擎提供了 [渲染队列（RenderQueueType）](${book.api}classes/core.renderqueuetype.html) ，我们设置材质的渲染队列，可以决定这个材质在当前场景中的渲染顺序，引擎底层会对不同范围的渲染队列进行一些特殊处理，如 [RenderQueueType.Transparent](${book.api}classes/core.renderqueuetype.html#transparent) 会从远到近进行渲染。值得注意的是渲染队列的值可以是枚举值加上任何自定义数字。
```typescript
material.renderQueueType = RenderQueueType.Opaque + 1;
```


## 封装自定义材质
这部分的内容是结合上文所有内容，给用户一个简单的封装示例，希望对您有所帮助：
```typescript
import { Material, Shader, Color, Texture2D, BlendFactor, RenderQueueType } from "oasis-engine";

//-- Shader 代码
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

Shader.create("demo",vertexSource,fragmentSource)

export class CustomMaterial extends Material{

  set texture(value: Texture2D){
    if(value){
      this.shaderData.enableMacro("TEXTURE");
      this.shaderData.setTexture("u_texture", value);
    }else{
      this.shaderData.disableMacro("TEXTURE");
    }
  }

  set color(val:Color){
    this.shaderData.setColor("u_color", val);
  }

  // make it transparent
  set transparent(){
    const target = this.renderState.blendState.targetBlendState;
    const depthState = this.renderState.depthState;

    target.sourceColorBlendFactor = target.sourceAlphaBlendFactor = BlendFactor.SourceAlpha;
    target.destinationColorBlendFactor = target.destinationAlphaBlendFactor = BlendFactor.OneMinusSourceAlpha;
    depthState.writeEnabled = false;
    this.renderQueueType = RenderQueueType.Transparent;
  }

  constructor(engine:Engine){
    super(engine, Shader.find("demo"))
  }
}

```