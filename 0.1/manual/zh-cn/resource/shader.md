# 自定义Shader

业务中可能有一些特殊的渲染需求，例如在物体表面渲染特殊的动画等，这时候就需要“自定义材质”去实现。通过直接使用 *material* 这个模块中的 [Material](${book.api}classes/core.material.html) 和 [RenderTechnique](${book.api}classes/core.rendertechnique.html) 这两个类，就可以将自己定义的 Shader 代码整合进入引擎的渲染流程。


首先我们要看一下 [RenderTechnique](${book.api}classes/core.rendertechnique.html) 这个类。这个类有两个重要的成员是：

- [vertexShader](${book.api}classes/core.rendertechnique.html#vertexshader)
- [fragmentShader](${book.api}classes/core.rendertechnique.html#fragmentshader)

也就是 WebGL 1.0 所使用的 GLSL 的两个 Shader 源代码。这两个 Shader 代码需要实现者提供。GLSL Shader 代码开发超出了本文的范围，这里不展开讨论。有了这两个 Shader 之后，还需要设置一些 Shader 的配置，包括：

- [attributes](${book.api}classes/core.rendertechnique.html#attributes)：需要那些顶点属性
- [uniforms](${book.api}classes/core.rendertechnique.html#uniforms)：需要那些 Uniform 值，有些 Uniform 值是引擎底层提供的，包括 Model View 矩阵等，详见：[UniformSemantic](${book.api}enums/core.uniformsemantic.html)

最后，还可能需要控制 WebGL 渲染状态，这就需要设置：

- [states](${book.api}classes/core.rendertechnique.html#states)



在准备好了 [RenderTechnique](${book.api}classes/core.rendertechnique.html) 之后，还需要一个 [Material](${book.api}classes/core.material.html) 对象来存储那些 Uniform 的当前值。如果有特殊的渲染计算，可以写一个 [Material](${book.api}classes/core.material.html)  的派生类，然后重写 `prepareDrawing()` 函数，进行必要的操作之后调用基类的实现。


下面是一个简单的自定义材质的例子：


```javascript
import { Material, RenderTechnique } from 'oasis-engine';

  //-- Shader 代码
  const VERT_SHADER = `
  uniform mat4 matModelViewProjection;

  attribute vec3 a_position; 

  void main() {
    gl_Position = matModelViewProjection * vec4(a_position, 1.0);
  }
  `;

  const FRAG_SHADER = `
  precision mediump float;

  void main() {
    gl_FragColor = vec4(0.5, 0.0, 0.0, 1.0);
  }
  `;

  //-- 创建一个 RenderTechnique 对象
  let tech = new RenderTechnique("MyTech");
  tech.vertexShader = VERT_SHADER;
  tech.fragmentShader = FRAG_SHADER;

  tech.uniforms = {
      matModelViewProjection: {
        name: 'matModelViewProjection',
        semantic: UniformSemantic.MODELVIEWPROJECTION,  // 指定系统中的Semantic，则其值有引擎提供，不需要手动设置
        type: DataType.FLOAT_MAT4,
      }
  };

  tech.attributes = {
     a_position: {
        name: 'a_position',
        semantic: 'POSITION',
        type: DataType.FLOAT_VEC3
      }
  };

  tech.isValid = true;

  //-- 创建材质对象
  let myMtl = new Material('MyMtl');
  myMtl.technique = tech;
```
