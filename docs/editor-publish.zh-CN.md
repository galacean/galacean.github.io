---
order: 0
title: 项目发布
type: 编辑器
group: 发布
label: 编辑器/发布
---

当你的项目在线完成场景编辑和脚本编写，你可能会困惑如何使用开发的互动产物。我们希望互动组件和业务前端工程（如用 [React](https://reactjs.org/) 编写的工程）是解耦的（解耦的好处有很多，比如可以沉淀玩法组件），所以我们建议把互动产物发布成前端通用的 [NPM](https://npm.alibaba-inc.com/) 包，然后在业务工程中安装这个包来使用。

![image](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*Z1V-TbNyuc4AAAAAAAAAAAAAARQnAQ)

### 下载
1. 点击编辑器的项目和下载项目进行项目的发布：

![image-20210806111147746](https://gw.alipayobjects.com/zos/OasisHub/809ab57b-2c41-44ad-a3f8-6ac3b82182b0/image-20210806111147746.png)

2. 输入项目名称，选择项目类型

![image-20210806111342074](https://gw.alipayobjects.com/zos/OasisHub/cd728052-0515-4d4e-89c3-7b407848e870/image-20210806111342074.png)

名称指的是下载项目中 package.json 的 name，类型目前支持：

- **Pure JavaScript**： 纯 JavaScript 项目
- **React Component**：React 组件
- **Rax Component** ：Rax 组件
- **Mini Component**：小程序组件

### 调试
下载完成成，解压 zip 文件夹，在**工程目录下**内执行：

```bash
tnpm install
tnpm run dev
```

即可进行 debug。

### 更新
如果你的互动工程修改了，希望下载的组件也更新，可以在改工程中执行：

```bash
tnpm run sync
```
### 发布

解压后的代码一般情况下请不要做修改，而是发布成 [TNPM](https://npm.alibaba-inc.com/) 组件供业务使用。默认会以下载时你输入的名称为包名，如果想要修改包名，在 *package.json* 自行修改即可，如 `MyOasisComponent` ，然后执行：

```bash
tnpm publish
```

> 如果下载的组件需要进行版本管理，请初始化 git。


