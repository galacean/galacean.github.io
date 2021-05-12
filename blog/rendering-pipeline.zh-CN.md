---
title: Oasis 引擎渲染管线的优化之路
type: Blog
time: 2021-05-12
---

> 作者：[慎思](https://github.com/zhuxudong)
​
## 引言
通常而言，在图形学中，我们所说的“**渲染**”(Rendering)，指在给定虚拟相机、三维物体、光源等条件下，在屏幕等终端生成或绘制一幅二维图像的过程。
![1620373084300-b77b40e4-546e-4808-a9ad-e70610dd1a86.png](https://cdn.nlark.com/yuque/0/2021/png/1255339/1620805160286-65a9d3fc-89c8-4a4b-b5c8-80124e540c1c.png#clientId=u59b6cee5-37a0-4&from=ui&id=u95b91ca9&margin=%5Bobject%20Object%5D&name=1620373084300-b77b40e4-546e-4808-a9ad-e70610dd1a86.png&originHeight=582&originWidth=2146&originalType=binary&size=599231&status=done&style=none&taskId=u864c50bf-bfa9-4ad6-8f61-c8a66b542cb)
如下图所示，渲染管线一般包含了三大阶段。其中**应用程序阶段**（Application）可以理解为数据准备阶段，Oasis 引擎在这里准备了着色器编译、视锥体裁剪、渲染队列排序、着色器数据等初始化工作；**几何体阶段**（Geometry Processing）将上述数据经过顶点着色器、投影变换、裁剪、屏幕映射一系列处理后输出到屏幕坐标系上；**光栅化阶段**（Rasterizer）将上一个阶段的顶点栅格化成一个个片元，然后经过片元着色器、颜色融合等操作，给每一个像素点描绘出相应的颜色。


![1620451156989-1463a5a7-ce6c-4329-beaf-f8c974cfd30c.png](https://cdn.nlark.com/yuque/0/2021/png/1255339/1620805180283-d2a27833-67a2-4a4b-9ebc-13bf28b2cfc3.png#clientId=u59b6cee5-37a0-4&from=ui&id=uc2132e97&margin=%5Bobject%20Object%5D&name=1620451156989-1463a5a7-ce6c-4329-beaf-f8c974cfd30c.png&originHeight=329&originWidth=1030&originalType=binary&size=34407&status=done&style=none&taskId=u58a212b1-6923-4fff-bccb-8eccf677134)


在动态场景中，相机、三维物体、光源等对象都是在不断变化的，也就是我们每一帧都需要执行一遍渲染管线。而一般画面度流畅的最低要求为 FPS > 30，即走一遍渲染管线的时间需要少于 **33**（1000 / 30）毫秒。Oasis 引擎在 0.3 里程碑中，**借助**[**材质系统**](https://oasisengine.cn/#/0.3/manual/zh-cn/resource/custom-material)**对渲染管线进行了全面重构，** 通过 [骨骼动画](https://oasis-engine.github.io/0.3/playground/#/skeleton-animation) demo （如下图所示，面数 728300，drawcall 50 次，不采用 Instance 合批等技术）的测试，在近 100 万面的浏览器 **6 倍降频**渲染中，跟渲染相关的 **render** 方法只占用了 **900 微秒**（ 0.2 版本渲染相同的场景 **render** 方法需要耗时 10 ms）！
![1620487677757-b4061d96-bf05-486f-a9e0-efbafef02cf5.png](https://cdn.nlark.com/yuque/0/2021/png/1255339/1620805285242-b6d92cac-1b5b-4490-a961-19e69f399514.png#clientId=u59b6cee5-37a0-4&from=ui&id=u1fdb997c&margin=%5Bobject%20Object%5D&name=1620487677757-b4061d96-bf05-486f-a9e0-efbafef02cf5.png&originHeight=1402&originWidth=3006&originalType=binary&size=1330669&status=done&style=none&taskId=u7ff8d62d-27b0-4df0-948b-887405a0169)
MacBook Pro，2.7GHz 四核 Intel Core i7，Intel Iris Plus Graphics 655 1536 MB，Google Chrome 90.0




本文将重点针对**应用程序阶段，**从数据结构、语法、架构设计等角度分析 **Oasis 引擎的渲染管线是如何设计和优化的。**


![1620617353816-57c02c68-8c20-44e8-ac75-6579c9d0c00f.png](https://cdn.nlark.com/yuque/0/2021/png/1255339/1620805304333-57bc870a-d24e-46e9-a94d-848acd7382b2.png#clientId=u59b6cee5-37a0-4&from=ui&id=u03d174c2&margin=%5Bobject%20Object%5D&name=1620617353816-57c02c68-8c20-44e8-ac75-6579c9d0c00f.png&originHeight=1246&originWidth=4426&originalType=binary&size=331167&status=done&style=none&taskId=u59ffe783-279c-450c-ade6-471af79eca2)




## 视锥体剔除
第一个阶段是视锥体剔除。


假如场景中所有激活的物体都会进入接下去的渲染管线，但是有些物体其实是在相机的视锥体范围之外的，那么这些视锥体之外物体的渲染其实是多余的，尤其是面数比较多的模型，会大大浪费性能。我们把在渲染管线开始之前，将相机视锥体范围之外的物体进行排除的这种操作，称为视锥体剔除，如 [视锥体剔除 Demo](https://oasisengine.cn/0.3/playground/#/renderer-cull)。
![1620290443769-64f2e7f0-705d-42df-84ba-67f99ac44cc9.png](https://cdn.nlark.com/yuque/0/2021/png/1255339/1620805412000-66fdbcab-7909-467b-ad69-babb3c9f16d0.png#clientId=u59b6cee5-37a0-4&from=ui&id=u16ec8f87&margin=%5Bobject%20Object%5D&name=1620290443769-64f2e7f0-705d-42df-84ba-67f99ac44cc9.png&originHeight=658&originWidth=1036&originalType=binary&size=136535&status=done&style=none&taskId=u2de1a11f-a447-4095-b48c-a063a766eee)
Oasis 引擎底层首先会利用脏标记检测[视锥体](https://oasisengine.cn/0.3/api/classes/math.boundingfrustum.html)是否发生变化，从而更新**视锥体**；
![1620457358641-33cf5c35-64ab-488f-8a39-cb5595449fcb.png](https://cdn.nlark.com/yuque/0/2021/png/1255339/1620805437228-fc74dbbf-72ec-4781-832c-ae08e2918b5a.png#clientId=u59b6cee5-37a0-4&from=ui&id=u230a326d&margin=%5Bobject%20Object%5D&name=1620457358641-33cf5c35-64ab-488f-8a39-cb5595449fcb.png&originHeight=304&originWidth=2262&originalType=binary&size=454609&status=done&style=none&taskId=uf6bd8a8f-d1e6-475b-8aee-42298dfb89d)然后将视锥体与物体的[ AABB 包围盒](https://oasisengine.cn/0.3/api/classes/math.boundingbox.html)进行碰撞检测；同理，物体的包围盒是否发生变化也采用了脏标记检测：
![1620457327131-d2981d0c-560f-49aa-9b08-5893125f86f0.png](https://cdn.nlark.com/yuque/0/2021/png/1255339/1620805458961-2e791f4d-941e-4671-ad8d-03877b03bfe3.png#clientId=u59b6cee5-37a0-4&from=ui&id=u23200720&margin=%5Bobject%20Object%5D&name=1620457327131-d2981d0c-560f-49aa-9b08-5893125f86f0.png&originHeight=610&originWidth=1076&originalType=binary&size=394253&status=done&style=none&taskId=udaa8517a-df65-4943-9e89-61b6061f1fb)
顺便一提，包围盒的更新使用了 [component-wise](https://zeux.io/2010/10/17/aabb-from-obb-with-component-wise-abs/) 算法，只需要对两个矢量运算即可得到包围盒的世界坐标系：
![1620620113756-c054d4dc-f614-41fa-a3e0-a9e91a15c416.png](https://cdn.nlark.com/yuque/0/2021/png/1255339/1620805473200-cee41bc2-513b-498c-b2bc-47fedee897b3.png#clientId=u59b6cee5-37a0-4&from=ui&id=u0d86097a&margin=%5Bobject%20Object%5D&name=1620620113756-c054d4dc-f614-41fa-a3e0-a9e91a15c416.png&originHeight=1274&originWidth=1734&originalType=binary&size=1618177&status=done&style=none&taskId=uc1dd94b0-658d-4475-ab09-a546b699244)
最后，只有视锥体**包含**或者**交叉**物体包围盒的物体才会进入渲染管线，减少了后续管线压力，提升了性能。




## 渲染队列排序
第二个阶段是渲染队列排序。


在渲染管线中，物体的默认渲染队列是无序的，即物体与相机的距离远近，透明度等不同渲染状态因素都不受控制，**渲染效果的正确性、管线性能**都会受到影响，因此引擎将渲染队列分成了不透明（Opaque）、透明度测试（AlphaTest）、透明（Transparent） 三种队列。
![1620614678257-9e7b1846-d876-4ff4-95a6-bfebd8767884.png](https://cdn.nlark.com/yuque/0/2021/png/1255339/1620805537862-f0e7a05a-0adf-4d4f-bebd-2e57ceb81c84.png#clientId=u59b6cee5-37a0-4&from=ui&id=u7b3a88a6&margin=%5Bobject%20Object%5D&name=1620614678257-9e7b1846-d876-4ff4-95a6-bfebd8767884.png&originHeight=1058&originWidth=4692&originalType=binary&size=437748&status=done&style=none&taskId=ub3827878-2e89-4ad2-a7fb-382981a0e56)


- **不透明队列从近到远排序**。我们一般会对非透明物体进行从近到远排序，这是因为当我们开启**深度测试**后，深度测试**失败**的片元将不进行颜色融合，支持** early-Z** 的 GPU 还会直接跳过片元着色器；又因为深度测试失败的默认配置为 z1 > z2 ，即距离较远的片元会深度测试失败，所以我们对非透明物体进行从近到远排序，可以最大程度地剔除后续深度测试失败的片元，达到性能优化；值得一提的是，有些 GPU 架构比如 PowerVR 支持[ HSR](http://cdn.imgtec.com/sdk-documentation/PowerVR+Series5.Architecture+Guide+for+Developers.pdf)（Hidden Surface Removal）技术，引擎利用此技术能够不排序也能实现 early-Z 剔除效果，因此从近到远排序并不是必然的选择。



- **透明队列从远到近排序**。此排序是为了保障渲染效果的正确性，因为通过色彩叠加原理可知，两种颜色混合的最终结果是受先后顺序影响的。



- **排序算法优化**。Oasis 引擎使用了更加高效的排序算法。JS 的内置方法 **Array.sort** 也能实现排序，但是源码里面有太多通用逻辑，会影响性能，感兴趣的可以在这个 [Oasis Issue](https://github.com/oasis-engine/engine/issues/36) 里面进行讨论。顺便一提，除了 Array.sort，JS 的很多内置方法都是为了通用性考虑，如果追求极致性能，需要针对引擎做特殊优化，如 **Array.forEach **这个数组内置方法是用来实现遍历的，但是源码里面有太多判断数组相关的逻辑，还有传回调堆栈等非引擎需要的功能，因此引擎内部尽量使用 for 循环来实现遍历会更加的高效，特别是帧级别的调用。







## 编译着色器
第三个阶段是编译着色器。


[着色器](https://learnopengl-cn.readthedocs.io/zh/latest/01%20Getting%20started/05%20Shaders/)（Shader）包括**顶点着色器**和**片元着色器**，是硬件渲染管线中的可编程模块，我们可以通过编写着色器代码，连接 CPU 和 GPU，控制最后的顶点位置，像素颜色等。


编译着色器里的一个核心概念是**宏**。我们在写着色器时，`#ifdef` 等宏命令可以选择是否编译这部分 Shader 代码，除了是否定义了这个宏之外，剩余的 Shader 的代码是完全一样的。我们把某个是否需要定义的宏称为**宏开关**；不同的宏开关组合在引擎中称为**宏集合**；而根据宏集合生成的不同 Shader，称为**着色器变种**。


- **自动编译着色器变种**。通常情况下，开发者只需要操作宏开关即可，引擎在运行时会自动根据宏集合是否发生变化来决定是否进行重新编译着色器。



- **预编译着色器变种**。如果对于运行时的流畅度要求较高，我们也可以手动调用引擎的 [Shader.compileVariant](https://oasisengine.cn/0.3/api/classes/core.shader.html#compilevariant) 方法来进行**预编译**，那么渲染运行时就无需再编译，不会造成卡顿。



**位运算**：因为宏集合中的每一个宏开关其实是一个字符串，而各种宏开关又存在着增删改查等需求，那么如何高效地对字符串组合进行运算，就可以用到**位运算**这个小技巧：我们把每一个宏开关，比如 `#ifdef test`，当作字节里面的一个“位”（bit），0 表示关闭该宏，1 表示开启该宏，那么一个 32 位的 Int 类型数字就可以表示 32 个宏开关；使用 `｜=` 就可以实现开启宏，使用 `& ～`就可以实现关闭宏；受益于位操作，判断两个宏集合是否变化，只需要判断两个数字是否相等即可。






## 更新着色器数据
第四个阶段是更新着色器数据。


与 JS、C++ 等编程语言一样，着色器使用 [GLSL](https://learnopengl-cn.readthedocs.io/zh/latest/01%20Getting%20started/05%20Shaders/#glsl) 语言，也有变量、函数等概念，不同的是着色器存在于 GPU，我们可以通过 [Uniform](https://learnopengl-cn.readthedocs.io/zh/latest/01%20Getting%20started/05%20Shaders/#uniform) 方式上传着色器数据。


基于着色器中的数据缓存机制，当数据没有发生变化时，可以不用每一帧都上传数据，由此，可以联想到一个优化手段，那就是**分块更新/上传**。


![1620312672843-86bca06d-d3db-44ff-97ee-a56fbc9c7864.png](https://cdn.nlark.com/yuque/0/2021/png/1255339/1620805558367-b90961f7-4452-4c83-9217-529ec114b986.png#clientId=u59b6cee5-37a0-4&from=ui&height=346&id=u32192579&margin=%5Bobject%20Object%5D&name=1620312672843-86bca06d-d3db-44ff-97ee-a56fbc9c7864.png&originHeight=692&originWidth=1166&originalType=binary&size=89127&status=done&style=none&taskId=u479d3f8c-234c-4cd0-95f3-86287d91740&width=583)


如上图所示，Oasis 引擎设计将着色器数据 [ShaderData](https://oasis-engine.github.io/0.3/api/classes/core.shaderdata.html) 分别保存在 [Scene](https://oasis-engine.github.io/0.3/api/classes/core.scene.html)、[Camera](https://oasis-engine.github.io/0.3/api/classes/core.camera.html)、[Renderer](https://oasis-engine.github.io/0.3/api/classes/core.renderer.html)、[Material](https://oasis-engine.github.io/0.3/api/classes/core.material.html) 四大块中。进行分块后，引擎可以在 CPU 分块更新着色器数据，最后分块上传到 GPU，期间还存在一些细小的优化点，接下来分别展开讨论。


### CPU 分块更新
在很多设计中，着色器相关的数据都存放在了材质（Material）中，也就是说所有的着色器数据都在渲染器更新的时候进行了更新，即使是那些不需要更新的数据，复杂度为 **O(Scene*Camera*Renderer)，**
![1620617666061-efb011d4-10c6-4900-b138-b850821d5636.png](https://cdn.nlark.com/yuque/0/2021/png/1255339/1620805585108-7f434e5b-2318-4444-8ec0-9f7e08881a8c.png#clientId=u59b6cee5-37a0-4&from=ui&id=ue60f0047&margin=%5Bobject%20Object%5D&name=1620617666061-efb011d4-10c6-4900-b138-b850821d5636.png&originHeight=1466&originWidth=2968&originalType=binary&size=310236&status=done&style=none&taskId=u57739e2b-0ed3-4a1e-aae4-0d6937373c2)


而进行了分块之后，更新着色器数据的逻辑就分别放在了场景更新、相机更新、渲染器更新、材质更新里面，复杂度变为 **O(Scene+Camera+Renderer)**，即相应的数据只在相应的钩子里面进行运算；比如着色器中有一个变量，只跟场景相关，那么分块后，只有场景切换的时候，才会更新此数据。
![1620632729717-b861de46-4689-4170-9f90-e2a387ace2bc.png](https://cdn.nlark.com/yuque/0/2021/png/1255339/1620805594274-55e34412-4aee-4320-9ec2-227c9de76049.png#clientId=u59b6cee5-37a0-4&from=ui&id=ue45bda5c&margin=%5Bobject%20Object%5D&name=1620632729717-b861de46-4689-4170-9f90-e2a387ace2bc.png&originHeight=1854&originWidth=3094&originalType=binary&size=399658&status=done&style=none&taskId=ubb477c5d-be9d-442c-b7f9-d283366a802)
值得一提的是，虽然分块机制肯定能降低 CPU 运算次数，但是数据的存放位置还是很有讲究的，比如开发者将一个可以属于 Scene 级别的着色器变量放在了 Renderer 里面，本来渲染场景的时候运算一次即可，但是现在每个 Renderer 都将重复计算，那么将会浪费 scene * camera * renderer 次运算。




### GPU 分块上传
同理的，如果不进行分块，在最后上传 GPU 的时候，一般默认上传所有着色器数据。


受益于分块机制，我们可以根据这四大块内容有没有发生变化，然后再选择是否上传这一块的数据，从而减少 GPU 通信，如：
![1611973870038-a0a54105-445c-4a02-9baf-d5a31dd1f3a9.png](https://cdn.nlark.com/yuque/0/2021/png/1255339/1620805610356-21b25a77-3732-4dab-9be8-14cc71ae9ef1.png#clientId=u59b6cee5-37a0-4&from=ui&id=u3385c414&margin=%5Bobject%20Object%5D&name=1611973870038-a0a54105-445c-4a02-9baf-d5a31dd1f3a9.png&originHeight=82&originWidth=512&originalType=binary&size=63794&status=done&style=none&taskId=u6b12be56-9577-4ba9-85dd-038987e07b7)
如上图所示，如果当前渲染管线所属相机没有发生变化，那么属于相机这一整块的着色器数据是不会上传的。当然即使上传了这一块数据，我们也在最底层上传着色器数据的时候进行了判重处理，如果与着色器的缓存值重复，则不上传这一个着色器数据到 GPU：
![1611973530845-f6b6d878-1c22-4e45-aec0-d8ea1eb2b50c.png](https://cdn.nlark.com/yuque/0/2021/png/1255339/1620805642236-bd4ec069-d1c2-4588-8bd9-2070c97a1f83.png#clientId=u59b6cee5-37a0-4&from=ui&id=ufb1e4f31&margin=%5Bobject%20Object%5D&name=1611973530845-f6b6d878-1c22-4e45-aec0-d8ea1eb2b50c.png&originHeight=121&originWidth=482&originalType=binary&size=65128&status=done&style=none&taskId=ub91177f2-942f-4b3f-8314-95415a83165)




### 预分析着色器
上面说到，我们可以通过 [Uniform](https://learnopengl-cn.readthedocs.io/zh/latest/01%20Getting%20started/05%20Shaders/#uniform) 方式上传着色器数据，但是不同的着色器数据类型，需要调用不同的 API：
![1620466736862-f00c1da3-06f6-45d8-a6db-6fc02a642a04.png](https://cdn.nlark.com/yuque/0/2021/png/1255339/1620805661186-7b08f841-f11f-40b4-a6ea-7461cbcc35ff.png#clientId=u59b6cee5-37a0-4&from=ui&id=ub0504043&margin=%5Bobject%20Object%5D&name=1620466736862-f00c1da3-06f6-45d8-a6db-6fc02a642a04.png&originHeight=2150&originWidth=2726&originalType=binary&size=1133825&status=done&style=none&taskId=ue517fa27-dc3b-4d18-99d1-c4f3f19872c)
如果我们在上传着色器数据的时候，再根据着色器数据类型调用相应 API，那么就免不了调用 switch、for 等循环查找的语法，而在频繁调用的接口中，使用这些方法将是非常耗时的。
因此，引擎不仅提供了自动创建 **ShaderProgram** 上下文的功能，而且在创建的时候记录了一些着色器在运行时必要的条件，后续引擎在更新着色器数据的时候，只需要调用保存的钩子即可，省去了运行时查找的耗时。




### 优化数据上传方式
着色器数据上传方式有多种，比如着色器中有一个浮点数组变量 `uniform float test[4]` , 那用户既可以分 4 次分别上传数组相应元素，即 `uniform1f(test[0],v0)`、`uniform1f(test[1],v1)`、`uniform1f(test[2],v2)`、`uniform1f(test[3],v3)` ，也可以 1 次就上传完整数组，即 `uniform4f(test[0],v0,v1,v2,v3)`或者`uniform4fv(test[0],[v0,v1,v2,v3])`。


在上述例子中，虽然有多种上传着色器方式，但是明显 1 次上传性能会更高，因此引擎**取消了数组元素独立上传和结构体数组的上传**。这意味着，如果着色器中有数组变量，用户只能批量上传整个着色器数组，而不能一个一个地上传；同理，如果使用结构体数组，因为着色器无法批量上传结构体，引擎又不支持独立上传，所以需要用户将结构体数组拆分成多个数组。






### 预绑定纹理单元
对于**纹理单元**的处理，引擎在预分析着色器数据的时候就已经对着色器里面的所有采样器变量预绑定了纹理单元， 在后续更新着色器纹理时，只需要调用激活纹理单元的接口即可，减少了绑定纹理单元的操作。
![1620484477610-a2128e49-c5a4-4b88-a5a1-2942ffe1572a.png](https://cdn.nlark.com/yuque/0/2021/png/1255339/1620805681937-b27c4eb4-9669-4feb-8429-8b55f1c8a624.png#clientId=u59b6cee5-37a0-4&from=ui&id=u92b65f35&margin=%5Bobject%20Object%5D&name=1620484477610-a2128e49-c5a4-4b88-a5a1-2942ffe1572a.png&originHeight=902&originWidth=2956&originalType=binary&size=380508&status=done&style=none&taskId=u9c2af588-277f-4969-98ea-9d791c41efb)




### 数字索引着色器数据
在更新着色器数据的时候，引擎肯定需要频繁查询大量着色器相关的数据，比如为了上传着色器的某一个 uniform 变量 ，那我们需要根据这个 uniform 变量的名字在 CPU 中找到这个数据，而这个查询过程中如果用字符串会很慢，我们用了数字索引来提升性能。
![1620630775285-47d2eecc-4328-4931-9069-09574e345498.png](https://cdn.nlark.com/yuque/0/2021/png/1255339/1620805699125-b43c905c-abe8-4e50-890f-876f27b9d803.png#clientId=u59b6cee5-37a0-4&from=ui&id=u7318c5b5&margin=%5Bobject%20Object%5D&name=1620630775285-47d2eecc-4328-4931-9069-09574e345498.png&originHeight=456&originWidth=1656&originalType=binary&size=360150&status=done&style=none&taskId=u35c79471-60c6-4d5b-ba0f-f9e8664bd6e)
如上图所示，如果涉及到数据的频繁查询，建议尽量使用数字索引；经过实践验证，在 JS 对象中查找元素，数字索引会比字符串索引快很多，而且样本量越大，字符串越复杂，速度相差就越明显。如下[案例](https://codepen.io/zhuxudong/pen/ZEeEyNV)，对比了从 1000 个样本中分别使用数字索引和字符串索引，速度相差 10 倍以上：
![1620725995655-c51876c1-4bee-4bdf-9f46-b2d38f2beba1.png](https://cdn.nlark.com/yuque/0/2021/png/1255339/1620805709373-7323231b-7501-4e13-b14c-ca4d5cd10052.png#clientId=u59b6cee5-37a0-4&from=ui&id=u9a2d6347&margin=%5Bobject%20Object%5D&name=1620725995655-c51876c1-4bee-4bdf-9f46-b2d38f2beba1.png&originHeight=152&originWidth=750&originalType=binary&size=45853&status=done&style=none&taskId=u5be8c152-fcb7-4052-9ae3-f18d7e0e4ec)


## 更新渲染状态
第五个阶段是更新渲染状态。


在图形渲染管线中，存在着众多平级的渲染状态，比如深度测试、颜色混合模式、模版测试、 背面剔除。因此引擎设计将众多的渲染状态分为了**渲染状态**（BlendState）**、深度状态**（DepthState）**、模版状态**（StencilState）**、光栅化状态**（RasterState）。
![1620467710622-3c51e37d-2c4b-4bb4-a454-2e046abd6aac.png](https://cdn.nlark.com/yuque/0/2021/png/1255339/1620805729578-1aee2cd9-455b-4acf-9469-02b5ebf50cbd.png#clientId=u59b6cee5-37a0-4&from=ui&height=233&id=u2b8cf636&margin=%5Bobject%20Object%5D&name=1620467710622-3c51e37d-2c4b-4bb4-a454-2e046abd6aac.png&originHeight=466&originWidth=516&originalType=binary&size=25084&status=done&style=none&taskId=uad396415-3658-4b28-8161-70e4e7bf5b9&width=258)


- **判断重复**。渲染状态的更新需要与 GPU 通信，比较耗性能，因此在改变渲染状态(RenderState)时需要进行判重，如果与缓存值重复，则不改变此渲染状态。

![1611973640681-bf01675d-406e-4d13-bc7a-75c1094b9f60.png](https://cdn.nlark.com/yuque/0/2021/png/1255339/1620805751896-555e8cf4-7233-4aee-bbc4-dfc53fa5498f.png#clientId=u59b6cee5-37a0-4&from=ui&id=ufd7aef6a&margin=%5Bobject%20Object%5D&name=1611973640681-bf01675d-406e-4d13-bc7a-75c1094b9f60.png&originHeight=236&originWidth=547&originalType=binary&size=156411&status=done&style=none&taskId=u41437338-4b24-4da5-b9b0-7f589eb8552)


- **开关过滤**。渲染状态是有层级关系的，运行时采用 **总开关  + 子状态配置 **的优先级，来决定是否进行 GPU 通信。比如在深度状态相关的配置中，总开关为开启/关闭深度测试，状态配置为深度写入、深度比较函数，那么只有开启深度开关这个总开关后，深度写入这些状态配置才会生效，才会更新 GPU 的渲染状态。







## 总结
针对渲染管线的优化手段还有很多，一般情况下，Oasis 引擎的[**通用渲染管线**](https://oasisengine.cn/0.3/api/classes/core.basicrenderpipeline.html)已经能够满足大部分开发者的需求，如果存在特殊的渲染需求，可以通过 [**Oasis 引擎官网**](https://oasisengine.cn/#/)了解更多引擎相关设计。希望这篇文章能够通过引擎的部分设计思路和优化手段，带给大家一点帮助。
​

## 最后
欢迎大家 star 我们的[ github 仓库](https://github.com/oasis-engine/engine)，也可以随时关注我们的后续[规划](https://github.com/orgs/oasis-engine/projects)，也可以在 [issues](https://github.com/oasis-engine/engine/issues) 里给我们提需求和问题。开发者可以加入到我们的钉钉群里来跟我们吐槽和探讨一些问题：
![1617693093025-5653062d-8bfc-4f3c-b8ed-f1085c055114.png](https://cdn.nlark.com/yuque/0/2021/png/1255339/1620806319325-f2c9d51a-2a76-4c79-9f3e-14f579e3b18c.png#clientId=u2c4a189e-b433-4&from=ui&height=743&id=u7b5848cc&margin=%5Bobject%20Object%5D&name=1617693093025-5653062d-8bfc-4f3c-b8ed-f1085c055114.png&originHeight=1485&originWidth=1125&originalType=binary&size=281805&status=done&style=none&taskId=u01345d87-dfae-41ed-8e48-66878eecce4&width=563)
**无论你是渲染、TA 、Web 前端或是游戏方向，只要你和我们一样，渴望实现心中的绿洲，欢迎投递简历到 **[chenmo.gl@antgroup.com](mailto:chenmo.gl@antgroup.com)。
