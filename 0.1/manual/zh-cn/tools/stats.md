# 引擎状态面板

[@oasis-engine/stats](${book.api}modules/stats.html) 包主要用来显示引擎当前的运行状态。要显示引擎运行状态只需要引入 [@oasis-engine/stats](${book.api}modules/stats.html) 并注册：

```typescript
import { Engine } from 'oasis-engine';
import { Stats } from '@oasis-engine/stats';

Engine.registerFeature(Stats);
```

显示如下：

![](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/6148/1598510463945-d349f067-8f47-4f27-a3f9-626f4607073d.png#align=left&display=inline&height=710&margin=%5Bobject%20Object%5D&name=%E6%88%AA%E5%B1%8F2020-08-27_%E4%B8%8B%E5%8D%882_36_42.png&originHeight=710&originWidth=713&size=686323&status=done&style=none&width=713)