---
order: 2
title: 统计面板
type: 工具库
---

[@oasis-engine/stats](${api}stats/index) 包主要用来显示引擎当前的运行状态。要显示引擎运行状态只需要引入 [Stats](${api}stats/Stats) 并注册：

```typescript
import { Engine } from 'oasis-engine';
import { Stats } from '@oasis-engine/stats';

Engine.registerFeature(Stats);
```

显示如下：

![image-20210901200322478](https://gw.alipayobjects.com/zos/OasisHub/262bebbd-cdd7-484e-8bdd-38e13915074d/image-20210901200322478.png)