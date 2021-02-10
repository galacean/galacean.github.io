# 关于 Oasis Engine

**Oasis Engine** 是一套移动优先的图形引擎，使用 [Typescript](https://www.typescriptlang.org/) 编写。为了保证引擎的体积最小化，我们将引擎的包分为：

![packages](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*D7G8RIWSLqQAAAAAAAAAAAAAARQnAQ)

## 主包

引擎核心架构逻辑和核心功能（[oasis-engine](https://www.npmjs.com/package/oasis-engine)），包含以下子包：

|主包|解释|API|
|:--|:--|--|
|[@oasis-engine/design](https://www.npmjs.com/package/@oasis-engine/design)| 引擎基础设计规范，如克隆规范、销毁规范、RHI规范 |[API](${book.api}modules/design.html)|
|[@oasis-engine/math](https://www.npmjs.com/package/@oasis-engine/math)| 数学库 |[API](${book.api}modules/math.html)|
|[@oasis-engine/loader](https://www.npmjs.com/package/@oasis-engine/loader)| 资源加载 |[API](${book.api}modules/loader.html)|
|[@oasis-engine/rhi-webgl](https://www.npmjs.com/package/@oasis-engine/rhi-webgl)| WebGL 渲染硬件接口（Rendering Hardware Interface）|[API](${book.api}modules/rhi_webgl.html)|
|[@oasis-engine/core](https://www.npmjs.com/package/@oasis-engine/core)| 引擎核心，如组件系统 |[API](${book.api}modules/core.html)|


## 扩展包

非核心功能和偏业务逻辑定制，Oasis Engine 官方提供的扩展包有：

|扩展包|解释|API|
|:--|:--|:--|
|[@oasis-engine/draco](https://www.npmjs.com/package/@oasis-engine/draco)| Draco 模型压缩 |[API](${book.api}modules/draco.html)|
|[@oasis-engine/stats](https://www.npmjs.com/package/@oasis-engine/stats)| 引擎状态显示器 |[API](${book.api}modules/stats.html)|
|[@oasis-engine/framebuffer-picker](https://www.npmjs.com/package/@oasis-engine/framebuffer-picker)| 帧缓冲拾取 |[API](${book.api}modules/framebuffer_picker.html)|
|[@oasis-engine/controls](https://www.npmjs.com/package/@oasis-engine/controls)| 控制器 |[API](${book.api}modules/controls.html)|
|[@oasis-engine/tween](https://www.npmjs.com/package/@oasis-engine/tween)| 补间动画 |[API](${book.api}modules/tween.html)|
