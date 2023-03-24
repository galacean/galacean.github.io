---
order: 1
title: stats
type: Performance
label: Performance
---

The [@oasis-engine-toolkit/stats](https://www.npmjs.com/package/@oasis-engine-toolkit/stats) package is mainly used to display the rendering status of the camera, you only need to add the `Stats` component to the camera node:

```typescript
import { Engine } from "oasis-engine";
import { Stats } from "@oasis-engine-toolkit/stats";

cameraEntity.addComponent(Camera);
cameraEntity.addComponent(Stats);
```

## Example

<playground src="text-barrage.ts"></playground>
