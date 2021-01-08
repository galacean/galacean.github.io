# 导出 Web 平台包

当你的项目在线完成场景编辑和脚本编写，你可能会困惑如何使用开发的 3D 产物。我们希望 3D 组件和业务前端工程（如用 [React](https://reactjs.org/) 编写的工程）是解耦的（解耦的好处有很多，比如可以沉淀玩法组件），所以我们建议把 3D 产物发布成前端通用的 [NPM](https://npm.alibaba-inc.com/) 包，然后在业务工程中安装这个包来使用。

![](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*Z1V-TbNyuc4AAAAAAAAAAAAAARQnAQ)

## 使用

### 1. 导出项目至本地

使用 Oasis Editor 导出项目非常简单，只需要点击编辑器右上角的 *下载项目按钮* 即可：

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/18082/1596613890072-022388a1-40a3-42aa-a73e-563ce35be7f2.png#align=left&display=inline&height=948&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1896&originWidth=3358&size=1690016&status=done&style=none&width=1679)

Oasis Editor 目前提供三种框架模板的导出，分别为：

|框架|介绍|
|:--|:--|
| React | 使用 [sherry](https://sherry.antfin-inc.com/component/) 生成的项目 |
| Rax | 使用 [rax官方脚手架](http://rax.alibaba-inc.com/docs/guide/getting-start) 生成的项目 |
| Pure | 没有用任何框架的ts代码 |

![](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/6148/1599116323592-c3177d1f-0a11-4678-8058-2b4c2f7382dd.png#align=left&display=inline&height=281&margin=%5Bobject%20Object%5D&name=%E6%88%AA%E5%B1%8F2020-09-03%20%E4%B8%8B%E5%8D%882.58.39.png&originHeight=281&originWidth=517&size=21931&status=done&style=none&width=517)

以 React Component 为例，zip 解压之后目录结构如下：

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/18082/1599045955874-0b54d0f9-d6b5-444c-a39b-9d1449c53ace.png#align=left&display=inline&height=315&margin=%5Bobject%20Object%5D&name=image.png&originHeight=630&originWidth=562&size=133768&status=done&style=none&width=281)

如果你的 3D 工程修改了，希望下载的组件也更新，可以在改工程中执行：

```bash
tnpm run sync
```

### 2. 发布组件

解压后的代码一般情况下请不要做修改，而是发布成 [TNPM](https://npm.alibaba-inc.com/) 组件供业务使用。默认会以下载时你输入的名称为包名，如果想要修改包名，在 _package.json_ 自行修改即可，如 `MyOasisComponent` ，然后执行：

```bash
tnpm publish
```

> 如果下载的组件需要进行版本管理，请初始化 git。

### 3. 在业务中使用

如要使用上面发布的组件，以`MyOasisComponent` 为例，在你的业务项目中执行：

```bash
tnpm i MyOasisComponent --save
```

业务与3D组件之间的通信使用事件通信的方式，具体见[事件通信](${book.editor}event)小节。

---

## 本地预览

为了验证下载的组件没有问题，我们也在下载的组件工程里提供了本地预览的能力，只要执行即可启动一个本地服务：

```bash
tnpm i
tnpm run dev
```

*Rax* 的启动命令有一些差异：

```bash
tnpm run start
```

一切顺利的话，你的项目就展示在浏览器中：

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/18082/1596616065302-ae2121de-5835-4b0e-9071-d3be63e95bae.png#align=left&display=inline&height=371&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1860&originWidth=3358&size=246355&status=done&style=none&width=669)

