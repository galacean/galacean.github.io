---
order: 3
title: 脚本参数
type: 脚本
label: Script
---

脚本参数是非常实用的一个功能。你可以方便的将脚本中的一些参数暴露给编辑器，从而可以在场景编辑器中进行配置。你可以直接在界面上修改脚本的各项属性，而无需深入代码进行修改。这种直观的编辑方式可以让非专业开发人员也能够不需要理解代码就可以修改场景的状态。

## 基本用法

```typescript
import { Script } from '@galacean/engine';
import { inspectProperty } from "@galacean/editor-decorators";

export default class extends Script {
  // We export this attribute to the Editor
  @inspectProperty('Number', {
    value: 1, // default value
  })
  rotate = 1;

  onUpdate(deltaTime: number) {
    this.entity.transform.rotate(this.rotate, this.rotate, this.rotate);
  }
}
```

在上面的代码中，我们借助 `@inspectProperty` 装饰器声明了一个类型为 `Number` 的 `rotate` 属性，并且将其暴露给了编辑器。编辑器会根据我们传入的参数生成一个可供编辑的属性面板。

![属性面板](https://mdn.alipayobjects.com/huamei_fvsq9p/afts/img/A*n22bR7-lZ5QAAAAAAAAAAAAADqiTAQ/original)

## 参数类型

目前支持的参数类型有：

- `Number`：数字类型
- `Input`：输入框
- `Slider`：滑动条
- `Boolean`：布尔类型
- `Vector2`：二维向量
- `Vector3`：三维向量
- `Vector4`：四维向量
- `Rect`：矩形
- `Color`：颜色选择器，支持 RGBA
- `AssetPicker`：资源选择器
- `Select`：下拉选择器
- `Textarea`：多行文本输入框

## 参数配置

`@inspectProperty` 装饰器的第二个参数是一个对象，用于配置所对应类型参数的各项属性。不同的参数类型对应的选项是不同的。具体的配置项可以参照 [@galaean/editor-decorators](https://www.npmjs.com/package/@galacean/editor-decorators?activeTab=readme) 。下面以数字选择器为例，介绍一下各项配置的含义。

```typescript
import { Script } from '@galacean/engine';
import { inspectProperty } from "@galacean/editor-decorators";

export default class extends Script {
  @inspectProperty('Number', {
    value: 1, // 默认值
    min: 0, // 最小值
    max: 10, // 最大值
    dragStep: 0.1, // 拖拽步长
    property: 'rotate', // 对应到引擎对象的属性名，默认为装饰器所修饰的属性名
    label: 'Rotate', // 在检查器面板中显示的名称，默认为装饰器所修饰的属性名
    info: 'Rotate speed', // 在检查器面板中显示的描述信息
  })
  rotate = 1;

  onUpdate(deltaTime: number) {
    this.entity.transform.rotate(this.rotate, this.rotate, this.rotate);
  }
}
```

