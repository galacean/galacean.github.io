---
order: 2
title: stats
type: tool
---

The [@oasis-engine/stats](${api}stats/index) package is mainly used to display the current running status of the engine. To display the running status of the engine, you only need to import [Stats](${api}stats/Stats) and register:

```typescript
import { Engine } from 'oasis-engine';
import { Stats } from '@oasis-engine/stats';

Engine.registerFeature(Stats);
```

The display is as follows:

![](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*ji_WTolpInMAAAAAAAAAAAAAARQnAQ)