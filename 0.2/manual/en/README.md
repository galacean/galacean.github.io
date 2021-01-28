# About Oasis Engine

**Oasis Engine** is a mobile-first graphics engine which is written by [typescript](https://www.typescriptlang.org/). It contains several packages：

![packages](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*D7G8RIWSLqQAAAAAAAAAAAAAARQnAQ)

## Main Package

Main package ([oasis-engine](https://www.npmjs.com/package/oasis-engine)) is responsible for engine framework and core features. It is a [menorepo](https://www.perforce.com/blog/vcs/what-monorepo) which contains packages below：

| Packages | Description | API |
|:--|:--|--|
|[@oasis-engine/design](https://www.npmjs.com/package/@oasis-engine/design)| Basic interface design, such as interfaces of clone, destroy, RHI |[API](${book.api}modules/design.html)|
|[@oasis-engine/math](https://www.npmjs.com/package/@oasis-engine/math)| Math Library |[API](${book.api}modules/modules/math.html)|
|[@oasis-engine/loader](https://www.npmjs.com/package/@oasis-engine/loader)| Resource Loader |[API](${book.api}modules/loader.html)|
|[@oasis-engine/rhi-webgl](https://www.npmjs.com/package/@oasis-engine/rhi-webgl)| WebGL rendering hardware interface|[API](${book.api}modules/rhi_webgl.html)|
|[@oasis-engine/core](https://www.npmjs.com/package/@oasis-engine/core)| Core of engine, such as component desgin pattern |[API](${book.api}modules/core.html)|


## Extension Packages

Extension Packages are responsible for independent features. Oasis engine provides several official extension packages:

| Packages | Description | API |
|:--|:--|:--|
|[@oasis-engine/draco](https://www.npmjs.com/package/@oasis-engine/draco)| [Draco](https://google.github.io/draco/) graphics compression|[API](${book.api}modules/draco.html)|
|[@oasis-engine/stats](https://www.npmjs.com/package/@oasis-engine/stats)| Engine stats of runtime |[API](${book.api}modules/stats.html)|
|[@oasis-engine/framebuffer-picker](https://www.npmjs.com/package/@oasis-engine/framebuffer-picker)| Framebuffer picker |[API](${book.api}modules/framebuffer_picker.html)|
|[@oasis-engine/controls](https://www.npmjs.com/package/@oasis-engine/controls)| Controls |[API](${book.api}modules/controls.html)|
|[@oasis-engine/tween](https://www.npmjs.com/package/@oasis-engine/tween)| Tween Animation |[API](${baok.api}modules/tween.html)|