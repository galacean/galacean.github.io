---
order: 1
title: stats
type: Performance
---

The [@oasis-engine/stats](${api}stats/index) package is mainly used to display the current running status of the engine. To display the running status of the engine, you only need to import [Stats](${api}stats/Stats) and register:

```typescript
import { Engine } from 'oasis-engine';
import { Stats } from '@oasis-engine/stats';

Engine.registerFeature(Stats);
```

The display is as follows:

![image-20210901200322478](https://gw.alipayobjects.com/zos/OasisHub/262bebbd-cdd7-484e-8bdd-38e13915074d/image-20210901200322478.png)