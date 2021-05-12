---
order: 1
title: 创建一个立方体
type: 编辑器
---

这个教程将带你开发一个“旋转的方块”示例。

1. 打开 [Oasis Editor](https://oasistwa.alipay.com/3d)，点击 *创作项目* ：

![](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*IehGRLU5yYYAAAAAAAAAAAAAARQnAQ)

2. 输入项目名称和描述，点击 *确定* ：

![](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*VLTZRIF4FwkAAAAAAAAAAAAAARQnAQ)

3. 进入编辑，可以看到默认的场景中已经有一个方块，点击左侧 *层级* 的 *model* 节点，可以看到方块呈选中状态，并且右边的 *节点检查器* 中添加了[几何体模型](${book.manual}component/basic-geometry) 组件：

![](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*FfeZRrkcn3cAAAAAAAAAAAAAARQnAQ)

4. 点击右上角的 *预览* 按钮，就可以在浏览器新窗口中预览场景：

![](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*go7nQZso4YQAAAAAAAAAAAAAARQnAQ)

5. 接下来给方块增加旋转功能，鼠标移到 *资源* 面板的 *+* 上，点击浮层中的 [脚本](${book.manual}component/script)：

![](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*snWNQa843GgAAAAAAAAAAAAAARQnAQ)
重命名为 _rotate.ts _:
![](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*azAnR79XRrIAAAAAAAAAAAAAARQnAQ)

6. 选中 *model* 节点，点击 *添加组件* 按钮，选择 *脚本/_rotate.ts_*:

![](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*7iS8SKhUJX8AAAAAAAAAAAAAARQnAQ)

7. 双击 *rotate.ts* ，打开代码编辑器，可以看到自动生成的[脚本组件](${book.manual}component/script)模板：

![](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*9p4rSrTcri4AAAAAAAAAAAAAARQnAQ)

8. 在 [onUpdate](${book.manual}component/script?id=组件生命周期函数) 函数中增加以下代码：

```typescript
private _tempVector = new Vector3(0, 1, 0);

onUpdate(deltaTime) {
  this.entity.transform.rotate(this._tempVector);
}
```
使用快捷键 _Command+S_ 保存文件，即可看到右侧预览面板中方块旋转。

# 小结
通过这个简单的示例，我们看到编辑器为我们省去了大量的**样板式代码**的编写工作量，使开发者专注于逻辑的开发。因此，我们强烈推荐你使用编辑器开发项目，在复杂项目中能省去更多时间。