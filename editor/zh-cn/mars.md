# 上传 Mars 资源

Mars 是一个帮助我们制作web特效的非常强大的工具，包含一个[特效编辑器](https://render.alipay.com/p/s/mars-editor/)和一个特效播放库。如果想了解更多关于 Mars 的内容，请跳转至 [Mars](https://yuque.antfin-inc.com/oasisgroup/mars)。

## 使用

在使用我们引擎播放 Mars 特效前，需要设计师先使用 Mars 制作特效并导出.vfx文件，如果对 Mars 还不了解的建议先看看[这里](https://render.alipay.com/p/s/mars-editor/#)。

1. 开发者拿到 _.vfx_ 后，首先需要把 _.vfx_ 文件上传到我们 Oasis 编辑器，如下：

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/288050/1604645156477-7ff0e44b-1f7e-4230-a523-2838d043dba1.png#align=left&display=inline&height=764&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1528&originWidth=2878&size=1282772&status=done&style=none&width=1439)

2. 选择一个节点，添加 Mars 组件，如下：

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/288050/1604645301754-aa1e7fd2-d603-4bdc-8c42-48b924a93762.png#align=left&display=inline&height=764&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1528&originWidth=2878&size=1123918&status=done&style=none&width=1439)

3. 添加好 Mars 组件后，可以选择对应的 _.vfx_ ，并设置要播放的动画，如下：

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/288050/1604644880442-f71e3516-c06d-44c4-9ff6-a9785566ed0c.png#align=left&display=inline&height=764&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1528&originWidth=2878&size=1189871&status=done&style=none&width=1439)

4. 完成上述步骤后，通过调整参数即可查看效果，参数说明如下：

| 属性 | 功能说明 |  |
| :--- | :--- | --- |
| `resource` | 选择 Mars 导出的 _vfx_ 资源文件 |  |
| `compositionName` | 每个 _vfx_ 文件中含有1个或多个 composition，选择要播放的即可，`null` 表示不播放任何一个 |  |
| `autoPlay` | 是否自动播放，如果勾选，运行时会自动播放，否则需要手动调用 `play` 来播放 |  |