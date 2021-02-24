# 引擎状态面板

[@oasis-engine/stats](${book.api}modules/stats.html) 包主要用来显示引擎当前的运行状态。要显示引擎运行状态只需要引入 [@oasis-engine/stats](${book.api}modules/stats.html) 并注册：

```typescript
import { Engine } from 'oasis-engine';
import { Stats } from '@oasis-engine/stats';

Engine.registerFeature(Stats);
```

显示如下：

![](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*ji_WTolpInMAAAAAAAAAAAAAARQnAQ)