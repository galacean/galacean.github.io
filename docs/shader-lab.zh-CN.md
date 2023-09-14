---
order: 2
title: Shader Lab
group: Material
label: Graphics/Material
---

`ShaderLab` 是可以运行在 Galacean 引擎中的一门 Shader DSL 语言，相较以往手动代码指定方式，可以更为方便、快捷地编写表达自定义材质 Shader，如多 Pass，渲染状态(BlendState、StencilState、DepthState 等)，渲染队列(RenderQueue)等设置。此外还整合了传统顶点(vertex)着色器，片元(fragment)着色器编码方式，降低代码冗余量，自动剔除声明却未被引用的 uniform、attribute 变量。

<playground src="shader-lab.ts"></playground>

## ShaderLab 语法标准
